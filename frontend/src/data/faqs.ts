export const FAQ_CATEGORIES = [
  "Society Management",
  "Education Management",
  "Implementation",
  "Demo Requests",
  "Pricing and Customization",
  "Privacy and Security",
] as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

export interface FaqEntry {
  question: string;
  answer: string;
  category: FaqCategory;
}

export const GENERAL_FAQS: FaqEntry[] = [
  {
    category: "Society Management",
    question: "What is society management software?",
    answer:
      "Society management software is a digital system that helps residential and cooperative housing societies manage day-to-day administration - resident and flat records, maintenance billing, income and expenses, complaints, notices, and committee operations - in one place instead of spreadsheets and registers.",
  },
  {
    category: "Education Management",
    question: "What is education management software?",
    answer:
      "Education management software helps schools, colleges, coaching institutes, and tuition classes manage students, admissions, fees, attendance, batches, staff, and academic administration digitally, reducing manual paperwork and improving visibility for administrators.",
  },
  {
    category: "Implementation",
    question: "Which types of organizations can use your software?",
    answer:
      "Our Society Management Software is built for residential housing societies, cooperative housing societies, and apartment complexes. Our Education Management Software is built for schools, colleges, coaching institutes, tuition classes, and training institutes.",
  },
  {
    category: "Demo Requests",
    question: "Can we request a product demonstration?",
    answer:
      "Yes. You can request a free demo from the homepage, the relevant solution page, or the Contact Us page. We also offer a read-only interactive demo with fictional sample data that you can explore right away without registering. Our team will reach out to schedule a live demo convenient to you.",
  },
  {
    category: "Implementation",
    question: "Is training available?",
    answer:
      "Training arrangements can be discussed as part of your implementation plan. Please contact us to understand what is included for your specific requirement.",
  },
  {
    category: "Pricing and Customization",
    question: "Can the software be customized?",
    answer:
      "We offer custom software development services in addition to our core products. Please share your requirements through the enquiry form and our team will discuss feasibility and scope with you.",
  },
  {
    category: "Pricing and Customization",
    question: "How is pricing determined?",
    answer:
      "Pricing depends on factors such as the size of your society or institution, the modules you need, and your implementation requirements. Contact us for a quotation tailored to your needs.",
  },
  {
    category: "Implementation",
    question: "Can the software be accessed on mobile devices?",
    answer:
      "Our solutions are designed to be accessible on mobile devices through a responsive interface. Specific mobile app availability can be confirmed with our team based on your plan.",
  },
  {
    category: "Privacy and Security",
    question: "How is customer information protected?",
    answer:
      "We take data protection seriously and apply secure software development practices, including validated inputs, secure data storage, and restricted administrative access. For full details, please contact us or refer to our Privacy Policy.",
  },
  {
    category: "Demo Requests",
    question: "Is the interactive demo connected to real customer data?",
    answer:
      "No. The interactive demo uses entirely fictional sample records created for demonstration purposes only. It is not connected to our production database, and no real customer information is ever shown there.",
  },
  {
    category: "Privacy and Security",
    question: "Who can access enquiries I submit?",
    answer:
      "Enquiry information is accessible only to authorized Vedansh Software Services personnel through a secure, authenticated admin system. See our Privacy Policy for full details on data handling.",
  },
];
