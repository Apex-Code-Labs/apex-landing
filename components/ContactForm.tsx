'use client'

import { useState } from 'react'
import { waLink } from '@/lib/contact'

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  country: string
  service: string
  message: string
  consent: boolean
  honeypot: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    service: '',
    message: '',
    consent: false,
    honeypot: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const services = [
    'Solo Facturación Electrónica (DTE)',
    'ERP completo',
    'Transmisión DTE (Orquestador)',
    'Aún no lo sé — quiero una demo',
  ]

  const countries = [
    'El Salvador',
    'Guatemala',
    'Honduras',
    'Nicaragua',
    'Costa Rica',
    'Panamá',
    'México',
    'Estados Unidos',
    'Otro'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Honeypot check
    if (formData.honeypot) {
      return
    }

    // Basic validation
    if (!formData.name || !formData.company || !formData.email || !formData.country || !formData.service || !formData.message || !formData.consent) {
      setErrorMessage('Por favor completa todos los campos obligatorios y acepta la política de privacidad.')
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          service: formData.service,
          message: formData.message,
          honeypot: formData.honeypot
        }),
      })

      if (!response.ok) {
        throw new Error('Error al enviar el formulario')
      }

      setSubmitStatus('success')
      
      // Redirect to thank you page after a short delay
      setTimeout(() => {
        window.location.href = '/gracias'
      }, 2000)

    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <h2 className="text-3xl md:text-[2.75rem] md:leading-[1.1] font-bold text-primary dark:text-white mb-4">
              Agenda tu demo gratuita de 30 minutos
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Te mostramos el sistema en vivo y resolvemos todas tus dudas. Sin instalación y sin compromiso.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              ¿Prefieres escribirnos ahora?{' '}
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary dark:text-accent-300 underline">
                Habla con nosotros por WhatsApp
              </a>
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="card p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Empresa *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="tu@empresa.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="+503 1234-5678"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      País *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Selecciona tu país</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ¿Qué te interesa? *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Selecciona un servicio</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Cuéntanos sobre tu proyecto, necesidades específicas y objetivos..."
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600 dark:text-gray-300">
                    Acepto la{' '}
                    <a href="/politica-privacidad" className="text-primary underline">
                      política de privacidad
                    </a>{' '}
                    y autorizo el tratamiento de mis datos personales para recibir información sobre los servicios de Apex Code Labs. *
                  </label>
                </div>

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400">{errorMessage}</p>
                  </div>
                )}

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-green-600 dark:text-green-400">
                      ¡Mensaje enviado exitosamente! Te contactaremos pronto. Redirigiendo...
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
