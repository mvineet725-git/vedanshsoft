import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import { track } from "../lib/analytics";
import "./SolutionFinder.css";

type OrgType = "society" | "school" | "coaching" | "other";
type Challenge = "records" | "payments" | "communication" | "reports";

const ORG_TYPE_OPTIONS: { value: OrgType; label: string }[] = [
  { value: "society", label: "A housing or cooperative society" },
  { value: "school", label: "A school or college" },
  { value: "coaching", label: "A coaching institute or tuition class" },
  { value: "other", label: "Something else" },
];

const CHALLENGE_OPTIONS: { value: Challenge; label: string }[] = [
  { value: "records", label: "Keeping records organized" },
  { value: "payments", label: "Tracking payments and dues" },
  { value: "communication", label: "Communicating with residents/students" },
  { value: "reports", label: "Preparing reports" },
];

const CHALLENGE_NOTE: Record<Challenge, string> = {
  records: "Since record-keeping is your main challenge, we'll focus on how centralized records could help.",
  payments: "Since payment tracking is your main challenge, we'll focus on billing and collection tracking.",
  communication: "Since communication is your main challenge, we'll focus on notices and messaging features.",
  reports: "Since reporting is your main challenge, we'll focus on dashboards and summarized reports.",
};

function resolveProduct(orgType: OrgType): "society" | "education" | "custom" {
  if (orgType === "society") return "society";
  if (orgType === "school" || orgType === "coaching") return "education";
  return "custom";
}

export default function SolutionFinder() {
  const [step, setStep] = useState(0);
  const [orgType, setOrgType] = useState<OrgType | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const totalSteps = 2;

  if (orgType && step >= totalSteps) {
    const product = resolveProduct(orgType);
    const productPath =
      product === "society"
        ? "/solutions/society-management"
        : product === "education"
        ? "/solutions/education-management"
        : "/solutions";
    const productLabel =
      product === "society"
        ? "Society Management Software"
        : product === "education"
        ? "Education Management Software"
        : "Custom Software Development";
    const challengeNoteParam = challenge
      ? `&note=${encodeURIComponent(`Main challenge: ${CHALLENGE_OPTIONS.find((c) => c.value === challenge)?.label ?? ""}`)}`
      : "";
    const contactQuery = `?product=${product}&demo=true${challengeNoteParam}`;

    return (
      <div className="solution-finder">
        <div className="solution-finder-result">
          <div className="solution-finder-result-icon">
            <Icon name="check" size={28} />
          </div>
          <h3>Based on your answers, {productLabel} looks like a good fit</h3>
          <p className="text-muted">
            This is a quick starting point, not a full requirements review — our team will confirm the best
            approach for your organization once you get in touch.
          </p>
          {challenge && <p className="text-muted">{CHALLENGE_NOTE[challenge]}</p>}
          <div className="solution-finder-result-actions">
            <Link to={productPath} className="btn btn-secondary">
              Explore {productLabel}
            </Link>
            <Link to={`/contact${contactQuery}`} className="btn btn-primary">
              Request a Demo
            </Link>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-sm solution-finder-back"
            onClick={() => {
              setStep(0);
              setOrgType(null);
              setChallenge(null);
            }}
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="solution-finder">
      <div className="solution-finder-progress">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className={`solution-finder-progress-dot ${i < step ? "is-complete" : ""}`} />
        ))}
      </div>

      {step === 0 && (
        <>
          <h3 className="solution-finder-question">What type of organization do you manage?</h3>
          <div className="solution-finder-options">
            {ORG_TYPE_OPTIONS.map((option) => (
              <button
                key={option.value}
                className="solution-finder-option"
                onClick={() => {
                  setOrgType(option.value);
                  setStep(1);
                }}
              >
                {option.label}
                <Icon name="arrow-right" size={18} />
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h3 className="solution-finder-question">What's your main challenge right now?</h3>
          <div className="solution-finder-options">
            {CHALLENGE_OPTIONS.map((option) => (
              <button
                key={option.value}
                className="solution-finder-option"
                onClick={() => {
                  setChallenge(option.value);
                  setStep(2);
                  if (orgType) {
                    track("solution_finder_completed", { product: resolveProduct(orgType), step: option.value });
                  }
                }}
              >
                {option.label}
                <Icon name="arrow-right" size={18} />
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-ghost btn-sm solution-finder-back" onClick={() => setStep(0)}>
            &larr; Back
          </button>
        </>
      )}

      <p className="solution-finder-disclaimer">
        This quick finder suggests a starting point based on your answers — it does not replace a full
        consultation with our team.
      </p>
    </div>
  );
}
