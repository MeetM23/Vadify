import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CASE_STUDIES } from '../../data/caseStudies'

gsap.registerPlugin(ScrollTrigger)

const STORIES = Object.values(CASE_STUDIES)

export default function BrandStories() {
    const sectionRef = useRef(null)
    const cardRefs = useRef([])

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current.querySelector('.bs-header'),
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } })
            gsap.fromTo(cardRefs.current.filter(Boolean),
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' } })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-14 bg-t-bg">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="bs-header flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-7 h-px accent-line" />
                            <span className="text-t-muted text-[10px] tracking-[0.3em] uppercase">Case Studies</span>
                        </div>
                        <h2 className="font-display text-[7vw] sm:text-[5vw] md:text-[4vw] lg:text-[3.2vw] text-t-primary uppercase tracking-tight leading-[0.9]">
                            Brand Stories<br />We've Engineered
                        </h2>
                    </div>
                    <Link
                        to="/case-studies"
                        className="shrink-0 inline-flex items-center gap-2 text-t-secondary text-sm hover:text-t-primary transition-colors"
                    >
                        All case studies
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                {/* 2-col compact grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {STORIES.map((s, i) => (
                        <Link
                            key={s.slug}
                            to={`/case-studies/${s.slug}`}
                            ref={(el) => { cardRefs.current[i] = el }}
                            className="group flex flex-col rounded-2xl overflow-hidden"
                            style={{
                                border: '1px solid var(--t-border)',
                                background: 'var(--t-surface)',
                                textDecoration: 'none',
                                transition: 'transform 0.28s ease, border-color 0.28s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)'
                                e.currentTarget.style.borderColor = s.accent + '50'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.borderColor = 'var(--t-border)'
                            }}
                        >
                            {/* Compact image */}
                            <div className={`relative overflow-hidden bg-t-surface-2 transition-colors duration-500 ${!s.cover ? 'flex items-center justify-center p-8' : ''}`} style={{ height: '220px' }}>
                                <img
                                    src={s.heroImage}
                                    alt={s.brand}
                                    className={`w-full h-full transition-transform duration-600 group-hover:scale-[1.04] ${s.cover ? 'object-cover' : 'object-contain'}`}
                                    loading="lazy"
                                    onError={(e) => {
                                        console.error('BrandStories ERROR:', s.brand, s.heroImage);
                                        e.currentTarget.style.border = '2px solid red';
                                    }}
                                />
                                {!s.heroImage && <div className="absolute inset-0 flex items-center justify-center text-t-primary bg-red-500/20 text-[10px] font-bold">IMAGE DATA MISSING: {s.brand}</div>}
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-400 pointer-events-none" />
                                {/* Brand badge */}
                                <div
                                    className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1.5 rounded-lg backdrop-blur-sm"
                                    style={{ background: 'rgba(0,0,0,0.55)', border: `1px solid ${s.accent}40` }}
                                >
                                    <span className="text-[10px] font-bold" style={{ color: s.accent }}>{s.abbr}</span>
                                    <span className="text-white/80 text-[10px]">{s.brand}</span>
                                </div>
                                <span
                                    className="absolute top-3 right-3 text-[9px] tracking-[0.18em] uppercase px-2 py-1 rounded backdrop-blur-sm"
                                    style={{ background: 'rgba(0,0,0,0.45)', color: 'rgba(255,255,255,0.65)' }}
                                >
                                    {s.category}
                                </span>
                            </div>

                            {/* Card body — compact */}
                            <div className="flex flex-col p-5 gap-2.5">
                                <h3
                                    className="font-display text-base md:text-lg text-t-primary leading-snug uppercase tracking-tight group-hover:text-t-accent transition-colors duration-300"
                                >
                                    {s.headline}
                                </h3>
                                <p className="text-t-muted text-sm leading-relaxed">{s.outcome}</p>

                                {/* Metrics + CTA row */}
                                <div className="flex items-center gap-5 pt-3" style={{ borderTop: '1px solid var(--t-border)' }}>
                                    {s.results.slice(0, 2).map((r, ri) => (
                                        <div key={ri}>
                                            <span className="font-bold text-sm block" style={{ color: s.accent }}>{r.metric}</span>
                                            <span className="text-t-muted text-[10px] tracking-wide">{r.label}</span>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-1.5 text-t-accent text-xs font-semibold ml-auto group-hover:gap-2.5 transition-all duration-300">
                                        Read Story
                                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
