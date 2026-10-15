import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { COMPANY_EMAIL } from "../lib/constants";
import "./LegalPage.css";

export default function TermsOfUsePage() {
  return (
    <Layout>
      <Seo
        title="Terms of Use | Vedansh Software Services"
        description="Terms of Use for the Vedansh Software Services website, covering acceptable use, enquiry submissions, and intellectual property."
        canonicalPath="/terms-of-use"
      />

      <section className="section" style={{ paddingTop: "var(--space-9)" }}>
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-6)", textAlign: "center", maxWidth: "720px" }}>
            <span className="eyebrow">Legal</span>
            <h1>Terms of Use</h1>
          </div>

          <div className="legal-content">
            <div className="legal-review-notice">
              Draft document: these Terms of Use are a working draft prepared for Vedansh Software Services and
              should be reviewed by a qualified legal professional before production launch.
            </div>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using this website, you agree to these Terms of Use. If you do not agree, please
              do not use this website.
            </p>

            <h2>2. Use of the Website</h2>
            <p>
              This website is provided to share information about Vedansh Software Services' products and to
              allow visitors to submit enquiries. You agree to use this website only for lawful purposes and not
              to submit false, misleading, or abusive information through our forms.
            </p>

            <h2>3. Enquiry Submissions</h2>
            <p>
              When you submit an enquiry, you confirm that the information provided is accurate to the best of
              your knowledge. Submission of an enquiry does not create any binding agreement between you and
              Vedansh Software Services.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and software product names, is the
              property of Vedansh Software Services unless otherwise noted, and may not be reproduced without
              permission.
            </p>

            <h2>5. No Warranty</h2>
            <p>
              This website and its content are provided on an "as is" basis. While we aim to keep information
              accurate and up to date, we do not guarantee that all content is free of errors at all times.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              Vedansh Software Services shall not be liable for any indirect or consequential loss arising from
              the use of this website, to the extent permitted by applicable law.
            </p>

            <h2>7. Changes to These Terms</h2>
            <p>
              We may update these Terms of Use from time to time. Continued use of the website after changes
              constitutes acceptance of the revised terms.
            </p>

            <h2>8. Contact</h2>
            <p>
              For questions about these Terms of Use, contact us at{" "}
              <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
