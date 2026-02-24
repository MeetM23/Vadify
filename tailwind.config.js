/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
                display: ['Bebas Neue', 'Impact', 'sans-serif'],
            },
            colors: {
                'vadify-bg': '#080808',
                'vadify-surface': '#111111',
                'vadify-border': '#1f1f1f',
                'vadify-muted': '#6b7280',
                'vadify-accent': '#f5f5f5',
                'dodger': '#1E90FF',
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
