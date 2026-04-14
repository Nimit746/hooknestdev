'use client'
import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const HookCard = ({ title, icon: Icon, description, children, status = 'v1.0.2' }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="flex flex-col h-full rounded-xl bg-surface border border-border-subtle border-l-2 border-l-accent-purple p-6 transition-all duration-200 hover:border-accent-purple group perspective-1000"
    >
      <div style={{ transform: 'translateZ(50px)' }} className="flex flex-col h-full pointer-events-none">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-x-3">
            <div className="rounded-lg bg-elevated p-2 text-accent-purple group-hover:bg-accent-purple group-hover:text-white transition-colors">
              {Icon && <Icon className="h-6 w-6" />}
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-text-primary capitalize">{title}</h3>
          </div>
          <span className="inline-flex items-center rounded-full bg-elevated border border-accent-purple px-2.5 py-0.5 text-[0.7rem] font-medium text-accent-glow tracking-widest uppercase">
            {status}
          </span>
        </div>
        
        <p className="text-sm leading-relaxed text-text-secondary mb-6 flex-grow">
          {description}
        </p>

        <div className="mt-auto pt-4 border-t border-border-subtle/50">
          <div className="bg-elevated/50 rounded-xl p-4 min-h-[120px] flex flex-col justify-center border border-border-subtle/30 pointer-events-auto">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HookCard
