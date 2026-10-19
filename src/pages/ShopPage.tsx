import { PageHeader } from "@/components/PageHeader"
import { Butterfly } from "@/components/Butterfly"
import { ProductGrid } from "@/components/Shop"
import { Ticker, SubscribeTeaser } from "@/components/Sections"
import { Window } from "@/components/Window"
import { Sticker } from "@/components/Sticker"

export default function ShopPage() {
  return (
    <>
      <PageHeader
        kicker="Drop 01 · 8 pieces" title="Shop the drop" bg="#B5DAF2"
        lead="Everything from Drop 01, sorted by how shiny it is. Sizes XS to 2K."
        decos={[
          { kind: "star", cls: "left-[6%] top-[26%] w-24 md:w-40", r: -12, d: 7 },
          { kind: "cd", cls: "right-[8%] top-[20%] w-20 md:w-32", r: 10 },
          { kind: "butterfly", cls: "left-[20%] bottom-[18%] w-14 md:w-20", r: 15, d: 5 },
          { kind: "phone", cls: "right-[20%] bottom-[14%] w-10 md:w-16", r: -8 },
          { kind: "cloud", cls: "left-[34%] bottom-[6%] w-32 md:w-48" },
          { kind: "sparkle", cls: "left-[40%] top-[30%] w-8 md:w-12" },
        ]}
      />
      <Butterfly />
      <Ticker items={["Free shipping over ₹2000", "Returns within 14 days", "Chrome intact", "No refunds on vibes", "Sizes XS to 2K"]} />
      <ProductGrid filters title="All eight pieces" />
      <section className="px-6 pb-20 md:px-10" aria-label="Size guide">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <Window title="size_guide.txt" bar="bg-sky">
            <p className="text-lg font-semibold">2K is real.</p>
            <p className="mt-2 text-muted-foreground">It sits one step above XL and one step below "hood big enough to live in". When in doubt, size up; the year 2000 was oversized.</p>
          </Window>
          <Window title="care.txt" bar="bg-sun">
            <p className="text-lg font-semibold">Wash cold, hang dry.</p>
            <p className="mt-2 text-muted-foreground">Chrome hardware hates tumble dryers. Butterfly clips should be removed before washing, and before swimming, and before arguments.</p>
          </Window>
          <Window title="shipping.txt" bar="bg-grass" bodyClass="relative">
            <Sticker kind="star" className="float absolute -top-4 right-3 w-12" />
            <p className="text-lg font-semibold">3 to 5 business days.</p>
            <p className="mt-2 text-muted-foreground">Free over ₹2000 in Pune and Mumbai. Everywhere else in India, a very fast scooter.</p>
          </Window>
        </div>
      </section>
      <SubscribeTeaser />
    </>
  )
}
