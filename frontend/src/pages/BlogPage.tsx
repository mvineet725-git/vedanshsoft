import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { ARTICLES } from "../data/articles/content";
import "./BlogPage.css";

const CATEGORIES = ["All", "Society Management", "Education Management", "Implementation"] as const;

export default function BlogPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = category === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === category);
  const sorted = [...filtered].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));

  return (
    <Layout>
      <Seo
        title="Articles & Guides | Vedansh Software Services"
        description="Practical guides on digitizing housing society management and education institution administration — written to help, not to sell."
        canonicalPath="/articles"
      />

      <section className="blog-hero">
        <div className="container">
          <span className="eyebrow">Articles & Guides</span>
          <h1>Practical Guides for Societies and Institutions</h1>
          <p className="text-muted" style={{ marginTop: "var(--space-4)", maxWidth: "640px", marginInline: "auto" }}>
            Honest, practical write-ups on digitizing society and education administration — not
            thinly veiled sales pages.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-filters" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={category === cat}
                className={`blog-filter-chip ${category === cat ? "is-active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="blog-list">
            {sorted.map((article) => (
              <Link to={`/articles/${article.slug}`} className="blog-card" key={article.slug}>
                <div className="blog-card-meta">
                  <span>{article.category}</span>
                  <span>&middot;</span>
                  <span>{article.readingTimeMinutes} min read</span>
                </div>
                <h3>{article.title}</h3>
                <p className="text-muted">{article.summary}</p>
                <span className="blog-card-link">Read article &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
