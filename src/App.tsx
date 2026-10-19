import { useCallback, useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { CartProvider, CartSheet } from "@/components/cart"
import { Boot } from "@/components/Boot"
import { Nav } from "@/components/Nav"
import { Sparkles } from "@/components/Sparkles"
import { Transition } from "@/components/Transition"
import { Footer } from "@/components/Sections"
import Home from "@/pages/Home"
import ShopPage from "@/pages/ShopPage"
import ProductPage from "@/pages/ProductPage"
import LearnPage from "@/pages/LearnPage"
import SubscribePage from "@/pages/SubscribePage"
import PlayPage from "@/pages/PlayPage"
import FaqPage from "@/pages/FaqPage"
import NotFound from "@/pages/NotFound"
import { initSmooth } from "@/lib/smooth"
import { ScrollTrigger } from "@/lib/gsap"

export default function App() {
  const [booted, setBooted] = useState(() => new URLSearchParams(location.search).has("noboot"))
  const onDone = useCallback(() => setBooted(true), [])

  useEffect(() => {
    if (!booted) return
    initSmooth()
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(t)
  }, [booted])

  return (
    <TooltipProvider>
      <CartProvider>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
        {!booted && <Boot onDone={onDone} />}
        {booted && <Sparkles />}
        <Nav />
        <Transition>
          {(loc) => (
            <main id="main">
              <Routes location={loc}>
                <Route path="/" element={<Home ready={booted} />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:id" element={<ProductPage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/subscribe" element={<SubscribePage />} />
                <Route path="/play" element={<PlayPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </main>
          )}
        </Transition>
        <CartSheet />
      </CartProvider>
    </TooltipProvider>
  )
}
