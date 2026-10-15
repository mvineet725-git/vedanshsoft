import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { COMPANY_EMAIL } from "../lib/constants";
import "./LegalPage.css";

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <Seo
        title="Privacy Policy | Vedansh Software Services"
        description="Privacy Policy for Vedansh Software Services describing what enquiry information we collect, why, how it is used, and how you can request correction or deletion."
        canonicalPath="/privacy-policy"
      />

      <section className="section" style={{ paddingTop: "var(--space-9)" }}>
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-6)", textAlign: "center", maxWidth: "720px" }}>
            <span className="eyebrow">Legal</span>
            <h1>Privacy Policy</h1>
          </div>

          <div className="legal-content">
            <div className="legal-review-notice">
              Draft document: this Privacy Policy is a working draft prepared for Vedansh Software Services and
              should be reviewed by a qualified legal professional before the website is used to process real
              customer data in production.
            </div>

            <h2>1. Information We Collect</h2>
            <p>
              When you submit an enquiry through our website (via the contact form, demo request form, or
              similar), we collect the information you provide, which may include your full name, mobile
              number, email address, organization/society/institute name, city, organization type, product of
              interest, preferred contact method, and any message you include.
            </p>

            <h2>2. Why We Collect It</h2>
            <p>
              We collect this information to respond to your enquiry, schedule demonstrations, provide
              information about our products, and follow up regarding your interest in our software solutions.
            </p>

            <h2>3. How We Use It</h2>
            <p>
              Your enquiry information is used internally by Vedansh Software Services to manage and respond to
              your enquiry, including contacting you by phone, email, or WhatsApp based on your preference.
              We do not sell your personal information to third parties.
            </p>

            <h2>4. Who May Access It</h2>
            <p>
              Enquiry information is accessible only to authorized personnel of Vedansh Software Services who
              need it to respond to enquiries and manage customer relationships. Administrative access to our
              enquiry management system is restricted and protected by authentication.
            </p>

            <h2>5. How Long We Retain It</h2>
            <p>
              We retain enquiry information for as long as reasonably necessary to respond to your enquiry and
              maintain business records, unless you request earlier deletion. Specific retention periods are
              under ongoing review as part of our data handling practices.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              You may request correction or deletion of your enquiry information, or ask what information we
              hold about you, by contacting us using the details below.
            </p>

            <h2>7. Contact Us About Privacy</h2>
            <p>
              For any questions about this Privacy Policy or to exercise your rights regarding your personal
              information, please contact us at{" "}
              <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>.
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be reflected on this page.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
