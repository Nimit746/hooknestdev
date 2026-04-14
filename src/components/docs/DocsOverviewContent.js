'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Badge from '@/components/Badge'
import Button from '@/components/Button'
import { Book, Cpu, Shield, Zap, Terminal } from 'lucide-react'
import Link from 'next/link'

export default function DocsOverviewContent() {
  const sections = [
    {
      title: 'Getting Started',
      icon: Zap,
      desc: 'Learn how to install HookNest and integrate it into your project in minutes.',
      link: '/docs/installation'
    },
    {
      title: 'Standard Usage',
      icon: Book,
      desc: 'Explore common design patterns and best practices for our core hook collection.',
      link: '/docs/usage'
    },
    {
      title: 'TypeScript Integration',
      icon: Shield,
      desc: 'HookNest is built with strict typing. Learn how to leverage TS for better DX.',
      link: '/docs/typescript'
    },
    {
      title: 'Advanced Patterns',
      icon: Cpu,
      desc: 'SSR handling, hydration strategies, and custom configuration options.',
      link: '/docs/usage'
    }
  ]

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mb-16"
      >
        <Badge variant="purple" className="mb-4">Documentation</Badge>
        <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">Documentation Overview</h1>
        <p className="text-xl text-text-secondary leading-relaxed">
          Welcome to the HookNest technical reference. This guide covers everything from basic installation to advanced architectural patterns in React and Next.js.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-8 bg-surface border border-border-subtle rounded-2xl hover:border-accent-purple transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-elevated text-accent-purple group-hover:bg-accent-purple group-hover:text-white transition-colors">
                <section.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {section.desc}
                </p>
                <Link href={section.link}>
                  <Button name="Read More →" variant="secondary" className="!py-2 !text-xs" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Install Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-24 p-12 bg-elevated/30 border border-border-subtle rounded-3xl text-center"
      >
        <Terminal className="h-10 w-10 text-accent-purple mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">Quick Installation</h2>
        <p className="text-text-secondary mb-8">Ready to supercharge your React workflow?</p>
        <div className="bg-bg border border-border-subtle rounded-xl p-4 max-w-md mx-auto font-mono text-sm text-accent-glow">
          npm install hooknest
        </div>
      </motion.div>
    </div>
  )
}
