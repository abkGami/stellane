import Container from '@/components/ui/Container';
import CountUp from '@/components/ui/CountUp';
import Eyebrow from '@/components/ui/Eyebrow';
import GlassCard from '@/components/ui/GlassCard';
import MiniBars from '@/components/ui/MiniBars';
import Reveal from '@/components/ui/Reveal';
import SectionHeading, { Lead } from '@/components/ui/SectionHeading';
import VideoBg from '@/components/ui/VideoBg';
import { ACCENT_GRADIENT } from '@/lib/constants';

const METRICS = [
  { value: 38, suffix: '%', label: 'fewer stockouts', bars: [42, 58, 47, 66, 71, 80] },
  { value: 2.1, decimals: 1, suffix: '×', label: 'faster planning cycles', bars: [36, 44, 61, 55, 72, 84] },
  { value: 94, suffix: '%', label: 'forecast confidence', bars: [48, 52, 63, 71, 78, 90] },
  { value: 12, suffix: ' wks', label: 'average time to first insight', bars: [30, 46, 39, 58, 67, 76] },
];

export default function ImpactMetrics() {
  return (
    <section className="relative mx-2 mt-20 overflow-hidden rounded-[24px] sm:mx-4 sm:mt-28 sm:rounded-[33px] lg:mt-36">
      <VideoBg offset={0.35} mirrored />

      <Container className="relative z-10 py-20 sm:py-28 lg:py-36">
        <Reveal>
          <Eyebrow>Impact</Eyebrow>
          <SectionHeading>
            Numbers that <span className={ACCENT_GRADIENT}>move with you</span>
          </SectionHeading>
          <Lead className="mt-6">Measured across live deployments.</Lead>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-4">
          {METRICS.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 100} className="h-full">
              <GlassCard className="flex h-full flex-col">
                <CountUp
                  value={metric.value}
                  decimals={metric.decimals ?? 0}
                  suffix={metric.suffix}
                  className="text-[44px] font-normal leading-none text-white sm:text-[64px]"
                />
                <p className="mt-3 text-[13px] leading-[1.35] text-white/70 sm:text-[15px]">
                  {metric.label}
                </p>
                <div className="mt-auto pt-6">
                  <MiniBars
                    heights={metric.bars}
                    projectedFrom={metric.bars.length - 1}
                    heightClass="h-[56px] sm:h-[72px]"
                    gap="gap-[3px]"
                    baseDelay={200 + i * 60}
                  />
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
