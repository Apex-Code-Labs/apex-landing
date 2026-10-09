// CTA "Prueba gratis": cuando exista el signup público, definir
// NEXT_PUBLIC_SIGNUP_URL en Vercel y los CTAs apuntarán allí sin tocar código.
export function getSignupHref(): string {
  return process.env.NEXT_PUBLIC_SIGNUP_URL || '#contacto'
}

// Sin signup público el CTA cae en el formulario de demo: prometer "Prueba
// gratis" ahí es una promesa que la página no cumple. La etiqueta sigue a la URL.
export function getSignupLabel(): string {
  return process.env.NEXT_PUBLIC_SIGNUP_URL ? 'Prueba gratis' : 'Agenda tu demo'
}
