import Layout from "../components/Layout";
import Seo from "../components/Seo";
import SolutionCard from "../components/SolutionCard";
import "./SolutionPage.css";

export default function SolutionsOverviewPage() {
  return (
    <Layout>
      <Seo
        title="Our Solutions | Society & Education Management Software | Vedansh Software"
        description="Explore Vedansh Software Services' two core products: Society Management Software for housing societies and Education Management Software for schools and coaching institutes."
        canonicalPath="/solutions"
      />

      <section className="section" style={{ paddingTop: "var(--space-9)" }}>
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-7)", textAlign: "center", maxWidth: "720px" }}>
            <span className="eyebrow">Our Solutions</span>
            <h1>Two Focused Products, Built for Real Operations</h1>
            <p className="text-muted" style={{ marginTop: "var(--space-4)" }}>
              We build practical software for two specific audiences: residential housing societies and
              educational institutions. Explore each solution below.
            </p>
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
                "Role-based access and administrative dashboards",
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
                "Staff and timetable management",
                "Parent/student communication and reporting",
              ]}
              ctaLabel="Explore Education Management"
              ctaTo="/solutions/education-management"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
