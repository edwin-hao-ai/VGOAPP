import { LanguageProvider } from './i18n/LanguageContext'
import GlowBackground from './components/GlowBackground'
import CTA from './components/CTA'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Products from './components/Products'
import BrowserShareBand from './components/BrowserShareBand'
import WhyVGO from './components/WhyVGO'

function App() {
  return (
    <LanguageProvider>
      <GlowBackground />
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Products />
        <BrowserShareBand />
        <FAQ />
        <WhyVGO />
        <CTA />
      </main>
      <Footer />
    </LanguageProvider>
  )
}

export default App
