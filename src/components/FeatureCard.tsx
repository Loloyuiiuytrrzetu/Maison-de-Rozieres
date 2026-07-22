/** Carte "levier". Entrée en rebond (bounce) + flottement continu + liseré pulsé. */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { design } from "../design";
import { entrance, useFloat, usePulse } from "../motion";
import { Icon, type IconKey } from "./icons";

const { palette, gradients, fonts, fontWeights, textScale, spacing, radius, typography } =
  design;

const signalColor: Record<string, string> = {
  info: palette.info,
  succes: palette.succes,
  bordeaux: palette.bordeauxLueur,
};

export const FeatureCard: React.FC<{
  idx: string;
  icon: IconKey;
  title: string;
  desc: string;
  footer: string;
  accent?: keyof typeof signalColor;
  delay?: number;
  featured?: boolean;
  floatPhase?: number;
}> = ({
  idx,
  icon,
  title,
  desc,
  footer,
  accent = "bordeaux",
  delay = 0,
  featured = false,
  floatPhase = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = entrance(frame, fps, "popIn", delay);
  const floatY = useFloat(8, 0.32, floatPhase);
  const pulse = usePulse(0.35, floatPhase);
  const accentCol = signalColor[accent];

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: spacing.md,
        background: palette.ardoise,
        border: `1px solid ${palette.lisere}`,
        borderRadius: radius.lg,
        padding: featured ? spacing.xl : spacing.lg,
        position: "relative",
        overflow: "hidden",
        height: "100%",
        opacity: e.opacity,
        transform: `${e.transform} translateY(${floatY}px)`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.35), 0 0 ${interpolate(pulse, [0, 1], [0, 26])}px rgba(214,72,107,0.18)`,
      }}
    >
      {/* Barre d'accent gauche qui brille */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: gradients.accentBordeaux,
          boxShadow: `0 0 ${interpolate(pulse, [0, 1], [6, 20])}px ${palette.bordeauxLueur}`,
        }}
      />
      <div
        style={{
          fontFamily: fonts.labels,
          fontSize: textScale.kicker,
          letterSpacing: typography.letterSpacing.kicker,
          color: palette.bordeauxLueur,
        }}
      >
        {idx}
      </div>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: radius.md,
          background: palette.brumeFroide,
          display: "grid",
          placeItems: "center",
          transform: `scale(${interpolate(pulse, [0, 1], [1, 1.06])})`,
        }}
      >
        <Icon name={icon} color={accentCol} size={38} />
      </div>
      <div
        style={{
          fontFamily: fonts.titres,
          fontWeight: fontWeights.bold,
          fontSize: featured ? textScale.h2 : textScale.h3,
          lineHeight: typography.lineHeight.snug,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: palette.grisBrume,
          fontSize: textScale.body,
          lineHeight: typography.lineHeight.relaxed,
        }}
      >
        {desc}
      </div>
      <div
        style={{
          marginTop: "auto",
          fontFamily: fonts.labels,
          fontSize: textScale.caption,
          letterSpacing: typography.letterSpacing.kicker,
          textTransform: "uppercase",
          color: palette.grisEstompe,
          borderTop: `1px solid ${palette.lisere}`,
          paddingTop: spacing.md,
        }}
      >
        {footer}
      </div>
    </div>
  );
};
