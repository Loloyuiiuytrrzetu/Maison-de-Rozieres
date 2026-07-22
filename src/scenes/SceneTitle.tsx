/** 01 · Ce que Walletiz propose — carte de titre (adaptée du TitleCard). */
import React from "react";
import { z } from "zod";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { design } from "../design";
import { progress } from "../motion";
import { Frame } from "../components/Frame";
import { SfxTrack } from "../components/Sfx";
import { AccentKicker } from "../components/AccentKicker";
import { AnimatedText } from "../components/AnimatedText";

const { palette, gradients, fonts, fontWeights, textScale, spacing, radius, typography } =
  design;

export const sceneTitleSchema = z.object({
  kicker: z.string(),
  title: z.string(),
  subtitle: z.string(),
});

export const SceneTitle: React.FC<z.infer<typeof sceneTitleSchema>> = ({
  kicker,
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const line = progress(frame, fps, "ferme", 16);

  return (
    <Frame section="Promesse" index="01" footerLeft="La promesse" footerRight="Sans appli">
      <SfxTrack cues={[{ name: "whoosh", volume: 0.5 }, { name: "impact", at: 6, volume: 0.6 }, { name: "pop", at: 22, volume: 0.4 }]} />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <AnimatedText kind="fade" delay={2} style={{ marginBottom: spacing.lg }}>
          <AccentKicker label={kicker} />
        </AnimatedText>

        <AnimatedText
          kind="slamIn"
          delay={6}
          style={{
            fontFamily: fonts.titres,
            fontWeight: fontWeights.bold,
            fontSize: textScale.display,
            lineHeight: 0.98,
            letterSpacing: typography.letterSpacing.tight,
          }}
        >
          {title}
        </AnimatedText>

        <div
          style={{
            width: 340 * line,
            height: 8,
            background: gradients.accentBordeaux,
            borderRadius: radius.pill,
            boxShadow: "0 0 40px rgba(214,72,107,.5)",
            margin: `${spacing.lg}px 0`,
          }}
        />

        <AnimatedText
          kind="fadeUp"
          delay={22}
          style={{
            fontFamily: fonts.corps,
            fontStyle: "italic",
            fontSize: textScale.h3,
            color: palette.grisBrume,
          }}
        >
          {subtitle}
        </AnimatedText>
      </div>
    </Frame>
  );
};
