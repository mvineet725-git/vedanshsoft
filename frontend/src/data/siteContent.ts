/**
 * Centralized, admin-editable-in-spirit configuration for illustrative content.
 *
 * IMPORTANT: Every numeric/statistical value in this file is SAMPLE / ILLUSTRATIVE
 * data for demo and UI purposes only. None of it represents verified business
 * metrics, real customers, or real deployments. When real, verified figures
 * become available, update VERIFIED_METRICS below (and only that constant) —
 * every component that renders metrics checks VERIFIED_METRICS first and only
 * falls back to illustrative data with an explicit "Illustrative Demo Data" label.
 */

export interface VerifiedMetric {
  label: string;
  value: string;
}

/**
 * Real, verified company metrics. Empty until the business owner provides
 * confirmed figures (customer counts, cities served, years active, etc.).
 * Do NOT add placeholder or estimated numbers here.
 */
export const VERIFIED_METRICS: VerifiedMetric[] = [];

export interface SampleDashboardMetric {
  label: string;
  value: string;
  progress?: number; // 0-100, for progress-bar style metrics
}

export const SOCIETY_SAMPLE_METRICS: SampleDashboardMetric[] = [
  { label: "Society Units", value: "120" },
  { label: "Maintenance Collection", value: "78%", progress: 78 },
  { label: "Open Service Requests", value: "6" },
  { label: "Active Residents", value: "340" },
];

export const EDUCATION_SAMPLE_METRICS: SampleDashboardMetric[] = [
  { label: "Students Enrolled", value: "450" },
  { label: "Active Batches", value: "18" },
  { label: "Fee Collection", value: "85%", progress: 85 },
  { label: "Average Attendance", value: "91%", progress: 91 },
];

export const COACHING_INSTITUTE_SAMPLE_METRICS: SampleDashboardMetric[] = [
  { label: "Active Students", value: "240" },
  { label: "Active Batches", value: "12" },
  { label: "Attendance", value: "92%", progress: 92 },
  { label: "Fee Collection", value: "81%", progress: 81 },
];

export interface IndiaCity {
  name: string;
  state: string;
  tier: 1 | 2;
}

/**
 * Illustrative target-market cities. These are example markets the products are
 * built for — NOT a claim of offices, active customers, or confirmed deployments
 * in any of these locations.
 */
export const INDIA_CITIES: IndiaCity[] = [
  { name: "Mumbai", state: "Maharashtra", tier: 1 },
  { name: "Pune", state: "Maharashtra", tier: 1 },
  { name: "Nagpur", state: "Maharashtra", tier: 2 },
  { name: "Nashik", state: "Maharashtra", tier: 2 },
  { name: "Thane", state: "Maharashtra", tier: 1 },
  { name: "Aurangabad (Chhatrapati Sambhajinagar)", state: "Maharashtra", tier: 2 },
  { name: "Bengaluru", state: "Karnataka", tier: 1 },
  { name: "Hyderabad", state: "Telangana", tier: 1 },
  { name: "Chennai", state: "Tamil Nadu", tier: 1 },
  { name: "Delhi", state: "Delhi", tier: 1 },
  { name: "Noida", state: "Uttar Pradesh", tier: 1 },
  { name: "Gurugram", state: "Haryana", tier: 1 },
  { name: "Ahmedabad", state: "Gujarat", tier: 1 },
  { name: "Surat", state: "Gujarat", tier: 2 },
  { name: "Jaipur", state: "Rajasthan", tier: 2 },
  { name: "Indore", state: "Madhya Pradesh", tier: 2 },
  { name: "Bhopal", state: "Madhya Pradesh", tier: 2 },
  { name: "Lucknow", state: "Uttar Pradesh", tier: 2 },
  { name: "Kolkata", state: "West Bengal", tier: 1 },
  { name: "Kochi", state: "Kerala", tier: 2 },
];

export const INDIA_STATES: string[] = Array.from(new Set(INDIA_CITIES.map((c) => c.state))).sort();
