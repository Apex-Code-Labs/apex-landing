import type { Metadata } from 'next'
import { MessageCircle } from 'lucide-react'
import Header from '@/components/Header'
import OrbitHero, { type OrbitCard } from '@/components/OrbitHero'
import dashboardLight from '@/public/screenshots/dashboard_light.webp'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { waLink, WA_MESSAGE_DEV } from '@/lib/contact'

const TITLE = 'Desarrollo de software para empresas — Apex Code Labs'
const DESCRIPTION =
  'Construimos apps móviles, plataformas con pagos, sistemas para operar un negocio y productos que tu empresa vende a otras empresas. Propuesta escrita con alcance, etapas y tiempos.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/desarrollo' },
  // openGraph del page REEMPLAZA al del layout (no se fusiona): se repiten imagen, locale y siteName.
  openGraph: {
    type: 'website',
    locale: 'es_SV',
    siteName: 'Apex Code Labs',
    url: 'https://apexcodelabs.com/desarrollo',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Apex Code Labs — Desarrollo para empresas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
}

const BUILDS = [
  'Apps móviles para iOS y Android',
  'Plataformas donde el cliente compra y paga desde su teléfono',
  'Sistemas para operar un negocio de punta a punta',
  'Productos que tu empresa vende a otras empresas, cada una con sus datos separados',
]

const STEPS = [
  'Conocemos la operación hablando con quien hace el trabajo.',
  'Propuesta escrita con alcance, etapas, tiempos y precio.',
  'Entregamos por etapas y se usa lo construido antes de seguir.',
]

const HERO_CARDS: OrbitCard[] = [
  { kind: 'Móvil', name: 'Apps móviles', detail: 'Para iOS y Android.' },
  { kind: 'Pagos', name: 'Plataformas con cobro', detail: 'El cliente compra y paga desde su teléfono.' },
  { kind: 'SaaS', name: 'Productos para otras empresas', detail: 'Cada empresa con sus datos separados.' },
]

// ponytail: sin casos publicables todavía; se llena cuando haya partners que se puedan mostrar
const CASES: { name: string; logo: string; summary: string }[] = []

function DevCta() {
  return (
    <a
      href={waLink(WA_MESSAGE_DEV)}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary text-lg px-7 py-4 inline-flex items-center justify-center gap-2"
    >
      <MessageCircle className="w-5 h-5" aria-hidden="true" />
      Cuéntanos tu proyecto
    </a>
  )
}

export default function Desarrollo() {
  return (
    <main className="min-h-screen">
      <Header />
      <OrbitHero
        title={['Tú traes la operación.', 'Nosotros, el sistema.', 'Entregado por etapas.']}
        lede="Apps móviles, plataformas con pagos, sistemas para operar un negocio y productos que se venden a otras empresas. Nuestro propio ERP es la prueba de que lo sabemos sostener en producción."
        cta={{ href: waLink(WA_MESSAGE_DEV), label: 'Cuéntanos tu proyecto', whatsapp: true }}
        trust={['Propuesta escrita con alcance y precio', 'Entregas por etapas', 'Con la tecnología que elijas']}
        image={dashboardLight}
        imageAlt="Dashboard de Apex ERP, el sistema que construimos y operamos en producción"
        cards={HERO_CARDS}
        cardsLabel="Lo que construimos"
      />

      <section className="section-padding bg-white dark:bg-night-950">
        <div className="container-custom">
          <div className="section-head">
            <h2>Lo que construimos</h2>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-10 border-t border-gray-200 dark:border-night-800">
            {BUILDS.map((text) => (
              <li key={text} className="py-6 border-b border-gray-200 dark:border-night-800 font-semibold">
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {CASES.length > 0 && (
        <section className="section-padding bg-primary-50 dark:bg-night-900">
          <div className="container-custom">
            <div className="section-head">
              <h2>Lo que ya construimos</h2>
            </div>
            <ul className="grid md:grid-cols-2 gap-8">
              {CASES.map(({ name, logo, summary }) => (
                <li key={name}>
                  <img src={logo} alt={name} className="h-10 w-auto mb-4" />
                  <h3 className="font-bold mb-2">{name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section-padding bg-white dark:bg-night-950">
        <div className="container-custom">
          <div className="section-head">
            <h2>Cómo trabajamos</h2>
          </div>
          <ol className="grid md:grid-cols-3 gap-x-8">
            {STEPS.map((text, i) => (
              <li key={text} className="relative pt-6 pb-8 border-t-2 border-gray-200 dark:border-night-800">
                <span className="absolute -top-0.5 left-0 w-12 h-0.5 bg-accent-600" aria-hidden="true" />
                <span className="block text-sm font-bold text-accent-700 dark:text-accent-300 tabular-nums mb-3">
                  Paso {i + 1}
                </span>
                <p className="font-semibold leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <DevCta />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
