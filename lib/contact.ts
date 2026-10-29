export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '50379312064'
export const WA_MESSAGE = 'Hola Apex Code Labs, quiero información.'
export const WA_MESSAGE_DEV = 'Hola Apex Code Labs, mi empresa necesita un desarrollo y quiero contarles el proyecto.'
export const WA_MESSAGE_RESTAURANT = 'Hola Apex Code Labs, quiero información sobre Apex Restaurante.'
export const CONTACT_EMAIL = 'contacto@apexcodelabs.com'

export function waLink(message = WA_MESSAGE): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}
