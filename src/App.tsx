import GlowBackground from './components/GlowBackground'
import CTA from './components/CTA'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Products from './components/Products'
import WhyVGO from './components/WhyVGO'

function App() {
  return (
    <>
      <GlowBackground />
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Products />
        <WhyVGO />
        <CTA />
      </main>
    </>
  )
}

export default App
