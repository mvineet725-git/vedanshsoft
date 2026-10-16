import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import RequirementsChecklist from "../components/RequirementsChecklist";
import ReadinessChecklist from "../components/ReadinessChecklist";
import "./ResourcesPage.css";

type Tool = "requirements" | "readiness";

export default function ResourcesPage() {
  const [tool, setTool] = useState<Tool>("requirements");

  return (
    <Layout>
      <Seo
        title="Resources & Tools | Vedansh Software Services"
        description="Interactive tools to help you decide which software fits your organization: a requirements checklist and an implementation readiness checklist."
        canonicalPath="/resources"
      />

      <section className="resources-hero">
        <div className="container">
          <span className="eyebrow">Resources</span>
          <h1>Tools to Help You Decide</h1>
          <p className="text-muted" style={{ marginTop: "var(--space-4)", maxWidth: "640px", marginInline: "auto" }}>
            Use these interactive tools to clarify your requirements and prepare for a product
            demonstration — no account or commitment required.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="resources-nav" role="tablist" aria-label="Choose a tool">
            <button
              role="tab"
              aria-selected={tool === "requirements"}
              className={`resources-nav-btn ${tool === "requirements" ? "is-active" : ""}`}
              onClick={() => setTool("requirements")}
            >
              Requirements Checklist
            </button>
            <button
              role="tab"
              aria-selected={tool === "readiness"}
              className={`resources-nav-btn ${tool === "readiness" ? "is-active" : ""}`}
              onClick={() => setTool("readiness")}
            >
              Implementation Readiness Checklist
            </button>
          </div>

          {tool === "requirements" && (
            <div>
              <div className="section-head" style={{ margin: "0 auto var(--space-6)", textAlign: "center", maxWidth: "600px" }}>
                <h2>Requirements Checklist</h2>
                <p className="text-muted" style={{ marginTop: "var(--space-3)" }}>
                  Select the capabilities relevant to your organization, and submit the summary with your
                  enquiry so our team can prepare for a more focused conversation.
                </p>
              </div>
              <RequirementsChecklist />
            </div>
          )}

          {tool === "readiness" && (
            <div>
              <div className="section-head" style={{ margin: "0 auto var(--space-6)", textAlign: "center", maxWidth: "600px" }}>
                <h2>Implementation Readiness Checklist</h2>
                <p className="text-muted" style={{ marginTop: "var(--space-3)" }}>
                  A few things worth thinking through before your demo, so you get the most out of the
                  conversation.
                </p>
              </div>
              <ReadinessChecklist />
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-bg-alt)", textAlign: "center" }}>
        <div className="container">
          <h2>Looking for More Practical Guidance?</h2>
          <p className="text-muted" style={{ marginTop: "var(--space-3)", maxWidth: "480px", marginInline: "auto" }}>
            Read our articles on digitizing society and institution administration.
          </p>
          <Link to="/articles" className="btn btn-primary" style={{ marginTop: "var(--space-6)" }}>
            Browse Articles
          </Link>
        </div>
      </section>
    </Layout>
  );
}
