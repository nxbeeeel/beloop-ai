'use client'

import React, { useEffect, useCallback } from 'react'

// Performance optimization utilities
export const PerformanceOptimizer = () => {
  // Preload critical resources
  useEffect(() => {
    // Preload critical fonts
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = '/fonts/inter-var.woff2'
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)

    // Preload critical images
    const preloadImages = [
      '/api/placeholder/400/300',
      '/api/placeholder/800/600'
    ]

    preloadImages.forEach(src => {
      const img = new Image()
      img.src = src
    })

    // Enable service worker for caching
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error)
    }

    // Optimize memory usage
    const cleanup = () => {
      if (window.gc) {
        window.gc()
      }
    }

    // Cleanup memory every 5 minutes
    const interval = setInterval(cleanup, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Optimize scroll performance
  const optimizeScroll = useCallback(() => {
    let ticking = false

    const updateScroll = () => {
      // Throttle scroll events
      if (!ticking) {
        requestAnimationFrame(() => {
          // Handle scroll optimizations here
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  useEffect(() => {
    optimizeScroll()
  }, [optimizeScroll])

  return null
}

// Image optimization hook
export const useImageOptimization = () => {
  const optimizeImage = useCallback((src: string, width: number, height: number) => {
    // Use Next.js Image optimization or fallback
    if (src.startsWith('/')) {
      return `${src}?w=${width}&h=${height}&q=75&format=webp`
    }
    return src
  }, [])

  return { optimizeImage }
}

// Code splitting utilities
export const lazyLoadComponent = (importFunc: () => Promise<any>) => {
  const Component = React.lazy(importFunc)
  return (props: any) => (
    <React.Suspense fallback={
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    }>
      <Component {...props} />
    </React.Suspense>
  )
}

// Cache management
export const useCache = () => {
  const setCache = useCallback((key: string, data: any, ttl: number = 300000) => {
    try {
      const item = {
        data,
        timestamp: Date.now(),
        ttl
      }
      localStorage.setItem(key, JSON.stringify(item))
    } catch (error) {
      console.warn('Cache set failed:', error)
    }
  }, [])

  const getCache = useCallback((key: string) => {
    try {
      const item = localStorage.getItem(key)
      if (!item) return null

      const { data, timestamp, ttl } = JSON.parse(item)
      if (Date.now() - timestamp > ttl) {
        localStorage.removeItem(key)
        return null
      }

      return data
    } catch (error) {
      console.warn('Cache get failed:', error)
      return null
    }
  }, [])

  const clearCache = useCallback(() => {
    try {
      localStorage.clear()
    } catch (error) {
      console.warn('Cache clear failed:', error)
    }
  }, [])

  return { setCache, getCache, clearCache }
}

// Performance monitoring
export const usePerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
        }
        if (entry.entryType === 'first-input') {
          const firstInputEntry = entry as any
          console.log('FID:', firstInputEntry.processingStart - firstInputEntry.startTime)
        }
        if (entry.entryType === 'layout-shift') {
          const layoutShiftEntry = entry as any
          console.log('CLS:', layoutShiftEntry.value)
        }
      })
    })

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })

    return () => observer.disconnect()
  }, [])
}

export default PerformanceOptimizer

