import { useEffect } from "react"
import { gsap, reducedMotion } from "@/lib/gsap"

const COLORS = ["#F26B5B", "#F6D36B", "#9FC9F0", "#A9D18E", "#CDB4E6", "#2A2F7A", "#ffffff"]
const GLYPHS = ["✦", "✧", "★", "✶"]

/** Y2K cursor sparkle trail. Fine pointers only; off under reduced motion. */
export function Sparkles() {
  useEffect(() => {
    if (reducedMotion() || !matchMedia("(pointer: fine)").matches) return
    const layer = document.createElement("div")
    layer.id = "sparkles"; layer.setAttribute("aria-hidden", "true")
    document.body.appendChild(layer)
    let last = 0
    const spawn = (x: number, y: number) => {
      const s = document.createElement("span")
      s.className = "spark"
      s.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      s.style.left = x + "px"; s.style.top = y + "px"
      s.style.color = COLORS[Math.floor(Math.random() * COLORS.length)]
      s.style.fontSize = 10 + Math.random() * 12 + "px"
      layer.appendChild(s)
      gsap.to(s, { x: (Math.random() - 0.5) * 50, y: -30 - Math.random() * 40, rotation: (Math.random() - 0.5) * 180, scale: 0, opacity: 0, duration: 0.7 + Math.random() * 0.5, ease: "power2.out", onComplete: () => s.remove() })
    }
    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - last < 36) return
      last = now; spawn(e.clientX, e.clientY)
    }
    const onClick = (e: MouseEvent) => { for (let k = 0; k < 10; k++) spawn(e.clientX + (Math.random() - 0.5) * 20, e.clientY + (Math.random() - 0.5) * 20) }
    addEventListener("pointermove", onMove, { passive: true })
    addEventListener("click", onClick)
    return () => { removeEventListener("pointermove", onMove); removeEventListener("click", onClick); layer.remove() }
  }, [])
  return null
}
