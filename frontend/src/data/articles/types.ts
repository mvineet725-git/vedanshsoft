export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  category: "Society Management" | "Education Management" | "Implementation";
  metaDescription: string;
  summary: string;
  publishedDate: string;
  readingTimeMinutes: number;
  sections: ArticleSection[];
  relatedSlugs: string[];
}
