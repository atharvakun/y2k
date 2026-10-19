import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { ChevronDown, Menu, ShoppingCart, UserRound, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useCart } from "@/components/cart"
import { PRODUCTS } from "@/lib/products"
import { cn } from "@/lib/utils"

const pill = "h-12 rounded-full bg-white px-5 text-base font-medium text-ink pill-shadow hover:bg-white/90 active:translate-y-px"
const PAGES: [string, string][] = [["Learn", "/learn"], ["Subscription", "/subscribe"], ["Play", "/play"], ["Questions", "/faq"]]

export function Nav() {
  const { count, setOpen } = useCart()
  const nav = useNavigate()
  const [bar, setBar] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const f = () => setScrolled(scrollY > 40)
    f(); addEventListener("scroll", f, { passive: true })
    return () => removeEventListener("scroll", f)
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-40">
      {bar && (
        <div className="relative bg-navy px-10 py-2 text-center text-[13px] font-medium tracking-wide text-white uppercase">
          <span className="blink text-sun">●</span>&nbsp; Free shipping on all purchases of ₹2000 or more · Pune and Mumbai
          <button aria-label="Close announcement" onClick={() => setBar(false)} className="absolute top-1/2 right-4 -translate-y-1/2 opacity-80 hover:opacity-100"><X className="size-4" /></button>
        </div>
      )}

      <header className={cn("relative transition-[background-color,border-radius] duration-500", scrolled && "bg-(--hero-bg) rounded-b-[48px] shadow-[0_6px_0_rgba(14,14,14,.04)]")}>
        <div className="mx-auto flex h-22 max-w-350 items-center justify-between px-6 md:px-10">
          <Link to="/" className="font-wide chrome-text text-[22px] font-black tracking-[-0.04em] md:text-[26px]" translate="no">rainbow.exe</Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(pill, "inline-flex items-center gap-1.5")}>Shop <ChevronDown className="size-4" /></DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 rounded-2xl p-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Drop 01</DropdownMenuLabel>
                  {PRODUCTS.map((p) => (
                    <DropdownMenuItem key={p.id} className="rounded-xl" onClick={() => nav(`/shop/${p.id}`)}>
                      <span className="size-3 rounded-full" style={{ background: p.color }} /> {p.name}
                      <span className="ml-auto text-xs text-muted-foreground">{p.kind}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="rounded-xl" onClick={() => nav("/shop")}>See all our products</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {PAGES.map(([l, to]) => (
              <NavLink key={to} to={to} className={({ isActive }) => cn(pill, "inline-flex items-center", isActive && "bg-navy text-white hover:bg-navy")}>{l}</NavLink>
            ))}

            <Tooltip>
              <TooltipTrigger aria-label="Account" render={<Button className={cn(pill, "size-12 px-0")} variant="secondary" />}><UserRound className="size-5" /></TooltipTrigger>
              <TooltipContent>Accounts open in Y2K+27</TooltipContent>
            </Tooltip>
            <Button className={cn(pill, "relative size-12 px-0")} variant="secondary" aria-label="Open bag" onClick={() => setOpen(true)}>
              <ShoppingCart className="size-5" />
              {count > 0 && <span className="tabular absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-navy text-xs font-bold text-white">{count}</span>}
            </Button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <Button className={cn(pill, "relative size-12 px-0")} variant="secondary" aria-label="Open bag" onClick={() => setOpen(true)}>
              <ShoppingCart className="size-5" />
              {count > 0 && <span className="tabular absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-navy text-xs font-bold text-white">{count}</span>}
            </Button>
            <Button className={cn(pill, "size-12 px-0")} variant="secondary" aria-label="Menu" onClick={() => setMenu(true)}><Menu className="size-5" /></Button>
          </div>
        </div>
      </header>

      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="left" className="bg-cream" data-lenis-prevent>
          <SheetHeader><SheetTitle className="font-wide text-2xl font-black tracking-tight">rainbow.exe</SheetTitle></SheetHeader>
          <nav className="flex flex-col gap-2 px-4 text-xl font-medium" aria-label="Mobile">
            {[["Home", "/"], ["Shop", "/shop"], ...PAGES].map(([l, to]) => (
              <NavLink key={to} to={to} onClick={() => setMenu(false)} className={({ isActive }) => cn("rounded-full bg-white px-5 py-3", isActive && "bg-navy text-white")}>{l}</NavLink>
            ))}
            <p className="mt-4 px-2 text-sm text-muted-foreground">Drop 01</p>
            {PRODUCTS.map((p) => (
              <Link key={p.id} to={`/shop/${p.id}`} onClick={() => setMenu(false)} className="flex items-center gap-3 px-2 py-1 text-base">
                <span className="size-3 rounded-full" style={{ background: p.color }} /> {p.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
