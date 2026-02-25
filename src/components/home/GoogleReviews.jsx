import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REVIEW_CARDS = [
    {
        id: 'r1',
        name: 'Neha K.',
        business: 'Bloom Organics',
        avatar: 'N',
        review: 'Vadify completely changed how we approach digital. We finally have a system, not just a campaign.',
    },
    {
        id: 'r2',
        name: 'Aryan P.',
        business: 'Krafto Studio',
        avatar: 'A',
        review: 'The creatives they produced were brand-defining. Our engagement tripled in the first month.',
    },
    {
        id: 'r3',
        name: 'Siddhi R.',
        business: 'Flourish Foods',
        avatar: 'S',
        review: 'Performance-first thinking. They never chase vanity metrics — only things that move revenue.',
    },
    {
        id: 'r4',
        name: 'Vishaal T.',
        business: 'ModFab Interiors',
        avatar: 'V',
        review: 'Working with Vadify was the best growth decision we made. Structured, fast, and measurable.',
    },
]

function Stars() {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 1L7.97 4.73H12L8.95 7.17L10.09 11L6.5 8.77L2.91 11L4.05 7.17L1 4.73H5.03L6.5 1Z"
                        fill="var(--t-accent)" />
                </svg>
            ))}
        </div>
    )
}

function GoogleBadge() {
    return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'var(--t-surface-2)', border: '1px solid var(--t-border)' }}>
            <svg width="12" height="12" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M44.5 20H24v8h11.8C34.7 33 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 2.9l6-6C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-7.9 19.7-20 0-1.3-.1-2.7-.2-4z" />
            </svg>
            <span className="text-[10px] font-bold tracking-wider uppercase text-t-muted">Verified</span>
        </div>
    )
}

export default function GoogleReviews() {
    const sectionRef = useRef(null)
    const gridRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current.querySelector('.gr-header'),
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
                }
            )

            const cards = gridRef.current.querySelectorAll('.gr-card')
            gsap.fromTo(cards,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-14 bg-t-bg overflow-hidden">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="gr-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-px bg-t-accent" />
                            <span className="text-t-accent text-[10px] tracking-[0.3em] uppercase font-bold">Client Success</span>
                        </div>
                        <h2 className="font-display text-[8vw] sm:text-[6vw] md:text-[4vw] lg:text-[3.5vw] text-t-primary uppercase tracking-tighter leading-[0.85]">
                            Feedback That<br />
                            <span className="text-t-accent italic">Fuel</span> Our Precision
                        </h2>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {REVIEW_CARDS.map((card) => (
                        <div
                            key={card.id}
                            className="gr-card p-8 rounded-3xl theme-card flex flex-col justify-between h-full group hover:border-t-accent/30 transition-colors duration-500"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <Stars />
                                    <GoogleBadge />
                                </div>
                                <p className="text-t-primary text-lg md:text-xl font-medium leading-relaxed italic">
                                    "{card.review}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mt-12 pt-6 border-t border-t-border">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-t-surface-2 text-t-accent border border-t-border">
                                    {card.avatar}
                                </div>
                                <div>
                                    <p className="text-t-primary font-bold text-sm tracking-tight">{card.name}</p>
                                    <p className="text-t-muted text-[11px] font-medium tracking-wide border border-t-border px-2 py-0.5 rounded-full mt-1 bg-t-bg-alt inline-block">
                                        {card.business}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
