import type { SVGProps } from 'react'

interface RemoteCrabIconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export default function RemoteCrabIcon({ size = 28, className, ...props }: RemoteCrabIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="remoteCrabBody" x1="6" y1="8" x2="18" y2="17" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60a5fa" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>

      {/* legs */}
      <path
        d="M6.5 15.5 3.6 18M7.5 17.4 5.4 20M17.5 15.5 20.4 18M16.5 17.4 18.6 20"
        stroke="#60a5fa"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* claws */}
      <circle cx="3.3" cy="8.4" r="1.7" fill="#60a5fa" />
      <circle cx="20.7" cy="8.4" r="1.7" fill="#a78bfa" />
      <path
        d="M4.6 9.6 6.1 11.2M19.4 9.6 17.9 11.2"
        stroke="#a78bfa"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* eye stalks */}
      <path d="M9.5 6.8V4.3M14.5 6.8V4.3" stroke="#a78bfa" strokeWidth="1.1" strokeLinecap="round" />

      {/* eyes */}
      <circle cx="9.5" cy="3.4" r="1.5" fill="#f8fafc" />
      <circle cx="14.5" cy="3.4" r="1.5" fill="#f8fafc" />
      <circle cx="9.5" cy="3.4" r="0.6" fill="#1f2937" />
      <circle cx="14.5" cy="3.4" r="0.6" fill="#1f2937" />

      {/* body */}
      <ellipse cx="12" cy="12" rx="6.2" ry="4.6" fill="url(#remoteCrabBody)" />

      {/* mouth */}
      <path d="M9.9 13.1h4.2" stroke="#0a0a0f" strokeWidth="0.9" strokeLinecap="round" opacity="0.45" />
    </svg>
  )
}
