import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://thawvault.com'),
  title: {
    default: 'ThawVault - Zero-Electronics Dog Enrichment Dome',
    template: '%s | ThawVault',
  },
  description: 'Keep your dog busy for 1.5-2+ hours with the ThawVault - a 3-stage enrichment dome featuring a silicone snuffle skirt, insulated frozen lick seal, and weighted slow-release core. Zero electronics, pure engagement.',
  keywords: ['dog enrichment', 'dog toys', 'mental stimulation', 'separation anxiety', 'frozen dog treats', 'slow feeder'],
  authors: [{ name: 'ThawVault' }],
  creator: 'ThawVault',
  publisher: 'ThawVault',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thawvault.com',
    siteName: 'ThawVault',
    title: 'ThawVault - Zero-Electronics Dog Enrichment Dome',
    description: 'Keep your dog busy for 1.5-2+ hours with the ThawVault - a 3-stage enrichment dome.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ThawVault Dog Enrichment Dome',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThawVault - Zero-Electronics Dog Enrichment Dome',
    description: 'Keep your dog busy for 1.5-2+ hours with the ThawVault.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF8F5' },
    { media: '(prefers-color-scheme: dark)', color: '#1E2424' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}