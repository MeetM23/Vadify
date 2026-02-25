import { useState, useEffect } from 'react'

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <button
            onClick={scrollUp}
            aria-label="Scroll to top"
            style={{
                position: 'fixed',
                bottom: '28px',
                right: '28px',
                zIndex: 9998,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--t-surface)',
                border: '1px solid var(--t-border-solid)',
                color: 'var(--t-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                pointerEvents: visible ? 'auto' : 'none',
                transition: 'opacity 0.3s ease, transform 0.3s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--t-primary)'
                e.currentTarget.style.color = 'var(--t-bg)'
                e.currentTarget.style.borderColor = 'var(--t-primary)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--t-surface)'
                e.currentTarget.style.color = 'var(--t-secondary)'
                e.currentTarget.style.borderColor = 'var(--t-border-solid)'
            }}
        >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    )
}
