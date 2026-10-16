import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import DemoBanner from "../components/DemoBanner";
import Icon from "../components/Icon";
import { DEMO_SOCIETY } from "../data/demoData";
import { track } from "../lib/analytics";
import { useTrackPageView } from "../lib/useTrackPageView";
import "./DemoPage.css";

type Tab = "flats" | "notices" | "complaints";

const MAINTENANCE_BADGE: Record<string, string> = {
  Paid: "badge-converted",
  Due: "badge-contacted",
  Overdue: "badge-closed",
};

export default function SocietyDemoPage() {
  const [tab, setTab] = useState<Tab>("flats");
  useTrackPageView("society", "society_demo");

  const onTabChange = (next: Tab) => {
    setTab(next);
    track("demo_interaction", { product: "society", step: next });
  };

  return (
    <Layout>
      <Seo
        title="Society Management Software Demo (Fictional Data) | Vedansh Software Services"
        description="Explore a read-only, fictional demo of our Society Management Software — resident records, maintenance tracking, notices, and complaints — before requesting a live demo."
        canonicalPath="/demo/society"
      />

      <section className="section demo-page" style={{ paddingTop: "var(--space-9)" }}>
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-5)", textAlign: "center", maxWidth: "720px" }}>
            <span className="eyebrow">Interactive Product Demo</span>
            <h1>Explore {DEMO_SOCIETY.name}</h1>
            <p className="text-muted" style={{ marginTop: "var(--space-3)" }}>{DEMO_SOCIETY.location}</p>
          </div>

          <DemoBanner />

          <div className="demo-stats-row">
            <div className="stat-card">
              <span className="stat-value">{DEMO_SOCIETY.units}</span>
              <span className="stat-label">Total Units</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{DEMO_SOCIETY.flats.filter((f) => f.maintenanceStatus === "Paid").length}</span>
              <span className="stat-label">Maintenance Paid (sample)</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{DEMO_SOCIETY.complaints.filter((c) => c.status !== "Resolved").length}</span>
              <span className="stat-label">Open Complaints (sample)</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{DEMO_SOCIETY.notices.length}</span>
              <span className="stat-label">Active Notices (sample)</span>
            </div>
          </div>

          <div className="demo-tabs" role="tablist">
            <button role="tab" aria-selected={tab === "flats"} className={`demo-tab ${tab === "flats" ? "is-active" : ""}`} onClick={() => onTabChange("flats")}>
              <Icon name="building" size={18} /> Flats & Residents
            </button>
            <button role="tab" aria-selected={tab === "notices"} className={`demo-tab ${tab === "notices" ? "is-active" : ""}`} onClick={() => onTabChange("notices")}>
              <Icon name="bell" size={18} /> Notices
            </button>
            <button role="tab" aria-selected={tab === "complaints"} className={`demo-tab ${tab === "complaints" ? "is-active" : ""}`} onClick={() => onTabChange("complaints")}>
              <Icon name="message" size={18} /> Complaints
            </button>
          </div>

          <div className="demo-panel" role="tabpanel">
            {tab === "flats" && (
              <div className="data-table-wrap">
                <table className="data-table">
                  <thead>
                    <tr><th>Flat No.</th><th>Owner</th><th>Status</th><th>Maintenance</th></tr>
                  </thead>
                  <tbody>
                    {DEMO_SOCIETY.flats.map((flat) => (
                      <tr key={flat.flatNo}>
                        <td>{flat.flatNo}</td>
                        <td>{flat.owner}</td>
                        <td>{flat.status}</td>
                        <td><span className={`badge ${MAINTENANCE_BADGE[flat.maintenanceStatus]}`}>{flat.maintenanceStatus}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "notices" && (
              <div className="demo-list">
                {DEMO_SOCIETY.notices.map((notice) => (
                  <div className="demo-list-item" key={notice.title}>
                    <div className="demo-list-item-header">
                      <strong>{notice.title}</strong>
                      <span className="text-muted">{notice.date}</span>
                    </div>
                    <p className="text-muted">{notice.body}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "complaints" && (
              <div className="data-table-wrap">
                <table className="data-table">
                  <thead>
                    <tr><th>ID</th><th>Flat</th><th>Subject</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {DEMO_SOCIETY.complaints.map((c) => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.flat}</td>
                        <td>{c.subject}</td>
                        <td>{c.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="demo-cta-banner">
            <div>
              <h3>Like what you see?</h3>
              <p className="text-muted">Request a live, guided demo tailored to your society.</p>
            </div>
            <Link to="/contact?product=society&demo=true" className="btn btn-primary">
              Request a Society Software Demo
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
