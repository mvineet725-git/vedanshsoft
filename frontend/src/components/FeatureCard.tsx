import Icon, { type IconName } from "./Icon";

interface FeatureCardProps {
  icon: IconName;
  title: string;
  description: string;
  tone?: "royal" | "teal";
}

export default function FeatureCard({ icon, title, description, tone = "royal" }: FeatureCardProps) {
  return (
    <div className="card card-hover">
      <div className={`card-icon ${tone === "teal" ? "teal" : ""}`}>
        <Icon name={icon} />
      </div>
      <h4 style={{ marginBottom: "0.6rem" }}>{title}</h4>
      <p className="text-muted">{description}</p>
    </div>
  );
}
