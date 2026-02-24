import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const WORDS = ['We', 'Build', 'Brands', 'That', 'Grow.']

export default function HeroSection() {
    const sectionRef = useRef(null)
    const wordRefs = useRef([])
    const eyebrowRef = useRef(null)
    const headlineRef = useRef(null)
    const subRef = useRef(null)
    const ctaRef = useRef(null)
    const bgRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // ── Entry animation ──────────────────────────────
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 })
            tl.fromTo(eyebrowRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
                .fromTo(
                    wordRefs.current,
                    { y: '110%' },
                    { y: '0%', stagger: 0.075, duration: 1.2 },
                    '-=0.55'
                )
                .fromTo(subRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.8')
                .fromTo(ctaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.7')

            // ── Scroll scrub ──────────────────────────────────
            gsap.to(headlineRef.current, {
                yPercent: -14,
                scale: 0.88,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '70% top',
                    scrub: 1.5,
                },
            })

            // gsap.to([subRef.current, ctaRef.current], {
            //     opacity: 0,
            //     y: -18,
            //     ease: 'none',
            //     scrollTrigger: {
            //         trigger: sectionRef.current,
            //         start: '10% top',
            //         end: '55% top',
            //         scrub: 1,
            //     },
            // })

            // gsap.to(bgRef.current, {
            //     yPercent: 25,
            //     ease: 'none',
            //     scrollTrigger: {
            //         trigger: sectionRef.current,
            //         start: 'top top',
            //         end: 'bottom top',
            //         scrub: 1,
            //     },
            // })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Grid background */}
            <div
                ref={bgRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)`,
                    backgroundSize: '70px 70px',
                }}
            />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#1E90FF]/40 to-transparent" />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle,rgba(30,144,255,0.06) 0%,transparent 70%)' }}
            />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-14 text-center">
                {/* Eyebrow */}
                <div ref={eyebrowRef} className="inline-flex items-center gap-3 mb-10 opacity-0">
                    <span className="w-7 h-px bg-[#1E90FF]" />
                    <span className="text-[#1E90FF] text-[11px] font-semibold tracking-[0.3em] uppercase">
                        Digital Growth Studio
                    </span>
                    <span className="w-7 h-px bg-[#1E90FF]" />
                </div>

                {/* Headline — manually split for slide-up */}
                <h1
                    ref={headlineRef}
                    className="font-display text-[16vw] sm:text-[12vw] md:text-[10vw] lg:text-[8.5vw] leading-[0.84] text-white uppercase tracking-[-0.02em] mb-12 mx-auto"
                >
                    {WORDS.map((w, i) => (
                        <span
                            key={i}
                            className="inline-block overflow-hidden leading-[0.9] align-top"
                            style={{ marginRight: w === 'Grow.' ? 0 : '0.18em' }}
                        >
                            <span
                                ref={(el) => { wordRefs.current[i] = el }}
                                className="inline-block"
                                style={{ transform: 'translateY(110%)' }}
                            >
                                {w}
                            </span>
                        </span>
                    ))}
                </h1>

                {/* Subtext */}
                <p ref={subRef} className="opacity-0 text-gray-400 text-base md:text-lg max-w-md mx-auto leading-relaxed mb-11">
                    Digital strategy, creative design, and cutting-edge technology — engineered for startups ready to scale.
                </p>

                {/* CTA row */}
                <div ref={ctaRef} className="opacity-0 flex items-center justify-center gap-5 flex-wrap">
                    <Link
                        to="/contact"
                        className="group inline-flex items-center gap-3 bg-[#1E90FF] text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-[#1a7de0] hover:scale-[1.04] transition-all duration-300"
                    >
                        Start Your Growth
                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 8L8 2M8 2H3M8 2v5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </Link>
                    <Link
                        to="/case-studies"
                        className="text-gray-500 text-sm font-medium hover:text-white transition-colors flex items-center gap-2"
                    >
                        View Work
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
        </section>
    )
}
