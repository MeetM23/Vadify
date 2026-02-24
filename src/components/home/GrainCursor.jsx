import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export function GrainOverlay() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[996] opacity-[0.04]"
            style={{ backgroundImage: GRAIN, backgroundSize: '200px 200px' }}
        />
    )
}

export function CustomCursor() {
    const dotRef = useRef(null)
    const ringRef = useRef(null)

    useEffect(() => {
        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        const onMove = ({ clientX: x, clientY: y }) => {
            gsap.to(dot, { x, y, duration: 0.08, ease: 'none' })
            gsap.to(ring, { x, y, duration: 0.42, ease: 'power3.out' })
        }
        const onOver = (e) => {
            if (e.target.closest('a, button')) {
                gsap.to(ring, { scale: 2, borderColor: '#1E90FF', duration: 0.3 })
                gsap.to(dot, { scale: 0, duration: 0.2 })
            }
        }
        const onOut = (e) => {
            if (e.target.closest('a, button')) {
                gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,0.35)', duration: 0.3 })
                gsap.to(dot, { scale: 1, duration: 0.2 })
            }
        }

        window.addEventListener('mousemove', onMove)
        document.addEventListener('mouseover', onOver)
        document.addEventListener('mouseout', onOut)
        return () => {
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseover', onOver)
            document.removeEventListener('mouseout', onOut)
        }
    }, [])

    return (
        <div className="hidden md:block">
            <div
                ref={dotRef}
                aria-hidden="true"
                className="fixed top-0 left-0 z-[999] pointer-events-none w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{ mixBlendMode: 'difference' }}
            />
            <div
                ref={ringRef}
                aria-hidden="true"
                className="fixed top-0 left-0 z-[999] pointer-events-none w-9 h-9 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{ border: '1px solid rgba(255,255,255,0.35)', mixBlendMode: 'difference' }}
            />
        </div>
    )
}
