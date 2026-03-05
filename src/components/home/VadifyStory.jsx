import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import vadifyStoryImg from '../../assets/VadifyStory.jpeg'

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

                    {/* Left — Founder image */}
                    <div ref={imgRef} className="w-full md:w-[42%] lg:w-[38%] shrink-0">
                        <div
                            className="relative w-full rounded-2xl overflow-hidden bg-t-surface"
                            style={{
                                aspectRatio: '4/5',
                                border: '1px solid var(--t-border)',
                                boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
                            }}
                        >
                            <img
                                src={vadifyStoryImg}
                                alt="Vadify Founders"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
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
