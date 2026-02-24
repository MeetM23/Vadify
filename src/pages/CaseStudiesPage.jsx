import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import lotsy from '../assets/lotsy.png'
import foxplay from '../assets/foxplay.png'
import hardware from '../assets/hardware.png'
import moodOfWood from '../assets/moodofwood.png'

function AnimatedSection({ children, className = '', delay = 0 }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        el.style.opacity = '1'
                        el.style.transform = 'translateY(0)'
                    }, delay)
                    observer.unobserve(el)
                }
            },
            { threshold: 0.1 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [delay])

    return (
        <div
            ref={ref}
            className={className}
            style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
        >
            {children}
        </div>
    )
}

const projects = [
    {
        name: 'Lotsy',
        url: 'https://www.lotsy.in/',
        description: 'Designed a structured digital storefront to showcase collections with clean visuals and intuitive browsing experience.',
        image: lotsy,
        tags: ['E-commerce', 'UI/UX', 'Web'],
        cover: true,
    },
    {
        name: 'Foxplay Clothing',
        url: 'https://www.foxplayclothing.com/',
        description: 'Developed a bold, product-focused e-commerce website aligned with brand identity and fast checkout flow.',
        image: foxplay,
        tags: ['E-commerce', 'Brand', 'Development'],
        cover: true,
    },
    {
        name: 'Hardware Progress',
        url: 'https://hardwareprogress.com/',
        description: 'Built a professional business website focused on product display, trust-building, and clear information hierarchy.',
        image: hardware,
        tags: ['Web', 'Development', 'Design'],
        cover: false,
    },
    {
        name: 'Mood of Wood',
        url: 'https://moodofwood.in/',
        description: 'A modern website crafted to showcase premium wooden collections with clarity and refined aesthetics. Focused on clean layout, product visibility, and structured browsing experience.',
        image: moodOfWood,
        tags: ['E-commerce', 'Branding', 'UI/UX'],
        cover: false,
    },
]

export default function CaseStudiesPage() {
    return (
        <div className="pt-24">
            {/* Header */}
            <section className="py-20 px-6 border-b border-white/5">
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection>
                        <span className="section-tag mb-6 inline-block">Case Studies</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-6">
                            Our projects
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                            Real work, real results. Here's how we've helped startups and businesses grow through strategy, design, and technology.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project, i) => (
                            <AnimatedSection key={project.name} delay={i * 100}>
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className={`relative overflow-hidden bg-[#111111] h-56 md:h-64 ${project.cover ? '' : 'flex items-center justify-center p-8'}`}>
                                        <img
                                            src={project.image}
                                            alt={project.name}
                                            className={`transition-transform duration-500 group-hover:scale-105 ${project.cover ? 'absolute inset-0 w-full h-full object-cover' : 'h-full w-auto max-w-full object-contain'}`}
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none'
                                                e.currentTarget.parentElement.innerHTML = `<div class="text-gray-600 text-4xl font-black">${project.name[0]}</div>`
                                            }}
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2">
                                                Visit Site
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H2.5M8.5 1.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-7">
                                        <div className="flex items-start justify-between mb-3">
                                            <h2 className="text-white font-bold text-xl tracking-tight group-hover:text-white transition-colors">
                                                {project.name}
                                            </h2>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600 group-hover:text-white transition-colors shrink-0 mt-1">
                                                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-5">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs text-gray-500 border border-gray-800 px-2.5 py-1 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </a>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 border-t border-white/5">
                <AnimatedSection>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
                            Want results like these?
                        </h2>
                        <p className="text-gray-400 text-base mb-8">
                            Let's build your success story together. Reach out to start your project.
                        </p>
                        <Link to="/contact" className="btn-primary text-base px-8 py-3.5">
                            Contact us
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </AnimatedSection>
            </section>
        </div>
    )
}
