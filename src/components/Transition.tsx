import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap"
import { scrollTop } from "@/lib/smooth"
import { Sticker } from "@/components/Sticker"

const PAGE_COLORS: Record<string, string> = {
  "/": "#F6BBC1", "/shop": "#B5DAF2", "/learn": "#CDB4E6", "/subscribe": "#F3E3A5", "/play": "#BFE3B2", "/faq": "#F7C3A8",
}
export const pageColor = (path: string) => PAGE_COLORS[path] ?? PAGE_COLORS["/" + path.split("/")[1]] ?? "#F6BBC1"

/**
 * Pastel curtain between pages: wipes up in the next page's colour, swaps the
 * route underneath, scrolls to the top, then wipes away.
 */
export function Transition({ children }: { children: (location: ReturnType<typeof useLocation>) => ReactNode }) {
  const location = useLocation()
  const [shown, setShown] = useState(location)
  const curtain = useRef<HTMLDivElement>(null)
  const first = useRef(true)
  const running = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    if (first.current) { first.current = false; return }
    if (location.key === shown.key) return
    const el = curtain.current!
    if (reducedMotion()) { setShown(location); scrollTop(); return }
    // a new navigation while a curtain is mid-flight: finish the old one instantly
    running.current?.progress(1).kill()
    const color = pageColor(location.pathname)
    gsap.set(el, { backgroundColor: color, clipPath: "inset(100% 0 0 0)", display: "block" })
    const tl = gsap.timeline({ onComplete: () => { running.current = null } })
    running.current = tl
    tl.to(el, { clipPath: "inset(0% 0 0 0)", duration: 0.5, ease: "expo.inOut" })
      .fromTo(".curtain-sticker", { scale: 0, rotate: -40 }, { scale: 1, rotate: 0, duration: 0.5, stagger: 0.04, ease: "back.out(2)" }, "-=0.25")
      .add(() => { setShown(location); scrollTop() })
      .to(".curtain-sticker", { scale: 0, duration: 0.3, stagger: 0.03, ease: "power2.in" }, "+=0.15")
      .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "expo.inOut" }, "-=0.1")
      .set(el, { display: "none" })
      .add(() => ScrollTrigger.refresh())
  }, [location, shown.key])

  useEffect(() => () => { running.current?.kill() }, [])

  useEffect(() => { const t = setTimeout(() => ScrollTrigger.refresh(), 200); return () => clearTimeout(t) }, [shown.key])

  return (
    <>
      {children(shown)}
      <div ref={curtain} className="pointer-events-none fixed inset-0 z-[90] hidden" aria-hidden="true">
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex items-center gap-6">
            {(["butterfly", "star", "cd", "smiley", "flower"] as const).map((k) => <Sticker key={k} kind={k} className="curtain-sticker w-14 md:w-24" />)}
          </div>
        </div>
      </div>
    </>
  )
}
