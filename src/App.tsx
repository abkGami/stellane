import Hero from '@/components/Hero';
import Header from '@/components/ui/Header';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Grain from '@/components/ui/Grain';
import TrustStrip from '@/sections/TrustStrip';
import Platform from '@/sections/Platform';
import Instruments from '@/sections/Instruments';
import ImpactMetrics from '@/sections/ImpactMetrics';
import Route from '@/sections/Route';
import UseCases from '@/sections/UseCases';
import Customers from '@/sections/Customers';
import Pricing from '@/sections/Pricing';
import Faq from '@/sections/Faq';
import FinalCta from '@/sections/FinalCta';
import Footer from '@/sections/Footer';

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:h-[46px] focus:items-center focus:rounded-[12px] focus:bg-[linear-gradient(135deg,#FFD7A8_0%,#FF8A6B_100%)] focus:px-5 focus:text-[14px] focus:font-[450] focus:text-[#1A0A08]"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Grain />
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Platform />
        <Instruments />
        <ImpactMetrics />
        <Route />
        <UseCases />
        <Customers />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

export default App;
