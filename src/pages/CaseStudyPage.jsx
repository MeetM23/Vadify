import { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CASE_STUDIES } from '../data/caseStudies'

gsap.registerPlugin(ScrollTrigger)

export default function CaseStudyPage() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const study = CASE_STUDIES[slug]

    const heroRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => { window.scrollTo(0, 0) }, [slug])

    useLayoutEffect(() => {
        if (!study) return
        const ctx = gsap.context(() => {
            gsap.fromTo(heroRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.1 })
            if (contentRef.current?.children) {
                gsap.fromTo(Array.from(contentRef.current.children),
                    { y: 45, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.1, duration: 0.85, ease: 'power3.out', delay: 0.35 })
            }
        })
        return () => ctx.revert()
    }, [study])

    // ── 404 State ──────────────────────────────────────────────────────────────
    if (!study) {
        return (
            <div className="min-h-screen bg-t-bg flex flex-col items-center justify-center px-6 text-center gap-6">
                <span className="text-[11px] font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--t-accent)' }}>404</span>
                <h1 className="font-display text-[12vw] sm:text-[8vw] md:text-[6vw] text-t-primary uppercase tracking-tight leading-[0.9]">
                    Story Not Found
                </h1>
                <p className="text-t-secondary text-base max-w-sm">This case study doesn't exist yet — or you followed a broken link.</p>
                <Link
                    to="/case-studies"
                    className="inline-flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-full"
                    style={{ background: 'var(--t-accent)' }}
                >
                    View all stories
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 10L10 2M10 2H4M10 2v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
        )
    }

    const { accent, accentMuted, websiteUrl } = study
    const otherStudies = Object.values(CASE_STUDIES).filter(s => s.slug !== slug)

    return (
        <div className="bg-t-bg overflow-x-hidden">

            {/* ── Hero ── */}
            <section ref={heroRef} className="pt-28 pb-0 px-6 md:px-14 overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    {/* Nav breadcrumb */}
                    <div className="flex items-center gap-3 mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-xs transition-colors"
                            style={{ color: 'var(--t-muted)' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--t-primary)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--t-muted)'}
                        >
                            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                <path d="M11 7H3M3 7l4-4M3 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back
                        </button>
                        <span style={{ color: 'var(--t-border)' }}>·</span>
                        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--t-muted)' }}>{study.category}</span>
                    </div>

                    {/* Headline — uses brand accent for key word */}
                    <div className="flex items-start gap-4 mb-4">
                        <div
                            className="mt-1 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                            style={{ background: accentMuted, color: accent, border: `1px solid ${accent}40` }}
                        >
                            {study.abbr}
                        </div>
                        <div>
                            <h1 className="font-display text-[8.5vw] sm:text-[6.5vw] md:text-[5vw] lg:text-[4vw] text-t-primary uppercase tracking-tight leading-[0.88]">
                                {study.headline}
                            </h1>
                        </div>
                    </div>

                    <p className="text-t-secondary text-base md:text-lg max-w-2xl leading-relaxed mb-7">
                        {study.outcome}
                    </p>

                    {/* CTAs */}
                    <div className="flex items-center gap-4 mb-10">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.04]"
                            style={{ background: accent }}
                        >
                            Start Your Growth
                        </Link>
                        {websiteUrl && (
                            <a
                                href={websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.04]"
                                style={{
                                    border: `1px solid ${accent}55`,
                                    color: accent,
                                    background: accentMuted,
                                }}
                            >
                                Visit Website
                                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        )}
                    </div>

                    {/* Hero image */}
                    <div className={`relative w-full rounded-2xl overflow-hidden bg-t-surface-2 ${!study.cover ? 'flex items-center justify-center p-12 md:p-20' : ''}`} style={{ height: '480px', border: '1px solid var(--t-border)' }}>
                        <img
                            src={study.heroImage}
                            alt={study.brand}
                            className={`transition-transform duration-700 ${study.cover ? 'w-full h-full object-cover object-center' : 'h-full w-auto max-w-full object-contain'}`}
                            loading="lazy"
                        />
                        {/* Accent tint overlay */}
                        <div className="absolute inset-0 pointer-events-none" style={{ background: study.cover ? `linear-gradient(to right, ${accent}14 0%, transparent 60%)` : 'transparent' }} />
                    </div>
                </div>
            </section>

            {/* ── Results bar ── */}
            <section className="py-12 px-6 md:px-14" style={{ borderBottom: '1px solid var(--t-border)' }}>
                <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {study.results.map((r, i) => (
                        <div key={i}>
                            <span
                                className="font-display text-[7vw] sm:text-[5vw] md:text-[3.5vw] lg:text-[2.6vw] leading-none tracking-tight block"
                                style={{ color: accent }}
                            >
                                {r.metric}
                            </span>
                            <span className="text-t-muted text-xs tracking-wide uppercase mt-1 block">{r.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Main content ── */}
            <section className="py-20 md:py-28 px-6 md:px-14">
                <div ref={contentRef} className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-14">

                    {/* Left — story sections */}
                    <div className="flex flex-col gap-12">
                        {/* Challenge */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-5 h-px" style={{ background: accent }} />
                                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: accent }}>The Challenge</span>
                            </div>
                            <p className="text-t-secondary text-base md:text-lg leading-relaxed">{study.challenge}</p>
                        </div>

                        {/* Strategy */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-5 h-px" style={{ background: accent }} />
                                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: accent }}>The Strategy</span>
                            </div>
                            <p className="text-t-secondary text-base md:text-lg leading-relaxed">{study.strategy}</p>
                        </div>

                        {/* Execution */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-5 h-px" style={{ background: accent }} />
                                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: accent }}>Execution</span>
                            </div>
                            <ul className="flex flex-col gap-4">
                                {study.execution.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span
                                            className="mt-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                                            style={{ background: accentMuted, color: accent }}
                                        >
                                            {i + 1}
                                        </span>
                                        <span className="text-t-secondary text-base leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Result image */}
                        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--t-border)' }}>
                            <img src={study.resultImg} alt="Results" className="w-full h-60 md:h-72 object-cover" loading="lazy" />
                        </div>
                    </div>

                    {/* Right — sidebar */}
                    <div>
                        <div
                            className="rounded-2xl p-5 flex flex-col gap-4 sticky top-28"
                            style={{ background: 'var(--t-surface)', border: '1px solid var(--t-border)' }}
                        >
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold"
                                style={{ background: accentMuted, color: accent }}
                            >
                                {study.abbr}
                            </div>
                            <div>
                                <h3 className="font-display text-lg text-t-primary uppercase tracking-tight leading-tight">{study.brand}</h3>
                                <p className="text-t-muted text-[10px] tracking-widest uppercase mt-0.5">{study.category}</p>
                            </div>

                            <div className="h-px" style={{ background: 'var(--t-border)' }} />

                            {study.results.map((r, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-t-muted text-xs">{r.label}</span>
                                    <span className="font-semibold text-sm" style={{ color: accent }}>{r.metric}</span>
                                </div>
                            ))}

                            <div className="h-px" style={{ background: 'var(--t-border)' }} />

                            <Link
                                to="/contact"
                                className="w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-2.5 rounded-full transition-all duration-300 hover:scale-[1.03]"
                                style={{ background: accent }}
                            >
                                Start Your Growth
                            </Link>

                            {websiteUrl && (
                                <a
                                    href={websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-full transition-all hover:scale-[1.02]"
                                    style={{ border: `1px solid ${accent}40`, color: accent, background: accentMuted }}
                                >
                                    Visit Website →
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Other stories ── */}
            <section className="pb-24 px-6 md:px-14" style={{ borderTop: '1px solid var(--t-border)' }}>
                <div className="max-w-[1400px] mx-auto pt-12">
                    <div className="flex items-center gap-3 mb-7">
                        <span className="w-7 h-px" style={{ background: accent }} />
                        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--t-muted)' }}>Explore other stories</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {otherStudies.map((s) => (
                            <Link
                                key={s.slug}
                                to={`/case-studies/${s.slug}`}
                                className="group relative rounded-2xl overflow-hidden flex items-end p-5 transition-all duration-300 hover:scale-[1.01]"
                                style={{ height: '160px', border: '1px solid var(--t-border)' }}
                            >
                                <img src={s.heroImage} alt={s.brand} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)' }} />
                                <div className="relative">
                                    <p className="text-white font-display text-base uppercase tracking-tight leading-tight">{s.brand}</p>
                                    <p className="text-white/55 text-[11px] mt-0.5">{s.category}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
