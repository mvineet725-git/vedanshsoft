/**
 * Festive (Dussehra-Diwali) campaign configuration.
 *
 * This is the single source of truth for the festive campaign banner shown on
 * the homepage. Editing this file and redeploying is the whole "admin"
 * workflow for now - the same pattern used for VERIFIED_METRICS in
 * siteContent.ts.
 *
 * IMPORTANT - no discount has been approved. `offerDetail` stays null until
 * the business owner confirms an actual, honorable discount/benefit and its
 * terms. Until then the campaign CTA reads "Request Festive Pricing" rather
 * than displaying any number, per the no-fabricated-offers requirement.
 * When a real offer is approved, fill in `offerDetail` and the campaign will
 * automatically start showing it instead.
 */

export interface FestiveOfferDetail {
  /** e.g. "20% off setup fee" or "One month free onboarding" - shown verbatim, so phrase it exactly as approved. */
  summary: string;
  /** Plain-language terms shown near the offer (eligibility, exclusions, etc.). */
  terms: string;
}

export interface FestiveCampaignConfig {
  enabled: boolean;
  name: string;
  /** ISO date (YYYY-MM-DD). Campaign is hidden before this date. */
  startDate: string;
  /** ISO date (YYYY-MM-DD). Campaign is hidden on/after this date. */
  endDate: string;
  headline: string;
  subheadline: string;
  societyMessage: string;
  educationMessage: string;
  ctaLabel: string;
  /** Null until a specific, approved offer exists. Never invent a number here. */
  offerDetail: FestiveOfferDetail | null;
}

export const FESTIVE_CAMPAIGN: FestiveCampaignConfig = {
  enabled: true,
  name: "Dussehra-Diwali 2026",
  startDate: "2026-10-01",
  endDate: "2026-11-16",
  headline: "Celebrate the Festive Season with Smarter Management!",
  subheadline:
    "This Dussehra and Diwali, take the next step towards simpler society operations and more organized educational management.",
  societyMessage: "Make society operations, maintenance tracking, complaints, and communication simpler.",
  educationMessage: "Manage students, fees, attendance, and everyday administrative work more efficiently.",
  ctaLabel: "Request Festive Pricing",
  offerDetail: null,
};

/** True only when enabled and within [startDate, endDate) as of the current moment. */
export function isFestiveCampaignActive(config: FestiveCampaignConfig = FESTIVE_CAMPAIGN, now: Date = new Date()): boolean {
  if (!config.enabled) return false;
  const start = new Date(`${config.startDate}T00:00:00`);
  const end = new Date(`${config.endDate}T00:00:00`);
  return now >= start && now < end;
}
