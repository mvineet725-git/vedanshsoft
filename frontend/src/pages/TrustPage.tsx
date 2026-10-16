import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import { TRUST_TOPICS } from "../data/trustTopics";
import "./TrustPage.css";

const NEVER_LIST = [
  "Invented happy customer counts or client logos",
  "Fabricated testimonials or satisfaction ratings",
  "Claimed market rankings or awards",
  "Published certifications or security audit results we don't have",
  "Promised uptime or support response-time guarantees",
  "Listed cities as \"served\" without confirmed deployments",
];

export default function TrustPage() {
  return (
    <Layout>
      <Seo
        title="How We Work | Trust & Transparency | Vedansh Software Services"
        description="How product demonstrations, customization requests, pricing, data handling, and support work at Vedansh Software Services — explained honestly, with no fabricated claims."
        canonicalPath="/how-we-work"
      />

      <section className="trust-hero">
        <div className="container">
          <span className="eyebrow">How We Work</span>
          <h1>Straight Answers Before You Reach Out</h1>
          <p className="text-muted" style={{ marginTop: "var(--space-4)", maxWidth: "640px", marginInline: "auto" }}>
            We know contacting a new software vendor involves some uncertainty. Here's how the
            important parts of working with us actually work — in plain language.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="trust-topics-list">
            {TRUST_TOPICS.map((topic) => (
              <div className="trust-topic-card" key={topic.question}>
                <div className="trust-topic-icon">
                  <Icon name={topic.icon} />
                </div>
                <div>
                  <h3>{topic.question}</h3>
                  <p className="text-muted">{topic.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-bg-alt)" }}>
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-7)", textAlign: "center", maxWidth: "680px" }}>
            <span className="eyebrow">Our Commitment</span>
            <h2>What You Will Never See on This Website</h2>
            <p className="text-muted" style={{ marginTop: "var(--space-4)" }}>
              We'd rather you trust what's actually here than be impressed by claims we can't back up.
            </p>
          </div>
          <div className="trust-never-list">
            {NEVER_LIST.map((item) => (
              <div className="trust-never-item" key={item}>
                <Icon name="x-circle" size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <div className="container">
          <h2>Have a Question We Haven't Answered?</h2>
          <p className="text-muted" style={{ marginTop: "var(--space-3)", maxWidth: "480px", marginInline: "auto" }}>
            Reach out directly, or check our frequently asked questions.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-4)", marginTop: "var(--space-6)", flexWrap: "wrap" }}>
            <Link to="/faq" className="btn btn-secondary">View FAQs</Link>
            <Link to="/contact" className="btn btn-primary">Contact Our Team</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
