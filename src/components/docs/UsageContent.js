'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Badge from '@/components/Badge'
import CodeBlock from '@/components/CodeBlock'
import { Layout, MousePointer2, AlertCircle } from 'lucide-react'

export default function UsageContent() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge variant="purple" className="mb-4">Guides</Badge>
        <h1 className="text-4xl font-bold text-white mb-6">Standard Usage Patterns</h1>
        <p className="text-lg text-text-secondary leading-relaxed mb-12">
          HookNest follows a standardized return pattern for all hooks, ensuring predictable state management across your entire application.
        </p>

        <section className="space-y-12 mb-16">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Layout className="h-5 w-5 text-accent-purple" />
              Stateful Hooks
            </h3>
            <p className="text-text-secondary mb-6">Hooks like `useToggle` and `useLocalStorage` return an array containing the state and its setter/switcher.</p>
            <CodeBlock 
              code={`const [isActive, toggle] = useToggle(false);\nconst [name, setName] = useLocalStorage('user_key', 'Default');`} 
              title="StatefulPattern.js" 
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MousePointer2 className="h-5 w-5 text-accent-purple" />
              Event Listeners
            </h3>
            <p className="text-text-secondary mb-6">Event-based hooks like `useOnClickOutside` require a ref to properly track interactions.</p>
            <CodeBlock 
              code={`const modalRef = useRef(null);\nuseOnClickOutside(modalRef, () => setIsOpen(false));`} 
              title="EventPattern.js" 
            />
          </div>

          <div className="p-6 bg-accent-purple/10 border border-accent-purple/20 rounded-xl flex gap-4">
             <AlertCircle className="h-6 w-6 text-accent-purple flex-none" />
             <div>
                <h4 className="text-white font-bold mb-1 font-mono text-sm leading-none">SSR WARNING</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  When using Next.js App Router, ensure you use the "use client" directive at the top of your file to avoid hydration errors with browser-specific hooks like `useLocalStorage`.
                </p>
             </div>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
