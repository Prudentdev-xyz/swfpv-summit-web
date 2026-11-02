/**
 * Public delegate directory. Holds public fields only: contact details stay
 * with the organisers and must never be added here, because everything in
 * this file is shipped to the browser.
 */

/** Map order matches STATE_PATHS in components/sw-map-paths.ts. */
export const MAP_STATES = ["Oyo", "Ogun", "Osun", "Ekiti", "Ondo"] as const;
export const STATES = [...MAP_STATES, "Lagos", "Regional", "Federal", "Private", "International"] as const;
export const SECTORS = ["Government", "Regulator", "Investor", "Engineering", "Academia", "Utility"] as const;

export type DelegateState = (typeof STATES)[number];

const LABELS: Partial<Record<DelegateState, string>> = {
  Regional: "Southwest regional",
  Federal: "Federal",
  Private: "Private sector",
  International: "International",
};

/** "Oyo State", but "Southwest regional", "Federal", "Private sector" and "International" for the rest. */
export const stateLabel = (s: DelegateState) => LABELS[s] ?? `${s} State`;
export type Sector = (typeof SECTORS)[number];
export type DelegateType = "Commissioner" | "Regulator" | "Partner" | "Stakeholder";

export type Delegate = {
  id: string;
  name: string;
  /** Left out when the organisers didn't give one. */
  title?: string;
  organisation: string;
  state: DelegateState;
  sector: Sector;
  type: DelegateType;
  /** Shown on the card for international delegates. */
  country?: string;
  /** Headshot in /public; delegates without one get a monogram. */
  photo?: string;
};

export type DirectoryFilters = {
  q: string;
  state: DelegateState | null;
  sector: Sector | null;
  grouped: boolean;
};

/** URL form of a state or sector, e.g. "international". */
export const slug = (s: string) => s.toLowerCase();

/** Reads ?q=&state=&sector=&view= into filters, ignoring values that don't match a known option. */
export function parseFilters(params: Record<string, string | string[] | undefined>): DirectoryFilters {
  const one = (key: string) => {
    const v = params[key];
    return (Array.isArray(v) ? v[0] : v) ?? "";
  };
  return {
    q: one("q"),
    state: STATES.find((s) => slug(s) === slug(one("state"))) ?? null,
    sector: SECTORS.find((s) => slug(s) === slug(one("sector"))) ?? null,
    grouped: one("view") === "state",
  };
}

