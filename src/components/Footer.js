'use client'
import React from 'react'
import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'
import Button from './Button'

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border-subtle pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold tracking-tight text-white">
                hooknest<span className="text-accent-purple">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-text-secondary max-w-xs">
              Crafted for developers, by developers. Production-ready React hooks that scale with your application.
            </p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center rounded-full bg-elevated border border-border-subtle px-2 py-0.5 text-[0.7rem] font-medium text-text-secondary">
                v1.2.2
              </span>
              <span className="inline-flex items-center rounded-full bg-elevated border border-accent-purple/30 px-2 py-0.5 text-[0.7rem] font-medium text-accent-glow">
                MIT License
              </span>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Project</h4>
              <Link href="#hooks" className="text-sm text-text-secondary hover:text-white transition-colors">Hooks</Link>
              <Link href="#docs" className="text-sm text-text-secondary hover:text-white transition-colors">Documentation</Link>
              <Link href="#install" className="text-sm text-text-secondary hover:text-white transition-colors">Installation</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Community</h4>
              <a href="https://github.com/Nimit746/hooknest" target="_blank" className="text-sm text-text-secondary hover:text-white transition-colors flex items-center gap-2">
                GitHub <Github className="h-3 w-3" />
              </a>
              <a href="https://www.npmjs.com/package/hooknest" target="_blank" className="text-sm text-text-secondary hover:text-white transition-colors flex items-center gap-2">
                NPM <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Column 3: CTAs */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Connect</h4>
            <Button
              name="Star on GitHub ★"
              variant="primary"
              className="w-full"
              onClick={() => window.open('https://github.com/Nimit746/hooknest', '_blank')}
            />
            <Button
              name="View on npm"
              variant="secondary"
              className="w-full"
              onClick={() => window.open('https://www.npmjs.com/package/hooknest', '_blank')}
            />
          </div>
        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} HookNest. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-text-muted hover:text-text-secondary">Privacy Policy</Link>
            <Link href="#" className="text-xs text-text-muted hover:text-text-secondary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer