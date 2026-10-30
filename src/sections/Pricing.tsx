import { useState } from 'react';
import { Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import CountUp from '@/components/ui/CountUp';
import Eyebrow from '@/components/ui/Eyebrow';
import GlassCard from '@/components/ui/GlassCard';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import TiltCard from '@/components/ui/TiltCard';
import { GhostButton, PrimaryButton } from '@/components/ui/Buttons';
import { ACCENT_GRADIENT, FOCUS_RING } from '@/lib/constants';

const PLANS = [
  {
    name: 'Pilot',
    monthly: 490,
    tagline: 'One team, one forecast, proved out.',
    features: [
      'Up to 3 data sources',
      'Weekly forecast refresh',
      'Scenario ranges',
      'Shared dashboards',
      'Email support',
    ],
    featured: false,
  },
  {
    name: 'Voyager',
    monthly: 1900,
    tagline: 'The whole planning function, in one view.',
    features: [
      'Unlimited data sources',
      'Daily forecast refresh',
      'Back-testing and validation',
      'Explainability trails',
      'Named solutions engineer',
    ],
    featured: true,
  },
  {
    name: 'Fleet',
    monthly: null,
    tagline: 'Many teams, one bearing, your rules.',
    features: [
      'Everything in Voyager',
      'Private deployment',
      'Custom model review',
      'SSO and audit logs',
      'Priority support',
    ],
    featured: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-[#070918] py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal>
          <Eyebrow>Pricing</Eyebrow>
          <SectionHeading>
            Pricing that <span className={ACCENT_GRADIENT}>scales with you</span>
          </SectionHeading>
        </Reveal>

        <Reveal delay={100} className="mt-8 flex flex-wrap items-center gap-3">
          <div className="relative inline-flex h-[52px] items-center rounded-[12px] bg-[rgba(12,15,40,0.42)] p-1 ring-1 ring-white/10">
            <span
              aria-hidden="true"
              className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-[8px] bg-white/10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: annual ? 'translateX(100%)' : 'translateX(0)' }}
            />
            <button
              type="button"
              aria-pressed={!annual}
              onClick={() => setAnnual(false)}
              className={`relative z-10 h-[44px] w-[calc(50%-4px)] rounded-[8px] px-4 text-[13px] font-[450] transition-colors ${FOCUS_RING} ${
                annual ? 'text-white/60' : 'text-white'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={annual}
              onClick={() => setAnnual(true)}
              className={`relative z-10 h-[44px] w-[calc(50%-4px)] rounded-[8px] px-4 text-[13px] font-[450] transition-colors ${FOCUS_RING} ${
                annual ? 'text-white' : 'text-white/60'
              }`}
            >
              Annual
            </button>
          </div>
          <span className="inline-flex h-[28px] items-center rounded-[8px] bg-[rgba(108,140,255,0.2)] px-[10px] text-[12px] font-[450] text-[#B7C6FF]">
            Save 20%
          </span>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-start">
          {PLANS.map((plan, i) => {
            const amount = plan.monthly === null ? null : annual ? Math.round(plan.monthly * 0.8) : plan.monthly;
            return (
              <Reveal key={plan.name} delay={i * 100} className="h-full">
                <TiltCard className={`h-full ${plan.featured ? 'lg:scale-[1.03]' : ''}`}>
                  <GlassCard
                    className={`relative flex h-full flex-col hover:ring-white/20 ${
                      plan.featured ? '!ring-[#FF8A6B]/60 shadow-[0_30px_80px_-40px_rgba(255,138,107,0.65)]' : ''
                    }`}
                  >
                    {plan.featured && (
                      <span className="absolute -top-3 left-6 inline-flex h-[24px] items-center rounded-[8px] bg-[linear-gradient(135deg,#FFD7A8_0%,#FF8A6B_100%)] px-2.5 text-[10px] font-[450] uppercase tracking-[0.14em] text-[#1A0A08]">
                        Most popular
                      </span>
                    )}

                    <p className="text-[14px] font-[450] uppercase tracking-[0.18em] text-[#B7C6FF]">
                      {plan.name}
                    </p>
                    <p className="mt-2 text-[13px] text-white/60">{plan.tagline}</p>

                    <div className="mt-6 flex items-baseline gap-1">
                      {amount === null ? (
                        <span className="text-[40px] font-normal leading-none text-white">Custom</span>
                      ) : (
                        <>
                          <CountUp
                            key={`${plan.name}-${annual}`}
                            value={amount}
                            prefix="$"
                            className="text-[40px] font-normal leading-none text-white sm:text-[48px]"
                          />
                          <span className="text-[14px] font-[450] text-white/60">/ mo</span>
                        </>
                      )}
                    </div>

                    <ul className="mt-7 flex flex-col gap-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-[14px] text-white/80 sm:text-[15px]">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(108,140,255,0.2)]">
                            <Check className="h-3.5 w-3.5 text-[#B7C6FF]" aria-hidden="true" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-2">
                      {plan.featured ? (
                        <PrimaryButton href="#access" fullWidth>
                          Get early access
                        </PrimaryButton>
                      ) : (
                        <GhostButton href="#access" fullWidth>
                          Talk to our team
                        </GhostButton>
                      )}
                    </div>
                  </GlassCard>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
