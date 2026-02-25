import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import CaseStudyPage from './pages/CaseStudyPage'
import ContactPage from './pages/ContactPage'
import ScrollToTop from './components/ScrollToTop'

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <div className="min-h-screen bg-t-bg flex flex-col">
                    <Navbar />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/services" element={<ServicesPage />} />
                            <Route path="/case-studies" element={<CaseStudiesPage />} />
                            <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                        </Routes>
                    </main>
                    <Footer />
                    <ScrollToTop />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
