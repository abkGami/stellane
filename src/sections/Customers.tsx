import { useRef, useState } from 'react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import GlassCard from '@/components/ui/GlassCard';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { ACCENT_GRADIENT } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const QUOTES = [
  {
    quote:
      'Stellane showed us a supply gap eight weeks before it hit. We moved stock, and no customer ever felt it.',
    name: 'Maya Okafor',
    role: 'VP Operations, Oakline',
    initials: 'MO',
    featured: true,
  },
  {
    quote: 'The forecasts come with reasons. That is why finance finally trusted them.',
    name: 'Daniel Ruiz',
    role: 'CFO, Fernway',
    initials: 'DR',
    featured: false,
  },
  {
    quote: 'We cut our planning cycle from a month to a week without adding an analyst.',
    name: 'Priya Nair',
    role: 'Head of Strategy, Brightmoor',
    initials: 'PN',
    featured: false,
  },
];

export default function Customers() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const goTo = (index: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
    }
    setActive(index);
  };

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const children = [...el.children] as HTMLElement[];
    const nearest = children.reduce(
      (best, child, index) =>
        Math.abs(child.offsetLeft - el.offsetLeft - el.scrollLeft) <
        Math.abs(children[best].offsetLeft - el.offsetLeft - el.scrollLeft)
          ? index
          : best,
      0,
    );
    setActive(nearest);
  };

  return (
    <section id="customers" className="bg-[#0B0F26] py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal>
          <Eyebrow>Customers</Eyebrow>
          <SectionHeading>
            Teams that <span className={ACCENT_GRADIENT}>chart further</span>
          </SectionHeading>
        </Reveal>

        <div
          ref={scroller}
          onScroll={onScroll}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:mt-14 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0"
        >
          {QUOTES.map((item, i) => (
            <Reveal
              key={item.name}
              delay={i * 100}
              className={`w-[85%] shrink-0 snap-center lg:w-auto ${item.featured ? 'lg:col-span-2' : ''}`}
            >
              <GlassCard className="flex h-full flex-col hover:ring-white/20">
                <blockquote className="text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-white sm:text-[28px]">
                  “{item.quote}”
                </blockquote>
                <div className="mt-auto flex items-center gap-3 pt-8">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#6C8CFF_0%,#FF8A6B_100%)] text-[14px] font-[450] text-[#0A0707]"
                  >
                    {item.initials}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[14px] font-[450] text-white">{item.name}</span>
                    <span className="text-[13px] text-white/60">{item.role}</span>
                  </span>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 flex justify-center lg:hidden">
          {QUOTES.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show quote from ${item.name}`}
              aria-current={active === i}
              onClick={() => goTo(i)}
              className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7C6FF]"
            >
              <span
                className={`h-2 rounded-full transition-all duration-200 ${
                  active === i ? 'w-6 bg-[#B7C6FF]' : 'w-2 bg-white/25'
                }`}
              />
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
