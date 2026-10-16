import { useState } from "react";
import Icon from "./Icon";
import type { PersonaEntry } from "../data/personas";
import "./PersonaMessaging.css";

export default function PersonaMessaging({ personas }: { personas: PersonaEntry[] }) {
  const [activeId, setActiveId] = useState(personas[0]?.id);
  const active = personas.find((p) => p.id === activeId) ?? personas[0];

  return (
    <div className="persona-messaging">
      <div className="persona-nav" role="tablist" aria-label="Choose your role">
        {personas.map((persona) => (
          <button
            key={persona.id}
            role="tab"
            aria-selected={persona.id === active.id}
            className={`persona-nav-item ${persona.id === active.id ? "is-active" : ""}`}
            onClick={() => setActiveId(persona.id)}
          >
            <Icon name={persona.icon} size={18} />
            <span>{persona.role}</span>
          </button>
        ))}
      </div>

      <div className="persona-panel" role="tabpanel">
        <h3>If you're a {active.role}...</h3>
        <p className="persona-concern">{active.concern}</p>
        <ul className="persona-what-you-get">
          {active.whatTheyGet.map((item) => (
            <li key={item}>
              <Icon name="check" size={16} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
