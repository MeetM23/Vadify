import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────────
   EDIT THESE — replace with real names, roles, and photo imports
   ───────────────────────────────────────────────────────────────── */
const FOUNDERS = [
    {
        name: 'Darshan Vadher',
        role: 'Founder',
        focus: 'Strategy & Growth',
        initials: 'DV',
        // photo: founderOnePhoto, ← import your image and uncomment
    },
    {
        name: 'Meet Modasiya',
        role: 'Co-Founder',
        focus: 'Creative & Technology',
        initials: 'MM',
        // photo: founderTwoPhoto,
    },
]

function useFadeUp(delay = 0) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setTimeout(() => {
                        el.style.opacity = '1'
                        el.style.transform = 'translateY(0)'
                    }, delay)
                    obs.unobserve(el)
                }
            },
            { threshold: 0.12 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [delay])
    return ref
}

export default function FoundersSection() {
    const labelRef = useFadeUp(0)
    const headRef = useFadeUp(100)
    const copyRef = useFadeUp(180)

    return (
        <section
            className="py-28 px-6 bg-t-bg"
            style={{ borderTop: '1px solid var(--t-border)' }}
        >
            <div className="max-w-7xl mx-auto">

                {/* ── Label ── */}
                <div ref={labelRef} style={fadeStyle(0)}>
                    <span className="section-tag inline-block mb-8">Built by Operators</span>
                </div>

                {/* ── Statement headline ── */}
                <div ref={headRef} style={fadeStyle(0)} className="mb-6">
                    <h2
                        className="font-display uppercase leading-none tracking-tight text-t-primary"
                        style={{ fontSize: 'clamp(52px, 8vw, 128px)' }}
                    >
                        The&nbsp;Founders
                    </h2>
                </div>

                {/* ── Positioning copy ── */}
                <div ref={copyRef} style={fadeStyle(0)} className="mb-20 max-w-xl">
                    <p className="text-t-secondary text-base leading-relaxed">
                        Vadify was built by two operators focused on clarity, speed, and
                        measurable growth. We don't work{' '}
                        <em className="not-italic text-t-primary font-semibold">for</em> startups
                        — we build <UnderlineWord>alongside</UnderlineWord> them.
                    </p>
                </div>

                {/* ── Founders row ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-12 lg:gap-20">
                    {FOUNDERS.map((founder, i) => (
                        <FounderCard
                            key={founder.name + i}
                            founder={founder}
                            delay={240 + (i * 120)}
                        />
                    ))}
                </div>

                {/* ── Bottom rule + positioning statement ── */}
                <div
                    className="mt-20 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    style={{ borderTop: '1px solid var(--t-border)' }}
                >
                    <p className="text-t-muted text-xs uppercase tracking-[0.2em]">
                        Vadify — Digital Growth Studio
                    </p>
                    <p className="text-t-muted text-xs max-w-sm text-right leading-relaxed">
                        We embed ourselves as long‑term partners —<br />
                        not vendors who disappear after delivery.
                    </p>
                </div>
            </div>
        </section>
    )
}

/* Inline fade-up base style */
const fadeStyle = (_delay) => ({
    opacity: 0,
    transform: 'translateY(28px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
})

/* Animated underline word */
function UnderlineWord({ children }) {
    return (
        <span
            className="relative inline-block text-t-primary font-semibold"
            style={{ whiteSpace: 'nowrap' }}
        >
            {children}
            <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-full"
                style={{
                    height: '1.5px',
                    background: 'var(--t-accent)',
                    transformOrigin: 'left center',
                    animation: 'underlineGrow 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s both',
                }}
            />
        </span>
    )
}

/* Single founder card — minimal, no heavy shadows */
const FounderCard = ({ founder, delay }) => {
    const ref = useFadeUp(delay)
    return (
        <div
            ref={ref}
            style={fadeStyle(delay)}
            className="py-10 sm:py-0"
        >
            {/* Portrait */}
            <div
                className="relative mb-7 overflow-hidden"
                style={{
                    width: '100%',
                    maxWidth: 260,
                    aspectRatio: '3/4',
                    background: 'var(--t-surface)',
                    border: '1px solid var(--t-border-solid)',
                }}
            >
                {founder.photo ? (
                    <img
                        src={founder.photo}
                        alt={founder.name}
                        className="absolute inset-0 w-full h-full object-cover grayscale"
                        style={{ filter: 'grayscale(100%) contrast(1.05)' }}
                    />
                ) : (
                    /* Placeholder — shows initials until a real photo is added */
                    <div className="absolute inset-0 flex items-end justify-end p-4">
                        <span
                            className="font-display text-t-muted select-none leading-none"
                            style={{ fontSize: 'clamp(64px, 10vw, 96px)', opacity: 0.12 }}
                        >
                            {founder.initials}
                        </span>
                    </div>
                )}

                {/* Subtle accent corner line */}
                <span
                    aria-hidden="true"
                    className="absolute top-3 left-3 block"
                    style={{ width: 22, height: 22, borderTop: '1.5px solid var(--t-accent)', borderLeft: '1.5px solid var(--t-accent)' }}
                />
            </div>

            {/* Name */}
            <p
                className="font-display uppercase text-t-primary leading-none tracking-tight mb-1"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
            >
                {founder.name}
            </p>

            {/* Role + focus */}
            <p className="text-t-muted text-xs uppercase tracking-[0.18em] mt-2">
                {founder.role}
            </p>
            <p className="text-t-secondary text-sm mt-0.5">{founder.focus}</p>
        </div>
    )
}
