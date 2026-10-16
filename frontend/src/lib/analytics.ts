/**
 * Privacy-conscious, provider-agnostic event tracking.
 *
 * No analytics provider is wired up yet — see docs/ANALYTICS.md for setup
 * instructions once one is chosen (e.g. Google Analytics 4, Plausible).
 * Until then, `track()` only logs to the browser console in development,
 * so you can verify events fire at the right moments without sending
 * anything anywhere.
 *
 * HARD RULE: never pass names, phone numbers, email addresses, enquiry
 * messages, or any other personal data as event properties. Every call
 * site in this codebase should only ever pass category/product/page-level
 * context (e.g. "society", "home_page"), never user-entered free text.
 */

export type AnalyticsEvent =
  | "product_page_view"
  | "demo_cta_click"
  | "contact_cta_click"
  | "pricing_cta_click"
  | "enquiry_form_start"
  | "enquiry_form_validation_error"
  | "enquiry_form_submitted"
  | "enquiry_form_failed"
  | "whatsapp_click"
  | "phone_click"
  | "demo_interaction"
  | "solution_finder_completed"
  | "requirements_checklist_submitted";

export interface AnalyticsProperties {
  product?: "society" | "education" | "custom" | "other";
  page?: string;
  step?: string;
  [key: string]: string | number | boolean | undefined;
}

type AnalyticsSink = (event: AnalyticsEvent, properties?: AnalyticsProperties) => void;

// Swap this for a real provider call (gtag, plausible, etc.) once one is
// configured — see docs/ANALYTICS.md. Keep the PII rule above in mind when
// wiring up the real sink: forward only what's passed in here, and audit
// call sites if you ever add a new property key.
const noopSink: AnalyticsSink = (event, properties) => {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, properties ?? {});
  }
};

let activeSink: AnalyticsSink = noopSink;

/** Allows a real provider integration to be plugged in from one place later. */
export function setAnalyticsSink(sink: AnalyticsSink) {
  activeSink = sink;
}

export function track(event: AnalyticsEvent, properties?: AnalyticsProperties) {
  try {
    activeSink(event, properties);
  } catch {
    // Analytics must never break the actual user flow.
  }
}
