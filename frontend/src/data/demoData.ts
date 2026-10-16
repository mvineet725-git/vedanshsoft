/**
 * Entirely fictional demo data for the public, read-only product explorer demos.
 * None of this represents real customers, residents, students, or records.
 */

export interface DemoFlat {
  flatNo: string;
  owner: string;
  status: "Occupied" | "Vacant";
  maintenanceStatus: "Paid" | "Due" | "Overdue";
}

export const DEMO_SOCIETY = {
  name: "Green Valley Residency",
  location: "Illustrative example society",
  units: 48,
  flats: [
    { flatNo: "A-101", owner: "R. Kulkarni", status: "Occupied", maintenanceStatus: "Paid" },
    { flatNo: "A-102", owner: "S. Mehta", status: "Occupied", maintenanceStatus: "Due" },
    { flatNo: "A-103", owner: "—", status: "Vacant", maintenanceStatus: "Paid" },
    { flatNo: "B-201", owner: "A. Joshi", status: "Occupied", maintenanceStatus: "Overdue" },
    { flatNo: "B-202", owner: "N. Rao", status: "Occupied", maintenanceStatus: "Paid" },
    { flatNo: "B-203", owner: "P. Iyer", status: "Occupied", maintenanceStatus: "Paid" },
  ] as DemoFlat[],
  notices: [
    { title: "Annual General Meeting", date: "2026-11-12", body: "AGM scheduled in the community hall at 6 PM." },
    { title: "Water Supply Maintenance", date: "2026-11-05", body: "Water supply will be interrupted from 10 AM to 1 PM for tank cleaning." },
    { title: "Festival Celebration", date: "2026-10-28", body: "Society committee invites all residents to the festival gathering." },
  ],
  complaints: [
    { id: "C-1042", flat: "B-201", subject: "Lift not working", status: "In Progress" },
    { id: "C-1041", flat: "A-102", subject: "Parking dispute", status: "Resolved" },
    { id: "C-1040", flat: "A-103", subject: "Common area lighting", status: "Open" },
  ],
};

export interface DemoStudent {
  name: string;
  course: string;
  batch: string;
  feeStatus: "Paid" | "Due";
  attendance: number;
}

export const DEMO_INSTITUTE = {
  name: "Bright Future Coaching Center",
  location: "Illustrative example institute",
  students: [
    { name: "Aarav Sharma", course: "Class 10 - Science", batch: "Morning Batch", feeStatus: "Paid", attendance: 94 },
    { name: "Diya Patel", course: "Class 10 - Science", batch: "Morning Batch", feeStatus: "Due", attendance: 88 },
    { name: "Kabir Singh", course: "JEE Foundation", batch: "Evening Batch", feeStatus: "Paid", attendance: 91 },
    { name: "Myra Desai", course: "NEET Foundation", batch: "Weekend Batch", feeStatus: "Paid", attendance: 97 },
  ] as DemoStudent[],
  batches: [
    { name: "Morning Batch", course: "Class 10 - Science", students: 32, time: "7:00 AM - 9:00 AM" },
    { name: "Evening Batch", course: "JEE Foundation", students: 28, time: "5:00 PM - 7:30 PM" },
    { name: "Weekend Batch", course: "NEET Foundation", students: 24, time: "Sat-Sun, 10 AM - 1 PM" },
  ],
  examResults: [
    { student: "Aarav Sharma", exam: "Monthly Test 3", score: "87/100" },
    { student: "Diya Patel", exam: "Monthly Test 3", score: "79/100" },
    { student: "Kabir Singh", exam: "Mock Test 2", score: "212/300" },
  ],
};
