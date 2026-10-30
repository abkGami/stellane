import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { easeOutExpo } from '@/lib/easing';

export default function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  duration = 1200,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(value * easeOutExpo(t));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setDisplay(value);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, duration]);

  const format = (n: number) => {
    const [whole, fraction] = n.toFixed(decimals).split('.');
    const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return fraction ? `${grouped}.${fraction}` : grouped;
  };

  const visible = format(display);
  const finalValue = format(value);

  return (
    <span
      ref={ref}
      className={`tabular-nums ${className}`}
      aria-label={`${prefix}${finalValue}${suffix}`}
    >
      <span aria-hidden="true">
        {prefix}
        {visible}
        {suffix}
      </span>
    </span>
  );
}
