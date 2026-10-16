import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import MultiStepEnquiryForm from "../components/MultiStepEnquiryForm";
import { EnquirySource } from "../types/enquiry";
import "./PricingPage.css";

const PRICING_FACTORS = [
  {
    icon: "building" as const,
    title: "Size of Your Organization",
    description: "The number of flats, units, students, or batches affects the overall scope of implementation.",
  },
  {
    icon: "layers" as const,
    title: "Modules You Need",
    description: "Pricing depends on which features and modules are relevant to your day-to-day operations.",
  },
  {
    icon: "clipboard" as const,
    title: "Implementation Requirements",
    description: "Data migration, training, and any customization requirements factor into the overall scope.",
  },
];

export default function PricingPage() {
  return (
    <Layout>
      <Seo
        title="Request Pricing | Vedansh Software Services"
        description="Get a pricing quote for our Society Management Software or Education Management Software, tailored to your organization's specific requirements."
        canonicalPath="/pricing"
      />

      <section className="pricing-hero">
        <div className="container">
          <span className="eyebrow">Pricing</span>
          <h1>Pricing Built Around Your Organization's Needs</h1>
          <p>
            We don't believe in one-size-fits-all pricing. Tell us about your organization and
            requirements, and our team will get back to you with a quote tailored to your scope.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-7)", textAlign: "center", maxWidth: "720px" }}>
            <span className="eyebrow">How Pricing Works</span>
            <h2>What Affects Your Quote</h2>
            <p className="text-muted" style={{ marginTop: "var(--space-4)" }}>
              Pricing depends on the agreed product scope and commercial terms. Here's what typically
              factors into a quote.
            </p>
          </div>
          <div className="pricing-factors-grid">
            {PRICING_FACTORS.map((factor) => (
              <div className="card" key={factor.title}>
                <div className="card-icon teal">
                  <Icon name={factor.icon} />
                </div>
                <h4 style={{ marginBottom: "0.6rem" }}>{factor.title}</h4>
                <p className="text-muted">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pricing-cta-section" style={{ background: "var(--color-bg-alt)" }}>
        <div className="container pricing-cta-grid">
          <div>
            <h2>Get a Quote for Your Organization</h2>
            <p className="text-muted" style={{ marginTop: "var(--space-3)", maxWidth: "480px" }}>
              Share a few details about your organization and requirements, and our team will follow up
              with pricing information tailored to your scope. There are no fixed public prices, discounts,
              or promotional offers to display until commercial terms are agreed with you directly.
            </p>
          </div>
          <MultiStepEnquiryForm
            source={EnquirySource.Other}
            title="Request Pricing"
            subtitle="A few quick steps and our team will follow up with a tailored quote."
          />
        </div>
      </section>
    </Layout>
  );
}
