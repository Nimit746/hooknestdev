'use client'
import React from 'react'

const Badge = ({ children, variant = 'purple', className = '' }) => {
  const variants = {
    purple: 'bg-elevated border-accent-purple/30 text-accent-glow',
    green: 'bg-success/10 border-success/30 text-success',
    outline: 'border-border-subtle text-text-secondary'
  }

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.7rem] font-medium tracking-widest uppercase ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
