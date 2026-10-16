export interface ProblemEntry {
  problem: string;
  howWeHelp: string;
}

export const SOCIETY_PROBLEMS: ProblemEntry[] = [
  {
    problem: "Records scattered across registers and spreadsheets",
    howWeHelp: "Keep resident, flat, and ownership records in one searchable system instead of multiple files.",
  },
  {
    problem: "Difficulty tracking maintenance payments",
    howWeHelp: "Generate maintenance bills and track payment status so dues are easy to see at a glance.",
  },
  {
    problem: "Delayed complaint follow-ups",
    howWeHelp: "Let residents log complaints and let committees track them from open to resolved.",
  },
  {
    problem: "Repeated manual administrative work",
    howWeHelp: "Reduce repetitive data entry by keeping records structured and reusable across tasks.",
  },
  {
    problem: "Difficulty finding historical records",
    howWeHelp: "Search past records, notices, and complaints instead of digging through old files.",
  },
  {
    problem: "Communication gaps among residents and committee members",
    howWeHelp: "Share notices and announcements digitally so information reaches everyone at once.",
  },
];

export const EDUCATION_PROBLEMS: ProblemEntry[] = [
  {
    problem: "Maintaining student records manually",
    howWeHelp: "Keep organized, searchable student profiles instead of scattered registers.",
  },
  {
    problem: "Tracking fees and outstanding balances",
    howWeHelp: "Record fee structures and collections so dues are visible without manual reconciliation.",
  },
  {
    problem: "Organizing attendance records",
    howWeHelp: "Maintain structured attendance records across classes, courses, or batches.",
  },
  {
    problem: "Managing classes, batches, and staff information",
    howWeHelp: "Organize batches, courses, and staff records in a structured, reusable system.",
  },
  {
    problem: "Preparing administrative reports",
    howWeHelp: "Access summarized reports and dashboards instead of compiling data by hand.",
  },
  {
    problem: "Handling repetitive office tasks",
    howWeHelp: "Reduce manual re-entry of the same information across admissions, fees, and records.",
  },
];
