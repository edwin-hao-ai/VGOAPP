import type { SVGProps } from 'react'

interface MDDockIconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export default function MDDockIcon({ size = 28, className, ...props }: MDDockIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="mddock-A_face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bff" />
          <stop offset="55%" stopColor="#7c5cff" />
          <stop offset="100%" stopColor="#3ec8ff" />
        </linearGradient>
        <linearGradient id="mddock-A_top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mddock-A_btm" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mddock-A_chamfer_tl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mddock-A_chamfer_br" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 16 6 H 60 V 50 L 50 60 H 4 V 18 Z"
        fill="#000000"
        opacity="0.18"
        transform="translate(1.5 2)"
      />
      <path d="M 16 4 H 60 V 48 L 48 60 H 4 V 16 Z" fill="url(#mddock-A_face)" />
      <path d="M 16 4 H 60 V 48 L 48 60 H 4 V 16 Z" fill="url(#mddock-A_top)" />
      <path d="M 16 4 H 60 V 48 L 48 60 H 4 V 16 Z" fill="url(#mddock-A_btm)" />
      <polygon points="4,16 16,4 16,16" fill="url(#mddock-A_chamfer_tl)" />
      <polygon points="48,60 60,48 48,48" fill="url(#mddock-A_chamfer_br)" />
      <path
        d="M 16 4 H 60 V 48 L 48 60 H 4 V 16 Z"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="0.8"
      />
      <g
        fill="none"
        stroke="#ffffff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 14 44 V 22 L 22 36 L 30 22 V 44" />
      </g>
      <path d="M 34 22 H 41 A 11 11 0 0 1 41 44 H 34 Z" fill="#ffffff" />
      <path d="M 38 26 H 41 A 7 7 0 0 1 41 40 H 38 Z" fill="url(#mddock-A_face)" />
    </svg>
  )
}
