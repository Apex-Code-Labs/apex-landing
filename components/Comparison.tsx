import { Check, X } from 'lucide-react'

type Cell = boolean | string

// Comparación por CATEGORÍA de solución, nunca contra proveedores nombrados:
// no le entrega al prospecto una lista de alternativas, no envejece cuando un
// competidor saca una feature, y no afirma nada refutable sobre una empresa concreta.
const COLUMNS = ['Facturadores DTE', 'POS genérico', 'Sistema contable', 'Proceso manual'] as const

const ROWS: { label: string; apex: Cell; others: [Cell, Cell, Cell, Cell] }[] = [
  { label: 'Ventas, inventario, caja y DTE en un solo sistema', apex: true, others: ['Parcial', 'Parcial', 'Parcial', false] },
  { label: 'La venta genera el DTE sin doble digitación', apex: true, others: [false, 'Vía integración', false, false] },
  { label: 'Inventario con kardex y multi-bodega', apex: true, others: ['Básico', 'Básico', 'Varía', false] },
  { label: 'Comandas, mesas y cocina', apex: true, others: [false, 'Varía', false, false] },
  { label: 'Recetas con descuento de insumos y costo real', apex: true, others: [false, 'Rara vez', false, false] },
  { label: 'Caja con arqueo, corte X y corte Z', apex: true, others: [false, true, 'Parcial', false] },
  { label: 'App instalable en tablet y teléfono (PWA)', apex: true, others: ['Web', 'Varía', false, false] },
  { label: 'Certificación ante Hacienda acompañada', apex: true, others: [false, false, false, false] },
  { label: 'Desarrollo a la medida sobre la misma plataforma', apex: true, others: [false, false, false, false] },
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
        <div className="section-head">
          <h2>Un sistema, no cuatro programas sueltos</h2>
          <p>
            La mayoría de las soluciones resuelve una parte del problema: emitir el
            documento, cobrar, o llevar la contabilidad. Apex conecta la venta, el
            inventario, la caja y el DTE en un solo flujo.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm text-center min-w-[720px]">
            <thead>
              <tr className="bg-navy text-white">
                <th className="px-4 py-4 text-left font-semibold">Característica</th>
                <th className="px-4 py-4 font-bold bg-primary">Apex ERP</th>
                {COLUMNS.map((c) => (
                  <th key={c} className="px-4 py-4 font-semibold">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {ROWS.map((row) => (
                <tr key={row.label} className="bg-white dark:bg-gray-950">
                  <td className="px-4 py-3.5 text-left font-medium text-gray-700 dark:text-gray-300">{row.label}</td>
                  <td className="px-4 py-3.5 bg-accent-50/60 dark:bg-accent-900/30"><CellValue value={row.apex} highlight /></td>
                  {row.others.map((cell, i) => (
                    <td key={COLUMNS[i]} className="px-4 py-3.5"><CellValue value={cell} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-xs text-gray-500 dark:text-gray-400 max-w-3xl">
          Comparación por categoría de solución, no contra proveedores específicos: las
          capacidades varían entre productos de una misma categoría.
        </p>
      </div>
    </section>
  )
}
