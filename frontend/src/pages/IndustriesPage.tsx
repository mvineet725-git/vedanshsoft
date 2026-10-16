import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Icon, { type IconName } from "../components/Icon";
import "./IndustriesPage.css";

interface IndustryEntry {
  icon: IconName;
  title: string;
  challenge: string;
  help: string;
  ctaTo: string;
}

const INDUSTRIES: IndustryEntry[] = [
  {
    icon: "building",
    title: "Residential Housing Societies",
    challenge: "Managing flats, residents, maintenance collection, and notices often relies on registers and WhatsApp groups, making it hard to keep accurate records.",
    help: "Our Society Management Software centralizes resident records, maintenance billing, complaints, and notices in one organized system.",
    ctaTo: "/solutions/society-management",
  },
  {
    icon: "users",
    title: "Cooperative Housing Societies",
    challenge: "Committees need transparent financial records and clear communication with members, often while managing operations voluntarily alongside other responsibilities.",
    help: "Structured income/expense tracking and administrative dashboards help committees manage society operations with more transparency.",
    ctaTo: "/solutions/cooperative-housing-society-software",
  },
  {
    icon: "graduation",
    title: "Schools",
    challenge: "Schools manage large volumes of student records, attendance, fees, and academic data, often across multiple spreadsheets and manual processes.",
    help: "Our Education Management Software centralizes student records, attendance, fees, and academic administration in one place.",
    ctaTo: "/solutions/school-management-software",
  },
  {
    icon: "book",
    title: "Colleges",
    challenge: "Colleges need to manage admissions, course/batch structures, staff, and examinations while keeping administrative overhead manageable.",
    help: "Course and batch management, staff records, and examination tracking help streamline day-to-day college administration.",
    ctaTo: "/solutions/education-management",
  },
  {
    icon: "clipboard",
    title: "Coaching Institutes",
    challenge: "Coaching institutes often run multiple batches and need to track attendance, fees, and performance without administrative software built for their scale.",
    help: "Batch management, fee tracking, and attendance records help coaching institutes run more efficiently as they grow.",
    ctaTo: "/solutions/coaching-institute-management-software",
  },
  {
    icon: "message",
    title: "Tuition Classes",
    challenge: "Smaller tuition businesses need a simple, affordable way to track students, fees, and schedules without complex enterprise software.",
    help: "A practical, focused system to manage students, fees, and class schedules without unnecessary complexity.",
    ctaTo: "/solutions/education-management",
  },
  {
    icon: "layers",
    title: "Training Institutes",
    challenge: "Training institutes often manage multiple courses, trainers, and batches, with a need for clear scheduling and record-keeping.",
    help: "Course, batch, and staff management features help training institutes keep operations organized as offerings expand.",
    ctaTo: "/solutions/education-management",
  },
];

export default function IndustriesPage() {
  return (
    <Layout>
      <Seo
        title="Industries We Serve | Vedansh Software Services"
        description="Vedansh Software Services supports residential housing societies, cooperative societies, schools, colleges, coaching institutes, tuition classes, and training institutes."
        canonicalPath="/industries"
      />

      <section className="section" style={{ paddingTop: "var(--space-9)" }}>
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-7)", textAlign: "center", maxWidth: "720px" }}>
            <span className="eyebrow">Industries We Serve</span>
            <h1>Software Built Around the Way You Operate</h1>
          </div>

          <div className="industry-list">
            {INDUSTRIES.map((industry) => (
              <div className="industry-row" key={industry.title}>
                <div className="industry-row-icon">
                  <Icon name={industry.icon} size={32} />
                </div>
                <div className="industry-row-body">
                  <h3>{industry.title}</h3>
                  <p className="text-muted" style={{ marginTop: "var(--space-2)" }}>
                    <strong>Challenge: </strong>{industry.challenge}
                  </p>
                  <p className="text-muted" style={{ marginTop: "var(--space-2)" }}>
                    <strong>How we help: </strong>{industry.help}
                  </p>
                  <Link to={industry.ctaTo} className="btn btn-ghost" style={{ marginTop: "var(--space-3)", paddingInline: 0 }}>
                    Learn more &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
