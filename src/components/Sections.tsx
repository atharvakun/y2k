import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Garment } from "@/components/Garment"
import { Sticker, type StickerKind } from "@/components/Sticker"
import { PRODUCTS } from "@/lib/products"
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap"
import { cn } from "@/lib/utils"

/* ---------------- ticker ---------------- */
export function Ticker({ items }: { items?: string[] }) {
  const list = items ?? [...PRODUCTS.map((p) => p.name), "Drop 01", "Seven stripes", "Zero cringe", "Press Space to jump"]
  const row = list.map((t, k) => <span key={k} className="mx-6 inline-flex items-center gap-6">{t}<span className="text-coral">✦</span></span>)
  return (
    <div className="overflow-hidden border-y border-ink/10 py-4 text-lg font-medium tracking-wide uppercase whitespace-nowrap" aria-hidden="true">
      <div className="ticker-track inline-flex w-max">{row}{row}</div>
    </div>
  )
}

/* ---------------- intro headline ---------------- */
export function Intro() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(".intro-line", { y: 60, opacity: 0, duration: 1, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 75%", once: true } })
      gsap.to(".intro-cd", { rotate: 360, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section id="about" ref={ref} className="relative px-6 pt-28 pb-16 text-center md:pt-40">
      <Sticker kind="cd" className="intro-cd pointer-events-none absolute top-10 left-[6%] w-20 opacity-80 md:w-32" />
      <Sticker kind="butterfly" className="float pointer-events-none absolute right-[8%] bottom-6 w-16 opacity-90 md:w-24" />
      <h2 className="mx-auto max-w-6xl text-[clamp(38px,6.4vw,104px)] leading-[0.98] font-normal tracking-[-0.03em] uppercase">
        <span className="intro-line block">Rainbow.exe ? Y2K ?</span>
        <span className="intro-line block">What are we talking about?</span>
      </h2>
      <p className="intro-line mt-8 text-xl md:text-2xl">(we're going to tell each other the real things)</p>
      <Link to="/learn" className="intro-line btn-3d mt-8 inline-flex h-14 items-center rounded-full bg-navy px-8 text-base font-medium text-white">Read the whole story</Link>
    </section>
  )
}

/* ---------------- benefits: pinned garment, cards drifting past ---------------- */
const CARDS: { title: string; copy: string; icon: StickerKind; color?: string; side: "l" | "r" }[] = [
  { title: "Without the cringe", copy: "A gentle wave of nostalgia that keeps you going, without the secondhand embarrassment.", icon: "smiley", color: "#F6D36B", side: "r" },
  { title: "Natural chrome", copy: "Certified mirror-finish hardware. It comes from the planet. A gift from Mother Nature.", icon: "cd", side: "l" },
  { title: "Anti-basic", copy: "Seven stripes of antioxidants against beige. Every piece hand-matched to the rainbow.", icon: "flower", side: "r" },
  { title: "Vegan", copy: "A plant-based bag that looks like heaven. Who could ask for more?", icon: "leaf", color: "#2F7A3E", side: "l" },
]

export function Benefits() {
  const ref = useRef<HTMLElement>(null)
  const hero = PRODUCTS[2]
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".bcard")
      if (reducedMotion()) { gsap.set(cards, { y: 0, opacity: 1 }); return }
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom bottom", scrub: 0.7 } })
      cards.forEach((c, k) => {
        const at = k * 1.2
        tl.fromTo(c, { y: "110vh", rotate: k % 2 ? 9 : -9 }, { y: "-110vh", rotate: k % 2 ? -7 : 7, ease: "none", duration: 2 }, at)
          .fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "none" }, at)
          .to(c, { opacity: 0, duration: 0.25, ease: "none" }, at + 1.75)
      })
      gsap.to(".bgarment", { rotate: 8, y: -20, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom bottom", scrub: 1 } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="benefits" ref={ref} className="relative h-[460vh]" aria-label="Why rainbow.exe">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {[...Array(9)].map((_, k) => (
          <span key={k} className="bubble absolute bottom-[20%] block rounded-full border-2 border-ink/50" style={{ left: `${44 + (k % 5) * 3}%`, width: 8 + (k % 3) * 6, height: 8 + (k % 3) * 6, "--d": `${6 + (k % 4)}s`, "--delay": `${-k * 1.3}s` } as React.CSSProperties} />
        ))}
        <div className="bgarment w-[min(60vw,440px)]">
          <Garment type={hero.type} color={hero.color} className="w-full drop-shadow-[0_24px_0_rgba(14,14,14,.08)]" />
        </div>
        {CARDS.map((c, k) => (
          <article key={k} className={`bcard absolute w-[min(86vw,420px)] rounded-[28px] bg-white p-6 pb-10 text-center shadow-[0_20px_60px_rgba(14,14,14,.08)] ${c.side === "l" ? "left-[4vw] md:left-[10vw]" : "right-[4vw] md:right-[10vw]"}`} style={{ top: "12vh" }}>
            <div className="-mx-8 -mt-10 rotate-[-2deg] rounded-2xl bg-pine px-8 py-4 text-2xl font-medium tracking-wide text-white uppercase md:text-3xl">{c.title}</div>
            <p className="mx-auto mt-6 max-w-xs text-lg leading-snug">{c.copy}</p>
            <Sticker kind={c.icon} color={c.color} className="mx-auto mt-8 w-36" />
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------------- 3D tilt wrapper ---------------- */
export function Tilt({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el || reducedMotion() || !matchMedia("(pointer: fine)").matches) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      gsap.to(el, { rotateX: ((e.clientY - r.top) / r.height - 0.5) * -10, rotateY: ((e.clientX - r.left) / r.width - 0.5) * 10, transformPerspective: 900, duration: 0.4, ease: "power2.out" })
    }
    const leave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" })
    el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave)
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave) }
  }, [])
  return <div ref={ref} className={className} style={style}>{children}</div>
}

