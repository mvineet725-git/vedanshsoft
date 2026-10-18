interface SeoProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
}

// TEMPORARY (friend-review round): points at the live Vercel host so canonical
// URLs and social link-preview images actually resolve when the link is shared.
//
// BEFORE PUBLIC LAUNCH: change this back to "https://www.vedanshsoftware.com"
// (and update public/sitemap.xml + public/robots.txt, which still reference the
// real domain) once that domain is connected to the Vercel project. Leaving it
// on the vercel.app host after launch would make search engines treat the
// temporary host as canonical.
const SITE_URL = "https://vedanshsoft-kzuq.vercel.app";

export default function Seo({ title, description, canonicalPath, ogImage }: SeoProps) {
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const image = ogImage ?? `${SITE_URL}/og-default.svg`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Vedansh Software Services" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
