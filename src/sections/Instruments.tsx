import { useEffect, useRef, useState, type ReactNode } from 'react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import GlassCard from '@/components/ui/GlassCard';
import MiniBars from '@/components/ui/MiniBars';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import TiltCard from '@/components/ui/TiltCard';
import { GhostButton } from '@/components/ui/Buttons';
import { ACCENT_GRADIENT } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { easeOutExpo } from '@/lib/easing';

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[12px] bg-white/5 ring-1 ring-white/10">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-[#B7C6FF]"
        aria-hidden="true"
      >
        {children}
      </svg>
    </div>
  );
}

function Sparkline() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 240 80" fill="none" className="h-[80px] w-full" aria-hidden="true">
        <path
          d="M2 62 L28 54 L52 58 L78 44 L104 49 L130 34 L156 41 L182 16 L208 30 L238 22"
          stroke="#B7C6FF"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          className="doodle-path"
          style={{ strokeDashoffset: inView ? 0 : 1 }}
        />
        <circle cx="182" cy="16" r="3" fill="#FFD36E" opacity={inView ? 1 : 0} className="animate-pulse" />
        <circle cx="182" cy="16" r="7" fill="#FFD36E" opacity={inView ? 0.18 : 0} />
      </svg>
    </div>
  );
}

function useTween(target: number, duration = 300) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    if (reduced) {
      from.current = target;
      setDisplay(target);
      return;
    }

    const startedAt = performance.now();
    const start = from.current;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAt) / duration);
      setDisplay(Math.round(start + (target - start) * easeOutExpo(t)));
      if (t < 1) frame = requestAnimationFrame(tick);
      else from.current = target;
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, reduced]);

  return display;
}

