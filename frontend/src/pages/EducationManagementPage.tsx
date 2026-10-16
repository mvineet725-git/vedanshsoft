import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import DashboardMockup from "../components/DashboardMockup";
import FeatureExplorer from "../components/FeatureExplorer";
import InstitutionTypeSelector from "../components/InstitutionTypeSelector";
import MultiStepEnquiryForm from "../components/MultiStepEnquiryForm";
import { EDUCATION_EXPLORER_FEATURES } from "../data/educationFeatures";
import { EnquirySource, ProductInterest } from "../types/enquiry";
import "./SolutionPage.css";

const AUDIENCE = ["Schools", "Colleges", "Coaching Centers", "Tuition Classes", "Home Tuition Businesses", "Training Institutes"];

export default function EducationManagementPage() {
  return (
    <Layout>
      <Seo
        title="Education Management Software | Coaching & School Management | Vedansh Software"
        description="Education management software for schools, colleges, coaching institutes, and tuition classes in India. Manage students, admissions, fees, attendance, and more."
        canonicalPath="/solutions/education-management"
      />

      <section className="solution-hero tone-teal">
        <div className="container solution-hero-grid">
          <div>
            <span className="eyebrow">Education Management Software</span>
            <h1>Simplify Administration for Your Educational Institution</h1>
            <p>
              Manage students, admissions, fees, attendance, batches, staff, and academic administration with a
              system built for schools, colleges, coaching institutes, and tuition classes.
            </p>
            <div className="solution-hero-ctas">
              <Link to="/contact?product=education&demo=true" className="btn btn-primary">
                Request an Education Software Demo
              </Link>
              <a href="#enquiry" className="btn btn-secondary" style={{ borderColor: "#fff", color: "#fff" }}>
                Enquire Now
              </a>
            </div>
          </div>
          <div className="solution-hero-visual">
            <DashboardMockup />
          </div>
        </div>
      </section>

      <section className="section audience-section">
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-6)", textAlign: "center" }}>
            <span className="eyebrow">Who It's For</span>
            <h2>Built for Educational Institutions of Every Size</h2>
          </div>
          <div className="audience-list">
            {AUDIENCE.map((item) => (
              <span className="audience-chip" key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-7)", textAlign: "center" }}>
            <span className="eyebrow">Choose Your Institution Type</span>
            <h2>See What's Relevant to Your Institution</h2>
            <p className="text-muted" style={{ marginTop: "var(--space-4)" }}>
              Select the type of institution you run to see illustrative sample metrics relevant to it.
            </p>
          </div>
          <InstitutionTypeSelector />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-7)", textAlign: "center" }}>
            <span className="eyebrow">Features & Benefits</span>
            <h2>Everything Your Institution Needs to Operate Smoothly</h2>
            <p className="text-muted" style={{ marginTop: "var(--space-4)" }}>
              Select a category below to explore how each feature works.
            </p>
          </div>
          <FeatureExplorer
            features={EDUCATION_EXPLORER_FEATURES}
            demoLink="/demo/education"
            demoLabel="Try This in the Interactive Demo"
          />
          <div className="feature-note">
            <span>&#9432;</span>
            <p>
              Feature availability may vary by plan and implementation stage. Features above reflect our current
              product direction; please confirm specific feature availability with our team before purchase.
            </p>
          </div>
        </div>
      </section>

      <section className="section solution-cta-section" id="enquiry">
        <div className="container solution-cta-grid">
          <div>
            <h2>Request an Education Software Demo</h2>
            <p className="text-muted" style={{ marginTop: "var(--space-3)", maxWidth: "480px" }}>
              Tell us about your institution and we'll show you how our software can simplify your administration.
            </p>
          </div>
          <MultiStepEnquiryForm
            source={EnquirySource.EducationPage}
            defaultProduct={ProductInterest.EducationManagementSoftware}
            lockProduct
            title="Education Management Software Enquiry"
            subtitle="A few quick steps and our team will reach out to schedule a demo."
          />
        </div>
      </section>
    </Layout>
  );
}
