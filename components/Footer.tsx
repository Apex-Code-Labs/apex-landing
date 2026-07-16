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
            <a href="/ERP-Brochure-Comercial-v4.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-mint text-sm font-medium transition-colors">
              Descargar brochure (PDF)
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
