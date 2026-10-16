import { Link } from "react-router-dom";
import Icon from "./Icon";
import { APPROVED_TESTIMONIALS, EXPLORE_SCENARIOS } from "../data/testimonials";
import "./TestimonialsOrExplore.css";

export default function TestimonialsOrExplore() {
  if (APPROVED_TESTIMONIALS.length > 0) {
    return (
      <div className="grid grid-3">
        {APPROVED_TESTIMONIALS.filter((t) => t.approved).map((t) => (
          <div className="card testimonial-card" key={`${t.customerName}-${t.organizationName}`}>
            <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="testimonial-attribution">
              <strong>{t.customerName}</strong>
              <span className="text-muted">{t.organizationName}, {t.city}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-2">
      {EXPLORE_SCENARIOS.map((scenario) => (
        <Link to={scenario.demoLink} className="card card-hover explore-scenario-card" key={scenario.title}>
          <div className="card-icon teal">
            <Icon name={scenario.icon} />
          </div>
          <h4 style={{ marginBottom: "0.6rem" }}>{scenario.title}</h4>
          <p className="text-muted">{scenario.description}</p>
          <span className="explore-scenario-link">Explore this walkthrough &rarr;</span>
        </Link>
      ))}
    </div>
  );
}
