const SITE_URL = 'https://nancy995.github.io/vivrebiobyyeyi';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vivre Bio',
    url: SITE_URL,
    logo: `${SITE_URL}/hero-vivrebio.jpg`,
    description: 'Vente de produits naturels, bio et bien-être au Bénin.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cotonou',
      addressCountry: 'BJ',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+229-67-24-24-07',
      contactType: 'customer service',
      availableLanguage: ['French', 'English'],
    },
    sameAs: [
      'https://www.instagram.com/vivrebiobenin/',
      'https://www.tiktok.com/@vivrebiobenin',
      'https://www.facebook.com/vivrebiobenin',
      'https://www.pinterest.com/vivrebiobenin/',
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vivre Bio',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function productSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: boolean;
  rating?: number;
  reviewCount?: number;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    url: `${SITE_URL}/product/${product.slug}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'XOF',
      availability: product.availability !== false
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    ...(product.rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount || 0,
          },
        }
      : {}),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

export function howToSchema(steps: { name: string; text: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Comment commander sur Vivre Bio',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Vivre Bio',
    description: 'Magasin de produits naturels et bio au Bénin.',
    url: SITE_URL,
    telephone: '+229-67-24-24-07',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cotonou',
      addressCountry: 'BJ',
    },
    sameAs: [
      'https://www.instagram.com/vivrebiobenin/',
      'https://www.tiktok.com/@vivrebiobenin',
      'https://www.facebook.com/vivrebiobenin',
    ],
  };
}
