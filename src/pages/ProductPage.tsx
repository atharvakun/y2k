import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Garment } from "@/components/Garment"
import { Sticker } from "@/components/Sticker"
import { Window } from "@/components/Window"
import { Butterfly } from "@/components/Butterfly"
import { useCart } from "@/components/cart"
import { ProductCard, tierCls } from "@/components/Shop"
import { Tilt } from "@/components/Sections"
import { PRODUCTS, SIZES, fmt } from "@/lib/products"
import { gsap, reducedMotion } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import NotFound from "@/pages/NotFound"

export default function ProductPage() {
  const { id } = useParams()
  const product = PRODUCTS.find((p) => String(p.id) === id)
  const { add } = useCart()
  const [size, setSize] = useState("M")
  const [qty, setQty] = useState(1)
  const [alt, setAlt] = useState(false)
  const [added, setAdded] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => { setSize("M"); setQty(1); setAlt(false); setAdded(false) }, [id])
  useEffect(() => { if (product) document.documentElement.style.setProperty("--hero-bg", product.bg) }, [product])
  useEffect(() => {
    if (!ref.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(".pp-stage", { scale: 0.9, opacity: 0, duration: 0.9, ease: "expo.out" })
      gsap.from(".pp-garment", { y: 80, rotate: -14, scale: 0.6, duration: 1.1, ease: "back.out(1.5)", delay: 0.1 })
      gsap.from(".pp-deco", { scale: 0, opacity: 0, duration: 0.8, stagger: 0.08, ease: "back.out(2)", delay: 0.4 })
      gsap.from(".pp-rise", { y: 24, opacity: 0, duration: 0.7, stagger: 0.07, ease: "expo.out", delay: 0.3 })
    }, ref)
    return () => ctx.revert()
  }, [id])

  if (!product) return <NotFound />
  const others = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <>
      <Butterfly delay={1.5} />
      <section ref={ref} className="px-6 pt-32 pb-16 md:px-10 md:pt-40" aria-labelledby="pp-h">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-start">
          <Tilt className="pp-stage holo-shimmer relative aspect-square overflow-hidden rounded-[40px] md:sticky md:top-32" style={{ background: product.bg }}>
            <div className="holo hue pointer-events-none absolute inset-0 opacity-20 mix-blend-screen" />
            <Sticker kind="flower" className="pp-deco float absolute top-6 left-6 w-28" />
            <Sticker kind="butterfly" className="pp-deco float absolute top-10 right-10 w-16" />
            <Sticker kind="cd" className="pp-deco spin-slow absolute bottom-10 left-10 w-20" />
            <Sticker kind="sparkle" className="pp-deco absolute right-16 bottom-16 w-8" />
            <button className="absolute inset-0" onClick={() => setAlt((v) => !v)} aria-label={alt ? "Show front" : "Show back"}>
              <Garment type={product.type} color={product.color} alt={alt} className="pp-garment absolute inset-[14%] drop-shadow-[0_24px_0_rgba(14,14,14,.10)] transition-transform duration-500 hover:scale-105" />
            </button>
            <span className="absolute bottom-5 left-6 rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium backdrop-blur">{alt ? "Back" : "Front"} · tap to flip</span>
            <span className="absolute top-5 right-6 grid size-20 place-items-center">
              <Sticker kind="burst" color="#F26B5B" className="wobble absolute inset-0 w-full" />
              <span className="font-pixel relative text-lg text-white">NEW!!</span>
            </span>
          </Tilt>

          <div>
            <nav className="pp-rise text-sm font-medium text-ink/70" aria-label="Breadcrumb"><Link to="/" className="hover:underline">Home</Link> / <Link to="/shop" className="hover:underline">Shop</Link> / {product.name}</nav>
            <Badge className={cn("pp-rise mt-4 rounded-full border-0", tierCls[product.tier])}>{product.tier} · {product.sku}</Badge>
            <h1 id="pp-h" className="pp-rise mt-3 text-[clamp(40px,6vw,80px)] leading-[0.95] font-normal tracking-[-0.03em] uppercase">{product.name}</h1>
            <p className="pp-rise mt-2 text-xl text-muted-foreground">{product.kind}</p>
            <p className="pp-rise mt-5 text-xl leading-snug md:text-2xl">{product.blurb}</p>
            <p className="pp-rise tabular mt-6 font-wide text-4xl font-black">{fmt(product.price)}</p>

            <fieldset className="pp-rise mt-8">
              <legend className="text-sm font-medium text-muted-foreground">Size</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button key={s} type="button" onClick={() => setSize(s)} aria-pressed={size === s} className={cn("h-12 min-w-14 rounded-full border px-4 text-base font-medium transition-colors", size === s ? "border-navy bg-navy text-white" : "border-ink/15 bg-white hover:border-ink/40")}>{s}</button>
                ))}
              </div>
            </fieldset>

            <div className="pp-rise mt-6 flex flex-wrap items-center gap-3">
              <div className="flex h-14 items-center rounded-full bg-white" role="group" aria-label="Quantity">
                <button className="size-14 text-xl" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <span className="tabular w-8 text-center text-lg font-semibold" aria-live="polite">{qty}</span>
                <button className="size-14 text-xl" onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase quantity">+</button>
              </div>
              <Button className="btn-3d h-14 flex-1 rounded-full px-8 text-base" onClick={() => { for (let k = 0; k < qty; k++) add(product, size); setAdded(true) }}>
                {added ? "Added ✦ Add again" : "Add to bag"}
              </Button>
            </div>

            <div className="pp-rise mt-8 grid gap-4 sm:grid-cols-2">
              <Window title="material.txt" bar="bg-sky"><p className="font-semibold">{product.mat}</p><p className="mt-1 text-sm text-muted-foreground">Deadstock where possible. Chrome where necessary.</p></Window>
              <Window title="fit.txt" bar="bg-sun"><p className="font-semibold">{product.fit}</p><p className="mt-1 text-sm text-muted-foreground">Model is 5'9" and wears M, emotionally.</p></Window>
            </div>

            <Accordion className="pp-rise mt-8 rounded-3xl bg-white px-6">
              {[
                ["Shipping", "3 to 5 business days across India. Free over ₹2000 in Pune and Mumbai."],
                ["Returns", "14 days, chrome intact, tags on. No refunds on vibes."],
                ["Why the tier?", `${product.tier} describes how shiny it is and how early members hear about restocks.`],
              ].map(([q, a]) => (
                <AccordionItem key={q} value={q}><AccordionTrigger className="text-lg">{q}</AccordionTrigger><AccordionContent className="text-base">{a}</AccordionContent></AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10" aria-labelledby="more-h">
        <div className="mx-auto max-w-6xl">
          <h2 id="more-h" className="text-3xl font-semibold tracking-tight md:text-4xl">Also in Drop 01</h2>
          <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">{others.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        </div>
      </section>
    </>
  )
}
