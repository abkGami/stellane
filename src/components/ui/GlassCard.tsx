import type { ReactNode } from 'react';
import { GLASS } from '@/lib/constants';

export default function GlassCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${GLASS} p-5 sm:p-8 ${className}`}>{children}</div>;
}
