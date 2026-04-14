'use client'
import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

function HashHandler() {
  const lenis = useLenis()
  const pathname = usePathname()

  useEffect(() => {
    // We check window.location.hash whenever the path changes
    const hash = window.location.hash
    if (hash && lenis) {
      // Small timeout to ensure DOM transition is complete in Next.js
      const timeout = setTimeout(() => {
        const target = document.querySelector(hash)
        if (target) {
          lenis.scrollTo(target, { offset: -80, duration: 1.5 })
        }
      }, 250)
      return () => clearTimeout(timeout)
    }
  }, [pathname, lenis])

  return null
}

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <HashHandler />
      {children}
    </ReactLenis>
  )
}
