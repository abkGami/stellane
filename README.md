# Stellane

The marketing site for Stellane — one long page that explains how the product turns messy operational
data into forecasts you can act on. Video hero up top, a scroll-driven 3D terrain in the middle, then
proof, pricing, FAQ and a sign-up form.

## Stack

Vite, React 18 and TypeScript, with Tailwind for the styling. Icons come from lucide-react; the terrain
is three.js through react-three-fiber, loaded lazily and swapped for a still image when WebGL is off or
the visitor prefers reduced motion. Everything else moves with CSS — no animation library.

```bash
npm install
npm run dev      # local
npm run build    # production build in dist/
```

The sign-up form posts to `VITE_FORM_ENDPOINT` when that's set, and just fakes the success state if not.
