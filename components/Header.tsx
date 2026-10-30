'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { waLink, waMessageFor } from '@/lib/contact'

// Rutas absolutas: el Header también se monta en /restaurantes y /desarrollo.
const NAV = [
  { href: '/#facturacion', label: 'Factura' },
  { href: '/#modulos', label: 'ERP' },
  { href: '/restaurantes', label: 'Restaurante' },
  { href: '/desarrollo', label: 'Desarrollo' },
  { href: '/#precios', label: 'Precios' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-night-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-night-800">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" aria-label="Apex Code Labs — inicio">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
            <a href={waLink(waMessageFor(pathname))} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5">
              Escríbenos por WhatsApp
            </a>
          </nav>

          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-night-800" id="mobile-menu">
            <div className="flex flex-col space-y-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-left text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <a href={waLink(waMessageFor(pathname))} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="btn-primary w-full text-center">
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
