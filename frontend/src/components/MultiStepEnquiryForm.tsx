import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearchParams } from "react-router-dom";
import { enquiryFormSchema, type EnquiryFormValues } from "../lib/validation";
import { api, ApiError } from "../lib/api";
import {
  CONTACT_METHOD_LABELS,
  EnquirySource,
  PRODUCT_INTEREST_LABELS,
  PreferredContactMethod,
  ProductInterest,
  type EnquiryConfirmationResponse,
} from "../types/enquiry";
import Icon from "./Icon";
import { COMPANY_EMAIL, COMPANY_PHONE_DISPLAY, COMPANY_PHONE_TEL, whatsappLink } from "../lib/constants";
import "./MultiStepEnquiryForm.css";
import "./EnquiryForm.css";

interface MultiStepEnquiryFormProps {
  source: EnquirySource;
  defaultProduct?: ProductInterest;
  defaultCity?: string;
  lockProduct?: boolean;
  title?: string;
  subtitle?: string;
}

const ORGANIZATION_TYPE_OPTIONS = [
  "Cooperative Housing Society",
  "Apartment/Residential Complex",
  "School",
  "College",
  "Coaching Institute",
  "Tuition Class",
  "Training Institute",
  "Other",
];

const PRODUCT_OPTIONS = [
  { value: ProductInterest.SocietyManagementSoftware, label: "Society Management Software", icon: "building" as const },
  { value: ProductInterest.EducationManagementSoftware, label: "Education Management Software", icon: "graduation" as const },
  { value: ProductInterest.CustomSoftwareDevelopment, label: "Custom Software Development", icon: "layers" as const },
  { value: ProductInterest.OtherEnquiry, label: "Other Enquiry", icon: "message" as const },
];

const STEPS = ["Solution", "Organization", "Contact", "Review"];

