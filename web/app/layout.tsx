import type {Metadata, Viewport} from 'next'
import {Geist} from 'next/font/google'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-geist',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tarlo Electrical Connections — Northern Beaches Electrician',
  description:
    "Harry Betts, licensed electrician on Sydney's Northern Beaches. Switchboards, lighting, fans, smoke alarms, fault finding, rewires, hot water and EV chargers. Fixed quotes, same-day callbacks.",
}

export const viewport: Viewport = {themeColor: '#fec20e'}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en-AU" className={`js ${geist.variable}`}>
      <body>{children}</body>
    </html>
  )
}
