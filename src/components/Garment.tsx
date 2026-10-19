import type { GarmentType } from "@/lib/products"

type Props = {
  type: GarmentType
  color: string
  /** alternate "back" view used on hover */
  alt?: boolean
  className?: string
}

const INK = "#0e0e0e"

/** Flat, outlined garment illustrations in the sticker style of the site. */
export function Garment({ type, color, alt = false, className }: Props) {
  const F = { fill: color, stroke: INK, strokeWidth: 4, strokeLinejoin: "round" as const }
  const L = { fill: "none", stroke: INK, strokeWidth: 4, strokeLinecap: "round" as const }
  const HI = { fill: "#fff", opacity: 0.35 }
  const dark = shade(color, -18)

  const body = (() => {
    switch (type) {
      case "babytee":
        return (
          <>
            <path d="M50 50 L82 36 Q100 50 118 36 L150 50 L172 76 L146 90 L142 136 L58 136 L54 90 L28 76 Z" {...F} />
            <path d="M82 36 Q100 58 118 36" {...L} />
            {alt ? <path d="M70 70 H130 M70 90 H130 M70 110 H130" stroke={dark} strokeWidth={6} strokeLinecap="round" /> :
              <text x="100" y="104" textAnchor="middle" fontFamily="Albert Sans, sans-serif" fontWeight={800} fontSize="16" fill={INK}>RAINBOW</text>}
            <ellipse cx="70" cy="62" rx="10" ry="18" {...HI} transform="rotate(-20 70 62)" />
          </>
        )
      case "cargo":
        return (
          <>
            <path d="M58 22 H142 L150 182 H108 L100 104 L92 182 H50 Z" {...F} />
            <rect x="60" y="90" width="26" height="30" rx="4" fill={dark} stroke={INK} strokeWidth={4} />
            <rect x="114" y="90" width="26" height="30" rx="4" fill={dark} stroke={INK} strokeWidth={4} />
            <line x1="58" y1="36" x2="142" y2="36" {...L} />
            <circle cx="100" cy="29" r="3" fill={INK} />
            {alt && <path d="M70 40 L64 176 M130 40 L136 176" stroke={dark} strokeWidth={5} strokeLinecap="round" />}
            <ellipse cx="72" cy="60" rx="6" ry="16" {...HI} />
          </>
        )
      case "hoodie":
        return (
          <>
            <ellipse cx="100" cy="42" rx="34" ry="24" fill={dark} stroke={INK} strokeWidth={4} />
            <path d="M36 60 L74 44 Q100 60 126 44 L164 60 L190 96 L160 110 L156 184 L44 184 L40 110 L10 96 Z" {...F} />
            <rect x="74" y="130" width="52" height="34" rx="6" fill={dark} stroke={INK} strokeWidth={4} />
            <line x1="92" y1="62" x2="92" y2="94" {...L} />
            <line x1="108" y1="62" x2="108" y2="94" {...L} />
            {alt && <path d="M100 60 V184" stroke={dark} strokeWidth={6} />}
            <ellipse cx="60" cy="90" rx="8" ry="22" {...HI} transform="rotate(10 60 90)" />
          </>
        )
      case "visor":
        return (
          <>
            <path d="M30 110 Q100 60 170 110 L170 124 Q100 80 30 124 Z" {...F} />
            <path d="M20 118 Q100 150 180 118 L186 132 Q100 172 14 132 Z" fill={alt ? dark : "#e8edf3"} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
            <path d="M50 134 Q100 150 150 134" stroke="#fff" strokeWidth={5} strokeLinecap="round" opacity={0.7} fill="none" />
          </>
        )
      case "skirt":
        return (
          <>
            <path d="M62 40 H138 L172 164 H28 Z" {...F} />
            <g stroke={INK} strokeWidth={4} strokeLinecap="round">
              <line x1="80" y1="40" x2="62" y2="164" /><line x1="100" y1="40" x2="100" y2="164" /><line x1="120" y1="40" x2="138" y2="164" />
            </g>
            <rect x="58" y="30" width="84" height="14" rx="7" fill={alt ? color : INK} stroke={INK} strokeWidth={4} />
            <ellipse cx="80" cy="90" rx="5" ry="18" {...HI} transform="rotate(8 80 90)" />
          </>
        )
      case "bag":
        return (
          <>
            <path d="M60 72 Q100 30 140 72" {...L} strokeWidth={6} />
            <rect x="24" y="80" width="152" height="80" rx="40" {...F} />
            <circle cx="100" cy="120" r="12" fill={alt ? color : "#fff"} stroke={INK} strokeWidth={4} />
            <circle cx="100" cy="120" r="4" fill={INK} />
            <ellipse cx="60" cy="104" rx="16" ry="8" {...HI} />
          </>
        )
      case "jacket":
        return (
          <>
            <path d="M34 50 L76 30 Q100 46 124 30 L166 50 L192 92 L162 106 L158 184 L42 184 L38 106 L8 92 Z" {...F} />
            <g stroke={INK} strokeWidth={4} fill="none"><path d="M42 80 H158 M42 110 H158 M42 140 H158 M42 165 H158" /></g>
            <line x1="100" y1="46" x2="100" y2="184" stroke={alt ? dark : "#fff"} strokeWidth={6} strokeDasharray="8 6" />
            <ellipse cx="58" cy="96" rx="7" ry="20" {...HI} />
          </>
        )
      default:
        return (
          <>
            <path d="M40 42 L78 24 Q100 42 122 24 L160 42 L186 76 L156 94 L152 180 L48 180 L44 94 L14 76 Z" {...F} />
            <path d="M78 24 Q100 50 122 24" {...L} />
            {alt ? <circle cx="100" cy="110" r="26" fill={dark} stroke={INK} strokeWidth={4} /> :
              <text x="100" y="118" textAnchor="middle" fontFamily="Albert Sans, sans-serif" fontWeight={800} fontSize="26" fill={INK}>RISE</text>}
            <ellipse cx="64" cy="70" rx="9" ry="22" {...HI} transform="rotate(-10 64 70)" />
          </>
        )
    }
  })()

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" style={{ overflow: "visible" }}>
      {body}
    </svg>
  )
}

/** lighten (+) or darken (-) a hex colour by a percentage */
export function shade(hex: string, pct: number) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  const t = pct < 0 ? 0 : 255, p = Math.abs(pct) / 100
  const c = (v: number) => Math.round((t - v) * p + v)
  return "#" + [c(r), c(g), c(b)].map((v) => v.toString(16).padStart(2, "0")).join("")
}
