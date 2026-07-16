import Image from 'next/image'
import type { StaticImageData } from 'next/image'

interface ThemeImageProps {
  srcLight: StaticImageData
  srcDark: StaticImageData
  alt: string
  sizes: string
  priority?: boolean
  className?: string
}

// Variante light/dark según el tema activo (clase .dark de next-themes).
// Ambas se montan y CSS muestra solo la del tema — necesario porque el
// switcher manual no mueve prefers-color-scheme.
export default function ThemeImage({ srcLight, srcDark, alt, className = '', ...rest }: ThemeImageProps) {
  return (
    <>
      <Image {...rest} alt={alt} src={srcLight} className={`${className} dark:hidden`} />
      <Image {...rest} alt={alt} src={srcDark} className={`${className} hidden dark:block`} />
    </>
  )
}
