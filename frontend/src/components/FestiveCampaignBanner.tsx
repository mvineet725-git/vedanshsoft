import { Link } from "react-router-dom";
import { FESTIVE_CAMPAIGN, isFestiveCampaignActive } from "../data/festiveCampaign";
import { track } from "../lib/analytics";
import Icon from "./Icon";
import "./FestiveCampaignBanner.css";

function festiveEnquiryLink(product: "society" | "education") {
  const note = `Enquiry via ${FESTIVE_CAMPAIGN.name} festive campaign.`;
  return `/contact?product=${product}&note=${encodeURIComponent(note)}`;
}

export default function FestiveCampaignBanner() {
  if (!isFestiveCampaignActive()) {
    return null;
  }

  const handleClick = (product: "society" | "education") => {
    track("demo_cta_click", { page: "festive_campaign", product });
  };

  return (
    <section className="festive-banner" aria-labelledby="festive-banner-heading">
      <div className="festive-banner-decor" aria-hidden="true">
        <span className="festive-diya festive-diya-1">
          <Icon name="sparkles" size={20} />
        </span>
        <span className="festive-diya festive-diya-2">
          <Icon name="sparkles" size={16} />
        </span>
        <span className="festive-diya festive-diya-3">
          <Icon name="sparkles" size={24} />
        </span>
      </div>

      <div className="container festive-banner-inner">
        <div className="festive-banner-eyebrow">
          <Icon name="gift" size={18} />
          <span>{FESTIVE_CAMPAIGN.name} Offer</span>
        </div>

        <h2 id="festive-banner-heading" className="festive-banner-heading">
          {FESTIVE_CAMPAIGN.headline}
        </h2>
        <p className="festive-banner-sub">{FESTIVE_CAMPAIGN.subheadline}</p>

        <div className="festive-offer-cards">
          <div className="festive-offer-card">
            <div className="festive-offer-card-icon">
              <Icon name="building" size={22} />
            </div>
            <h3>Society Management Software</h3>
            <p>{FESTIVE_CAMPAIGN.societyMessage}</p>
            <Link
              to={festiveEnquiryLink("society")}
              className="btn festive-btn"
              onClick={() => handleClick("society")}
            >
              {FESTIVE_CAMPAIGN.ctaLabel}
            </Link>
          </div>

          <div className="festive-offer-card">
            <div className="festive-offer-card-icon">
              <Icon name="graduation" size={22} />
            </div>
            <h3>Education Management Software</h3>
            <p>{FESTIVE_CAMPAIGN.educationMessage}</p>
            <Link
              to={festiveEnquiryLink("education")}
              className="btn festive-btn"
              onClick={() => handleClick("education")}
            >
              {FESTIVE_CAMPAIGN.ctaLabel}
            </Link>
          </div>
        </div>

        {FESTIVE_CAMPAIGN.offerDetail ? (
          <div className="festive-offer-terms">
            <strong>{FESTIVE_CAMPAIGN.offerDetail.summary}</strong>
            <p>{FESTIVE_CAMPAIGN.offerDetail.terms}</p>
          </div>
        ) : (
          <p className="festive-offer-note">
            Share your requirements and our team will confirm the applicable festive pricing for your society or
            institution.
          </p>
        )}
      </div>
    </section>
  );
}
