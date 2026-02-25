import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ theme: 'dark', toggle: () => { } })

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('vadify-theme')
        if (stored) return stored
        return 'light'
    })

    useEffect(() => {
        const root = document.documentElement
        root.classList.remove('dark', 'light')
        root.classList.add(theme)
        localStorage.setItem('vadify-theme', theme)
    }, [theme])

    const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
