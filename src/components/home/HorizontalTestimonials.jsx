import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Free stock video URLs from Mixkit (no auth required, direct MP4)
const VIDEO_CARDS = [
    {
        id: 'v1',
        name: 'Priya M.',
        title: 'Founder',
        business: 'Lotsy',
        duration: '1:24',
        src: 'https://mixkit.co/free-stock-video/young-woman-talking-about-her-business-success-34421/young-woman-talking-about-her-business-success-34421-large.mp4',
        thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop',
    },
    {
        id: 'v2',
        name: 'Rohan S.',
        title: 'CEO',
        business: 'Foxplay Clothing',
        duration: '0:58',
        src: 'https://mixkit.co/free-stock-video/man-talking-to-the-camera-near-a-window-7536/man-talking-to-the-camera-near-a-window-7536-large.mp4',
        thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop',
    },
    {
        id: 'v3',
        name: 'Ankit D.',
        title: 'Director',
        business: 'Hardware Progress',
        duration: '2:03',
        src: 'https://mixkit.co/free-stock-video/professional-man-talking-in-the-office-34424/professional-man-talking-in-the-office-34424-large.mp4',
        thumb: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&auto=format&fit=crop',
    },
    {
        id: 'v4',
        name: 'Sarah L.',
        title: 'CMO',
        business: 'Vibe Events',
        duration: '1:45',
        src: 'https://mixkit.co/free-stock-video/young-woman-talking-about-her-business-success-34421/young-woman-talking-about-her-business-success-34421-large.mp4',
        thumb: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&auto=format&fit=crop',
    },
    {
        id: 'v5',
        name: 'Michael K.',
        title: 'Founder',
        business: 'TechFlow',
        duration: '2:15',
        src: 'https://mixkit.co/free-stock-video/man-talking-to-the-camera-near-a-window-7536/man-talking-to-the-camera-near-a-window-7536-large.mp4',
        thumb: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&auto=format&fit=crop',
    },
    {
        id: 'v6',
        name: 'Jessica R.',
        title: 'Owner',
        business: 'Urban Green',
        duration: '1:12',
        src: 'https://mixkit.co/free-stock-video/professional-man-talking-in-the-office-34424/professional-man-talking-in-the-office-34424-large.mp4',
        thumb: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop',
    },
    {
        id: 'v7',
        name: 'David W.',
        title: 'Product Lead',
        business: 'Scale AI',
        duration: '1:30',
        src: 'https://mixkit.co/free-stock-video/young-woman-talking-about-her-business-success-34421/young-woman-talking-about-her-business-success-34421-large.mp4',
        thumb: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop',
    },
]


function VideoModal({ card, onClose }) {
    const videoRef = useRef(null)

    return (
        <div
            className="fixed inset-0 z-[998] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}
            onClick={onClose}
        >
            <div
                className="relative rounded-2xl overflow-hidden w-full"
                style={{
                    maxWidth: '640px',
                    border: '1px solid var(--t-border)',
                    background: '#000',
                }}
                onClick={e => e.stopPropagation()}
            >
                <video
                    ref={videoRef}
                    src={card.src}
                    poster={card.thumb}
                    controls
                    autoPlay
                    playsInline
                    className="w-full"
                    style={{ display: 'block', maxHeight: '80vh', aspectRatio: '9/16', objectFit: 'cover' }}
                />
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors"
                    style={{ background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}
                >
                    ✕
                </button>
                <div className="absolute bottom-0 inset-x-0 p-4 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}>
                    <p className="text-white text-sm font-semibold">{card.name}</p>
                    <p className="text-white/60 text-xs">{card.title}, {card.business}</p>
                </div>
            </div>
        </div>
    )
}

export default function HorizontalTestimonials() {
    const sectionRef = useRef(null)
    const headerRef = useRef(null)
    const scrollRef = useRef(null)
    const [activeVideo, setActiveVideo] = useState(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { y: 36, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } })
            gsap.fromTo(scrollRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' } })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-14 bg-t-bg">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div ref={headerRef} className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-7 h-px accent-line" />
                        <span className="text-t-muted text-[10px] tracking-[0.3em] uppercase">Social Proof</span>
                    </div>
                    <h2 className="font-display text-[7vw] sm:text-[5vw] md:text-[4vw] lg:text-[3.5vw] text-t-primary uppercase tracking-tight leading-[0.9]">
                        Success Stories<br /><span className="text-t-accent italic">(Video)</span>
                    </h2>
                </div>

                {/* Scrollbar style */}
                <style>{`
                    .ht-scroll::-webkit-scrollbar { height: 5px; }
                    .ht-scroll::-webkit-scrollbar-track { background: transparent; }
                    .ht-scroll::-webkit-scrollbar-thumb { background: #3a3a3a; border-radius: 10px; }
                    .ht-scroll::-webkit-scrollbar-thumb:hover { background: #555; }
                `}</style>

                {/* Horizontal snap-scroll row */}
                <div
                    ref={scrollRef}
                    className="ht-scroll flex gap-6 overflow-x-auto pb-8 px-2"
                    style={{
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#3a3a3a transparent',
                    }}
                >
                    {/* Video Cards */}
                    {VIDEO_CARDS.map((card) => (
                        <div
                            key={card.id}
                            className="shrink-0 rounded-[32px] overflow-hidden relative cursor-pointer group"
                            style={{
                                width: '320px',
                                height: '480px',
                                scrollSnapAlign: 'start',
                                border: '1px solid var(--t-border)',
                                background: '#000',
                                transition: 'all 0.4s cubic-bezier(0.2, 0, 0.2, 1)',
                            }}
                            onClick={() => setActiveVideo(card)}
                        >
                            {/* Thumbnail */}
                            <img
                                src={card.thumb}
                                alt={card.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                                loading="lazy"
                            />

                            {/* Dark overlay */}
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />

                            {/* Center play button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                    style={{
                                        background: 'rgba(255,255,255,0.12)',
                                        border: '1.5px solid rgba(255,255,255,0.4)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                >
                                    <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
                                        <path d="M6 4l9 5-9 5V4z" fill="white" />
                                    </svg>
                                </div>
                            </div>

                            {/* Duration */}
                            <div
                                className="absolute top-4 right-4 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase"
                                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}
                            >
                                {card.duration}
                            </div>

                            {/* Bottom info */}
                            <div className="absolute bottom-0 inset-x-0 p-8">
                                <p className="text-white text-lg font-bold tracking-tight">{card.name}</p>
                                <p className="text-white/60 text-xs font-medium uppercase tracking-widest mt-1">{card.title}, {card.business}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video modal */}
            {activeVideo && <VideoModal card={activeVideo} onClose={() => setActiveVideo(null)} />}
        </section>
    )
}
