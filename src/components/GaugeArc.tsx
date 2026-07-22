/** Jauge circulaire : l'arc bordeaux se dessine jusqu'à `value`/100. */
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { design } from "../design";
import { progress, useFloat, usePulse } from "../motion";
import { AnimatedNumber } from "./AnimatedNumber";

const { palette, fonts, fontWeights, textScale, typography } = design;

export const GaugeArc: React.FC<{
  value: number;
  tag: string;
  delay?: number;
}> = ({ value, tag, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = progress(frame, fps, "doux", delay);
  const floatY = useFloat(9, 0.3);
  const pulse = usePulse(0.5);

  const r = 250;
  const circumference = 2 * Math.PI * r;
  const filled = interpolate(p, [0, 1], [0, value / 100]);
  const dashoffset = circumference * (1 - filled);
  // Position du point lumineux au bout de l'arc.
  const angle = -90 + filled * 360;
  const tipX = 310 + r * Math.cos((angle * Math.PI) / 180);
  const tipY = 310 + r * Math.sin((angle * Math.PI) / 180);

  return (
    <div
      style={{
        position: "relative",
        display: "grid",
        placeItems: "center",
        transform: `translateY(${floatY}px)`,
      }}
    >
      <svg width={620} height={620} viewBox="0 0 620 620">
        <circle
          cx={310}
          cy={310}
          r={r}
          fill="none"
          stroke={palette.lisere}
          strokeWidth={40}
        />
        <circle
          cx={310}
          cy={310}
          r={r}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth={40}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          transform="rotate(-90 310 310)"
        />
        {/* Point lumineux au bout de l'arc */}
        <circle
          cx={tipX}
          cy={tipY}
          r={interpolate(pulse, [0, 1], [14, 22])}
          fill={palette.bordeauxLueur}
          opacity={interpolate(p, [0.6, 1], [0, 1], { extrapolateLeft: "clamp" })}
          style={{ filter: "blur(2px)" }}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette.bordeaux} />
            <stop offset="100%" stopColor={palette.bordeauxLueur} />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: "absolute", textAlign: "center" }}>
        <div
          style={{
            fontFamily: fonts.titres,
            fontWeight: fontWeights.bold,
            fontSize: 220,
            lineHeight: 1,
            letterSpacing: typography.letterSpacing.tight,
          }}
        >
          <AnimatedNumber value={value} delay={delay} />
          <span style={{ fontSize: textScale.h2, color: palette.grisEstompe }}>/100</span>
        </div>
        <div
          style={{
            fontFamily: fonts.labels,
            fontSize: textScale.label,
            letterSpacing: typography.letterSpacing.kicker,
            textTransform: "uppercase",
            color: palette.bordeauxLueur,
            marginTop: 8,
            opacity: p,
          }}
        >
          {tag}
        </div>
      </div>
    </div>
  );
};
