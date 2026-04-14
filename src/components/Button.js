import React from 'react'

const Button = ({name, onClick, variant = 'primary', className = '', icon: Icon}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg px-6 py-3 text-[0.9375rem] font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
    
    const variants = {
        primary: 'bg-linear-to-br from-[#7B5CF0] to-[#A78BFA] text-white hover:brightness-110 hover:-translate-y-px hover:shadow-[0_0_24px_rgba(123,92,240,0.4)]',
        secondary: 'bg-transparent border border-[#3F3F46] text-[#F4F4F5] hover:border-[#7B5CF0] hover:text-white',
        ghost: 'text-text-secondary hover:text-white hover:bg-surface-container transition-colors'
    }

    return (
        <button 
            className={`${baseStyles} ${variants[variant]} ${className}`} 
            onClick={onClick}
        >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {name}
        </button>
    )
}

export default Button