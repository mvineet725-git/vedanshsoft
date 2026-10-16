import IndustryLandingTemplate, { type IndustryLandingContent } from "../components/IndustryLandingTemplate";
import { EnquirySource, ProductInterest } from "../types/enquiry";

const content: IndustryLandingContent = {
  pageKey: "cooperative_housing_society",
  analyticsProduct: "society",
  path: "/solutions/cooperative-housing-society-software",
  metaTitle: "Cooperative Housing Society Software in India | Vedansh Software Services",
  metaDescription:
    "Society management software built around how cooperative housing societies actually operate: committee elections, AGMs, audits, and transparent financial reporting.",
  eyebrow: "Cooperative Housing Society Software",
  headline: "Built for How Cooperative Societies Actually Operate",
  intro:
    "Cooperative housing societies in India operate under a different governance model than a typical apartment complex — elected committees, defined terms, AGMs, and statutory audits. Our software is built to support that structure, not a generic \"residential building\" model.",
  distinctPoints: [
    {
      title: "Committee Terms and Elections",
      description:
        "Cooperative societies have elected committees with defined terms. Role-based access can be updated as committee composition changes after elections, without losing historical records tied to the society itself.",
    },
    {
      title: "AGM and Audit Preparation",
      description:
        "Cooperative societies have statutory requirements around annual general meetings and audits. Structured income, expense, and maintenance records make it easier to prepare the financial summaries these require.",
    },
    {
      title: "Member vs. Tenant Distinctions",
      description:
        "Cooperative societies often need to distinguish between member-owners and tenants for voting rights, notices, and certain financial matters — a distinction that generic apartment software doesn't always support cleanly.",
    },
    {
      title: "Transparent Financial Reporting to Members",
      description:
        "Members of a cooperative society have a right to transparency in society finances. Structured, consistent income and expense records make it easier for committees to present clear summaries to the general body.",
    },
  ],
  productPath: "/solutions/society-management",
  productLabel: "Society Management Software",
  enquiryProduct: ProductInterest.SocietyManagementSoftware,
  enquirySource: EnquirySource.SocietyPage,
};

export default function CooperativeSocietyPage() {
  return <IndustryLandingTemplate content={content} />;
}
