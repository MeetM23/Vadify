import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import FoundersSection from '../components/FoundersSection'

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

const approach = [
    { number: '1.', title: 'Strategy first.', desc: 'Every initiative begins with a clear understanding of your market, your customers, and your goals.' },
    { number: '2.', title: 'Creative with intent.', desc: 'Design and content built to communicate with precision — not just to look good.' },
    { number: '3.', title: 'Technology with purpose.', desc: 'We build scalable digital systems that support long-term growth — not one-off features.' },
    { number: '4.', title: 'Performance backed by data.', desc: 'Every decision is measured, tracked, and optimized for real business outcomes.' },
]

const values = [
    { title: 'Clarity', desc: 'We cut through the noise and communicate with precision and purpose.' },
    { title: 'Integrity', desc: 'Honest about what works, transparent in everything we deliver.' },
    { title: 'Impact', desc: 'We measure success by the growth of your business, not our output.' },
    { title: 'Excellence', desc: 'High standards in every pixel, every line of code, every campaign.' },
    { title: 'Collaboration', desc: 'We are your growth partner — not just a vendor.' },
    { title: 'Innovation', desc: 'Constantly evolving with the latest tools, trends, and technologies.' },
]

export default function AboutPage() {
    return (
        <div className="pt-24 bg-t-bg">
            {/* Page Header */}
            <section className="py-20 px-6" style={{ borderBottom: '1px solid var(--t-border)' }}>
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection>
                        <span className="section-tag mb-6 inline-block">About Vadify</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-t-primary tracking-tighter leading-none mb-6">
                            Who We Are
                        </h1>
                        <p className="text-t-secondary text-xl leading-relaxed max-w-2xl">
                            Vadify is not just a marketing agency.{' '}
                            <span className="text-t-primary font-medium">We are a digital growth studio.</span>
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 px-6 bg-t-bg">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <AnimatedSection>
                        <div className="space-y-6 text-t-secondary text-base leading-relaxed">
                            <p>We partner with ambitious startups to design, develop, and deploy digital experiences that drive measurable growth.</p>
                            <p>Our approach is rooted in precision. We don't believe in vanity metrics, generic campaigns, or one-size-fits-all strategies. Every project starts with deep understanding and ends with real results.</p>
                            <p className="text-t-primary font-semibold text-lg pl-5" style={{ borderLeft: '2px solid var(--t-border-solid)' }}>
                                We build systems — not campaigns.
                            </p>
                        </div>
                        <div className="mt-10">
                            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                                Contact us
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </Link>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={200}>
                        <h2 className="text-t-primary text-xl font-bold mb-8">Our Approach</h2>
                        <div className="space-y-4">
                            {approach.map((item, i) => (
                                <AnimatedSection key={item.number} delay={i * 80}
                                    className="flex gap-5 p-5 rounded-2xl transition-all duration-300 theme-card">
                                    <span className="text-t-muted text-sm font-mono font-bold pt-0.5 shrink-0 w-5">{item.number}</span>
                                    <div>
                                        <h3 className="text-t-primary font-semibold text-sm mb-1.5">{item.title}</h3>
                                        <p className="text-t-secondary text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Founders */}
            <FoundersSection />

            {/* Values */}
            <section className="py-20 px-6 bg-t-bg" style={{ borderTop: '1px solid var(--t-border)' }}>
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <span className="section-tag mb-4 inline-block">Our Values</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-t-primary tracking-tight">What drives everything we do</h2>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((value, i) => (
                            <AnimatedSection key={value.title} delay={i * 60}>
                                <div className="p-6 rounded-2xl transition-all duration-300 h-full theme-card">
                                    <h3 className="text-t-primary font-semibold text-base mb-2">{value.title}</h3>
                                    <p className="text-t-secondary text-sm leading-relaxed">{value.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-t-bg">
                <AnimatedSection>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-t-primary tracking-tight mb-6">Ready to work together?</h2>
                        <p className="text-t-secondary text-base mb-8">Start a conversation with our team and let's engineer your growth.</p>
                        <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3.5">
                            Get in touch
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </Link>
                    </div>
                </AnimatedSection>
            </section>
        </div>
    )
}
