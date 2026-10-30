import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSoftwareApplicationSchema,
  generateFAQSchema,
} from '@/lib/schema'
import Providers from '@/components/Providers'
import { ENTRY_PRICE } from '@/lib/pricing'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const TITLE = 'Apex Code Labs — Facturación electrónica, Apex ERP y desarrollo a la medida en El Salvador'
const DESCRIPTION = `Factura electrónica con Apex Factura desde ${ENTRY_PRICE}/mes con IVA incluido: tus DTEs van directo al Ministerio de Hacienda. Cuando tu negocio crece, sumas Apex ERP con punto de venta e inventario. Y si necesitas algo a tu medida, lo desarrollamos.`

export const metadata: Metadata = {
  metadataBase: new URL('https://apexcodelabs.com'),
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'facturación electrónica El Salvador, DTE, Apex Factura, Apex ERP, punto de venta, inventario, Ministerio de Hacienda, desarrollo de software para empresas, El Salvador',
  authors: [{ name: 'Apex Code Labs' }],
  creator: 'Apex Code Labs',
  publisher: 'Apex Code Labs',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_SV',
    url: 'https://apexcodelabs.com',
    siteName: 'Apex Code Labs',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Apex Code Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
  alternates: { canonical: 'https://apexcodelabs.com' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebSiteSchema()
  const softwareApplicationSchema = generateSoftwareApplicationSchema()
  const faqSchema = generateFAQSchema()

  return (
    <html lang="es-SV" className={`scroll-smooth ${poppins.variable}`} suppressHydrationWarning>
      <head>
        {/* Workaround opennextjs-cloudflare: su esbuild (keepNames) inyecta
            llamadas a __name en scripts inline serializados (next-themes);
            sin este no-op el script anti-FOUC muere con ReferenceError. */}
        <script dangerouslySetInnerHTML={{ __html: 'self.__name=self.__name||(f=>f)' }} />
        <meta name="theme-color" content="#121C8C" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />

        {/* Plausible Analytics */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
