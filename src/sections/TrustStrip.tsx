import Container from '@/components/ui/Container';
import Doodle from '@/components/ui/Doodle';

const NAMES = ['OAKLINE', 'FERNWAY', 'BRIGHTMOOR', 'SALTHAVEN', 'DRIFTWELL', 'PINEGATE'];

export default function TrustStrip() {
  return (
    <section className="border-y border-white/10 bg-[#070918] py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <p className="shrink-0 text-[14px] font-[450] text-white/60">
            Navigators across industries trust Stellane
          </p>

          <div className="marquee-wrap mask-marquee w-full overflow-hidden lg:max-w-[60%]">
            <div className="marquee-track flex w-max items-center">
              {[...NAMES, ...NAMES].map((name, i) => (
                <span key={`${name}-${i}`} className="flex items-center">
                  <span className="whitespace-nowrap text-[22px] font-[600] tracking-[-0.02em] text-white/50">
                    {name}
                  </span>
                  <Doodle
                    name="star"
                    className="mx-8 h-2.5 w-2.5 shrink-0 text-[#B7C6FF]"
                    draw={false}
                    float={false}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
