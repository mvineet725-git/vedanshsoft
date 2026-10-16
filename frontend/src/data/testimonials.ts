export interface Testimonial {
  customerName: string;
  organizationName: string;
  organizationType: string;
  city: string;
  quote: string;
  approved: boolean;
}

/**
 * Real, approved customer testimonials go here once provided and approved by
 * the customer. Empty until then — components check this array and fall back
 * to the "What Organizations Can Explore" feature-walkthrough section when empty.
 */
export const APPROVED_TESTIMONIALS: Testimonial[] = [];

export interface ExploreScenario {
  icon: "building" | "graduation";
  title: string;
  description: string;
  demoLink: string;
}

export const EXPLORE_SCENARIOS: ExploreScenario[] = [
  {
    icon: "building",
    title: "See how a society tracks maintenance collection",
    description:
      "Explore a fictional society's dashboard showing flats, resident records, and maintenance payment status at a glance.",
    demoLink: "/demo/society",
  },
  {
    icon: "building",
    title: "See how complaints get tracked to resolution",
    description:
      "Walk through a sample complaints log showing how a committee can track status from open to resolved.",
    demoLink: "/demo/society",
  },
  {
    icon: "graduation",
    title: "See how a coaching institute manages batches",
    description:
      "Explore fictional batch, attendance, and fee records for a sample coaching institute.",
    demoLink: "/demo/education",
  },
  {
    icon: "graduation",
    title: "See how exam results get recorded",
    description:
      "Walk through sample student exam records to see how academic tracking could work for your institution.",
    demoLink: "/demo/education",
  },
];
