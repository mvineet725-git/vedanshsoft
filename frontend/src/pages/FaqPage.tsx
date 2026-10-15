import Layout from "../components/Layout";
import Seo from "../components/Seo";
import FaqAccordion from "../components/FaqAccordion";
import { GENERAL_FAQS } from "../data/faqs";

export default function FaqPage() {
  return (
    <Layout>
      <Seo
        title="Frequently Asked Questions | Vedansh Software Services"
        description="Answers to common questions about our society management software and education management software, including demos, customization, pricing, and security."
        canonicalPath="/faq"
      />

      <section className="section" style={{ paddingTop: "var(--space-9)" }}>
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-7)", textAlign: "center", maxWidth: "720px" }}>
            <span className="eyebrow">FAQs</span>
            <h1>Frequently Asked Questions</h1>
          </div>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <FaqAccordion items={GENERAL_FAQS} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
