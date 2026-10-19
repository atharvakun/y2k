import Lenis from "lenis"
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap"

let lenis: Lenis | null = null

/** Smooth scrolling on fine pointers only; off for touch and reduced motion. */
export function initSmooth() {
  if (lenis || reducedMotion() || !matchMedia("(pointer: fine)").matches) return lenis
  lenis = new Lenis({ lerp: 0.12 })
  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((t) => lenis?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function scrollToEl(el: HTMLElement, offset = -110) {
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.1 })
  else scrollTo({ top: el.getBoundingClientRect().top + scrollY + offset, behavior: reducedMotion() ? "instant" : "smooth" })
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) scrollToEl(el)
}

export function scrollTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate })
  else scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" })
}
