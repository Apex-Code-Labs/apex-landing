import type { ReactNode } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'

export type OrbitCard = { kind: string; name: string; detail: string; price?: string; href?: string }

type Props = {
  /** Tres golpes; el último va en turquesa. */
  title: [string, string, string]
  lede: string
  cta: { href: string; label: string; whatsapp?: boolean }
  note?: ReactNode
  trust: string[]
  /** Captura real; si el producto no tiene, `center` la reemplaza (nunca una captura de otro producto). */
  image?: StaticImageData
  imageAlt?: string
  center?: ReactNode
  /** Hasta tres: una por esquina alrededor de la captura. */
  cards: OrbitCard[]
  cardsLabel: string
}

// Posición de cada tarjeta alrededor de la captura; el delay negativo desfasa la flotación.
const CARD_SLOTS = [
  { pos: '-top-[14%] -left-[14%]', delay: '0s' },
  { pos: '-bottom-[16%] -right-[10%]', delay: '-2.5s' },
  { pos: '-bottom-[16%] -left-[14%]', delay: '-5s' },
]

/**
 * Hero navy de las páginas de producto: titular en tres golpes, CTA y fila de confianza a la izquierda;
 * a la derecha, una captura real dentro de anillos con ondas y tarjetas flotando.
 * Las ondas y la flotación son la única excepción de movimiento de DESIGN.md (siempre motion-safe).
 */
export default function OrbitHero({ title, lede, cta, note, trust, image, imageAlt = '', center, cards, cardsLabel }: Props) {
  const external = cta.whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <section className="pt-28 md:pt-40 pb-16 md:pb-28 bg-navy overflow-hidden">
      <div className="container-custom lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
        <div className="lg:col-span-7">
          <h1 className="!text-white text-[2.75rem] sm:text-6xl leading-[1.04] tracking-[-0.03em] font-extrabold">
            <span className="block">{title[0]}</span>
            <span className="block">{title[1]}</span>
            <span className="block text-accent">{title[2]}</span>
          </h1>
          <p className="mt-8 max-w-xl text-pretty text-lg md:text-xl leading-relaxed text-primary-100">{lede}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            {/* ponytail: el CTA va en turquesa sólido porque el azul primario no contrasta sobre navy */}
            <a
              href={cta.href}
              {...external}
              className="group inline-flex items-center gap-2 bg-accent hover:bg-mint text-primary-900 font-bold py-4 px-7 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              {cta.whatsapp && <MessageCircle className="w-4 h-4" aria-hidden="true" />}
              {cta.label}
              {!cta.whatsapp && (
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              )}
            </a>
            {note && <p className="text-primary-100">{note}</p>}
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-primary-100">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-mint" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: la captura en órbita, con las tarjetas flotando en las esquinas. */}
        <div className="hidden lg:block lg:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            <div className="absolute inset-0 rounded-full border-2 border-accent/70" aria-hidden="true" />
            <div className="absolute inset-[9%] rounded-full border border-white/15" aria-hidden="true" />
            {/* ponytail: el delay va inline porque el shorthand de motion-safe:animate-* pisa cualquier clase de delay */}
            {['0s', '2s', '4s'].map((delay) => (
              <div
                key={delay}
                className="absolute inset-0 rounded-full border-2 border-accent/50 opacity-0 motion-safe:animate-ripple"
                style={{ animationDelay: delay }}
                aria-hidden="true"
              />
            ))}
            {image ? (
              <div className="absolute left-1/2 top-1/2 w-[112%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl ring-1 ring-white/20 shadow-2xl shadow-black/40">
                <Image src={image} alt={imageAlt} sizes="500px" className="w-full h-auto" priority />
              </div>
            ) : (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{center}</div>
            )}
            <ul aria-label={cardsLabel}>
              {cards.slice(0, CARD_SLOTS.length).map((c, i) => (
                <li
                  key={c.name}
                  className={`absolute motion-safe:animate-float ${CARD_SLOTS[i].pos}`}
                  style={{ animationDelay: CARD_SLOTS[i].delay }}
                >
                  <Card {...c} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile: la captura y las tarjetas apiladas, sin animación. */}
        <div className="mt-12 lg:hidden">
          {image ? (
            <div className="overflow-hidden rounded-xl ring-1 ring-white/20">
              <Image src={image} alt="" sizes="100vw" className="w-full h-auto" />
            </div>
          ) : (
            center
          )}
          <ul className="mt-6 space-y-3" aria-label={cardsLabel}>
            {cards.map((c) => (
              <li key={c.name}>
                <Card {...c} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Card({ kind, name, detail, price, href }: OrbitCard) {
  const body = (
    <>
      <p className="text-xs font-semibold text-accent-700">{kind}</p>
      <p className="mt-1 font-bold leading-snug text-primary-900">{name}</p>
      <p className="text-xs text-gray-600">{detail}</p>
      {price && <p className="mt-3 text-sm font-bold text-primary tabular-nums">{price}</p>}
    </>
  )
  const cls =
    'block w-60 max-lg:w-full rounded-xl bg-white p-4 shadow-[0_-12px_48px_-12px_rgba(18,28,140,0.18)] ring-1 ring-black/5'
  return href ? (
    <a href={href} className={`${cls} transition-transform duration-200 hover:-translate-y-0.5`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  )
}
