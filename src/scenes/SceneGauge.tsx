/** 05 · Preuve — jauge d'engagement (arc animé + compteur). */
import React from "react";
import { z } from "zod";
import { design } from "../design";
import { Frame } from "../components/Frame";
import { SfxTrack } from "../components/Sfx";
import { AccentKicker } from "../components/AccentKicker";
import { AnimatedText } from "../components/AnimatedText";
import { GaugeArc } from "../components/GaugeArc";

const { palette, gradients, fonts, fontWeights, textScale, spacing, radius, typography } =
  design;

export const sceneGaugeSchema = z.object({
  kicker: z.string(),
  title: z.string(),
  lead: z.string(),
  value: z.number(),
  tag: z.string(),
});

export const SceneGauge: React.FC<z.infer<typeof sceneGaugeSchema>> = ({
  kicker,
  title,
  lead,
  value,
  tag,
}) => {
  return (
    <Frame section="Preuve" index="05" footerLeft="Indice d'engagement" footerRight="/ 100">
      <SfxTrack cues={[{ name: "whoosh", volume: 0.5 }, { name: "riser", at: 2, volume: 0.35 }, { name: "pop", at: 14, volume: 0.45 }]} />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 620px",
          alignItems: "center",
          gap: spacing.xxl,
        }}
      >
        <div>
          <AnimatedText kind="fade" delay={2} style={{ marginBottom: spacing.lg }}>
            <AccentKicker label={kicker} />
          </AnimatedText>
          <AnimatedText
            kind="fadeUp"
            delay={8}
            style={{
              fontFamily: fonts.titres,
              fontWeight: fontWeights.bold,
              fontSize: textScale.h1,
              lineHeight: typography.lineHeight.tight,
              letterSpacing: typography.letterSpacing.tight,
            }}
          >
            {title}
          </AnimatedText>
          <AnimatedText
            kind="fadeUp"
            delay={16}
            style={{
              color: palette.grisBrume,
              fontSize: textScale.lead,
              marginTop: spacing.lg,
              maxWidth: 640,
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            {lead}
          </AnimatedText>

          <AnimatedText kind="fade" delay={22} style={{ display: "flex", gap: spacing.xl, marginTop: spacing.xl }}>
            <Legend swatch={gradients.accentBordeaux} label="Atteint" />
            <Legend swatch={palette.lisere} label="Restant" />
          </AnimatedText>
        </div>

        <GaugeArc value={value} tag={tag} delay={12} />
      </div>
    </Frame>
  );
};

const Legend: React.FC<{ swatch: string; label: string }> = ({ swatch, label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: spacing.sm,
      fontFamily: fonts.labels,
      fontSize: textScale.kicker,
      letterSpacing: typography.letterSpacing.kicker,
      textTransform: "uppercase",
      color: palette.grisEstompe,
    }}
  >
    <span style={{ width: 20, height: 20, borderRadius: radius.sm, background: swatch }} />
    {label}
  </div>
);