export default function MultiStepEnquiryForm({
  source,
  defaultProduct,
  defaultCity,
  lockProduct = false,
  title = "Request a Free Demo",
  subtitle = "A few quick steps and our team will reach out to schedule your demo.",
}: MultiStepEnquiryFormProps) {
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get("product");
  const resolvedDefaultProduct =
    defaultProduct ??
    (productParam === "society"
      ? ProductInterest.SocietyManagementSoftware
      : productParam === "education"
      ? ProductInterest.EducationManagementSoftware
      : ProductInterest.SocietyManagementSoftware);

  const steps = lockProduct ? STEPS.slice(1) : STEPS;
  const firstStep = lockProduct ? 1 : 0;

  const [step, setStep] = useState(firstStep);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<EnquiryConfirmationResponse | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      productInterestedIn: String(resolvedDefaultProduct),
      city: defaultCity ?? searchParams.get("city") ?? "",
      consentAccepted: undefined,
      preferredContactMethod: "",
      websiteUrl: "",
    },
  });

  const values = watch();

  const STEP_FIELDS: Record<number, (keyof EnquiryFormValues)[]> = {
    0: ["productInterestedIn"],
    1: ["organizationName", "organizationType", "city"],
    2: ["fullName", "mobileNumber", "email", "preferredContactMethod"],
    3: ["message", "consentAccepted"],
  };

  const goNext = async () => {
    const fields = STEP_FIELDS[step];
    const valid = await trigger(fields);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, firstStep));

  const onSubmit = async (formValues: EnquiryFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await api.post<EnquiryConfirmationResponse>("/api/enquiries", {
        ...formValues,
        productInterestedIn: Number(formValues.productInterestedIn),
        preferredContactMethod:
          formValues.preferredContactMethod !== undefined && formValues.preferredContactMethod !== ""
            ? Number(formValues.preferredContactMethod)
            : undefined,
        email: formValues.email || undefined,
        organizationName: formValues.organizationName || undefined,
        organizationType: formValues.organizationType || undefined,
        city: formValues.city || undefined,
        message: formValues.message || undefined,
        enquirySource: source,
      });
      setConfirmation(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setSubmitError(err.message);
      } else {
        setSubmitError("We could not submit your enquiry right now. Please try again or contact us directly.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <div className="enquiry-confirmation" role="status">
        <div className="enquiry-confirmation-icon" aria-hidden="true">&#10003;</div>
        <h3>Thank you, {confirmation.fullName}!</h3>
        <p>Your enquiry has been received. Our team will contact you shortly.</p>
        <div className="enquiry-reference">
          Reference Number: <strong>{confirmation.enquiryReferenceNumber}</strong>
        </div>
        <div className="ms-confirmation-contacts">
          <a href={`tel:${COMPANY_PHONE_TEL}`} className="btn btn-secondary btn-sm">
            <Icon name="phone" size={16} /> {COMPANY_PHONE_DISPLAY}
          </a>
          <a href={`mailto:${COMPANY_EMAIL}`} className="btn btn-secondary btn-sm">
            <Icon name="mail" size={16} /> Email Us
          </a>
          <a href={whatsappLink("Hi, I just submitted an enquiry and wanted to follow up.")} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
            <Icon name="whatsapp" size={16} /> WhatsApp
          </a>
        </div>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          style={{ marginTop: "1.25rem" }}
          onClick={() => {
            setConfirmation(null);
            setStep(0);
            reset();
          }}
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="ms-form enquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {(title || subtitle) && (
        <div className="ms-form-head">
          {title && <h3>{title}</h3>}
          {subtitle && <p className="text-muted">{subtitle}</p>}
        </div>
      )}

      <div className="ms-steps">
        {steps.map((label, displayIndex) => {
          const i = displayIndex + firstStep;
          return (
            <Fragment key={label}>
              <div className={`ms-step ${i === step ? "is-active" : ""} ${i < step ? "is-complete" : ""}`}>
                <div className="ms-step-circle">{i < step ? "✓" : displayIndex + 1}</div>
                <span className="ms-step-label">{label}</span>
              </div>
              {displayIndex < steps.length - 1 && (
                <div className={`ms-step-connector ${i < step ? "is-complete" : ""}`} />
              )}
            </Fragment>
          );
        })}
      </div>

      {submitError && (
        <div className="alert alert-error" role="alert">
          {submitError}
        </div>
      )}

      {/* Honeypot field */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="ms-websiteUrl">Leave this field empty</label>
        <input id="ms-websiteUrl" type="text" tabIndex={-1} autoComplete="off" {...register("websiteUrl")} />
      </div>

      <div className="ms-form-body">
        {step === 0 && (
          <div className="form-field" style={{ marginBottom: 0 }}>
            <label className="form-label">
              Which solution are you interested in?<span className="required">*</span>
            </label>
            <div className="ms-option-grid">
              {PRODUCT_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={`ms-option-card ${Number(values.productInterestedIn) === option.value ? "is-selected" : ""}`}
                  onClick={() => setValue("productInterestedIn", String(option.value), { shouldValidate: true })}
                >
                  <Icon name={option.icon} size={22} />
                  {option.label}
                </button>
              ))}
            </div>
            {errors.productInterestedIn && <span className="form-error">{errors.productInterestedIn.message}</span>}
          </div>
        )}

        {step === 1 && (
          <>
            <div className="form-field">
              <label className="form-label" htmlFor="organizationName">Society / Institute Name</label>
              <input id="organizationName" className="form-input" autoComplete="organization" {...register("organizationName")} />
            </div>
            <div className="form-grid-2">
              <div className="form-field">
                <label className="form-label" htmlFor="organizationType">Organization Type</label>
                <select id="organizationType" className="form-select" {...register("organizationType")}>
                  <option value="">Select type (optional)</option>
                  {ORGANIZATION_TYPE_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="city">City</label>
                <input id="city" className="form-input" autoComplete="address-level2" {...register("city")} />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="form-field">
              <label className="form-label" htmlFor="fullName">
                Full Name<span className="required">*</span>
              </label>
              <input id="fullName" className={`form-input ${errors.fullName ? "has-error" : ""}`} autoComplete="name" {...register("fullName")} />
              {errors.fullName && <span className="form-error">{errors.fullName.message}</span>}
            </div>
            <div className="form-grid-2">
              <div className="form-field">
                <label className="form-label" htmlFor="mobileNumber">
                  Mobile Number<span className="required">*</span>
                </label>
                <input
                  id="mobileNumber"
                  className={`form-input ${errors.mobileNumber ? "has-error" : ""}`}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="98765 43210"
                  {...register("mobileNumber")}
                />
                {errors.mobileNumber && <span className="form-error">{errors.mobileNumber.message}</span>}
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  className={`form-input ${errors.email ? "has-error" : ""}`}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  {...register("email")}
                />
                {errors.email && <span className="form-error">{errors.email.message}</span>}
              </div>
            </div>
            <div className="form-field" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="preferredContactMethod">Preferred Contact Method</label>
              <select id="preferredContactMethod" className="form-select" {...register("preferredContactMethod")}>
                <option value="">No preference</option>
                <option value={PreferredContactMethod.Phone}>Phone Call</option>
                <option value={PreferredContactMethod.Email}>Email</option>
                <option value={PreferredContactMethod.WhatsApp}>WhatsApp</option>
              </select>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="form-field">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea id="message" className="form-textarea" {...register("message")} />
            </div>

            <div className="ms-review-section">
              <h4>Review Your Enquiry</h4>
              <dl>
                <div className="ms-review-row">
                  <dt>Solution</dt>
                  <dd>{PRODUCT_INTEREST_LABELS[Number(values.productInterestedIn) as ProductInterest]}</dd>
                </div>
                <div className="ms-review-row">
                  <dt>Organization</dt>
                  <dd>{values.organizationName || "—"}</dd>
                </div>
                <div className="ms-review-row">
                  <dt>City</dt>
                  <dd>{values.city || "—"}</dd>
                </div>
                <div className="ms-review-row">
                  <dt>Name</dt>
                  <dd>{values.fullName || "—"}</dd>
                </div>
                <div className="ms-review-row">
                  <dt>Mobile</dt>
                  <dd>{values.mobileNumber || "—"}</dd>
                </div>
                <div className="ms-review-row">
                  <dt>Preferred Contact</dt>
                  <dd>
                    {values.preferredContactMethod !== undefined && values.preferredContactMethod !== ""
                      ? CONTACT_METHOD_LABELS[Number(values.preferredContactMethod) as PreferredContactMethod]
                      : "No preference"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="form-field">
              <div className="form-checkbox-row">
                <input id="consentAccepted" type="checkbox" {...register("consentAccepted")} />
                <label htmlFor="consentAccepted" className="form-hint">
                  I agree to the{" "}
                  <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>{" "}
                  and consent to being contacted regarding my enquiry.<span className="required">*</span>
                </label>
              </div>
              {errors.consentAccepted && <span className="form-error">{errors.consentAccepted.message}</span>}
            </div>
          </>
        )}
      </div>

      <div className="ms-form-actions">
        {step > firstStep && (
          <button type="button" className="btn btn-secondary" onClick={goBack} disabled={isSubmitting}>
            Back
          </button>
        )}
        {step < STEPS.length - 1 && (
          <button type="button" className="btn btn-primary btn-block" onClick={goNext}>
            Next
          </button>
        )}
        {step === STEPS.length - 1 && (
          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting ? <span className="spinner" /> : "Submit Enquiry"}
          </button>
        )}
      </div>
    </form>
  );
}
