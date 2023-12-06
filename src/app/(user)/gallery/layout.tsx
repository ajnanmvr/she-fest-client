import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tekton | Gallery',
  description: 'Deconstructing Disinformation',
  keywords: ['Tekton', 'Tekton.live', 'asas', 'dhiu', 
  'darul huda', 'ZAHRA Arts Fest',
   'dhiu rabee fest', 'rabee fest dhiu', 'Tekton23'
    , 'sibaq' , 'result portal Tekton' , 'gallery Tekton']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="w-full h-full flex">{children}</div>
 
  )
}