import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function CTASection() {
    const sectionRef = useRef(null)
    const innerRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                innerRef.current,
                { y: 60, opacity: 0, scale: 0.97 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-14 bg-[#080808]">
            <div ref={innerRef} className="max-w-[1400px] mx-auto">
                <div className="relative rounded-3xl border border-white/[0.06] bg-[#0a0a0a] p-10 md:p-16 overflow-hidden">
                    {/* Blue glow blobs */}
                    <div
                        className="pointer-events-none absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full"
                        style={{ background: 'radial-gradient(circle,rgba(30,144,255,0.1) 0%,transparent 70%)' }}
                    />
                    <div
                        className="pointer-events-none absolute -bottom-24 -left-24 w-[350px] h-[350px] rounded-full"
                        style={{ background: 'radial-gradient(circle,rgba(30,144,255,0.06) 0%,transparent 70%)' }}
                    />

                    <div className="relative flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-7 h-px bg-[#1E90FF]" />
                                <span className="text-[#1E90FF] text-[11px] font-semibold tracking-[0.3em] uppercase">
                                    Ready to scale?
                                </span>
                            </div>
                            <h2 className="font-display text-[10vw] sm:text-[7vw] md:text-[6vw] lg:text-[5.5vw] leading-[0.88] text-white uppercase tracking-tight">
                                {"Let's build\n".split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
                                <span className="text-[#1E90FF]">something</span>
                                <br />great.
                            </h2>
                        </div>

                        <div className="shrink-0 flex flex-col gap-4">
                            <Link
                                to="/contact"
                                className="group inline-flex items-center gap-3 bg-[#1E90FF] text-white font-semibold text-sm px-7 py-4 rounded-full hover:bg-[#1a7de0] hover:scale-[1.04] transition-all duration-300"
                            >
                                Start Your Growth
                                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 10L10 2M10 2H4M10 2v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </Link>
                            <Link to="/case-studies" className="text-gray-500 text-sm text-center hover:text-white transition-colors underline underline-offset-4">
                                View our work first
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
