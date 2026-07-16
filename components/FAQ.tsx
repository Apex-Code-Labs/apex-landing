'use client'

import { useState } from 'react'
import { FAQS } from '@/lib/faqs'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Resolvemos las dudas más comunes sobre Apex ERP y la facturación electrónica
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="card overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-primary dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            ¿No encuentras la respuesta que buscas?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contacto')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="btn-primary text-lg px-8 py-4"
          >
            Contáctanos directamente
          </button>
        </div>
      </div>
    </section>
  )
}
