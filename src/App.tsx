import GlowBackground from './components/GlowBackground'
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
      </main>
    </>
  )
}

export default App