function ScenarioSliders() {
  const [values, setValues] = useState([42, 64, 31]);
  const total = useTween(values.reduce((sum, v) => sum + v, 0));

  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="text-[38px] font-normal leading-none text-white tabular-nums">{total}</span>
        <span className="text-[12px] font-[450] text-[#B7C6FF]">projected index</span>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {values.map((value, i) => (
          <label key={i} className="flex items-center gap-3">
            <span className="w-14 shrink-0 text-[11px] font-[450] uppercase tracking-[0.12em] text-white/40">
              Input {i + 1}
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              aria-label={`Scenario input ${i + 1}`}
              onChange={(event) => {
                const next = [...values];
                next[i] = Number(event.target.value);
                setValues(next);
              }}
              className="h-11 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#B7C6FF] [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#FF8A6B] [&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-white/15 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-white/15 [&::-webkit-slider-thumb]:mt-[-5px] [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF8A6B]"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function RiskGauge() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const length = Math.PI * 70;
  const value = 72;

  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 180 132" className="h-[132px] w-full" fill="none" aria-hidden="true">
        <path d="M20 90 A70 70 0 0 1 160 90" stroke="rgba(255,255,255,0.10)" strokeWidth={6} strokeLinecap="round" />
        <path
          d="M20 90 A70 70 0 0 1 160 90"
          stroke="#6C8CFF"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={length}
          strokeDashoffset={inView ? length * (1 - value / 100) : length}
          style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(0.16,1,0.3,1)' }}
        />
        <g
          style={{
            transform: `rotate(${inView ? (value / 100) * 180 : 0}deg)`,
            transformOrigin: '90px 90px',
            transition: 'transform 900ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <line x1="90" y1="90" x2="30" y2="90" stroke="#FFD7A8" strokeWidth={2} strokeLinecap="round" />
        </g>
        <circle cx="90" cy="90" r="4" fill="#FF8A6B" />
      </svg>
      <div className="absolute inset-x-0 bottom-1 flex justify-center">
        <span className="text-[30px] font-normal leading-none text-white tabular-nums">{value}</span>
      </div>
    </div>
  );
}

function NodeGraph() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const nodes: Array<[number, number]> = [
    [24, 58],
    [74, 26],
    [110, 62],
    [158, 20],
    [186, 58],
    [132, 96],
  ];
  const links: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [2, 5],
    [5, 4],
    [0, 2],
  ];

  return (
    <div ref={ref}>
      <svg viewBox="0 0 220 116" className="h-[116px] w-full" fill="none" aria-hidden="true">
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            stroke="rgba(183,198,255,0.45)"
            strokeWidth={1.25}
            pathLength={1}
            className="doodle-path"
            style={{ strokeDashoffset: inView ? 0 : 1, transitionDelay: `${i * 90}ms` }}
          />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={9} fill="#6C8CFF" opacity={0.12} className={inView ? 'animate-pulse' : ''} style={{ animationDelay: `${i * 180}ms` }} />
            <circle cx={x} cy={y} r={3.2} fill="#B7C6FF" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function ConnectorMarquee() {
  const chips = [
    'Warehouse',
    'Ledger',
    'CRM',
    'ERP',
    'Streams',
    'Sheets',
    'API',
    'Files',
    'Billing',
    'Support',
  ];

  return (
    <div className="marquee-wrap mask-marquee w-full overflow-hidden">
      <div className="marquee-track flex w-max items-center gap-2">
        {[...chips, ...chips].map((chip, i) => (
          <span
            key={`${chip}-${i}`}
            className="inline-flex h-[28px] shrink-0 items-center whitespace-nowrap rounded-[8px] border border-white/10 px-[10px] text-[12px] font-[450] text-white/60"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

const CARDS = [
  {
    title: 'Demand forecasting',
    body: 'See the shape of demand before it lands, down to the week.',
    span: 'lg:col-span-3',
    visual: <MiniBars heightClass="h-[72px]" />,
    icon: (
      <>
        <path d="M4 20V10" />
        <path d="M9 20V5" />
        <path d="M14 20v-7" />
        <path d="M19 20V8" />
      </>
    ),
  },
  {
    title: 'Anomaly detection',
    body: 'Every spike gets caught early, with the signal that caused it.',
    span: 'lg:col-span-3',
    visual: <Sparkline />,
    icon: (
      <>
        <path d="M2 13h4l2.5-7 4 13 3-9 2 3H22" />
      </>
    ),
  },
  {
    title: 'Scenario planning',
    body: 'Move the inputs, watch the outcome, decide with the range in view.',
    span: 'lg:col-span-2',
    visual: <ScenarioSliders />,
    icon: (
      <>
        <path d="M4 7h10" />
        <path d="M18 7h2" />
        <path d="M4 17h4" />
        <path d="M12 17h8" />
        <circle cx="16" cy="7" r="2" />
        <circle cx="10" cy="17" r="2" />
      </>
    ),
  },
  {
    title: 'Risk scoring',
    body: 'One score per exposure, traced back to the factors that moved it.',
    span: 'lg:col-span-2',
    visual: <RiskGauge />,
    icon: (
      <>
        <path d="M12 3a9 9 0 0 1 9 9" />
        <path d="M3 12a9 9 0 0 1 9-9" />
        <path d="M12 21a9 9 0 0 1-9-9" />
        <path d="M12 12l4-4" />
        <circle cx="12" cy="12" r="1.6" />
      </>
    ),
  },
  {
    title: 'Explainability',
    body: 'Each forecast arrives with its reasoning, not just a number.',
    span: 'lg:col-span-2',
    visual: <NodeGraph />,
    icon: (
      <>
        <circle cx="5" cy="6" r="2.2" />
        <circle cx="19" cy="9" r="2.2" />
        <circle cx="9" cy="19" r="2.2" />
        <path d="M7 7l10 1.4" />
        <path d="M6.4 8.1l2 9" />
        <path d="M10.8 18l6.6-7" />
      </>
    ),
  },
  {
    title: 'Connectors',
    body: 'Warehouses, ledgers and live feeds — read-only, connected in hours.',
    span: 'sm:col-span-2 lg:col-span-6',
    visual: <ConnectorMarquee />,
    icon: (
      <>
        <path d="M9 3v6" />
        <path d="M15 3v6" />
        <path d="M6 9h12v3a6 6 0 0 1-12 0V9Z" />
        <path d="M12 18v3" />
      </>
    ),
  },
];

export default function Instruments() {
  return (
    <section className="bg-[#070918] py-20 sm:py-28 lg:py-36">
      <Container>
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Instruments</Eyebrow>
            <Reveal delay={0}>
              <SectionHeading>
                Built for the questions that{' '}
                <span className={ACCENT_GRADIENT}>matter</span>
              </SectionHeading>
            </Reveal>
          </div>
          <Reveal delay={100} className="shrink-0">
            <GhostButton href="#platform">Explore the platform</GhostButton>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 100} className={card.span}>
              <TiltCard className="h-full">
                <GlassCard className="flex h-full flex-col hover:ring-white/20">
                  <IconFrame>{card.icon}</IconFrame>
                  <h3 className="text-[20px] font-[450] text-white sm:text-[24px]">{card.title}</h3>
                  <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.45] text-white/70 sm:text-[16px]">
                    {card.body}
                  </p>
                  <div className="mt-auto pt-6">{card.visual}</div>
                </GlassCard>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
