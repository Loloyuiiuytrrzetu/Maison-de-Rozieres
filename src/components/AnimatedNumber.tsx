/** Compteur qui monte de 0 à `value` et « claque » à l'arrivée (scale + halo). */
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { design } from "../design";
import { progress } from "../motion";

export const AnimatedNumber: React.FC<{
  value: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
  /** Effet « slam » (scale + halo) à l'arrivée. */
  punch?: boolean;
}> = ({ value, delay = 0, prefix = "", suffix = "", style, punch = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = progress(frame, fps, "slam", delay);
  const current = Math.round(interpolate(p, [0, 1], [0, value], { extrapolateRight: "clamp" }));

  const scale = punch ? interpolate(p, [0, 0.5, 1], [1.25, 1.03, 1]) : 1;
  const glow = punch ? interpolate(p, [0.4, 0.6, 1], [0, 1, 0.25], { extrapolateLeft: "clamp" }) : 0;

  return (
    <span
      style={{
        ...style,
        display: "inline-block",
        transform: `scale(${scale})`,
        textShadow: glow ? `0 0 ${40 * glow}px ${design.palette.bordeauxLueur}` : undefined,
      }}
    >
      {prefix}
      {current}
      {suffix}
    </span>
  );
};
