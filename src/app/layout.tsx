import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientComponent from '@/layouts/ClientComponent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'App Music PWA',
  description: 'App Music PWA with Next 14',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'nextjs13', 'next13', 'pwa', 'next-pwa'],
  // themeColor: [
  //   {
  //     media: '(prefers-color-scheme: dark)',
  //     color: '#fff',
  //   },
  // ],
  authors: [
    {
      name: 'Douglas Oliveira',
    },
    {
      name: 'Douglas Oliveira',
      url: '',
    },
  ],
  // viewport:
  //   'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/icon-192x192.png',
    },
    {
      rel: 'icon',
      url: '/icon-192x192.png',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientComponent>{children}</ClientComponent>
      </body>
    </html>
  )
}
