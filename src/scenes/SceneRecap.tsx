/** 08 · Récapitulatif — 3 cartes leviers en cascade. */
import React from "react";
import { z } from "zod";
import { design } from "../design";
import { staggerDelay } from "../motion";
import { Frame } from "../components/Frame";
import { AccentKicker } from "../components/AccentKicker";
import { AnimatedText } from "../components/AnimatedText";
import { FeatureCard } from "../components/FeatureCard";
import type { IconKey } from "../components/icons";

const { fonts, fontWeights, textScale, spacing, typography } = design;

export const sceneRecapSchema = z.object({
  kicker: z.string(),
  title: z.string(),
  cards: z.array(
    z.object({
      idx: z.string(),
      icon: z.enum(["push", "stats", "heart", "shop", "user", "card"]),
      title: z.string(),
      desc: z.string(),
      footer: z.string(),
      accent: z.enum(["info", "succes", "bordeaux"]),
    }),
  ),
});

export const SceneRecap: React.FC<z.infer<typeof sceneRecapSchema>> = ({ kicker, title, cards }) => {
  return (
    <Frame section="Récapitulatif" index="08" footerLeft="Ce que Walletiz apporte" footerRight="En bref">
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: spacing.xl }}>
        <div>
          <AnimatedText kind="fade" delay={2} style={{ marginBottom: spacing.sm }}>
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
        </div>

        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: spacing.lg }}>
          {cards.map((c, i) => (
            <FeatureCard
              key={i}
              idx={c.idx}
              icon={c.icon as IconKey}
              title={c.title}
              desc={c.desc}
              footer={c.footer}
              accent={c.accent}
              delay={14 + staggerDelay(i)}
            />
          ))}
        </div>
      </div>
    </Frame>
  );
};
