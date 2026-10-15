interface SeoProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
}

const SITE_URL = "https://www.vedanshsoftware.com";

export default function Seo({ title, description, canonicalPath, ogImage }: SeoProps) {
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const image = ogImage ?? `${SITE_URL}/og-default.png`;

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
