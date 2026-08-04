import Logo from './Logo'
import { CONTACT_EMAIL, waLink } from '@/lib/contact'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white">
      <div className="container-custom">
        <div className="py-12 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-5"><Logo variant="dark" /></div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Apex ERP: la plataforma salvadoreña que integra POS, inventario,
              comandas y facturación electrónica DTE con transmisión directa al
              Ministerio de Hacienda.
            </p>
            <div className="mt-6">
              <a
                href="https://linkedin.com/company/apex-code-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-gray-300 hover:text-mint transition-colors"
                aria-label="LinkedIn de Apex Code Labs"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Producto</h3>
            <ul className="space-y-2">
              <li><a href="#modulos" className="text-gray-300 hover:text-mint font-medium transition-colors">Módulos</a></li>
              <li><a href="#facturacion" className="text-gray-300 hover:text-mint font-medium transition-colors">Facturación DTE</a></li>
              <li><a href="#restaurantes" className="text-gray-300 hover:text-mint font-medium transition-colors">Restaurantes y cafés</a></li>
              <li><a href="#precios" className="text-gray-300 hover:text-mint font-medium transition-colors">Precios</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-mint font-medium transition-colors">{CONTACT_EMAIL}</a>
              </li>
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-mint font-medium transition-colors">
                  WhatsApp: +503 7931-2064
                </a>
              </li>
              <li>San Salvador, El Salvador</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© {year} Apex Code Labs. Todos los derechos reservados.</p>
          <div className="flex space-x-6">
            <a href="/politica-privacidad" className="text-gray-400 hover:text-mint text-sm font-medium transition-colors">Política de Privacidad</a>
            <a href="/ERP-Brochure-Comercial-v6.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-mint text-sm font-medium transition-colors">
              Descargar brochure (PDF)
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
