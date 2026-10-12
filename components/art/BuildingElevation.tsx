import { cn } from "@/lib/cn";

export type ElevationStage = "all" | "drawing" | "frame" | "complete";

interface Props {
  stage?: ElevationStage;
  className?: string;
  /** Used to scope generated ids if several elevations are on one page. */
  label?: string;
}

/* Geometry (viewBox 800 x 560) */
const GROUND = 500;
const X0 = 220;
const BW = 60; // bay width
const BAYS = 6;
const FH = 38; // floor height
const FLOORS = 10;
const WIDTH = BW * BAYS; // 360
const TOP = GROUND - FH * FLOORS; // 120
const X1 = X0 + WIDTH;

const cols = Array.from({ length: BAYS + 1 }, (_, i) => X0 + i * BW);
const floors = Array.from({ length: FLOORS + 1 }, (_, i) => GROUND - i * FH);
const GRID_LABELS = ["A", "B", "C", "D", "E", "F", "G"];

/* deterministic "lit window" pattern */
const lit = (r: number, c: number) => (r * 7 + c * 13 + r * c) % 5 === 0;

/**
 * One architectural elevation drawn in three layers that the BlueprintReveal
 * scene animates: drawing (linework) → frame (structure) → complete (cladding).
 * Static stages are exported for the no-motion / mobile fallback.
 */
export function BuildingElevation({ stage = "all", className, label = "Building elevation" }: Props) {
  const showDraw = stage === "all" || stage === "drawing" || stage === "frame";
  const showFrame = stage === "all" || stage === "frame" || stage === "complete";
  const showDone = stage === "all" || stage === "complete";

  return (
    <svg
      viewBox="0 0 800 560"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label={label}
      focusable="false"
    >
      {/* ground and site datum */}
      <rect x="40" y={GROUND} width="720" height="2" fill="var(--color-gold, #D4AF62)" opacity=".85" />
      <rect x="40" y={GROUND + 8} width="720" height="1.5" fill="#1D4938" opacity=".7" />
      <text x="45" y={GROUND + 24} fontSize="9" fill="#1D4938" letterSpacing="0.12em" opacity=".85" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
        SITE DATUM ±0.00 (CIVIL GRADE)
      </text>

      {/* Layer 3: completed building */}
      {showDone && (
        <g data-bp="done">
          <rect x={X0} y={TOP} width={WIDTH} height={FH * FLOORS} fill="#1c211d" />
          <rect x={X0 + WIDTH * 0.8} y={TOP} width={WIDTH * 0.2} height={FH * FLOORS} fill="#f5f2eb" opacity=".05" />
          {floors.slice(0, -1).map((fy, r) =>
            cols.slice(0, -1).map((cx, c) => {
              if (r === 0) return null;
              const on = lit(r, c);
              return (
                <rect
                  key={`w-${r}-${c}`}
                  x={cx + 10}
                  y={fy - FH + 8}
                  width={BW - 20}
                  height={FH - 16}
                  fill={on ? "#D4AF62" : "#f5f2eb"}
                  opacity={on ? 0.7 : 0.1}
                />
              );
            }),
          )}
          {/* ground-floor glazing + canopy */}
          <rect x={X0 + BW * 2} y={GROUND - FH + 4} width={BW * 2} height={FH - 4} fill="#D4AF62" opacity=".4" />
          <rect x={X0 + BW * 1.7} y={GROUND - FH - 6} width={BW * 2.6} height="7" fill="#D4AF62" />
          {/* parapet + plant room */}
          <rect x={X0 - 6} y={TOP - 8} width={WIDTH + 12} height="9" fill="#f5f2eb" opacity=".35" />
          <rect x={X0 + BW * 2} y={TOP - 34} width={BW * 1.6} height="26" fill="#1c211d" />
          <rect x={X0 + BW * 2.4} y={TOP - 62} width="4" height="30" fill="#D4AF62" />
          {/* slab edges */}
          {floors.slice(1, -1).map((fy) => (
            <rect key={`s-${fy}`} x={X0 - 5} y={fy - 2} width={WIDTH + 10} height="3" fill="#f5f2eb" opacity=".16" />
          ))}
        </g>
      )}

      {/* Layer 2: structural frame */}
      {showFrame && (
        <g data-bp="frame" opacity={stage === "complete" ? 0 : 1}>
          {cols.map((cx) => (
            <rect key={`c-${cx}`} x={cx - 4} y={TOP} width="8" height={FH * FLOORS} fill="#858782" opacity=".9" />
          ))}
          {floors.map((fy) => (
            <rect key={`f-${fy}`} x={X0 - 12} y={fy - 4} width={WIDTH + 24} height="7" fill="#a3a59f" opacity=".85" />
          ))}
          <rect x={X0 + BW * 2.5} y={TOP - 14} width={BW} height={FH * FLOORS + 14} fill="#5d605b" opacity=".9" />
          {/* starter bars at the top (Cherry red structural dowels) */}
          {cols.map((cx) => (
            <rect key={`b-${cx}`} x={cx - 1} y={TOP - 22} width="2" height="22" fill="#8B1E2D" opacity=".85" />
          ))}
        </g>
      )}

      {/* Layer 1: drawing linework */}
      {showDraw && (
        <g
          data-bp="draw"
          fill="none"
          stroke="var(--elevation-ink, #F5F2EB)"
          strokeWidth="1.25"
          strokeOpacity={stage === "frame" ? 0.28 : 0.85}
          strokeLinecap="square"
        >
          <path pathLength={1} d={`M${X0} ${GROUND} V${TOP} H${X1} V${GROUND}`} />
          {floors.slice(1, -1).map((fy) => (
            <path key={`fl-${fy}`} pathLength={1} d={`M${X0} ${fy} H${X1}`} strokeOpacity=".5" />
          ))}
          {cols.slice(1, -1).map((cx) => (
            <path key={`cl-${cx}`} pathLength={1} d={`M${cx} ${GROUND} V${TOP}`} strokeOpacity=".5" />
          ))}
          <path pathLength={1} d={`M${X0 + BW * 2.5} ${GROUND} V${TOP - 14} H${X0 + BW * 3.5} V${GROUND}`} />
          {/* grid axes + bubbles (Cherry red architectural grid markers) */}
          {cols.map((cx, i) => (
            <g key={`ax-${cx}`}>
              <path pathLength={1} d={`M${cx} ${TOP - 26} V${TOP - 70}`} stroke="#8B1E2D" strokeDasharray="none" strokeOpacity=".6" />
              <circle cx={cx} cy={TOP - 82} r="11" stroke="#8B1E2D" strokeWidth="1.25" fill="rgb(139 30 45 / 0.15)" strokeOpacity=".9" />
              <text
                x={cx}
                y={TOP - 78}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--elevation-ink, #F5F2EB)"
                stroke="none"
                opacity=".9"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {GRID_LABELS[i]}
              </text>
            </g>
          ))}
          {/* dimension line */}
          <path pathLength={1} d={`M${X1 + 40} ${GROUND} V${TOP}`} stroke="var(--color-gold, #D4AF62)" strokeOpacity=".9" />
          <path pathLength={1} d={`M${X1 + 32} ${GROUND} H${X1 + 48} M${X1 + 32} ${TOP} H${X1 + 48}`} stroke="var(--color-gold, #D4AF62)" strokeOpacity=".9" />
        </g>
      )}
    </svg>
  );
}
