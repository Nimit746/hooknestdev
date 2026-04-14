'use client'
import Link from 'next/link'
import React, { useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'
import Button from './Button'
import { Menu, X } from 'lucide-react'
import { useCopyToClipboard } from 'hooknest'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { copied, copy } = useCopyToClipboard()
    const router = useRouter()
    const pathname = usePathname()
    const lenis = useLenis()

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev)
    }, [])

    const handleNavClick = (e, href) => {
        if (href.startsWith('/#')) {
            const targetId = href.replace('/#', '#')
            
            // If we are on the home page already
            if (pathname === '/') {
                e.preventDefault()
                const target = document.querySelector(targetId)
                if (target && lenis) {
                    lenis.scrollTo(target, { offset: -80, duration: 1.5 })
                    // Update URL without reloading or appending
                    window.history.pushState(null, '', targetId)
                }
            } 
            // If we are on another page, let standard Link behavior handle it,
            // but we can also force replace to avoid doubling if needed.
            // However, usually Link works fine for cross-page.
        }
        
        if (isMobileMenuOpen) toggleMobileMenu()
    }

    return (
        <header className='sticky top-0 z-50 w-full border-b border-border-subtle bg-bg/85 backdrop-blur-md'>
            <nav className='mx-auto flex max-w-7xl items-center justify-between p-4 px-6 lg:px-8' aria-label='Global'>
                <div className='flex lg:flex-1'>
                    <Link href='/' className='-m-1.5 p-1.5 flex items-center gap-3 group'>
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-border-subtle group-hover:border-accent-purple transition-all duration-300 shadow-lg">
                            <img 
                                src="/logo.png" 
                                alt="HookNest Logo" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className='text-xl font-bold tracking-tight text-white'>
                            hooknest<span className='text-accent-purple'>.</span>
                        </span>
                    </Link>
                </div>

                <div className='flex lg:hidden'>
                    <button
                        type='button'
                        className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text-secondary'
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                    </button>
                </div>

                <div className='hidden lg:flex lg:gap-x-10'>
                    <Link 
                        href='/#hooks' 
                        scroll={false} 
                        onClick={(e) => handleNavClick(e, '/#hooks')}
                        className='text-sm font-medium leading-6 text-text-secondary hover:text-white transition-colors'
                    >
                        Hooks
                    </Link>
                    <Link href='/docs' className='text-sm font-medium leading-6 text-text-secondary hover:text-white transition-colors'>Docs</Link>
                    <Link 
                        href='/#install' 
                        scroll={false} 
                        onClick={(e) => handleNavClick(e, '/#install')}
                        className='text-sm font-medium leading-6 text-text-secondary hover:text-white transition-colors'
                    >
                        Install
                    </Link>
                    <a href='https://github.com/Nimit746/hooknest' target='_blank' rel='noopener noreferrer' className='text-sm font-medium leading-6 text-text-secondary hover:text-white transition-colors'>GitHub</a>
                </div>

                <div className='hidden lg:flex lg:flex-1 lg:justify-end gap-x-4'>
                   <Button 
                    name={copied ? 'Copied!' : 'npm install hooknest'} 
                    variant="primary" 
                    className="rounded-full px-5 py-2 !text-sm"
                    onClick={() => copy('npm install hooknest')}
                   />
                </div>
            </nav>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className='lg:hidden bg-surface border-t border-border-subtle p-6 animate-in slide-in-from-top duration-300'>
                    <div className='flex flex-col gap-y-6'>
                        <Link 
                            href='/#hooks' 
                            scroll={false} 
                            onClick={(e) => handleNavClick(e, '/#hooks')}
                            className='text-lg font-medium text-text-secondary' 
                        >
                            Hooks
                        </Link>
                        <Link href='/docs' className='text-lg font-medium text-text-secondary' onClick={toggleMobileMenu}>Docs</Link>
                        <Link 
                            href='/#install' 
                            scroll={false} 
                            onClick={(e) => handleNavClick(e, '/#install')}
                            className='text-lg font-medium text-text-secondary' 
                        >
                            Install
                        </Link>
                        <div className='pt-4 flex flex-col gap-4 border-t border-border-subtle'>
                            <Button name='npm install hooknest' variant="primary" className="w-full" onClick={() => { copy('npm install hooknest'); toggleMobileMenu(); }} />
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar

