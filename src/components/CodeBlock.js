'use client'
import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useCopyToClipboard } from 'hooknest'

const CodeBlock = ({ code, language = 'javascript', title }) => {
  const { copied, copy } = useCopyToClipboard()

  return (
    <div className="relative group rounded-xl overflow-hidden border border-border-subtle bg-code-bg">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border-subtle bg-elevated/30">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{title}</span>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
        </div>
      )}
      
      <div className="relative p-4 overflow-x-auto custom-scrollbar">
        <pre className="text-sm font-mono leading-relaxed text-[#D1D1D1]">
          <code>{code}</code>
        </pre>

        <button
          onClick={() => copy(code)}
          className="absolute top-2 right-2 p-2 rounded-lg bg-elevated/80 border border-border-subtle text-text-secondary opacity-0 group-hover:opacity-100 transition-all hover:text-white hover:bg-accent-purple"
          title="Copy to clipboard"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-accent-purple/5 blur-xl pointer-events-none" />
    </div>
  )
}

export default CodeBlock
