import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Garment } from "@/components/Garment"
import { useCart } from "@/components/cart"
import { PRODUCTS, fmt, type Product, type Tier } from "@/lib/products"
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap"
import { cn } from "@/lib/utils"

const TIERS: ("All" | Tier)[] = ["All", "Silver", "Gold", "Platinum", "Diamond"]
export const tierCls: Record<Tier, string> = {
  Silver: "bg-[#e9ebee] text-ink",
  Gold: "bg-[linear-gradient(180deg,#fff2b0,#e3b63a_50%,#fff2b0)] text-ink",
  Platinum: "chrome-fill text-ink",
  Diamond: "holo text-ink",
}

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart()
  const nav = useNavigate()
  return (
    <Card className="pcard group holo-shimmer gap-0 overflow-hidden rounded-[28px] border-0 bg-white p-0 shadow-[0_2px_0_rgba(14,14,14,.05)] transition-shadow hover:shadow-[0_16px_40px_rgba(14,14,14,.08)]">
      <button className="relative block aspect-square w-full cursor-pointer overflow-hidden" style={{ background: p.bg }} onClick={() => nav(`/shop/${p.id}`)} aria-label={`Open ${p.name}`}>
        <Garment type={p.type} color={p.color} className="absolute inset-[12%] transition-all duration-500 group-hover:scale-90 group-hover:opacity-0" />
        <Garment type={p.type} color={p.color} alt className="absolute inset-[12%] scale-110 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />
        <Badge className={cn("absolute top-3 left-3 rounded-full border-0", tierCls[p.tier])}>{p.tier}</Badge>
      </button>
      <CardContent className="flex-1 px-4 pt-4 pb-0">
        <p className="text-lg leading-tight font-semibold">{p.name}</p>
        <p className="text-sm text-muted-foreground">{p.kind}</p>
        <p className="tabular mt-2 font-semibold">{fmt(p.price)}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-4 pt-3 pb-4">
        <Link to={`/shop/${p.id}`} className="inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap underline-offset-4 hover:underline">
          Discover<span className="hidden sm:inline"> this product</span> <ArrowRight className="size-4" />
        </Link>
        <Button size="icon" aria-label={`Add ${p.name} to bag`} className="size-9 rounded-full" onClick={() => add(p)}><Plus /></Button>
      </CardFooter>
    </Card>
  )
}

/* ---------------- product grid, optional filters and limit ---------------- */
export function ProductGrid({ limit, filters = false, title = "Recommended fits" }: { limit?: number; filters?: boolean; title?: string }) {
  const ref = useRef<HTMLElement>(null)
  const [tier, setTier] = useState<"All" | Tier>("All")
  const list = PRODUCTS.filter((p) => tier === "All" || p.tier === tier).slice(0, limit ?? PRODUCTS.length)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      if (reducedMotion()) { gsap.set(".pcard", { opacity: 1, y: 0 }); return }
      gsap.set(".pcard", { opacity: 0, y: 30, rotate: -2 })
      ScrollTrigger.batch(".pcard", { start: "top 92%", once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, rotate: 0, duration: 0.8, stagger: 0.08, ease: "expo.out" }) })
      ScrollTrigger.refresh()
    }, ref)
    return () => ctx.revert()
  }, [tier, limit])

  return (
    <section id="shop" ref={ref} className="px-6 py-20 md:px-10" aria-labelledby="shop-h">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="shop-h" className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
          {filters ? (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tier">
              {TIERS.map((t) => (
                <button key={t} onClick={() => setTier(t)} aria-pressed={tier === t} className={cn("h-10 rounded-full px-4 text-sm font-medium transition-colors", tier === t ? "bg-navy text-white" : "bg-white text-ink hover:bg-white/80")}>{t}</button>
              ))}
            </div>
          ) : <p className="text-muted-foreground">Drop 01 · {PRODUCTS.length} pieces</p>}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        {limit && (
          <div className="mt-10 text-center">
            <Link to="/shop" className="inline-flex h-14 items-center rounded-full border border-ink/20 px-8 text-base font-medium hover:bg-white">See all our products</Link>
          </div>
        )}
      </div>
    </section>
  )
}
