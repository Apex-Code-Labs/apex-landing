import dashboardLight from '@/public/screenshots/dashboard_light.webp'
import { ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react'
import Header from '@/components/Header'
import OrbitHero, { type OrbitCard } from '@/components/OrbitHero'
import Modules from '@/components/Modules'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { PRICING_GROUPS, ENTRY_PRICE } from '@/lib/pricing'
import { waLink } from '@/lib/contact'
import { DTE_TYPES, TRUST } from '@/lib/dte'

const [factura, erp] = PRICING_GROUPS
const PATH_CARDS: OrbitCard[] = [
  { kind: 'Facturación electrónica', name: `${factura.label} ${factura.plans[0].name}`, detail: factura.plans[0].dtes, price: `desde ${factura.plans[0].monthly}/mes`, href: '/facturacion' },
  { kind: 'Negocio completo', name: `${erp.label} ${erp.plans[0].name}`, detail: 'POS, caja e inventario', price: `desde ${erp.plans[0].monthly}/mes`, href: '/erp' },
  { kind: 'A la medida', name: 'Desarrollo de software', detail: 'Propuesta escrita con alcance y tiempos', price: 'Se cotiza en tu demo', href: '/desarrollo' },
]

const STEPS = [
  { title: 'Agenda tu demo', text: 'Por el formulario o por WhatsApp. Te mostramos el sistema en vivo, sin compromiso.' },
  { title: 'Recibe tu plan exacto', text: 'Con tus DTE al mes, usuarios y sucursales te decimos qué plan te toca y cuánto pagas, con IVA incluido.' },
  { title: 'Activamos tu cuenta', text: 'Tu sistema queda activo dentro de las 24 a 48 horas siguientes al primer pago confirmado.' },
  { title: 'Te certificamos ante el MH', text: 'Emitimos por ti los DTE de prueba que exige Hacienda: horas en lugar de semanas. Después, solo vendes.' },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      <OrbitHero
        title={['Facturas a Hacienda.', 'Vendes en tu POS.', 'Un solo precio al mes.']}
        lede="Facturación electrónica, punto de venta, inventario y caja en un solo sistema. Activamos tu cuenta y te certificamos ante el Ministerio de Hacienda; tú solo vendes."
        cta={{ href: '#contacto', label: 'Agenda tu demo de 30 minutos' }}
        note={<>Facturación desde <strong className="text-white tabular-nums">{ENTRY_PRICE}/mes</strong>, IVA incluido.</>}
        trust={TRUST}
        image={dashboardLight}
        imageAlt="Dashboard de Apex ERP con ventas del día, ritmo por hora, métodos de pago y efectivo esperado en caja"
        cards={PATH_CARDS}
        cardsLabel="Por dónde empezar"
      />

      {/* 2. Franja de prueba: en lugar de logos (no hay permiso para nombrar clientes), los DTE que emite. */}
      <section id="facturacion" aria-labelledby="dte-tipos" className="py-8 bg-white dark:bg-night-950 border-y border-gray-200 dark:border-night-800">
        <div className="container-custom lg:flex lg:items-center lg:gap-10">
          <p id="dte-tipos" className="text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0">
            Emite todos los tipos de DTE del MH
          </p>
          <ul className="mt-4 lg:mt-0 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {DTE_TYPES.map(([code, name]) => (
              <li key={code} className="flex items-baseline gap-1.5">
                <span className="font-bold text-primary dark:text-mint tabular-nums">{code}</span>
                <span className="text-gray-600 dark:text-gray-300">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Dos audiencias en paralelo, separadas por un divisor (no por cajas). */}
      <section className="section-padding bg-white dark:bg-night-950">
        <div className="container-custom grid md:grid-cols-2 md:divide-x divide-gray-200 dark:divide-night-800 border-t border-gray-200 dark:border-night-800">
          <div className="pt-10 md:pr-12">
            <h2 className="text-3xl md:text-[2.75rem] md:leading-[1.1] font-bold">¿Tienes un negocio?</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Empieza facturando con Apex Factura y suma punto de venta, inventario y caja con
              Apex ERP cuando lo necesites, sin cambiar de sistema.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/precios" className="btn-primary">Ver planes</a>
              <a href="/restaurantes" className="btn-outline">Apex Restaurante</a>
            </div>
          </div>
          <div className="pt-10 mt-10 md:mt-0 md:pl-12 border-t md:border-t-0 border-gray-200 dark:border-night-800">
            <h2 className="text-3xl md:text-[2.75rem] md:leading-[1.1] font-bold">¿Necesitas un sistema a tu medida?</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Apps, plataformas con pagos o el sistema que tu empresa vende. Lo diseñamos y lo
              construimos contigo, con una propuesta escrita de alcance y tiempos.
            </p>
            <div className="mt-8">
              <a href="/desarrollo" className="btn-outline inline-flex items-center gap-2">
                Conoce cómo trabajamos
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Catálogo (en FullPond, los roles): los módulos y el flujo «un dato, un paso». */}
      <Modules />

      {/* 6. Cómo funciona: línea de tiempo con trazo superior y el segmento turquesa de 48px. */}
      <section id="como-funciona" className="section-padding bg-white dark:bg-night-950">
        <div className="container-custom">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-end mb-12 md:mb-16">
            <h2 className="lg:col-span-6 text-3xl md:text-[2.75rem] md:leading-[1.1] font-bold">
              Todo empieza con una demo de 30 minutos
            </h2>
            <p className="mt-4 lg:mt-0 lg:col-start-8 lg:col-span-5 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Sales con el sistema visto en vivo, el plan que te toca y el precio exacto. Lo demás lo hacemos nosotros.
            </p>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative pt-6 border-t-2 border-gray-200 dark:border-night-800">
                <span className="absolute -top-0.5 left-0 h-0.5 w-12 bg-accent" aria-hidden="true" />
                <p className="text-sm font-semibold text-accent-700 dark:text-accent">Paso {i + 1}</p>
                <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Reversión de riesgo (en FullPond, la garantía de reemplazo). */}
      <section className="pb-16 md:pb-24 bg-white dark:bg-night-950">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center gap-6 p-8 md:p-10 rounded-2xl border border-accent-200 dark:border-night-700 bg-accent-50 dark:bg-night-900">
            <ShieldCheck className="w-8 h-8 shrink-0 text-accent-700 dark:text-accent" aria-hidden="true" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Sin amarres. Si te vas, te llevas tus datos.</h2>
              <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
                No hay penalización por cancelación anticipada. Al cancelar te entregamos un respaldo
                completo en formato estándar: tus datos son 100% tuyos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* 8. Cierre en navy: la promesa de la demo y las dos vías de contacto. */}
      <section className="section-padding bg-navy">
        <div className="container-custom lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          <h2 className="lg:col-span-7 !text-white text-3xl md:text-5xl md:leading-[1.1] font-extrabold">
            30 minutos. Un precio exacto. Tu sistema en vivo.
          </h2>
          <div className="mt-8 lg:mt-0 lg:col-start-9 lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <a href="#contacto" className="inline-flex items-center justify-center gap-2 bg-white text-primary hover:bg-primary-50 font-semibold py-4 px-7 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
              Agenda tu demo
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white/10 font-semibold py-3.5 px-7 rounded-lg transition-colors duration-200">
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
