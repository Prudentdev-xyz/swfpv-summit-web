export type SessionType =
  | "Arrival"
  | "Keynote"
  | "Live Broadcast"
  | "Break"
  | "Paper"
  | "Panel"
  | "Social"
  | "Ceremony";

export type Session = {
  time: string;
  type: SessionType;
  title: string;
  /** Shown instead of `type` on the badge, e.g. "Departure". */
  quietLabel?: string;
  host?: boolean;
  speaker?: string;
  partners?: { name: string; talk: string }[];
  lines?: { label?: string; text: string }[];
};

export type ProgrammeDay = {
  label: string;
  date: string;
  focus: string;
  items: Session[];
};

export type Person = {
  photo: string;
  name: string;
  role: string;
  when: string;
  host?: boolean;
  /** Card colour and the softer colour used for the role line. */
  bg: string;
  sub: string;
};

export type Partner = {
  name: string;
  country: string;
  talk: string;
  when: string;
  /** Logo file in /public; partners without one show their name instead. */
  logo?: { src: string; width: number; height: number; bg: string; maxW: string };
};

export type Stat = { n: number; unit: string; label: string };

export type StripPhoto = {
  /** Photo in /public; tiles without one show `fallback` on a brand colour. */
  src?: string;
  label: string;
  fallback?: string;
  height: number;
  rotate: number;
  bg: string;
};

export type Dam = { name: string; state: string };

