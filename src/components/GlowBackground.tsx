import { useEffect, useRef } from 'react'

export default function GlowBackground() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touchQuery = window.matchMedia('(pointer: coarse)')

    // Respect accessibility and touch settings: skip mouse-follow on
    // reduced-motion preference or coarse-pointer (touch) devices.
    if (motionQuery.matches || touchQuery.matches) {
      return
    }

    let rafId: number | null = null
    let targetX = 50
    let targetY = 50

    const updateGlow = () => {
      glow.style.setProperty('--glow-x', `${targetX}%`)
      glow.style.setProperty('--glow-y', `${targetY}%`)
      rafId = null
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100
      targetY = (e.clientY / window.innerHeight) * 100
      if (rafId === null) {
        rafId = requestAnimationFrame(updateGlow)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        ref={glowRef}
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 transition-all duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)',
          left: 'var(--glow-x, 50%)',
          top: 'var(--glow-y, 50%)',
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
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
