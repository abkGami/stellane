import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { FOCUS_RING } from '@/lib/constants';

const BASE =
  'inline-flex items-center justify-center h-[46px] sm:h-[51px] px-5 sm:px-[27px] rounded-[12px] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px]';
const PRIMARY =
  'bg-[linear-gradient(135deg,#FFD7A8_0%,#FF8A6B_100%)] shadow-[0_8px_30px_-8px_rgba(255,138,107,0.5)] text-[#1A0A08] transition-[filter,transform] duration-200 hover:brightness-110 hover:-translate-y-px';
const GHOST =
  'border border-white/40 text-white transition-colors duration-200 hover:border-white hover:bg-white/5';

type Common = { children: ReactNode; className?: string; fullWidth?: boolean };

function cls(style: string, fullWidth?: boolean, extra = '') {
  return `${BASE} ${style} ${fullWidth ? 'w-full' : ''} ${FOCUS_RING} ${extra}`;
}

export function PrimaryButton({
  children,
  className = '',
  fullWidth,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cls(PRIMARY, fullWidth, className)} {...rest}>
      {children}
    </a>
  );
}

export function PrimaryButtonEl({
  children,
  className = '',
  fullWidth,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cls(PRIMARY, fullWidth, className)} {...rest}>
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className = '',
  fullWidth,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cls(GHOST, fullWidth, className)} {...rest}>
      {children}
    </a>
  );
}

export function GhostButtonEl({
  children,
  className = '',
  fullWidth,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cls(GHOST, fullWidth, className)} {...rest}>
      {children}
    </button>
  );
}
