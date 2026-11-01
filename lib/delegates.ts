/**
 * Public delegate directory. Holds public fields only: contact details stay
 * with the organisers and must never be added here, because everything in
 * this file is shipped to the browser.
 */

/** Map order matches STATE_PATHS in components/sw-map-paths.ts. */
export const MAP_STATES = ["Oyo", "Ogun", "Osun", "Ekiti", "Ondo"] as const;
export const STATES = [...MAP_STATES, "Federal", "International"] as const;
export const SECTORS = ["Government", "Regulator", "Investor", "Engineering", "Academia", "Utility"] as const;

export type DelegateState = (typeof STATES)[number];
export type Sector = (typeof SECTORS)[number];
export type DelegateType = "Commissioner" | "Regulator" | "Partner" | "Stakeholder";

export type Delegate = {
  id: string;
  name: string;
  title: string;
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

/** Placeholder entries until the organisers confirm the real list; the page shows a notice while true. */
export const DELEGATES_ARE_SAMPLE = true;

export const DELEGATES: Delegate[] = [
  { id: "d01", name: "Hon. Adebayo Oyelaran", title: "Commissioner for Energy and Mineral Resources", organisation: "Oyo State Government", state: "Oyo", sector: "Government", type: "Commissioner" },
  { id: "d02", name: "Engr. Folake Adeyemi", title: "Director, Renewable Energy", organisation: "Oyo State Ministry of Energy", state: "Oyo", sector: "Government", type: "Stakeholder" },
  { id: "d03", name: "Prof. Kunle Ogundipe", title: "Professor of Hydrology", organisation: "University of Ibadan", state: "Oyo", sector: "Academia", type: "Stakeholder" },
  { id: "d04", name: "Mrs. Bisi Alade", title: "Head of Network Planning", organisation: "Ibadan Electricity Distribution Company", state: "Oyo", sector: "Utility", type: "Stakeholder" },
  { id: "d05", name: "Hon. Olumide Sowunmi", title: "Commissioner for Environment", organisation: "Ogun State Government", state: "Ogun", sector: "Government", type: "Commissioner" },
  { id: "d06", name: "Dr. Yetunde Bakare", title: "General Manager", organisation: "Ogun-Osun River Basin Development Authority", state: "Ogun", sector: "Government", type: "Stakeholder" },
  { id: "d07", name: "Mr. Tobi Akinwale", title: "Managing Partner", organisation: "Gateway Infrastructure Fund", state: "Ogun", sector: "Investor", type: "Stakeholder" },
  { id: "d08", name: "Engr. Segun Ilori", title: "Chief Engineer, Dams", organisation: "Ogun State Water Corporation", state: "Ogun", sector: "Engineering", type: "Stakeholder" },
  { id: "d09", name: "Hon. Ronke Adesina", title: "Commissioner for Water Resources", organisation: "Osun State Government", state: "Osun", sector: "Government", type: "Commissioner" },
  { id: "d10", name: "Dr. Gbenga Oladipo", title: "Senior Lecturer, Electrical Engineering", organisation: "Obafemi Awolowo University", state: "Osun", sector: "Academia", type: "Stakeholder" },
  { id: "d11", name: "Engr. Tayo Fasanmi", title: "Project Lead, Owalla Dam", organisation: "Osun State Ministry of Water Resources", state: "Osun", sector: "Engineering", type: "Stakeholder" },
  { id: "d12", name: "Hon. Femi Ajayi", title: "Commissioner for Public Utilities", organisation: "Ekiti State Government", state: "Ekiti", sector: "Government", type: "Commissioner" },
  { id: "d13", name: "Mrs. Kemi Olowookere", title: "Managing Director", organisation: "Ekiti State Water Corporation", state: "Ekiti", sector: "Utility", type: "Stakeholder" },
  { id: "d14", name: "Prof. Lanre Babatunde", title: "Dean, Faculty of Engineering", organisation: "Ekiti State University", state: "Ekiti", sector: "Academia", type: "Stakeholder" },
  { id: "d15", name: "Hon. Dayo Akintola", title: "Commissioner for Energy", organisation: "Ondo State Government", state: "Ondo", sector: "Government", type: "Commissioner" },
  { id: "d16", name: "Engr. Wale Omotoso", title: "Director, Power Projects", organisation: "Ondo State Ministry of Energy", state: "Ondo", sector: "Engineering", type: "Stakeholder" },
  { id: "d17", name: "Ms. Ifeoma Nwosu", title: "Investment Director", organisation: "Sunrise Capital Partners", state: "Ondo", sector: "Investor", type: "Stakeholder" },
  { id: "d18", name: "Mr. Tunde Fashola", title: "Head of Operations", organisation: "Benin Electricity Distribution Company", state: "Ondo", sector: "Utility", type: "Stakeholder" },
  { id: "d19", name: "Dr. Amina Bello", title: "Commissioner, Planning and Licensing", organisation: "Nigerian Electricity Regulatory Commission", state: "Federal", sector: "Regulator", type: "Regulator" },
  { id: "d20", name: "Engr. Chinedu Okafor", title: "Director, Renewable Energy", organisation: "Federal Ministry of Power", state: "Federal", sector: "Government", type: "Stakeholder" },
  { id: "d21", name: "Mrs. Hauwa Sani", title: "Head of Grid Integration", organisation: "Transmission Company of Nigeria", state: "Federal", sector: "Utility", type: "Stakeholder" },
  { id: "d22", name: "Dr. Musa Ibrahim", title: "Director, Dams and Reservoir Operations", organisation: "Federal Ministry of Water Resources", state: "Federal", sector: "Regulator", type: "Regulator" },
  { id: "d23", name: "Mr. Emeka Eze", title: "Senior Investment Officer", organisation: "Infrastructure Credit Guarantee Company", state: "Federal", sector: "Investor", type: "Stakeholder" },
  { id: "d24", name: "Dr. Lena Hoffmann", title: "Head of Floating PV Systems", organisation: "Solarwerk Engineering GmbH", state: "International", sector: "Engineering", type: "Partner", country: "Germany" },
  { id: "d25", name: "Mr. Wei Zhang", title: "Regional Director, Africa", organisation: "Hydrosun Energy Co.", state: "International", sector: "Engineering", type: "Partner", country: "China" },
  { id: "d26", name: "Ms. Priya Raman", title: "Principal Investment Officer", organisation: "Global Green Infrastructure Fund", state: "International", sector: "Investor", type: "Partner", country: "United Kingdom" },
  { id: "d27", name: "Mr. Jan de Vries", title: "Business Development Manager", organisation: "AquaVolt Floating Systems", state: "International", sector: "Engineering", type: "Partner", country: "Netherlands" },
  { id: "d28", name: "Dr. Aiko Tanaka", title: "Research Fellow, Floating Solar", organisation: "Pacific Institute for Energy Research", state: "International", sector: "Academia", type: "Partner", country: "Japan" },
];
