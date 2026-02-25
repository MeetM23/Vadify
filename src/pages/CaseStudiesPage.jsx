import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CASE_STUDIES } from '../data/caseStudies'
import AnimatedSection from '../components/AnimatedSection'

const projects = Object.values(CASE_STUDIES)

export default function CaseStudiesPage() {
    return (
        <div className="pt-24 bg-t-bg">
            {/* Header */}
            <section className="py-20 px-6" style={{ borderBottom: '1px solid var(--t-border)' }}>
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection>
                        <span className="section-tag mb-6 inline-block">Case Studies</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-t-primary tracking-tighter leading-none mb-6">Our projects</h1>
                        <p className="text-t-secondary text-lg leading-relaxed max-w-2xl">
                            Real work, real results. Here's how we've helped startups and businesses grow through strategy, design, and technology.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-20 px-6 bg-t-bg">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project, i) => {
                            const tags = project.tags || (project.category ? project.category.split(' · ') : [])
                            return (
                                <AnimatedSection key={project.brand || i} delay={i * 100}>
                                    <a href={project.websiteUrl || '#'} target="_blank" rel="noopener noreferrer"
                                        className="group block rounded-3xl overflow-hidden transition-all duration-300 theme-card">
                                        {/* Image */}
                                        <div className={`relative overflow-hidden bg-t-surface-2 h-56 md:h-64 ${!project.cover ? 'flex items-center justify-center p-8' : ''}`}>
                                            <img src={project.heroImage} alt={project.brand}
                                                className={`transition-transform duration-500 group-hover:scale-105 ${project.cover ? 'absolute inset-0 w-full h-full object-cover' : 'h-full w-auto max-w-full object-contain'}`}
                                                onError={(e) => {
                                                    console.error('Failed to load image:', project.heroImage);
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                            {!project.heroImage && <div className="absolute inset-0 flex items-center justify-center text-t-muted text-[10px]">Image Missing</div>}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2">
                                                    Visit Site
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 8.5L8.5 1.5M8.5 1.5H2.5M8.5 1.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </span>
                                            </div>
                                        </div>
                                        {/* Content */}
                                        <div className="p-7 bg-t-surface">
                                            <div className="flex items-start justify-between mb-3">
                                                <h2 className="text-t-primary font-bold text-xl tracking-tight group-hover:text-t-accent transition-colors">{project.brand}</h2>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-t-muted group-hover:text-t-accent transition-colors shrink-0 mt-1">
                                                    <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <p className="text-t-secondary text-sm leading-relaxed mb-5">{project.headline}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {tags.map((tag) => (
                                                    <span key={tag} className="text-xs text-t-muted px-2.5 py-1 rounded-full"
                                                        style={{ border: '1px solid var(--t-border-solid)' }}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </a>
                                </AnimatedSection>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-t-bg" style={{ borderTop: '1px solid var(--t-border)' }}>
                <AnimatedSection>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-t-primary tracking-tight mb-6">Want results like these?</h2>
                        <p className="text-t-secondary text-base mb-8">Let's build your success story together. Reach out to start your project.</p>
                        <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3.5">
                            Contact us
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </Link>
                    </div>
                </AnimatedSection>
            </section>
        </div>
    )
}
