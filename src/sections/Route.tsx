import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import GlassCard from '@/components/ui/GlassCard';
import Reveal from '@/components/ui/Reveal';
import SectionHeading, { Lead } from '@/components/ui/SectionHeading';
import Doodle from '@/components/ui/Doodle';
import { ACCENT_GRADIENT } from '@/lib/constants';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const LEGS = [
  { n: '01', title: 'Connect', body: 'Plug in your sources with read-only access.', chip: 'DAY 1' },
  { n: '02', title: 'Model', body: 'We map your business logic and train on your history.', chip: 'WEEK 2' },
  { n: '03', title: 'Validate', body: 'Back-test every forecast against what actually happened.', chip: 'WEEK 4' },
  { n: '04', title: 'Deploy', body: 'Push forecasts to the tools your team already uses.', chip: 'WEEK 6' },
];

export default function Route() {
  const { ref, progress } = useScrollProgress<HTMLElement>('enter');

  return (
    <section id="route" ref={ref} className="bg-[#0B0F26] py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal>
          <Eyebrow>The route</Eyebrow>
          <SectionHeading>
            From first signal to first forecast in{' '}
            <span className={ACCENT_GRADIENT}>four legs</span>
          </SectionHeading>
          <Lead className="mt-6">
            A short, supervised route. You keep the data; we build the bearing.
          </Lead>
        </Reveal>

        <div className="relative mt-14 sm:mt-20">
          <div aria-hidden="true" className="absolute bottom-0 left-[15px] top-0 w-px bg-white/15 lg:left-1/2" />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[15px] top-0 w-px origin-top bg-[linear-gradient(180deg,#6C8CFF,#FF8A6B)] lg:left-1/2"
            style={{ transform: `scaleY(${progress})` }}
          />

          {LEGS.map((leg, i) => {
            const passed = progress * 4 >= i + 0.35;
            const left = i % 2 === 0;
            return (
              <div key={leg.n} className="relative pb-8 pl-12 last:pb-0 sm:pb-12 lg:pl-0">
                <div className={`lg:w-[calc(50%-48px)] ${left ? 'lg:mr-auto' : 'lg:ml-auto'}`}>
                  <Reveal delay={(i % 2) * 100}>
                    <GlassCard className="relative">
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <span className="text-[12px] font-[450] uppercase tracking-[0.18em] text-[#B7C6FF]">
                          {leg.n}
                        </span>
                        <span className="inline-flex h-[28px] items-center rounded-[8px] bg-[rgba(108,140,255,0.2)] px-[10px] text-[12px] font-[450] text-[#B7C6FF]">
                          {leg.chip}
                        </span>
                      </div>
                      <h3 className="text-[22px] font-[450] text-white sm:text-[26px]">{leg.title}</h3>
                      <p className="mt-2 text-[15px] leading-[1.45] text-white/70">{leg.body}</p>
                      {i === 1 && (
                        <Doodle
                          name="compass"
                          className="absolute bottom-4 right-5 hidden h-9 w-9 text-[#B7C6FF]/60 lg:block"
                        />
                      )}
                    </GlassCard>
                  </Reveal>
                </div>

                <span
                  aria-hidden="true"
                  className={`absolute left-[9px] top-7 h-3 w-3 rounded-full transition-colors duration-300 lg:left-1/2 lg:-translate-x-1/2 ${
                    passed
                      ? 'bg-[#B7C6FF] ring-4 ring-[#6C8CFF]/25'
                      : 'border border-white/30 bg-[#0B0F26]'
                  }`}
                />
              </div>
            );
          })}

          <Doodle
            name="comet"
            className="absolute -bottom-6 left-[7px] h-8 w-8 text-[#FFD7A8] lg:left-[calc(50%-16px)]"
          />
        </div>
      </Container>
    </section>
  );
}
