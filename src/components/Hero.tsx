import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Garment } from "@/components/Garment"
import { Sticker, type StickerKind } from "@/components/Sticker"
import { PRODUCTS } from "@/lib/products"
import { gsap, reducedMotion } from "@/lib/gsap"

type Deco = { kind: StickerKind; cls: string; depth: number; r?: number; d?: number; color?: string }

/** Scattered stickers: position classes, parallax depth, float rotation. */
const DECOS: Deco[] = [
  { kind: "burst", cls: "left-[24%] top-[6%] w-44 md:w-64", depth: 0.6, r: 10, d: 7 },
  { kind: "ball", cls: "left-[30%] top-[18%] w-20 md:w-28", depth: 1.2, d: 5 },
  { kind: "heart", cls: "left-[3%] top-[52%] w-14 md:w-20", depth: 1.4, r: -20, d: 6 },
  { kind: "flower", cls: "left-[8%] top-[30%] w-40 md:w-64", depth: 0.8, r: 6, d: 8 },
  { kind: "flower", cls: "left-[22%] bottom-[8%] w-24 md:w-40", depth: 1.1, r: -8, d: 6 },
  { kind: "leaf", cls: "left-[14%] bottom-[18%] w-20 md:w-32", depth: 0.9, r: 30, d: 7 },
  { kind: "cloud", cls: "right-[4%] top-[14%] w-40 md:w-60", depth: 0.5, d: 9 },
  { kind: "flower", cls: "right-[14%] top-[26%] w-24 md:w-36", depth: 1.3, r: 12, d: 6 },
  { kind: "butterfly", cls: "right-[26%] top-[12%] w-16 md:w-24", depth: 1.5, r: -10, d: 5 },
  { kind: "star", cls: "right-[12%] bottom-[22%] w-24 md:w-40", depth: 0.9, r: -16, d: 8 },
  { kind: "leaf", cls: "right-[4%] bottom-[8%] w-24 md:w-40", depth: 1.0, r: -40, d: 7 },
  { kind: "smiley", cls: "left-[36%] bottom-[14%] w-14 md:w-20", depth: 1.6, d: 5 },
  { kind: "cd", cls: "right-[30%] bottom-[10%] w-16 md:w-24", depth: 1.2, r: 20, d: 6 },
  { kind: "phone", cls: "left-[42%] top-[8%] hidden w-10 md:block md:w-16", depth: 1.7, r: 14, d: 5 },
  { kind: "butterfly", cls: "left-[6%] bottom-[34%] w-12 md:w-16", depth: 1.8, r: 20, d: 5 },
  { kind: "sparkle", cls: "left-[48%] top-[14%] w-8 md:w-12", depth: 1.8, d: 4 },
  { kind: "sparkle", cls: "right-[40%] bottom-[28%] w-6 md:w-10", depth: 1.9, d: 4 },
]

