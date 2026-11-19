// Tipos de DTE que emite Apex, con el código del MH.
export const DTE_TYPES = [
  ['01', 'Factura'],
  ['03', 'Crédito fiscal'],
  ['05', 'Nota de crédito'],
  ['06', 'Nota de débito'],
  ['07', 'Retención'],
  ['11', 'Exportación'],
  ['14', 'Sujeto excluido'],
] as const

export const TRUST = ['Activo en 24 a 48 horas', 'Certificación ante el MH incluida', 'Sin penalización por cancelar']
