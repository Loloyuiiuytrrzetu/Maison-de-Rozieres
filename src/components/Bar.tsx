/** Barre de comparatif qui pousse depuis le bas avec dépassement élastique. */
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { design } from "../design";
import { progress } from "../motion";

const { palette, gradients, fonts, fontWeights, textScale, radius } = design;

export const Bar: React.FC<{
  targetHeight: number;
  value: string;
  variant: "before" | "after";
  delay?: number;
}> = ({ targetHeight, value, variant, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isAfter = variant === "after";
  // La barre "après" rebondit (bounce), la barre "avant" arrive net (ferme).
  const p = progress(frame, fps, isAfter ? "bounce" : "ferme", delay);
  const h = interpolate(p, [0, 1], [0, targetHeight]);
  const valPop = interpolate(p, [0.5, 0.75, 1], [0, 1.15, 1], { extrapolateLeft: "clamp" });

  return (
    <div style={{ position: "relative", width: 150 }}>
      <div
        style={{
          position: "absolute",
          bottom: h + 20,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: fonts.titres,
          fontWeight: fontWeights.bold,
          fontSize: textScale.h3,
          color: isAfter ? palette.bordeauxLueur : palette.grisBrume,
          opacity: interpolate(p, [0.4, 0.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `scale(${valPop})`,
        }}
      >
        {value}
      </div>
      <div
        style={{
          height: h,
          borderRadius: `${radius.md}px ${radius.md}px 0 0`,
          background: isAfter ? gradients.accentBordeaux : palette.brumeFroide,
          border: isAfter ? "none" : `1px solid ${palette.lisere}`,
          boxShadow: isAfter ? "0 0 60px rgba(214,72,107,.4)" : "none",
        }}
      />
    </div>
  );
};
