import { Link } from "react-router-dom";
import Layout from "./Layout";
import Seo from "./Seo";
import MultiStepEnquiryForm from "./MultiStepEnquiryForm";
import type { AnalyticsProperties } from "../lib/analytics";
import { useTrackPageView } from "../lib/useTrackPageView";
import type { EnquirySource, ProductInterest } from "../types/enquiry";
import "../pages/IndustryLandingPage.css";
import "../pages/SolutionPage.css";

export interface IndustryLandingContent {
  pageKey: string;
  analyticsProduct: AnalyticsProperties["product"];
  path: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  intro: string;
  distinctPoints: { title: string; description: string }[];
  productPath: string;
  productLabel: string;
  enquiryProduct: ProductInterest;
  enquirySource: EnquirySource;
}

export default function IndustryLandingTemplate({ content }: { content: IndustryLandingContent }) {
  useTrackPageView(content.analyticsProduct, content.pageKey);

  return (
    <Layout>
      <Seo title={content.metaTitle} description={content.metaDescription} canonicalPath={content.path} />

      <section className="industry-landing-hero">
        <div className="container">
          <span className="eyebrow">{content.eyebrow}</span>
          <h1>{content.headline}</h1>
          <p>{content.intro}</p>
          <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-6)", flexWrap: "wrap" }}>
            <Link to={content.productPath} className="btn btn-secondary" style={{ borderColor: "#fff", color: "#fff" }}>
              Explore {content.productLabel}
            </Link>
            <a href="#enquiry" className="btn btn-primary">Request a Demo</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-7)", textAlign: "center" }}>
            <span className="eyebrow">What Makes This Different</span>
            <h2>Specific Considerations We Account For</h2>
          </div>
          <div className="industry-landing-grid">
            {content.distinctPoints.map((point) => (
              <div className="industry-landing-point" key={point.title}>
                <h4>{point.title}</h4>
                <p className="text-muted">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section solution-cta-section" id="enquiry">
        <div className="container solution-cta-grid">
          <div>
            <h2>Request a Demo</h2>
            <p className="text-muted" style={{ marginTop: "var(--space-3)", maxWidth: "440px" }}>
              Tell us about your organization and we'll show you how our software fits your specific
              operations.
            </p>
          </div>
          <MultiStepEnquiryForm
            source={content.enquirySource}
            defaultProduct={content.enquiryProduct}
            lockProduct
            title={`${content.metaTitle.split("|")[0].trim()} Enquiry`}
            subtitle="A few quick steps and our team will reach out to schedule a demo."
          />
        </div>
      </section>
    </Layout>
  );
}
