import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logoSvg from '../assets/vadify-logo.png'

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Contact', path: '/contact' },
]

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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/5'
                : 'bg-transparent'
                }`}
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
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Link
                    to="/contact"
                    className="hidden md:inline-flex items-center gap-1.5 bg-white text-black text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:bg-gray-100"
                >
                    Start Project
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 9.5L9.5 2.5M9.5 2.5H3.5M9.5 2.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    aria-label="Toggle menu"
                >
                    <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden bg-[#080808]/95 backdrop-blur-md border-b border-white/5 ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <ul className="px-6 py-4 flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                end={link.path === '/'}
                                className={({ isActive }) =>
                                    `block px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                        ? 'text-white bg-white/5'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
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
                            className="block text-center bg-white text-black text-sm font-semibold px-4 py-2.5 rounded-full"
                        >
                            Start Project
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}
