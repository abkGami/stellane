import { useEffect, useRef, useState } from 'react';
import { Nav } from '@/components/Hero';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const visible = scrolled || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (visible) el.removeAttribute('inert');
    else el.setAttribute('inert', '');
  }, [visible]);

  return (
    <div
      ref={wrap}
      aria-hidden={!visible}
      className={`fixed inset-x-0 top-0 z-[60] transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-white/10 bg-[rgba(7,9,24,0.6)] backdrop-blur-[17px]"
      />
      <div className="site-header relative">
        <Nav onOpenChange={setMenuOpen} />
      </div>
    </div>
  );
}
