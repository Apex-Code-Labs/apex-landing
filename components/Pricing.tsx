'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { PRICING_GROUPS, VERTICALES, ADDONS_NOTE, CUSTOM_PLAN_FROM } from '@/lib/pricing'
import { waLink } from '@/lib/contact'
import GrowthExample from './GrowthExample'

export default function Pricing() {
  const [groupId, setGroupId] = useState('factura')
  const [annual, setAnnual] = useState(false)
  const group = PRICING_GROUPS.find((g) => g.id === groupId)!

  return (
    <section id="precios" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="section-head">
          <h2>Elige el plan para tu negocio</h2>
          <p>
            Apex Factura si solo necesitas cumplir con Hacienda; Apex ERP si quieres
            operar el negocio completo. Precios con IVA (13%) incluido, sin
            permanencia forzada.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {PRICING_GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => setGroupId(g.id)}
              aria-pressed={g.id === groupId}
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

        <div className={`grid gap-6 mx-auto ${group.plans.length === 2 ? 'md:grid-cols-2 max-w-3xl' : 'md:grid-cols-3 max-w-6xl'}`}>
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
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-center ${plan.recommended ? 'btn-accent' : 'btn-outline'}`}
              >
                Escríbenos por WhatsApp
              </a>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-sm text-gray-500">
          ¿Más de 10,000 DTE, integraciones o más de 20 usuarios?{' '}
          <a href="#contacto" className="text-primary dark:text-accent-300 font-semibold underline underline-offset-4">
            Plan a la medida desde {CUSTOM_PLAN_FROM}/mes
          </a>
        </p>
        <p className="text-center mt-2 text-sm text-gray-500">Add-ons: {ADDONS_NOTE}</p>
        <p className="text-center mt-2 text-sm">
          <a href="/Apex-Brochure-2026-10.pdf" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-accent-300 font-semibold underline underline-offset-4">
            Descarga el brochure completo (PDF)
          </a>
        </p>

        <GrowthExample />

        <div className="mt-20 md:mt-24">
          <div className="section-head">
            <h2>Verticales para tu tipo de negocio</h2>
            <p>
              Un paquete con lo que tu rubro necesita. Es un adicional mensual: el
              precio «desde» se suma a la mensualidad de tu plan.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 border-t border-gray-200 dark:border-gray-800">
            {VERTICALES.map(({ icon: Icon, name, scope, text, price, href }) => (
              <li key={name} className="flex gap-4 py-6 border-b border-gray-200 dark:border-gray-800">
                <Icon className="w-5 h-5 mt-1 flex-shrink-0 text-accent-700 dark:text-accent-300" aria-hidden="true" />
                <div>
                  <h3 className="font-bold">
                    {href ? (
                      <a href={href} className="hover:text-primary dark:hover:text-accent-300 underline underline-offset-4">{name}</a>
                    ) : name}
                  </h3>
                  <p className="text-sm font-bold text-primary dark:text-white mt-1">
                    desde {price} <span className="font-normal text-gray-500 dark:text-gray-400">sobre tu plan</span>
                  </p>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">{scope}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-gray-600 dark:text-gray-300">
            ¿Tu rubro no aparece?{' '}
            <a href="#contacto" className="text-primary dark:text-accent-300 font-semibold underline underline-offset-4">
              Cuéntanos qué necesitas
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
