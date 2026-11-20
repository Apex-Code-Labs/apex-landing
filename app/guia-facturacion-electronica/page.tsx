import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

const TITLE = 'Facturación electrónica en El Salvador: guía 2026 (DTE y Normativa 2.0)'
const DESCRIPTION =
  'Quién está obligado, cómo empezar a emitir DTE, el sistema gratuito del MH frente a uno propio, contingencia y qué cambia con la Normativa 2.0 el 1 de diciembre de 2026.'
const UPDATED = '19 de noviembre de 2026'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['facturación electrónica El Salvador', 'factura electrónica', 'DTE', 'Normativa DTE 2.0', 'Ministerio de Hacienda'],
  alternates: { canonical: '/guia-facturacion-electronica' },
  // openGraph del page REEMPLAZA al del layout (no se fusiona): se repiten imagen, locale y siteName.
  openGraph: {
    type: 'article',
    locale: 'es_SV',
    siteName: 'Apex Code Labs',
    url: 'https://apexcodelabs.com/guia-facturacion-electronica',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Guía de facturación electrónica en El Salvador' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og.png'] },
}

// Solo fuentes oficiales; cada dato fiscal de la página enlaza a una. Verificadas el 19-nov-2026.
const SOURCES = {
  decreto: { label: 'Decreto Legislativo N.º 487 (Asamblea Legislativa)', href: 'https://www.asamblea.gob.sv/sites/default/files/documents/decretos/6382FFCC-9BC7-42CF-9AE1-695C9513FADD.pdf' },
  normativa: { label: 'Normativa de Cumplimiento de los DTE, versión 2.0 (factura.gob.sv)', href: 'https://factura.gob.sv/normativa/' },
  sistemas: { label: 'Sistema de Facturación y Sistema de Transmisión (factura.gob.sv)', href: 'https://factura.gob.sv/' },
  fecha: { label: 'Conozca su fecha para ser emisor DTE (factura.gob.sv)', href: 'https://factura.gob.sv/conozca-fecha-para-ser-emisor/' },
  catalogos: { label: 'Catálogos de facturación electrónica, CAT-002 (factura.gob.sv)', href: 'https://factura.gob.sv/informacion-tecnica-y-funcional/' },
}

// Catálogo CAT-002 del MH: tipos de documento (sin los eventos 17 y 18).
const DOCUMENT_TYPES = [
  ['01', 'Factura'], ['03', 'Comprobante de crédito fiscal'], ['04', 'Nota de remisión'], ['05', 'Nota de crédito'],
  ['06', 'Nota de débito'], ['07', 'Comprobante de retención'], ['08', 'Comprobante de liquidación'],
  ['09', 'Documento contable de liquidación'], ['11', 'Factura de exportación'], ['14', 'Factura de sujeto excluido'],
  ['15', 'Comprobante de donación'],
] as const

const link = 'font-semibold text-primary dark:text-accent-300 underline'

function Src({ s, children }: { s: keyof typeof SOURCES; children: ReactNode }) {
  return <a href={SOURCES[s].href} target="_blank" rel="noopener noreferrer" className={link}>{children}</a>
}

function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 pt-12 first:pt-0">
      <h2 className="text-2xl md:text-3xl leading-tight font-bold mb-4">{title}</h2>
      <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">{children}</div>
    </section>
  )
}

function Quote({ children }: { children: ReactNode }) {
  return <blockquote className="border-l-2 border-gray-300 dark:border-night-800 pl-4 italic text-gray-600 dark:text-gray-400">{children}</blockquote>
}