export const PROGRAMME: ProgrammeDay[] = [
  { label: 'Day 1', date: 'Thu 3 Dec', focus: 'The Global Landscape & Technological Foundations', items: [
    { time: '01:00 PM – 02:00 PM', type: 'Arrival', title: 'Delegate Arrival, Registration & Check-In', lines: [{ text: 'Welcome coffee and collection of VIP Invitation Passes at the IITA Conference Center.' }] },
    { time: '02:00 PM – 02:30 PM', type: 'Keynote', host: true, title: 'Official Opening & Host Welcome', lines: [{ text: 'Opening address by Engr. Idowu Adeshina (MD/CEO).' }] },
    { time: '02:30 PM – 02:50 PM', type: 'Live Broadcast', title: 'Live Zoom Technical Broadcast: Innovations in FPV & Marine Engineering', partners: [
      { name: 'Heliorec (France)', talk: 'Deploying Compact, Eco-friendly Floating Solar Structures in Challenging Hydrological Environments (20 mins).' },
      { name: 'NRG Island (Italy)', talk: 'Modular Floating Architectures and Scale Optimisation for Utility Projects (20 mins).' }] },
    { time: '02:50 PM – 03:00 PM', type: 'Break', title: 'Short Technical Transition & Remarks' },
    { time: '03:00 PM – 03:15 PM', type: 'Paper', title: 'Academic Paper Delivery: Adapting FPV Frameworks to the Nigerian Sub-Region', speaker: 'Speaker: Professor S.J. Ojolo, University of Lagos (UNILAG) & Lead Technical Consultant.', lines: [{ label: 'Focus Areas: ', text: 'Mechanical durability, local asset capacity optimization, and thermodynamic efficiencies of floating arrays under the sub-Saharan climate matrix.' }] },
    { time: '03:15 PM – 03:45 PM', type: 'Break', title: 'Stakeholder Networking Coffee Break' },
    { time: '03:45 PM – 04:00 PM', type: 'Keynote', host: true, title: 'Technical Synthesis & Local Execution Model', speaker: 'Speaker: Engr. Idowu Adeshina, MD/CEO, D-OLF Hydrometric Nigeria Limited.', lines: [{ label: 'Focus: ', text: 'Unveiling the structural master plan of D-OLF Southwest Clean Energy Infrastructure Limited to seamlessly blend international engineering with Nigerian academic and environmental benchmarks.' }] },
    { time: '06:00 PM – 08:00 PM', type: 'Social', title: 'VIP Welcome Cocktail & Networking Reception', lines: [{ text: 'Formal welcome to State Commissioners, regulators, and international delegates.' }] }] },
  { label: 'Day 2', date: 'Fri 4 Dec', focus: 'Engineering, Environmental Co-Benefits, Grid Integration & Financing', items: [
    { time: '08:30 AM – 09:15 AM', type: 'Arrival', title: 'Morning Coffee & Stakeholder Registration' },
    { time: '09:15 AM – 09:35 AM', type: 'Paper', title: 'Academic Paper Delivery: The Hydrological Win-Win & Eco-System Preservation', speaker: 'Speaker: Professor Shakirudeen Odunuga, University of Lagos (UNILAG) & Lead, ESIA Consultant.', lines: [
      { label: 'Paper Focus: ', text: 'The Hydrological Win-Win: Evaporation Reduction and Resource Sustainability.' },
      { label: 'Key Insights for State Commissioners: ', text: 'Empirical data modeling how covering portions of the Asejire, Owena, Owalla, Oyan, and Ero dams will reduce raw water evaporation by up to 30%, suppressing toxic algal blooms, protecting native aquatic ecosystems, and preserving massive water volumes for dry-season municipal water supply and regional irrigation.' }] },
    { time: '09:35 AM – 10:00 AM', type: 'Break', title: 'Strategic Coffee Break & High-Level Networking' },
    { time: '10:00 AM – 10:25 AM', type: 'Live Broadcast', title: 'Live Zoom Technical Broadcast: Advanced Mooring, Anchoring & Grid Connection', partners: [
      { name: 'Seaflex (Sweden)', talk: 'Elastic Mooring Technology: Managing Severe Water Level Fluctuations and Structural Integrity.' }],
      lines: [{ label: 'Direct Application: ', text: 'Engineering resilient underwater anchoring frameworks for the specific deep-water variations at Owena Dam (Ondo) and Ero Dam (Ekiti).' }] },
    { time: '10:25 AM – 11:00 AM', type: 'Panel', title: 'Panel Session 1: State Regulatory Alliances & Infrastructure Mapping', lines: [{ text: 'Reviewing multi-state water asset approvals for Ogun, Oyo, Ondo, Ekiti, and Osun states.' }] },
    { time: '11:00 AM – 11:30 AM', type: 'Keynote', title: 'Mente Energy’s Commercial Framework for Institutional Funding and Regional Grid Integration', speaker: 'Speaker: Dr. Tolu Osekita, Managing Partner, Mente Energy.', lines: [{ label: 'Focus: ', text: 'De-Risking the 150MWp Regional Floating Solar Plant: The PPA Bankability RoadMap.' }] },
    { time: '11:30 AM – 01:00 PM', type: 'Panel', title: 'Panel Session 2: Off-Taker Strategies & PPP Models', lines: [{ text: 'Structuring clean energy infrastructure investments with regional utility bodies and stakeholders.' }] },
    { time: '01:00 PM – 02:30 PM', type: 'Break', title: 'Networking Lunch Break' },
    { time: '02:30 PM – 03:00 PM', type: 'Keynote', title: 'Regional Energy Security Presentation' },
    { time: '03:00 PM – 03:25 PM', type: 'Live Broadcast', title: 'Live Zoom Broadcast: Energy Storage Systems (ESS)', partners: [
      { name: 'Green Power & Storage (GPS) - Canada', talk: 'Hybridization - Global energy storage and power stabilization technologies.' }] },
    { time: '03:25 PM – 04:00 PM', type: 'Break', title: 'Afternoon Tea Break' },
    { time: '04:00 PM – 04:30 PM', type: 'Panel', title: 'High-Level Roundtable & De-Risking Session', lines: [{ label: 'Open Floor Panel: ', text: 'State Commissioners, Federal Ministry of Water Resources directors, and River Basin Development Authorities interface directly with the physical speakers and virtual international partners regarding regulatory alignment, safety metrics, and water asset usage clearances.' }] },
    { time: '04:30 PM – 04:45 PM', type: 'Ceremony', title: 'Session Closing & Communiqué Preview', lines: [{ text: 'Summary of technical alignment ahead of the official Joint Communiqué signing.' }] },
    { time: '07:00 PM – 09:30 PM', type: 'Social', title: 'Summit Gala Dinner & Cultural Celebration Night' }] },
  { label: 'Day 3', date: 'Sat 5 Dec', focus: 'Communiqué Signing & Departure', items: [
    { time: '08:30 AM – 09:30 AM', type: 'Break', title: 'Breakfast at the IITA Restaurant' },
    { time: '09:30 AM – 11:00 AM', type: 'Ceremony', title: 'Official Joint Communiqué Signing Ceremony', lines: [{ text: 'Endorsement of the Southwest Regional Clean Energy blueprint by stakeholders and partners.' }] },
    { time: '11:00 AM – 12:00 PM', type: 'Arrival', quietLabel: 'Departure', title: 'Vote of Thanks, Delegate Checkout, and Official Departures' }] }
];
export const PEOPLE: Person[] = [
  { photo: '/head-1.jpg', host: true, name: 'Engr. Idowu Adeshina', role: 'Managing Director/CEO, D-OLF Hydrometric Nigeria Limited', when: 'Day 1 · 02:00 PM & 03:45 PM', bg: '#2B266A', sub: '#DCE6F5' },
  { photo: '/head-2.jpg', name: 'Professor S.J. Ojolo', role: 'University of Lagos (UNILAG) & Lead Technical Consultant', when: 'Day 1 · 03:00 PM', bg: '#29BFF5', sub: '#FFFFFF' },
  { photo: '/head-3.jpg', name: 'Professor Shakirudeen Odunuga', role: 'University of Lagos (UNILAG) & Lead ESIA Consultant', when: 'Day 2 · 09:15 AM', bg: '#1593C9', sub: '#FFFFFF' },
  { photo: '/head-4.jpg', name: 'Dr. Tolu Osekita', role: 'Managing Partner, Mente Energy', when: 'Day 2 · 11:00 AM', bg: '#36318A', sub: '#DCE6F5' }
];
export const PARTNERS: Partner[] = [
  { name: 'Heliorec', country: 'France', talk: 'Deploying Compact, Eco-friendly Floating Solar Structures in Challenging Hydrological Environments', when: 'Day 1 · 02:30 PM' },
  { name: 'NRG Island', country: 'Italy', talk: 'Modular Floating Architectures and Scale Optimisation for Utility Projects', when: 'Day 1 · 02:30 PM', logo: { src: '/logo-nrg.png', width: 2362, height: 2368, bg: '#18213F', maxW: '120px' } },
  { name: 'Seaflex', country: 'Sweden', talk: 'Elastic Mooring Technology: Managing Severe Water Level Fluctuations and Structural Integrity', when: 'Day 2 · 10:00 AM', logo: { src: '/logo-seaflex.webp', width: 772, height: 262, bg: '#FFFFFF', maxW: '86%' } },
  { name: 'Green Power & Storage (GPS)', country: 'Canada', talk: 'Hybridization, global energy storage and power stabilization technologies', when: 'Day 2 · 03:00 PM' }
];
export const DAMS: Dam[] = [{ name: 'Asejire', state: 'Oyo/Osun' }, { name: 'Owena', state: 'Ondo' }, { name: 'Owalla', state: 'Osun' }, { name: 'Oyan', state: 'Ogun' }, { name: 'Ero', state: 'Ekiti' }];
export const STATS: Stat[] = [
  { n: 150, unit: 'MWp', label: 'Floating solar PV capacity' },
  { n: 5, unit: '', label: 'States: Oyo, Ogun, Osun, Ondo, Ekiti' },
  { n: 5, unit: '', label: 'Dams: Asejire, Owena, Owalla, Oyan, Ero' },
  { n: 4, unit: '', label: 'International partners, live via Zoom' }
];
export const STRIP: StripPhoto[] = [
  { src: '/img-d.jpg', label: 'Summit event', height: 220, rotate: -4, bg: '#2B266A' },
  { label: 'Floating solar', fallback: '150MWp', height: 280, rotate: 2, bg: '#29BFF5' },
  { src: '/img-b.jpg', label: 'Dam and reservoir', height: 320, rotate: 0, bg: '#1593C9' },
  { src: '/img-a.jpg', label: 'Delegates', height: 270, rotate: -2, bg: '#29BFF5' },
  { src: '/img-e.jpg', label: 'Summit event', height: 230, rotate: 4, bg: '#2B266A' }
];
export const TICKER = ['Floating Solar Architecture', 'Southwest Nigeria', 'Clean Energy Future', '150MWp', 'RSVP 09127975829'];

export const CONTACT = {
  phone: { display: '09127975829', href: 'tel:+2349127975829' },
  email: 'info@dolfhydrometric.com',
  website: 'https://dolfhydrometric.com',
};

export type StakeholderLogo = { src: string; alt: string; width: number; height: number; bg: string; maxH: string };

export const STAKEHOLDER_LOGOS: StakeholderLogo[] = [
  { src: '/logo-borbda.jpg', alt: 'Benin-Owena River Basin Development Authority', width: 1024, height: 1024, bg: 'bg-white border-2 border-line', maxH: 'max-h-[82px]' },
  { src: '/logo-nrg.png', alt: 'NRG Island', width: 2362, height: 2368, bg: 'bg-[#18213F]', maxH: 'max-h-[90px]' },
  { src: '/logo-seaflex.webp', alt: 'Seaflex', width: 772, height: 262, bg: 'bg-white border-2 border-line', maxH: 'max-h-[70px]' },
];

/** Stakeholders with no logo file yet; they show as name tiles. */
export const STAKEHOLDER_NAMES = ['Heliorec', 'GPS'];
