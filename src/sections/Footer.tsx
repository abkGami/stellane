import Container from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'Overview', href: '#platform' },
      { label: 'Instruments', href: '#top' },
      { label: 'The route', href: '#route' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Customers', href: '#customers' },
      { label: 'Journal', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Security', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'DPA', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
];

const LOGO_PATH =
  'M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z';

export default function Footer() {
  const { ref, progress } = useScrollProgress<HTMLElement>('enter');
  const reduced = useReducedMotion();
  const drift = reduced ? 0 : (progress - 0.5) * 24;

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <footer
      id="contact"
      ref={ref}
      className="mt-20 overflow-hidden rounded-t-[24px] bg-[#070918] pt-16 pb-8 sm:rounded-t-[33px] sm:mt-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 256 256"
                fill="none"
                className="sm:h-[32px] sm:w-[32px]"
                aria-hidden="true"
              >
                <path d={LOGO_PATH} fill="white" />
              </svg>
              <span className="text-[22px] font-[450] leading-none tracking-[-0.02em] text-white sm:text-[26px]">
                Stellane
              </span>
            </div>
            <p className="mt-3 text-[14px] text-white/60">Chart what comes next.</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="mb-4 text-[12px] font-[450] uppercase tracking-[0.18em] text-white/55">
                  {column.title}
                </p>
                <ul className="flex flex-col">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="inline-flex min-h-[44px] min-w-[44px] items-center text-[14px] font-[450] text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#B7C6FF]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/50">
            © {new Date().getFullYear()} Stellane. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Security'].map((label) => (
              <a
                key={label}
                href="#"
                className="inline-flex h-11 min-w-[44px] items-center text-[13px] text-white/50 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#B7C6FF]"
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={toTop}
              aria-label="Back to top"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white ring-1 ring-white/10 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#B7C6FF]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none relative mt-10 h-[clamp(40px,9.5vw,180px)] select-none overflow-hidden"
      >
        <div
          className="absolute inset-x-0 top-0 whitespace-nowrap text-center font-normal leading-none tracking-[-0.04em] text-white/[0.05]"
          style={{
            fontSize: 'clamp(72px, 19vw, 360px)',
            transform: `translateY(${drift.toFixed(1)}px)`,
          }}
        >
          STELLANE
        </div>
      </div>
    </footer>
  );
}
