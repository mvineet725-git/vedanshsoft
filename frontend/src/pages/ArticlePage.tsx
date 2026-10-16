import { Link, Navigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { ARTICLES } from "../data/articles/content";
import "./ArticlePage.css";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const related = ARTICLES.filter((a) => article.relatedSlugs.includes(a.slug));

  return (
    <Layout>
      <Seo
        title={`${article.title} | Vedansh Software Services`}
        description={article.metaDescription}
        canonicalPath={`/articles/${article.slug}`}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.metaDescription,
          datePublished: article.publishedDate,
          author: { "@type": "Organization", name: "Vedansh Software Services" },
        })}
      </script>

      <section className="article-hero">
        <div className="container">
          <Link to="/articles" className="btn btn-ghost btn-sm" style={{ marginBottom: "var(--space-4)", paddingInline: 0 }}>
            &larr; Back to Articles
          </Link>
          <span className="eyebrow">{article.category}</span>
          <h1 style={{ marginTop: "var(--space-3)" }}>{article.title}</h1>
          <div className="article-meta" style={{ marginTop: "var(--space-4)" }}>
            <span>{new Date(article.publishedDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>&middot;</span>
            <span>{article.readingTimeMinutes} min read</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="article-body">
            {article.sections.map((section) => (
              <div className="article-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="article-cta-box">
              <h3>Have a specific question about your organization?</h3>
              <p className="text-muted" style={{ marginTop: "var(--space-2)", marginBottom: "var(--space-5)" }}>
                Explore our solutions or reach out directly — we're happy to discuss your specific situation.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
                <Link to="/solutions" className="btn btn-secondary">Explore Solutions</Link>
                <Link to="/contact" className="btn btn-primary">Contact Us</Link>
              </div>
            </div>

            {related.length > 0 && (
              <div className="article-related">
                <h3 style={{ fontSize: "var(--fs-lg)" }}>Related Articles</h3>
                <div className="article-related-list">
                  {related.map((r) => (
                    <Link to={`/articles/${r.slug}`} key={r.slug}>{r.title} &rarr;</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
