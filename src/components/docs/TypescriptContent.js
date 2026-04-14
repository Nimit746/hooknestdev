'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Badge from '@/components/Badge'
import CodeBlock from '@/components/CodeBlock'
import { ShieldCheck, FileCode2, Cpu } from 'lucide-react'

export default function TypescriptContent() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge variant="purple" className="mb-4">Advanced</Badge>
        <h1 className="text-4xl font-bold text-white mb-6">TypeScript Integration</h1>
        <p className="text-lg text-text-secondary leading-relaxed mb-12">
          HookNest is written in TypeScript and exports high-quality type definitions for every hook, ensuring your IDE provides accurate autocomplete and error checking.
        </p>

        <section className="space-y-12 mb-16">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-accent-purple" />
              Generics Support
            </h3>
            <p className="text-text-secondary mb-6">Many hooks support generics, allowing you to define exactly what type of data you expect.</p>
            <CodeBlock 
              code={`interface User {\n  name: string;\n  id: number;\n}\n\nconst [user, setUser] = useLocalStorage<User>('user_data', { name: 'Anon', id: 0 });`} 
              title="TypedHook.ts" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="p-6 bg-surface border border-border-subtle rounded-xl">
                <FileCode2 className="h-6 w-6 text-accent-purple mb-4" />
                <h4 className="text-white font-bold mb-2">Auto-import Types</h4>
                <p className="text-xs text-text-secondary">Types are automatically inferred from your usage. No manual type casting required for 90% of use cases.</p>
             </div>
             <div className="p-6 bg-surface border border-border-subtle rounded-xl">
                <Cpu className="h-6 w-6 text-accent-purple mb-4" />
                <h4 className="text-white font-bold mb-2">Narrowing</h4>
                <p className="text-xs text-text-secondary">Hook internal logic handles type narrowing for complex objects in localStorage and state.</p>
             </div>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
