export interface Plan {
  name: string
  monthly: string
  annual: string
  dtes: string
  recommended?: boolean
  features: string[]
}

export interface PlanGroup {
  id: string
  label: string
  tagline: string
  plans: Plan[]
}

export const EARLY_ADOPTER_NOTE =
  'Early adopter: 30% de descuento los primeros 3 meses para los primeros 50 clientes.'

export const PRICING_GROUPS: PlanGroup[] = [
  {
    id: 'dte',
    label: 'Solo Facturación (DTE)',
    tagline: 'Ideal si ya tienes un sistema de ventas y solo necesitas cumplir con Hacienda.',
    plans: [
      {
        name: 'Starter', monthly: '$5.63', annual: '$54.12', dtes: '300 DTEs/mes',
        features: ['2 usuarios', 'Todos los tipos de DTE', 'Firma digital incluida', 'Transmisión automática al MH', 'PDF profesional', 'Soporte por email'],
      },
      {
        name: 'Negocio', monthly: '$11.28', annual: '$108.36', dtes: '800 DTEs/mes', recommended: true,
        features: ['3 usuarios', 'Todo lo del Starter', 'Envío por correo electrónico', 'Dashboard de facturación', 'Modo contingencia', 'Soporte prioritario'],
      },
      {
        name: 'Profesional', monthly: '$22.58', annual: '$216.84', dtes: '2,000 DTEs/mes',
        features: ['5 usuarios', 'Todo lo del Negocio', 'Reportes avanzados', 'Anulación de DTEs', 'Multi-sucursal'],
      },
      {
        name: 'Corporativo', monthly: '$39.53', annual: '$379.56', dtes: '3,000 DTEs/mes',
        features: ['10 usuarios', 'Todo lo del Profesional', 'API de integración', 'Soporte dedicado', 'Capacitación incluida'],
      },
    ],
  },
  {
    id: 'erp',
    label: 'ERP completo',
    tagline: 'Todos los módulos + DTE incluido. La solución integral para gestionar todo tu negocio.',
    plans: [
      {
        name: 'PYME', monthly: '$16.93', annual: '$162.60', dtes: '500 DTEs/mes',
        features: ['Ventas + Inventario + DTE', '3 usuarios', '1 bodega', 'Dashboard', 'Soporte email'],
      },
      {
        name: 'Business', monthly: '$28.23', annual: '$271.08', dtes: '1,500 DTEs/mes', recommended: true,
        features: ['Todos los módulos', '8 usuarios', 'Multi-bodega', 'Reportes avanzados', 'Soporte prioritario', '1 sesión de capacitación'],
      },
      {
        name: 'Enterprise', monthly: '$56.48', annual: '$542.28', dtes: '3,000 DTEs/mes',
        features: ['Todos los módulos', '20 usuarios', 'Multi-bodega ilimitada', 'Reportes avanzados', 'Capacitación incluida', 'Soporte dedicado 24/7'],
      },
    ],
  },
  {
    id: 'orquestador',
    label: 'Transmisión DTE (Orquestador)',
    tagline: '¿Ya tienes tu propio sistema? Nosotros firmamos, transmitimos al MH y almacenamos por ti.',
    plans: [
      { name: 'Básico', monthly: '$11.28', annual: '$108.36', dtes: '300 DTEs/mes', features: ['Importación de JSON externo', 'Firma digital', 'Transmisión al MH', 'Almacenamiento 10 años'] },
      { name: 'Avanzado', monthly: '$22.58', annual: '$216.84', dtes: '1,000 DTEs/mes', recommended: true, features: ['Todo lo del Básico', 'Dashboard de estado de DTEs', 'Soporte prioritario'] },
      { name: 'Ilimitado', monthly: '$39.53', annual: '$379.56', dtes: '3,000 DTEs/mes', features: ['Todo lo del Avanzado', 'API de integración', 'Soporte dedicado'] },
    ],
  },
]
