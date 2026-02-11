import * as React from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router"
import { Header, Footer } from "./components/Layout"
import HomePage from "./pages/HomePage"
import ServicesPage from "./pages/ServicesPage"
import AboutPage from "./pages/AboutPage"
import ResultsPage from "./pages/ResultsPage"
import ContactPage from "./pages/ContactPage"
import { Toaster } from "sonner"

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#BFA16F]/20 selection:text-[#BFA16F]">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" />
      </BrowserRouter>
    </div>
  )
}
