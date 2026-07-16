'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { PRICING_GROUPS, EARLY_ADOPTER_NOTE } from '@/lib/pricing'
import { getSignupHref } from '@/lib/cta'

export default function Pricing() {
  const [groupId, setGroupId] = useState('erp')
  const [annual, setAnnual] = useState(false)
  const group = PRICING_GROUPS.find((g) => g.id === groupId)!

  return (
    <section id="precios" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">Planes y precios</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Elige el plan para tu negocio</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Todos los precios incluyen IVA (13%). Sin permanencia forzada.
          </p>
        </div>

        <div className="mb-6 max-w-2xl mx-auto p-4 rounded-xl bg-accent-50 dark:bg-accent-900 text-accent-800 dark:text-accent-100 text-center text-sm font-semibold">
          {EARLY_ADOPTER_NOTE}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {PRICING_GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => setGroupId(g.id)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-colors ${
                g.id === groupId
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">{group.tagline}</p>

        <div className="flex justify-center items-center gap-3 mb-12">
          <span className={`text-sm font-medium ${!annual ? 'text-primary dark:text-white' : 'text-gray-500'}`}>Mensual</span>
          <button
            role="switch"
            aria-checked={annual}
            aria-label="Cambiar a facturación anual"
            onClick={() => setAnnual(!annual)}
            className={`relative w-14 h-7 rounded-full transition-colors ${annual ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
          >
            <span className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${annual ? 'left-8' : 'left-1'}`} />
          </button>
          <span className={`text-sm font-medium ${annual ? 'text-primary dark:text-white' : 'text-gray-500'}`}>
            Anual <span className="text-accent-700 dark:text-accent-300 font-bold">(−20%)</span>
          </span>
        </div>

        <div className={`grid gap-6 max-w-6xl mx-auto ${group.plans.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
          {group.plans.map((plan) => (
            <div
              key={plan.name}
              className={`card p-6 flex flex-col ${plan.recommended ? 'ring-2 ring-accent relative' : ''}`}
            >
              {plan.recommended && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full brand-gradient text-primary text-xs font-bold uppercase tracking-wide">
                  Recomendado
                </span>
              )}
              <h3 className="text-lg font-bold mb-1 mt-1">{plan.name}</h3>
              <p className="mb-1">
                <span className="text-4xl font-extrabold text-primary dark:text-white tabular-nums">
                  {annual ? plan.annual : plan.monthly}
                </span>
                <span className="text-gray-500 text-sm">{annual ? '/año' : '/mes'}</span>
              </p>
              <p className="text-sm text-gray-500 mb-5">{plan.dtes}</p>
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Check className="w-4 h-4 text-accent-700 dark:text-accent-300 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={getSignupHref()}
                className={`text-center ${plan.recommended ? 'btn-accent' : 'btn-outline'}`}
              >
                Empezar
              </a>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-sm text-gray-500">
          ¿Necesitas más detalle?{' '}
          <a href="/ERP-Brochure-Comercial-v4.pdf" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-accent-300 font-semibold underline">
            Descarga el brochure completo (PDF)
          </a>{' '}
          con add-ons y condiciones.
        </p>
      </div>
    </section>
  )
}
