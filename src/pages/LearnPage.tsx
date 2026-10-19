import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { PageHeader } from "@/components/PageHeader"
import { Butterfly } from "@/components/Butterfly"
import { Window } from "@/components/Window"
import { Sticker, type StickerKind } from "@/components/Sticker"
import { Benefits, Tilt, Ticker } from "@/components/Sections"
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap"

const STEPS = [
  { year: "1999", title: "The whole planet stayed up.", copy: "Computers stored years as two digits. At midnight, 99 would become 00, and nobody knew what that meant. People bought tinned food and butterfly clips." },
  { year: "2000", title: "Nothing happened.", copy: "The lights stayed on. The fits stayed loud. A generation had dressed for the end of the world and had to keep wearing it on Monday." },
  { year: "2001", title: "Then it became an aesthetic.", copy: "Chrome, low-rise, baby tees, frosted everything. Optimism you could wear, with a flip phone in the pocket." },
  { year: "2026", title: "Then it came back.", copy: "Because it never really left. rainbow.exe is eight pieces from the night the computers didn't die." },
]

const GLOSSARY: { term: string; def: string; kind: StickerKind; bar: string }[] = [
  { term: "Butterfly clip", def: "A hair clip shaped like a butterfly. Minimum three per head. Non-negotiable.", kind: "butterfly", bar: "bg-lilac" },
  { term: "Low-rise", def: "A waistband that sits where it wants. Pairs with a baby tee and confidence.", kind: "star", bar: "bg-sky" },
  { term: "Chrome", def: "Anything mirror-finished. Visors, bags, nails, the future.", kind: "cd", bar: "bg-white" },
  { term: "Flip phone", def: "A phone that closes with a snap. The most satisfying sound of the millennium.", kind: "phone", bar: "bg-grass" },
  { term: "Dial-up", def: "Forty seconds of screeching before the internet. Character-building.", kind: "burst", bar: "bg-sun" },
  { term: "Baby tee", def: "A tee, but smaller. Often with a single word on it. Ours says RAINBOW.", kind: "smiley", bar: "bg-coral" },
]

function Timeline() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".tl-step")
      if (reducedMotion()) { gsap.set(steps, { opacity: 1 }); return }
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom bottom", scrub: 0.6 } })
      steps.forEach((s, k) => {
        if (k === 0) gsap.set(s, { opacity: 1, y: 0 })
        else tl.fromTo(s, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6 }, k * 2)
        if (k < steps.length - 1) tl.to(s, { opacity: 0, y: -40, duration: 0.6 }, k * 2 + 1.4)
      })
      gsap.to(".tl-ring", { rotate: 360, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom bottom", scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={ref} className="relative h-[400vh]" aria-label="A short history of Y2K">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        <Sticker kind="burst" className="tl-ring pointer-events-none absolute top-1/2 left-1/2 w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 opacity-40" />
        {STEPS.map((s) => (
          <article key={s.year} className="tl-step absolute mx-auto max-w-3xl text-center opacity-0">
            <p className="font-wide chrome-text text-[clamp(96px,22vw,320px)] leading-none font-black tracking-[-0.06em]">{s.year}</p>
            <h3 className="mt-2 text-[clamp(28px,4vw,56px)] leading-tight font-normal tracking-tight uppercase">{s.title}</h3>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-snug md:text-xl">{s.copy}</p>
          </article>
        ))}
        <p className="font-pixel absolute bottom-8 text-xl text-muted-foreground">Keep scrolling ↓</p>
      </div>
    </section>
  )
}

function Glossary() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".gl-card", { start: "top 88%", once: true, onEnter: (b) => gsap.from(b, { y: 60, rotate: (i) => (i % 2 ? 4 : -4), opacity: 0, duration: 0.9, stagger: 0.1, ease: "back.out(1.4)" }) })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={ref} className="px-6 py-20 md:px-10" aria-labelledby="gl-h">
      <div className="mx-auto max-w-6xl">
        <h2 id="gl-h" className="text-center text-[clamp(36px,6vw,96px)] leading-[0.98] font-normal tracking-[-0.03em] uppercase">The glossary</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-xl">Six words you need before the drop opens.</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
          {GLOSSARY.map((g) => (
            <Tilt key={g.term} className="gl-card">
              <Window title={`${g.term.toLowerCase().replace(/ /g, "_")}.txt`} bar={g.bar} className="h-full" bodyClass="flex items-start gap-4">
                <Sticker kind={g.kind} className="w-16 shrink-0" />
                <div><p className="text-xl font-semibold">{g.term}</p><p className="mt-1 text-muted-foreground">{g.def}</p></div>
              </Window>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function LearnPage() {
  return (
    <>
      <PageHeader
        kicker="Learn" title="What is Y2K anyway?" bg="#CDB4E6"
        lead="A short history of the night the computers didn't die, and the clothes we've been wearing since."
        decos={[
          { kind: "cd", cls: "left-[8%] top-[22%] w-24 md:w-40", r: 10, d: 7 },
          { kind: "phone", cls: "right-[10%] top-[40%] w-12 md:w-20", r: -10 },
          { kind: "butterfly", cls: "left-[22%] bottom-[16%] w-14 md:w-20", r: 12, d: 5 },
          { kind: "burst", cls: "right-[22%] bottom-[10%] w-24 md:w-40", r: -14, d: 8 },
          { kind: "cloud", cls: "left-[4%] bottom-[6%] w-32 md:w-48" },
          { kind: "sparkle", cls: "right-[40%] top-[32%] w-8 md:w-12" },
        ]}
      />
      <Butterfly />
      <Timeline />
      <Ticker items={["Butterfly clips", "Low-rise", "Chrome", "Flip phones", "Frosted tips", "Dial-up", "Baby tees", "Inflatable chairs"]} />
      <Glossary />
      <Benefits />
      <section className="px-6 py-20 text-center md:px-10">
        <p className="text-2xl md:text-3xl">Now you know the real things.</p>
        <Link to="/shop" className="btn-3d mt-6 inline-flex h-16 items-center rounded-full bg-navy px-10 text-xl font-medium text-white">Open the drop</Link>
      </section>
    </>
  )
}
