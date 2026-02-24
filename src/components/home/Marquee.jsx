import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Marquee({ items, dir = 1, speed = 45 }) {
    const trackRef = useRef(null)

    // ── Animation — untouched ─────────────────────────────────────────────────
    useEffect(() => {
        const track = trackRef.current
        if (!track) return
        const w = track.scrollWidth / 2
        const tween = gsap.to(track, {
            x: dir > 0 ? -w : 0, duration: speed, ease: 'none', repeat: -1,
            modifiers: {
                x: gsap.utils.unitize((x) => {
                    const v = parseFloat(x)
                    return dir > 0 ? ((v % w) - w) % w : ((v % w) + w) % w
                }),
            },
        })
        return () => tween.kill()
    }, [dir, speed])

    const doubled = [...items, ...items]

    return (
        <div
            className="overflow-hidden whitespace-nowrap py-3.5"
            style={{
                background: 'var(--t-bg-alt)',           // soft section bg — distinct in both themes
                borderTop: '1px solid var(--t-border)',   // hairline border, theme-aware
                borderBottom: '1px solid var(--t-border)',
            }}
        >
            <div ref={trackRef} className="inline-flex items-center">
                {doubled.map((item, i) => (
                    <span key={i} className="inline-flex items-center shrink-0">
                        {/* Scrolling word */}
                        <span
                            className="font-display uppercase select-none"
                            style={{
                                color: 'var(--t-secondary)',          // #a1a1aa dark / #6B6B6B light
                                fontSize: 'clamp(24px, 3.5vw, 48px)',
                                letterSpacing: '0.06em',              // slightly open in both modes
                                padding: '0 1.2rem',
                                lineHeight: 1,
                                fontWeight: 500,                      // medium — not heavy
                            }}
                        >
                            {item}
                        </span>

                        {/* Accent separator — low opacity so it doesn't overpower */}
                        <span
                            aria-hidden="true"
                            style={{
                                color: 'var(--t-accent)',
                                opacity: 0.22,                        // subtle in both modes
                                fontSize: '1.1rem',
                                lineHeight: 1,
                            }}
                        >
                            ✦
                        </span>
                    </span>
                ))}
            </div>
        </div>
    )
}
