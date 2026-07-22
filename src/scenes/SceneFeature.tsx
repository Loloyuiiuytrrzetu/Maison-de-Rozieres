/** 02 & 04 · Pilier (campagnes/push, statistiques) — titre + grande carte feature. */
import React from "react";
import { z } from "zod";
import { design } from "../design";
import { Frame } from "../components/Frame";
import { AccentKicker } from "../components/AccentKicker";
import { AnimatedText } from "../components/AnimatedText";
import { FeatureCard } from "../components/FeatureCard";
import type { IconKey } from "../components/icons";

const { palette, fonts, fontWeights, textScale, spacing, typography } = design;

export const sceneFeatureSchema = z.object({
  section: z.string(),
  index: z.string(),
  kicker: z.string(),
  title: z.string(),
  lead: z.string(),
  cardIdx: z.string(),
  icon: z.enum(["push", "stats", "heart", "shop", "user", "card"]),
  cardTitle: z.string(),
  cardDesc: z.string(),
  cardFooter: z.string(),
  accent: z.enum(["info", "succes", "bordeaux"]),
});

export const SceneFeature: React.FC<z.infer<typeof sceneFeatureSchema>> = ({
  section,
  index,
  kicker,
  title,
  lead,
  cardIdx,
  icon,
  cardTitle,
  cardDesc,
  cardFooter,
  accent,
}) => {
  return (
    <Frame section={section} index={index} footerLeft={kicker} footerRight="Pilier">
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
              lineHeight: typography.lineHeight.relaxed,
              marginTop: spacing.lg,
              maxWidth: 640,
            }}
          >
            {lead}
          </AnimatedText>
        </div>

        <div style={{ height: 560, display: "flex" }}>
          <FeatureCard
            idx={cardIdx}
            icon={icon as IconKey}
            title={cardTitle}
            desc={cardDesc}
            footer={cardFooter}
            accent={accent}
            delay={14}
            featured
          />
        </div>
      </div>
    </Frame>
  );
};
