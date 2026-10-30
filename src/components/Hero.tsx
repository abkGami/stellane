import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const BAR_HEIGHTS = [
  23, 40, 53, 40, 33, 14, 7, 17, 75, 65,
  88, 75, 65, 47, 33, 88, 4, 7, 9, 14,
  95, 65, 79, 37, 7, 40, 17, 20, 62, 47,
  92, 72,
];

const NAV_LINKS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Customers', href: '#customers' },
  { label: 'Journal', href: '#' },
];

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-[#B7C6FF] focus-visible:outline-offset-[3px]';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale';

const DIRECTION_CLASS: Record<Direction, string> = {
  up: 'animate-fade-up',
  down: 'animate-fade-down',
  left: 'animate-fade-left',
  right: 'animate-fade-right',
  scale: 'animate-fade-scale',
};

function Animate({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
}) {
  return (
    <div
      className={`opacity-0 ${DIRECTION_CLASS[direction]} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function RevenueCard() {
  const maxHeight = Math.max(...BAR_HEIGHTS);

  return (
    <Animate delay={900} direction="scale" className="w-full max-w-[405px] mx-auto lg:mx-0">
      <div className="relative">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <div className="h-[380px] w-[380px] rounded-full bg-[#6C8CFF]/[0.14] blur-[90px]" />
          <div className="absolute left-[60px] top-[70px] h-[380px] w-[380px] rounded-full bg-[#FF8A6B]/[0.10] blur-[90px]" />
        </div>

        <div className="w-full rounded-[24px] sm:rounded-[33px] bg-[rgba(12,15,40,0.42)] ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[20px] p-5 sm:p-8 pb-5 sm:pb-6">
          <p className="text-white text-[16px] sm:text-[20px] font-[450] leading-[20px] mb-3 sm:mb-4">
            Projected Growth
          </p>
          <p className="mb-2 sm:mb-3">
            <span className="text-white text-[28px] sm:text-[46px] font-[450] leading-[1]">$14,205,890</span>
            <span className="text-white/20 text-[28px] sm:text-[46px] font-[450] leading-[1]">.00</span>
          </p>
          <div className="flex items-center gap-[10px] mb-6 sm:mb-8">
            <span className="px-[6px] py-[7px] bg-[rgba(108,140,255,0.2)] rounded-[6px] text-[#B7C6FF] text-[12px] sm:text-[14px] font-[450] leading-[14px]">
              +32.4%
            </span>
            <span className="text-white/80 text-[12px] sm:text-[14px] font-[450] leading-[14px] opacity-70">
              vs. previous period ($10.7M)
            </span>
          </div>

          <div className="relative">
            <div className="flex items-end gap-[1.5px] h-[80px] sm:h-[100px]">
              {BAR_HEIGHTS.map((h, i) => {
                const isProjected = i >= 28;
                const heightPercent = (h / maxHeight) * 100;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-[0.5px] animate-bar-grow origin-bottom"
                    style={{
                      height: `${heightPercent}%`,
                      background: isProjected
                        ? 'rgba(108,140,255,0.28)'
                        : 'linear-gradient(to top, rgba(108,140,255,0.6), #FFFFFF)',
                      animationDelay: `${1100 + i * 30}ms`,
                    }}
                  />
                );
              })}
            </div>

            <div className="absolute inset-0 pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-px bg-[rgba(183,198,255,0.10)]"
                  style={{ left: `${((i + 1) / 5) * 100}%` }}
                />
              ))}
            </div>

            <div className="flex justify-between mt-3">
              {['10:00', '12:00', '14:00', '16:00', '16:00'].map((label, i) => (
                <span
                  key={i}
                  className="text-[9px] sm:text-[10px] font-[450] leading-[10px] text-white/80"
                  style={{ opacity: i >= 3 ? 0.4 : 1 }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Animate>
  );
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !prefersReducedMotion) return;
    video.pause();
    video.currentTime = 0;
  }, [prefersReducedMotion]);

  return (
    <section
      id="top"
      className="relative w-full h-screen supports-[height:100svh]:h-[100svh] overflow-hidden bg-[#070918]"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_092641_de52eb87-daf2-41db-92cb-7a56eae012a5.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-0 bottom-0 h-[28%] pointer-events-none bg-[linear-gradient(180deg,transparent,#070918)]"
        aria-hidden="true"
      />

      <div className="relative z-10 h-full flex flex-col">
        <Nav />

        <div className="flex-1 flex items-center py-8">
          <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-12">
            <div className="max-w-[593px]">
              <Animate delay={300} direction="up">
                <h1 className="text-white text-[36px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-normal leading-[0.95] mb-5 sm:mb-8 tracking-[-0.035em]">
                  Navigate{' '}
                  <span className="bg-[linear-gradient(90deg,#FFFFFF_0%,#B7C6FF_55%,#FFB59E_100%)] bg-clip-text text-transparent">
                    what comes next
                  </span>{' '}
                  with your data
                </h1>
              </Animate>

              <Animate delay={500} direction="up">
                <p className="text-white/80 text-[16px] sm:text-[18px] md:text-[20px] font-[450] leading-[1.3] max-w-[370px] mb-7 sm:mb-10">
                  Reasoning systems and forecasting models that map the unknown
                </p>
              </Animate>

              <Animate delay={700} direction="up">
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <a
                    href="#access"
                    className={`inline-flex items-center h-[46px] sm:h-[51px] px-5 sm:px-[27px] bg-[linear-gradient(135deg,#FFD7A8_0%,#FF8A6B_100%)] shadow-[0_8px_30px_-8px_rgba(255,138,107,0.5)] rounded-[12px] text-[#1A0A08] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-[filter,transform] duration-200 hover:brightness-110 hover:-translate-y-px ${FOCUS_RING}`}
                  >
                    Get early access
                  </a>
                  <a
                    href="#contact"
                    className={`inline-flex items-center h-[46px] sm:h-[51px] px-5 sm:px-[27px] rounded-[12px] border border-white/40 text-white text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-colors duration-200 hover:border-white hover:bg-white/5 ${FOCUS_RING}`}
                  >
                    Talk to our team
                  </a>
                </div>
              </Animate>
            </div>

            <RevenueCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Nav({ onOpenChange }: { onOpenChange?: (open: boolean) => void } = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      onOpenChange?.(next);
      return next;
    });
  };

  const close = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        close();
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    let frame = 0;
    const started = performance.now();
    const focusFirst = () => {
      const target = panelRef.current?.querySelector<HTMLElement>('a, button');
      if (target && getComputedStyle(target).visibility === 'visible') {
        target.focus();
        return;
      }
      if (performance.now() - started < 700) frame = requestAnimationFrame(focusFirst);
    };
    frame = requestAnimationFrame(focusFirst);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <nav className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] pt-[20px] sm:pt-[30px] flex items-center justify-between relative z-50">
        <Animate delay={0} direction="down">
          <div className="flex items-center gap-2.5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 256 256"
              fill="none"
              className="sm:w-[32px] sm:h-[32px]"
              aria-hidden="true"
            >
              <path
                d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z"
                fill="white"
              />
            </svg>
            <span className="text-white text-[22px] sm:text-[26px] font-[450] leading-none tracking-[-0.02em]">
              Stellane
            </span>
          </div>
        </Animate>

        <Animate delay={100} direction="down" className="hidden lg:block">
          <div className="h-[52px] px-6 flex items-center gap-[30px] bg-[rgba(10,12,32,0.45)] ring-1 ring-white/10 rounded-[11px] backdrop-blur-[17px]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`group relative flex h-[52px] items-center gap-[5px] text-white/80 text-[14px] font-[450] leading-[14px] hover:text-white transition-colors rounded-[4px] ${FOCUS_RING}`}
              >
                <span className="relative">
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#B7C6FF] transition-transform duration-200 group-hover:scale-x-100"
                  />
                </span>
                {link.label === 'Platform' && <ChevronDown className="w-[10px] h-[10px] opacity-80" />}
              </a>
            ))}
          </div>
        </Animate>

        <Animate delay={200} direction="down" className="hidden lg:block">
          <div className="h-[52px] p-[3px] bg-[rgba(5,7,22,0.5)] ring-1 ring-white/10 rounded-[13px] backdrop-blur-[17px] flex items-center gap-[5px]">
            <button
              className={`h-[46px] px-6 rounded-[11px] text-white text-[14px] font-[450] leading-[14px] hover:bg-white/5 transition-colors ${FOCUS_RING}`}
            >
              Login
            </button>
            <a
              href="#access"
              className={`inline-flex items-center h-[46px] px-6 bg-[linear-gradient(135deg,#FFD7A8_0%,#FF8A6B_100%)] shadow-[0_8px_30px_-8px_rgba(255,138,107,0.5)] rounded-[11px] text-[#1A0A08] text-[14px] font-[450] leading-[14px] transition-[filter,transform] duration-200 hover:brightness-110 hover:-translate-y-px ${FOCUS_RING}`}
            >
              Get early access
            </a>
          </div>
        </Animate>

        <Animate delay={100} direction="down" className="lg:hidden">
          <button
            ref={toggleRef}
            className={`w-[44px] h-[44px] flex items-center justify-center rounded-[11px] bg-[rgba(10,12,32,0.45)] ring-1 ring-white/10 backdrop-blur-[17px] transition-colors hover:bg-white/10 ${FOCUS_RING}`}
            onClick={toggle}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls={menuId}
          >
            <div className="relative w-5 h-5">
              <Menu
                className={`w-5 h-5 text-white absolute inset-0 transition-all duration-300 ease-out ${
                  isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                className={`w-5 h-5 text-white absolute inset-0 transition-all duration-300 ease-out ${
                  isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                }`}
              />
            </div>
          </button>
        </Animate>
      </nav>

      <div
        id={menuId}
        className={`lg:hidden fixed inset-0 z-40 transition-[visibility] duration-0 ${
          isOpen ? 'visible delay-0' : 'invisible delay-500'
        }`}
      >
        <div
          className={`absolute inset-0 bg-[#070918]/90 backdrop-blur-[24px] transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={close}
          aria-hidden="true"
        />

        <div
          ref={panelRef}
          className={`absolute top-[76px] sm:top-[86px] left-4 right-4 sm:left-6 sm:right-6 bg-[rgba(12,15,40,0.7)] backdrop-blur-[30px] rounded-[20px] border border-white/10 p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top ${
            isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-[0.97]'
          }`}
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setIsOpen(false);
                  onOpenChange?.(false);
                }}
                className={`flex items-center justify-between px-4 py-4 rounded-[12px] text-white/90 text-[18px] font-[450] hover:bg-white/[0.06] transition-all duration-300 ${
                  isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                } ${FOCUS_RING}`}
                style={{ transitionDelay: isOpen ? `${100 + i * 50}ms` : '0ms' }}
              >
                {link.label}
                {link.label === 'Platform' && <ChevronDown className="w-4 h-4 opacity-50" />}
              </a>
            ))}
          </div>

          <div className="h-px bg-white/10 my-5" />

          <div
            className={`flex flex-col gap-3 transition-all duration-300 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: isOpen ? '350ms' : '0ms' }}
          >
            <a
              href="#access"
              onClick={() => {
                setIsOpen(false);
                onOpenChange?.(false);
              }}
              className={`flex items-center justify-center w-full h-[50px] bg-[linear-gradient(135deg,#FFD7A8_0%,#FF8A6B_100%)] shadow-[0_8px_30px_-8px_rgba(255,138,107,0.5)] rounded-[12px] text-[#1A0A08] text-[15px] font-[450] transition-[filter,transform] duration-200 hover:brightness-110 ${FOCUS_RING}`}
            >
              Get early access
            </a>
            <button
              className={`w-full h-[50px] rounded-[12px] border border-white/30 text-white text-[15px] font-[450] transition-colors hover:bg-white/5 ${FOCUS_RING}`}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
