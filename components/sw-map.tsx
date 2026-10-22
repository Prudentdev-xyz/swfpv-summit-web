import { STATE_PATHS } from "./sw-map-paths";

const STATE_LABELS = [
  { name: "OYO", x: 140, y: 160 },
  { name: "OGUN", x: 130, y: 430 },
  { name: "OSUN", x: 288, y: 262 },
  { name: "EKITI", x: 440, y: 290 },
  { name: "ONDO", x: 400, y: 440 },
];

const DAM_SITES = [
  { name: "Asejire", cx: 246, cy: 310, x: 261, y: 316 },
  { name: "Owena", cx: 385, cy: 336, x: 400, y: 342 },
  { name: "Owalla", cx: 340, cy: 203, x: 300, y: 185 },
  { name: "Oyan", cx: 109, cy: 325, x: 109, y: 358, anchor: "middle" as const },
  { name: "Ero", cx: 422, cy: 219, x: 437, y: 225 },
];

export function SouthwestMap() {
  return (
    <div data-reveal="" className="relative rounded-3xl bg-navy px-7 pt-7 pb-[22px]">
      <svg
        viewBox="0 0 560 600"
        className="block h-auto w-full"
        role="img"
        aria-label="Map of Oyo, Ogun, Osun, Ekiti and Ondo states with the five proposed floating solar dam sites"
      >
        <g fill="#36318A" stroke="#29BFF5" strokeWidth="1.8" strokeLinejoin="round">
          {STATE_PATHS.map((d, i) => (
            <path
              key={i}
              d={d}
              pathLength={1}
              className="draw-path"
              style={{ animationDelay: `${200 + i * 150}ms` }}
            />
          ))}
        </g>
        <g className="font-display" fontSize="26" fill="#FFFFFF" letterSpacing="1">
          {STATE_LABELS.map((s) => (
            <text key={s.name} x={s.x} y={s.y}>
              {s.name}
            </text>
          ))}
        </g>
        <g>
          <rect x="204" y="299" width="12" height="12" fill="#FFFFFF" />
          <text x="196" y="352" textAnchor="middle" fontSize="18" fontWeight="700" fill="#FFFFFF">
            Ibadan (IITA)
          </text>
        </g>
        <g fontSize="19" fontWeight="700" fill="#29BFF5">
          {DAM_SITES.map((dam, i) => (
            <g key={dam.name}>
              <circle
                cx={dam.cx}
                cy={dam.cy}
                r="8"
                className="anim-pulse"
                style={{ animationDelay: `${i * 350}ms` }}
              />
              <circle cx={dam.cx} cy={dam.cy} r="8" stroke="#2B266A" strokeWidth="2" />
              <text x={dam.x} y={dam.y} textAnchor={dam.anchor}>
                {dam.name}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <div className="mt-2.5 flex justify-between gap-4 text-[13px] font-bold text-white">
        <span>Five states, five dams</span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-sky" />
          Proposed FPV sites
        </span>
      </div>
      <div className="absolute -top-[18px] right-6 rotate-[4deg] rounded-lg bg-sky px-3.5 py-2 text-sm font-extrabold text-white shadow-[3px_3px_0_#FFFFFF]">
        Up to 30% less evaporation
      </div>
    </div>
  );
}
