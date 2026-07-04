import GlowBackground from './components/GlowBackground'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <GlowBackground />
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="h-[80vh] flex items-center justify-center">
          <p className="text-vgo-muted">Navbar & background ready</p>
        </section>
      </main>
    </>
  )
}

export default App
