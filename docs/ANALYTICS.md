# Analytics Setup Guide

## Current state

No analytics provider is connected yet. The frontend has an event-tracking
abstraction (`frontend/src/lib/analytics.ts`) with `track()` calls already
placed at every conversion-relevant point in the site. Until a provider is
configured, `track()` only logs to the browser console in development
(`npm run dev`) — nothing is sent anywhere, and nothing fires in production
builds beyond the no-op.

This lets you verify the *instrumentation* is correct (open devtools console
while clicking through the site in dev mode) before deciding on, and paying
for, an actual analytics product.

## Events already instrumented

| Event | Fires when | Properties |
|---|---|---|
| `product_page_view` | A product or industry landing page mounts | `product`, `page` |
| `demo_cta_click` | A "Request a Demo" button is clicked | `page` |
| `pricing_cta_click` | A "Request Pricing" link is clicked | `page` |
| `enquiry_form_start` | A visitor advances past the first step of the enquiry form | `page` |
| `enquiry_form_validation_error` | A step fails client-side validation | `step` |
| `enquiry_form_submitted` | An enquiry is successfully saved to the backend | `product` |
| `enquiry_form_failed` | An enquiry submission fails (network/server error) | — |
| `whatsapp_click` | A WhatsApp link is clicked | `page` |
| `phone_click` | A click-to-call link is clicked | `page` |
| `demo_interaction` | A tab is switched in the fictional product demo | `product`, `step` |
| `solution_finder_completed` | The homepage Solution Finder tool reaches its recommendation | `product`, `step` |
| `requirements_checklist_submitted` | The Requirements Checklist is submitted with an enquiry | `product`, `step` (count of selected items, not their labels) |

## The privacy rule — read before adding any new event

**Never pass names, phone numbers, email addresses, enquiry messages, city
names a visitor typed, or any other free-text/personal data as an event
property.** Every `track()` call site in this codebase is intentionally
restricted to a small `AnalyticsProperties` interface (`product`, `page`,
`step`, and a few others) that only ever receives fixed, code-defined
strings (e.g. `"society"`, `"header"`, `"complaints"`) — never anything a
user typed into a form field. The `requirements_checklist_submitted` event
sends the *count* of selected capabilities, deliberately not the capability
names themselves, to stay conservative.

When adding a new `track()` call, follow the same pattern: pass only
constants your own code defines, never `formValues.whatever`.

## Connecting a real provider

### Option A: Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com) and get your Measurement ID (`G-XXXXXXXXXX`).
2. Add the GA4 script tag to `frontend/index.html`, inside `<head>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
   </script>
   ```
3. In `frontend/src/main.tsx` (or a small bootstrap file), wire the sink:
   ```ts
   import { setAnalyticsSink } from "./lib/analytics";

   setAnalyticsSink((event, properties) => {
     if (typeof window.gtag === "function") {
       window.gtag("event", event, properties ?? {});
     }
   });
   ```
4. GA4 uses cookies. Add a cookie notice/consent mechanism appropriate to
   your audience and update the Privacy Policy page to disclose GA4 usage,
   what it collects, and how visitors can opt out, before enabling this in
   production.

### Option B: Plausible (privacy-first, no cookies, no consent banner typically required)

1. Create an account at [plausible.io](https://plausible.io) and add your domain.
2. Add the script tag to `frontend/index.html`:
   ```html
   <script defer data-domain="www.vedanshsoftware.com" src="https://plausible.io/js/script.js"></script>
   ```
3. Wire the sink in `frontend/src/main.tsx`:
   ```ts
   import { setAnalyticsSink } from "./lib/analytics";

   setAnalyticsSink((event, properties) => {
     if (typeof window.plausible === "function") {
       window.plausible(event, { props: properties ?? {} });
     }
   });
   ```
4. Plausible doesn't use cookies or collect personal data by default, so it
   generally doesn't require a cookie consent banner under GDPR — but this
   isn't legal advice; confirm with your own counsel if compliance is a
   concern for your specific situation.

## Google Search Console (search monitoring, separate from analytics)

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Add your production domain as a property (domain or URL-prefix verification).
3. Submit the sitemap at `https://www.vedanshsoftware.com/sitemap.xml`
   (already generated — see `frontend/public/sitemap.xml`).
4. `robots.txt` (`frontend/public/robots.txt`) already allows crawling and
   references the sitemap, so no changes are needed there.

## Distinguishing real metrics from sample data

Everywhere the site shows numbers that are **not** real measured traffic or
business metrics (the interactive demo's sample dashboard figures, the
illustrative "Interactive Demo — Sample Data" badge, etc.), that distinction
is already handled by `frontend/src/data/siteContent.ts` — see
`VERIFIED_METRICS`. Once real analytics is connected and the business has
verified figures to publish (e.g. actual visitor counts, real conversion
rates), add them there, not into any component directly, so the "real vs.
illustrative" distinction stays centralized and auditable.
