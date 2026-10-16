import type { ExplorerFeature } from "../components/FeatureExplorer";

export const EDUCATION_EXPLORER_FEATURES: ExplorerFeature[] = [
  {
    id: "student-management",
    icon: "users",
    title: "Student Management",
    problem: "Student records scattered across registers and spreadsheets make it hard to get a clear picture.",
    solution: "Maintain organized student records in place of scattered registers and spreadsheets.",
    bullets: ["Centralized student profiles", "Quick search and lookup", "Reduced manual record-keeping"],
  },
  {
    id: "admissions",
    icon: "clipboard",
    title: "Admissions",
    problem: "Tracking enquiries through to enrollment manually often leads to lost follow-ups.",
    solution: "Track enquiries and admissions through a structured enrollment process.",
    bullets: ["Structured admission pipeline", "Enquiry-to-enrollment tracking", "Reduced follow-up gaps"],
  },
  {
    id: "fees",
    icon: "wallet",
    title: "Fees and Payments",
    problem: "Manual fee tracking makes it difficult to know who has paid and who hasn't.",
    solution: "Record fee structures, collections, and dues to reduce manual fee tracking effort.",
    bullets: ["Fee structure records", "Collection and dues tracking", "Clearer financial visibility"],
  },
  {
    id: "attendance",
    icon: "calendar",
    title: "Attendance",
    problem: "Paper attendance registers are time-consuming to maintain and hard to analyze.",
    solution: "Maintain attendance records for students across classes, courses, or batches.",
    bullets: ["Structured attendance records", "Per-batch tracking", "Easier attendance review"],
  },
  {
    id: "classes-batches",
    icon: "layers",
    title: "Classes and Batches",
    problem: "Organizing multiple classes, courses, and batches manually gets complex as you grow.",
    solution: "Organize your institution's classes, courses, and batches in a structured way.",
    bullets: ["Structured batch organization", "Course-to-batch mapping", "Easier scaling as you grow"],
  },
  {
    id: "staff",
    icon: "users",
    title: "Teacher and Staff Management",
    problem: "Teaching and non-teaching staff records are often kept informally.",
    solution: "Maintain records of teaching and non-teaching staff involved in institution operations.",
    bullets: ["Staff role records", "Organized staff directory", "Clearer operational reference"],
  },
  {
    id: "timetable",
    icon: "calendar",
    title: "Timetables",
    problem: "Manually coordinating timetables across classes and teachers is time-consuming.",
    solution: "Plan and reference class and batch timetables in a centralized system.",
    bullets: ["Centralized timetable reference", "Batch and class scheduling", "Reduced scheduling conflicts"],
  },
  {
    id: "exams",
    icon: "graduation",
    title: "Examination and Results",
    problem: "Compiling exam results manually from multiple sources is slow and error-prone.",
    solution: "Record examination details and results as part of academic administration.",
    bullets: ["Structured exam records", "Results tracking", "Easier academic reporting"],
  },
  {
    id: "reports",
    icon: "chart",
    title: "Reports and Analytics",
    problem: "Generating academic and administrative reports manually takes significant staff time.",
    solution: "Access summarized academic and administrative reports for better oversight.",
    bullets: ["Summarized reports", "Academic and administrative overview", "Easier decision-making"],
  },
];

export interface InstitutionTypeProfile {
  id: string;
  label: string;
  description: string;
}

export const INSTITUTION_TYPES: InstitutionTypeProfile[] = [
  { id: "school", label: "School", description: "K-12 schools managing multiple classes, sections, and subjects." },
  { id: "college", label: "College", description: "Colleges managing courses, departments, and semester-based academics." },
  { id: "coaching", label: "Coaching Institute", description: "Coaching centers running focused exam-preparation batches." },
  { id: "tuition", label: "Tuition Classes", description: "Smaller tuition businesses managing a few subjects and batches." },
  { id: "home-tuition", label: "Home Tuition", description: "Individual tutors managing personal student rosters and schedules." },
  { id: "training", label: "Training Institute", description: "Institutes running skill-based or professional training courses." },
];
