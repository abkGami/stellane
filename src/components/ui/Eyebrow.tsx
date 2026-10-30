import type { ReactNode } from 'react';
import Doodle from '@/components/ui/Doodle';

export default function Eyebrow({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`flex items-center gap-3 text-[#B7C6FF] text-[12px] font-[450] uppercase tracking-[0.18em] leading-none mb-5 ${className}`}
    >
      <Doodle name="star" className="h-3.5 w-3.5 shrink-0" draw={false} float={false} />
      {children}
    </span>
  );
}