/** Confirmed delegates supplied by the organisers. */
export const DELEGATES: Delegate[] = [
  { id: "d01", name: "Prof. Dahud Kehinde Shangodoyin", title: "Honourable Commissioner", organisation: "Oyo State Ministry of Energy and Mineral Resources", state: "Oyo", sector: "Government", type: "Commissioner" },
  { id: "d02", name: "Hon. Adedoja Abiodun Bolarinwa", title: "Special Adviser", organisation: "Oyo State Ministry of Energy and Mineral Resources", state: "Oyo", sector: "Government", type: "Stakeholder" },
  { id: "d03", name: "Mr. Ayanniyi Taiwo Michael", title: "Permanent Secretary", organisation: "Oyo State Ministry of Energy and Mineral Resources", state: "Oyo", sector: "Government", type: "Stakeholder" },
  { id: "d04", name: "Engr. Ayodele Joseph Adesokan", title: "Director, Design and Construction", organisation: "Oyo State Ministry of Energy and Mineral Resources", state: "Oyo", sector: "Government", type: "Stakeholder" },
  { id: "d05", name: "Engr. Tunde Tanimola", title: "Assistant Director, Planning and Budget", organisation: "Benin-Owena River Basin Development Authority", state: "Federal", sector: "Government", type: "Stakeholder" },
  { id: "d06", name: "Engr. Joshua Aizeboje", title: "Assistant Director, Civil", organisation: "Benin-Owena River Basin Development Authority", state: "Federal", sector: "Government", type: "Stakeholder" },
  { id: "d07", name: "Engr. Dr. Adedeji Ashiru", title: "Managing Director/CEO", organisation: "Ogun-Osun River Basin Development Authority", state: "Federal", sector: "Government", type: "Stakeholder" },
  { id: "d08", name: "Engr. Dr. Kumolu Olumide Ayodeji", title: "Special Adviser (Technical) to the MD/CEO", organisation: "Ogun-Osun River Basin Development Authority", state: "Federal", sector: "Government", type: "Stakeholder" },
  { id: "d09", name: "Engr. Temitope Aboyeji", title: "Assistant Chief Engineer (Design)", organisation: "Ogun-Osun River Basin Development Authority", state: "Federal", sector: "Government", type: "Stakeholder" },
  { id: "d10", name: "Engr. Taiwo Oyerinde", title: "Principal Engineer (Electrical)", organisation: "Ogun-Osun River Basin Development Authority", state: "Federal", sector: "Government", type: "Stakeholder" },
  { id: "d11", name: "Dr. Seye Oyeleye", title: "Director General", organisation: "DAWN Commission", state: "Regional", sector: "Government", type: "Stakeholder" },
  { id: "d12", name: "Prince Adetayo Adeleke-Adedoyin", title: "Head, Special Projects and Funding", organisation: "DAWN Commission", state: "Regional", sector: "Government", type: "Stakeholder" },
  { id: "d13", name: "Engr. Omoniyi Olugbenga", title: "Director, Operations and Engineering Services Department", organisation: "Ondo State Electricity Regulatory Commission", state: "Ondo", sector: "Regulator", type: "Regulator" },
  { id: "d14", name: "Mr. Odejobi Babafemi", title: "HoD, Monitoring & Compliance Unit, Operations and Engineering Services", organisation: "Ondo State Electricity Regulatory Commission", state: "Ondo", sector: "Regulator", type: "Regulator" },
  { id: "d15", name: "Engr. Akintan Dele Oladipo", title: "Director, Water Resources", organisation: "Ondo State Ministry of Water Resources, Public Sanitation and Hygiene", state: "Ondo", sector: "Government", type: "Stakeholder" },
  { id: "d16", name: "Engr. Adedoyin Bamidele Festus", title: "Special Assistant to the Commissioner", organisation: "Ondo State Ministry of Water Resources, Public Sanitation and Hygiene", state: "Ondo", sector: "Government", type: "Stakeholder" },
  { id: "d17", name: "Engr. Oshuporu Ayodeji Donald", title: "Project Electrical Engineer", organisation: "Ondo State Ministry of Water Resources, Public Sanitation and Hygiene", state: "Ondo", sector: "Government", type: "Stakeholder" },
  { id: "d18", name: "Mr. Olumide Akinyomi", title: "Director, Water Supply (RUWASSA)", organisation: "Ondo State Ministry of Water Resources, Public Sanitation and Hygiene", state: "Ondo", sector: "Government", type: "Stakeholder" },
  { id: "d19", name: "Engr. (Dr.) Ademola Temitayo Aderinto", title: "Hon. Commissioner for Environment and Natural Resources", organisation: "Oyo State Ministry of Environment and Natural Resources", state: "Oyo", sector: "Government", type: "Commissioner" },
  { id: "d20", name: "Dr. Sunday Akinwale Moradeyo", title: "Permanent Secretary", organisation: "Oyo State Ministry of Environment and Natural Resources", state: "Oyo", sector: "Government", type: "Stakeholder" },
  { id: "d21", name: "Dr. Funmilayo Evelyn Adesina", title: "Director, Pollution Monitoring and Quality Control", organisation: "Oyo State Ministry of Environment and Natural Resources", state: "Oyo", sector: "Government", type: "Stakeholder" },
  { id: "d22", name: "Dr. Tijani Saliu", title: "Director, Water Resources Management", organisation: "Oyo State Ministry of Environment and Natural Resources", state: "Oyo", sector: "Government", type: "Stakeholder" },
  { id: "d23", name: "Engr. D. S. David", title: "Executive Secretary/Chairman", organisation: "Ekiti State Electricity Regulatory Bureau (EKSERB)", state: "Ekiti", sector: "Regulator", type: "Regulator" },
  { id: "d24", name: "Engr. Olanipekun 'Wale O.", title: "Director, Engineering, Planning & Monitoring", organisation: "Ekiti State Electricity Regulatory Bureau (EKSERB)", state: "Ekiti", sector: "Regulator", type: "Regulator" },
  { id: "d25", name: "Engr. Rauf A. Amao", title: "General Manager", organisation: "Water Corporation of Oyo State", state: "Oyo", sector: "Utility", type: "Stakeholder" },
  { id: "d26", name: "Engr. Y. A. Fasasi", title: "Director of Mechanical and Electrical", organisation: "Water Corporation of Oyo State", state: "Oyo", sector: "Utility", type: "Stakeholder" },
  { id: "d27", name: "Daniel Krull", title: "Consul General", organisation: "Consulate General of the Federal Republic of Germany, Lagos", state: "International", sector: "Government", type: "Partner", country: "Germany" },
  { id: "d28", name: "Prof. S. J. Ojolo", title: "Professor of Mechanical Engineering & Lead Technical Consultant", organisation: "University of Lagos", state: "Lagos", sector: "Academia", type: "Stakeholder" },
  { id: "d29", name: "Prof. S. Odunuga", title: "Professor of Geography & Lead Environmental Consultant", organisation: "University of Lagos", state: "Lagos", sector: "Academia", type: "Stakeholder" },
  { id: "d30", name: "Prof. Adegoke Melodi", title: "Dean, Department of Electrical Engineering", organisation: "Federal University of Technology Akure (FUTA)", state: "Ondo", sector: "Academia", type: "Stakeholder" },
  { id: "d31", name: "Prof. Olulope Kehinde", title: "Professor of Electrical Power Systems Engineering", organisation: "Ekiti State University (EKSU)", state: "Ekiti", sector: "Academia", type: "Stakeholder" },
  { id: "d32", name: "Mr. William A. Funmilayo", title: "Hon. Commissioner", organisation: "Oyo State Ministry of Lands, Housing and Urban Development", state: "Oyo", sector: "Government", type: "Commissioner" },
  { id: "d33", name: "Engr. Adabi Ayodeji Moses", title: "Senior Electrical Engineer", organisation: "Ondo State Power Company, Ministry of Energy", state: "Ondo", sector: "Utility", type: "Stakeholder" },
  { id: "d34", name: "Mr. Ola Oresanya", title: "Honourable Commissioner of Environment", organisation: "Ogun State Ministry of Environment", state: "Ogun", sector: "Government", type: "Commissioner" },
  { id: "d35", name: "Dr. Kafayat Lawal", title: "Permanent Secretary", organisation: "Ogun State Ministry of Environment", state: "Ogun", sector: "Government", type: "Stakeholder" },
  { id: "d36", name: "Mr. Akinbode Shofela", title: "Director, Planning, Research and Statistics", organisation: "Ogun State Ministry of Environment", state: "Ogun", sector: "Government", type: "Stakeholder" },
  { id: "d37", name: "Mr. Abajo Wasiu", title: "Officer", organisation: "Ogun State Ministry of Environment", state: "Ogun", sector: "Government", type: "Stakeholder" },
  { id: "d38", name: "Prof. Chinwe Obuaku-Igwe", title: "Director-General and Special Envoy of the Governor on Climate Change and Renewable Energy; Technical Lead, Osun State delegation", organisation: "Office of the Executive Governor, Osun State", state: "Osun", sector: "Government", type: "Stakeholder" },
  { id: "d39", name: "Mr. Bolaji", title: "Director of Water Resources", organisation: "Osun State Ministry of Water Resources", state: "Osun", sector: "Government", type: "Stakeholder" },
  { id: "d40", name: "Mr. Salimonu", title: "Acting Permanent Secretary", organisation: "Osun State Ministry of Regional Integration and Special Duties", state: "Osun", sector: "Government", type: "Stakeholder" },
  { id: "d41", name: "Engr. Abatan", title: "Acting Permanent Secretary", organisation: "Osun State Ministry of Energy", state: "Osun", sector: "Government", type: "Stakeholder" },
  { id: "d42", name: "Dr. Fritz Mobolaji Olaoye", title: "Permanent Secretary", organisation: "Osun State Ministry of Lands and Physical Planning", state: "Osun", sector: "Government", type: "Stakeholder" },
  { id: "d43", name: "Hon. Mayowa Adejoorin", title: "Honourable Commissioner", organisation: "Osun State Ministry of Environment and Sanitation", state: "Osun", sector: "Government", type: "Commissioner" },
  { id: "d44", name: "Engr. Mrs. Jokotola Dupeola Florence", title: "General Manager", organisation: "Osun State Water Corporation", state: "Osun", sector: "Utility", type: "Stakeholder" },
  { id: "d45", name: "Dr. Sunday Omoya", title: "Permanent Secretary", organisation: "Ekiti State Ministry of Environment and Natural Resources", state: "Ekiti", sector: "Government", type: "Stakeholder" },
  { id: "d46", name: "Engr. Mrs. Ojelabi-Pedro Toyin Mercy", title: "Permanent Secretary", organisation: "Ekiti State Ministry of Infrastructure and Public Utilities", state: "Ekiti", sector: "Government", type: "Stakeholder" },
  { id: "d47", name: "Engr. Sola Owoeye", organisation: "Ekiti State Ministry of Infrastructure and Public Utilities", state: "Ekiti", sector: "Government", type: "Stakeholder" },
  { id: "d48", name: "Mr. Wole Afolabi", title: "Managing Director", organisation: "Ekiti Water and Sewerage Company Ltd", state: "Ekiti", sector: "Utility", type: "Stakeholder" },
  { id: "d49", name: "Engr. Opeyemi Sunday Oluwatoba", title: "Director of Operations and Maintenance", organisation: "Ekiti Water and Sewerage Company Ltd", state: "Ekiti", sector: "Utility", type: "Stakeholder" },
  { id: "d50", name: "Hon. Damilola Otubanjo", title: "Special Adviser on SDGs and Water Resources", organisation: "Ogun State Water Corporation (OGSWC)", state: "Ogun", sector: "Utility", type: "Stakeholder" },
  { id: "d51", name: "Engr. Olusoji Sangobiyi", organisation: "Odu’a Investment Company Limited", state: "Regional", sector: "Investor", type: "Stakeholder" },
  { id: "d52", name: "Mr. Olusola Ojeniyi", title: "Head, Equities", organisation: "Odu’a Investment Company Limited", state: "Regional", sector: "Investor", type: "Stakeholder" },
  { id: "d53", name: "Mr. Shuaib Olawoyin", organisation: "Odu’a Investment Company Limited", state: "Regional", sector: "Investor", type: "Stakeholder" },
  { id: "d54", name: "Engr. Abidemi Rasaq", organisation: "Ondo State Ministry of Infrastructure, Lands and Housing", state: "Ondo", sector: "Government", type: "Stakeholder" },
  { id: "d55", name: "Dr. Tolu Osekita", title: "Managing Partner", organisation: "Mente Energy Limited", state: "Private", sector: "Engineering", type: "Stakeholder" },
  { id: "d56", name: "Ms. Abiola Adekunle", title: "Director of Deliveries", organisation: "Mente Energy Limited", state: "Private", sector: "Engineering", type: "Stakeholder" },
];
