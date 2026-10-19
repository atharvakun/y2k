import { useEffect, useRef, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { Sticker, type StickerKind } from "@/components/Sticker"
import { gsap, reducedMotion } from "@/lib/gsap"

type Deco = { kind: StickerKind; cls: string; r?: number; d?: number; color?: string }

type Props = {
  kicker: string
  title: string
  bg: string
  lead?: string
  decos?: Deco[]
  crumbs?: [string, string][]
  children?: ReactNode
}

/** Pastel page hero: letters bounce in, stickers pop, curved edge into cream. */
export function PageHeader({ kicker, title, bg, lead, decos = [], crumbs, children }: Props) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => { document.documentElement.style.setProperty("--hero-bg", bg) }, [bg])
  useEffect(() => {
    if (!ref.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(".ph-letter", { yPercent: 120, rotate: 8, opacity: 0, duration: 0.9, stagger: 0.03, ease: "back.out(1.7)", delay: 0.15 })
      gsap.from(".ph-deco", { scale: 0, rotate: -30, opacity: 0, duration: 0.9, stagger: { each: 0.06, from: "random" }, ease: "back.out(2)", delay: 0.2 })
      gsap.from(".ph-rise", { y: 24, opacity: 0, duration: 0.7, stagger: 0.08, ease: "expo.out", delay: 0.6 })
    }, ref)
    return () => ctx.revert()
  }, [title])

  return (
    <section ref={ref} className="relative overflow-hidden pt-36 pb-28 md:pt-44 md:pb-36" style={{ backgroundColor: bg }}>
      <div className="holo hue pointer-events-none absolute inset-0 opacity-[.14] mix-blend-screen" aria-hidden="true" />
      {decos.map((d, k) => (
        <div key={k} className={`ph-deco pointer-events-none absolute max-md:opacity-70 ${d.cls}`}>
          <div className="float" style={{ "--r": `${d.r ?? 0}deg`, "--d": `${d.d ?? 6}s`, "--delay": `${-k * 0.8}s` } as React.CSSProperties}>
            <Sticker kind={d.kind} color={d.color} className="w-full drop-shadow-[0_8px_0_rgba(14,14,14,.08)]" />
          </div>
        </div>
      ))}
      <div className="relative mx-auto max-w-6xl px-6 text-center md:px-10">
        {crumbs && (
          <nav className="ph-rise mb-4 text-sm font-medium text-ink/70" aria-label="Breadcrumb">
            {crumbs.map(([l, to], k) => <span key={to}>{k > 0 && " / "}<Link to={to} className="hover:underline">{l}</Link></span>)}
          </nav>
        )}
        <p className="ph-rise font-pixel text-2xl tracking-wide text-navy uppercase">{kicker}</p>
        <h1 className="mx-auto mt-2 max-w-5xl text-[clamp(44px,8vw,120px)] leading-[0.95] font-normal tracking-[-0.03em] uppercase" aria-label={title}>
          {title.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top whitespace-nowrap" aria-hidden="true">
              {[...w].map((ch, j) => <span key={j} className="ph-letter inline-block">{ch}</span>)}{" "}
            </span>
          ))}
        </h1>
        {lead && <p className="ph-rise mx-auto mt-6 max-w-2xl text-xl leading-snug md:text-2xl">{lead}</p>}
        {children && <div className="ph-rise mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
      <div className="absolute right-[-10%] -bottom-px left-[-10%] h-20 rounded-t-[100%] bg-cream md:h-28" />
    </section>
  )
}
