'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Loader from './components/ui/Loader'

const HomeContent = dynamic(() => import('./HomeContent'), { suspense: true })

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