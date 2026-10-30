import type { ReactNode } from 'react';

export default function SectionHeading({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className={`text-white text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-normal leading-[0.98] tracking-[-0.03em] ${className}`}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`text-white/70 text-[16px] sm:text-[18px] font-[450] leading-[1.35] max-w-[520px] ${className}`}
    >
      {children}
    </p>
  );
}
