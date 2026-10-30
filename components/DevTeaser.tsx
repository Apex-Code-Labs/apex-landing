import { ArrowRight } from 'lucide-react'

export default function DevTeaser() {
  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom">
        <div className="p-8 md:p-12 rounded-2xl bg-primary text-white md:flex md:items-center md:justify-between gap-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 !text-white">También desarrollamos para otras empresas</h2>
            <p className="text-primary-100 leading-relaxed">
              Si tu empresa necesita un sistema hecho a su medida, lo diseñamos y lo construimos contigo. No pagas nada por el desarrollo; se suma a tu mensualidad cuando empiezas a usarlo.
            </p>
          </div>
          <a href="/desarrollo" className="mt-6 md:mt-0 btn-accent inline-flex items-center gap-2 flex-shrink-0">
            Conoce cómo trabajamos
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
