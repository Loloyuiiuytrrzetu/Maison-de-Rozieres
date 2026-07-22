/** Compteur qui monte de 0 à `value` via un ressort de la charte. */
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { progress } from "../motion";

export const AnimatedNumber: React.FC<{
  value: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({ value, delay = 0, prefix = "", suffix = "", style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = progress(frame, fps, "doux", delay);
  const current = Math.round(interpolate(p, [0, 1], [0, value]));
  return (
    <span style={style}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
};
