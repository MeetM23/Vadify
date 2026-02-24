import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PANELS = [
    {
        num: '01',
        title: 'Performance\nMarketing',
        desc: 'Meta Ads, Google Ads, lead generation systems. We turn every rupee of ad spend into measurable pipeline growth.',
        tag: 'Performance',
        color: '#1E90FF',
    },
    {
        num: '02',
        title: 'Brand &\nCreative',
        desc: 'Visual identities, design systems, social creatives. We build brands that communicate confidence at first glance.',
        tag: 'Creative',
        color: '#ffffff',
    },
    {
        num: '03',
        title: 'Technology\n& Web',
        desc: 'Fast, conversion-optimised websites and digital systems. Technology that supports growth rather than limiting it.',
        tag: 'Technology',
        color: '#1E90FF',
    },
    {
        num: '04',
        title: "Let's build\ntogether.",
        desc: 'Ready to scale your digital presence? Talk to the Vadify team today and start your growth journey.',
        tag: 'Start Now',
        color: '#1E90FF',
        cta: true,
    },
]

export default function HorizontalScroll() {
    const containerRef = useRef(null)
    const trackRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current
            if (!track) return

            const getDistance = () => track.scrollWidth - window.innerWidth

            const st = ScrollTrigger.create({
                trigger: containerRef.current,
                pin: true,
                start: 'top top',
                end: () => `+=${getDistance()}`,
                scrub: 1,
                invalidateOnRefresh: true,
                animation: gsap.to(track, {
                    x: () => -getDistance(),
                    ease: 'none',
                }),
            })

            // Inner image parallax on each panel
            track.querySelectorAll('.h-parallax').forEach((el) => {
                gsap.to(el, {
                    xPercent: -12,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el.closest('.hpanel'),
                        containerAnimation: st.animation ?? undefined,
                        start: 'left right',
                        end: 'right left',
                        scrub: 1,
                    },
                })
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative overflow-hidden h-screen w-full bg-[#080808]">
            <div className="absolute top-8 left-6 md:left-14 z-10 flex items-center gap-3">
                <span className="w-7 h-px bg-[#1E90FF]" />
                <span className="text-gray-600 text-[10px] tracking-[0.3em] uppercase">What We Do</span>
            </div>
            <div className="absolute top-8 right-6 md:right-14 z-10 text-gray-600 text-xs font-mono tracking-widest">
                Scroll →
            </div>

            <div ref={trackRef} className="flex h-full items-stretch">
                {PANELS.map((panel, i) => (
                    <div
                        key={i}
                        className="hpanel relative flex-shrink-0 w-screen h-full flex items-end pb-16 md:pb-20 px-6 md:px-14 border-r border-white/[0.06] overflow-hidden"
                    >
                        {/* Big background number */}
                        <div className="h-parallax absolute inset-0 flex items-center justify-end pr-12 pointer-events-none select-none">
                            <span className="font-display leading-none text-white/[0.03]" style={{ fontSize: '30vw' }}>
                                {panel.num}
                            </span>
                        </div>

                        <div className="relative z-10 max-w-xl">
                            <span
                                className="inline-block text-[10px] font-semibold tracking-[0.3em] uppercase mb-5 px-3 py-1.5 rounded-full border"
                                style={{ color: panel.color, borderColor: `${panel.color}40` }}
                            >
                                {panel.tag}
                            </span>
                            <h2 className="font-display text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4.5vw] text-white uppercase tracking-tight leading-[0.9] whitespace-pre-line mb-5">
                                {panel.title}
                            </h2>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mb-8">
                                {panel.desc}
                            </p>
                            {panel.cta ? (
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-3 bg-[#1E90FF] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#1a7de0] hover:scale-[1.04] transition-all duration-300"
                                >
                                    Start Your Growth
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M2 8L8 2M8 2H3M8 2v5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            ) : (
                                <Link
                                    to="/services"
                                    className="text-gray-500 text-sm hover:text-white transition-colors flex items-center gap-2"
                                >
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
