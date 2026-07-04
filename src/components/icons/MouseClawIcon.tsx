import type { SVGProps } from 'react'

interface MouseClawIconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export default function MouseClawIcon({ size = 28, className, ...props }: MouseClawIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      shapeRendering="crispEdges"
      {...props}
    >
      {/* tail */}
      <rect x="19" y="11" width="2" height="4" fill="#9ca3af" />
      <rect x="20" y="13" width="2" height="3" fill="#9ca3af" />

      {/* left ear */}
      <rect x="5" y="3" width="4" height="4" fill="#c8c8c8" />
      <rect x="6" y="4" width="2" height="2" fill="#f472b6" />

      {/* right ear */}
      <rect x="15" y="3" width="4" height="4" fill="#c8c8c8" />
      <rect x="16" y="4" width="2" height="2" fill="#f472b6" />

      {/* head */}
      <rect x="5" y="6" width="14" height="10" fill="#c8c8c8" />

      {/* eyes */}
      <rect x="8" y="9" width="2" height="3" fill="#1f2937" />
      <rect x="14" y="9" width="2" height="3" fill="#1f2937" />

      {/* nose */}
      <rect x="11" y="12" width="2" height="1" fill="#f472b6" />

      {/* mouth */}
      <rect x="8" y="13" width="8" height="3" fill="#ffffff" />

      {/* paws */}
      <rect x="7" y="16" width="3" height="2" fill="#ffffff" />
      <rect x="14" y="16" width="3" height="2" fill="#ffffff" />
    </svg>
  )
}
