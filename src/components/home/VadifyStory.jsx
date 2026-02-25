import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARAGRAPHS = [
    "We started Vadify because we kept seeing the same story: brands spending on ads without a system underneath. Traffic without structure. Creative without intent.",
    "We're a small team, started by two people who believed that performance is something you design — not something you hope for.",
    "Every project we take on gets the same level of thinking we'd give our own. Strategy first, then creative, then execution. In that exact order.",
    "This isn't an agency that runs playbooks. It's a studio that builds systems.",
]

export default function VadifyStory() {
    const sectionRef = useRef(null)
    const imgRef = useRef(null)
    const textRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(imgRef.current,
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } })
            gsap.fromTo(textRef.current.children,
                { y: 32, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-14 bg-t-bg">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row items-start gap-12 md:gap-20 lg:gap-28">

                    {/* Left — Placeholder founder image */}
                    <div ref={imgRef} className="w-full md:w-[42%] lg:w-[38%] shrink-0">
                        <div
                            className="relative w-full rounded-2xl overflow-hidden"
                            style={{
                                aspectRatio: '4/5',
                                background: 'var(--t-surface)',
                                border: '1px solid var(--t-border)',
                                boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
                            }}
                        >
                            {/* Stylised placeholder — two founder silhouettes */}
                            <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 gap-4">
                                {/* Background gradient */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ background: 'linear-gradient(160deg, var(--t-surface-2) 0%, var(--t-surface) 100%)' }}
                                />
                                {/* Silhouette circles */}
                                <div className="relative flex items-end justify-center gap-8 w-full px-10">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-20 h-20 rounded-full" style={{ background: 'var(--t-surface-2)', border: '2px solid var(--t-border)' }} />
                                        <div className="w-24 h-28 rounded-t-full" style={{ background: 'var(--t-surface-2)' }} />
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-20 h-20 rounded-full" style={{ background: 'var(--t-border-solid)', border: '2px solid var(--t-border)' }} />
                                        <div className="w-24 h-28 rounded-t-full" style={{ background: 'var(--t-border-solid)' }} />
                                    </div>
                                </div>
                                {/* Caption */}
                                <div className="relative text-center">
                                    <p className="text-t-muted text-[10px] tracking-[0.25em] uppercase">Meet &amp; Team</p>
                                    <p className="text-t-muted text-[9px] tracking-[0.15em] mt-0.5">Founders, Vadify</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right — Story text */}
                    <div ref={textRef} className="flex flex-col justify-center flex-1 gap-0">
                        {/* Eyebrow */}
                        <div className="flex items-center gap-3 mb-7">
                            <span className="w-7 h-px accent-line" />
                            <span className="text-t-muted text-[10px] tracking-[0.3em] uppercase">Our Story</span>
                        </div>

                        {/* Headline */}
                        <h2 className="font-display text-[9vw] sm:text-[6vw] md:text-[4.5vw] lg:text-[3.8vw] text-t-primary uppercase tracking-tight leading-[0.9] mb-10">
                            Why We Built<br />
                            <span style={{ color: 'var(--t-accent)' }}>Vadify</span>
                        </h2>

                        {/* Body paragraphs */}
                        <div className="flex flex-col gap-5">
                            {PARAGRAPHS.map((p, i) => (
                                <p key={i} className="text-t-secondary text-base md:text-[17px] leading-relaxed max-w-xl">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
