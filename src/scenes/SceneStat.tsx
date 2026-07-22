/** 03 · Preuve — grosse stat (compteur animé + KPIs latéraux). */
import React from "react";
import { z } from "zod";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { design } from "../design";
import { progress } from "../motion";
import { Frame } from "../components/Frame";
import { SfxTrack } from "../components/Sfx";
import { AccentKicker } from "../components/AccentKicker";
import { AnimatedText } from "../components/AnimatedText";
import { AnimatedNumber } from "../components/AnimatedNumber";

const { palette, gradients, fonts, fontWeights, textScale, spacing, radius, typography } =
  design;

export const sceneStatSchema = z.object({
  kicker: z.string(),
  prefix: z.string(),
  value: z.number(),
  unit: z.string(),
  line1: z.string(),
  line1bold: z.string(),
  line2: z.string(),
  sub: z.string(),
  side: z.array(
    z.object({
      k: z.string(),
      v: z.string(),
      tone: z.enum(["info", "succes", "blanc"]),
    }),
  ),
});

const toneColor: Record<string, string> = {
  info: design.palette.info,
  succes: design.palette.succes,
  blanc: design.palette.blancCasse,
};

export const SceneStat: React.FC<z.infer<typeof sceneStatSchema>> = ({
  kicker,
  prefix,
  value,
  unit,
  line1,
  line1bold,
  line2,
  sub,
  side,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bar = progress(frame, fps, "ferme", 14);

  return (
    <Frame section="Preuve" index="03" footerLeft="Impact du push" footerRight="2024–2025">
      <SfxTrack cues={[{ name: "whoosh", volume: 0.5 }, { name: "riser", at: 0, volume: 0.4 }, { name: "impact", at: 6, volume: 0.7 }]} />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          alignItems: "center",
        }}
      >
        <div>
          <AnimatedText kind="fade" delay={2} style={{ marginBottom: spacing.lg }}>
            <AccentKicker label={kicker} />
          </AnimatedText>

          <AnimatedText
            kind="slamIn"
            delay={4}
            style={{
              fontFamily: fonts.titres,
              fontWeight: fontWeights.bold,
              fontSize: 380,
              lineHeight: 0.82,
              letterSpacing: typography.letterSpacing.tight,
            }}
          >
            <span style={{ color: palette.bordeauxLueur }}>{prefix}</span>
            <AnimatedNumber value={value} delay={6} />
            <span style={{ fontSize: textScale.display, color: palette.bordeaux, verticalAlign: "super" }}>
              {unit}
            </span>
          </AnimatedText>

          <div
            style={{
              width: 340 * bar,
              height: 8,
              background: gradients.accentBordeaux,
              borderRadius: radius.pill,
              boxShadow: "0 0 40px rgba(214,72,107,.5)",
              margin: `${spacing.lg}px 0 ${spacing.xl}px`,
            }}
          />

          <AnimatedText
            kind="fadeUp"
            delay={20}
            style={{
              fontFamily: fonts.titres,
              fontWeight: fontWeights.semibold,
              fontSize: textScale.h2,
              lineHeight: typography.lineHeight.snug,
            }}
          >
            {line1} <span style={{ color: palette.bordeauxLueur }}>{line1bold}</span> {line2}
          </AnimatedText>
          <AnimatedText
            kind="fadeUp"
            delay={26}
            style={{ color: palette.grisBrume, fontSize: textScale.lead, marginTop: spacing.md, maxWidth: 900 }}
          >
            {sub}
          </AnimatedText>
        </div>

        <div
          style={{
            borderLeft: `1px solid ${palette.lisere}`,
            paddingLeft: spacing.xl,
            display: "flex",
            flexDirection: "column",
            gap: spacing.lg,
          }}
        >
          {side.map((s, i) => (
            <AnimatedText key={i} kind="fadeUp" delay={24 + i * 5}>
              <div
                style={{
                  fontFamily: fonts.labels,
                  fontSize: textScale.kicker,
                  letterSpacing: typography.letterSpacing.kicker,
                  textTransform: "uppercase",
                  color: palette.grisEstompe,
                }}
              >
                {s.k}
              </div>
              <div
                style={{
                  fontFamily: fonts.titres,
                  fontWeight: fontWeights.bold,
                  fontSize: textScale.h3,
                  marginTop: 4,
                  color: toneColor[s.tone],
                }}
              >
                {s.v}
              </div>
            </AnimatedText>
          ))}
        </div>
      </div>
    </Frame>
  );
};
