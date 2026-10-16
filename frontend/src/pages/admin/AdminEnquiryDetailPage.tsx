import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { api, ApiError } from "../../lib/api";
import {
  CONTACT_METHOD_LABELS,
  ENQUIRY_STATUS_BADGE_CLASS,
  ENQUIRY_STATUS_LABELS,
  PRODUCT_INTEREST_LABELS,
  EnquiryStatus,
  type EnquiryDetail,
} from "../../types/enquiry";

export default function AdminEnquiryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [enquiry, setEnquiry] = useState<EnquiryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newNote, setNewNote] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [followUpDraft, setFollowUpDraft] = useState("");
  const [isSavingFollowUp, setIsSavingFollowUp] = useState(false);

  const loadEnquiry = () => {
    setIsLoading(true);
    api
      .get<EnquiryDetail>(`/api/enquiries/${id}`, true)
      .then((data) => {
        setEnquiry(data);
        setFollowUpDraft(data.nextFollowUpDate ? data.nextFollowUpDate.slice(0, 10) : "");
      })
      .catch(() => setError("Unable to load enquiry details."))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadEnquiry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onStatusChange = async (status: EnquiryStatus) => {
    if (!enquiry) return;
    setIsUpdatingStatus(true);
    try {
      const updated = await api.patch<EnquiryDetail>(`/api/enquiries/${enquiry.enquiryId}/status`, { status }, true);
      setEnquiry(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to update status.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const onSaveFollowUp = async () => {
    if (!enquiry) return;
    setIsSavingFollowUp(true);
    try {
      const updated = await api.patch<EnquiryDetail>(
        `/api/enquiries/${enquiry.enquiryId}/status`,
        { status: enquiry.status, nextFollowUpDate: followUpDraft ? new Date(followUpDraft).toISOString() : null },
        true
      );
      setEnquiry(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to update follow-up date.");
    } finally {
      setIsSavingFollowUp(false);
    }
  };

  const onAddNote = async () => {
    if (!enquiry || !newNote.trim()) return;
    setIsSavingNote(true);
    try {
      await api.post(`/api/enquiries/${enquiry.enquiryId}/notes`, { note: newNote.trim() }, true);
      setNewNote("");
      loadEnquiry();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to save note.");
    } finally {
      setIsSavingNote(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
          <span className="spinner spinner-dark" />
        </div>
      </AdminLayout>
    );
  }

  if (error && !enquiry) {
    return (
      <AdminLayout>
        <div className="alert alert-error">{error}</div>
      </AdminLayout>
    );
  }

  if (!enquiry) {
    return (
      <AdminLayout>
        <div className="empty-state">Enquiry not found.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Link to="/admin/enquiries" className="btn btn-ghost btn-sm" style={{ marginBottom: "var(--space-4)", paddingInline: 0 }}>
        &larr; Back to Enquiries
      </Link>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-6)" }}>
        <div>
          <h1 style={{ fontSize: "var(--fs-2xl)" }}>{enquiry.fullName}</h1>
          <p className="text-muted">Reference: {enquiry.enquiryReferenceNumber}</p>
        </div>
        <span className={`badge ${ENQUIRY_STATUS_BADGE_CLASS[enquiry.status]}`} style={{ fontSize: "var(--fs-sm)" }}>
          {ENQUIRY_STATUS_LABELS[enquiry.status]}
        </span>
      </div>

      {error && <div className="alert alert-error" style={{ marginBottom: "var(--space-5)" }}>{error}</div>}

      <div className="grid grid-2" style={{ alignItems: "start" }}>
        <div className="card">
          <h3 style={{ marginBottom: "var(--space-4)", fontSize: "var(--fs-lg)" }}>Enquiry Details</h3>
          <dl className="detail-list">
            <div><dt>Mobile</dt><dd>{enquiry.mobileNumber}</dd></div>
            <div><dt>Email</dt><dd>{enquiry.email ?? "-"}</dd></div>
            <div><dt>Organization</dt><dd>{enquiry.organizationName ?? "-"}</dd></div>
            <div><dt>Organization Type</dt><dd>{enquiry.organizationType ?? "-"}</dd></div>
            <div><dt>City</dt><dd>{enquiry.city ?? "-"}</dd></div>
            <div><dt>Product Interested In</dt><dd>{PRODUCT_INTEREST_LABELS[enquiry.productInterestedIn]}</dd></div>
            <div><dt>Preferred Contact Method</dt><dd>{enquiry.preferredContactMethod != null ? CONTACT_METHOD_LABELS[enquiry.preferredContactMethod] : "-"}</dd></div>
            <div><dt>Message</dt><dd>{enquiry.message ?? "-"}</dd></div>
            <div><dt>Submitted</dt><dd>{new Date(enquiry.createdAt).toLocaleString("en-IN")}</dd></div>
            <div><dt>Last Updated</dt><dd>{new Date(enquiry.updatedAt).toLocaleString("en-IN")}</dd></div>
            <div>
              <dt>Next Follow-up</dt>
              <dd>{enquiry.nextFollowUpDate ? new Date(enquiry.nextFollowUpDate).toLocaleDateString("en-IN") : "Not scheduled"}</dd>
            </div>
          </dl>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <div className="card">
            <h3 style={{ marginBottom: "var(--space-4)", fontSize: "var(--fs-lg)" }}>Update Status</h3>
            <select
              className="form-select"
              value={enquiry.status}
              disabled={isUpdatingStatus}
              onChange={(e) => onStatusChange(Number(e.target.value) as EnquiryStatus)}
            >
              {Object.entries(ENQUIRY_STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "var(--space-4)", fontSize: "var(--fs-lg)" }}>Next Follow-up Date</h3>
            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <input
                type="date"
                className="form-input"
                value={followUpDraft}
                onChange={(e) => setFollowUpDraft(e.target.value)}
              />
              <button className="btn btn-secondary btn-sm" onClick={onSaveFollowUp} disabled={isSavingFollowUp}>
                {isSavingFollowUp ? <span className="spinner spinner-dark" /> : "Save"}
              </button>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "var(--space-4)", fontSize: "var(--fs-lg)" }}>Follow-up Notes</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
              {enquiry.notes.length === 0 && <p className="text-muted">No notes yet.</p>}
              {enquiry.notes.map((note) => (
                <div key={note.enquiryNoteId} style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--space-3)" }}>
                  <p style={{ fontSize: "var(--fs-sm)" }}>{note.note}</p>
                  <p className="text-muted" style={{ fontSize: "var(--fs-xs)", marginTop: "var(--space-1)" }}>
                    {note.createdBy} &middot; {new Date(note.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
            <textarea
              className="form-textarea"
              placeholder="Add a follow-up note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              style={{ marginBottom: "var(--space-3)" }}
            />
            <button className="btn btn-primary btn-sm" onClick={onAddNote} disabled={isSavingNote || !newNote.trim()}>
              {isSavingNote ? <span className="spinner" /> : "Add Note"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
