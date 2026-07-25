/** Nuages flous qui dérivent et floutent la vue aérienne. */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

const blobs = [
  { x: 10, y: 20, r: 420, sp: 0.35, o: 0.5 },
  { x: 55, y: 12, r: 520, sp: 0.22, o: 0.42 },
  { x: 78, y: 40, r: 460, sp: 0.5, o: 0.46 },
  { x: 30, y: 55, r: 500, sp: 0.28, o: 0.4 },
  { x: 65, y: 70, r: 440, sp: 0.42, o: 0.44 },
  { x: 5, y: 78, r: 480, sp: 0.6, o: 0.38 },
];

export const Clouds: React.FC<{ cover?: number }> = ({ cover = 1 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: cover }}>
      {blobs.map((b, i) => {
        const drift = ((frame * b.sp) % 140) - 20;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(${b.x}% + ${drift}px)`,
              top: `${b.y}%`,
              width: b.r,
              height: b.r * 0.62,
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(224,232,240,${b.o}) 0%, rgba(200,214,228,${b.o * 0.5}) 45%, transparent 70%)`,
              filter: "blur(28px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
