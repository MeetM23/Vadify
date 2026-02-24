import { useState, useRef, useEffect } from 'react'

function AnimatedSection({ children, className = '', delay = 0 }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, delay)
                    observer.unobserve(el)
                }
            },
            { threshold: 0.1 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [delay])
    return (
        <div ref={ref} className={className}
            style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
            {children}
        </div>
    )
}

const steps = [
    { step: '01', title: 'Initial Response', desc: "We'll get back to you within 24 hours of your inquiry." },
    { step: '02', title: 'Discovery Call', desc: 'A short call to understand your goals, challenges, and vision.' },
    { step: '03', title: 'Proposal', desc: 'A tailored proposal with scope, timeline, and investment.' },
    { step: '04', title: 'Kickoff', desc: 'Once aligned, we begin with a structured onboarding process.' },
]

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        await new Promise((r) => setTimeout(r, 1500))
        setSubmitting(false)
        setSubmitted(true)
    }

    const inputStyle = {
        width: '100%',
        backgroundColor: 'var(--t-surface)',
        border: '1px solid var(--t-border-solid)',
        color: 'var(--t-primary)',
        fontSize: '14px',
        padding: '12px 16px',
        borderRadius: '12px',
        outline: 'none',
        transition: 'border-color 0.2s ease, background-color 0.5s ease',
    }

    return (
        <div className="pt-24 bg-t-bg">
            {/* Header */}
            <section className="py-20 px-6" style={{ borderBottom: '1px solid var(--t-border)' }}>
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection>
                        <span className="section-tag mb-6 inline-block">Get In Touch</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-t-primary tracking-tighter leading-none mb-6">Start Project</h1>
                        <p className="text-t-secondary text-lg leading-relaxed max-w-2xl">
                            Reach out to begin your startup's growth journey with Vadify's expert team.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-6 bg-t-bg">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
                    {/* Left Info */}
                    <AnimatedSection className="lg:col-span-2 space-y-10">
                        <div>
                            <h2 className="text-t-primary font-semibold text-base mb-6">What to expect</h2>
                            <div className="space-y-5">
                                {steps.map((item) => (
                                    <div key={item.step} className="flex gap-4">
                                        <span className="text-t-muted text-xs font-mono font-bold pt-0.5 shrink-0 w-6">{item.step}</span>
                                        <div>
                                            <h3 className="text-t-primary text-sm font-semibold mb-1">{item.title}</h3>
                                            <p className="text-t-secondary text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4 pt-4" style={{ borderTop: '1px solid var(--t-border)' }}>
                            <h2 className="text-t-primary font-semibold text-base mb-4">Contact</h2>
                            <a href="mailto:info@vadify.in"
                                className="flex items-center gap-3 text-t-secondary hover:text-t-primary transition-colors text-sm">
                                <span className="w-8 h-8 rounded-xl flex items-center justify-center theme-card">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M1.5 3.5h11v8h-11v-8zM1.5 3.5L7 8.5l5.5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                info@vadify.in
                            </a>
                            <a href="https://vadify.in" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 text-t-secondary hover:text-t-primary transition-colors text-sm">
                                <span className="w-8 h-8 rounded-xl flex items-center justify-center theme-card">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                                        <path d="M7 1.5C5.5 3 4.5 5 4.5 7s1 4 2.5 5.5M7 1.5C8.5 3 9.5 5 9.5 7s-1 4-2.5 5.5M1.5 7h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                </span>
                                vadify.in
                            </a>
                        </div>
                    </AnimatedSection>

                    {/* Right Form */}
                    <AnimatedSection delay={100} className="lg:col-span-3">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center text-center h-full py-20 rounded-3xl theme-card">
                                <div className="w-16 h-16 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center mb-6">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 13l4 4L19 7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h2 className="text-t-primary text-2xl font-bold mb-3">Message sent!</h2>
                                <p className="text-t-secondary text-sm max-w-xs">Thank you for reaching out. We'll be in touch within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-t-muted text-xs font-medium mb-2 uppercase tracking-wider">Full Name *</label>
                                        <input type="text" name="name" value={form.name} onChange={handleChange}
                                            placeholder="John Doe" required style={inputStyle}
                                            onFocus={e => { e.target.style.borderColor = 'var(--t-accent)' }}
                                            onBlur={e => { e.target.style.borderColor = 'var(--t-border-solid)' }} />
                                    </div>
                                    <div>
                                        <label className="block text-t-muted text-xs font-medium mb-2 uppercase tracking-wider">Email *</label>
                                        <input type="email" name="email" value={form.email} onChange={handleChange}
                                            placeholder="john@company.com" required style={inputStyle}
                                            onFocus={e => { e.target.style.borderColor = 'var(--t-accent)' }}
                                            onBlur={e => { e.target.style.borderColor = 'var(--t-border-solid)' }} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-t-muted text-xs font-medium mb-2 uppercase tracking-wider">Company</label>
                                        <input type="text" name="company" value={form.company} onChange={handleChange}
                                            placeholder="Your startup name" style={inputStyle}
                                            onFocus={e => { e.target.style.borderColor = 'var(--t-accent)' }}
                                            onBlur={e => { e.target.style.borderColor = 'var(--t-border-solid)' }} />
                                    </div>
                                    <div>
                                        <label className="block text-t-muted text-xs font-medium mb-2 uppercase tracking-wider">Service</label>
                                        <select name="service" value={form.service} onChange={handleChange}
                                            style={{ ...inputStyle, cursor: 'pointer' }}
                                            onFocus={e => { e.target.style.borderColor = 'var(--t-accent)' }}
                                            onBlur={e => { e.target.style.borderColor = 'var(--t-border-solid)' }}>
                                            <option value="" style={{ background: 'var(--t-surface)' }}>Select a service</option>
                                            <option value="performance" style={{ background: 'var(--t-surface)' }}>Performance Marketing</option>
                                            <option value="creative" style={{ background: 'var(--t-surface)' }}>Brand & Creative</option>
                                            <option value="technology" style={{ background: 'var(--t-surface)' }}>Technology & Web</option>
                                            <option value="all" style={{ background: 'var(--t-surface)' }}>Full Package</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-t-muted text-xs font-medium mb-2 uppercase tracking-wider">Message *</label>
                                    <textarea name="message" value={form.message} onChange={handleChange}
                                        placeholder="Tell us about your project, goals, and what you're looking to achieve..."
                                        required rows={6}
                                        style={{ ...inputStyle, resize: 'none' }}
                                        onFocus={e => { e.target.style.borderColor = 'var(--t-accent)' }}
                                        onBlur={e => { e.target.style.borderColor = 'var(--t-border-solid)' }} />
                                </div>
                                <button type="submit" disabled={submitting}
                                    className="w-full text-sm font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    style={{ background: 'var(--t-primary)', color: 'var(--t-bg)' }}>
                                    {submitting ? (
                                        <>
                                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                                                <path d="M12 2A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </AnimatedSection>
                </div>
            </section>
        </div>
    )
}
