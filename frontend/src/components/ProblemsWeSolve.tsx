import { useState } from "react";
import Icon from "./Icon";
import { EDUCATION_PROBLEMS, SOCIETY_PROBLEMS } from "../data/problems";
import "./ProblemsWeSolve.css";

export default function ProblemsWeSolve() {
  const [tab, setTab] = useState<"society" | "education">("society");
  const problems = tab === "society" ? SOCIETY_PROBLEMS : EDUCATION_PROBLEMS;

  return (
    <div className="problems-solve">
      <div className="problems-solve-toggle" role="tablist" aria-label="Choose organization type">
        <button
          role="tab"
          aria-selected={tab === "society"}
          className={`problems-solve-tab ${tab === "society" ? "is-active" : ""}`}
          onClick={() => setTab("society")}
        >
          <Icon name="building" size={18} /> For Societies
        </button>
        <button
          role="tab"
          aria-selected={tab === "education"}
          className={`problems-solve-tab ${tab === "education" ? "is-active" : ""}`}
          onClick={() => setTab("education")}
        >
          <Icon name="graduation" size={18} /> For Educational Institutions
        </button>
      </div>

      <div className="problems-solve-grid" role="tabpanel">
        {problems.map((p) => (
          <div className="problem-card" key={p.problem}>
            <div className="problem-card-issue">
              <Icon name="clock" size={18} />
              <span>{p.problem}</span>
            </div>
            <div className="problem-card-arrow">
              <Icon name="arrow-right" size={16} />
            </div>
            <div className="problem-card-solution">
              <Icon name="check" size={18} />
              <span>{p.howWeHelp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