/* ---------------- fits + holographic tilt panels ---------------- */
export function Fits() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".fit-panel", { start: "top 85%", once: true, onEnter: (b) => gsap.from(b, { y: 60, opacity: 0, rotate: (i) => (i ? 3 : -3), duration: 1, stagger: 0.12, ease: "expo.out" }) })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={ref} className="px-6 py-20 md:px-10" aria-labelledby="fits-h">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <div className="relative">
          <Sticker kind="burst" className="spin-slow w-40 md:w-56" />
          <h2 id="fits-h" className="absolute inset-0 grid place-items-center text-3xl font-extrabold tracking-tight uppercase md:text-5xl">Fits</h2>
        </div>
        <div className="mt-2 flex gap-1 text-coral">{[...Array(5)].map((_, k) => <Star key={k} className="size-5 fill-current" />)}</div>
        <p className="mt-6 max-w-2xl text-2xl leading-snug md:text-3xl">Fresh, loud and a little sparkling. Eight pieces that taste like the year 2000 without the dial-up.</p>
      </div>
      <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2" style={{ perspective: 1200 }}>
        {[PRODUCTS[0], PRODUCTS[5]].map((p, k) => (
          <Tilt key={p.id} className="fit-panel holo-shimmer relative aspect-4/3 overflow-hidden rounded-[32px]" style={{ background: p.bg }}>
            <Link to={`/shop/${p.id}`} className="absolute inset-0" aria-label={`Open ${p.name}`}>
              <div className="holo hue pointer-events-none absolute inset-0 opacity-20 mix-blend-screen" />
              <Sticker kind={k ? "cloud" : "flower"} className="absolute top-6 left-6 w-32 opacity-90" />
              <Sticker kind={k ? "butterfly" : "phone"} className="absolute right-8 bottom-8 w-20" />
              <Sticker kind="sparkle" className="absolute top-10 right-16 w-8" />
              <Garment type={p.type} color={p.color} className="absolute top-1/2 left-1/2 w-[55%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_16px_0_rgba(14,14,14,.08)]" />
              <span className="absolute bottom-5 left-6 rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium backdrop-blur">{k ? "Worn on the 37th floor" : "Artistic impression"}</span>
            </Link>
          </Tilt>
        ))}
      </div>
    </section>
  )
}

