import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo
        title="Page Not Found | Vedansh Software Services"
        description="The page you are looking for could not be found."
        canonicalPath="/404"
      />
      <section className="section empty-state" style={{ paddingTop: "var(--space-10)" }}>
        <h1 style={{ fontSize: "var(--fs-4xl)" }}>404</h1>
        <p style={{ marginTop: "var(--space-3)", fontSize: "var(--fs-lg)" }}>
          We couldn't find the page you were looking for.
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: "var(--space-6)" }}>
          Back to Home
        </Link>
      </section>
    </Layout>
  );
}
