import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PANELS = [
    { num: '01', title: 'Performance\nMarketing', desc: 'Meta Ads, Google Ads, lead generation systems. We turn every rupee of ad spend into measurable pipeline growth.', tag: 'Performance', cta: false },
    { num: '02', title: 'Brand &\nCreative', desc: 'Visual identities, design systems, social creatives. We build brands that communicate confidence at first glance.', tag: 'Creative', cta: false },
    { num: '03', title: 'Technology\n& Web', desc: 'Fast, conversion-optimised websites and digital systems. Technology that supports growth rather than limiting it.', tag: 'Technology', cta: false },
    { num: '04', title: "Let's build\ntogether.", desc: 'Ready to scale your digital presence? Talk to the Vadify team today and start your growth journey.', tag: 'Start Now', cta: true },
]

export default function HorizontalScroll() {
    const containerRef = useRef(null)
    const trackRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current
            if (!track) return
            const getDistance = () => track.scrollWidth - window.innerWidth
            ScrollTrigger.create({
                trigger: containerRef.current, pin: true, start: 'top top',
                end: () => `+=${getDistance()}`, scrub: 1, invalidateOnRefresh: true,
                animation: gsap.to(track, { x: () => -getDistance(), ease: 'none' }),
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative overflow-hidden h-screen w-full bg-t-bg">
            <div className="absolute top-8 left-6 md:left-14 z-10 flex items-center gap-3">
                <span className="w-7 h-px accent-line" />
                <span className="text-t-muted text-[10px] tracking-[0.3em] uppercase">What We Do</span>
            </div>
            <div className="absolute top-8 right-6 md:right-14 z-10 text-t-muted text-xs font-mono tracking-widest">Scroll →</div>

            <div ref={trackRef} className="flex h-full items-stretch">
                {PANELS.map((panel, i) => (
                    <div key={i} className="hpanel relative flex-shrink-0 w-screen h-full flex items-end pb-16 md:pb-20 px-6 md:px-14 overflow-hidden bg-t-bg"
                        style={{ borderRight: '1px solid var(--t-border)' }}>
                        {/* Big number background */}
                        <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none select-none">
                            <span className="font-display leading-none" style={{ fontSize: '30vw', color: 'var(--t-border)' }}>{panel.num}</span>
                        </div>
                        <div className="relative z-10 max-w-xl">
                            <span className="inline-block text-[10px] font-semibold tracking-[0.3em] uppercase mb-5 px-3 py-1.5 rounded-full text-t-accent"
                                style={{ border: '1px solid rgba(30,144,255,0.3)' }}>
                                {panel.tag}
                            </span>
                            <h2 className="font-display text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4.5vw] text-t-primary uppercase tracking-tight leading-[0.9] whitespace-pre-line mb-5">
                                {panel.title}
                            </h2>
                            <p className="text-t-secondary text-sm md:text-base leading-relaxed max-w-sm mb-8">{panel.desc}</p>
                            {panel.cta ? (
                                <Link to="/contact"
                                    className="inline-flex items-center gap-3 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.04]"
                                    style={{ background: 'var(--t-accent)' }}>
                                    Start Your Growth
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M2 8L8 2M8 2H3M8 2v5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            ) : (
                                <Link to="/services" className="text-t-muted text-sm hover:text-t-primary transition-colors flex items-center gap-2">
                                    Learn more
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
