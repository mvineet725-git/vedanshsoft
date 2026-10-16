import { useMemo, useState } from "react";
import FaqAccordion from "./FaqAccordion";
import Icon from "./Icon";
import { FAQ_CATEGORIES, type FaqEntry } from "../data/faqs";
import "./SearchableFaq.css";

export default function SearchableFaq({ items }: { items: FaqEntry[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesSearch =
        term.length === 0 ||
        item.question.toLowerCase().includes(term) ||
        item.answer.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [items, search, category]);

  return (
    <div className="searchable-faq">
      <div className="searchable-faq-controls">
        <div className="city-search-wrap">
          <Icon name="search" size={18} />
          <input
            type="text"
            className="city-search-input"
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search FAQs"
          />
        </div>
      </div>

      <div className="searchable-faq-categories" role="tablist" aria-label="FAQ categories">
        <button
          role="tab"
          aria-selected={category === "all"}
          className={`faq-category-chip ${category === "all" ? "is-active" : ""}`}
          onClick={() => setCategory("all")}
        >
          All
        </button>
        {FAQ_CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={category === cat}
            className={`faq-category-chip ${category === cat ? "is-active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state" role="status">
          No FAQs match your search. Try a different term, or{" "}
          <a href="/contact">contact us</a> with your question.
        </div>
      ) : (
        <FaqAccordion items={filtered} />
      )}
    </div>
  );
}
