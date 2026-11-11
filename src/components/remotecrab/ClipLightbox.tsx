import { useEffect } from 'react'

/** 场景片段 / 完整演示的灯箱：9:16、带声音，点背景或 Esc 关掉。 */
export function ClipLightbox({
  name,
  caption,
  language,
  onClose,
}: {
  name: string | null
  caption?: string
  language: 'zh' | 'en'
  onClose: () => void
}) {
  useEffect(() => {
    if (!name) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [name, onClose])

  if (!name) return null

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center bg-[#04040a]/85 p-6 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative aspect-[9/16] h-[min(86vh,900px)] overflow-hidden rounded-[22px] bg-black ring-1 ring-white/15 shadow-[0_40px_90px_-30px_#000]"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          key={name}
          src={`/remotecrab/video/${name}-${language}.mp4`}
          poster={`/remotecrab/video/${name}-${language}.jpg`}
          className="h-full w-full object-cover"
          autoPlay
          controls
          playsInline
        />
        {caption ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent px-4 pb-6 pt-3 text-center text-[13px] text-white/85">
            {caption}
          </div>
        ) : null}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-black/60 text-white backdrop-blur"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
