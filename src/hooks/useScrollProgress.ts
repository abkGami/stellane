import { useEffect, useRef, useState } from 'react';

export type ScrollMode = 'cover' | 'enter';

/**
 * Tracks how far an element has travelled. Measurements are cached on mount and
 * resize; scroll handlers only do arithmetic inside a rAF, never layout reads.
 */
export function useScrollProgress<T extends HTMLElement>(mode: ScrollMode = 'enter') {
  const ref = useRef<T | null>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let top = 0;
    let height = 0;
    let viewport = 0;
    let frame = 0;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      top = rect.top + window.scrollY;
      height = rect.height;
      viewport = window.innerHeight;
    };

    const compute = () => {
      frame = 0;
      const denominator = mode === 'cover' ? height - viewport : height + viewport;
      const offset = mode === 'cover' ? window.scrollY - top : window.scrollY + viewport - top;
      const next = Math.min(1, Math.max(0, offset / Math.max(1, denominator)));
      progressRef.current = next;
      const quantized = Math.round(next * 100) / 100;
      setProgress((prev) => (prev === quantized ? prev : quantized));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    const onResize = () => {
      measure();
      compute();
    };

    measure();
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const refresh = window.setTimeout(onResize, 400);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(refresh);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mode]);

  return { ref, progress, progressRef };
}
