import { Countdown } from "@/components/countdown";
import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import { Hero } from "@/components/layouts/hero";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { About } from "@/components/sections/about";
import { Partners } from "@/components/sections/partners";
import { Programme } from "@/components/sections/programme";
import { Rsvp } from "@/components/sections/rsvp";
import { Speakers } from "@/components/sections/speakers";
import { Stakeholders } from "@/components/sections/stakeholders";
import { Stats } from "@/components/sections/stats";
import { Ticker } from "@/components/sections/ticker";
import { Venue } from "@/components/sections/venue";
import { GUTTER } from "@/lib/styles";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-surface">
      <Header />
      <RevealOnScroll />
      <Hero />
      {/* Zero-height row on the hero's bottom edge; the panel is centred on it so it straddles both sections.
          The bottom margin reserves room for the half that hangs below. */}
      <div className={`relative z-10 mb-[52px] h-0 sm:mb-[75px] ${GUTTER}`}>
        <div className="-translate-y-1/2">
          <Countdown />
        </div>
      </div>
      <About />
      <Stats />
      <Speakers />
      <Partners />
      <Programme />
      <Venue />
      <Stakeholders />
      <Rsvp />
      <Ticker />
      <Footer />
    </div>
  );
}
