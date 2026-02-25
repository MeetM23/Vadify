import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PHASES = [
    {
        label: '01 — Strategy', headline: 'We think\nbefore we build.',
        body: 'Every pixel, every word, every conversion path starts with clear strategic intent. We map opportunities before we create solutions.',
        accent: 'Strategy is our foundation.'
    },
    {
        label: '02 — Creative', headline: 'Design that\ndemands attention.',
        body: 'Visual systems built to communicate trust, confidence, and intent at a glance. Creative is not decoration — it is communication.',
        accent: 'Creative drives decision.'
    },
    {
        label: '03 — Technology', headline: 'Systems built\nto scale.',
        body: 'Fast, precise, reliable digital infrastructure that grows with your ambitions. Technology should support growth, not limit it.',
        accent: 'Built for your future.'
    },
]

export default function PinnedStory() {
    const wrapRef = useRef(null)
    const panelRefs = useRef([])
    const counterRef = useRef(null)
    const progressBarRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panels = panelRefs.current
            gsap.set(panels, { opacity: 0, y: 40 })
            gsap.set(panels[0], { opacity: 1, y: 0 })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapRef.current, pin: true, start: 'top top', end: '+=150%', scrub: 1,
                    onUpdate: (self) => {
                        if (counterRef.current) {
                            const idx = Math.min(Math.floor(self.progress * 3), 2)
                            counterRef.current.textContent = `0${idx + 1} / 03`
                        }
                        if (progressBarRef.current) gsap.set(progressBarRef.current, { scaleX: self.progress })
                    },
                },
            })
            tl.to(panels[0], { opacity: 0, y: -40, ease: 'power2.inOut' })
            tl.to(panels[1], { opacity: 1, y: 0, ease: 'power2.inOut' }, '<')
            tl.to(panels[1], { opacity: 0, y: -40, ease: 'power2.inOut' })
            tl.to(panels[2], { opacity: 1, y: 0, ease: 'power2.inOut' }, '<')
        }, wrapRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={wrapRef} className="relative h-screen w-full overflow-hidden bg-t-bg flex items-center justify-center">
            <div className="absolute right-8 md:right-16 bottom-8 z-0 pointer-events-none">
                <span className="font-display text-[25vw] leading-none select-none" style={{ color: 'var(--t-border)' }}>✦</span>
            </div>
            <div className="absolute top-8 left-6 md:left-14 flex items-center gap-3">
                <span className="w-7 h-px accent-line" />
                <span className="text-t-muted text-[10px] tracking-[0.3em] uppercase font-medium">Our Process</span>
            </div>
            <div className="absolute bottom-0 inset-x-0 h-[2px]" style={{ background: 'var(--t-border)' }}>
                <div ref={progressBarRef} className="h-full origin-left" style={{ background: 'var(--t-accent)', transform: 'scaleX(0)' }} />
            </div>
            <div ref={counterRef} className="absolute top-8 right-6 md:right-14 text-t-muted text-xs font-mono tracking-widest">01 / 03</div>

            <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 md:px-14">
                {PHASES.map((phase, i) => (
                    <div key={i} ref={(el) => { panelRefs.current[i] = el }}
                        className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-0"
                        style={{ opacity: i === 0 ? 1 : 0 }}>
                        <span className="text-t-accent text-[11px] font-semibold tracking-[0.28em] uppercase mb-6">{phase.label}</span>
                        <h2 className="font-display text-[10vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] leading-[0.9] text-t-primary uppercase tracking-tight whitespace-pre-line mb-6">
                            {phase.headline}
                        </h2>
                        <p className="text-t-secondary text-base md:text-lg max-w-lg leading-relaxed mb-6">{phase.body}</p>
                        <span className="text-t-accent text-sm font-medium italic">{phase.accent}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}
