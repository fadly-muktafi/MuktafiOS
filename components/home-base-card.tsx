import { homeBase } from "@/lib/content";
import { JAVA_MAP_PATH, JAKARTA_POINT } from "@/lib/map-data";

/**
 * HomeBaseCard — Final Play right panel, resting state.
 * Real Java + Madura coastline (Natural Earth land-50m,
 * generated via scripts/build-map.mjs) with a radar-ping
 * marker + hover/focus tooltip at South Jakarta.
 */

// JAKARTA_POINT lives in a 400x180 viewBox — convert to percents
// so the HTML marker tracks the SVG at any rendered width.
const MARKER_LEFT = `${(JAKARTA_POINT.x / 400) * 100}%`;
const MARKER_TOP = `${(JAKARTA_POINT.y / 180) * 100}%`;

export function HomeBaseCard() {
  return (
    <div className="flex h-full flex-col rounded-inner border border-line bg-surface p-5 text-left md:p-6">
      {/* Java island map — flexes to fill, keep aspect via meet */}
      <div className="flex min-h-0 flex-1 items-center rounded-control border border-line bg-bg">
        <div className="relative w-full">
          <svg
            viewBox="0 0 400 180"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Map of Java island with South Jakarta marked on the northwest coast"
            className="block w-full"
          >
            {/* Faint tactical grid behind the map */}
            <g
              stroke="var(--color-line)"
              strokeWidth="1"
              fill="none"
              aria-hidden="true"
            >
              {Array.from({ length: 7 }, (_, i) => (
                <line
                  key={`v${i}`}
                  x1={40 + i * 53}
                  y1="12"
                  x2={40 + i * 53}
                  y2="168"
                />
              ))}
              {Array.from({ length: 3 }, (_, i) => (
                <line
                  key={`h${i}`}
                  x1="12"
                  y1={40 + i * 50}
                  x2="388"
                  y2={40 + i * 50}
                />
              ))}
            </g>

            {/* Java + Madura coastlines (real geo data) */}
            <path
              d={JAVA_MAP_PATH}
              fill="var(--color-bg-soft)"
              stroke="var(--color-line-strong)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Marker label halo (static SVG part) */}
            <g aria-hidden="true">
              <line
                x1={JAKARTA_POINT.x}
                y1={JAKARTA_POINT.y - 26}
                x2={JAKARTA_POINT.x}
                y2={JAKARTA_POINT.y - 6}
                stroke="var(--color-accent-line)"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
            </g>
            <text
              x={JAKARTA_POINT.x}
              y={JAKARTA_POINT.y - 34}
              textAnchor="middle"
              fill="var(--color-frost)"
              className="font-mono text-[10px] uppercase"
              style={{ letterSpacing: "0.16em" }}
            >
              Jakarta
            </text>
          </svg>

          {/* Radar marker — HTML overlay tracking the SVG coordinates */}
          <button
            type="button"
            aria-label={`${homeBase.tooltip.title}. ${homeBase.tooltip.body}`}
            aria-describedby="homebase-tooltip"
            className="peer absolute grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full outline-none"
            style={{ left: MARKER_LEFT, top: MARKER_TOP }}
          >
            {/* ping rings */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-accent/30 animate-[radar-ping_2.6s_ease-out_infinite]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-accent/20 animate-[radar-ping_2.6s_ease-out_infinite]"
              style={{ animationDelay: "1.3s" }}
            />
            {/* static halo + core */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 transition-transform duration-300 group-hover:scale-125"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-110"
            />
          </button>

          {/* Tooltip */}
          <div
            id="homebase-tooltip"
            role="tooltip"
            aria-hidden="true"
            className="pointer-events-none absolute z-10 flex w-max max-w-[220px] -translate-y-1/2 flex-col gap-0.5 rounded-control border border-line bg-raised px-3.5 py-2.5 text-left opacity-0 shadow-lg transition-all duration-300 ease-snap peer-hover:opacity-100 peer-hover:translate-x-1 peer-focus-visible:opacity-100 peer-focus-visible:translate-x-1"
            style={{ left: `calc(${MARKER_LEFT} + 22px)`, top: MARKER_TOP }}
          >
            <p className="text-xs font-semibold text-frost">
              {homeBase.tooltip.title}
            </p>
            <p className="text-xs text-muted">{homeBase.tooltip.body}</p>
          </div>
        </div>
      </div>

      {/* Location readout */}
      <div className="mt-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
          {homeBase.label}
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-frost">
          {homeBase.city}
        </p>
        <p className="text-sm text-muted">{homeBase.region}</p>
      </div>
    </div>
  );
}
