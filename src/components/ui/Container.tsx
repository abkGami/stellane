import type { ReactNode } from 'react';
import { CONTAINER } from '@/lib/constants';

export default function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${CONTAINER} ${className}`}>{children}</div>;
}
