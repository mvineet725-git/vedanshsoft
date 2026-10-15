import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { api, API_BASE_URL, authStorage } from "../../lib/api";
import {
  ENQUIRY_STATUS_BADGE_CLASS,
  ENQUIRY_STATUS_LABELS,
  PRODUCT_INTEREST_LABELS,
  EnquiryStatus,
  ProductInterest,
  type EnquiryListItem,
  type PagedResult,
} from "../../types/enquiry";

export default function AdminEnquiriesPage() {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [city, setCity] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<PagedResult<EnquiryListItem> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (product) params.set("product", product);
    if (status) params.set("status", status);
    if (city) params.set("city", city);
    params.set("page", String(page));
    params.set("pageSize", "20");

    api
      .get<PagedResult<EnquiryListItem>>(`/api/enquiries?${params.toString()}`, true)
      .then(setResult)
      .catch(() => setError("Unable to load enquiries."))
      .finally(() => setIsLoading(false));
  }, [search, product, status, city, page]);

  const onExport = () => {
    const token = authStorage.getToken();
    fetch(`${API_BASE_URL}/api/admin/enquiries/export`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `enquiries-export-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
        <h1 style={{ fontSize: "var(--fs-2xl)" }}>Enquiries</h1>
        <button className="btn btn-secondary btn-sm" onClick={onExport}>Export CSV</button>
      </div>

      <div className="card" style={{ marginBottom: "var(--space-6)" }}>
        <div className="grid grid-4">
          <div className="form-field" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="search">Search</label>
            <input
              id="search"
              className="form-input"
              placeholder="Name, mobile, reference..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className="form-field" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="product">Product</label>
            <select id="product" className="form-select" value={product} onChange={(e) => { setProduct(e.target.value); setPage(1); }}>
              <option value="">All Products</option>
              <option value={ProductInterest.SocietyManagementSoftware}>Society Management</option>
              <option value={ProductInterest.EducationManagementSoftware}>Education Management</option>
              <option value={ProductInterest.CustomSoftwareDevelopment}>Custom Development</option>
              <option value={ProductInterest.OtherEnquiry}>Other</option>
            </select>
          </div>
          <div className="form-field" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="status">Status</label>
            <select id="status" className="form-select" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
              <option value="">All Statuses</option>
              <option value={EnquiryStatus.New}>New</option>
              <option value={EnquiryStatus.Contacted}>Contacted</option>
              <option value={EnquiryStatus.DemoScheduled}>Demo Scheduled</option>
              <option value={EnquiryStatus.FollowUpRequired}>Follow-up Required</option>
              <option value={EnquiryStatus.Converted}>Converted</option>
              <option value={EnquiryStatus.Closed}>Closed</option>
            </select>
          </div>
          <div className="form-field" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="city">City</label>
            <input id="city" className="form-input" value={city} onChange={(e) => { setCity(e.target.value); setPage(1); }} />
          </div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card" style={{ padding: 0 }}>
        <div className="data-table-wrap" style={{ border: "none" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Organization</th>
                <th>City</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr><td colSpan={8} className="empty-state"><span className="spinner spinner-dark" /></td></tr>
              )}
              {!isLoading && result?.items.length === 0 && (
                <tr><td colSpan={8} className="empty-state">No enquiries match your filters.</td></tr>
              )}
              {!isLoading && result?.items.map((enquiry) => (
                <tr key={enquiry.enquiryId}>
                  <td><Link to={`/admin/enquiries/${enquiry.enquiryId}`}>{enquiry.enquiryReferenceNumber}</Link></td>
                  <td>{enquiry.fullName}</td>
                  <td>{enquiry.mobileNumber}</td>
                  <td>{enquiry.organizationName ?? "-"}</td>
                  <td>{enquiry.city ?? "-"}</td>
                  <td>{PRODUCT_INTEREST_LABELS[enquiry.productInterestedIn]}</td>
                  <td><span className={`badge ${ENQUIRY_STATUS_BADGE_CLASS[enquiry.status]}`}>{ENQUIRY_STATUS_LABELS[enquiry.status]}</span></td>
                  <td>{new Date(enquiry.createdAt).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {result && result.totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-3)", marginTop: "var(--space-5)" }}>
          <button className="btn btn-secondary btn-sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
          <span className="text-muted" style={{ alignSelf: "center" }}>
            Page {result.page} of {result.totalPages}
          </span>
          <button className="btn btn-secondary btn-sm" disabled={page >= result.totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}
    </AdminLayout>
  );
}
