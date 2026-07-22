/** Sur-titre mono précédé d'un trait bordeaux (l'accent de section). */
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { design } from "../design";
import { progress } from "../motion";

const { palette, gradients, fonts, textScale, typography, spacing } = design;

export const AccentKicker: React.FC<{ label: string; delay?: number }> = ({
  label,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = progress(frame, fps, "ferme", delay);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing.sm,
        fontFamily: fonts.labels,
        fontSize: textScale.kicker,
        letterSpacing: typography.letterSpacing.kicker,
        textTransform: "uppercase",
        color: palette.bordeauxLueur,
        opacity: p,
      }}
    >
      <span
        style={{
          width: 40 * p,
          height: 3,
          background: gradients.accentBordeaux,
          display: "inline-block",
        }}
      />
      {label}
    </div>
  );
};
