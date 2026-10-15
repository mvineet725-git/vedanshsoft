import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <Layout>
      <Seo
        title="About Us | Vedansh Software Services"
        description="Vedansh Software Services builds practical software for residential housing societies and educational institutions, focused on simplifying operations through reliable technology."
        canonicalPath="/about"
      />

      <section className="section about-hero">
        <div className="container">
          <span className="eyebrow">About Us</span>
          <h1>Practical Software, Built Around Real Operations</h1>
          <p className="text-muted" style={{ marginTop: "var(--space-4)", maxWidth: "720px", fontSize: "var(--fs-lg)" }}>
            Vedansh Software Services is a software solutions provider focused on simplifying business
            operations for residential housing societies and educational institutions through practical,
            reliable technology.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div className="about-block">
            <div className="card-icon">
              <Icon name="layers" />
            </div>
            <h3>Our Vision</h3>
            <p className="text-muted">
              To be a trusted software partner for communities and institutions across India, helping them
              operate with greater transparency, efficiency, and ease.
            </p>
          </div>
          <div className="about-block">
            <div className="card-icon teal">
              <Icon name="check" />
            </div>
            <h3>Our Mission</h3>
            <p className="text-muted">
              To build focused, usable software products - starting with society management and education
              management - that solve real operational problems without unnecessary complexity.
            </p>
          </div>
          <div className="about-block">
            <div className="card-icon">
              <Icon name="shield" />
            </div>
            <h3>Our Approach</h3>
            <p className="text-muted">
              We prioritize reliability, usability, and continuous improvement. We work closely with customers
              during implementation to understand their specific needs before and after go-live.
            </p>
          </div>
        </div>
      </section>

      <section className="section about-approach-section">
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-6)", textAlign: "center", maxWidth: "720px" }}>
            <span className="eyebrow">Customer-Focused Implementation</span>
            <h2>Usability, Reliability, and Continuous Improvement</h2>
            <p className="text-muted" style={{ marginTop: "var(--space-4)" }}>
              Our approach to software development centers on understanding how societies and institutions
              actually operate day to day. We aim to build features that are genuinely useful, keep the
              software reliable for everyday use, and continue improving based on real customer feedback
              after implementation.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
