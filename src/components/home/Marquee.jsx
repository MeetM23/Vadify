import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Marquee({ items, dir = 1, speed = 45 }) {
    const trackRef = useRef(null)

    useEffect(() => {
        const track = trackRef.current
        if (!track) return
        const w = track.scrollWidth / 2
        const tween = gsap.to(track, {
            x: dir > 0 ? -w : 0,
            duration: speed,
            ease: 'none',
            repeat: -1,
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
        <div className="overflow-hidden whitespace-nowrap border-y border-white/[0.06] py-3">
            <div ref={trackRef} className="inline-flex items-center gap-0">
                {doubled.map((item, i) => (
                    <span key={i} className="inline-flex items-center shrink-0 gap-0">
                        <span className="font-display text-[5.5vw] md:text-[4vw] lg:text-[3vw] text-white/[0.07] uppercase tracking-tight px-5 leading-none select-none">
                            {item}
                        </span>
                        <span className="text-[#1E90FF]/20 text-2xl">✦</span>
                    </span>
                ))}
            </div>
        </div>
    )
}
