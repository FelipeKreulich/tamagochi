"use client";

import type { CSSProperties } from "react";
import type { WallpaperStyle } from "./accessories/catalog";

interface LcdWallpaperProps {
  style: WallpaperStyle;
}

const RAIN_DROPS = [
  { left: "6%", delay: "0s", duration: "3.2s" },
  { left: "16%", delay: "1.1s", duration: "2.8s" },
  { left: "26%", delay: "0.4s", duration: "3.6s" },
  { left: "36%", delay: "1.8s", duration: "3s" },
  { left: "46%", delay: "0.8s", duration: "2.6s" },
  { left: "56%", delay: "2.2s", duration: "3.4s" },
  { left: "66%", delay: "0.2s", duration: "2.9s" },
  { left: "76%", delay: "1.4s", duration: "3.1s" },
  { left: "86%", delay: "0.6s", duration: "3.5s" },
  { left: "94%", delay: "2s", duration: "2.7s" },
];

export function LcdWallpaper({ style }: LcdWallpaperProps) {
  const { pattern, color, opacity } = style;

  if (pattern === "rain") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
        style={{ color, opacity }}
      >
        {RAIN_DROPS.map((d, i) => (
          <span
            key={i}
            className="absolute top-0 text-[10px] leading-none"
            style={{
              left: d.left,
              animation: `wallpaperRainFall ${d.duration} steps(12) ${d.delay} infinite`,
            }}
          >
            *
          </span>
        ))}
      </div>
    );
  }

  const base: CSSProperties = {
    color,
    opacity,
  };

  if (pattern === "dots") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          ...base,
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1.4px)",
          backgroundSize: "10px 10px",
        }}
      />
    );
  }

  if (pattern === "waves") {
    const svg = encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='14' viewBox='0 0 40 14'><path d='M0 7 Q 5 1, 10 7 T 20 7 T 30 7 T 40 7' stroke='currentColor' stroke-width='1.3' fill='none'/></svg>"
    );
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          ...base,
          backgroundImage: `url("data:image/svg+xml;utf8,${svg}")`,
          backgroundSize: "40px 14px",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5]"
      style={{
        ...base,
        backgroundImage:
          "repeating-linear-gradient(0deg, currentColor 0 1px, transparent 1px 3px)",
      }}
    />
  );
}
