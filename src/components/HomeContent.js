'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  useDebounce,
  useToggle,
  useLocalStorage,
  usePrevious,
  useCopyToClipboard,
  useOnClickOutside
} from 'hooknest'
import {
  Zap,
  ShieldCheck,
  Package,
  CheckCircle2,
  Terminal,
  Plus,
  Minus
} from 'lucide-react'
import Button from '@/components/Button'
import CodeBlock from '@/components/CodeBlock'
import Badge from '@/components/Badge'

// --- Hook Demos Data ---
const HOOKS_DATA = {
  useDebounce: {
    description: "Delays updating the value until after a specified delay has elapsed since the last time it was updated.",
    params: [
      { name: 'value', type: 'any', default: '-', description: 'The value to debounce' },
      { name: 'delay', type: 'number', default: '500', description: 'Delay in milliseconds' }
    ],
    code: `const [searchTerm, setSearchTerm] = useState('');
const [debouncedValue] = useDebounce(searchTerm, 500);

return <input onChange={(e) => setSearchTerm(e.target.value)} />`,
    demo: function DebounceDemo() {
        const [val, setVal] = useState('')
        const [debounced] = useDebounce(val, 500)
        return (
            <div className="space-y-4 w-full max-w-sm">
                <input 
                    className="w-full bg-bg border border-border-subtle rounded-lg px-4 py-2 text-sm focus:border-accent-purple outline-none"
                    placeholder="Type fast..."
                    value={val}
                    onChange={e => setVal(e.target.value)}
                />
                <div className="flex items-center gap-3 text-xs">
                   <div className="px-2 py-1 rounded bg-elevated text-text-muted">Result:</div>
                   <span className="text-accent-glow font-mono">{debounced || 'Waiting...'}</span>
                </div>
            </div>
        )
    }
  },
  useLocalStorage: {
    description: "Persist state in the browser's localStorage while keeping it in sync with your component's state.",
    params: [
      { name: 'key', type: 'string', default: '-', description: 'Storage key name' },
      { name: 'initialValue', type: 'any', default: '-', description: 'Default value if key is empty' }
    ],
    code: `const [name, setName] = useLocalStorage('user-name', 'Anon');

return <input value={name} onChange={setName} />`,
    demo: function LocalStorageDemo() {
        const [text, setText] = useLocalStorage('hooknest-demo-text', '')
        return (
            <div className="space-y-4">
                <textarea 
                    className="w-full h-20 bg-bg border border-border-subtle rounded-lg px-4 py-2 text-sm focus:border-accent-purple outline-none resize-none"
                    placeholder="Note will persist through refresh..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <Button 
                    name="Reset Storage" 
                    variant="ghost" 
                    className="!py-1 !px-2 !text-[10px]" 
                    onClick={() => setText('')} 
                />
            </div>
        )
    }
  },
  useToggle: {
    description: "Simple boolean state switcher with a toggle method. Perfect for modals, menus, and switches.",
    params: [
      { name: 'initialValue', type: 'boolean', default: 'false', description: 'Starting state' }
    ],
    code: `const [isOpen, toggle] = useToggle(false);

return <button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</button>`,
    demo: function ToggleDemo() {
        const [isActive, toggle] = useToggle(false)
        return (
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                   <span className={`text-xs font-bold tracking-tighter ${isActive ? 'text-accent-glow' : 'text-text-muted'}`}>
                      {isActive ? 'PRO ACTIVATED' : 'STANDARD MODE'}
                   </span>
                   <button 
                    onClick={toggle}
                    className={`relative w-12 h-6 rounded-full transition-colors ${isActive ? 'bg-accent-purple' : 'bg-border-subtle'}`}
                   >
                     <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isActive ? 'left-7' : 'left-1'}`} />
                   </button>
                </div>
                {isActive && <div className="text-[10px] text-accent-glow/60 animate-pulse">Running at 100% capacity</div>}
            </div>
        )
    }
  },
  useOnClickOutside: {
    description: "Detect clicks outside of a specific element. Essential for closing dropdowns and modals.",
    params: [
      { name: 'ref', type: 'RefObject', default: '-', description: 'Ref of element to monitor' },
      { name: 'handler', type: 'function', default: '-', description: 'Callback on outside click' }
    ],
    code: `const ref = useRef();
useOnClickOutside(ref, () => setIsOpen(false));

return <div ref={ref}>I am inside</div>`,
    demo: function OutsideDemo() {
        const [isOpen, setIsOpen] = useState(false)
        const ref = useRef(null)
        useOnClickOutside(ref, () => setIsOpen(false))
        return (
            <div className="relative">
                <Button name="Click Me First" variant="secondary" className="w-full !py-2" onClick={() => setIsOpen(true)} />
                {isOpen && (
                    <div ref={ref} className="absolute inset-x-0 bottom-full mb-3 p-4 bg-elevated border border-accent-purple rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200 z-10">
                        <p className="text-xs text-text-primary">I'm tracking you!</p>
                        <p className="text-[10px] text-text-secondary mt-1">Click anywhere else to close me.</p>
                    </div>
                )}
            </div>
        )
    }
  },
  usePrevious: {
    description: "Get the value from the previous render. Useful for seeing which prop changed or history logic.",
    params: [
      { name: 'value', type: 'any', default: '-', description: 'The value to track' }
    ],
    code: `const [count, setCount] = useState(0);
const prevCount = usePrevious(count);

return <div>Current: {count}, Previous: {prevCount}</div>`,
    demo: function PreviousDemo() {
        const [count, setCount] = useState(0)
        const prev = usePrevious(count)
        return (
            <div className="flex items-center justify-between gap-4">
                <div className="flex gap-2">
                    <button onClick={() => setCount(c => c - 1)} className="p-2 rounded bg-elevated hover:bg-border-subtle"><Minus className="h-4 w-4"/></button>
                    <button onClick={() => setCount(c => c + 1)} className="p-2 rounded bg-elevated hover:bg-border-subtle"><Plus className="h-4 w-4"/></button>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xl font-bold font-mono text-white">{count}</span>
                    <span className="text-[10px] text-text-muted">Previous: {prev ?? 'null'}</span>
                </div>
            </div>
        )
    }
  },
  useCopyToClipboard: {
    description: "Copy any text to the clipboard with reactive status feedback and automatic cleanup.",
    params: [
      { name: 'none', type: '-', default: '-', description: 'Returns { copied: boolean, copy: (text) => void }' }
    ],
    code: `const { copied, copy } = useCopyToClipboard();

return <button onClick={() => copy('Hello!')}>{copied ? 'Copied' : 'Copy'}</button>`,
    demo: function CopyDemo() {
        const { copied, copy } = useCopyToClipboard()
        const textToCopy = 'hooknest-2026-premium-key'
        return (
            <div className="space-y-3">
                <div className="bg-bg border border-border-subtle rounded-lg px-3 py-2 text-xs font-mono text-text-secondary truncate">
                    {textToCopy}
                </div>
                <Button 
                    name={copied ? 'Copied Successfully!' : 'Copy Key'} 
                    variant={copied ? 'ghost' : 'primary'}
                    className="w-full !py-2 !text-xs"
                    onClick={() => copy(textToCopy)}
                />
            </div>
        )
    }
  }
}

export default function HomeContent() {
  const [mounted, setMounted] = useState(false)
  const [selectedHook, setSelectedHook] = useState('useDebounce')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='flex flex-col w-full'>
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Decorative 3D Floating Elements */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotateZ: [0, 5, 0],
            rotateX: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-20 w-64 h-64 bg-accent-purple/5 border border-accent-purple/20 rounded-3xl -z-10 hidden lg:block perspective-1000"
          style={{ rotateY: 25 }}
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotateZ: [0, -5, 0],
            rotateX: [0, -10, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -left-20 w-48 h-48 bg-accent-glow/5 border border-accent-glow/10 rounded-full -z-10 hidden lg:block"
        />

        {/* Blurred gradient blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-purple/15 blur-[120px] rounded-full -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center flex flex-col items-center"
        >
          <Badge variant="purple" className="mb-8">Open Source · MIT License</Badge>
          <h1 className="text-hero leading-tight text-white mb-6">
            Stop rewriting the same hooks. <br />
            Ship faster with <span className="text-gradient-purple">HookNest.</span>
          </h1>
          <p className="text-lg text-text-secondary mb-12 max-w-2xl leading-relaxed">
            6 production-ready React hooks. Zero dependencies. One install. Optimized for performance and developer experience.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button name="Get Started →" variant="primary" onClick={() => document.getElementById('hooks')?.scrollIntoView({ behavior: 'smooth'})} />
            <Button name="View on npm" variant="secondary" onClick={() => window.open('https://npmjs.com', '_blank')} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-8 py-4 bg-surface border border-border-subtle rounded-full text-sm">
             <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent-purple" /> <span className="text-white font-bold">6</span> <span className="text-text-secondary">Hooks</span></div>
             <div className="w-px h-4 bg-border-subtle hidden sm:block" />
             <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent-purple" /> <span className="text-white font-bold">0</span> <span className="text-text-secondary">Dependencies</span></div>
             <div className="w-px h-4 bg-border-subtle hidden sm:block" />
             <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent-purple" /> <span className="text-white font-bold">MIT</span> <span className="text-text-secondary">License</span></div>
             <div className="w-px h-4 bg-border-subtle hidden sm:block" />
             <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent-purple" /> <span className="text-text-secondary font-bold italic">TS</span> <span className="text-text-secondary">Ready</span></div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 w-full max-w-md perspective-1000"
          >
             <div className="hover:rotate-x-2 hover:rotate-y-2 transition-transform duration-500">
               <CodeBlock code="npm install hooknest" title="Terminal" />
             </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: WHY HOOKNEST */}
      <section className="py-24 px-6 mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <Badge variant="outline" className="w-fit">Why HookNest</Badge>
            <h2 className="text-h2 text-white">Less boilerplate. <br />More building.</h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              We've handled the repetitive logic of managing local storage, debouncing inputs, and tracking clicks so you don't have to. Built with Type-safety and Next.js hydration in mind.
            </p>
            <ul className="flex flex-col gap-4 mt-4">
               {[
                 "Fully TypeScript compatible out of the box",
                 "Optimized for 60fps interaction performance",
                 "Zero peer dependencies for smaller bundles"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-text-secondary">
                   <div className="flex-none p-0.5 rounded-full bg-success/20 text-success">
                     <CheckCircle2 className="h-4 w-4" />
                   </div>
                   {item}
                 </li>
               ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {[
               { icon: Pin, title: 'Zero Config', desc: 'Import and use immediately.' },
               { icon: Zap, title: 'Tree-shakeable', desc: 'Only bundle what you use.' },
               { icon: ShieldCheck, title: 'TS Ready', desc: 'Strict typing included.' },
               { icon: Package, title: 'Lightweight', desc: '< 2kb gzipped total size.' }
             ].map((feat, i) => (
               <div key={i} className="bg-surface border border-border-subtle p-6 rounded-2xl flex flex-col gap-4">
                  <div className="p-2 w-fit rounded-lg bg-elevated text-accent-glow">
                    <feat.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-white font-bold">{feat.title}</h3>
                  <p className="text-sm text-text-muted">{feat.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: HOOKS SHOWCASE */}
      <section id="hooks" className="py-24 px-6 mx-auto max-w-7xl w-full">
         <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar */}
            <div className="lg:w-64 flex-none space-y-8">
               <div className="flex flex-col gap-2">
                 <Badge variant="outline" className="w-fit mb-2">The Collection</Badge>
                 <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">Hook Reference</h2>
               </div>
               <nav className="flex flex-col gap-2 p-1 bg-surface border border-border-subtle rounded-xl overflow-hidden">
                  {Object.keys(HOOKS_DATA).map(hook => (
                    <button
                      key={hook}
                      onClick={() => setSelectedHook(hook)}
                      className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedHook === hook 
                        ? 'bg-elevated border-l-2 border-l-accent-purple text-white shadow-lg' 
                        : 'text-text-secondary hover:text-white hover:bg-elevated/50'
                      }`}
                    >
                      {hook}
                    </button>
                  ))}
               </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
               <AnimatePresence mode="wait">
                 {mounted && (
                   <motion.div 
                     key={selectedHook}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.3 }}
                     className="flex flex-col"
                   >
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-3xl font-bold text-white tracking-tight">{selectedHook}</h3>
                        <Badge variant="purple" className="!capitalize">Hook</Badge>
                      </div>
                      <p className="text-lg text-text-secondary mb-10 leading-relaxed">
                        {HOOKS_DATA[selectedHook].description}
                      </p>

                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
                          {/* Parameters Table */}
                          <div className="flex flex-col bg-surface border border-border-subtle rounded-xl overflow-hidden">
                             <div className="px-6 py-4 border-b border-border-subtle bg-elevated/30">
                                <span className="text-xs font-bold text-white uppercase tracking-widest">Parameters</span>
                             </div>
                             <div className="overflow-x-auto text-text-muted">
                                <table className="w-full text-left text-sm">
                                   <thead>
                                      <tr className="border-b border-border-subtle">
                                         <th className="px-6 py-3 font-medium">Name</th>
                                         <th className="px-6 py-3 font-medium">Type</th>
                                         <th className="px-6 py-3 font-medium">Default</th>
                                      </tr>
                                   </thead>
                                   <tbody>
                                      {HOOKS_DATA[selectedHook].params.map((p, i) => (
                                         <tr key={i} className="border-b border-border-subtle/50 last:border-0 hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 text-accent-glow font-mono text-xs">{p.name}</td>
                                            <td className="px-6 py-4 font-mono text-[10px]">{p.type}</td>
                                            <td className="px-6 py-4 font-mono text-[10px]">{p.default}</td>
                                         </tr>
                                      ))}
                                   </tbody>
                                </table>
                             </div>
                          </div>

                          {/* Interactive Demo */}
                          <div className="flex flex-col bg-surface border border-border-subtle rounded-xl overflow-hidden perspective-1000">
                              <div className="px-6 py-4 border-b border-border-subtle bg-elevated/30 flex justify-between items-center">
                                  <span className="text-xs font-bold text-white uppercase tracking-widest">Live Interactive Demo</span>
                                  <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                                      <span className="text-[10px] text-success font-bold uppercase">Dynamic</span>
                                  </div>
                              </div>
                              <div className="p-8 flex items-center justify-center min-h-[160px]">
                                 {React.createElement(HOOKS_DATA[selectedHook].demo, { key: selectedHook })}
                              </div>
                          </div>
                      </div>

                      <div className="space-y-4">
                         <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest px-1">Usage Snippet</h4>
                         <CodeBlock code={HOOKS_DATA[selectedHook].code} title={`${selectedHook}.js`} />
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
         </div>
      </section>

      {/* SECTION 4: INSTALLATION */}
      <section id="install" className="py-24 px-6 mx-auto max-w-3xl w-full text-center">
         <h2 className="text-h2 text-white mb-12">Get started in 30 seconds.</h2>
         <div className="space-y-12 text-left">
            <div className="flex gap-6">
                <div className="flex-none w-10 h-10 rounded-full border border-accent-purple flex items-center justify-center text-accent-purple font-mono font-bold">01</div>
                <div className="flex-1 space-y-4">
                    <h3 className="text-white font-bold text-xl">Install the package</h3>
                    <CodeBlock code="npm install hooknest" title="Terminal" />
                </div>
            </div>
            <div className="flex gap-6">
                <div className="flex-none w-10 h-10 rounded-full border border-accent-purple flex items-center justify-center text-accent-purple font-mono font-bold">02</div>
                <div className="flex-1 space-y-4">
                    <h3 className="text-white font-bold text-xl">Import and Use</h3>
                    <CodeBlock code={`import { useToggle, useDebounce } from 'hooknest';`} />
                </div>
            </div>
         </div>
         <div className="mt-20 p-6 bg-elevated/30 border border-border-subtle rounded-2xl flex items-center justify-center gap-4 text-text-secondary text-sm">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <span>Works with React 16.8+ · No peer dependencies · ESM supported</span>
         </div>
      </section>

      {/* SECTION 5: API REFERENCE */}
      <section className="py-24 px-6 mx-auto max-w-7xl w-full">
         <h2 className="text-h2 text-white mb-16 text-center">Full API Reference</h2>
         <div className="bg-surface border border-border-subtle rounded-2xl overflow-hidden shadow-2xl">
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                   <thead>
                      <tr className="bg-elevated/50 border-b border-border-subtle">
                         <th className="px-8 py-6 text-white font-bold uppercase tracking-widest text-xs">Hook</th>
                         <th className="px-8 py-6 text-white font-bold uppercase tracking-widest text-xs">Returns</th>
                         <th className="px-8 py-6 text-white font-bold uppercase tracking-widest text-xs">Description</th>
                      </tr>
                   </thead>
                   <tbody>
                      {Object.keys(HOOKS_DATA).map((hook, i) => (
                         <tr key={hook} className={`border-b border-border-subtle/50 last:border-0 ${i % 2 === 0 ? 'bg-surface' : 'bg-elevated/10'}`}>
                            <td className="px-8 py-6">
                               <Badge variant="purple">{hook}</Badge>
                            </td>
                            <td className="px-8 py-6 text-accent-glow font-mono text-xs">
                               {hook === 'useCopyToClipboard' ? '{ copied, copy }' : 'v: any'}
                            </td>
                            <td className="px-8 py-6 text-text-secondary leading-relaxed max-w-md">
                               {HOOKS_DATA[hook].description}
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
         </div>
      </section>

    </div>
  )
}

const Pin = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
)
