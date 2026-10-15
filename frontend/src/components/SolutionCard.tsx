import { Link } from "react-router-dom";
import Icon, { type IconName } from "./Icon";
import "./SolutionCard.css";

interface SolutionCardProps {
  icon: IconName;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaTo: string;
  tone: "navy" | "teal";
}

export default function SolutionCard({ icon, title, description, bullets, ctaLabel, ctaTo, tone }: SolutionCardProps) {
  return (
    <div className={`solution-card solution-card-${tone}`}>
      <div className="solution-card-icon">
        <Icon name={icon} size={32} />
      </div>
      <h3>{title}</h3>
      <p className="text-muted">{description}</p>
      <ul className="solution-card-bullets">
        {bullets.map((bullet) => (
          <li key={bullet}>
            <Icon name="check" size={18} />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <Link to={ctaTo} className="btn btn-primary">
        {ctaLabel}
      </Link>
    </div>
  );
}