export default function GuiaFacturacionElectronica() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-28 md:pt-40 pb-14 md:pb-20 bg-navy">
        <div className="container-custom max-w-3xl">
          <h1 className="!text-white text-4xl sm:text-5xl leading-[1.08] tracking-[-0.02em] font-extrabold">
            Facturación electrónica en El Salvador: guía 2026
          </h1>
          <p className="mt-6 text-pretty text-lg md:text-xl leading-relaxed text-primary-100">
            Quién está obligado, cómo empezar y qué cambia con la Normativa 2.0. Cada dato enlaza a su fuente oficial.
          </p>
          <p className="mt-4 text-sm text-primary-100">Actualizada el {UPDATED}.</p>
        </div>
      </section>

      <article className="section-padding bg-white dark:bg-night-950">
        <div className="container-custom max-w-3xl">
          <Section title="¿Qué es la facturación electrónica?">
            <p>
              Es la emisión de Documentos Tributarios Electrónicos (DTE). Cada factura, crédito fiscal o nota se genera
              como un archivo JSON, se firma y se transmite al Ministerio de Hacienda, que le otorga un sello de
              recepción. La base legal es el <Src s="decreto">Decreto Legislativo N.º 487</Src>, del 30 de agosto de
              2022, que agregó los artículos 119-A al 119-H al Código Tributario.
            </p>
          </Section>

          <Section id="obligados" title="¿Quién está obligado a facturar electrónicamente en 2026?">
            <p>
              Los contribuyentes que la Dirección General de Impuestos Internos (DGII) haya notificado. Así lo dice
              la <Src s="normativa">Normativa de Cumplimiento</Src>:
            </p>
            <Quote>
              «Los sujetos pasivos obligados para emitir DTE y Eventos son aquellos notificados para tal efecto por la
              Administración Tributaria a través de los medios pertinentes».
            </Quote>
            <p>Si no te han notificado, igual puedes empezar a emitir DTE de forma voluntaria.</p>
          </Section>

          <Section id="cuando" title="¿Cuándo será obligatoria la factura electrónica en El Salvador?">
            <p>
              Ya es obligatoria para quienes recibieron la notificación, y no hay una fecha única para todos. La
              Normativa establece que «la Administración Tributaria establecerá los grupos de sujetos pasivos y las
              fechas de inicio de la obligación».
            </p>
            <p>
              Para conocer tu fecha, consulta con tu NIT o DUI en <Src s="fecha">«Conozca su fecha para ser emisor»</Src>.
              Si apareces clasificado como emisor, la DGII te notificará la fecha de inicio, y puedes empezar antes.
            </p>
          </Section>

          <Section id="2026" title="¿Es obligatoria la factura electrónica en 2026?">
            <p>
              No para todos de forma automática: ninguna fuente oficial fija una fecha en la que todos los
              contribuyentes deban emitir DTE. Depende de que la DGII te haya notificado.
            </p>
            <p>
              Lo que sí cambia en 2026 es la versión: quienes emiten con un sistema propio o de un proveedor deben
              pasar a la <a href="#normativa-2-0" className={link}>Normativa 2.0</a> a más tardar el 1 de diciembre.
            </p>
          </Section>

          <Section id="como" title="¿Cómo hacer una facturación electrónica en El Salvador?">
            <ol className="list-decimal pl-6 space-y-3">
              <li>Revisa si estás obligado y desde cuándo, con tu NIT o DUI en <Src s="fecha">factura.gob.sv</Src>.</li>
              <li>Elige cómo vas a emitir: el Sistema de Facturación gratuito del Ministerio de Hacienda o un Sistema de Transmisión (propio o de un proveedor).</li>
              <li>
                Si usas un Sistema de Transmisión, pasa las pruebas en el ambiente de pruebas del MH. Con la
                autorización, tienes hasta un mes para iniciar la emisión.
              </li>
              <li>Emite: cada DTE se firma y se transmite al MH, que le otorga el sello de recepción.</li>
              <li>Entrega a tu cliente el archivo del DTE y su representación gráfica.</li>
            </ol>
          </Section>

          <Section id="sistemas" title="Sistema gratuito del MH o sistema propio: ¿cuál te conviene?">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 dark:border-night-800 p-5">
                <h3 className="font-bold mb-2">Sistema de Facturación (gratuito)</h3>
                <p className="text-base">
                  «Es un servicio gratuito provisto por el Ministerio de Hacienda listo para su uso en línea, dirigido
                  a contribuyentes que emiten hasta 500 DTE al mes».
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-night-800 p-5">
                <h3 className="font-bold mb-2">Sistema de Transmisión</h3>
                <p className="text-base">
                  «Herramienta desarrollada por el contribuyente conforme a sus necesidades y las especificaciones
                  establecidas por el Ministerio de Hacienda, que permite integrarse con sus sistemas internos».
                </p>
              </div>
            </div>
            <p className="text-base">Definiciones de <Src s="sistemas">factura.gob.sv</Src>.</p>
            <p>
              El gratuito te sirve si emites pocos documentos y no necesitas conectarlo con nada más. Un sistema de
              transmisión conviene cuando pasas de 500 DTE al mes o quieres que la factura salga de tu punto de venta,
              tu inventario o tus libros de IVA sin digitar dos veces.
            </p>
          </Section>

          <Section id="tipos" title="Tipos de DTE y sus códigos">
            <ul className="grid sm:grid-cols-2 gap-x-8 border-t border-gray-200 dark:border-night-800">
              {DOCUMENT_TYPES.map(([code, name]) => (
                <li key={code} className="flex gap-4 py-3 border-b border-gray-200 dark:border-night-800 text-base">
                  <span className="font-bold text-primary dark:text-accent-300 tabular-nums">{code}</span>
                  {name}
                </li>
              ))}
            </ul>
            <p className="text-base">Códigos del <Src s="catalogos">catálogo oficial CAT-002</Src> del Ministerio de Hacienda.</p>
          </Section>

          <Section id="contingencia" title="¿Qué hago si no puedo transmitir? La contingencia">
            <p>
              La Normativa define la contingencia como «la situación imprevista ocasionada por caso fortuito o fuerza
              mayor que impida la transmisión previa de los documentos o eventos a la Administración Tributaria».
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>Cuando la situación termina, transmites el Evento de Contingencia dentro de las 24 horas siguientes.</li>
              <li>
                Después transmites los DTE emitidos durante la contingencia, hasta 72 horas desde el sello de recepción
                del Evento de Contingencia.
              </li>
            </ol>
            <p className="text-base">
              Aplica a la factura, el crédito fiscal, las notas de crédito, débito y remisión, el comprobante de
              retención, la factura de exportación y la de sujeto excluido.
            </p>
          </Section>

          <Section id="normativa-2-0" title="Normativa DTE 2.0: qué cambia el 1 de diciembre de 2026">
            <p>
              El Ministerio de Hacienda publicó la versión 2.0 de la Normativa el 25 de mayo de 2026; se descarga
              en <Src s="normativa">factura.gob.sv</Src>. Según el comunicado que envió ese día a los contribuyentes:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>Si usas el Sistema de Facturación gratuito, ya tienes la 2.0.</li>
              <li>Si usas un Sistema de Transmisión, tienes hasta el 1 de diciembre de 2026; hasta esa fecha sigue valiendo la versión 1.2.</li>
            </ul>
            <h3 className="text-xl font-bold pt-2">Los cambios principales</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>Nueva estructura de los DTE y del Evento de Invalidación. Los campos que no apliquen a tu actividad se envían vacíos (null).</li>
              <li>
                En casos excepcionales, la fecha de generación puede ser hasta cinco días posterior a la de transmisión,
                sin pasar al siguiente período tributario. El ejemplo de la Normativa: si transmites el 27 de junio,
                puedes poner 28, 29 o 30 de junio, pero no el 1 de julio.
              </li>
              <li>El Código de Generación de cada DTE es un UUID versión 4.</li>
              <li>
                Nuevo Evento de Retorno: afecta facturas, facturas de exportación y de sujeto excluido sin invalidar el
                documento de origen.
              </li>
              <li>
                Nuevo Evento de Operaciones Especiales: informa operaciones autorizadas hechas con Comprobantes de
                Control Interno y Facturas de Venta Simplificadas. La Factura de Venta Simplificada no es un tipo de DTE.
              </li>
              <li>En la invalidación, hay que entregar al receptor su archivo y representación gráfica, y los plazos se amplían.</li>
            </ul>
            <p>Los eventos nuevos solo se implementan si tu operación los necesita, y se prueban antes de usarlos.</p>
          </Section>

          <Section id="soporte" title="Asistencia gratuita del Ministerio de Hacienda">
            <ul className="list-disc pl-6 space-y-2">
              <li>WhatsApp: 7073-8444, opción Facturación Electrónica.</li>
              <li>Call center: 2244-3444, opción 4.</li>
              <li>Correo: soporte.dtes@mh.gob.sv</li>
              <li>Sitio: <Src s="sistemas">factura.gob.sv</Src></li>
            </ul>
          </Section>

          <div className="mt-14 rounded-2xl bg-primary-50 dark:bg-night-900 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-2">¿Prefieres que nos encarguemos?</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-5">
              Con Apex Factura emites tus DTE desde el primer día: activamos tu cuenta, te certificamos ante el MH y
              el cambio a la Normativa 2.0 es automático.
            </p>
            <Link href="/facturacion" className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Conoce Apex Factura
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          <section className="mt-14 border-t border-gray-200 dark:border-night-800 pt-8">
            <h2 className="text-xl font-bold mb-4">Fuentes</h2>
            <ul className="space-y-2 text-base">
              {Object.entries(SOURCES).map(([key, { label, href }]) => (
                <li key={key}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={link}>{label}</a>
                </li>
              ))}
              <li className="text-gray-600 dark:text-gray-400">Comunicado del Ministerio de Hacienda a los contribuyentes, 25 de mayo de 2026.</li>
            </ul>
          </section>
        </div>
      </article>
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
