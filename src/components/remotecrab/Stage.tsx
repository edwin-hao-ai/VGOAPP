import { useEffect, useRef, useState } from 'react'

/**
 * 竖屏片段的画框。
 *
 * 我们的成片全是 1080×1920 竖片、而且文案烧在画面里，所以：
 * - 不做 16:9 裁切（会切掉字和画面里的手机）；
 * - 也不让一个 9:16 的瘦高块孤零零立在宽版心里（桌面上会显得空、且一屏装不下）。
 * 做法是 4:5 的「海报」：同一帧做模糊底色铺满，原片居中、保持 9:16、不裁切。
 * 首屏、四个场景、六个功能页统一用这一个组件。
 */
export function Stage({
  language,
  name,
  className = '',
  poster,
  caption,
  loop = true,
  onOpen,
}: {
  language: 'zh' | 'en'
  /** 视频文件名（不含语言后缀与扩展名），如 `clip-camera`、`hero` */
  name: string
  className?: string
  /** 兜底封面；默认取同名 jpg */
  poster?: string
  caption?: React.ReactNode
  loop?: boolean
  /** 有值则在右下角给一个「看完整片段」的按钮 */
  onOpen?: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(false)
  const src = `/remotecrab/video/${name}-${language}.mp4`
  const cover = poster ?? `/remotecrab/video/${name}-${language}.jpg`

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // 切语言时换片源，并从当前时刻继续（用户不必重头看）
  const firstSrc = useRef(true)
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (firstSrc.current) { firstSrc.current = false; return }
    const t = el.currentTime
    el.src = src
    el.load()
    try { el.currentTime = Math.min(t, 1) } catch { /* metadata 还没到，忽略 */ }
    if (inView) el.play().catch(() => {})
  }, [src, inView])

  return (
    <div
      className={
        'relative aspect-[4/5] w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#0b0b11] isolate ' +
        className
      }
    >
      <div
        aria-hidden
        className="absolute -inset-[14%] -z-10 scale-110 bg-cover bg-center opacity-55 blur-[46px] brightness-75 saturate-100"
        style={{ backgroundImage: `url(${cover})` }}
      />
      <div className="absolute left-1/2 top-1/2 aspect-[9/16] h-[88%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[18px] ring-1 ring-white/15 shadow-[0_26px_60px_-22px_rgba(0,0,0,.95)]">
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          poster={cover}
          muted={loop}
          loop={loop}
          playsInline
          preload={loop ? 'metadata' : 'auto'}
          controls={!loop}
        />
      </div>
      {caption ? (
        <button
          type="button"
          onClick={onOpen}
          aria-label="Play with sound"
          className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] text-white/90 backdrop-blur transition hover:bg-black/75"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5">
            <path d="M8 5v14l11-7z" />
          </svg>
          {caption}
        </button>
      ) : onOpen ? (
        <button
          type="button"
          onClick={onOpen}
          aria-label="Play the full clip"
          className="absolute bottom-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur transition hover:bg-black/75"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3.5 w-3.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      ) : null}
    </div>
  )
}
