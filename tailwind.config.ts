import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#121C8C',
          50: '#EBEDFA',
          100: '#D3D7F4',
          200: '#A7AFE9',
          300: '#7B87DE',
          400: '#4F5FD3',
          500: '#2A3BB8',
          600: '#121C8C',
          700: '#0E1670',
          800: '#0B1154',
          900: '#070B38',
          950: '#0A0F3D',
        },
        accent: {
          DEFAULT: '#13C6AB',
          50: '#E7FAF6',
          100: '#CFF5EE',
          200: '#9FEBDC',
          300: '#6FE0CB',
          400: '#3FD6B9',
          500: '#13C6AB',
          600: '#0FA38D',
          700: '#0C7F6E',
          800: '#085C4F',
          900: '#053830',
        },
        mint: {
          DEFAULT: '#96E5AC',
          100: '#EAFAEF',
          300: '#C0F0CE',
          500: '#96E5AC',
          700: '#5FCB80',
        },
        navy: '#0A0F3D',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
