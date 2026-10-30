import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import Container from '@/components/ui/Container';
import Doodle from '@/components/ui/Doodle';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Eyebrow from '@/components/ui/Eyebrow';
import GlassCard from '@/components/ui/GlassCard';
import Reveal from '@/components/ui/Reveal';
import SectionHeading, { Lead } from '@/components/ui/SectionHeading';
import VideoBg from '@/components/ui/VideoBg';
import { ACCENT_GRADIENT } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const StarTerrain = lazy(() => import('@/three/StarTerrain'));

const STEPS = [
  {
    n: '01',
    label: 'Gather',
    body: 'Connect warehouses, ledgers and live feeds in hours, not quarters.',
  },
  {
    n: '02',
    label: 'Reason',
    body: 'Models trace cause and effect, so every forecast comes with its why.',
  },
  {
    n: '03',
    label: 'Forecast',
    body: 'Scenario forecasts you can stress-test before you commit.',
  },
];

function GridPlaceholder() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(180deg,#0B0F26,#070918)]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(183,198,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(183,198,255,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}

function Annotations() {
  return (
    <>
      <div className="pointer-events-none absolute left-4 top-5 flex items-center gap-2 sm:left-6 sm:top-6">
        <Doodle
          name="arrow-curl"
          className="h-7 w-8 text-[#B7C6FF]/70"
          draw={false}
          float={false}
        />
        <span className="inline-flex h-[28px] items-center rounded-[8px] bg-[rgba(12,15,40,0.7)] px-[10px] text-[11px] font-[450] uppercase tracking-[0.14em] text-[#B7C6FF] ring-1 ring-white/10 backdrop-blur-[17px]">
          Confidence 94%
        </span>
      </div>
      <span className="pointer-events-none absolute right-4 top-6 inline-flex h-[28px] items-center rounded-[8px] bg-[rgba(12,15,40,0.7)] px-[10px] text-[11px] font-[450] uppercase tracking-[0.14em] text-white/70 ring-1 ring-white/10 backdrop-blur-[17px] sm:right-6">
        Projected
      </span>
      <Doodle
        name="crosshair"
        className="pointer-events-none absolute bottom-6 right-5 h-9 w-9 text-[#B7C6FF]/50"
        draw={false}
      />
    </>
  );
}

export default function Platform() {
  const { ref, progress, progressRef } = useScrollProgress<HTMLElement>('cover');
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [failed, setFailed] = useState(false);
  const showFallback = fallback || failed;

  useEffect(() => {
    let allowed = !reduced;
    if (allowed) {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        allowed = Boolean(gl);
      } catch {
        allowed = false;
      }
    }
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    if (typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4) allowed = false;
    if (nav.connection?.saveData) allowed = false;
    setFallback(!allowed);
  }, [reduced]);

  useEffect(() => {
    const el = frameRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNear(true);
      setActive(true);
      return;
    }

    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          nearObserver.disconnect();
        }
      },
      { rootMargin: '150% 0px' },
    );
    const viewObserver = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.01,
    });

    nearObserver.observe(el);
    viewObserver.observe(el);

    return () => {
      nearObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  // Below lg the stage is not sticky, so section progress saturates within the
  // first screen and the highlight no longer follows the card being read. There
  // it tracks whichever step sits closest to the viewport centre instead.
  const stepsRef = useRef<HTMLDivElement>(null);
  const [isLg, setIsLg] = useState(false);
  const [listedStep, setListedStep] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsLg(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (isLg) return;
    const wrap = stepsRef.current;
    if (!wrap) return;
    const cards = Array.from(wrap.querySelectorAll<HTMLElement>('.platform-step'));
    if (!cards.length) return;

    let frame = 0;
    const pick = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestGap = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const gap = Math.abs(r.top + r.height / 2 - mid);
        if (gap < bestGap) {
          bestGap = gap;
          best = i;
        }
      });
      setListedStep(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };

    pick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isLg]);

  const step = progress < 1 / 3 ? 0 : progress < 2 / 3 ? 1 : 2;
  const activeStep = isLg ? step : listedStep;

  const stepProgress = useMemo(
    () =>
      STEPS.map((_, i) => Math.min(1, Math.max(0, (progress - i / 3) * 3))),
    [progress],
  );
  const barScale = (i: number) => (isLg ? stepProgress[i] : activeStep === i ? 1 : 0);

  return (
    <section id="platform" ref={ref} className="relative bg-[#0B0F26] lg:h-[300vh] lg:scroll-mt-0">
      <div className="platform-stage lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <Container className="platform-inner flex h-full flex-col gap-10 py-20 sm:py-28 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-0 lg:pt-[92px]">
          <div className="order-2 max-w-[480px] lg:order-1">
            <Reveal>
              <Eyebrow>Platform</Eyebrow>
              <SectionHeading className="platform-title">
                One platform, from raw signal to a{' '}
                <span className={ACCENT_GRADIENT}>clear bearing</span>
              </SectionHeading>
              <Lead className="platform-lead mt-6">
                Stellane ingests your data, reasons across it, and charts what happens next.
              </Lead>
            </Reveal>

            <div ref={stepsRef} className="platform-steps mt-8 flex flex-col gap-3">
              {STEPS.map((item, i) => {
                const current = activeStep === i;
                return (
                  <Reveal key={item.n} delay={100 + i * 100}>
                    <div className={current ? '' : 'opacity-70'}>
                      <GlassCard className="platform-step relative overflow-hidden p-4 sm:p-6">
                        <div className="flex items-start gap-4">
                          <span
                            className={`platform-step-num text-[12px] font-[450] uppercase tracking-[0.18em] ${
                              current ? 'text-[#B7C6FF]' : 'text-white/40'
                            }`}
                          >
                            {item.n}
                          </span>
                          <div>
                            <h3 className="platform-step-title text-[16px] font-[450] uppercase tracking-[0.12em] text-white">
                              {item.label}
                            </h3>
                            <p className="platform-step-body mt-2 text-[14px] leading-[1.45] text-white/70 sm:text-[15px]">
                              {item.body}
                            </p>
                          </div>
                        </div>
                        <div
                          aria-hidden="true"
                          className={`absolute bottom-0 left-0 h-px w-full origin-left bg-[linear-gradient(90deg,#6C8CFF,#FF8A6B)] transition-opacity duration-300 ${
                            current ? 'opacity-100' : 'opacity-0'
                          }`}
                          style={{ transform: `scaleX(${barScale(i)})` }}
                        />
                        {current && (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-[#B7C6FF]/60 sm:rounded-[33px]"
                          />
                        )}
                      </GlassCard>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div
              ref={frameRef}
              className="platform-frame relative h-[320px] w-full overflow-hidden rounded-[24px] bg-[#0B0F26] ring-1 ring-white/10 sm:h-[420px] sm:rounded-[33px] lg:h-[70vh]"
            >
              {showFallback ? (
                <VideoBg offset={0.5} />
              ) : (
                near && (
                  <ErrorBoundary
                    fallback={<VideoBg offset={0.5} />}
                    onError={() => setFailed(true)}
                  >
                    <Suspense fallback={<GridPlaceholder />}>
                      <StarTerrain
                        progressRef={progressRef}
                        step={activeStep}
                        active={active}
                        onReady={() => setReady(true)}
                        onFail={() => setFailed(true)}
                      />
                    </Suspense>
                  </ErrorBoundary>
                )
              )}

              <div
                aria-hidden="true"
                className={`absolute inset-0 transition-opacity duration-[400ms] ${
                  (ready && active) || showFallback ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <GridPlaceholder />
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_55%,rgba(7,9,24,0.85)_100%)]"
              />

              <Annotations />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
