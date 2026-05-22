import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SITE_URL = 'https://nancy995.github.io/vivrebiobyyeyi';
const DEFAULT_OG_IMAGE = `${SITE_URL}/hero-vivrebio.jpg`;

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export default function Seo({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  jsonLd,
}: SeoProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const fullTitle = title.includes('VIVRE BIO') ? title : `${title} | VIVRE BIO`;
  const canonicalUrl = canonical || SITE_URL + window.location.pathname;

  return (
    <Helmet>
      <html lang={currentLang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <link rel="alternate" hrefLang="fr" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={currentLang === 'fr' ? 'fr_FR' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {jsonLd && (
        <>
          {Array.isArray(jsonLd)
            ? jsonLd.map((item, index) => (
                <script key={index} type="application/ld+json">
                  {JSON.stringify(item)}
                </script>
              ))
            : (
              <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
              </script>
            )}
        </>
      )}
    </Helmet>
  );
}
