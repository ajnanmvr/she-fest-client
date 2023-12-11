"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../style/globals.css'
import { GlobalContextProvider } from '@/context/context'
import { withUrqlClient } from 'next-urql'
import { SERVER_URL } from '@/lib/urql'
import { cacheExchange, fetchExchange } from 'urql'

const inter = Inter({ subsets: ['latin'] })
 function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

      <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  )
}

export default withUrqlClient(() => ({
  url: SERVER_URL,
  exchanges: [fetchExchange, cacheExchange],
  fetchOptions: {
    cache: "no-cache",
    credentials: "include",
  },
}))(RootLayout);