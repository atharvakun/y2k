# RAINBOW.EXE — Drop 01

A Y2K clothing-label drop site. Cyber-Y2K direction: near-black with a fine grid, liquid chrome, acid lime, mono spec sheets, wireframe technical garment drawings, and a draggable window manager for products, bag and dialogs. Static HTML, CSS and JS; no build step.

## Run

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

GSAP (animations) and Google Fonts load from CDNs, so you need to be online.

## Structure

- `index.html` — boot screen, hero, ticker, 01 Index (seven reasons), 02 Drop (product grid with tier filters), 03 Archive (horizontal pinned lookbook), 04 Tiers, 05 System (window manager + terminal log), footer.
- `css/style.css` — tokens, custom cursor, window chrome, section layouts, responsive rules.
- `js/main.js` — boot sequence, terminal log, window manager (drag, focus, cascade, storm), products and SVG garments, bag and checkout, popup library, GSAP motion.

## Editing products

Edit the `PRODUCTS` array near the top of `js/main.js`. Each item has a SKU, name, kind, garment `type` (tee, babytee, cargo, hoodie, visor, skirt, bag, jacket), price, tier, hue, and spec fields (material, fit, weight). The grid, filters and dossier windows render from it.

## Behaviour notes

- Nothing pops up on its own. Windows open only from buttons: Open Windows, Spawn One, Spawn Storm, Dossier, + Bag, Bag, Join, Sign.
- `Esc` closes every window and ends a storm. Any key or click skips the boot screen.
- Do not add `scroll-behavior: smooth` to the root: it breaks GSAP ScrollTrigger's refresh and mis-pins the archive. Anchor links are smoothed in JS instead.

## Dev flags (query string)

- `?noboot` — skip the boot screen.
- `?still` — fast-forward GSAP timelines for screenshots.
- `?scroll=<section-id>` — jump straight to a section (`index`, `drop`, `archive`, `tiers`, `system`, `guestbook`).
