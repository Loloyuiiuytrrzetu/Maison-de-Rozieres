/** Nœud du schéma (acteur / plateforme / bénéficiaire). Le nœud "core" est bordeaux. */
import React from "react";
import { design } from "../design";
import { AnimatedText } from "./AnimatedText";
import { Icon, type IconKey } from "./icons";

const { palette, gradients, fonts, fontWeights, textScale, spacing, radius, typography } =
  design;

export const DiagramNode: React.FC<{
  icon: IconKey;
  label: string;
  name: string;
  desc: string;
  core?: boolean;
  delay?: number;
}> = ({ icon, label, name, desc, core = false, delay = 0 }) => {
  return (
    <AnimatedText
      kind="popIn"
      delay={delay}
      style={{
        background: core ? gradients.accentBordeaux : palette.ardoise,
        border: core ? "none" : `1px solid ${palette.lisere}`,
        borderRadius: radius.lg,
        padding: spacing.xl,
        boxShadow: core ? "0 30px 80px rgba(110,18,48,.5)" : "none",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: radius.md,
          background: core ? "rgba(255,255,255,.15)" : palette.brumeFroide,
          display: "grid",
          placeItems: "center",
          marginBottom: spacing.md,
        }}
      >
        <Icon name={icon} color={palette.blancCasse} size={34} />
      </div>
      <div
        style={{
          fontFamily: fonts.labels,
          fontSize: textScale.kicker,
          letterSpacing: typography.letterSpacing.kicker,
          textTransform: "uppercase",
          color: core ? "rgba(255,255,255,.75)" : palette.grisEstompe,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: fonts.titres,
          fontWeight: fontWeights.bold,
          fontSize: textScale.h3,
          marginTop: 4,
        }}
      >
        {name}
      </div>
      <div style={{ color: palette.grisBrume, fontSize: textScale.body, marginTop: spacing.sm }}>
        {desc}
      </div>
    </AnimatedText>
  );
};
