import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import DemoBanner from "../components/DemoBanner";
import Icon from "../components/Icon";
import { DEMO_INSTITUTE } from "../data/demoData";
import "./DemoPage.css";

type Tab = "students" | "batches" | "results";

export default function EducationDemoPage() {
  const [tab, setTab] = useState<Tab>("students");

  return (
    <Layout>
      <Seo
        title="Education Management Software Demo (Fictional Data) | Vedansh Software Services"
        description="Explore a read-only, fictional demo of our Education Management Software — student records, batches, fees, and examination results — before requesting a live demo."
        canonicalPath="/demo/education"
      />

      <section className="section demo-page" style={{ paddingTop: "var(--space-9)" }}>
        <div className="container">
          <div className="section-head" style={{ margin: "0 auto var(--space-5)", textAlign: "center", maxWidth: "720px" }}>
            <span className="eyebrow">Interactive Product Demo</span>
            <h1>Explore {DEMO_INSTITUTE.name}</h1>
            <p className="text-muted" style={{ marginTop: "var(--space-3)" }}>{DEMO_INSTITUTE.location}</p>
          </div>

          <DemoBanner />

          <div className="demo-stats-row">
            <div className="stat-card">
              <span className="stat-value">{DEMO_INSTITUTE.students.length}</span>
              <span className="stat-label">Sample Students</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{DEMO_INSTITUTE.batches.length}</span>
              <span className="stat-label">Active Batches (sample)</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">
                {Math.round(DEMO_INSTITUTE.students.reduce((sum, s) => sum + s.attendance, 0) / DEMO_INSTITUTE.students.length)}%
              </span>
              <span className="stat-label">Avg. Attendance (sample)</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{DEMO_INSTITUTE.students.filter((s) => s.feeStatus === "Paid").length}</span>
              <span className="stat-label">Fees Paid (sample)</span>
            </div>
          </div>

          <div className="demo-tabs" role="tablist">
            <button role="tab" aria-selected={tab === "students"} className={`demo-tab ${tab === "students" ? "is-active" : ""}`} onClick={() => setTab("students")}>
              <Icon name="users" size={18} /> Students
            </button>
            <button role="tab" aria-selected={tab === "batches"} className={`demo-tab ${tab === "batches" ? "is-active" : ""}`} onClick={() => setTab("batches")}>
              <Icon name="layers" size={18} /> Batches
            </button>
            <button role="tab" aria-selected={tab === "results"} className={`demo-tab ${tab === "results" ? "is-active" : ""}`} onClick={() => setTab("results")}>
              <Icon name="graduation" size={18} /> Exam Results
            </button>
          </div>

          <div className="demo-panel" role="tabpanel">
            {tab === "students" && (
              <div className="data-table-wrap">
                <table className="data-table">
                  <thead>
                    <tr><th>Name</th><th>Course</th><th>Batch</th><th>Fee Status</th><th>Attendance</th></tr>
                  </thead>
                  <tbody>
                    {DEMO_INSTITUTE.students.map((s) => (
                      <tr key={s.name}>
                        <td>{s.name}</td>
                        <td>{s.course}</td>
                        <td>{s.batch}</td>
                        <td><span className={`badge ${s.feeStatus === "Paid" ? "badge-converted" : "badge-contacted"}`}>{s.feeStatus}</span></td>
                        <td>{s.attendance}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "batches" && (
              <div className="demo-list">
                {DEMO_INSTITUTE.batches.map((batch) => (
                  <div className="demo-list-item" key={batch.name}>
                    <div className="demo-list-item-header">
                      <strong>{batch.name}</strong>
                      <span className="text-muted">{batch.time}</span>
                    </div>
                    <p className="text-muted">{batch.course} &middot; {batch.students} students enrolled (sample)</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "results" && (
              <div className="data-table-wrap">
                <table className="data-table">
                  <thead>
                    <tr><th>Student</th><th>Exam</th><th>Score</th></tr>
                  </thead>
                  <tbody>
                    {DEMO_INSTITUTE.examResults.map((r) => (
                      <tr key={`${r.student}-${r.exam}`}>
                        <td>{r.student}</td>
                        <td>{r.exam}</td>
                        <td>{r.score}</td>
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
              <p className="text-muted">Request a live, guided demo tailored to your institution.</p>
            </div>
            <Link to="/contact?product=education&demo=true" className="btn btn-primary">
              Request an Education Software Demo
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
