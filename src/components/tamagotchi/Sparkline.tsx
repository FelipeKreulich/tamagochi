"use client";

import type { StatSample } from "@/lib/game/types";
import { cn } from "@/lib/utils";

type StatKey = "hunger" | "happiness" | "energy" | "hygiene" | "health";

interface SparklineProps {
  samples: StatSample[];
  stat: StatKey;
  color: string;
  label: string;
  className?: string;
}

const WIDTH = 120;
const HEIGHT = 28;
const PAD = 2;

export function Sparkline({
  samples,
  stat,
  color,
  label,
  className,
}: SparklineProps) {
  const current = samples.length > 0 ? samples[samples.length - 1][stat] : 0;

  if (samples.length < 2) {
    return (
      <div className={cn("space-y-1", className)}>
        <div className="flex items-center justify-between text-[8px] uppercase tracking-widest text-lcd-light/70">
          <span>{label}</span>
          <span style={{ color }}>{Math.round(current)}</span>
        </div>
        <div
          className="flex items-end border-2 border-lcd-light/40 bg-lcd-dark"
          style={{ width: WIDTH, height: HEIGHT }}
        >
          <p className="m-auto text-[7px] uppercase tracking-widest text-lcd-light/40">
            ...
          </p>
        </div>
      </div>
    );
  }

  const points = samples.map((s, i) => {
    const x =
      PAD + (i / (samples.length - 1)) * (WIDTH - PAD * 2);
    const y =
      HEIGHT - PAD - (s[stat] / 100) * (HEIGHT - PAD * 2);
    return { x, y };
  });

  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between text-[8px] uppercase tracking-widest text-lcd-light/70">
        <span>{label}</span>
        <span style={{ color }}>{Math.round(current)}</span>
      </div>
      <div
        className="relative border-2 border-lcd-light/40 bg-lcd-dark"
        style={{ width: WIDTH, height: HEIGHT }}
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          width={WIDTH}
          height={HEIGHT}
          shapeRendering="crispEdges"
          aria-hidden
        >
          <line
            x1={PAD}
            x2={WIDTH - PAD}
            y1={HEIGHT / 2}
            y2={HEIGHT / 2}
            stroke="var(--lcd-dim)"
            strokeWidth={1}
            strokeDasharray="2 2"
          />
          <path d={d} fill="none" stroke={color} strokeWidth={1.5} />
          {points.length > 0 && (
            <rect
              x={points[points.length - 1].x - 1.5}
              y={points[points.length - 1].y - 1.5}
              width={3}
              height={3}
              fill={color}
            />
          )}
        </svg>
      </div>
    </div>
  );
}
