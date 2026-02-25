import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SENTENCE = [
    { text: 'We Don\'t Run Ads.', blue: false }, { text: 'We Engineer Growth.', blue: true },
    { text: 'Creative Without Strategy', blue: false }, { text: 'Is Noise.', blue: true },
    { text: 'Structure', blue: false }, { text: 'Before Scale.', blue: true },
    // { text: 'Attention Is Earned.', blue: false }, { text: 'Not Bought.', blue: true },
    // { text: 'Scaling Brands.', blue: false }, { text: 'Not Just Campaigns.', blue: true },
    // { text: 'Conversion', blue: false }, { text: 'Is The Goal.', blue: true },
]

export default function MotionTypography() {
    const sectionRef = useRef(null)
    const wordRefs = useRef([])
useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const words = wordRefs.current

        // Initial state
        gsap.set(words, {
            opacity: 0.15,
            y: 60,
            filter: 'blur(6px)'
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=140%',   // reduced from 200%
                pin: true,
                scrub: 1,       // smoother
                anticipatePin: 1,
            },
        })

        words.forEach((word, i) => {
            tl.to(word, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                ease: 'power3.out',
                duration: 0.5,
            }, i * 0.25)  // faster stagger
        })

        // Short breathing space at end
        tl.to({}, { duration: 0.5 })

    }, sectionRef)

    return () => ctx.revert()
}, [])
    return (
        <section ref={sectionRef} className="relative bg-t-bg px-6 md:px-14 overflow-hidden">
            <div className="max-w-[1400px] mx-auto py-32 md:py-44">
                <div className="flex items-center gap-3 mb-16">
                    <span className="w-7 h-px accent-line" />
                    <span className="text-t-muted text-[10px] tracking-[0.3em] uppercase">Built on conviction</span>
                </div>
                <h2 className="font-display text-[9vw] sm:text-[7vw] md:text-[6vw] lg:text-[5.5vw] leading-[0.95] uppercase tracking-[-0.01em]">
                    {SENTENCE.map((item, i) => (
                        <span key={i} className="inline-block mr-[0.25em] mb-3">
                            <span ref={(el) => (wordRefs.current[i] = el)} className="inline-block will-change-transform"
                                style={{ color: item.blue ? 'var(--t-accent)' : 'var(--t-primary)' }}>
                                {item.text}
                            </span>
                        </span>
                    ))}
                </h2>
            </div>
        </section>
    )
}