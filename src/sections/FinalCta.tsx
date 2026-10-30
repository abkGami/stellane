import { useState, type FormEvent } from 'react';
import Container from '@/components/ui/Container';
import Doodle from '@/components/ui/Doodle';
import Reveal from '@/components/ui/Reveal';
import VideoBg from '@/components/ui/VideoBg';
import { ACCENT_GRADIENT, FOCUS_RING } from '@/lib/constants';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function FinalCta() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = (value: string) => EMAIL_PATTERN.test(value.trim());

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate(email)) {
      setError('Enter a valid work email.');
      return;
    }

    setError('');
    setSending(true);

    const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() }),
        });
      } catch {
        setSending(false);
        setError('Something went wrong. Please try again.');
        return;
      }
    } else {
      console.info(
        '[Stellane] VITE_FORM_ENDPOINT is not set — showing the success state locally.',
      );
    }

    setSending(false);
    setDone(true);
  };

  return (
    <section
      id="access"
      className="relative mx-2 mt-20 overflow-hidden rounded-[24px] sm:mx-4 sm:mt-28 sm:rounded-[33px] lg:mt-36"
    >
      <VideoBg offset={0.65} />

      <Container className="relative z-10 py-24 text-center sm:py-32 lg:py-44">
        <Doodle
          name="comet"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 text-white/10"
          draw={false}
        />
        <Doodle
          name="constellation"
          className="absolute right-4 top-16 hidden h-20 w-40 text-[#B7C6FF]/40 sm:block lg:right-16"
        />

        <Reveal>
          <h2 className="relative mx-auto max-w-[15ch] text-[40px] font-normal leading-[0.95] tracking-[-0.035em] text-white sm:text-[64px] lg:text-[88px]">
            Chart <span className={ACCENT_GRADIENT}>what comes next.</span>
            <Doodle
              name="squiggle"
              className="absolute -bottom-5 left-1/2 h-3 w-[220px] -translate-x-1/2 text-[#FFD7A8] sm:w-[320px]"
            />
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mx-auto mt-8 max-w-[46ch] text-[16px] leading-[1.35] text-white/70 sm:text-[18px]">
            Join the early access list. We will show you the first forecast on your own data.
          </p>
        </Reveal>

        <Reveal delay={200} className="mx-auto mt-8 max-w-[520px]">
          {done ? (
            <p className="rounded-[12px] bg-white/5 px-5 py-4 text-[15px] text-white ring-1 ring-white/10">
              You&rsquo;re on the list. We&rsquo;ll be in touch within one working day.
            </p>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="work-email" className="sr-only">
                Work email
              </label>
              <input
                id="work-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Work email"
                value={email}
                aria-invalid={Boolean(error)}
                aria-describedby="email-message"
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError('');
                }}
                onBlur={() => {
                  if (email.length > 0 && !validate(email)) setError('Enter a valid work email.');
                }}
                className={`h-[46px] w-full rounded-[12px] border bg-white/5 px-5 text-[15px] text-white placeholder:text-white/40 sm:h-[51px] ${FOCUS_RING} ${
                  error ? 'border-[#FF8A6B]' : 'border-white/10'
                }`}
              />
              <button
                type="submit"
                disabled={sending}
                className={`inline-flex h-[46px] shrink-0 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#FFD7A8_0%,#FF8A6B_100%)] px-5 text-[14px] font-[450] text-[#1A0A08] shadow-[0_8px_30px_-8px_rgba(255,138,107,0.5)] transition-[filter,transform] duration-200 hover:brightness-110 sm:h-[51px] sm:px-[27px] sm:text-[15.5px] disabled:opacity-60 ${FOCUS_RING}`}
              >
                {sending ? 'Sending…' : 'Get early access'}
              </button>
            </form>
          )}
          <p
            id="email-message"
            aria-live="polite"
            className={`mt-3 min-h-[20px] text-[13px] ${error ? 'text-[#FFB59E]' : 'text-white/60'}`}
          >
            {error || (done ? '' : 'Read-only access. No spam, ever.')}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
