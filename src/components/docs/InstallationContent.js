'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Badge from '@/components/Badge'
import CodeBlock from '@/components/CodeBlock'
import { CheckCircle2, Terminal, Zap } from 'lucide-react'

export default function InstallationContent() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge variant="purple" className="mb-4">Guides</Badge>
        <h1 className="text-4xl font-bold text-white mb-6">Installation</h1>
        <p className="text-lg text-text-secondary leading-relaxed mb-12">
          HookNest is distributed via npm and is compatible with React 16.8+ and all modern builds of Next.js and Vite.
        </p>

        <section className="space-y-8 mb-16">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-elevated text-white">
              <Terminal className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-4">1. Install Package</h3>
              <CodeBlock code="npm install hooknest" title="Terminal" />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-elevated text-white">
              <Zap className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-4">2. Core Import</h3>
              <p className="text-text-secondary mb-4">Import any hook directly into your component. All hooks are tree-shakeable.</p>
              <CodeBlock code={`import { useToggle, useDebounce } from 'hooknest';`} title="App.js" />
            </div>
          </div>
        </section>

        <div className="p-8 bg-surface border border-border-subtle rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            Why Choose HookNest?
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-text-secondary">
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent-purple rounded-full" /> Zero peer dependencies</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent-purple rounded-full" /> Full TypeScript support</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent-purple rounded-full" /> Under 2kb gzipped</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent-purple rounded-full" /> Hydration safe</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
