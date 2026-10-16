import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import DashboardMockup from "../components/DashboardMockup";
import FeatureExplorer from "../components/FeatureExplorer";
import MultiStepEnquiryForm from "../components/MultiStepEnquiryForm";
import { SOCIETY_EXPLORER_FEATURES } from "../data/societyFeatures";
import { EnquirySource, ProductInterest } from "../types/enquiry";
import "./SolutionPage.css";

const AUDIENCE = [
  "Cooperative Housing Societies",
  "Apartment Complexes",
  "Residential Communities",
  "Society Management Committees",
  "Society Administrators & Property Managers",
];

export default function SocietyManagementPage() {
  return (
    <Layout>
      <Seo
        title="Society Management Software in India | Vedansh Software Services"
        description="Housing society management software to manage residents, flats, maintenance billing, complaints, notices, and administration for Indian cooperative housing societies."
        canonicalPath="/solutions/society-management"
      />

      <section className="solution-hero tone-navy">
        <div className="container solution-hero-grid">
          <div>
            <span className="eyebrow">Society Management Software</span>
            <h1>Simplify Residential Society Operations, End to End</h1>
            <p>
              A practical system to manage residents, flats, maintenance, payments, complaints, notices, and
              day-to-day society administration - built for Indian housing and cooperative societies.
            </p>
            <div className="solution-hero-ctas">
              <Link to="/contact?product=society&demo=true" className="btn btn-primary">
                Request a Society Software Demo
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
            <h2>Built for Housing Societies and Their Committees</h2>
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
            <span className="eyebrow">Features & Benefits</span>
            <h2>Everything a Society Needs to Run Smoothly</h2>
            <p className="text-muted" style={{ marginTop: "var(--space-4)" }}>
              Select a category below to explore how each feature works.
            </p>
          </div>
          <FeatureExplorer
            features={SOCIETY_EXPLORER_FEATURES}
            demoLink="/demo/society"
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
            <h2>Request a Society Software Demo</h2>
            <p className="text-muted" style={{ marginTop: "var(--space-3)", maxWidth: "480px" }}>
              Tell us about your society and we'll show you how our software can simplify your day-to-day
              administration.
            </p>
          </div>
          <MultiStepEnquiryForm
            source={EnquirySource.SocietyPage}
            defaultProduct={ProductInterest.SocietyManagementSoftware}
            lockProduct
            title="Society Management Software Enquiry"
            subtitle="A few quick steps and our team will reach out to schedule a demo."
          />
        </div>
      </section>
    </Layout>
  );
}