export function Hero({ ready }: { ready: boolean }) {
  const nav = useNavigate()
  const onDiscover = (id: number) => nav(`/shop/${id}`)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const p = PRODUCTS[i]
  const stage = useRef<HTMLElement>(null)
  const art = useRef<HTMLDivElement>(null)

  useEffect(() => { document.documentElement.style.setProperty("--hero-bg", p.bg) }, [p.bg])

  // product swap animation
  useEffect(() => {
    if (!art.current || reducedMotion()) return
    const tw = gsap.fromTo(art.current, { scale: 0.7, rotate: -12, opacity: 0, y: 40 }, { scale: 1, rotate: 0, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.6)" })
    return () => { tw.kill() }
  }, [i])

  // entrance once booted
  useEffect(() => {
    if (!ready || !stage.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(".deco-in", { scale: 0, opacity: 0, duration: 0.9, stagger: { each: 0.05, from: "random" }, ease: "back.out(2)" })
      gsap.from(".hero-ctl", { y: 30, opacity: 0, duration: 0.7, delay: 0.5, stagger: 0.08, ease: "expo.out" })
    }, stage)
    return () => ctx.revert()
  }, [ready])

  // pointer parallax on the stickers
  useEffect(() => {
    const el = stage.current
    if (!el || reducedMotion()) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
    }
    el.addEventListener("pointermove", onMove)
    return () => el.removeEventListener("pointermove", onMove)
  }, [])

  const next = () => setI((k) => (k + 1) % PRODUCTS.length)
  const prev = () => setI((k) => (k - 1 + PRODUCTS.length) % PRODUCTS.length)

  // keyboard + autoplay
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement && ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return
      if (scrollY > innerHeight * 0.8) return
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    addEventListener("keydown", onKey)
    return () => removeEventListener("keydown", onKey)
  }, [])
  useEffect(() => {
    if (paused || !ready || reducedMotion()) return
    const id = setInterval(() => { if (scrollY < innerHeight * 0.6 && document.visibilityState === "visible") next() }, 5000)
    return () => clearInterval(id)
  }, [paused, ready])

  return (
    <section
      id="top"
      ref={stage}
      className="relative flex min-h-svh flex-col items-center justify-end overflow-hidden pt-40 pb-40 transition-colors duration-700 md:pb-44"
      style={{ backgroundColor: p.bg }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Drop 01 pieces"
    >
      {/* holographic sheen over the pastel */}
      <div className="holo hue pointer-events-none absolute inset-0 opacity-[.14] mix-blend-screen" aria-hidden="true" />

      {DECOS.map((d, k) => (
        <div key={k} className={`deco pointer-events-none absolute ${d.cls}`} style={{ transform: `translate(calc(var(--mx,0) * ${d.depth * -28}px), calc(var(--my,0) * ${d.depth * -22}px))`, transition: "transform .6s ease-out" }}>
          <div className="deco-in">
            <div className="float" style={{ "--r": `${d.r ?? 0}deg`, "--d": `${d.d ?? 6}s`, "--delay": `${-k * 0.7}s` } as React.CSSProperties}>
              <Sticker kind={d.kind} color={d.color} className="w-full drop-shadow-[0_8px_0_rgba(14,14,14,.08)]" />
            </div>
          </div>
        </div>
      ))}

      <p className="hero-ctl pointer-events-none absolute top-40 left-10 hidden text-[12px] font-semibold tracking-[.22em] text-ink/70 uppercase md:block">
        Drop 01 · Infused with Y2K energy · {String(i + 1).padStart(2, "0")} / 08
      </p>

      <div className="hero-ctl pointer-events-none absolute top-[22%] right-[8%] grid size-24 place-items-center md:size-32" aria-hidden="true">
        <Sticker kind="burst" color="#F26B5B" className="wobble absolute inset-0 w-full" />
        <span className="font-pixel relative text-2xl text-white md:text-3xl">NEW!!</span>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div ref={art} className="w-[min(70vw,420px)] cursor-pointer" onClick={() => onDiscover(p.id)} role="img" aria-label={`${p.name}, ${p.kind}`}>
          <Garment type={p.type} color={p.color} className="w-full drop-shadow-[0_24px_0_rgba(14,14,14,.10)]" />
        </div>

        <div className="hero-ctl mt-6 flex items-center gap-4 md:gap-8">
          <Button variant="secondary" size="icon" aria-label="Previous piece" onClick={prev} className="size-16 rounded-full bg-white text-ink pill-shadow hover:bg-white/90">
            <ArrowLeft className="size-6" />
          </Button>
          <Button onClick={() => onDiscover(p.id)} className="btn-3d h-16 min-w-55 rounded-full bg-navy px-10 text-xl font-medium text-white hover:bg-navy/95">
            {p.name}
          </Button>
          <Button variant="secondary" size="icon" aria-label="Next piece" onClick={next} className="size-16 rounded-full bg-white text-ink pill-shadow hover:bg-white/90">
            <ArrowRight className="size-6" />
          </Button>
        </div>
        <p className="hero-ctl mt-4 rounded-full bg-white/70 px-4 py-1 text-sm font-medium text-ink/80 backdrop-blur" aria-live="polite">{p.kind} · {p.tier}<span className="hidden md:inline"> · ← → to browse</span></p>
      </div>

      {/* curved edge into the cream page */}
      <div className="absolute right-[-10%] -bottom-px left-[-10%] h-24 rounded-t-[100%] bg-cream md:h-32" />
    </section>
  )
}
