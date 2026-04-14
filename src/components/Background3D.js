'use client'
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function Background3D() {
  const { scrollYProgress } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const springX = useSpring(mousePosition.x, { stiffness: 50, damping: 20 })
  const springY = useSpring(mousePosition.y, { stiffness: 50, damping: 20 })

  const rotateX = useTransform(springY, [-0.5, 0.5], [20, -20])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-20, 20])
  
  // Grid movement based on scroll
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-bg">
      {/* 3D Grid Perspective */}
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          y: gridY,
          perspective: 1000,
          transformStyle: 'preserve-3d'
        }}
        className="absolute inset-x-[-20%] inset-y-[-50%] opacity-[0.07]"
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, #7B5CF0 1px, transparent 1px), linear-gradient(to bottom, #7B5CF0 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            transform: 'rotateX(60deg) scale(2)',
          }}
        />
      </motion.div>

      {/* Floating Glow Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/10 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ 
          x: [0, -60, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-glow/5 blur-[150px] rounded-full"
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </div>
  )
}
