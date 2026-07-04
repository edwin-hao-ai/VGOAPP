import GlowBackground from './components/GlowBackground'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <GlowBackground />
      <Navbar />
      <main className="min-h-screen pt-16">
        <Hero />
      </main>
    </>
  )
}

export default App
