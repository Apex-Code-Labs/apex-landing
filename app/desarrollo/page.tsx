import type { Metadata } from 'next'
import { MessageCircle } from 'lucide-react'
import Header from '@/components/Header'
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
      <section className="pt-28 md:pt-40 pb-16 md:pb-20 bg-primary-50 dark:bg-gray-900">
        <div className="container-custom">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-400 mb-4">
            Apex Code Labs · Desarrollo para empresas
          </p>
          <h1 className="max-w-4xl text-[2.25rem] leading-[1.08] sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Construimos el sistema que tu empresa va a vender o a usar, con la tecnología que elijas.
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Apps móviles, plataformas con pagos, sistemas para operar un negocio y productos que se venden a otras empresas. Nuestro propio ERP es la prueba de que lo sabemos sostener en producción.
          </p>
          <div className="mt-10">
            <DevCta />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="section-head">
            <h2>Lo que construimos</h2>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-10 border-t border-gray-200 dark:border-gray-800">
            {BUILDS.map((text) => (
              <li key={text} className="py-6 border-b border-gray-200 dark:border-gray-800 font-semibold">
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {CASES.length > 0 && (
        <section className="section-padding bg-primary-50 dark:bg-gray-900">
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

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="section-head">
            <h2>Cómo trabajamos</h2>
          </div>
          <ol className="grid md:grid-cols-3 gap-x-8">
            {STEPS.map((text, i) => (
              <li key={text} className="relative pt-6 pb-8 border-t-2 border-gray-200 dark:border-gray-800">
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
