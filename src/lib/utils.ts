import type { ColorStop } from "./types";
import Color from "color";

export const generateGradient = (
  colorStops: ColorStop[],
  tailwind?: boolean,
): string => {
  const sorted = colorStops.slice().sort((a, b) => a.position - b.position);

  if (tailwind) {
    const stops = sorted.map((stop, idx) => {
      if (idx === 0) return `from-[${stop.color}]`;
      if (idx === sorted.length - 1) return `to-[${stop.color}]`;
      return `via-[${stop.color}]`;
    });
    return `bg-gradient-to-r ${stops.join(" ")}`;
  }

  return `linear-gradient(to right, ${sorted
    .map((stop) => `${stop.color} ${Math.round(stop.position)}%`)
    .join(", ")})`;
};

export const interpolate = (
  color1: string,
  color2: string,
  factor: number = 0.5,
): string => {
  const c1 = Color(color1);
  const c2 = Color(color2);

  const r = Math.round(c1.red() + (c2.red() - c1.red()) * factor);
  const g = Math.round(c1.green() + (c2.green() - c1.green()) * factor);
  const b = Math.round(c1.blue() + (c2.blue() - c1.blue()) * factor);

  return Color({ r, g, b }).hex().toUpperCase();
};

export const isValidHex = (color: string) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};
