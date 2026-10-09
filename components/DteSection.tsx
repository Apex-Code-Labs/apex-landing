import { ShieldCheck, Clock, RefreshCw, Plug } from 'lucide-react'

const DOC_TYPES = [
  { code: '01', name: 'Factura de Consumidor Final' },
  { code: '03', name: 'Comprobante de Crédito Fiscal' },
  { code: '05', name: 'Nota de Crédito' },
  { code: '06', name: 'Nota de Débito' },
  { code: '07', name: 'Comprobante de Retención' },
  { code: '11', name: 'Factura de Exportación' },
  { code: '14', name: 'Factura de Sujeto Excluido' },
]

const FEATURES = [
  { icon: ShieldCheck, title: 'Firma digital integrada', text: 'PKCS#12, RSA-SHA256 y almacenamiento por 10 años, como exige la ley.' },
  { icon: Clock, title: 'Certificación MH automatizada', text: 'Nosotros te certificamos: los DTEs de prueba que exige el MH se generan y transmiten en horas, no semanas.' },
  { icon: RefreshCw, title: 'Modo contingencia', text: 'Si el MH no está disponible, sigues vendiendo; el sistema retransmite automáticamente.' },
  { icon: Plug, title: 'Orquestador para tu sistema', text: '¿Ya tienes tu propio software? Envíanos el JSON: firmamos, transmitimos y almacenamos por ti.' },
]

export default function DteSection() {
  return (
    <section id="facturacion" className="section-padding bg-navy text-white">
      <div className="container-custom">
        <div className="section-head">
          <h2 className="!text-white">Cumple con Hacienda sin complicaciones</h2>
          <p className="!text-gray-300">
            Integración completa con el Ministerio de Hacienda de El Salvador:
            todos los requerimientos técnicos y legales vigentes para transmitir DTEs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="font-bold !text-white">Tipos de documentos soportados</h3>
            </div>
            <ul className="divide-y divide-white/10">
              {DOC_TYPES.map(({ code, name }) => (
                <li key={code} className="px-6 py-3 flex items-center gap-4">
                  <span className="font-bold text-mint tabular-nums w-8">{code}</span>
                  <span className="text-gray-200">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid sm:grid-cols-2 gap-x-10 border-t border-white/10">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="py-6 border-b border-white/10">
                <Icon className="w-6 h-6 text-accent mb-3" aria-hidden="true" />
                <h3 className="font-bold mb-2 !text-white">{title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
