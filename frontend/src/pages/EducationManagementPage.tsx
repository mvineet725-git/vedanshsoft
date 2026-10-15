import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import DashboardMockup from "../components/DashboardMockup";
import FeatureCard from "../components/FeatureCard";
import EnquiryForm from "../components/EnquiryForm";
import { EnquirySource, ProductInterest } from "../types/enquiry";
import "./SolutionPage.css";

const AUDIENCE = ["Schools", "Colleges", "Coaching Centers", "Tuition Classes", "Home Tuition Businesses", "Training Institutes"];

const FEATURES = [
  {
    icon: "users" as const,
    title: "Student Management",
    description: "Maintain organized student records in place of scattered registers and spreadsheets.",
  },
  {
    icon: "clipboard" as const,
    title: "Admissions & Enrollment",
    description: "Track enquiries and admissions through a structured enrollment process.",
  },
  {
    icon: "wallet" as const,
    title: "Fee Management",
    description: "Record fee structures, collections, and dues to reduce manual fee tracking effort.",
  },
  {
    icon: "calendar" as const,
    title: "Attendance Tracking",
    description: "Maintain attendance records for students across classes, courses, or batches.",
  },
  {
    icon: "layers" as const,
    title: "Class, Course & Batch Management",
    description: "Organize your institution's classes, courses, and batches in a structured way.",
  },
  {
    icon: "users" as const,
    title: "Teacher & Staff Management",
    description: "Maintain records of teaching and non-teaching staff involved in institution operations.",
  },
  {
    icon: "calendar" as const,
    title: "Timetable Management",
    description: "Plan and reference class and batch timetables in a centralized system.",
  },
  {
    icon: "message" as const,
    title: "Parent/Student Communication",
    description: "Share updates and announcements with students and parents more efficiently.",
  },
  {
    icon: "graduation" as const,
    title: "Examination & Results Management",
    description: "Record examination details and results as part of academic administration.",
  },
  {
    icon: "chart" as const,
    title: "Reports & Dashboards",
    description: "Access summarized academic and administrative reports for better oversight.",
  },
  {
    icon: "shield" as const,
    title: "Role-Based Access",
    description: "Control what administrators, teachers, and staff can view or manage based on their role.",
  },
  {
    icon: "building" as const,
    title: "Multi-Branch Management",
    description: "For institutions with multiple branches, manage operations across locations, where supported.",
  },
];

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
            <span className="eyebrow">Features & Benefits</span>
            <h2>Everything Your Institution Needs to Operate Smoothly</h2>
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
            <h2>Request an Education Software Demo</h2>
            <p className="text-muted" style={{ marginTop: "var(--space-3)", maxWidth: "480px" }}>
              Tell us about your institution and we'll show you how our software can simplify your administration.
            </p>
          </div>
          <EnquiryForm
            source={EnquirySource.EducationPage}
            defaultProduct={ProductInterest.EducationManagementSoftware}
            lockProduct
            title="Education Management Software Enquiry"
            subtitle="Fill in your details and our team will reach out to schedule a demo."
          />
        </div>
      </section>
    </Layout>
  );
}
