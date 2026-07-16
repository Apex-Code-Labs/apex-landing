export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '50379312064'
export const WA_MESSAGE =
  process.env.NEXT_PUBLIC_WA_MSG || 'Hola Apex Code Labs, quiero información sobre Apex ERP.'
export const CONTACT_EMAIL = 'contacto@apexcodelabs.com'

export function waLink(): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`
}
