import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import MultiStepEnquiryForm from "../components/MultiStepEnquiryForm";
import {
  COMPANY_ADDRESS_FULL,
  COMPANY_ADDRESS_MAPS_QUERY,
  COMPANY_EMAIL,
  COMPANY_PHONE_DISPLAY,
  COMPANY_PHONE_TEL,
  whatsappLink,
} from "../lib/constants";
import { EnquirySource, ProductInterest } from "../types/enquiry";
import "./ContactPage.css";

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get("product");
  const cityParam = searchParams.get("city");

  const defaultProduct =
    productParam === "society"
      ? ProductInterest.SocietyManagementSoftware
      : productParam === "education"
      ? ProductInterest.EducationManagementSoftware
      : undefined;

  const productLabel =
    productParam === "society"
      ? "Society Management Software"
      : productParam === "education"
      ? "Education Management Software"
      : null;

  const whatsappMessage = [
    "Hi, I would like to enquire about your software solutions.",
    productLabel ? `I'm interested in ${productLabel}.` : null,
    cityParam ? `I'm based in ${cityParam}.` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Layout>
      <Seo
        title="Contact Us | Vedansh Software Services"
        description="Contact Vedansh Software Services by phone, email, or WhatsApp, or submit an enquiry to request a demo of our society or education management software."
        canonicalPath="/contact"
      />

      <section className="section" style={{ paddingTop: "var(--space-9)" }}>
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="eyebrow">Contact Us</span>
            <h1>Let's Talk About Your Requirements</h1>
            <p className="text-muted" style={{ marginTop: "var(--space-4)" }}>
              Reach out directly or fill in the enquiry form and our team will get back to you.
            </p>

            <div className="contact-channels">
              <a href={`tel:${COMPANY_PHONE_TEL}`} className="contact-channel">
                <span className="contact-channel-icon"><Icon name="phone" /></span>
                <span>
                  <strong>Call Us</strong>
                  <span className="text-muted" style={{ display: "block" }}>{COMPANY_PHONE_DISPLAY}</span>
                </span>
              </a>

              <a href={`mailto:${COMPANY_EMAIL}`} className="contact-channel">
                <span className="contact-channel-icon"><Icon name="mail" /></span>
                <span>
                  <strong>Email Us</strong>
                  <span className="text-muted" style={{ display: "block" }}>{COMPANY_EMAIL}</span>
                </span>
              </a>

              <a
                href={whatsappLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel"
              >
                <span className="contact-channel-icon" style={{ background: "#e8f9ef", color: "#178a4c" }}>
                  <Icon name="whatsapp" />
                </span>
                <span>
                  <strong>WhatsApp Us</strong>
                  <span className="text-muted" style={{ display: "block" }}>Chat with our team</span>
                </span>
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${COMPANY_ADDRESS_MAPS_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel"
              >
                <span className="contact-channel-icon"><Icon name="map-pin" /></span>
                <span>
                  <strong>Visit Us</strong>
                  <span className="text-muted" style={{ display: "block" }}>{COMPANY_ADDRESS_FULL}</span>
                </span>
              </a>
            </div>
          </div>

          <MultiStepEnquiryForm
            source={EnquirySource.ContactPage}
            defaultProduct={defaultProduct}
            defaultCity={cityParam ?? undefined}
          />
        </div>
      </section>
    </Layout>
  );
}
