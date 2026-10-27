import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import { Hero } from "@/components/layouts/hero";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { About } from "@/components/sections/about";
import { OrganisersStrip } from "@/components/sections/organisers-strip";
import { Partners } from "@/components/sections/partners";
import { Programme } from "@/components/sections/programme";
import { Rsvp } from "@/components/sections/rsvp";
import { Speakers } from "@/components/sections/speakers";
import { Stakeholders } from "@/components/sections/stakeholders";
import { Stats } from "@/components/sections/stats";
import { Ticker } from "@/components/sections/ticker";
import { Venue } from "@/components/sections/venue";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-surface">
      <Header />
      <RevealOnScroll />
      <Hero />
      <OrganisersStrip />
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
