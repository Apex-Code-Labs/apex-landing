import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema'
import { Analytics } from '@vercel/analytics/react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Apex Code Labs - Impulsa tu empresa con IA, CRM, ERP y Facturación Electrónica',
  description: 'Automatizamos tus procesos y escalamos tu operación con soluciones a medida: desde marketing con CRM hasta ERPs y facturación electrónica en El Salvador, potenciadas por IA.',
  keywords: 'IA, automatización, CRM, ERP, facturación electrónica, El Salvador, ChatGPT, Claude, Gemini, Grok',
  authors: [{ name: 'Apex Code Labs' }],
  creator: 'Apex Code Labs',
  publisher: 'Apex Code Labs',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_SV',
    url: 'https://apexcodelabs.com',
    siteName: 'Apex Code Labs',
    title: 'Apex Code Labs - Impulsa tu empresa con IA, CRM, ERP y Facturación Electrónica',
    description: 'Automatizamos tus procesos y escalamos tu operación con soluciones a medida: desde marketing con CRM hasta ERPs y facturación electrónica en El Salvador, potenciadas por IA.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Apex Code Labs - Automatización con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@apexcodelabs',
    creator: '@apexcodelabs',
    title: 'Apex Code Labs - Impulsa tu empresa con IA, CRM, ERP y Facturación Electrónica',
    description: 'Automatizamos tus procesos y escalamos tu operación con soluciones a medida: desde marketing con CRM hasta ERPs y facturación electrónica en El Salvador, potenciadas por IA.',
    images: ['/og.jpg'],
  },
  alternates: {
    canonical: 'https://apexcodelabs.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebSiteSchema()

  return (
    <html lang="es-SV" className={`scroll-smooth ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0E3A4A" />
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
