import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div className="accordion-item" data-open={isOpen} key={item.question}>
            <button
              className="accordion-trigger"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              id={`faq-trigger-${index}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <span className="accordion-icon" aria-hidden="true">+</span>
            </button>
            <div
              className="accordion-panel"
              role="region"
              id={`faq-panel-${index}`}
              aria-labelledby={`faq-trigger-${index}`}
            >
              <div className="accordion-panel-inner">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
