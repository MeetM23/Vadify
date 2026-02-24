/**
 * HomePage.jsx — Premium Motion-Driven Homepage
 * Lenis smooth scroll + GSAP ScrollTrigger + section components
 */
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import { GrainOverlay, CustomCursor } from '../components/home/GrainCursor'
import Marquee from '../components/home/Marquee'
import HeroSection from '../components/home/HeroSection'
import PinnedStory from '../components/home/PinnedStory'
import HorizontalScroll from '../components/home/HorizontalScroll'
import WorkShowcase from '../components/home/WorkShowcase'
import MotionTypography from '../components/home/MotionTypography'
import CTASection from '../components/home/CTASection'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_1 = ['Strategy', 'Performance', 'Creative', 'Technology', 'Growth', 'Digital', 'Startups']
const MARQUEE_2 = ['Scale', 'Convert', 'Design', 'Develop', 'Market', 'Analyse', 'Optimise']
const MARQUEE_3 = ['150+ Projects', 'Strong Brands', 'Short Timelines', 'Real Results', 'Precision Growth']

export default function HomePage() {
    useEffect(() => {
        // ── Lenis smooth scroll ───────────────────────────────────────────────
        const lenis = new Lenis({
            duration: 1.3,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        })

        // Bridge Lenis ↔ GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add((time) => lenis.raf(time * 1000))
        gsap.ticker.lagSmoothing(0)

        return () => {
            lenis.destroy()
            gsap.ticker.remove((time) => lenis.raf(time * 1000))
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [])

    return (
        <div className="bg-[#080808] overflow-x-hidden" style={{ cursor: 'none' }}>
            {/* Ambient overlays */}
            <GrainOverlay />
            <CustomCursor />

            {/* 1 ── Hero */}
            <HeroSection />

            {/* Marquee divider */}
            <Marquee items={MARQUEE_1} dir={1} speed={45} />

            {/* 2 ── Pinned Storytelling (Strategy → Creative → Technology) */}
            <PinnedStory />

            {/* 3 ── Horizontal Scroll (4 service panels) */}
            <HorizontalScroll />

            {/* Marquee divider */}
            <Marquee items={MARQUEE_2} dir={-1} speed={38} />

            {/* 4 ── Work Showcase */}
            <WorkShowcase />

            {/* 5 ── Motion Typography */}
            <MotionTypography />

            {/* Marquee divider */}
            <Marquee items={MARQUEE_3} dir={1} speed={50} />

            {/* 6 ── CTA Banner */}
            <CTASection />
        </div>
    )
}
