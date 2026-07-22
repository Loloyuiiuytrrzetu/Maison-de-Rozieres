/** 00 · Ouverture — surlignage (typo cinétique, mot-clé surligné bordeaux). */
import React from "react";
import { z } from "zod";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { design } from "../design";
import { progress } from "../motion";
import { Frame } from "../components/Frame";
import { SfxTrack } from "../components/Sfx";
import { AccentKicker } from "../components/AccentKicker";
import { AnimatedText } from "../components/AnimatedText";

const { palette, gradients, fonts, fontWeights, radius, spacing, typography } = design;

export const sceneHighlightSchema = z.object({
  kicker: z.string(),
  lead: z.string(),
  highlight: z.string(),
  tail: z.string(),
});

export const SceneHighlight: React.FC<z.infer<typeof sceneHighlightSchema>> = ({
  kicker,
  lead,
  highlight,
  tail,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const markGrow = progress(frame, fps, "ferme", 24);

  return (
    <Frame section="Ouverture" index="00" footerLeft="Le problème" footerRight="Kinetic type">
      <SfxTrack cues={[{ name: "whoosh", volume: 0.5 }, { name: "pop", at: 18, volume: 0.5 }]} />
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <AnimatedText kind="fade" delay={2} style={{ marginBottom: spacing.xl }}>
          <AccentKicker label={kicker} />
        </AnimatedText>

        <div
          style={{
            fontFamily: fonts.titres,
            fontWeight: fontWeights.bold,
            fontSize: 96,
            lineHeight: 1.14,
            letterSpacing: typography.letterSpacing.tight,
            maxWidth: 1500,
          }}
        >
          <AnimatedText kind="fadeUp" delay={8} style={{ color: palette.grisBrume }}>
            {lead}
          </AnimatedText>
          <AnimatedText kind="fadeUp" delay={18}>
            <span
              style={{
                position: "relative",
                display: "inline-block",
                color: palette.blancCasse,
                padding: `0 ${spacing.sm}px`,
                marginTop: spacing.sm,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 8,
                  height: "60%",
                  width: "100%",
                  background: gradients.accentBordeaux,
                  borderRadius: radius.sm,
                  boxShadow: "0 0 40px rgba(168,29,69,.5)",
                  transform: `scaleX(${markGrow})`,
                  transformOrigin: "left",
                  zIndex: -1,
                }}
              />
              {highlight}
            </span>{" "}
            <span style={{ color: palette.blancCasse }}>{tail}</span>
          </AnimatedText>
        </div>
      </div>
    </Frame>
  );
};
