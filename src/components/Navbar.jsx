import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import logoSvg from '../assets/vadify-logo.png'

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Contact', path: '/contact' },
]

// ── Sun icon ──────────────────────────────────────────────────────────────────
function SunIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
    )
}

// ── Moon icon ──────────────────────────────────────────────────────────────────
function MoonIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    )
}

// ── Theme Toggle pill ─────────────────────────────────────────────────────────
function ThemeToggle() {
    const { theme, toggle } = useTheme()
    const isDark = theme === 'dark'

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="relative flex items-center gap-1.5 rounded-full px-1 py-1 transition-all duration-300 hover:opacity-80"
            style={{
                background: 'var(--t-surface)',
                border: '1px solid var(--t-border-solid)',
                width: '56px',
                height: '28px',
            }}
        >
            {/* Sliding thumb */}
            <span
                className="absolute flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                    background: 'var(--t-accent)',
                    transform: isDark ? 'translateX(2px)' : 'translateX(26px)',
                    color: '#fff',
                }}
            >
                {isDark ? <MoonIcon /> : <SunIcon />}
            </span>
        </button>
    )
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMenuOpen(false)
    }, [location])

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
                background: scrolled ? 'rgba(var(--t-bg-rgb, 8,8,8), 0.88)' : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled ? '1px solid var(--t-border)' : '1px solid transparent',
                backgroundColor: scrolled ? 'color-mix(in srgb, var(--t-bg) 90%, transparent)' : 'transparent',
            }}
        >
            <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img src={logoSvg} alt="Vadify" className="h-7 w-auto" />
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                end={link.path === '/'}
                                className={({ isActive }) =>
                                    `px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${isActive
                                        ? 'text-t-primary'
                                        : 'text-t-secondary hover:text-t-primary'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Right group: toggle + CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:opacity-80"
                        style={{
                            background: 'var(--t-primary)',
                            color: 'var(--t-bg)',
                        }}
                    >
                        Start Project
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H3.5M9.5 2.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                {/* Mobile row */}
                <div className="flex md:hidden items-center gap-3">
                    <ThemeToggle />
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex flex-col gap-1.5 p-2"
                        aria-label="Toggle menu"
                    >
                        <span className="block h-px w-6 transition-all duration-300" style={{ background: 'var(--t-primary)', transform: menuOpen ? 'rotate(45deg) translateY(8px)' : '' }} />
                        <span className="block h-px w-6 transition-all duration-300" style={{ background: 'var(--t-primary)', opacity: menuOpen ? 0 : 1 }} />
                        <span className="block h-px w-6 transition-all duration-300" style={{ background: 'var(--t-primary)', transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : '' }} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className="md:hidden transition-all duration-300 overflow-hidden"
                style={{
                    maxHeight: menuOpen ? '320px' : '0',
                    opacity: menuOpen ? 1 : 0,
                    backgroundColor: 'color-mix(in srgb, var(--t-bg) 95%, transparent)',
                    backdropFilter: 'blur(16px)',
                    borderBottom: '1px solid var(--t-border)',
                }}
            >
                <ul className="px-6 py-4 flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                end={link.path === '/'}
                                className={({ isActive }) =>
                                    `block px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                        ? 'text-t-primary bg-t-surface'
                                        : 'text-t-secondary hover:text-t-primary hover:bg-t-surface'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                    <li className="pt-2">
                        <Link
                            to="/contact"
                            className="block text-center text-sm font-semibold px-4 py-2.5 rounded-full"
                            style={{ background: 'var(--t-primary)', color: 'var(--t-bg)' }}
                        >
                            Start Project
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}