/* ---------------- rolling figures ---------------- */
export function Rolling({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    if (reducedMotion()) { el.textContent = String(to); return }
    const o = { v: 0 }
    const st = ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(o, { v: to, duration: 1.4, ease: "expo.out", onUpdate: () => { el.textContent = String(Math.round(o.v)) } }) })
    return () => st.kill()
  }, [to])
  return <span ref={ref} className="tabular">0</span>
}
export function Stats() {
  return (
    <section className="px-6 pb-8 md:px-10" aria-label="Numbers">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
        {[["Pieces", 8], ["Stripes", 7], ["Families of fits", 6000], ["Year, forever", 2000]].map(([l, n]) => (
          <div key={l as string} className="rounded-3xl bg-white p-6 text-center">
            <dd className="font-wide text-[clamp(32px,4vw,56px)] leading-none font-black tracking-tight"><Rolling to={n as number} /></dd>
            <dt className="mt-2 text-sm text-muted-foreground">{l}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* ---------------- subscribe teaser / form ---------------- */
export function SubscribeForm({ className }: { className?: string }) {
  const [state, setState] = useState<"idle" | "busy" | "done">("idle")
  return (
    <form className={cn("flex max-w-xl flex-col gap-3 sm:flex-row", className)} onSubmit={(e) => { e.preventDefault(); setState("busy"); setTimeout(() => setState("done"), 700) }}>
      <label htmlFor="email" className="sr-only">Email</label>
      <Input id="email" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} required placeholder="your@email.com…" className="h-14 flex-1 rounded-full border-0 bg-white px-6 text-base text-ink" />
      <Button type="submit" disabled={state === "busy"} className="btn-3d h-14 rounded-full px-8 text-base">{state === "done" ? "You're in ✦" : state === "busy" ? "Sending…" : "Subscribe"}</Button>
      <p className="sr-only" aria-live="polite">{state === "done" ? "Subscribed." : ""}</p>
    </form>
  )
}
export function SubscribeTeaser() {
  return (
    <section className="px-6 py-20 md:px-10" aria-labelledby="sub-h">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-navy px-8 py-16 text-center text-white md:px-16 md:py-24">
        <Sticker kind="sparkle" className="absolute top-8 left-10 w-10 opacity-80" />
        <Sticker kind="sparkle" className="absolute right-16 bottom-10 w-14 opacity-80" />
        <Sticker kind="star" className="float absolute bottom-6 left-[14%] w-16 opacity-90" />
        <Sticker kind="cloud" color="#3b4190" className="absolute -top-6 -right-10 w-56" />
        <p className="font-pixel text-2xl tracking-wide opacity-90 uppercase">Subscription</p>
        <h2 id="sub-h" className="mt-4 text-[clamp(32px,5vw,72px)] leading-[0.98] font-normal tracking-tight uppercase">Save 10% on every drop<br />with automatic delivery</h2>
        <div className="mt-10 flex justify-center"><SubscribeForm /></div>
        <p className="mt-6 text-sm opacity-70">*Delivery by space shuttle where available. <Link to="/subscribe" className="underline">See the tiers</Link>.</p>
      </div>
    </section>
  )
}

/* ---------------- closing: page tiles ---------------- */
const TILES: { to: string; label: string; kind: StickerKind; bg: string }[] = [
  { to: "/shop", label: "Shop the drop", kind: "star", bg: "#B5DAF2" },
  { to: "/learn", label: "What is Y2K?", kind: "cd", bg: "#CDB4E6" },
  { to: "/play", label: "Play the game", kind: "butterfly", bg: "#BFE3B2" },
  { to: "/subscribe", label: "Join a tier", kind: "smiley", bg: "#F3E3A5" },
]
export function Closing() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(".close-line", { yPercent: 100, duration: 1, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%", once: true } })
      ScrollTrigger.batch(".tile", { start: "top 90%", once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "expo.out" }) })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={ref} className="px-6 pt-10 pb-20 md:px-10" aria-labelledby="close-h">
      <h2 id="close-h" className="mx-auto max-w-6xl text-center text-[clamp(56px,11vw,190px)] leading-[0.86] font-normal tracking-[-0.04em] uppercase">
        {["We have", "what you", "need"].map((l) => <span key={l} className="block overflow-hidden"><span className="close-line block">{l}</span></span>)}
      </h2>
      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
        {TILES.map((t) => (
          <Link key={t.to} to={t.to} className="tile group holo-shimmer relative aspect-square translate-y-8 overflow-hidden rounded-[28px] opacity-0" style={{ background: t.bg }}>
            <Sticker kind={t.kind} className="mx-auto mt-[14%] w-[52%] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
            <span className="absolute inset-x-4 bottom-4 rounded-full bg-white/85 px-4 py-2 text-center text-sm font-semibold backdrop-blur md:text-base">{t.label} →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function Feed() {
  const kinds: StickerKind[] = ["flower", "smiley", "cd", "butterfly"]
  return (
    <section className="px-6 pb-24 md:px-10" aria-labelledby="feed-h">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="feed-h" className="text-3xl font-semibold tracking-tight md:text-4xl">@rainbow.exe</h2>
          <p className="text-muted-foreground">Follow us. We post fits, and occasionally the truth.</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {kinds.map((k, i) => (
            <div key={k} className="holo-shimmer relative aspect-square overflow-hidden rounded-[24px]" style={{ background: PRODUCTS[(i * 2 + 1) % 8].bg }}>
              <Sticker kind={k} className="float absolute top-1/2 left-1/2 w-[55%] -translate-x-1/2 -translate-y-1/2" />
              <Garment type={PRODUCTS[(i * 2) % 8].type} color={PRODUCTS[(i * 2) % 8].color} className="absolute right-3 bottom-3 w-[34%] rotate-12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- footer ---------------- */
export function Footer() {
  const [hits, setHits] = useState(137420)
  useEffect(() => {
    const id = setInterval(() => setHits((h) => h + 1 + Math.floor(Math.random() * 3)), 2500 + Math.random() * 4000)
    return () => clearInterval(id)
  }, [])
  const cols: [string, [string, string][]][] = [
    ["Shop", [["All pieces", "/shop"], ...PRODUCTS.slice(0, 4).map((p) => [p.name, `/shop/${p.id}`] as [string, string])]],
    ["Learn", [["What is Y2K?", "/learn"], ["Questions", "/faq"], ["Subscription", "/subscribe"], ["Play", "/play"]]],
  ]
  return (
    <footer className="border-t border-ink/10 px-6 pt-16 pb-10 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-wide chrome-text text-[36px] font-black tracking-[-0.05em]" translate="no">rainbow.exe</p>
          <p className="mt-3 max-w-sm text-muted-foreground">Made in Pune, worn everywhere. A rainbow of fits for people who remember dial-up, and people who don't.</p>
          <div className="mt-6 inline-flex flex-col gap-2">
            <span className="font-pixel text-lg text-muted-foreground">HIT COUNTER</span>
            <span className="font-pixel tabular inline-block w-fit border-2 border-ink bg-ink px-3 py-1 text-3xl tracking-[.2em] text-[#9f9]">{String(hits).padStart(9, "0")}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 font-pixel text-base leading-none">
            <span className="border-2 border-ink bg-sky px-2 py-1">BEST VIEWED<br />800×600</span>
            <span className="border-2 border-ink bg-sun px-2 py-1">NETSCAPE<br />NOW!</span>
            <span className="border-2 border-ink bg-coral px-2 py-1 text-white">MADE W/ ♥<br />IN 2000</span>
          </div>
        </div>
        {cols.map(([h, links]) => (
          <nav key={h} aria-label={h}>
            <p className="mb-3 text-sm font-semibold tracking-[.2em] text-muted-foreground uppercase">{h}</p>
            <ul className="space-y-2 text-lg">
              {links.map(([l, to]) => <li key={to}><Link to={to} className="hover:underline">{l}</Link></li>)}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto mt-14 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6 text-sm text-muted-foreground">
        <p>2026 © rainbow.exe</p>
        <div className="flex gap-6"><Link to="/faq" className="hover:text-ink">Terms of use</Link><Link to="/faq" className="hover:text-ink">Refund policy</Link></div>
        <p>Design, front-end, illustrations and the game by rainbow.exe studio.</p>
      </div>
    </footer>
  )
}
