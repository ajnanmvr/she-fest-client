import { GlobalContextProvider } from '@/context/context'
import './globals.css'
import type { Metadata } from 'next'
import { UrqlContextProvider } from '@/context/urql'

export const metadata: Metadata = {
  title: 'RMS Front',
  description: 'Created by Farrago',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
      <GlobalContextProvider >
        {children}
      </GlobalContextProvider>
        </body>
    </html>
  )
}
