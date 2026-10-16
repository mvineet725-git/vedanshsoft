import { useState } from "react";
import { Link } from "react-router-dom";
import Icon, { type IconName } from "./Icon";
import "./FeatureExplorer.css";

export interface ExplorerFeature {
  id: string;
  icon: IconName;
  title: string;
  problem: string;
  solution: string;
  bullets: string[];
}

interface FeatureExplorerProps {
  features: ExplorerFeature[];
  demoLink: string;
  demoLabel: string;
}

export default function FeatureExplorer({ features, demoLink, demoLabel }: FeatureExplorerProps) {
  const [activeId, setActiveId] = useState(features[0]?.id);
  const active = features.find((f) => f.id === activeId) ?? features[0];

  return (
    <div className="feature-explorer">
      <div className="feature-explorer-nav" role="tablist" aria-label="Feature categories">
        {features.map((feature) => (
          <button
            key={feature.id}
            role="tab"
            aria-selected={feature.id === active.id}
            className={`feature-explorer-nav-item ${feature.id === active.id ? "is-active" : ""}`}
            onClick={() => setActiveId(feature.id)}
          >
            <Icon name={feature.icon} size={20} />
            <span>{feature.title}</span>
          </button>
        ))}
      </div>

      <div className="feature-explorer-panel" role="tabpanel">
        <div className="feature-explorer-text">
          <div className="feature-explorer-icon">
            <Icon name={active.icon} size={32} />
          </div>
          <h3>{active.title}</h3>
          <p className="feature-explorer-problem">
            <strong>The challenge: </strong>{active.problem}
          </p>
          <p className="text-muted">{active.solution}</p>
          <ul className="feature-explorer-bullets">
            {active.bullets.map((bullet) => (
              <li key={bullet}>
                <Icon name="check" size={18} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Link to={demoLink} className="btn btn-secondary btn-sm">
            {demoLabel}
          </Link>
        </div>

        <div className="feature-explorer-preview">
          <div className="feature-explorer-preview-header">
            <Icon name={active.icon} size={18} />
            <span>{active.title}</span>
          </div>
          <div className="feature-explorer-preview-body">
            {active.bullets.map((bullet, i) => (
              <div className="feature-explorer-preview-row" key={bullet}>
                <div className="feature-explorer-preview-dot" style={{ opacity: 1 - i * 0.15 }} />
                <div className="feature-explorer-preview-bar" style={{ width: `${85 - i * 12}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
