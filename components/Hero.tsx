import Image from 'next/image'
import { getSignupHref } from '@/lib/cta'
import { waLink } from '@/lib/contact'
import { FileCheck2, Smartphone, BadgeDollarSign, MessageCircle } from 'lucide-react'

const PROPS = [
  { icon: FileCheck2, title: 'Transmisión directa al MH', text: 'DTE generado y transmitido al cobrar. Sin pasos extra.' },
  { icon: Smartphone, title: 'En cualquier dispositivo', text: 'PWA instalable en tablets y teléfonos, Android e iOS.' },
  { icon: BadgeDollarSign, title: 'Desde $5.63/mes', text: 'IVA incluido. Sin cargos ocultos ni permanencia.' },
]

export default function Hero() {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-accent-50 dark:bg-accent-900 text-accent-800 dark:text-accent-100 text-sm font-semibold">
            Facturación electrónica DTE · El Salvador
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Sistema ERP con{' '}
            <span className="text-transparent bg-clip-text brand-gradient">Facturación Electrónica</span>{' '}
            y POS
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            Gestiona tu negocio completo desde una sola plataforma: ventas, POS,
            inventario, comandas, recetas y multi-sucursal — con DTE transmitido
            directamente al Ministerio de Hacienda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
            <a href={getSignupHref()} className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
              Prueba gratis
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Hablar por WhatsApp
            </a>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl shadow-primary-100 dark:shadow-none overflow-hidden">
            <Image
              src="/screenshots/pos.png"
              alt="Punto de venta de Apex ERP con catálogo de productos y cobro con DTE"
              width={2400}
              height={1500}
              priority
              className="w-full h-auto"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
            {PROPS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg brand-gradient flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary dark:text-white mb-1">{title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
