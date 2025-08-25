import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Beloop AI - The AI Code Editor',
  description: 'Built to make you extraordinarily productive, Beloop AI is the best way to code with AI.',
  keywords: 'AI, Code Editor, Programming, Development, Productivity, Gemini',
  authors: [{ name: 'Beloop AI Team' }],
  creator: 'Beloop AI',
  publisher: 'Beloop AI',
  robots: 'index, follow',
  openGraph: {
    title: 'Beloop AI - The AI Code Editor',
    description: 'Built to make you extraordinarily productive, Beloop AI is the best way to code with AI.',
    url: 'https://beloop-ai.com',
    siteName: 'Beloop AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Beloop AI - The AI Code Editor',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beloop AI - The AI Code Editor',
    description: 'Built to make you extraordinarily productive, Beloop AI is the best way to code with AI.',
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  )
}
