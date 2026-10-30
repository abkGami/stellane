import { useRef, useState, type KeyboardEvent } from 'react';
import { Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import GlassCard from '@/components/ui/GlassCard';
import MiniBars from '@/components/ui/MiniBars';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { ACCENT_GRADIENT, FOCUS_RING } from '@/lib/constants';

type UseCase = {
  id: string;
  label: string;
  heading: string;
  body: string;
  checks: string[];
  bars: number[];
};

const CASES: UseCase[] = [
  {
    id: 'finance',
    label: 'Finance',
    heading: 'Cash flow you can see coming.',
    body: 'Stellane reads your ledger and your pipeline together, then charts the months where the two disagree. You see the gap before it becomes a conversation.',
    checks: ['Rolling 13-week cash view', 'Scenario ranges, not single numbers', 'Every figure traced to its source'],
    bars: [34, 48, 41, 56, 62, 51, 44, 58, 71, 64, 59, 76, 81, 68, 55, 62, 74, 88, 79, 66, 58, 71, 84, 92, 76, 63, 69, 82, 45, 52, 38, 61],
  },
  {
    id: 'logistics',
    label: 'Logistics',
    heading: 'Capacity matched to demand, lanes ahead.',
    body: 'Connect your warehouse and transport feeds and Stellane maps the lanes that will tighten first. Planners get a week of warning instead of a morning of triage.',
    checks: ['Lane-level demand signals', 'Stockout risk by site', 'Read-only, no schema changes'],
    bars: [22, 35, 51, 44, 39, 57, 68, 55, 48, 62, 73, 66, 52, 47, 61, 78, 84, 71, 59, 64, 77, 89, 81, 68, 55, 49, 63, 79, 41, 57, 44, 70],
  },
  {
    id: 'energy',
    label: 'Energy',
    heading: 'Load forecasts that follow the weather.',
    body: 'Weather, tariffs and historic load arrive as one signal. Stellane charts the peak before it forms, so scheduling stops being reactive.',
    checks: ['Weather-adjusted load curves', 'Peak windows by region', 'Back-tested against last season'],
    bars: [41, 52, 63, 58, 47, 39, 33, 45, 61, 74, 82, 71, 60, 52, 44, 57, 69, 80, 88, 76, 64, 55, 48, 62, 75, 86, 79, 67, 51, 43, 56, 72],
  },
  {
    id: 'retail',
    label: 'Retail',
    heading: 'Stock the right shelf, every week.',
    body: 'Store-level demand, promotions and lead times in a single view. Buyers see which shelves will empty and which will overstock, weeks out.',
    checks: ['Store and SKU level', 'Promotion-aware forecasting', 'Weekly replenishment view'],
    bars: [29, 44, 58, 66, 54, 42, 36, 49, 63, 77, 85, 72, 61, 50, 43, 56, 70, 83, 90, 78, 65, 53, 46, 59, 73, 87, 80, 68, 48, 39, 54, 69],
  },
];

export default function UseCases() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = CASES[active];

  const focusTab = (index: number) => {
    const next = (index + CASES.length) % CASES.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      focusTab(index + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      focusTab(index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusTab(CASES.length - 1);
    }
  };

  return (
    <section className="bg-[#070918] py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal>
          <Eyebrow>Use cases</Eyebrow>
          <SectionHeading>
            One engine, <span className={ACCENT_GRADIENT}>every industry</span>
          </SectionHeading>
        </Reveal>

        <div role="tablist" aria-label="Industries" className="mt-8 flex flex-wrap gap-2 sm:mt-10">
          {CASES.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`usecase-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="usecase-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(event) => onKeyDown(event, i)}
                className={`inline-flex h-[44px] items-center rounded-[12px] px-5 text-[14px] font-[450] transition-colors ${FOCUS_RING} ${
                  selected
                    ? 'bg-[linear-gradient(135deg,#FFD7A8_0%,#FF8A6B_100%)] text-[#1A0A08]'
                    : 'bg-[rgba(12,15,40,0.42)] text-white/70 ring-1 ring-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div
          id="usecase-panel"
          role="tabpanel"
          aria-labelledby={`usecase-tab-${current.id}`}
          className="mt-6"
        >
          <GlassCard>
            <div key={current.id} className="animate-swap grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h3 className="text-[26px] font-normal leading-[1.05] tracking-[-0.02em] text-white sm:text-[34px]">
                  {current.heading}
                </h3>
                <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.45] text-white/70 sm:text-[16px]">
                  {current.body}
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {current.checks.map((check) => (
                    <li key={check} className="flex items-center gap-3 text-[15px] text-white/80">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(108,140,255,0.2)]">
                        <Check className="h-3.5 w-3.5 text-[#B7C6FF]" aria-hidden="true" />
                      </span>
                      {check}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[24px] bg-[rgba(7,9,24,0.35)] p-4 ring-1 ring-white/10 sm:p-6">
                <div className="mb-4 flex items-center justify-between text-[12px] font-[450] text-white/50">
                  <span>Projected volume</span>
                  <span className="text-[#B7C6FF]">+18.6%</span>
                </div>
                <MiniBars heights={current.bars} heightClass="h-[140px] sm:h-[180px]" runKey={current.id} gap="gap-[2px]" />
              </div>
            </div>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}
