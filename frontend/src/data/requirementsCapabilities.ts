export interface CapabilityOption {
  id: string;
  label: string;
}

export const SOCIETY_CAPABILITIES: CapabilityOption[] = [
  { id: "flat-records", label: "Society & flat records" },
  { id: "resident-records", label: "Resident & owner records" },
  { id: "maintenance-billing", label: "Maintenance billing & payment tracking" },
  { id: "income-expense", label: "Income & expense management" },
  { id: "complaints", label: "Complaints & service requests" },
  { id: "notices", label: "Notices & announcements" },
  { id: "visitor-mgmt", label: "Visitor management" },
  { id: "staff-committee", label: "Staff & committee management" },
  { id: "reports", label: "Reports & dashboards" },
];

export const EDUCATION_CAPABILITIES: CapabilityOption[] = [
  { id: "student-mgmt", label: "Student management" },
  { id: "admissions", label: "Admissions & enrollment" },
  { id: "fees", label: "Fee management" },
  { id: "attendance", label: "Attendance tracking" },
  { id: "batches", label: "Class, course & batch management" },
  { id: "staff", label: "Teacher & staff management" },
  { id: "timetable", label: "Timetable management" },
  { id: "exams", label: "Examination & results" },
  { id: "reports", label: "Reports & dashboards" },
];
