import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import ContactPage from './pages/ContactPage'

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-[#080808] flex flex-col">
                <Navbar />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/case-studies" element={<CaseStudiesPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
