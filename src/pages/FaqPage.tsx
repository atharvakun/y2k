import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageHeader } from "@/components/PageHeader"
import { Butterfly } from "@/components/Butterfly"
import { Window } from "@/components/Window"
import { Sticker } from "@/components/Sticker"

const QA = [
  ["Is it really the year 2000?", "Spiritually, yes. Our clock has said 2000 since launch and we see no reason to fix it."],
  ["Shipping and returns", "Free shipping over ₹2000 in Pune and Mumbai, 3 to 5 business days across India. Returns within 14 days, chrome intact, no refunds on vibes."],
  ["What are the tiers?", "Silver, Gold, Platinum and Diamond. They describe how early you hear about drops and how shiny your keychain is."],
  ["Where are the products photographed?", "They aren't, yet. Every piece is drawn. Real photos arrive with Drop 02; the drawings stay because we like them."],
  ["How do I win the game?", "You don't. You get a higher number than last time, which is also how the year 2000 worked."],
  ["Terms of use and refund policy", "Be nice, pay what it says, return within 14 days. The long version is the same thing with more commas."],
]

export default function FaqPage() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <PageHeader
        kicker="Questions" title="Ask us anything" bg="#F7C3A8"
        lead="The things people actually ask, and a form for the things they don't."
        decos={[
          { kind: "smiley", cls: "left-[8%] top-[24%] w-20 md:w-32", r: 8, d: 6 },
          { kind: "heart", cls: "right-[10%] top-[22%] w-16 md:w-24", r: -12, d: 5 },
          { kind: "cloud", cls: "left-[28%] bottom-[8%] w-32 md:w-48" },
          { kind: "butterfly", cls: "right-[28%] bottom-[14%] w-14 md:w-20", r: 10 },
          { kind: "sparkle", cls: "left-[22%] bottom-[16%] w-8 md:w-12" },
        ]}
      />
      <Butterfly />
      <section className="px-6 py-20 md:px-10" aria-labelledby="faq-h">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 id="faq-h" className="mb-4 text-3xl font-semibold tracking-tight">FAQ</h2>
            <Accordion className="rounded-3xl bg-white px-6">
              {QA.map(([q, a]) => <AccordionItem key={q} value={q}><AccordionTrigger className="text-lg">{q}</AccordionTrigger><AccordionContent className="text-base">{a}</AccordionContent></AccordionItem>)}
            </Accordion>
          </div>
          <div className="space-y-6">
            <Window title="contact.exe" bar="bg-lilac">
              {sent ? (
                <div className="text-center"><Sticker kind="smiley" className="mx-auto w-20" /><p className="mt-3 text-lg font-semibold">Sent. We reply within one business millennium.</p></div>
              ) : (
                <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                  <label className="block text-sm font-medium" htmlFor="c-name">Name</label>
                  <Input id="c-name" name="name" autoComplete="name" required placeholder="Your name…" className="h-12 rounded-full bg-cream" />
                  <label className="block text-sm font-medium" htmlFor="c-email">Email</label>
                  <Input id="c-email" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} required placeholder="you@example.com…" className="h-12 rounded-full bg-cream" />
                  <label className="block text-sm font-medium" htmlFor="c-msg">Message</label>
                  <textarea id="c-msg" name="message" required rows={4} placeholder="Tell us the real things…" className="w-full rounded-2xl border border-input bg-cream px-4 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-navy" />
                  <Button type="submit" className="btn-3d h-12 w-full rounded-full">Send</Button>
                </form>
              )}
            </Window>
            <Window title="office.txt" bar="bg-grass">
              <p className="font-semibold">hello@rainbow.exe</p>
              <p className="mt-1 text-muted-foreground">Office No. 2000, 3rd floor, Rainbow Plaza, near 18 Latitude, Pune. Open whenever the computers are.</p>
            </Window>
          </div>
        </div>
      </section>
    </>
  )
}
