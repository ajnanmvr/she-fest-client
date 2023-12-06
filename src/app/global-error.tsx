'use client'

import ErrorPage from "@/components/Error"

 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <>
    <ErrorPage/>
    </>
  )
}