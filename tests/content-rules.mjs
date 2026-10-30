import { readdirSync } from 'node:fs'
import { join } from 'node:path'

// `\b` no reconoce letras acentuadas: los límites son «no hay letra al lado».
const word = (alt) => new RegExp(`(?<![\\p{L}])(?:${alt})(?![\\p{L}])`, 'iu')

const RULES = {
  voseo: word('tenés|querés|podés|sabés|pagás|necesitás|sumás|empezás|vendés|usás|cobrás|facturás|escribinos|contanos|decinos|mirá|elegí|probá|agendá|descargá|registrate|sos'),
  cobro: word('sin instalación|sin costo de (?:instalación|implementación)|por hitos'),
  comparación: word('el único|la única'),
  cliente: word('fulanos'),
  stack: word('laravel|postgres|railway|cloudflare'),
}

export function findViolations(text) {
  const found = []
  for (const [rule, re] of Object.entries(RULES)) {
    const m = text.match(re)
    if (m) found.push(`${rule}: ${re.source} → «${m[0]}»`)
  }
  return found
}

export function sourceFiles() {
  return ['app', 'components', 'lib'].flatMap((dir) =>
    readdirSync(dir, { recursive: true })
      .filter((f) => /\.tsx?$/.test(f))
      .map((f) => join(dir, f)),
  )
}
