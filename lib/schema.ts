import { SOCIAL } from './contact'

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Apex Code Labs",
    "url": "https://apexcodelabs.com",
    "logo": "https://apexcodelabs.com/brand/isotipo.svg",
    "description": "Apex Code Labs ofrece Apex Factura (facturación electrónica DTE con el Ministerio de Hacienda de El Salvador), Apex ERP con punto de venta e inventario, y desarrollo de software a la medida para empresas.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SV"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+503-7931-2064",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English"]
    },
    "sameAs": Object.values(SOCIAL)
  }
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Apex Code Labs",
    "url": "https://apexcodelabs.com",
    "description": "Facturación electrónica con Apex Factura, Apex ERP para cuando tu negocio crece y desarrollo a la medida para empresas en El Salvador.",
    "inLanguage": "es-SV"
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
      highPrice: '45.18',
      offerCount: 5,
    },
    provider: { '@type': 'Organization', name: 'Apex Code Labs', url: 'https://apexcodelabs.com' },
  }
}
