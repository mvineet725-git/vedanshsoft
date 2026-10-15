import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { api } from "../../lib/api";
import {
  ENQUIRY_STATUS_BADGE_CLASS,
  ENQUIRY_STATUS_LABELS,
  ENQUIRY_STATUS_LABELS_BY_NAME,
  PRODUCT_INTEREST_LABELS,
  PRODUCT_INTEREST_LABELS_BY_NAME,
  type DashboardSummary,
} from "../../types/enquiry";

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get<DashboardSummary>("/api/admin/dashboard-summary", true)
      .then(setSummary)
      .catch(() => setError("Unable to load dashboard data."))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AdminLayout>
      <h1 style={{ fontSize: "var(--fs-2xl)", marginBottom: "var(--space-6)" }}>Dashboard</h1>

      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
          <span className="spinner spinner-dark" />
        </div>
      )}

      {error && <div className="alert alert-error">{error}</div>}

      {summary && (
        <>
          <div className="grid grid-4" style={{ marginBottom: "var(--space-7)" }}>
            <div className="stat-card">
              <span className="stat-value">{summary.totalEnquiries}</span>
              <span className="stat-label">Total Enquiries</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{summary.newEnquiries}</span>
              <span className="stat-label">New Enquiries</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">
                {summary.enquiriesByProduct["SocietyManagementSoftware"] ?? 0}
              </span>
              <span className="stat-label">Society Management Enquiries</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">
                {summary.enquiriesByProduct["EducationManagementSoftware"] ?? 0}
              </span>
              <span className="stat-label">Education Management Enquiries</span>
            </div>
          </div>

          <div className="grid grid-2" style={{ marginBottom: "var(--space-7)", alignItems: "start" }}>
            <div className="card">
              <h3 style={{ marginBottom: "var(--space-4)", fontSize: "var(--fs-lg)" }}>Enquiries by Product</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                {Object.entries(summary.enquiriesByProduct).map(([key, count]) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-sm)" }}>
                    <span>{PRODUCT_INTEREST_LABELS_BY_NAME[key] ?? key}</span>
                    <strong>{count}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: "var(--space-4)", fontSize: "var(--fs-lg)" }}>Enquiries by Status</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                {Object.entries(summary.enquiriesByStatus).map(([key, count]) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-sm)" }}>
                    <span>{ENQUIRY_STATUS_LABELS_BY_NAME[key] ?? key}</span>
                    <strong>{count}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
              <h3 style={{ fontSize: "var(--fs-lg)" }}>Recent Enquiries</h3>
              <Link to="/admin/enquiries" className="btn btn-ghost btn-sm">View All</Link>
            </div>
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Product</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.recentEnquiries.length === 0 && (
                    <tr>
                      <td colSpan={6} className="empty-state">No enquiries yet.</td>
                    </tr>
                  )}
                  {summary.recentEnquiries.map((enquiry) => (
                    <tr key={enquiry.enquiryId}>
                      <td>
                        <Link to={`/admin/enquiries/${enquiry.enquiryId}`}>{enquiry.enquiryReferenceNumber}</Link>
                      </td>
                      <td>{enquiry.fullName}</td>
                      <td>{enquiry.mobileNumber}</td>
                      <td>{PRODUCT_INTEREST_LABELS[enquiry.productInterestedIn]}</td>
                      <td>
                        <span className={`badge ${ENQUIRY_STATUS_BADGE_CLASS[enquiry.status]}`}>
                          {ENQUIRY_STATUS_LABELS[enquiry.status]}
                        </span>
                      </td>
                      <td>{new Date(enquiry.createdAt).toLocaleDateString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
