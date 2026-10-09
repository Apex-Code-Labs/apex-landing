import { ChevronDown } from 'lucide-react'
import { FAQS } from '@/lib/faqs'

export default function FAQ() {
  return (
    <section id="faq" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom grid lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 className="text-3xl md:text-[2.75rem] md:leading-[1.1] font-bold mb-4">Preguntas frecuentes</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Resolvemos las dudas más comunes sobre Apex ERP y la facturación electrónica.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            ¿No encuentras la respuesta que buscas?{' '}
            <a href="#contacto" className="font-semibold text-primary dark:text-accent-300 underline">
              Contáctanos directamente
            </a>
          </p>
        </div>

        <div className="lg:col-span-8 border-t border-gray-200 dark:border-gray-800">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group border-b border-gray-200 dark:border-gray-800">
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg font-semibold text-primary dark:text-white">{faq.question}</h3>
                <ChevronDown className="w-5 h-5 flex-shrink-0 text-gray-500 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="pb-6 pr-9 text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
