import type { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale';

const DIRECTION_CLASS: Record<Direction, string> = {
  up: 'animate-fade-up',
  down: 'animate-fade-down',
  left: 'animate-fade-left',
  right: 'animate-fade-right',
  scale: 'animate-fade-scale',
};

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  threshold = 0.2,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  threshold?: number;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(threshold);

  const animated = inView ? `opacity-0 ${DIRECTION_CLASS[direction]}` : 'opacity-0';
  const still = inView ? 'opacity-100' : 'opacity-0';

  return (
    <div
      ref={ref}
      className={`${reduced ? `transition-opacity duration-200 ${still}` : animated} ${className}`}
      style={reduced ? undefined : { animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
