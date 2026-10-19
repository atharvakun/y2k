export type StickerKind =
  | "flower" | "burst" | "cloud" | "leaf" | "butterfly" | "smiley" | "heart" | "sparkle" | "ball" | "cd" | "phone" | "star"

type Props = { kind: StickerKind; className?: string; color?: string }

const INK = "#0e0e0e"

/** Flat illustrated Y2K stickers scattered across the hero and panels. */
export function Sticker({ kind, className, color }: Props) {
  const c = color
  switch (kind) {
    case "flower":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <defs><linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F9C36B" /><stop offset="1" stopColor="#F26B5B" /></linearGradient></defs>
          {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="50" cy="26" rx="17" ry="24" fill={c ?? "url(#fl)"} transform={`rotate(${a} 50 50)`} />)}
          <circle cx="50" cy="50" r="12" fill="#fff" />
        </svg>
      )
    case "burst":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <polygon fill={c ?? "#F6D36B"} points="50,2 58,36 92,22 66,50 98,64 62,62 72,98 50,70 28,98 38,62 2,64 34,50 8,22 42,36" />
        </svg>
      )
    case "cloud":
      return (
        <svg viewBox="0 0 120 70" className={className} aria-hidden="true">
          <path fill={c ?? "#fff"} d="M30 62h62a20 20 0 0 0 2-40 26 26 0 0 0-50-6 20 20 0 0 0-14 46z" />
        </svg>
      )
    case "leaf":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <path fill={c ?? "#2F7A3E"} d="M10 90C10 40 40 10 92 8c2 52-28 82-82 82z" />
          <path d="M18 84C40 60 60 40 86 14" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".7" />
        </svg>
      )
    case "butterfly":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <defs><linearGradient id="bf" x1="0" x2="1"><stop offset="0" stopColor="#ffd1ff" /><stop offset=".5" stopColor="#c8f1ff" /><stop offset="1" stopColor="#e0c8ff" /></linearGradient></defs>
          <path fill={c ?? "url(#bf)"} stroke={INK} strokeWidth="3" d="M50 50C30 10 2 18 8 44c4 16 24 16 42 6zM50 50c20-40 48-32 42-6-4 16-24 16-42 6z" />
          <path fill={c ?? "url(#bf)"} stroke={INK} strokeWidth="3" d="M50 50C30 90 2 82 8 56c4-16 24-16 42-6zM50 50c20 40 48 32 42 6-4-16-24-16-42-6z" />
          <rect x="47" y="30" width="6" height="40" rx="3" fill={INK} />
        </svg>
      )
    case "smiley":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill={c ?? "#F6D36B"} stroke={INK} strokeWidth="4" />
          <circle cx="36" cy="42" r="5" fill={INK} /><circle cx="64" cy="42" r="5" fill={INK} />
          <path d="M30 60q20 22 40 0" stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      )
    case "heart":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <path fill={c ?? "#F26B5B"} stroke={INK} strokeWidth="4" d="M50 88 10 48a22 22 0 0 1 40-26 22 22 0 0 1 40 26z" />
        </svg>
      )
    case "sparkle":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <path fill={c ?? "#fff"} d="M50 0c4 30 16 42 50 50-34 8-46 20-50 50-4-30-16-42-50-50 34-8 46-20 50-50z" />
        </svg>
      )
    case "star":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <defs><linearGradient id="stc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset=".45" stopColor="#8d919c" /><stop offset=".55" stopColor="#f4f5f7" /><stop offset="1" stopColor="#a6abb5" /></linearGradient></defs>
          <polygon fill={c ?? "url(#stc)"} stroke={INK} strokeWidth="3" points="50,4 61,38 97,38 68,59 79,94 50,72 21,94 32,59 3,38 39,38" />
        </svg>
      )
    case "ball":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill={c ?? "#2F7A3E"} />
          <path d="M50 4v92M4 50h92M18 18c20 20 44 20 64 0M18 82c20-20 44-20 64 0" stroke="#fff" strokeWidth="3" fill="none" />
        </svg>
      )
    case "cd":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <defs><linearGradient id="cdg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#ffd1ff" /><stop offset=".3" stopColor="#c8f1ff" /><stop offset=".6" stopColor="#fff6b3" /><stop offset="1" stopColor="#e0c8ff" /></linearGradient></defs>
          <circle cx="50" cy="50" r="46" fill="url(#cdg)" stroke={INK} strokeWidth="3" />
          <circle cx="50" cy="50" r="12" fill="#fff" stroke={INK} strokeWidth="3" />
        </svg>
      )
    case "phone":
      return (
        <svg viewBox="0 0 100 140" className={className} aria-hidden="true">
          <rect x="22" y="6" width="56" height="60" rx="10" fill={c ?? "#c9ccd6"} stroke={INK} strokeWidth="3" />
          <rect x="30" y="16" width="40" height="36" rx="4" fill="#9fc9f0" stroke={INK} strokeWidth="2" />
          <rect x="18" y="68" width="64" height="66" rx="10" fill={c ?? "#c9ccd6"} stroke={INK} strokeWidth="3" />
          {[0, 1, 2].map((r) => [0, 1, 2].map((q) => <rect key={`${r}${q}`} x={30 + q * 15} y={80 + r * 14} width="10" height="8" rx="2" fill="#fff" stroke={INK} strokeWidth="1.5" />))}
          <line x1="72" y1="6" x2="80" y2="-10" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
  }
}
