'use client'

import { Suspense, lazy, ComponentType } from 'react'

interface LazyLoadProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function LazyLoad({ children, fallback }: LazyLoadProps) {
  return (
    <Suspense fallback={fallback || <div className="animate-pulse bg-gray-800 rounded-lg h-32"></div>}>
      {children}
    </Suspense>
  )
}

// Lazy load components
export const LazyTestimonials = lazy(() => import('./Testimonials'))
export const LazyPricing = lazy(() => import('./Pricing'))
export const LazyFooter = lazy(() => import('./Footer'))

// Lazy load pages
export const LazyChat = lazy(() => import('../chat/page'))
export const LazyGenerateImage = lazy(() => import('../generate-image/page'))
export const LazyAccount = lazy(() => import('../account/page'))
