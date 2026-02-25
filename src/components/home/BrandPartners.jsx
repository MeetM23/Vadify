import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Asset imports
import shopifySvg from '../../assets/shopify (1).svg'
// import shopifySvg from '../../assets/shopify.svg'
import metaSvg from '../../assets/meta-3.svg'
import googleAdsSvg from '../../assets/google-ads-2.svg'
import razorpaySvg from '../../assets/razorpay.svg'
import phonepeSvg from '../../assets/phonepe-1.svg'
import adobeSvg from '../../assets/adobe-2.svg'
import figmaSvg from '../../assets/figma-icon.svg'
import googleAnalyticsSvg from '../../assets/google-analytics-4.svg'
import wordpressSvg from '../../assets/wordpress-icon.svg'
import woocommerceSvg from '../../assets/woocommerce-1.svg'

gsap.registerPlugin(ScrollTrigger)

// ── Individual logo card (tools grid) ────────────────────────────────────────
function ToolCard({ src, alt }) {
    return (
        <div
            className="flex items-center justify-center rounded-2xl p-5 transition-all duration-300 hover:scale-[1.03]"
            style={{ background: 'var(--t-surface)', border: '1px solid var(--t-border-solid)', minHeight: '90px' }}
        >
            <img src={src} alt={alt} className="h-9 w-auto object-contain" />
        </div>
    )
}

export default function BrandPartners() {
    const sectionRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.bp-card', {
                y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 px-6 bg-t-bg" style={{ borderTop: '1px solid var(--t-border)' }}>
            <div className="max-w-7xl mx-auto">

                {/* Section header */}
                <div className="text-center mb-14 bp-card">
                    <span className="section-tag mb-4 inline-block">Official Partners</span>
                    <h2 className="text-3xl md:text-4xl font-black text-t-primary tracking-tighter">
                        Trusted by industry leaders
                    </h2>
                </div>

                {/* ── TOP ROW: Official · Certified · Trusted ─────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

                    {/* OFFICIAL — Shopify Partners */}
                    <div className="bp-card rounded-3xl p-9 flex flex-col justify-between min-h-[220px] relative overflow-hidden group cursor-default"
                        style={{ background: 'var(--t-surface)', border: '1px solid var(--t-border-solid)' }}>
                        {/* Green glow radial */}
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                            style={{ background: 'radial-gradient(ellipse 60% 60% at 80% 80%, #96bf4744, transparent)' }} />
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,#96bf47,transparent)' }} />

                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase"
                            style={{ color: '#96bf47' }}>
                            <span className="w-1 h-1 rounded-full" style={{ background: '#96bf47' }} />
                            Official
                        </span>

                        <div className="flex flex-col items-center gap-5 mt-auto">
                            <img src={shopifySvg} alt="Shopify" className="h-16 w-auto drop-shadow-sm" />
                            <div className='flex flex-col items-center w-full'>
                                {/* <p className="text-t-primary text-2xl font-black tracking-tight leading-tight">Shopify</p> */}
                                <p className="text-t-secondary text-base font-semibold tracking-tight">Shopify Partners</p>
                            </div>
                        </div>
                    </div>

                    {/* CERTIFIED — Meta + Google Ads */}
                    <div className="bp-card rounded-3xl p-9 flex flex-col justify-between min-h-[220px] relative overflow-hidden group cursor-default"
                        style={{ background: 'var(--t-surface)', border: '1px solid rgba(30,144,255,0.25)' }}>
                        {/* Blue glow radial */}
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                            style={{ background: 'radial-gradient(ellipse 60% 60% at 20% 80%, #1E90FF33, transparent)' }} />
                        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,#1E90FF,transparent)' }} />

                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase"
                            style={{ color: '#1E90FF' }}>
                            <span className="w-1 h-1 rounded-full" style={{ background: '#1E90FF' }} />
                            Certified
                        </span>

                        <div className="flex items-center justify-around gap-3 mt-auto">
                            <div className="flex flex-col items-center gap-2">
                                <img src={metaSvg} alt="Meta Business" className="h-10 w-auto" />
                                <span className="text-t-muted text-[10px] font-medium tracking-wide">Meta Business</span>
                            </div>
                            <div className="w-px h-12" style={{ background: 'var(--t-border-solid)' }} />
                            <div className="flex flex-col items-center gap-2">
                                <img src={googleAdsSvg} alt="Google Ads" className="h-10 w-auto" />
                                <span className="text-t-muted text-[10px] font-medium tracking-wide">Google Ads</span>
                            </div>
                        </div>
                    </div>

                    {/* TRUSTED PARTNER — Razorpay + PhonePe */}
                    <div className="bp-card rounded-3xl p-9 flex flex-col min-h-[220px] relative overflow-hidden group cursor-default"
                        style={{ background: 'var(--t-surface)', border: '1px solid var(--t-border-solid)' }}>
                        {/* Purple glow radial */}
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                            style={{ background: 'radial-gradient(ellipse 60% 60% at 80% 80%, #a78bfa33, transparent)' }} />
                        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,#a78bfa,transparent)' }} />

                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase"
                            style={{ color: '#a78bfa' }}>
                            <span className="w-1 h-1 rounded-full" style={{ background: '#a78bfa' }} />
                            Trusted Partner
                        </span>

                        <div className="grid grid-cols-2 gap-3 mt-auto">
                            <div className="flex flex-col items-center gap-2.5 rounded-2xl py-4 px-3"
                                style={{ background: 'var(--t-surface-2)', border: '1px solid var(--t-border-solid)' }}>
                                <img src={razorpaySvg} alt="Razorpay" className="h-7 w-auto" />
                                <span className="text-t-muted text-[9px] font-medium tracking-wide">Razorpay</span>
                            </div>
                            <div className="flex flex-col items-center gap-2.5 rounded-2xl py-4 px-3"
                                style={{ background: 'var(--t-surface-2)', border: '1px solid var(--t-border-solid)' }}>
                                <img src={phonepeSvg} alt="PhonePe" className="h-7 w-auto" />
                                <span className="text-t-muted text-[9px] font-medium tracking-wide">PhonePe</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── TOOLS GRID ───────────────────────────────────────────────────── */}
                <div className="mt-8 bp-card">
                    <p className="text-t-muted text-[10px] font-semibold tracking-[0.25em] uppercase mb-4 text-center">
                        Tools we use
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        <ToolCard src={adobeSvg} alt="Adobe" />
                        <ToolCard src={shopifySvg} alt="Shopify" />
                        <ToolCard src={wordpressSvg} alt="WordPress" />
                        <ToolCard src={woocommerceSvg} alt="WooCommerce" />
                        <ToolCard src={figmaSvg} alt="Figma" />
                        <ToolCard src={googleAnalyticsSvg} alt="Google Analytics" />
                        <ToolCard src={metaSvg} alt="Meta Ads" />
                        <ToolCard src={googleAdsSvg} alt="Google Ads" />
                        <ToolCard src={razorpaySvg} alt="Razorpay" />
                        <ToolCard src={phonepeSvg} alt="PhonePe" />
                    </div>
                </div>

            </div>
        </section>
    )
}
