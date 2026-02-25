import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import foxplay from '../../assets/foxplay.png'
import lotsy from '../../assets/lotsy.png'
import hardware from '../../assets/hardware.png'
import moodofwood from '../../assets/moodofwood.png'

gsap.registerPlugin(ScrollTrigger)

export default function CreativeCorner() {
    const sectionRef = useRef(null)
    const gridRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current.querySelector('.cc-header'),
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
                }
            )

            const items = gridRef.current.querySelectorAll('.bento-item')
            gsap.fromTo(items,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
                }
            )

            // Subtle floating animation for mockup elements
            gsap.to('.mockup-float', {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: 0.2
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-14 bg-t-bg overflow-hidden border-t border-t-border/10">
            <div className="max-w-[1400px] mx-auto">

                {/* Header: Minimal & Editorial */}
                <div className="cc-header mb-20 text-center">
                    <h2 className="font-display font-semibold tracking-tight text-4xl md:text-5xl text-t-primary mb-6">
                        Our Creative Highlights
                    </h2>
                    <p className="text-t-secondary text-center max-w-xl mx-auto text-base">
                        A curated collection of visual concepts crafted for modern brands.
                    </p>
                </div>

                {/* Bento Grid: 3x3 Architecture */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">

                    {/* Item 1: Campaign Visuals (Purple) */}
                    <div className="bento-item md:row-span-2 rounded-[40px] p-10 flex flex-col relative overflow-hidden group bg-[#E3D9FF] dark:bg-[#1E1933]">
                        <div className="relative z-10">
                            <h3 className="text-[#4A3B85] dark:text-[#C5B8FF] text-2xl font-bold tracking-tight">Campaign Visuals</h3>
                            <p className="text-[#6455A2] dark:text-[#8D7ECF] text-[10px] uppercase tracking-[0.2em] font-bold mt-2 opacity-60">Visual Strategy</p>
                        </div>

                        {/* Mockup Card */}
                        <div className="mt-auto relative mockup-float pb-4">
                            <div className="w-[190px] aspect-[3/4] bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white transform -rotate-3 transition-transform duration-700 group-hover:-rotate-6">
                                <img src={foxplay} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="absolute -right-4 top-1/2 w-[160px] aspect-[3/4] bg-[#FFE0B2] rounded-2xl shadow-2xl overflow-hidden border-4 border-white transform rotate-12 transition-transform duration-700 group-hover:rotate-15">
                                <img src={lotsy} className="w-full h-full object-cover" alt="" />
                            </div>
                        </div>

                        {/* Minimal Tool Mockup */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-1 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-[#4A3B85] rounded-full" />
                        </div>
                    </div>

                    {/* Item 2: Editorial Feeds (Muted Sand) */}
                    <div className="bento-item md:col-span-2 rounded-[40px] p-10 flex flex-col justify-between relative overflow-hidden group bg-[#EADCCB] dark:bg-[#2D261E]">
                        <div className="relative z-10">
                            <h3 className="text-[#5E4230] dark:text-[#D4B28C] text-2xl font-bold tracking-tight text-center md:text-left">Editorial Feeds</h3>
                            <p className="text-[#826756] dark:text-[#BFA185] text-[10px] uppercase tracking-[0.2em] font-bold mt-2 opacity-60 text-center md:text-left">Direction</p>
                        </div>

                        <div className="relative md:absolute md:right-12 md:top-1/2 md:-translate-y-1/2 mt-10 md:mt-0 mockup-float flex items-center justify-center">
                            {/* Grid preview mockup */}
                            <div className="grid grid-cols-2 gap-2 w-[180px]">
                                <div className="aspect-square bg-white/80 rounded-xl overflow-hidden shadow-sm border border-white/20">
                                    <img src={moodofwood} className="w-full h-full object-cover opacity-80" alt="" />
                                </div>
                                <div className="aspect-square bg-white/40 rounded-xl" />
                                <div className="aspect-square bg-white/40 rounded-xl" />
                                <div className="aspect-square bg-white/80 rounded-xl overflow-hidden shadow-sm border border-white/20">
                                    <img src={hardware} className="w-full h-full object-cover opacity-80" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 3: Carousel Narratives (Green) */}
                    <div className="bento-item rounded-[40px] p-10 relative overflow-hidden bg-[#E1F3D8] dark:bg-[#1A261A]">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-full h-24 bg-gray-950/5 rounded-2xl border border-black/5 mockup-float flex items-center justify-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-[#3B854A] shadow-lg" />
                                <div className="w-8 h-8 rounded-lg bg-black/10" />
                                <div className="w-8 h-8 rounded-lg bg-black/5" />
                            </div>
                            <div>
                                <h3 className="text-[#3B854A] dark:text-[#B8FFC5] text-xl font-bold tracking-tight">Carousel Narratives</h3>
                                <p className="text-[#55A264] dark:text-[#8CBF98] text-[9px] uppercase tracking-[0.2em] font-bold mt-1 opacity-60">Storytelling</p>
                            </div>
                        </div>
                    </div>

                    {/* Item 4: Reel Concepts (Yellow) */}
                    <div className="bento-item rounded-[40px] p-10 relative overflow-hidden bg-[#FFF9DC] dark:bg-[#33301A]">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-20 h-28 bg-white rounded-xl shadow-xl mx-auto overflow-hidden border-2 border-white mockup-float">
                                <div className="w-full h-full bg-[#85703B]/10 flex items-center justify-center">
                                    <div className="w-4 h-4 bg-[#85703B] rounded-full opacity-20" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[#85703B] dark:text-[#FFEB99] text-xl font-bold tracking-tight">Reel Concepts</h3>
                                <p className="text-[#A28A55] dark:text-[#CFBA8C] text-[9px] uppercase tracking-[0.2em] font-bold mt-1 opacity-60">Motion</p>
                            </div>
                        </div>
                    </div>

                    {/* Item 5: Brand Aesthetics (Brown) */}
                    <div className="bento-item md:col-span-2 rounded-[40px] p-10 flex flex-col justify-between relative overflow-hidden bg-[#DCC8B8] dark:bg-[#26211E]">
                        <div className="relative z-10">
                            <h3 className="text-[#5E3B2E] dark:text-[#E0A499] text-2xl font-bold tracking-tight">Brand Aesthetics</h3>
                            <p className="text-[#7A5545] dark:text-[#A89085] text-[10px] uppercase tracking-[0.2em] font-bold mt-2 opacity-60">Identity</p>
                        </div>

                        <div className="mt-8 flex gap-3 mockup-float">
                            <div className="w-12 h-12 bg-[#5E3B2E] rounded-full shadow-lg" />
                            <div className="w-12 h-12 bg-white rounded-full shadow-lg border-2 border-black/5" />
                            <div className="w-12 h-12 bg-[#D9F1FF] rounded-full shadow-lg" />
                            <div className="hidden md:flex w-12 h-12 bg-black rounded-full shadow-lg" />
                        </div>
                    </div>

                    {/* Item 6: Ad Creatives (Blue) */}
                    <div className="bento-item rounded-[40px] p-10 relative overflow-hidden bg-[#D9F1FF] dark:bg-[#1A262D]">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-full h-32 bg-white/80 backdrop-blur rounded-2xl flex items-center justify-center border border-white/30 mockup-float">
                                <div className="w-10 h-1bg-[#3B6B85] px-4 py-1.5 rounded-full bg-[#3B6B85] text-[8px] font-bold text-white tracking-[0.2em]">SHOP NOW</div>
                            </div>
                            <div>
                                <h3 className="text-[#3B6B85] dark:text-[#99D6FF] text-xl font-bold tracking-tight">Ad Creatives</h3>
                                <p className="text-[#5586A2] dark:text-[#8CB5CF] text-[9px] uppercase tracking-[0.2em] font-bold mt-1 opacity-60">Performance</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}
