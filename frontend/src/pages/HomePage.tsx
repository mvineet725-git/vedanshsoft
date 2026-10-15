import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import DashboardMockup from "../components/DashboardMockup";
import SolutionCard from "../components/SolutionCard";
import FeatureCard from "../components/FeatureCard";
import FaqAccordion from "../components/FaqAccordion";
import EnquiryForm from "../components/EnquiryForm";
import Icon from "../components/Icon";
import { GENERAL_FAQS } from "../data/faqs";
import { EnquirySource, ProductInterest } from "../types/enquiry";
import "./HomePage.css";

const INDUSTRIES = [
  { icon: "building" as const, label: "Residential Housing Societies" },
  { icon: "users" as const, label: "Cooperative Housing Societies" },
  { icon: "graduation" as const, label: "Schools" },
  { icon: "book" as const, label: "Colleges" },
  { icon: "clipboard" as const, label: "Coaching Institutes" },
  { icon: "message" as const, label: "Tuition Classes" },
  { icon: "layers" as const, label: "Training Institutes" },
];

const BENEFITS = [
  {
    icon: "clock" as const,
    title: "Save Valuable Time",
    description: "Replace manual registers and spreadsheets with streamlined digital workflows that cut admin effort.",
  },
  {
    icon: "shield" as const,
    title: "Improve Transparency",
    description: "Give residents, students, parents, and staff clear visibility into records, dues, and communication.",
  },
  {
    icon: "chart" as const,
    title: "Better Decision-Making",
    description: "Centralized reports and dashboards help committees and administrators make informed decisions.",
  },
  {
    icon: "mobile" as const,
    title: "Accessible Anywhere",
    description: "Manage operations and stay updated from a responsive interface that works across devices.",
  },
];

const PROCESS_STEPS = [
  { title: "Discovery Call", description: "We understand your society or institution's specific requirements and challenges." },
  { title: "Demo & Proposal", description: "We walk you through the relevant software and share an implementation proposal." },
  { title: "Setup & Data Migration", description: "We help configure the system and migrate your existing records." },
  { title: "Training & Go-Live", description: "Your team is onboarded and the software goes live for daily use." },
  { title: "Ongoing Support", description: "We remain available for queries, follow-ups, and continuous improvement." },
];

export default function HomePage() {
  return (
    <Layout>
      <Seo
        title="Vedansh Software Services | Society & Education Management Software"
        description="Smart society management and education management software for Indian housing societies, schools, and coaching institutes. Request a free demo today."
        canonicalPath="/"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Vedansh Software Services",
          url: "https://www.vedanshsoftware.com/",
          email: "mailto:vedanshsoft@gmail.com",
          telephone: "+91-9172476575",
          description:
            "Vedansh Software Services builds society management software and education management software for Indian housing societies and educational institutions.",
        })}
      </script>

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Software for Communities & Institutions</span>
            <h1>Smart Software Solutions for Smarter Communities and Institutions</h1>
            <p className="hero-sub">
              Manage your residential society and educational institution with practical, modern software
              designed to simplify operations, improve transparency, and save valuable time.
            </p>
            <div className="hero-ctas">
              <Link to="/contact?demo=true" className="btn btn-primary">
                Request a Free Demo
              </Link>
              <Link to="/solutions" className="btn btn-secondary">
                Explore Our Solutions
              </Link>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="false">
            <DashboardMockup />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-7)", textAlign: "center" }}>
            <span className="eyebrow">Our Solutions</span>
            <h2>Two Focused Products, Built for Real Operations</h2>
          </div>
          <div className="grid grid-2">
            <SolutionCard
              tone="navy"
              icon="building"
              title="Society Management Software"
              description="Simplify residential society operations end to end."
              bullets={[
                "Manage residents, flats, and owner records",
                "Maintenance billing and payment tracking",
                "Complaints, notices, and society administration",
              ]}
              ctaLabel="Explore Society Management"
              ctaTo="/solutions/society-management"
            />
            <SolutionCard
              tone="teal"
              icon="graduation"
              title="Education Management Software"
              description="Simplify day-to-day operations of educational institutions."
              bullets={[
                "Manage students, admissions, and fees",
                "Attendance, batches, and academic administration",
                "Staff management and reporting",
              ]}
              ctaLabel="Explore Education Management"
              ctaTo="/solutions/education-management"
            />
          </div>
        </div>
      </section>

      <section className="section industries-section">
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-7)", textAlign: "center" }}>
            <span className="eyebrow">Industries We Serve</span>
            <h2>Built for the Organizations That Need It Most</h2>
          </div>
          <div className="industries-grid">
            {INDUSTRIES.map((industry) => (
              <Link to="/industries" key={industry.label} className="industry-chip">
                <Icon name={industry.icon} size={24} />
                <span>{industry.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-7)", textAlign: "center" }}>
            <span className="eyebrow">Key Benefits</span>
            <h2>Why Organizations Choose Our Software</h2>
          </div>
          <div className="grid grid-4">
            {BENEFITS.map((benefit) => (
              <FeatureCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      <section className="section why-choose-section">
        <div className="container why-choose-grid">
          <div>
            <span className="eyebrow">Why Choose Vedansh Software Services</span>
            <h2>Practical Software, Built Around How You Actually Work</h2>
            <p className="text-muted" style={{ marginTop: "var(--space-4)", maxWidth: "560px" }}>
              We focus on two specific problem areas instead of trying to do everything. That means our
              Society Management and Education Management products are built around real operational
              workflows, not generic templates.
            </p>
            <ul className="why-choose-list">
              <li><Icon name="check" size={20} /><span>Focused products for societies and educational institutions</span></li>
              <li><Icon name="check" size={20} /><span>Role-based access so the right people see the right information</span></li>
              <li><Icon name="check" size={20} /><span>Responsive design that works on phones, tablets, and desktops</span></li>
              <li><Icon name="check" size={20} /><span>Direct support from a team that understands your domain</span></li>
            </ul>
          </div>
          <div className="how-it-helps-card">
            <h3>How Our Software Helps Your Business</h3>
            <p className="text-muted" style={{ marginTop: "var(--space-3)" }}>
              Whether you manage a housing society or an educational institution, our software reduces
              manual effort, centralizes records, and gives you clear visibility into operations - so you can
              focus on your residents, students, and staff instead of paperwork.
            </p>
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-7)", textAlign: "center" }}>
            <span className="eyebrow">Our Implementation Process</span>
            <h2>From First Call to Go-Live</h2>
          </div>
          <div className="process-steps">
            {PROCESS_STEPS.map((step, index) => (
              <div className="process-step" key={step.title}>
                <div className="process-step-number">{index + 1}</div>
                <h4>{step.title}</h4>
                <p className="text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-7)", textAlign: "center" }}>
            <span className="eyebrow">FAQs</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <FaqAccordion items={GENERAL_FAQS} />
          </div>
        </div>
      </section>

      <section className="section final-cta-section">
        <div className="container final-cta-grid">
          <div>
            <h2 style={{ color: "#fff" }}>Ready to Simplify Your Operations?</h2>
            <p style={{ color: "#cbd8ea", marginTop: "var(--space-3)", maxWidth: "480px" }}>
              Request a free, no-obligation demo and see how our software fits your society or institution.
            </p>
          </div>
          <div id="demo-form">
            <EnquiryForm source={EnquirySource.HomePage} defaultProduct={ProductInterest.SocietyManagementSoftware} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
