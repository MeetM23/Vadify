import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function AnimatedSection({ children, className = '', delay = 0 }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        el.style.opacity = '1'
                        el.style.transform = 'translateY(0)'
                    }, delay)
                    observer.unobserve(el)
                }
            },
            { threshold: 0.1 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [delay])
    return (
        <div ref={ref} className={className}
            style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
            {children}
        </div>
    )
}

const services = [
    {
        tag: 'Performance Marketing',
        headline: 'Growth without data is guesswork.',
        description: 'We manage and optimize paid campaigns with precision and measurable outcomes.',
        quote: 'We focus on results, not impressions.',
        items: ['Meta Ads', 'Google Ads', 'Campaign optimization', 'Performance tracking', 'Lead generation systems'],
        accent: '#4ade80',
    },
    {
        tag: 'Brand & Creative',
        headline: 'Attention is earned through clarity and creativity.',
        description: 'We design visual systems and content that communicate confidence and credibility.',
        quote: "Creative is not decoration — it's communication.",
        items: ['Graphic design', 'Social media creatives', 'Video editing', 'Brand identity support', 'Podcast shoot & edit'],
        accent: '#a78bfa',
    },
    {
        tag: 'Technology & Web',
        headline: 'Your website is your digital foundation.',
        description: 'We build fast, responsive, scalable web experiences designed to convert.',
        quote: 'Technology should support growth, not slow it down.',
        items: ['Website development', 'Landing page design', 'Conversion optimization', 'Technical setup & integrations'],
        accent: '#60a5fa',
    },
]

export default function ServicesPage() {
    return (
        <div className="pt-24 bg-t-bg">
            {/* Header */}
            <section className="py-20 px-6" style={{ borderBottom: '1px solid var(--t-border)' }}>
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection>
                        <span className="section-tag mb-6 inline-block">What We Offer</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-t-primary tracking-tighter leading-none mb-6">
                            Our services
                        </h1>
                        <p className="text-t-secondary text-lg leading-relaxed max-w-2xl">
                            Strategy, creative, and technology — three lenses through which we build scalable digital foundations for ambitious startups.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Services */}
            <section className="py-20 px-6 bg-t-bg">
                <div className="max-w-7xl mx-auto space-y-6">
                    {services.map((service, i) => (
                        <AnimatedSection key={service.tag} delay={i * 100}>
                            <div className="group rounded-3xl p-8 md:p-12 transition-all duration-300 theme-card">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    <div>
                                        <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5"
                                            style={{ color: service.accent, background: `${service.accent}18`, border: `1px solid ${service.accent}35` }}>
                                            {service.tag}
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-bold text-t-primary leading-tight tracking-tight mb-4">{service.headline}</h2>
                                        <p className="text-t-secondary text-base leading-relaxed mb-6">{service.description}</p>
                                        <p className="text-t-primary font-semibold text-base pl-4" style={{ borderLeft: `2px solid ${service.accent}` }}>
                                            {service.quote}
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-t-muted text-xs font-semibold tracking-widest uppercase mb-5">What we offer</h3>
                                        <ul className="space-y-3">
                                            {service.items.map((item) => (
                                                <li key={item} className="flex items-center gap-3 text-t-primary text-sm font-medium">
                                                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: service.accent }} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </section>

            {/* Bottom Tagline */}
            <section className="py-20 px-6 bg-t-bg" style={{ borderTop: '1px solid var(--t-border)' }}>
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="section-tag mb-6 inline-block">Design that scales startups</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-t-primary tracking-tight leading-tight">
                                At Vadify, we create digital strategies and designs that help startups grow with clarity and precision.
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-5 rounded-2xl theme-card">
                                <span className="text-xs font-bold tracking-widest uppercase text-purple-400 bg-purple-400/10 border border-purple-400/20 px-3 py-1.5 rounded-full shrink-0">
                                    Creative Edge
                                </span>
                                <p className="text-t-secondary text-sm leading-relaxed pt-1">
                                    We blend creative ideas with technology and marketing performance to deliver measurable growth results.
                                </p>
                            </div>
                            <div className="flex items-start gap-4 p-5 rounded-2xl theme-card">
                                <span className="text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1.5 rounded-full shrink-0">
                                    Growth Focus
                                </span>
                                <p className="text-t-secondary text-sm leading-relaxed pt-1">
                                    Every strategy is built with your growth as the primary objective — from awareness to conversion.
                                </p>
                            </div>
                            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 mt-2">
                                Contact us
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    )
}
