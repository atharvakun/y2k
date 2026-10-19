import { useEffect, useRef, useState } from "react"
import { reducedMotion } from "@/lib/gsap"

const LINES = [
  "RAINBOW.EXE v2.000  (c) 2000 Legacy of Fits Pvt. Ltd.",
  "> Checking chrome .............. OK",
  "> Loading seven stripes ........ OK",
  "> Polishing rhinestones ........ OK",
  "> Detecting your aura .......... LILAC",
  "> Mounting /dev/drip ........... OK",
  "> Warming up the pastel ........ READY",
  "> Ready.",
]

/** Terminal boot screen. Any key or click skips it once the bar has started. */
export function Boot({ onDone }: { onDone: () => void }) {
  const [log, setLog] = useState("")
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const done = useRef(false)
  const start = useRef(performance.now())

  useEffect(() => {
    document.body.classList.add("booting")
    const finish = () => {
      if (done.current) return
      done.current = true
      setLeaving(true)
      setTimeout(() => { document.body.classList.remove("booting"); onDone() }, 850)
    }

    let i = 0
    const timers: number[] = []
    const step = () => {
      if (i < LINES.length) {
        setLog((l) => l + LINES[i++] + "\n")
        timers.push(window.setTimeout(step, i === 1 ? 300 : 120 + Math.random() * 140))
      }
    }
    step()

    const dur = reducedMotion() ? 300 : 2300
    let raf = 0
    const prog = () => {
      const t = Math.min(1, (performance.now() - start.current) / dur)
      setPct(Math.floor(Math.pow(t, 0.8) * 100 / 4) * 4)
      if (t < 1) raf = requestAnimationFrame(prog)
      else { setPct(100); timers.push(window.setTimeout(finish, 1800)) }
    }
    raf = requestAnimationFrame(prog)

    const skip = () => { if (performance.now() - start.current > 600) finish() }
    addEventListener("keydown", skip)
    addEventListener("pointerdown", skip)
    return () => {
      timers.forEach(clearTimeout); cancelAnimationFrame(raf)
      removeEventListener("keydown", skip); removeEventListener("pointerdown", skip)
      document.body.classList.remove("booting")
    }
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050506] text-[#C6FF3D] font-pixel text-[clamp(16px,2.2vw,22px)] transition-transform duration-[850ms] ease-[cubic-bezier(.76,0,.24,1)] ${leaving ? "-translate-y-full" : ""}`}
      aria-hidden="true"
    >
      <div className="w-[min(680px,90vw)]">
        <pre className="m-0 mb-4 min-h-[9em] whitespace-pre-wrap leading-tight">{log}</pre>
        <div className="h-[22px] border-2 border-[#C6FF3D] bg-black p-[3px]">
          <div className="h-full" style={{ width: pct + "%", background: "repeating-linear-gradient(90deg,#C6FF3D 0 10px,transparent 10px 14px)" }} />
        </div>
        <div className="mt-2">{pct}%</div>
        {pct >= 100 && (
          <button className="blink mt-7 border-2 border-[#C6FF3D] px-4 py-2 font-pixel text-inherit">▶ CLICK TO ENTER RAINBOW.EXE</button>
        )}
      </div>
      <div className="scanlines pointer-events-none absolute inset-0" />
    </div>
  )
}
