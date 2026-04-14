'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/Button'
import { Home, AlertCircle, RefreshCcw } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-purple/10 blur-[120px] rounded-full -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center flex flex-col items-center"
      >
        <div className="relative mb-8">
            <motion.h1 
                animate={{ 
                    y: [0, -10, 0],
                    rotateZ: [0, 2, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-[12rem] font-bold leading-none text-white opacity-5 tracking-tighter select-none"
            >
                404
            </motion.h1>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-5 rounded-2xl bg-surface border border-accent-purple/30 shadow-2xl shadow-accent-purple/20">
                    <AlertCircle className="h-12 w-12 text-accent-purple animate-pulse" />
                </div>
            </div>
        </div>

        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Endpoint Not Found</h2>
        <p className="text-lg text-text-secondary mb-12 max-w-md leading-relaxed">
            It seems you've wandered into an uncharted part of the nest. This hook doesn't exist... yet.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/">
                <Button name="Back to Home" variant="primary" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Back to Home
                </Button>
            </Link>
            <Button 
                name="Try Again" 
                variant="secondary" 
                className="flex items-center gap-2"
                onClick={() => window.location.reload()}
            >
                <RefreshCcw className="h-4 w-4" />
                Refresh
            </Button>
        </div>

        {/* Technical Footer */}
        <div className="mt-20 flex items-center gap-4 text-[10px] font-mono text-text-muted uppercase tracking-[0.2em]">
            <span>Error_Code: ERR_HOOK_NOT_FOUND</span>
            <div className="w-1 h-1 bg-border-subtle rounded-full" />
            <span>Status: 404_CLEAN_NEST</span>
        </div>
      </motion.div>
    </div>
  )
}