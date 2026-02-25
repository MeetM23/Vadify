import { useEffect, useRef } from 'react'

export default function AnimatedSection({ children, className = '', delay = 0 }) {
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
        <div ref={ref} className={className}
            style={{
                opacity: 0,
                transform: 'translateY(32px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
                willChange: 'opacity, transform'
            }}>
            {children}
        </div>
    )
}
