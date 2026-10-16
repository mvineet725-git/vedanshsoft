export const ProductInterest = {
  SocietyManagementSoftware: 0,
  EducationManagementSoftware: 1,
  CustomSoftwareDevelopment: 2,
  OtherEnquiry: 3,
} as const;
export type ProductInterest = (typeof ProductInterest)[keyof typeof ProductInterest];

export const PRODUCT_INTEREST_LABELS: Record<ProductInterest, string> = {
  0: "Society Management Software",
  1: "Education Management Software",
  2: "Custom Software Development",
  3: "Other Enquiry",
};

// Dashboard summary endpoints serialize dictionary keys as the C# enum member
// name (e.g. "SocietyManagementSoftware"), not the numeric value.
export const PRODUCT_INTEREST_LABELS_BY_NAME: Record<string, string> = {
  SocietyManagementSoftware: "Society Management Software",
  EducationManagementSoftware: "Education Management Software",
  CustomSoftwareDevelopment: "Custom Software Development",
  OtherEnquiry: "Other Enquiry",
};

export const PreferredContactMethod = {
  Phone: 0,
  Email: 1,
  WhatsApp: 2,
} as const;
export type PreferredContactMethod = (typeof PreferredContactMethod)[keyof typeof PreferredContactMethod];

export const CONTACT_METHOD_LABELS: Record<PreferredContactMethod, string> = {
  0: "Phone Call",
  1: "Email",
  2: "WhatsApp",
};

export const EnquiryStatus = {
  New: 0,
  Contacted: 1,
  DemoScheduled: 2,
  FollowUpRequired: 3,
  Converted: 4,
  Closed: 5,
  Qualified: 6,
  Proposal: 7,
} as const;
export type EnquiryStatus = (typeof EnquiryStatus)[keyof typeof EnquiryStatus];

export const ENQUIRY_STATUS_LABELS: Record<EnquiryStatus, string> = {
  0: "New",
  1: "Contacted",
  2: "Demo Scheduled",
  3: "Follow-up Required",
  4: "Converted",
  5: "Closed",
  6: "Qualified",
  7: "Proposal/Quotation",
};

export const ENQUIRY_STATUS_LABELS_BY_NAME: Record<string, string> = {
  New: "New",
  Contacted: "Contacted",
  DemoScheduled: "Demo Scheduled",
  FollowUpRequired: "Follow-up Required",
  Converted: "Converted",
  Closed: "Closed",
  Qualified: "Qualified",
  Proposal: "Proposal/Quotation",
};

export const ENQUIRY_STATUS_BADGE_CLASS: Record<EnquiryStatus, string> = {
  0: "badge-new",
  1: "badge-contacted",
  2: "badge-demo",
  3: "badge-followup",
  4: "badge-converted",
  5: "badge-closed",
  6: "badge-qualified",
  7: "badge-proposal",
};

export const EnquirySource = {
  Website: 0,
  ContactPage: 1,
  SocietyPage: 2,
  EducationPage: 3,
  HomePage: 4,
  Other: 5,
} as const;
export type EnquirySource = (typeof EnquirySource)[keyof typeof EnquirySource];

export const ENQUIRY_SOURCE_LABELS: Record<EnquirySource, string> = {
  0: "Website",
  1: "Contact Page",
  2: "Society Page",
  3: "Education Page",
  4: "Home Page",
  5: "Other",
};

export const ENQUIRY_SOURCE_LABELS_BY_NAME: Record<string, string> = {
  Website: "Website",
  ContactPage: "Contact Page",
  SocietyPage: "Society Page",
  EducationPage: "Education Page",
  HomePage: "Home Page",
  Other: "Other",
};

export interface CreateEnquiryRequest {
  fullName: string;
  mobileNumber: string;
  email?: string;
  organizationName?: string;
  organizationType?: string;
  city?: string;
  productInterestedIn: ProductInterest;
  preferredContactMethod?: PreferredContactMethod;
  message?: string;
  consentAccepted: boolean;
  enquirySource: EnquirySource;
  websiteUrl?: string;
}

export interface EnquiryConfirmationResponse {
  enquiryReferenceNumber: string;
  submittedAt: string;
  fullName: string;
  productInterestedIn: ProductInterest;
}

export interface EnquiryListItem {
  enquiryId: number;
  enquiryReferenceNumber: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  organizationName?: string;
  city?: string;
  productInterestedIn: ProductInterest;
  enquirySource: EnquirySource;
  status: EnquiryStatus;
  nextFollowUpDate?: string;
  createdAt: string;
}

export interface EnquiryNote {
  enquiryNoteId: number;
  note: string;
  createdBy: string;
  createdAt: string;
}

export interface EnquiryDetail extends EnquiryListItem {
  organizationType?: string;
  preferredContactMethod?: PreferredContactMethod;
  message?: string;
  assignedTo?: string;
  updatedAt: string;
  notes: EnquiryNote[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DashboardSummary {
  totalEnquiries: number;
  newEnquiries: number;
  followUpsDueToday: number;
  overdueFollowUps: number;
  enquiriesByProduct: Record<string, number>;
  enquiriesByStatus: Record<string, number>;
  enquiriesBySource: Record<string, number>;
  recentEnquiries: EnquiryListItem[];
}
