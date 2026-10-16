export interface PersonaEntry {
  id: string;
  role: string;
  icon: "clipboard" | "wallet" | "users" | "building" | "graduation" | "message";
  concern: string;
  whatTheyGet: string[];
}

export const SOCIETY_PERSONAS: PersonaEntry[] = [
  {
    id: "secretary",
    role: "Society Secretary",
    icon: "clipboard",
    concern: "Keeping resident records, notices, and correspondence organized and easy to retrieve.",
    whatTheyGet: [
      "Centralized resident and flat records",
      "Digital notices reaching all residents at once",
      "Searchable record history instead of paper files",
    ],
  },
  {
    id: "treasurer",
    role: "Society Treasurer / Cashier",
    icon: "wallet",
    concern: "Tracking maintenance collection, dues, and society income/expenses accurately.",
    whatTheyGet: [
      "Structured maintenance billing and payment tracking",
      "Clear visibility into who has paid and who hasn't",
      "Organized income and expense records for reporting",
    ],
  },
  {
    id: "committee",
    role: "Committee Member",
    icon: "users",
    concern: "Having visibility into society operations without needing to chase the secretary or treasurer.",
    whatTheyGet: [
      "Shared visibility into complaints and their status",
      "Access to notices and administrative reports",
      "Role-based access appropriate to committee responsibilities",
    ],
  },
  {
    id: "administrator",
    role: "Society Administrator / Property Manager",
    icon: "building",
    concern: "Managing day-to-day operations across multiple responsibilities without a central system.",
    whatTheyGet: [
      "One system for flats, residents, billing, and complaints",
      "Dashboards summarizing day-to-day operations",
      "Reduced manual, repetitive administrative work",
    ],
  },
];

export const EDUCATION_PERSONAS: PersonaEntry[] = [
  {
    id: "school-admin",
    role: "School Principal / Administrator",
    icon: "graduation",
    concern: "Overseeing student records, staff, and academic administration across many classes.",
    whatTheyGet: [
      "Centralized student and staff records",
      "Structured class, section, and timetable organization",
      "Summarized administrative reports",
    ],
  },
  {
    id: "college-admin",
    role: "College Administrator",
    icon: "building",
    concern: "Coordinating admissions, departments, and semester-based academic administration.",
    whatTheyGet: [
      "Structured admissions and enrollment tracking",
      "Course and batch organization",
      "Examination and results record-keeping",
    ],
  },
  {
    id: "coaching-owner",
    role: "Coaching Center Owner",
    icon: "clipboard",
    concern: "Running multiple batches efficiently while tracking attendance and fee collection closely.",
    whatTheyGet: [
      "Batch-wise attendance tracking",
      "Fee collection and dues visibility",
      "Organized student records across batches",
    ],
  },
  {
    id: "tuition-operator",
    role: "Tuition Teacher / Fee Administrator",
    icon: "wallet",
    concern: "Managing a smaller student roster and fee tracking without complex enterprise software.",
    whatTheyGet: [
      "Simple student and fee records",
      "Attendance tracking without paper registers",
      "A system sized appropriately for a smaller operation",
    ],
  },
];
