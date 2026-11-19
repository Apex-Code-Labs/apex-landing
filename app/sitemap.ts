import type { MetadataRoute } from 'next'

const BASE = 'https://apexcodelabs.com'

// Una entrada por página pública. /gracias queda fuera: es la confirmación del formulario.
const ROUTES = ['', '/facturacion', '/erp', '/restaurantes', '/desarrollo', '/precios', '/politica-privacidad']

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({ url: `${BASE}${path}` }))
}
