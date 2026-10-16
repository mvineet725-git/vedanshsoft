export interface TrustTopic {
  icon: "message" | "calendar" | "layers" | "wallet" | "shield" | "phone";
  question: string;
  answer: string;
}

export const TRUST_TOPICS: TrustTopic[] = [
  {
    icon: "message",
    question: "What does the software actually do?",
    answer:
      "Society Management Software helps housing societies manage residents, flats, maintenance billing, complaints, and notices. Education Management Software helps schools, colleges, coaching institutes, and tuition classes manage students, admissions, fees, attendance, and academic administration. You can explore both with our interactive, fictional-data demos before discussing a purchase.",
  },
  {
    icon: "calendar",
    question: "How does a product demonstration work?",
    answer:
      "Submit a demo request through any \"Request a Demo\" button on the site, including your product interest and organization details. Our team will contact you to schedule a live walkthrough tailored to your organization's requirements. You can also explore a self-guided, read-only demo with fictional sample data any time, without waiting for a call.",
  },
  {
    icon: "layers",
    question: "How are customization requests evaluated?",
    answer:
      "If your organization needs functionality beyond our standard Society or Education Management products, share your requirements through the enquiry form and select \"Custom Software Development.\" Our team will review feasibility, scope, and timeline with you directly before any commitment is made.",
  },
  {
    icon: "wallet",
    question: "How are pricing and commercial terms confirmed?",
    answer:
      "Pricing depends on the size of your organization, the modules you need, and your implementation requirements. We don't publish fixed public prices because they vary by scope. Use our Pricing page to describe your requirements, and our team will follow up with a tailored quote and commercial terms.",
  },
  {
    icon: "shield",
    question: "How is my organization's data handled?",
    answer:
      "Enquiry information you submit through this website is stored securely and accessible only to authorized Vedansh Software Services personnel through an authenticated admin system. See our Privacy Policy for full details on what is collected, why, and how you can request correction or deletion. Specific data-handling arrangements for implemented customer deployments are discussed and agreed during onboarding.",
  },
  {
    icon: "phone",
    question: "What support arrangements are available?",
    answer:
      "Support arrangements, including training and ongoing assistance, are discussed and agreed as part of your implementation plan. Contact our team to understand what's included for your specific requirement — we don't publish unverified response-time guarantees or support-tier claims on this website.",
  },
];
