import { useId, type SVGProps } from 'react'

interface VGOLogoProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export default function VGOLogo({ size = 48, className, ...props }: VGOLogoProps) {
  const id = useId()
  const face1Id = `${id}-face-1`
  const face2Id = `${id}-face-2`
  const face3Id = `${id}-face-3`
  const glowId = `${id}-glow`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id={face1Id} x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={face2Id} x1="120" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={face3Id} x1="60" y1="0" x2="60" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.3" />
        </linearGradient>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g filter={`url(#${glowId})`}>
        <path
          d="M60 10L110 40V90L60 115L10 90V40L60 10Z"
          fill={`url(#${face1Id})`}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
        />
        <path
          d="M60 10L110 40L60 70L10 40L60 10Z"
          fill={`url(#${face3Id})`}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
        <path
          d="M10 40L60 70V115L10 90V40Z"
          fill={`url(#${face2Id})`}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
        <path
          d="M110 40L60 70V115L110 90V40Z"
          fill={`url(#${face2Id})`}
          fillOpacity="0.5"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
      </g>
    </svg>
  )
}
