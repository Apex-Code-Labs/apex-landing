// CTA "Prueba gratis": cuando exista el signup público, definir
// NEXT_PUBLIC_SIGNUP_URL en Vercel y los CTAs apuntarán allí sin tocar código.
export function getSignupHref(): string {
  return process.env.NEXT_PUBLIC_SIGNUP_URL || '#contacto'
}
