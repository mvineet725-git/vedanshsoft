import Icon, { type IconName } from "./Icon";
import "./StatCard.css";

type StatCardTone = "royal" | "teal" | "warning" | "danger";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: IconName;
  tone?: StatCardTone;
  description?: string;
  alert?: boolean;
}

export default function StatCard({ label, value, icon, tone = "royal", description, alert = false }: StatCardProps) {
  return (
    <div className={`stat-card-v2 tone-${tone}${alert ? " is-alert" : ""}`}>
      <div className="stat-card-v2-icon">
        <Icon name={icon} size={22} />
      </div>
      <div className="stat-card-v2-body">
        <span className="stat-card-v2-value">{value}</span>
        <span className="stat-card-v2-label">{label}</span>
        {description && <span className="stat-card-v2-description">{description}</span>}
      </div>
    </div>
  );
}
