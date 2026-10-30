// ponytail: cifras ilustrativas escritas completas a propósito (spec): no se calculan sumando precios con IVA.
const ROWS = [
  { when: 'Mes 1', text: 'Arrancas con el plan Esencial de Apex Factura y facturas desde el primer día.', amount: '$5.63' },
  { when: 'Mes 2', text: 'El módulo que pediste está listo y empiezas a usarlo: se suma a tu mensualidad.', amount: '+ $4.99' },
  { when: 'Desde ahí', text: 'Una sola mensualidad, con todo incluido.', amount: '$10.62' },
]

export default function GrowthExample() {
  return (
    <div className="mt-20 md:mt-24 max-w-3xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Cómo crece tu mensualidad</h3>
      <dl className="border-t border-gray-200 dark:border-night-800">
        {ROWS.map(({ when, text, amount }) => (
          <div key={when} className="grid grid-cols-[5.5rem_1fr_auto] gap-4 py-4 border-b border-gray-200 dark:border-night-800 items-baseline">
            <dt className="font-bold">{when}</dt>
            <dd className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{text}</dd>
            <dd className="font-extrabold text-primary dark:text-white tabular-nums">{amount}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        Ejemplo ilustrativo. El precio de lo que desarrollamos se cotiza según lo que tu negocio quiera agregar o personalizar, y te lo damos por escrito antes de empezar. Precios con IVA incluido.
      </p>
    </div>
  )
}
