import { FAQS } from './faqs'

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Apex Code Labs",
    "url": "https://apexcodelabs.com",
    "logo": "https://apexcodelabs.com/brand/isotipo.svg",
    "description": "Apex Code Labs desarrolla Apex ERP, el sistema de gestión con punto de venta, inventario, comandas y facturación electrónica DTE integrada con el Ministerio de Hacienda de El Salvador.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SV"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+503-XXXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English"]
    },
    "sameAs": [
      "https://linkedin.com/company/apex-code-labs",
      "https://twitter.com/apexcodelabs"
    ]
  }
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Apex Code Labs",
    "url": "https://apexcodelabs.com",
    "description": "Apex ERP: ventas, POS, inventario, comandas y facturación electrónica DTE en una sola plataforma para negocios en El Salvador.",
    "inLanguage": "es-SV",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://apexcodelabs.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
}

export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Apex ERP',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Android, iOS (PWA)',
    description:
      'Sistema ERP con punto de venta, inventario, comandas y facturación electrónica DTE integrada con el Ministerio de Hacienda de El Salvador.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '5.63',
      highPrice: '56.48',
      offerCount: 10,
    },
    provider: { '@type': 'Organization', name: 'Apex Code Labs', url: 'https://apexcodelabs.com' },
  }
}

export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}
