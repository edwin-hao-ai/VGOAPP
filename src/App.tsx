import { LanguageProvider } from './i18n/LanguageContext'
import GlowBackground from './components/GlowBackground'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Products from './components/Products'
import WhyVGO from './components/WhyVGO'

function App() {
  return (
    <LanguageProvider>
      <GlowBackground />
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Products />
        <WhyVGO />
        <CTA />
      </main>
      <Footer />
    </LanguageProvider>
  )
}

export default App
