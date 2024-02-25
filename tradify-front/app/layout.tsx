import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Rainbowkit} from '../context/rainbowkit';
import {Providers} from "./providers";



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TradifyPlatform',
  description: 'Revolutionizing Second-Hand Car Transactions Empowering Trustworthy Vehicle History Tracking and Creating a Marketplace through Blockchain and NFTs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><Rainbowkit><Providers>{children}</Providers></Rainbowkit></body>
    </html>
  )
}
