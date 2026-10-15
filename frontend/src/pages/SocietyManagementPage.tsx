import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import DashboardMockup from "../components/DashboardMockup";
import FeatureCard from "../components/FeatureCard";
import EnquiryForm from "../components/EnquiryForm";
import { EnquirySource, ProductInterest } from "../types/enquiry";
import "./SolutionPage.css";

const AUDIENCE = [
  "Cooperative Housing Societies",
  "Apartment Complexes",
  "Residential Communities",
  "Society Management Committees",
  "Society Administrators & Property Managers",
];

const FEATURES = [
  {
    icon: "building" as const,
    title: "Society & Flat Management",
    description: "Maintain a structured record of wings, flats, and ownership details in one organized system.",
  },
  {
    icon: "users" as const,
    title: "Resident & Owner Records",
    description: "Keep accurate, up-to-date records of residents and owners, reducing manual registers.",
  },
  {
    icon: "wallet" as const,
    title: "Maintenance Billing & Payment Tracking",
    description: "Generate maintenance bills and track payments to improve collection and reduce follow-up effort.",
  },
  {
    icon: "chart" as const,
    title: "Income & Expense Management",
    description: "Record society income and expenses in a structured way to support transparent financial reporting.",
  },
  {
    icon: "message" as const,
    title: "Complaints & Service Requests",
    description: "Let residents raise complaints and service requests, and let committees track resolution status.",
  },
  {
    icon: "bell" as const,
    title: "Notices & Announcements",
    description: "Share notices and announcements with residents quickly instead of relying on physical notice boards.",
  },
  {
    icon: "shield" as const,
    title: "Visitor & Facility Management",
    description: "Support structured tracking of visitor entries and shared facility usage within the society premises.",
  },
  {
    icon: "clipboard" as const,
    title: "Committee & Staff Management",
    description: "Maintain records of committee members and staff involved in society operations.",
  },
  {
    icon: "chart" as const,
    title: "Reports & Administrative Dashboards",
    description: "Access summarized reports and dashboards for a clearer view of society operations.",
  },
  {
    icon: "shield" as const,
    title: "Role-Based Access",
    description: "Control who can view or manage specific information based on their role within the society.",
  },
  {
    icon: "mobile" as const,
    title: "Mobile-Friendly Access",
    description: "Use the software comfortably from phones and tablets, not just desktop computers.",
  },
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
          </div>
          <div className="grid grid-3">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} tone="teal" />
            ))}
          </div>
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
          <EnquiryForm
            source={EnquirySource.SocietyPage}
            defaultProduct={ProductInterest.SocietyManagementSoftware}
            lockProduct
            title="Society Management Software Enquiry"
            subtitle="Fill in your details and our team will reach out to schedule a demo."
          />
        </div>
      </section>
    </Layout>
  );
}
