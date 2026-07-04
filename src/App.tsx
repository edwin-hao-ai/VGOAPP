import GlowBackground from './components/GlowBackground'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Products from './components/Products'

function App() {
  return (
    <>
      <GlowBackground />
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Products />
      </main>
    </>
  )
}

export default App
