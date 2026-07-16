# Deploy en Cloudflare (Workers + OpenNext)

La landing se despliega en **Cloudflare Workers** con el adapter oficial
`@opennextjs/cloudflare`. (Cloudflare Pages "clásico" solo se recomienda hoy
para Next.js estático; esta app tiene la API route `/api/contact`.)

## Opción A — Desde el dashboard (recomendada)

1. Cloudflare Dashboard → **Workers & Pages → Create → Import a repository**
   → seleccionar `Apex-Code-Labs/apex-landing`, rama `main`.
2. Build command: `npx opennextjs-cloudflare build`
3. Deploy command: `npx opennextjs-cloudflare deploy`
4. Configurar variables (ver abajo) y desplegar.

Cada push a `main` despliega automáticamente.

## Opción B — Desde la terminal

```bash
npx wrangler login   # una sola vez
npm run deploy
```

Preview local del worker real: `npm run preview` (sirve en localhost:8787).

## Variables de entorno

**OJO:** las `NEXT_PUBLIC_*` se inlinean en tiempo de BUILD — configurarlas
como *build variables*, no solo como secrets de runtime.

| Variable | Tipo | Notas |
|---|---|---|
| `RESEND_API_KEY` | Secret (runtime) | **Obligatoria** para el formulario. SMTP/nodemailer NO funciona en Workers; Resend es el único proveedor de email aquí. |
| `CONTACT_TO_EMAIL` | Runtime | Default: contacto@apexcodelabs.com |
| `CONTACT_FROM_EMAIL` | Runtime | Default: no-reply@apexcodelabs.com |
| `N8N_WEBHOOK_URL` | Secret (runtime) | Opcional |
| `NEXT_PUBLIC_WA_NUMBER` | Build | Default en código: 50379312064 |
| `NEXT_PUBLIC_WA_MSG` | Build | Opcional |
| `NEXT_PUBLIC_SIGNUP_URL` | Build | Definir cuando exista el registro público; los CTAs apuntarán allá. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Build | Opcional, activa Plausible. |

## Dominio

Workers & Pages → el worker `apex-landing` → **Settings → Domains & Routes**
→ agregar `apexcodelabs.com` (y `www`).

## Analytics

Se removió Vercel Analytics (solo funciona en Vercel). Opciones:
- **Cloudflare Web Analytics** (gratis): activar desde el dashboard, sin código.
- **Plausible**: definir `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (soporte ya incluido en el layout).

## Imágenes

`/_next/image` funciona vía el worker. Sin configuración extra sirve los
originales (passthrough); para optimización real (resize + WebP al vuelo),
activar **Cloudflare Images** y agregar el binding `IMAGES` en `wrangler.jsonc`:

```jsonc
"images": { "binding": "IMAGES" }
```
