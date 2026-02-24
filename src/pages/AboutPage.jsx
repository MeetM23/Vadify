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
        <div
            ref={ref}
            className={className}
            style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
        >
            {children}
        </div>
    )
}

const approach = [
    {
        number: '1.',
        title: 'Strategy first.',
        desc: 'Every initiative begins with a clear understanding of your market, your customers, and your goals.',
    },
    {
        number: '2.',
        title: 'Creative with intent.',
        desc: 'Design and content built to communicate with precision — not just to look good.',
    },
    {
        number: '3.',
        title: 'Technology with purpose.',
        desc: 'We build scalable digital systems that support long-term growth — not one-off features.',
    },
    {
        number: '4.',
        title: 'Performance backed by data.',
        desc: 'Every decision is measured, tracked, and optimized for real business outcomes.',
    },
]

export default function AboutPage() {
    return (
        <div className="pt-24">
            {/* Page Header */}
            <section className="py-20 px-6 border-b border-white/5">
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection>
                        <span className="section-tag mb-6 inline-block">About Vadify</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-6">
                            Who We Are
                        </h1>
                        <p className="text-gray-400 text-xl leading-relaxed max-w-2xl">
                            Vadify is not just a marketing agency.{' '}
                            <span className="text-white font-medium">We are a digital growth studio.</span>
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Text */}
                    <AnimatedSection>
                        <div className="space-y-6 text-gray-400 text-base leading-relaxed">
                            <p>
                                We partner with ambitious startups to design, develop, and deploy digital experiences that drive measurable growth.
                            </p>
                            <p>
                                Our approach is rooted in precision. We don't believe in vanity metrics, generic campaigns, or one-size-fits-all strategies. Every project starts with deep understanding and ends with real results.
                            </p>
                            <p className="text-white font-semibold text-lg border-l-2 border-white/20 pl-5">
                                We build systems — not campaigns.
                            </p>
                        </div>

                        <div className="mt-10">
                            <Link to="/contact" className="btn-primary">
                                Contact us
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </AnimatedSection>

                    {/* Right: Approach List */}
                    <AnimatedSection delay={200}>
                        <h2 className="text-white text-xl font-bold mb-8">Our Approach</h2>
                        <div className="space-y-4">
                            {approach.map((item, i) => (
                                <AnimatedSection key={item.number} delay={i * 80} className="flex gap-5 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                                    <span className="text-gray-600 text-sm font-mono font-bold pt-0.5 shrink-0 w-5">{item.number}</span>
                                    <div>
                                        <h3 className="text-white font-semibold text-sm mb-1.5">{item.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <span className="section-tag mb-4 inline-block">Our Values</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            What drives everything we do
                        </h2>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Clarity', desc: 'We cut through the noise and communicate with precision and purpose.' },
                            { title: 'Integrity', desc: 'Honest about what works, transparent in everything we deliver.' },
                            { title: 'Impact', desc: 'We measure success by the growth of your business, not our output.' },
                            { title: 'Excellence', desc: 'High standards in every pixel, every line of code, every campaign.' },
                            { title: 'Collaboration', desc: 'We are your growth partner — not just a vendor.' },
                            { title: 'Innovation', desc: 'Constantly evolving with the latest tools, trends, and technologies.' },
                        ].map((value, i) => (
                            <AnimatedSection key={value.title} delay={i * 60}>
                                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 h-full">
                                    <h3 className="text-white font-semibold text-base mb-2">{value.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <AnimatedSection>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
                            Ready to work together?
                        </h2>
                        <p className="text-gray-400 text-base mb-8">
                            Start a conversation with our team and let's engineer your growth.
                        </p>
                        <Link to="/contact" className="btn-primary text-base px-8 py-3.5">
                            Get in touch
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </AnimatedSection>
            </section>
        </div>
    )
}
