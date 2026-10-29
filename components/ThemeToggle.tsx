'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  // Evita hydration mismatch: el tema real solo se conoce en el cliente
  // (false en el server y en la hidratación, true después).
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false)
  if (!mounted) return <span className="inline-block w-9 h-9" aria-hidden="true" />

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

const noopSubscribe = () => () => {}
