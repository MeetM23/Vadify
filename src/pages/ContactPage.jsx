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

function Toast({ visible }) {
    return (
        <div style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 20px',
            borderRadius: '14px',
            backgroundColor: 'var(--t-surface)',
            border: '1px solid var(--t-border-solid)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            maxWidth: '340px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
            pointerEvents: visible ? 'auto' : 'none',
        }}>
            {/* WhatsApp icon */}
            <span style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.121 1.528 5.855L.057 23.57a.75.75 0 0 0 .91.91l5.715-1.471A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.505-5.201-1.388l-.373-.218-3.864.994.994-3.864-.218-.373A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
            </span>
            <div>
                <p style={{ color: 'var(--t-primary)', fontSize: '13px', fontWeight: '600', margin: 0, lineHeight: '1.4' }}>
                    Opening WhatsApp…
                </p>
                <p style={{ color: 'var(--t-secondary)', fontSize: '12px', margin: '2px 0 0', lineHeight: '1.4' }}>
                    Press send to complete your inquiry.
                </p>
            </div>
        </div>
    )
}

const steps = [
    { step: '01', title: 'Initial Response', desc: "We'll get back to you within 24 hours of your inquiry." },
    { step: '02', title: 'Discovery Call', desc: 'A short call to understand your goals, challenges, and vision.' },
    { step: '03', title: 'Proposal', desc: 'A tailored proposal with scope, timeline, and investment.' },
    { step: '04', title: 'Kickoff', desc: 'Once aligned, we begin with a structured onboarding process.' },
]

const WHATSAPP_NUMBER = '919998616511' // Replace with real number (country code + number, no +)

const serviceLabels = {
    performance: 'Performance Marketing',
    creative: 'Brand & Creative',
    technology: 'Technology & Web',
    all: 'Full Package',
    '': 'Not specified',
}

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
    const [submitting, setSubmitting] = useState(false)
    const [toastVisible, setToastVisible] = useState(false)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        const service = serviceLabels[form.service] || 'Not specified'
        const text = [
            `👋 *New Inquiry via Vadify Website*`,
            ``,
            `*Name:* ${form.name}`,
            `*Email:* ${form.email}`,
            `*Company:* ${form.company || 'Not provided'}`,
            `*Service:* ${service}`,
            ``,
            `*Message:*`,
            form.message,
        ].join('\n')

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

        // Small delay for spinner feel, then open WhatsApp
        await new Promise((r) => setTimeout(r, 800))
        window.open(url, '_blank', 'noopener,noreferrer')

        setSubmitting(false)
        setForm({ name: '', email: '', company: '', service: '', message: '' })

        // Show toast
        setToastVisible(true)
        setTimeout(() => setToastVisible(false), 4000)
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
            {/* Toast */}
            <Toast visible={toastVisible} />

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
                                        <option value="creative" style={{ background: 'var(--t-surface)' }}>Brand &amp; Creative</option>
                                        <option value="technology" style={{ background: 'var(--t-surface)' }}>Technology &amp; Web</option>
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
                                        Opening WhatsApp…
                                    </>
                                ) : (
                                    <>
                                        Send via WhatsApp
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.121 1.528 5.855L.057 23.57a.75.75 0 0 0 .91.91l5.715-1.471A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.505-5.201-1.388l-.373-.218-3.864.994.994-3.864-.218-.373A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                                        </svg>
                                    </>
                                )}
                            </button>
                            <p className="text-center text-t-muted text-xs">
                                You'll be redirected to WhatsApp to confirm and send.
                            </p>
                        </form>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    )
}
