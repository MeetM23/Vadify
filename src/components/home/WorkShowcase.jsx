import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import lotsy from '../../assets/lotsy.png'
import foxplay from '../../assets/foxplay.png'
import hardware from '../../assets/hardware.png'
import moodOfWood from '../../assets/moodofwood.png'

const PROJECTS = [
    { name: 'Lotsy', url: 'https://www.lotsy.in/', tag: 'E-commerce · UI/UX', image: lotsy, cover: false },
    { name: 'Foxplay Clothing', url: 'https://www.foxplayclothing.com/', tag: 'E-commerce · Brand', image: foxplay, cover: true },
    { name: 'Hardware Progress', url: 'https://hardwareprogress.com/', tag: 'Web · Development', image: hardware, cover: false },
    { name: 'Mood of Wood', url: 'https://moodofwood.in/', tag: 'E-commerce · UI/UX', image: moodOfWood, cover: false },
]

export default function WorkShowcase() {
    const sectionRef = useRef(null)
    const cardRefs = useRef([])

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current.querySelector('.ws-header'),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            )
            gsap.fromTo(
                cardRefs.current,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
                }
            )

            // Subtle parallax on images as page scrolls
            cardRefs.current.forEach((card) => {
                if (!card) return
                const img = card.querySelector('.ws-img')
                gsap.to(img, {
                    yPercent: -8,
                    ease: 'none',
                    scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 },
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-14 bg-[#080808]">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="ws-header flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-7 h-px bg-[#1E90FF]" />
                            <span className="text-gray-600 text-[10px] tracking-[0.3em] uppercase">Our Work</span>
                        </div>
                        <h2 className="font-display text-[7vw] sm:text-[5vw] md:text-[4vw] lg:text-[3.5vw] text-white uppercase tracking-tight leading-[0.9]">
                            Real work.<br />Real results.
                        </h2>
                    </div>
                    <Link
                        to="/case-studies"
                        className="shrink-0 inline-flex items-center gap-2 text-gray-500 text-sm hover:text-white transition-colors"
                    >
                        View all projects
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PROJECTS.map((p, i) => (
                        <a
                            key={i}
                            ref={(el) => { cardRefs.current[i] = el }}
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden rounded-2xl bg-[#0e0e0e] border border-white/[0.06] hover:border-[#1E90FF]/30 transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden h-60 md:h-72 bg-[#111]">
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className={`ws-img absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105 ${p.cover ? 'object-cover' : 'object-contain p-8'}`}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500" />
                                {/* Hover label */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="flex items-center gap-2 bg-white text-black text-xs font-bold px-4 py-2 rounded-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        Visit Site
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <path d="M2 8L8 2M8 2H3M8 2v5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-white font-semibold text-base mb-1 group-hover:text-[#1E90FF] transition-colors duration-300">
                                        {p.name}
                                    </h3>
                                    <span className="text-gray-600 text-xs">{p.tag}</span>
                                </div>
                                <svg className="text-gray-700 group-hover:text-[#1E90FF] transition-colors duration-300" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M3 15L15 3M15 3H5M15 3v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
