import { useEffect, useRef } from "react"
import { Sticker } from "@/components/Sticker"
import { gsap, reducedMotion } from "@/lib/gsap"

/** A butterfly that flutters across the viewport once per page visit. */
export function Butterfly({ delay = 1.2 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const W = innerWidth, H = innerHeight
    const path = [
      { x: -80, y: H * 0.55 }, { x: W * 0.2, y: H * 0.3 }, { x: W * 0.45, y: H * 0.5 },
      { x: W * 0.7, y: H * 0.22 }, { x: W + 100, y: H * 0.4 },
    ]
    const tl = gsap.timeline({ delay })
    tl.set(el, { opacity: 1 })
      .to(el, { motionPath: { path, curviness: 1.6, autoRotate: true }, duration: 7, ease: "none" })
      .to(".wing", { scaleX: 0.3, duration: 0.12, yoyo: true, repeat: 56, ease: "sine.inOut" }, 0)
      .set(el, { opacity: 0 })
    return () => { tl.kill() }
  }, [delay])
  return (
    <div ref={ref} className="pointer-events-none fixed top-0 left-0 z-30 w-14 opacity-0 md:w-20" aria-hidden="true">
      <div className="wing origin-center"><Sticker kind="butterfly" className="w-full drop-shadow-[0_6px_0_rgba(14,14,14,.08)]" /></div>
    </div>
  )
}
