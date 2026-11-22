import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F5',
        teal: {
          50: '#E8F0F0',
          100: '#D1E1E1',
          200: '#A3C3C3',
          300: '#75A5A5',
          400: '#478787',
          500: '#2A6B6B',
          600: '#1B4D4E',
          700: '#153D3E',
          800: '#0F2E2E',
          900: '#0A1E1E',
          950: '#051010',
        },
        terracotta: {
          50: '#FDF3F0',
          100: '#FAE7E1',
          200: '#F5CFC3',
          300: '#EEB7A5',
          400: '#E79F87',
          500: '#E08769',
          600: '#D96B43',
          700: '#C45635',
          800: '#A0452D',
          900: '#803827',
          950: '#431D13',
        },
        charcoal: {
          50: '#F0F1F1',
          100: '#E1E3E3',
          200: '#C3C7C7',
          300: '#A5ABAB',
          400: '#878F8F',
          500: '#697373',
          600: '#4B5656',
          700: '#363F3F',
          800: '#252B2B',
          900: '#1E2424',
          950: '#101313',
        },
      },
      fontFamily: {
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [],
}
export default config