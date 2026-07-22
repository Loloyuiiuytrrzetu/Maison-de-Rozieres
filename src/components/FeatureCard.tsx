/** Carte "levier" (récap / mise en avant). Apparition popIn, accent bordeaux à gauche. */
import React from "react";
import { design } from "../design";
import { AnimatedText } from "./AnimatedText";
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
}> = ({ idx, icon, title, desc, footer, accent = "bordeaux", delay = 0, featured = false }) => {
  return (
    <AnimatedText
      kind="popIn"
      delay={delay}
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
      }}
    >
      {/* Barre d'accent gauche */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: gradients.accentBordeaux,
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
        }}
      >
        <Icon name={icon} color={signalColor[accent]} size={38} />
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
    </AnimatedText>
  );
};
