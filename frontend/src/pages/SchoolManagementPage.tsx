import IndustryLandingTemplate, { type IndustryLandingContent } from "../components/IndustryLandingTemplate";
import { EnquirySource, ProductInterest } from "../types/enquiry";

const content: IndustryLandingContent = {
  pageKey: "school_management",
  analyticsProduct: "education",
  path: "/solutions/school-management-software",
  metaTitle: "School Management Software | Vedansh Software Services",
  metaDescription:
    "Education management software built around how schools actually operate: multi-grade structures, parent communication, and academic administration across classes and sections.",
  eyebrow: "School Management Software",
  headline: "Administration Built Around How Schools Actually Run",
  intro:
    "Schools manage a fundamentally different operational structure than a coaching institute — multiple grades and sections, a fixed academic calendar, ongoing parent communication, and academic administration spanning an entire year. Our software supports that structure directly.",
  distinctPoints: [
    {
      title: "Multi-Grade, Multi-Section Structure",
      description:
        "Schools organize students across grades and sections, often with different subjects and teachers per section. Class and batch management reflects this structure rather than treating every group the same way.",
    },
    {
      title: "Ongoing Parent Communication",
      description:
        "Unlike a short-term coaching batch, a school relationship with a family spans years. Structured notices and communication features support ongoing, consistent contact with parents throughout the academic year.",
    },
    {
      title: "Academic Calendar and Examination Cycles",
      description:
        "Schools operate on fixed academic terms with periodic examinations and report cards. Examination and results record-keeping is structured around this recurring cycle rather than one-off tests.",
    },
    {
      title: "Admissions Tied to Academic Year",
      description:
        "School admissions typically follow an annual cycle with specific eligibility and grade-level considerations, different from the rolling enrollment common at coaching institutes.",
    },
  ],
  productPath: "/solutions/education-management",
  productLabel: "Education Management Software",
  enquiryProduct: ProductInterest.EducationManagementSoftware,
  enquirySource: EnquirySource.EducationPage,
};

export default function SchoolManagementPage() {
  return <IndustryLandingTemplate content={content} />;
}
