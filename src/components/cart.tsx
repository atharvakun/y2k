import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Garment } from "@/components/Garment"
import { fmt, type Product } from "@/lib/products"

export type CartItem = { product: Product; size: string; qty: number }

type Ctx = {
  items: CartItem[]
  count: number
  subtotal: number
  open: boolean
  setOpen: (v: boolean) => void
  add: (p: Product, size?: string) => void
  remove: (idx: number) => void
  clear: () => void
}

const CartCtx = createContext<Ctx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [open, setOpen] = useState(false)
  const add = useCallback((p: Product, size = "M") => {
    setItems((list) => {
      const i = list.findIndex((it) => it.product.id === p.id && it.size === size)
      if (i >= 0) return list.map((it, k) => (k === i ? { ...it, qty: it.qty + 1 } : it))
      return [...list, { product: p, size, qty: 1 }]
    })
    setOpen(true)
  }, [])
  const remove = useCallback((idx: number) => setItems((l) => l.filter((_, k) => k !== idx)), [])
  const clear = useCallback(() => setItems([]), [])
  const value = useMemo<Ctx>(() => ({
    items, open, setOpen, add, remove, clear,
    count: items.reduce((s, i) => s + i.qty, 0),
    subtotal: items.reduce((s, i) => s + i.qty * i.product.price, 0),
  }), [items, open, add, remove, clear])
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart() {
  const c = useContext(CartCtx)
  if (!c) throw new Error("useCart outside CartProvider")
  return c
}

/** Slide-in cart panel (shadcn Sheet) and demo checkout dialog. */
export function CartSheet() {
  const { items, open, setOpen, remove, subtotal, count, clear } = useCart()
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full bg-cream sm:max-w-md" data-lenis-prevent>
          <SheetHeader className="pb-0">
            <SheetTitle className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
              <ShoppingCart className="size-5" /> Your bag <Badge className="tabular rounded-full bg-navy text-white">{count}</Badge>
            </SheetTitle>
            <SheetDescription>Free shipping on all purchases of ₹2000 or more.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-auto px-4" aria-live="polite">
            {items.length === 0 ? (
              <div className="rounded-3xl bg-white p-8 text-center">
                <p className="text-lg font-medium">Your bag is empty.</p>
                <p className="mt-1 text-sm text-muted-foreground">Like the year 2000: full of potential.</p>
                <Button className="mt-5 rounded-full px-6" onClick={() => setOpen(false)}>Keep shopping</Button>
              </div>
            ) : (
              <ul className="space-y-3">
                {items.map((it, idx) => (
                  <li key={it.product.id + it.size} className="flex items-center gap-4 rounded-3xl bg-white p-3">
                    <div className="grid size-20 shrink-0 place-items-center rounded-2xl" style={{ background: it.product.bg }}>
                      <Garment type={it.product.type} color={it.product.color} className="size-14" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{it.product.name}</p>
                      <p className="text-sm text-muted-foreground">{it.product.kind} · {it.size} · ×{it.qty}</p>
                      <p className="tabular mt-1 text-sm font-semibold">{fmt(it.product.price * it.qty)}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full" aria-label={`Remove ${it.product.name}`} onClick={() => remove(idx)}><Trash2 /></Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <SheetFooter className="gap-3 border-t-0 pt-0">
            <Separator />
            <div className="flex items-center justify-between text-lg font-semibold"><span>Subtotal</span><span className="tabular">{fmt(subtotal)}</span></div>
            <p className="text-xs text-muted-foreground">Taxes and shipping calculated at checkout.</p>
            <Button className="btn-3d h-14 rounded-full text-base" disabled={items.length === 0} onClick={() => { setPaid(false); setPaying(true) }}>Checkout</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Dialog open={paying} onOpenChange={setPaying}>
        <DialogContent className="rounded-3xl bg-cream sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight">{paid ? "Thank you." : "Payment Portal 2000"}</DialogTitle>
            <DialogDescription>{paid ? "Your order ships from the 37th floor in 3–5 business millennia." : `Total ${fmt(subtotal)}. This is a demo. No money moves.`}</DialogDescription>
          </DialogHeader>
          {!paid && <div className="rounded-2xl bg-white p-4 font-pixel text-xl tracking-widest">✦✦✦✦ ✦✦✦✦ ✦✦✦✦ 2000</div>}
          <DialogFooter>
            {paid
              ? <Button className="rounded-full px-6" onClick={() => { setPaying(false); setOpen(false) }}>Nice</Button>
              : <Button className="rounded-full px-6" onClick={() => { clear(); setPaid(true) }}>Pay {fmt(subtotal)}</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
