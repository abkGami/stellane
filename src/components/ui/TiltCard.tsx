import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function TiltCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const inner = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    setEnabled(fine && !reduced);
  }, [reduced]);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = inner.current;
    if (!enabled || !el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 12;
    el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    if (glare.current) {
      glare.current.style.background = `radial-gradient(320px circle at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, rgba(255,255,255,0.10), transparent 62%)`;
    }
  };

  const onLeave = () => {
    if (inner.current) inner.current.style.transform = '';
    if (glare.current) glare.current.style.background = '';
  };

  return (
    <div className={`transition-transform duration-200 hover:-translate-y-1 ${className}`}>
      <div
        ref={inner}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative h-full rounded-[24px] sm:rounded-[33px] transition-transform duration-200 [transform-style:preserve-3d]"
      >
        <div
          ref={glare}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[24px] sm:rounded-[33px]"
        />
        {children}
      </div>
    </div>
  );
}
