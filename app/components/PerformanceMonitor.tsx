'use client'

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log('LCP:', lastEntry.startTime)
        
        // Send to analytics if needed
        if (lastEntry.startTime > 2500) {
          console.warn('LCP is too slow:', lastEntry.startTime)
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime
          console.log('FID:', fid)
          
          if (fid > 100) {
            console.warn('FID is too slow:', fid)
          }
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            console.log('CLS:', clsValue)
            
            if (clsValue > 0.1) {
              console.warn('CLS is too high:', clsValue)
            }
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // Monitor Time to First Byte (TTFB)
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (entry.entryType === 'navigation') {
            const ttfb = entry.responseStart - entry.requestStart
            console.log('TTFB:', ttfb)
            
            if (ttfb > 600) {
              console.warn('TTFB is too slow:', ttfb)
            }
          }
        })
      })
      navigationObserver.observe({ entryTypes: ['navigation'] })
    }

    // Monitor memory usage
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory
      console.log('Memory usage:', {
        used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
        total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
      })
    }
  }, [])

  return null
}
