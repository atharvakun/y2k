import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

type Phase = "idle" | "run" | "over"
type Ob = { x: number; w: number; h: number; kind: "cd" | "phone" | "flower" }
type Cloud = { x: number; y: number; s: number }

const KEY = "rainbow.exe:best"
const readBest = () => { try { return +(localStorage.getItem(KEY) ?? 0) || 0 } catch { return 0 } }
const writeBest = (v: number) => { try { localStorage.setItem(KEY, String(v)) } catch { /* private mode */ } }

/**
 * Butterfly Run: a side-scrolling jump game in the spirit of the reference site's
 * "press Space to jump". Space / ↑ / tap to jump. Canvas, no deps.
 */
export function Game({ heading = true }: { heading?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState<Phase>("idle")
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(readBest)
  const phaseRef = useRef<Phase>("idle")
  const inView = useRef(false)
  const jumpReq = useRef(false)

  useEffect(() => { phaseRef.current = phase }, [phase])

  // only capture Space while the game is on screen
  useEffect(() => {
    const el = wrapRef.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { inView.current = e.isIntersecting && e.intersectionRatio > 0.4 }, { threshold: [0, 0.4, 1] })
    io.observe(el); return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inView.current) return
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") { e.preventDefault(); jumpReq.current = true }
    }
    addEventListener("keydown", onKey)
    return () => removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return
    const ctx = cv.getContext("2d")!
    let W = 0, H = 0, dpr = 1
    const resize = () => {
      const r = cv.getBoundingClientRect(); dpr = Math.min(2, devicePixelRatio || 1)
      W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize(); const ro = new ResizeObserver(resize); ro.observe(cv)

    // world
    const G = 2200, JUMP = -820
    let groundY = 0, px = 0, py = 0, vy = 0, onGround = true, t = 0, speed = 320, dist = 0, spawnIn = 1.2
    let obs: Ob[] = [], clouds: Cloud[] = [], sc = 0, bestLocal = readBest(), flap = 0, last = performance.now(), raf = 0
    const P = { w: 58, h: 50 }

    const reset = () => { obs = []; sc = 0; speed = 320; dist = 0; spawnIn = 1.2; py = groundY - P.h; vy = 0; onGround = true; setScore(0) }
    const start = () => { reset(); setPhase("run") }
    const over = () => { setPhase("over"); if (sc > bestLocal) { bestLocal = sc; writeBest(sc); setBest(sc) } }

    const drawPlayer = (x: number, y: number, ang: number) => {
      ctx.save(); ctx.translate(x + P.w / 2, y + P.h / 2); ctx.rotate(ang)
      // butterfly: two wing pairs + body
      const wing = (sx: number, sy: number, col: string) => { ctx.save(); ctx.scale(sx, sy); ctx.beginPath(); ctx.ellipse(18, -4, 20, 14, -0.5, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = "#0e0e0e"; ctx.stroke(); ctx.beginPath(); ctx.arc(20, -6, 5, 0, 7); ctx.fillStyle = "#fff"; ctx.fill(); ctx.restore() }
      const f = 1 + Math.sin(flap) * 0.3
      wing(f, 1, "#CDB4E6"); wing(-f, 1, "#CDB4E6"); wing(f * 0.8, -0.85, "#F6BBC1"); wing(-f * 0.8, -0.85, "#F6BBC1")
      ctx.beginPath(); ctx.roundRect(-4, -20, 8, 40, 4); ctx.fillStyle = "#0e0e0e"; ctx.fill()
      ctx.beginPath(); ctx.moveTo(-2, -20); ctx.lineTo(-10, -30); ctx.moveTo(2, -20); ctx.lineTo(10, -30); ctx.lineWidth = 2.5; ctx.strokeStyle = "#0e0e0e"; ctx.stroke()
      ctx.beginPath(); ctx.arc(-2, -14, 2.2, 0, 7); ctx.arc(2, -14, 2.2, 0, 7); ctx.fillStyle = "#fff"; ctx.fill()
      ctx.restore()
    }
    const drawOb = (o: Ob, y: number) => {
      ctx.save(); ctx.translate(o.x, y); ctx.lineWidth = 3; ctx.strokeStyle = "#0e0e0e"
      if (o.kind === "cd") {
        const r = o.w / 2; ctx.translate(r, -r); ctx.rotate(-dist / 40)
        const g = ctx.createConicGradient(0, 0, 0); ["#ffd1ff", "#c8f1ff", "#d4ffe0", "#fff6b3", "#ffd1c8", "#e0c8ff", "#ffd1ff"].forEach((c, k, a) => g.addColorStop(k / (a.length - 1), c))
        ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fillStyle = g; ctx.fill(); ctx.stroke()
        ctx.beginPath(); ctx.arc(0, 0, r * 0.28, 0, 7); ctx.fillStyle = "#fff"; ctx.fill(); ctx.stroke()
      } else if (o.kind === "phone") {
        ctx.fillStyle = "#c9ccd6"; ctx.beginPath(); ctx.roundRect(0, -o.h, o.w, o.h, 6); ctx.fill(); ctx.stroke()
        ctx.fillStyle = "#9fc9f0"; ctx.beginPath(); ctx.roundRect(5, -o.h + 5, o.w - 10, o.h * 0.4, 3); ctx.fill(); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(o.w - 4, -o.h); ctx.lineTo(o.w + 4, -o.h - 14); ctx.stroke()
      } else {
        const r = o.w / 2; ctx.translate(r, -r)
        for (let k = 0; k < 5; k++) { ctx.save(); ctx.rotate((k * Math.PI * 2) / 5); ctx.beginPath(); ctx.ellipse(0, -r * 0.55, r * 0.36, r * 0.52, 0, 0, 7); ctx.fillStyle = "#F26B5B"; ctx.fill(); ctx.restore() }
        ctx.beginPath(); ctx.arc(0, 0, r * 0.28, 0, 7); ctx.fillStyle = "#fff"; ctx.fill()
      }
      ctx.restore()
    }

    const frame = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000); last = now; t += dt
      groundY = H - 46; px = Math.min(90, W * 0.12)
      if (phaseRef.current !== "run") { py = groundY - P.h; vy = 0; onGround = true }

      // input
      if (jumpReq.current) {
        jumpReq.current = false
        if (phaseRef.current !== "run") start()
        else if (onGround) { vy = JUMP; onGround = false }
      }

      if (phaseRef.current === "run") {
        vy += G * dt; py += vy * dt
        if (py >= groundY - P.h) { py = groundY - P.h; vy = 0; onGround = true }
        speed = Math.min(760, speed + dt * 14); dist += speed * dt
        sc = Math.floor(dist / 12); setScore(sc)
        spawnIn -= dt
        if (spawnIn <= 0) {
          const kinds: Ob["kind"][] = ["cd", "phone", "flower"]
          const kind = kinds[Math.floor(Math.random() * kinds.length)]
          const w = kind === "phone" ? 30 : 40 + Math.random() * 16
          obs.push({ x: W + 40, w, h: kind === "phone" ? 52 : w, kind })
          spawnIn = 0.9 + Math.random() * 1.1 - Math.min(0.5, speed / 2000)
        }
        obs.forEach((o) => (o.x -= speed * dt)); obs = obs.filter((o) => o.x + o.w > -60)
        // collision (forgiving boxes)
        const pxl = px + 10, pxr = px + P.w - 10, pyt = py + 8, pyb = py + P.h - 4
        for (const o of obs) { const ol = o.x + 6, or = o.x + o.w - 6, ot = groundY - o.h + 6; if (pxr > ol && pxl < or && pyb > ot && pyt < groundY) { over(); break } }
      }
      flap += dt * (onGround ? 6 : 14)
      // clouds
      if (clouds.length < 6 && Math.random() < 0.02) clouds.push({ x: W + 80, y: 20 + Math.random() * (H * 0.4), s: 0.6 + Math.random() * 0.8 })
      clouds.forEach((c) => (c.x -= (phaseRef.current === "run" ? speed * 0.25 : 30) * dt)); clouds = clouds.filter((c) => c.x > -200)

      // draw
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = "#B5DAF2"; ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = "#fff"
      clouds.forEach((c) => { ctx.save(); ctx.translate(c.x, c.y); ctx.scale(c.s, c.s); ctx.beginPath(); ctx.arc(0, 0, 22, 0, 7); ctx.arc(26, -8, 28, 0, 7); ctx.arc(54, 0, 22, 0, 7); ctx.rect(0, 0, 54, 22); ctx.fill(); ctx.restore() })
      // ground
      ctx.fillStyle = "#A9D18E"; ctx.fillRect(0, groundY, W, H - groundY)
      ctx.strokeStyle = "#0e0e0e"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(W, groundY); ctx.stroke()
      ctx.fillStyle = "rgba(14,14,14,.15)"
      for (let x = -((dist * 1) % 40); x < W; x += 40) ctx.fillRect(x, groundY + 14, 18, 3)
      obs.forEach((o) => drawOb(o, groundY))
      drawPlayer(px, py, onGround ? 0 : Math.max(-0.4, Math.min(0.5, vy / 1400)))
      // hud
      ctx.fillStyle = "#0e0e0e"; ctx.font = "700 22px 'VT323', monospace"; ctx.textAlign = "right"
      ctx.fillText(`SCORE ${String(sc).padStart(5, "0")}   HI ${String(bestLocal).padStart(5, "0")}`, W - 16, 30)
      if (phaseRef.current !== "run") {
        ctx.textAlign = "center"; ctx.font = "700 30px 'VT323', monospace"
        const blinkOn = Math.floor(t * 2) % 2 === 0
        if (phaseRef.current === "over") { ctx.fillText("GAME OVER", W / 2, H / 2 - 24) }
        if (blinkOn) ctx.fillText(phaseRef.current === "over" ? "PRESS SPACE TO RETRY" : "PRESS SPACE TO JUMP", W / 2, H / 2 + 12)
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <section id="game" ref={wrapRef} className="px-6 py-20 md:px-10" aria-label="Butterfly run game">
      <div className="mx-auto max-w-6xl">
        {heading && (
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-pixel text-2xl text-navy">BONUS LEVEL</p>
              <h2 className="text-[clamp(32px,5vw,72px)] leading-[0.98] font-normal tracking-tight uppercase">Butterfly run</h2>
            </div>
            <p className="max-w-sm text-muted-foreground">Jump over the CDs, flip phones and flowers. Space, ↑ or tap. Your best score stays on this device.</p>
          </div>
        )}

        <div className="relative mt-8 overflow-hidden rounded-[32px] border-4 border-ink bg-sky shadow-[8px_8px_0_#0e0e0e]">
          <div className="flex items-center gap-2 border-b-4 border-ink bg-white px-4 py-2 font-pixel text-xl">
            <span className="size-3 rounded-full bg-coral" /><span className="size-3 rounded-full bg-sun" /><span className="size-3 rounded-full bg-grass" />
            <span className="ml-2">butterfly_run.exe</span>
            <span className="ml-auto text-muted-foreground">v2.000</span>
          </div>
          <canvas
            ref={canvasRef}
            className="block h-[260px] w-full touch-manipulation select-none md:h-[340px]"
            role="img"
            aria-label={phase === "run" ? `Game running, score ${score}` : "Butterfly run game. Press Space or tap to start."}
            onPointerDown={() => { jumpReq.current = true }}
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button className="btn-3d h-12 rounded-full px-6" onClick={() => { jumpReq.current = true }}>
            {phase === "run" ? "Jump" : phase === "over" ? "Play again" : "Start"}
          </Button>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {phase === "over" ? `Game over. ${score >= best && score > 0 ? "New best." : `Best ${best}.`}` : phase === "run" ? "Go go go." : "The one-millionth visitor gets a butterfly clip. You might be it."}
          </p>
        </div>
      </div>
    </section>
  )
}
