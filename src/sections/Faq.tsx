import Accordion, { type AccordionItem } from '@/components/ui/Accordion';
import Container from '@/components/ui/Container';
import Doodle from '@/components/ui/Doodle';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import SectionHeading, { Lead } from '@/components/ui/SectionHeading';
import { GhostButton } from '@/components/ui/Buttons';
import { ACCENT_GRADIENT } from '@/lib/constants';

const ITEMS: AccordionItem[] = [
  {
    question: 'How long does setup take?',
    answer:
      'Most teams connect their first three sources in a day and see a first forecast inside two weeks. The longer part is agreeing which decisions the forecast should inform — that is usually a workshop, not a build.',
  },
  {
    question: 'Which systems can Stellane connect to?',
    answer:
      'Warehouses, ledgers, CRMs, ERPs, event streams, spreadsheets, files, billing and support tools. Connections are read-only, and nothing is written back to your systems.',
  },
  {
    question: 'How are forecasts validated?',
    answer:
      'Every model is back-tested against your own history and scored on rolling windows before it ships. After launch, each forecast keeps its validation trail so you can see where it has been reliable and where it has not.',
  },
  {
    question: 'Where does my data live?',
    answer:
      'In the region you choose, encrypted at rest and in transit. Pilot and Voyager run in our managed environment; Fleet can deploy privately inside your own cloud account.',
  },
  {
    question: 'Can I bring my own models?',
    answer:
      'Yes. Stellane can orchestrate models you already trust alongside its own, and compare them on the same validation windows so the choice is evidence-based.',
  },
  {
    question: 'What does support look like?',
    answer:
      'Email support on Pilot, a named solutions engineer on Voyager, and priority support with a private channel on Fleet. We do not guarantee forecast accuracy or investment returns — the models are decision support, not a promise.',
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-[#0B0F26] py-20 sm:py-28 lg:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
              <SectionHeading>
                Questions, <span className={ACCENT_GRADIENT}>answered</span>
              </SectionHeading>
              <Lead className="mt-6">Can&rsquo;t find it? Talk to our team.</Lead>
              <div className="mt-6">
                <GhostButton href="#contact">Talk to our team</GhostButton>
              </div>
              <Doodle
                name="compass"
                className="mt-12 hidden h-16 w-16 text-[#B7C6FF]/50 lg:block"
              />
            </Reveal>
          </div>

          <Reveal delay={100}>
            <Accordion items={ITEMS} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
