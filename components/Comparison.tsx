import { Check, X } from 'lucide-react'

type Cell = boolean | string

const ROWS: { label: string; apex: Cell; facxi: Cell; n1co: Cell; acatha: Cell; facturaya: Cell }[] = [
  { label: 'Precio desde', apex: '$5.63/mes', facxi: '$4.99/mes', n1co: '$15/mes', acatha: '$250/año', facturaya: '$5.90/mes' },
  { label: 'ERP integrado', apex: true, facxi: 'Parcial', n1co: false, acatha: 'Parcial', facturaya: false },
  { label: 'Ventas integradas con DTE', apex: true, facxi: false, n1co: false, acatha: false, facturaya: false },
  { label: 'Comandas, mesas y cocina', apex: true, facxi: false, n1co: false, acatha: false, facturaya: false },
  { label: 'Recetas con descuento de insumos', apex: true, facxi: false, n1co: false, acatha: false, facturaya: false },
  { label: 'Caja registradora con corte X/Z', apex: true, facxi: false, n1co: false, acatha: 'Parcial', facturaya: false },
  { label: 'App móvil PWA (iOS + Android)', apex: true, facxi: 'Web', n1co: true, acatha: false, facturaya: 'Web' },
  { label: 'Certificación MH automática', apex: true, facxi: false, n1co: false, acatha: false, facturaya: false },
]

function CellValue({ value, highlight = false }: { value: Cell; highlight?: boolean }) {
  if (value === true) return <Check className={`w-5 h-5 mx-auto ${highlight ? 'text-accent-700 dark:text-accent-300' : 'text-gray-400'}`} aria-label="Sí" />
  if (value === false) return <X className="w-5 h-5 mx-auto text-red-500" aria-label="No" />
  return <span className={highlight ? 'font-bold text-primary dark:text-white' : 'text-gray-600 dark:text-gray-400'}>{value}</span>
}

export default function Comparison() {
  return (
    <section id="comparativa" className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">¿Por qué elegirnos?</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comparativa con otras soluciones</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Somos el único sistema salvadoreño que integra nativamente las ventas
            con la facturación electrónica.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm text-center min-w-[720px]">
            <thead>
              <tr className="bg-navy text-white">
                <th className="px-4 py-4 text-left font-semibold">Característica</th>
                <th className="px-4 py-4 font-bold bg-primary">Apex ERP</th>
                <th className="px-4 py-4 font-semibold">Facxi</th>
                <th className="px-4 py-4 font-semibold">N1co</th>
                <th className="px-4 py-4 font-semibold">Acatha</th>
                <th className="px-4 py-4 font-semibold">FacturaYa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {ROWS.map((row) => (
                <tr key={row.label} className="bg-white dark:bg-gray-950">
                  <td className="px-4 py-3.5 text-left font-medium text-gray-700 dark:text-gray-300">{row.label}</td>
                  <td className="px-4 py-3.5 bg-accent-50/60 dark:bg-accent-900/30"><CellValue value={row.apex} highlight /></td>
                  <td className="px-4 py-3.5"><CellValue value={row.facxi} /></td>
                  <td className="px-4 py-3.5"><CellValue value={row.n1co} /></td>
                  <td className="px-4 py-3.5"><CellValue value={row.acatha} /></td>
                  <td className="px-4 py-3.5"><CellValue value={row.facturaya} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
