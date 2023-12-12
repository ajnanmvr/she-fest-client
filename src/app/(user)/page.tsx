"use client";
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const roter = useRouter()
  useEffect(() => {
    roter.push('/login')
  }
  )
  return (
    <div>
    </div>
  )
}
