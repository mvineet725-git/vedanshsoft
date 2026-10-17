import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import StatCard from "../../components/StatCard";
import DonutBreakdownChart from "../../components/DonutBreakdownChart";
import BarBreakdownChart from "../../components/BarBreakdownChart";
import { api } from "../../lib/api";
import {
  ENQUIRY_SOURCE_LABELS_BY_NAME,
  ENQUIRY_STATUS_BADGE_CLASS,
  ENQUIRY_STATUS_LABELS,
  ENQUIRY_STATUS_LABELS_BY_NAME,
  PRODUCT_INTEREST_LABELS,
  PRODUCT_INTEREST_LABELS_BY_NAME,
  type DashboardSummary,
} from "../../types/enquiry";

function toChartData(record: Record<string, number>, labels: Record<string, string>) {
  return Object.entries(record).map(([key, value]) => ({ name: labels[key] ?? key, value }));
}

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

  const productChartData = useMemo(
    () => (summary ? toChartData(summary.enquiriesByProduct, PRODUCT_INTEREST_LABELS_BY_NAME) : []),
    [summary],
  );
  const statusChartData = useMemo(
    () => (summary ? toChartData(summary.enquiriesByStatus, ENQUIRY_STATUS_LABELS_BY_NAME) : []),
    [summary],
  );
  const sourceChartData = useMemo(
    () => (summary ? toChartData(summary.enquiriesBySource, ENQUIRY_SOURCE_LABELS_BY_NAME) : []),
    [summary],
  );

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
            <StatCard icon="inbox" tone="royal" label="Total Enquiries" value={summary.totalEnquiries} />
            <StatCard icon="sparkles" tone="teal" label="New Enquiries" value={summary.newEnquiries} />
            <StatCard
              icon="building"
              tone="royal"
              label="Society Management Enquiries"
              value={summary.enquiriesByProduct["SocietyManagementSoftware"] ?? 0}
            />
            <StatCard
              icon="graduation"
              tone="teal"
              label="Education Management Enquiries"
              value={summary.enquiriesByProduct["EducationManagementSoftware"] ?? 0}
            />
          </div>

          <div className="grid grid-2" style={{ marginBottom: "var(--space-7)" }}>
            <StatCard
              icon="calendar"
              tone="warning"
              alert={summary.followUpsDueToday > 0}
              label="Follow-ups Due Today"
              value={summary.followUpsDueToday}
            />
            <StatCard
              icon="bell"
              tone="danger"
              alert={summary.overdueFollowUps > 0}
              label="Overdue Follow-ups"
              value={summary.overdueFollowUps}
            />
          </div>

          <div className="grid grid-3" style={{ marginBottom: "var(--space-7)", alignItems: "start" }}>
            <DonutBreakdownChart title="Enquiries by Product" data={productChartData} />
            <DonutBreakdownChart title="Enquiries by Status" data={statusChartData} />
            <BarBreakdownChart title="Enquiries by Source" data={sourceChartData} />
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
