import { Link } from 'react-router-dom'
import logoSvg from '../assets/vadify-logo.png'

const NAV_COLS = [
    {
        heading: 'Company',
        links: [
            { label: 'Home', to: '/' },
            { label: 'About', to: '/about' },
            { label: 'Case Studies', to: '/case-studies' },
        ],
    },
    {
        heading: 'Services',
        links: [
            { label: 'Performance Marketing', to: '/services' },
            { label: 'Brand & Creative', to: '/services' },
            { label: 'Technology & Web', to: '/services' },
        ],
    },
    {
        heading: 'Connect',
        links: [
            { label: 'Contact Us', to: '/contact' },
            { label: 'Start a Project', to: '/contact' },
        ],
    },
]

const SOCIALS = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/vadify.in/',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/company/vadify/',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: 'X (Twitter)',
        href: 'https://x.com/vadify',
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: 'WhatsApp',
        href: 'https://wa.me/919998616511',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
        ),
    },
]

export default function Footer() {
    return (
        <footer className="bg-t-bg" style={{ borderTop: '1px solid var(--t-border)' }}>
            {/* Main grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

                    {/* Brand column — spans 2 cols on large */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <Link to="/"><img src={logoSvg} alt="Vadify" className="h-7 w-auto" /></Link>
                        <p className="text-t-secondary text-sm leading-relaxed max-w-xs">
                            Digital growth studio for startups.<br />
                            Strategy. Creative. Technology.
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-2 mt-1">
                            {SOCIALS.map((s) => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 text-t-secondary hover:text-t-accent"
                                    style={{ border: '1px solid var(--t-border-solid)' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--t-accent)' }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--t-border-solid)' }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>

                        {/* Email CTA */}
                        <a href="mailto:info@vadify.in"
                            className="inline-flex items-center gap-2 text-t-accent text-sm font-medium hover:underline underline-offset-4 transition-all mt-1">
                            info@vadify.in
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3M9.5 1.5v6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>

                    {/* Nav columns */}
                    {NAV_COLS.map((col) => (
                        <div key={col.heading}>
                            <p className="text-t-muted text-[10px] font-semibold uppercase tracking-[0.22em] mb-4">{col.heading}</p>
                            <ul className="space-y-2.5">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link to={link.to}
                                            className="text-t-secondary text-sm hover:text-t-primary transition-colors duration-200">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                    style={{ borderTop: '1px solid var(--t-border)' }}>
                    <p className="text-t-muted text-xs">
                        © {new Date().getFullYear()} Vadify. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-t-muted text-xs">Digital Growth Studio · India</span>
                        <Link to="/contact"
                            className="inline-flex items-center gap-1.5 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:opacity-85"
                            style={{ background: 'var(--t-accent)' }}>
                            Start a Project
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
