// Removed unused react hooks

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
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {projects.map((project, i) => {
                            const tags = project.tags || (project.category ? project.category.split(' · ') : [])
                            return (
                                <AnimatedSection key={project.brand || i} delay={i * 100}>
                                    <div className="group block relative">
                                        <a
                                            href={project.comingSoon ? undefined : (project.websiteUrl || '#')}
                                            target={project.comingSoon ? undefined : "_blank"}
                                            rel={project.comingSoon ? undefined : "noopener noreferrer"}
                                            className={`block mb-5 overflow-hidden rounded-2xl bg-t-surface-2 aspect-[3/2] relative ${project.comingSoon ? 'cursor-default' : 'cursor-pointer'}`}
                                        >
                                            {project.heroImageDark ? (
                                                <>
                                                    <img
                                                        src={project.heroImage}
                                                        width={project.imgWidth}
                                                        height={project.imgHeight}
                                                        loading="lazy"
                                                        alt={project.brand}
                                                        className={`w-full h-full object-contain p-8 md:p-12 transition-transform duration-700 group-hover:scale-105 dark:hidden`}
                                                        style={{ objectPosition: 'center' }}
                                                    />
                                                    <img
                                                        src={project.heroImageDark}
                                                        width={project.imgWidth}
                                                        height={project.imgHeight}
                                                        loading="lazy"
                                                        alt={project.brand}
                                                        className={`w-full h-full object-contain p-8 md:p-12 transition-transform duration-700 group-hover:scale-105 hidden dark:block`}
                                                        style={{ objectPosition: 'center' }}
                                                    />
                                                </>
                                            ) : (
                                                <img
                                                    src={project.heroImage}
                                                    width={project.imgWidth}
                                                    height={project.imgHeight}
                                                    loading="lazy"
                                                    alt={project.brand}
                                                    className={`w-full h-full object-contain p-8 md:p-12 transition-transform duration-700 group-hover:scale-105 ${project.slug === 'foxplay' && !project.cover ? 'invert dark:invert-0' : ''
                                                        }`}
                                                    style={{ objectPosition: 'center' }}
                                                    onError={(e) => {
                                                        console.error('Failed to load image:', project.heroImage);
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            )}
                                            {!project.heroImage && <div className="absolute inset-0 flex items-center justify-center text-t-muted text-[10px]">Image Missing</div>}

                                            {/* Overlay for active projects */}
                                            {!project.comingSoon && (
                                                <>
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400 pointer-events-none" />
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xl">
                                                            Visit Site
                                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 8.5L8.5 1.5M8.5 1.5H2.5M8.5 1.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </a>

                                        {/* Content - Minimalist Text Below */}
                                        <div className="flex flex-col gap-2 relative">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-t-primary font-semibold text-xl md:text-2xl tracking-tight">{project.brand}</h2>
                                                {project.comingSoon ? (
                                                    <span className="text-[11px] font-bold tracking-widest uppercase text-t-muted px-3 py-1 bg-t-surface-2 rounded-full border border-t-border shrink-0">
                                                        Coming Soon
                                                    </span>
                                                ) : (
                                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-t-muted group-hover:text-t-primary transition-colors shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
                                                        <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 mb-2">
                                                {tags.map((tag, idx) => (
                                                    <span key={tag} className="text-xs text-t-muted font-medium flex items-center">
                                                        {tag}
                                                        {idx < tags.length - 1 && <span className="mx-2 text-t-border/50">•</span>}
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="text-t-secondary text-sm leading-relaxed max-w-lg">{project.headline}</p>
                                        </div>
                                    </div>
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
