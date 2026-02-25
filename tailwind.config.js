/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['InterVar', 'Inter', 'system-ui', 'sans-serif'],
                display: ['ClashDisplay', 'sans-serif'],
                clash: ['ClashDisplay', 'sans-serif'],
                inter: ['InterVar', 'Inter', 'sans-serif'],
            },
            colors: {
                // CSS variable-based semantic tokens — auto-switch with theme
                't-bg': 'var(--t-bg)',
                't-bg-alt': 'var(--t-bg-alt)',
                't-surface': 'var(--t-surface)',
                't-surface-2': 'var(--t-surface-2)',
                't-primary': 'var(--t-primary)',
                't-secondary': 'var(--t-secondary)',
                't-muted': 'var(--t-muted)',
                't-accent': 'var(--t-accent)',
                't-border': 'var(--t-border)',
            },
            animation: {
                'fade-up': 'fadeUp 0.8s ease forwards',
                'fade-in': 'fadeIn 0.6s ease forwards',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: 0, transform: 'translateY(30px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
            },
        },
    },
    plugins: [],
}

