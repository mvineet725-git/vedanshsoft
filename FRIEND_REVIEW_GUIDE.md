# Friend Review Guide — Vedansh Software Services Website

Thanks for taking the time to look at this. This is a **pre-launch review** — the
site is not public yet, and your honest first impressions are exactly what's
useful. You don't need any technical knowledge to help.

**Please read the short "Before you start" section — especially the note about
not entering real personal data.**

---

## The website

**URL:** https://vedanshsoft-kzuq.vercel.app

(This is a temporary hosting address. The real domain isn't connected yet.)

## What the company does

**Vedansh Software Services** builds two software products for Indian organizations:

1. **Society Management Software** — for housing societies, apartment complexes,
   and cooperative housing societies. Handles resident/flat records, maintenance
   billing and collection, complaints, notices, and committee administration.
2. **Education Management Software** — for schools, colleges, coaching institutes,
   tuition classes, and training institutes. Handles students, admissions, fees,
   attendance, batches, and academic administration.

The website's job is to explain these clearly and make it easy for an interested
organization to request a demo or ask about pricing.

---

## Before you start

- **Do not enter real personal information.** Use obviously fake details when
  testing the enquiry form (see the suggested test data below). Real enquiries go
  into a live database and trigger real notification emails.
- **Do not enter anyone else's phone number or email.** Especially not a real
  customer's, a friend's, or a work address.
- If something looks broken, a **screenshot is worth more than a description** —
  please include one where you can.
- Mention **what device and browser** you used (e.g. "Android phone, Chrome" or
  "Windows laptop, Edge"), since some issues only appear on certain setups.

---

## Pages to review

Start at the homepage and work through these. You don't have to be exhaustive —
spend most of your time where you'd naturally spend it as a real visitor.

| Page | What to look at |
|---|---|
| Home (`/`) | Does the top of the page explain what this company does? |
| Society Management (`/solutions/society-management`) | Is it clear what this product does and who it's for? |
| Education Management (`/solutions/education-management`) | Same question for the education product. |
| Solutions overview (`/solutions`) | Does it help you pick between the two? |
| Industries (`/industries`) | Does your organization type appear here? |
| Pricing (`/pricing`) | Is the "contact us for a quote" approach clear, or frustrating? |
| Contact (`/contact`) | Is it easy to get in touch? |
| FAQ (`/faq`) | Does it answer what you'd actually want to know? |
| About (`/about`) | Does the company feel credible? |
| How We Work (`/how-we-work`) | Is the process clear? |
| Interactive demos (`/demo/society`, `/demo/education`) | Do these give you a useful feel for the product? |
| Articles (`/articles`) | Is any of this worth reading? |

There's also a festive **Dussehra–Diwali** section on the homepage — please say
whether it feels appropriate and trustworthy, or overdone.

---

## Testing the enquiry form

This is the most important thing on the site, so please try it at least once.

1. Click any **"Book a Free Demo"** or **"Request Festive Pricing"** button.
2. Work through the 4 steps (Solution → Organization → Contact → Review).
3. Use fake test data, for example:
   - **Name:** Test Visitor
   - **Mobile:** 9000000001 *(any 10-digit number starting with 6–9 is accepted)*
   - **Email:** test@example.com
   - **Organization:** Test Society / Test Institute
   - **City:** anything
   - **Message:** "Just reviewing the site, please ignore."
4. Submit and confirm you get a **reference number** on the confirmation screen.

**Things worth trying deliberately:**
- Submit with a required field empty — do you get a clear, helpful error?
- Enter an invalid mobile number (e.g. `12345`) — is the error message understandable?
- Does the form remember what you typed if something goes wrong?
- On your phone, is the form comfortable to fill in, or fiddly?

If you tell me roughly when you submitted, I can confirm it arrived correctly.

---

## Testing on mobile and desktop

Please try **both** if you can — most real visitors will be on a phone.

**On your phone:**
- Does anything overflow sideways or require horizontal scrolling?
- Is text large enough to read without zooming?
- Does the menu (hamburger icon) open and close properly?
- Are buttons big enough to tap accurately?
- Does the floating WhatsApp button get in the way of anything?

**On a laptop/desktop:**
- Try making the browser window narrower and wider — does the layout adapt sensibly?
- Do hover effects on buttons and cards feel polished or distracting?

---

## Questions I'd like you to answer

Even one-line answers are genuinely useful:

1. Is it **immediately clear** what the company offers?
2. Does the website look **professional and trustworthy**?
3. Are the **two software products easy to tell apart** and understand?
4. Are the **numbers, graphs, and dashboard previews** attractive and readable?
5. Could you **easily find** the demo and enquiry buttons?
6. Was the **enquiry form easy** to complete?
7. Does the website **work well on your mobile phone**?
8. Did you notice any **spelling mistakes, broken links, or confusing content**?
9. What is the **single most important improvement** you'd recommend?
10. Would you feel **comfortable contacting this company** after visiting? Why or why not?

---

## How to report problems

Send me:
- A **screenshot** (most important)
- The **page/URL** where it happened
- Your **device and browser**
- What you **expected** vs. what **actually happened**

---

## Known limitations (not bugs — no need to report these)

These are already known and being worked on, so please don't spend time on them:

1. **Privacy Policy and Terms of Use show a "Draft document" notice.** This is
   intentional and honest — those pages genuinely still need review by a lawyer
   before public launch.
2. **No pricing figures are shown anywhere.** This is deliberate — pricing is
   quoted per organization, and no discount has been approved yet, so the festive
   section says "Request Festive Pricing" rather than advertising a number.
3. **Link previews (e.g. when sharing the URL on WhatsApp) may look plain.** The
   real domain isn't connected yet.
4. **The site may occasionally fail to submit enquiries.** The backend currently
   runs through a temporary tunnel that can drop without warning. If the enquiry
   form shows an error, please tell me roughly when — that's useful signal, but
   it's a known infrastructure limitation, not a website bug.
5. **Statistics and dashboard data are sample/illustrative**, and are labelled as
   such on the page. They aren't claims about real customers.

---

## What's NOT part of this review

- The **admin dashboard** (`/admin`) is staff-only and requires a login. There is
  no demo account, and it isn't part of what you're reviewing.
- Anything behind a login generally — the public marketing site is the scope.
