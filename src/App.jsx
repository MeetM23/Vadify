import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ScrollToTop from './components/ScrollToTop'
import RedirectToTop from './components/RedirectToTop'
import { initSmoothScroll } from './utils/smoothScroll'

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
    useEffect(() => {
        initSmoothScroll();
    }, []);

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
                    <RedirectToTop />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
