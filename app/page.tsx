'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Loader from './components/ui/Loader'

// Forzamos un pequeño delay para que el loader sea visible incluso en dev
const HomeContent = dynamic(
  () => new Promise((resolve) => setTimeout(() => resolve(import('./HomeContent')), 800)),
  { suspense: true }
)

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-sm">
          <Loader />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  )
}