import { useEffect, useState } from 'react'

export default function GlowBackground() {
  const [position, setPosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setPosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)',
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)',
          right: '10%',
          top: '20%',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
