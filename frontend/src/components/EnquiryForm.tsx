import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { enquiryFormSchema, type EnquiryFormValues } from "../lib/validation";
import { api, ApiError } from "../lib/api";
import {
  EnquirySource,
  ProductInterest,
  type EnquiryConfirmationResponse,
} from "../types/enquiry";
import "./EnquiryForm.css";

interface EnquiryFormProps {
  source: EnquirySource;
  defaultProduct?: ProductInterest;
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

export default function EnquiryForm({
  source,
  defaultProduct,
  lockProduct = false,
  title = "Request a Free Demo",
  subtitle = "Share a few details and our team will get in touch to schedule your demo.",
}: EnquiryFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<EnquiryConfirmationResponse | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      productInterestedIn: String(defaultProduct ?? ProductInterest.SocietyManagementSoftware),
      consentAccepted: undefined,
      preferredContactMethod: "",
      websiteUrl: "",
    },
  });

  const onSubmit = async (values: EnquiryFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await api.post<EnquiryConfirmationResponse>("/api/enquiries", {
        ...values,
        productInterestedIn: Number(values.productInterestedIn),
        preferredContactMethod:
          values.preferredContactMethod !== undefined && values.preferredContactMethod !== ""
            ? Number(values.preferredContactMethod)
            : undefined,
        email: values.email || undefined,
        organizationName: values.organizationName || undefined,
        organizationType: values.organizationType || undefined,
        city: values.city || undefined,
        message: values.message || undefined,
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
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          style={{ marginTop: "1.25rem" }}
          onClick={() => {
            setConfirmation(null);
            reset();
          }}
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {(title || subtitle) && (
        <div className="enquiry-form-head">
          {title && <h3>{title}</h3>}
          {subtitle && <p className="text-muted">{subtitle}</p>}
        </div>
      )}

      {submitError && (
        <div className="alert alert-error" role="alert">
          {submitError}
        </div>
      )}

      {/* Honeypot field: hidden from real users via CSS, bots that auto-fill it get silently dropped server-side. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="websiteUrl">Leave this field empty</label>
        <input id="websiteUrl" type="text" tabIndex={-1} autoComplete="off" {...register("websiteUrl")} />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="fullName">
          Full Name<span className="required">*</span>
        </label>
        <input
          id="fullName"
          className={`form-input ${errors.fullName ? "has-error" : ""}`}
          autoComplete="name"
          {...register("fullName")}
        />
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
          <label className="form-label" htmlFor="email">
            Email Address
          </label>
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

      <div className="form-grid-2">
        <div className="form-field">
          <label className="form-label" htmlFor="organizationName">
            Society / Institute Name
          </label>
          <input
            id="organizationName"
            className="form-input"
            autoComplete="organization"
            {...register("organizationName")}
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="city">
            City
          </label>
          <input id="city" className="form-input" autoComplete="address-level2" {...register("city")} />
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-field">
          <label className="form-label" htmlFor="organizationType">
            Organization Type
          </label>
          <select id="organizationType" className="form-select" {...register("organizationType")}>
            <option value="">Select type (optional)</option>
            {ORGANIZATION_TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="productInterestedIn">
            Product/Service Interested In<span className="required">*</span>
          </label>
          <select
            id="productInterestedIn"
            className={`form-select ${errors.productInterestedIn ? "has-error" : ""}`}
            disabled={lockProduct}
            {...register("productInterestedIn")}
          >
            <option value={ProductInterest.SocietyManagementSoftware}>Society Management Software</option>
            <option value={ProductInterest.EducationManagementSoftware}>Education Management Software</option>
            <option value={ProductInterest.CustomSoftwareDevelopment}>Custom Software Development</option>
            <option value={ProductInterest.OtherEnquiry}>Other Enquiry</option>
          </select>
          {errors.productInterestedIn && (
            <span className="form-error">{errors.productInterestedIn.message}</span>
          )}
        </div>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="preferredContactMethod">
          Preferred Contact Method
        </label>
        <select id="preferredContactMethod" className="form-select" {...register("preferredContactMethod")}>
          <option value="">No preference</option>
          <option value={0}>Phone Call</option>
          <option value={1}>Email</option>
          <option value={2}>WhatsApp</option>
        </select>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="message">
          Message
        </label>
        <textarea id="message" className="form-textarea" {...register("message")} />
      </div>

      <div className="form-field">
        <div className="form-checkbox-row">
          <input id="consentAccepted" type="checkbox" {...register("consentAccepted")} />
          <label htmlFor="consentAccepted" className="form-hint">
            I agree to the{" "}
            <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </Link>{" "}
            and consent to being contacted regarding my enquiry.<span className="required">*</span>
          </label>
        </div>
        {errors.consentAccepted && <span className="form-error">{errors.consentAccepted.message}</span>}
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
        {isSubmitting ? <span className="spinner" /> : "Submit Enquiry"}
      </button>
    </form>
  );
}
