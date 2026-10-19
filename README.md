# rainbow.exe — Drop 01

A Y2K clothing-label site, multi-page, in a playful illustrated pastel style: floating stickers, pill navigation, curved edges into cream paper, chrome and holographic fills, pixel counters, butterflies, CDs and flip phones, a sparkle cursor trail, and a "press Space to jump" game. The terminal boot intro stays.

React 19, Vite, React Router, Tailwind v4, shadcn/ui (Base UI), GSAP (ScrollTrigger + MotionPath), Lenis.

## Run

```
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve dist/
```

Add `?noboot` to the URL to skip the boot screen while developing. When deploying, serve `index.html` for every path (single-page app) so deep links like `/shop/3` work.

## Pages

| Route | Page | What's on it |
|---|---|---|
| `/` | Home | Sticker hero with product carousel, ticker, intro, pinned benefit cards, holographic Fits panels, rolling stats, four recommended pieces, subscribe teaser, "We have what you need" page tiles, feed |
| `/shop` | Shop | Page header, ticker, all eight pieces with tier filters and hover flip, size / care / shipping windows |
| `/shop/:id` | Product | Tilting holographic stage with front/back flip, sizes, quantity, add to bag, spec windows, accordion, four more pieces |
| `/learn` | Learn | Scroll-pinned timeline 1999 → 2026 with chrome years, sticker ticker, glossary of six Y2K words as tilting windows, pinned benefits |
| `/subscribe` | Subscription | Email form in the header, four tier cards (Silver / Gold / Platinum / Diamond) with 3D entrance and rolling figures, subscription FAQ |
| `/play` | Play | Butterfly Run canvas game, how-to-play windows |
| `/faq` | Questions | Accordion, contact form window, office window |
| `*` | 404 | A window that has stopped responding |

## Motion

- Pastel curtain page transition in the next page's colour, with stickers popping in the middle; the route swaps and scroll resets behind it.
- Page headers: letters bounce in, stickers pop from random order, lead and buttons rise.
- A butterfly flutters across the viewport once per page visit (GSAP MotionPath).
- Hero: 17 stickers with pointer parallax and holographic sheen, carousel with ← → keys and autoplay.
- Scroll scenes: pinned benefits with drifting cards, pinned timeline with crossfading years, spinning CD, rolling numbers, staggered reveals, 3D tilt on panels, cards and windows.
- Sparkle cursor trail on fine pointers. Everything respects `prefers-reduced-motion`.

## Game

`src/components/Game.tsx`: Space / ↑ / W / tap to jump over CDs, flip phones and flowers. Speed ramps, best score saved in localStorage. Space is only captured while the game is on screen.

## Where things live

- `src/pages/` — one file per route
- `src/components/` — Nav, Hero, Sections (Ticker, Intro, Benefits, Fits, Stats, SubscribeForm, Closing, Feed, Footer, Tilt, Rolling), Shop (ProductCard, ProductGrid), Game, PageHeader, Transition, Butterfly, Window, Sparkles, Boot, cart, Sticker, Garment
- `src/lib/products.ts` — product data (edit here to change the drop)
- `src/index.css` — tokens and Y2K helpers
- `legacy/` — the first static HTML version
