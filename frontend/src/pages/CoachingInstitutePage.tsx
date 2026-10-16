import IndustryLandingTemplate, { type IndustryLandingContent } from "../components/IndustryLandingTemplate";
import { EnquirySource, ProductInterest } from "../types/enquiry";

const content: IndustryLandingContent = {
  path: "/solutions/coaching-institute-management-software",
  metaTitle: "Coaching Institute Management Software | Vedansh Software Services",
  metaDescription:
    "Education management software built around how coaching institutes actually operate: multiple concurrent batches, exam-focused tracking, and fast-moving enrollment.",
  eyebrow: "Coaching Institute Management Software",
  headline: "Built for the Pace Coaching Institutes Actually Run At",
  intro:
    "Coaching institutes operate differently from schools — multiple concurrent batches by exam target or subject, rolling enrollment throughout the year, and attendance and performance tracking tied closely to exam preparation timelines. Our software reflects that operating model.",
  distinctPoints: [
    {
      title: "Multiple Concurrent Batches by Exam or Subject",
      description:
        "A coaching institute often runs several batches simultaneously, organized by target exam, subject, or time slot rather than by grade level. Batch management is structured to handle this directly.",
    },
    {
      title: "Rolling Enrollment, Not a Fixed Admission Cycle",
      description:
        "Unlike schools, coaching institutes frequently enroll students throughout the year as new batches start. Admissions and enrollment tracking accommodate this ongoing intake rather than a single annual cycle.",
    },
    {
      title: "Attendance Tied to Exam-Prep Timelines",
      description:
        "Attendance tracking at a coaching institute often needs to align with specific exam-preparation schedules and mock test cycles, rather than a full academic year calendar.",
    },
    {
      title: "Fee Structures per Batch or Course",
      description:
        "Coaching institutes commonly price by course or batch rather than a single annual fee, including installment plans. Fee management reflects this batch-specific structure.",
    },
  ],
  productPath: "/solutions/education-management",
  productLabel: "Education Management Software",
  enquiryProduct: ProductInterest.EducationManagementSoftware,
  enquirySource: EnquirySource.EducationPage,
};

export default function CoachingInstitutePage() {
  return <IndustryLandingTemplate content={content} />;
}
