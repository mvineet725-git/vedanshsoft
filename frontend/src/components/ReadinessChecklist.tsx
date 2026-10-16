import { useState } from "react";
import "./ReadinessChecklist.css";

const READINESS_ITEMS = [
  {
    id: "admin",
    label: "Identify the main administrator",
    detail: "Decide who will be the primary point of contact and system administrator for your organization.",
  },
  {
    id: "records",
    label: "List your existing records",
    detail: "Note what records you currently maintain (registers, spreadsheets, files) that would need to move into the system.",
  },
  {
    id: "workflows",
    label: "Identify the workflows you want to simplify",
    detail: "Think about which day-to-day tasks are most time-consuming or error-prone today.",
  },
  {
    id: "roles",
    label: "Determine expected user roles",
    detail: "Consider who else needs access, and what each person should be able to see or do.",
  },
  {
    id: "questions",
    label: "Prepare questions for the demonstration",
    detail: "Jot down specific questions about your workflows so the demo addresses what matters to you.",
  },
];

export default function ReadinessChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const progress = Math.round((checked.size / READINESS_ITEMS.length) * 100);

  return (
    <div className="readiness-checklist">
      {READINESS_ITEMS.map((item) => (
        <label className="readiness-item" key={item.id}>
          <input type="checkbox" checked={checked.has(item.id)} onChange={() => toggle(item.id)} />
          <span>
            <span className="readiness-item-label">{item.label}</span>
            <span className="readiness-item-detail text-muted">{item.detail}</span>
          </span>
        </label>
      ))}

      <div className="readiness-progress">
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-sm)", fontWeight: 600 }}>
          <span>Your readiness</span>
          <span>{progress}%</span>
        </div>
        <div className="readiness-progress-bar">
          <div className="readiness-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <p className="readiness-disclaimer">
        This checklist is informational and intended to help you prepare for a conversation with us. It
        does not constitute a confirmed implementation plan.
      </p>
    </div>
  );
}
