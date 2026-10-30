# Stellane — landing site

Single-page marketing site for Stellane, built as a pixel-locked rebuild of the Apogee hero with a
Stellane rebrand layer and nine additional sections.

## Stack

| Package | Version |
| --- | --- |
| Vite | 5.4.21 |
| React | 18.3.1 |
| TypeScript | 5.5.4 |
| Tailwind CSS | 3.4.19 |
| lucide-react | 0.446.0 |
| @react-three/fiber / drei / three | 8.18.0 / 9.122.0 / 0.169.0 |

## Commands

```bash
npm install
npm run dev        # dev server
npm run build      # production build -> dist/
npm run preview    # serve dist/ on http://localhost:4173
npm run lint       # eslint (flat config)
npm run typecheck  # tsc --noEmit
```

## Environment

The final CTA posts to `VITE_FORM_ENDPOINT` when it is set:

```bash
# .env.local
VITE_FORM_ENDPOINT=https://example.com/subscribe
```

Without it the form validates locally, shows the success state, and logs the payload with
`console.info` instead of sending it.

## Structure

```
src/
  App.tsx                 section order + skip link
  index.css               Part 1 hero block, globals, grain, marquee, doodles, reduced motion
  components/
    Hero.tsx              hero (exports BAR_HEIGHTS + Nav used by the fixed header)
    ui/                   Header, Grain, ScrollProgress, GlassCard, Buttons, Reveal, TiltCard,
                          Doodle, VideoBg, CountUp, Accordion, MiniBars, ...
    Header.tsx            fixed clone of the hero nav, appears past 80px
  sections/               TrustStrip, Platform, Instruments, ImpactMetrics, Route, UseCases,
                          Customers, Pricing, Faq, FinalCta, Footer
  three/StarTerrain.tsx   the only WebGL chunk (lazy loaded)
  hooks/                  useReducedMotion, useInView, useScrollProgress
  lib/                    constants, easing, videoRegistry
```

## Notes and known deviations

- **Hero geometry is frozen.** The §5 box-model gate is asserted by an external Playwright script;
  after the full 12-section build the geometry fingerprint is unchanged (1269 keys, zero delta).
- **Font name fix.** The supplied stylesheet registers the face as `"Suisse Int'l"`, so Part 1's
  `'Suisse Intl'` never matched. `body` now uses `"Suisse Int'l"` (double quotes — the single-quoted
  form breaks PostCSS).
- **Fixed header.** The hero nav stays in flow; a second `Nav` instance fades in past 80px and is
  `inert`/`aria-hidden` while hidden. Only one mobile menu can be open at a time.
- **Video budget.** The supplied CloudFront clip is 6.36 MB and is reused in the hero and in sections
  5 and 11, so the ≤1.2 MB page-weight target is not reachable without changing the asset.
- **WebGL.** `StarTerrain` is a separate 799 kB (215 kB gzip) chunk, loaded only when the Platform
  section approaches the viewport. It is skipped entirely for `prefers-reduced-motion` and when
  WebGL is unavailable (static fallback).
- **Doodles.** Strokes use `vector-effect: non-scaling-stroke` so hairline doodles stay hairline at
  any size. Because non-scaling strokes break `stroke-dasharray` reveal animations in Chrome, doodles
  fade and rise instead of drawing themselves.
- **Watermark contrast.** The oversized footer wordmark is decorative (`aria-hidden`), drawn at 5%
  white. Lighthouse flags it under `color-contrast`; raising it to the 3:1 large-text threshold would
  destroy the intended effect.
- **Lighthouse.** Desktop 91 / 96 / 100 / 100 (perf / a11y / best-practices / SEO). The mobile run
  sometimes returns `NO_LCP` from Lighthouse's own LCP gatherer (`frame_sequence` trace bug); a direct
  `PerformanceObserver` on the same page reports LCP ≈ 1.6 s.
