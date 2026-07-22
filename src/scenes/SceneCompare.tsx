/** 06 · Le déclic — comparatif en barres (Avant / Avec Walletiz). */
import React from "react";
import { z } from "zod";
import { design } from "../design";
import { Frame } from "../components/Frame";
import { SfxTrack } from "../components/Sfx";
import { AccentKicker } from "../components/AccentKicker";
import { AnimatedText } from "../components/AnimatedText";
import { Bar } from "../components/Bar";

const { palette, fonts, fontWeights, textScale, spacing, radius, typography } = design;

export const sceneCompareSchema = z.object({
  kicker: z.string(),
  title: z.string(),
  beforeValue: z.number(),
  afterValue: z.number(),
  beforeLabel: z.string(),
  afterLabel: z.string(),
  beforeDesc: z.string(),
  afterDesc: z.string(),
});

const MAX_H = 300;

export const SceneCompare: React.FC<z.infer<typeof sceneCompareSchema>> = ({
  kicker,
  title,
  beforeValue,
  afterValue,
  beforeLabel,
  afterLabel,
  beforeDesc,
  afterDesc,
}) => {
  const max = Math.max(beforeValue, afterValue);
  const beforeH = (beforeValue / max) * MAX_H;
  const afterH = (afterValue / max) * MAX_H;

  return (
    <Frame section="Comparatif" index="06" footerLeft="Visites répétées · 30 jours" footerRight="Base 100">
      <SfxTrack cues={[{ name: "whoosh", volume: 0.5 }, { name: "pop", at: 16, volume: 0.5 }, { name: "impact", at: 22, volume: 0.6 }]} />
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
        <AnimatedText kind="fade" delay={2} style={{ marginBottom: spacing.sm }}>
          <AccentKicker label={kicker} />
        </AnimatedText>
        <AnimatedText
          kind="slamIn"
          delay={6}
          style={{
            fontFamily: fonts.titres,
            fontWeight: fontWeights.bold,
            fontSize: textScale.h2,
            lineHeight: typography.lineHeight.tight,
            letterSpacing: typography.letterSpacing.tight,
          }}
        >
          {title}
        </AnimatedText>

        <div
          style={{
            position: "relative",
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: spacing.xxl,
            alignItems: "start",
            paddingTop: 80,
          }}
        >
          <Column
            height={beforeH}
            value={String(beforeValue)}
            variant="before"
            label={beforeLabel}
            desc={beforeDesc}
            delay={16}
          />
          <Column
            height={afterH}
            value={String(afterValue)}
            variant="after"
            label={afterLabel}
            desc={afterDesc}
            delay={22}
          />

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "58%",
              transform: "translate(-50%,-50%)",
              fontFamily: fonts.labels,
              fontSize: textScale.label,
              letterSpacing: typography.letterSpacing.kicker,
              color: palette.grisEstompe,
              background: palette.nuitFroide,
              padding: `${spacing.sm}px ${spacing.md}px`,
              border: `1px solid ${palette.lisere}`,
              borderRadius: radius.pill,
              zIndex: 3,
            }}
          >
            VS
          </div>
        </div>
      </div>
    </Frame>
  );
};

const Column: React.FC<{
  height: number;
  value: string;
  variant: "before" | "after";
  label: string;
  desc: string;
  delay: number;
}> = ({ height, value, variant, label, desc, delay }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.lg }}>
    <div style={{ height: MAX_H, display: "flex", alignItems: "flex-end" }}>
      <Bar targetHeight={height} value={value} variant={variant} delay={delay} />
    </div>
    <AnimatedText
      kind="fadeUp"
      delay={delay + 4}
      style={{
        fontFamily: fonts.titres,
        fontWeight: fontWeights.semibold,
        fontSize: textScale.h3,
        color: variant === "after" ? palette.blancCasse : palette.grisEstompe,
      }}
    >
      {label}
    </AnimatedText>
    <AnimatedText
      kind="fadeUp"
      delay={delay + 8}
      style={{
        color: palette.grisBrume,
        fontSize: textScale.body,
        textAlign: "center",
        maxWidth: 460,
        lineHeight: typography.lineHeight.relaxed,
      }}
    >
      {desc}
    </AnimatedText>
  </div>
);
