'use client'

import { useState, useEffect } from 'react'

interface Particle {
  id: number
  left: number
  top: number
  delay: number
  duration: number
}

export default function InteractiveElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Generate particles only on client
    setParticles([...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 4
    })))

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return null
  }

  return (
    <>
      {/* Floating Particles */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      {/* Mouse Trail Effect */}
      <div 
        className="fixed w-4 h-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: 'translate(-50%, -50%)',
          filter: 'blur(1px)',
          opacity: 0.6
        }}
      />
    </>
  )
}
