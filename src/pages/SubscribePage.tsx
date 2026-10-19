import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageHeader } from "@/components/PageHeader"
import { Butterfly } from "@/components/Butterfly"
import { Sticker, type StickerKind } from "@/components/Sticker"
import { SubscribeForm, Tilt, Rolling } from "@/components/Sections"
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap"
import { cn } from "@/lib/utils"

const TIERS: { name: string; price: string; drip: number; perks: string[]; cls: string; kind: StickerKind }[] = [
  { name: "Silver", price: "Free", drip: 667, perks: ["Early access from minute one", "One butterfly clip", "Guestbook rights"], cls: "bg-[#e9ebee]", kind: "star" },
  { name: "Gold", price: "₹999 / yr", drip: 694, perks: ["A day ahead of everyone", "Three butterfly clips", "Birthday pop-up"], cls: "bg-[linear-gradient(180deg,#fff2b0,#e3b63a_50%,#fff2b0)]", kind: "smiley" },
  { name: "Platinum", price: "₹2,499 / yr", drip: 715, perks: ["Three days ahead", "Chrome keychain", "Your name in the ticker"], cls: "chrome-fill", kind: "cd" },
  { name: "Diamond", price: "₹7,777 / yr", drip: 755, perks: ["You hear first, always", "Walk-in wardrobe (metaphorical)", "We text you at 23:59"], cls: "holo hue", kind: "butterfly" },
]

export default function SubscribePage() {
  const ref = useRef<HTMLElement>(null)
  const [joined, setJoined] = useState<string | null>(null)
  useEffect(() => {
    if (!ref.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".tier-card", { start: "top 85%", once: true, onEnter: (b) => gsap.from(b, { y: 80, rotateY: -30, opacity: 0, duration: 1, stagger: 0.12, ease: "expo.out" }) })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <PageHeader
        kicker="Subscription" title="Save 10% every drop" bg="#F3E3A5"
        lead="Automatic delivery, one message per drop, and a tier named after a floor plan that was never finished."
        decos={[
          { kind: "smiley", cls: "left-[8%] top-[24%] w-20 md:w-32", r: -8, d: 6 },
          { kind: "star", cls: "right-[8%] top-[22%] w-20 md:w-36", r: 12, d: 7 },
          { kind: "sparkle", cls: "left-[30%] top-[10%] w-8 md:w-12" },
          { kind: "butterfly", cls: "right-[26%] bottom-[14%] w-14 md:w-20", r: -10, d: 5 },
          { kind: "flower", cls: "left-[20%] bottom-[12%] w-20 md:w-32", r: 6 },
        ]}
      >
        <SubscribeForm />
      </PageHeader>
      <Butterfly />

      <section ref={ref} className="px-6 py-20 md:px-10" aria-labelledby="tiers-h">
        <div className="mx-auto max-w-6xl">
          <h2 id="tiers-h" className="text-center text-[clamp(36px,6vw,96px)] leading-[0.98] font-normal tracking-[-0.03em] uppercase">Pick how early you want to know</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: 1400 }}>
            {TIERS.map((t) => (
              <Tilt key={t.name} className="tier-card">
                <div className={cn("holo-shimmer relative flex h-full flex-col overflow-hidden rounded-[28px] border-[3px] border-ink p-6 shadow-[6px_6px_0_#0e0e0e]", t.cls)}>
                  <Sticker kind={t.kind} className="float absolute top-4 right-4 w-14" />
                  <p className="font-wide text-2xl font-black tracking-tight">{t.name}</p>
                  <p className="tabular mt-1 text-4xl font-semibold"><Rolling to={t.drip} /><span className="ml-1 text-xs font-medium uppercase">sq.ft of drip</span></p>
                  <ul className="mt-5 space-y-2 text-base">{t.perks.map((p) => <li key={p} className="flex gap-2"><span className="text-coral">✦</span>{p}</li>)}</ul>
                  <p className="mt-auto pt-6 text-xl font-semibold">{t.price}</p>
                  <Button className="btn-3d mt-3 h-12 rounded-full" variant={joined === t.name ? "secondary" : "default"} onClick={() => setJoined(t.name)}>
                    {joined === t.name ? "Joined ✦" : `Join ${t.name}`}
                  </Button>
                </div>
              </Tilt>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground" aria-live="polite">{joined ? `Welcome to ${joined}. Possession: immediate, subject to vibes.` : "Nothing in the tiers is required to buy anything."}</p>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10" aria-labelledby="sq-h">
        <div className="mx-auto max-w-3xl">
          <h2 id="sq-h" className="mb-4 text-3xl font-semibold tracking-tight">Subscription questions</h2>
          <Accordion className="rounded-3xl bg-white px-6">
            {[
              ["Can I pause?", "Yes. Pause, skip a drop, or cancel from the email we send. No forms, no sad music."],
              ["What arrives automatically?", "One piece per drop in your size, picked by you ahead of time. Surprise mode is optional and dangerous."],
              ["Does Diamond actually text me?", "At 23:59 the night before a drop. Once. We are not monsters."],
            ].map(([q, a]) => <AccordionItem key={q} value={q}><AccordionTrigger className="text-lg">{q}</AccordionTrigger><AccordionContent className="text-base">{a}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>
    </>
  )
}
