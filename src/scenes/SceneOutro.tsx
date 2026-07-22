/** 09 · Écran de fin — logo + tagline + CTA (adapté de LogoReveal). */
import React from "react";
import { z } from "zod";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { design } from "../design";
import { progress } from "../motion";
import { Frame } from "../components/Frame";
import { SfxTrack } from "../components/Sfx";
import { AnimatedText } from "../components/AnimatedText";

const { palette, gradients, fonts, fontWeights, textScale, spacing, radius, typography } =
  design;

export const sceneOutroSchema = z.object({
  brand: z.string(),
  taglineLead: z.string(),
  taglineBold: z.string(),
  taglineTail: z.string(),
  cta: z.string(),
  handles: z.array(z.string()),
});

export const SceneOutro: React.FC<z.infer<typeof sceneOutroSchema>> = ({
  brand,
  taglineLead,
  taglineBold,
  taglineTail,
  cta,
  handles,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Anneau qui se dessine autour du monogramme (technique de LogoReveal).
  const draw = progress(frame, fps, "doux", 4);
  const circ = 2 * Math.PI * 60;
  const mark = progress(frame, fps, "punchy", 2);
  const markScale = interpolate(mark, [0, 1], [0.6, 1]);
  const lineW = progress(frame, fps, "ferme", 20);

  return (
    <Frame section="Écran de fin" index="09" footerLeft="Merci" footerRight="Fin">
      <SfxTrack cues={[{ name: "whoosh", volume: 0.5 }, { name: "impact", at: 2, volume: 0.55 }, { name: "chime", at: 8, volume: 0.6 }]} />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: spacing.lg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
          <div style={{ position: "relative", width: 96, height: 96, opacity: mark, transform: `scale(${markScale})` }}>
            <div
              style={{
                position: "absolute",
                inset: 4,
                borderRadius: radius.md,
                background: gradients.accentBordeaux,
                display: "grid",
                placeItems: "center",
                boxShadow: "0 0 60px rgba(168,29,69,.5)",
              }}
            >
              <span
                style={{
                  fontFamily: fonts.titres,
                  fontWeight: fontWeights.bold,
                  fontSize: textScale.h2,
                  color: palette.blancCasse,
                }}
              >
                W
              </span>
            </div>
            <svg width={96} height={96} style={{ position: "absolute", inset: 0 }}>
              <circle
                cx={48}
                cy={48}
                r={60}
                fill="none"
                stroke={palette.bordeauxLueur}
                strokeWidth={2}
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - draw)}
                transform="rotate(-90 48 48)"
                opacity={0.6}
              />
            </svg>
          </div>
          <AnimatedText
            kind="fadeUp"
            delay={6}
            style={{
              fontFamily: fonts.titres,
              fontWeight: fontWeights.bold,
              fontSize: 120,
              letterSpacing: typography.letterSpacing.tight,
            }}
          >
            {brand}
          </AnimatedText>
        </div>

        <div
          style={{
            width: 120 * lineW,
            height: 3,
            background: gradients.accentBordeaux,
            borderRadius: radius.pill,
          }}
        />

        <AnimatedText
          kind="fadeUp"
          delay={16}
          style={{
            fontFamily: fonts.corps,
            fontSize: textScale.h3,
            color: palette.grisBrume,
            lineHeight: typography.lineHeight.snug,
            maxWidth: 1100,
          }}
        >
          {taglineLead} <span style={{ color: palette.bordeauxLueur, fontWeight: fontWeights.semibold }}>{taglineBold}</span> {taglineTail}
        </AnimatedText>

        <AnimatedText
          kind="popIn"
          delay={24}
          style={{
            marginTop: spacing.md,
            display: "inline-flex",
            alignItems: "center",
            gap: spacing.md,
            fontFamily: fonts.labels,
            fontSize: textScale.label,
            letterSpacing: typography.letterSpacing.kicker,
            textTransform: "uppercase",
            background: gradients.accentBordeaux,
            color: palette.blancCasse,
            padding: `${spacing.md}px ${spacing.xl}px`,
            borderRadius: radius.pill,
            boxShadow: "0 20px 60px rgba(110,18,48,.5)",
          }}
        >
          {cta} <span>→</span>
        </AnimatedText>

        <AnimatedText kind="fade" delay={32} style={{ display: "flex", gap: spacing.xl, marginTop: spacing.lg }}>
          {handles.map((h, i) => (
            <span
              key={i}
              style={{
                fontFamily: fonts.labels,
                fontSize: textScale.kicker,
                letterSpacing: typography.letterSpacing.kicker,
                textTransform: "uppercase",
                color: i === 0 ? palette.grisBrume : palette.grisEstompe,
              }}
            >
              {h}
            </span>
          ))}
        </AnimatedText>
      </div>
    </Frame>
  );
};
