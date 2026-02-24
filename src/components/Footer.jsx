import { Link } from 'react-router-dom'
import logoSvg from '../assets/vadify-logo.png'

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Contact', path: '/contact' },
]

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#080808]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo + Tagline */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <Link to="/">
                            <img src={logoSvg} alt="Vadify" className="h-7 w-auto" />
                        </Link>
                        <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
                            Digital growth studio for startups. Strategy. Creative. Technology.
                        </p>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Divider */}
                <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-xs">
                        © {new Date().getFullYear()} Vadify. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-xs">
                        Digital Growth Studio
                    </p>
                </div>
            </div>
        </footer>
    )
}
