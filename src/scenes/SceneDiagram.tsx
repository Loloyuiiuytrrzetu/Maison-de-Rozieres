/** 07 · Le schéma — boucle Commerçant → Walletiz → Client. */
import React from "react";
import { z } from "zod";
import { design } from "../design";
import { Frame } from "../components/Frame";
import { AccentKicker } from "../components/AccentKicker";
import { AnimatedText } from "../components/AnimatedText";
import { DiagramNode } from "../components/DiagramNode";

const { palette, fonts, fontWeights, textScale, spacing, radius, typography } = design;

export const sceneDiagramSchema = z.object({
  kicker: z.string(),
  title: z.string(),
});

const Pill: React.FC<{
  label: string;
  color: string;
  style: React.CSSProperties;
  delay: number;
}> = ({ label, color, style, delay }) => (
  <AnimatedText
    kind="popIn"
    delay={delay}
    style={{
      position: "absolute",
      zIndex: 3,
      fontFamily: fonts.labels,
      fontSize: textScale.caption,
      letterSpacing: typography.letterSpacing.kicker,
      textTransform: "uppercase",
      color,
      background: palette.nuitFroide,
      border: `1px solid ${palette.lisere}`,
      borderRadius: radius.pill,
      padding: `${spacing.xs}px ${spacing.md}px`,
      ...style,
    }}
  >
    {label}
  </AnimatedText>
);

export const SceneDiagram: React.FC<z.infer<typeof sceneDiagramSchema>> = ({ kicker, title }) => {
  return (
    <Frame section="Schéma" index="07" footerLeft="Boucle de fidélisation" footerRight="Push · Data · Retour">
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
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

        <div
          style={{
            position: "relative",
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr 1fr",
            alignItems: "center",
            gap: spacing.xxl,
          }}
        >
          <svg
            style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}
            viewBox="0 0 1680 600"
            preserveAspectRatio="none"
          >
            <defs>
              <marker id="arrow" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto">
                <path d="M2,2 L10,6 L2,10" fill="none" stroke={palette.lisere} strokeWidth="2" />
              </marker>
            </defs>
            <path d="M430,300 H640" stroke={palette.lisere} strokeWidth="3" fill="none" markerEnd="url(#arrow)" />
            <path d="M1040,300 H1250" stroke={palette.lisere} strokeWidth="3" fill="none" markerEnd="url(#arrow)" />
            <path
              d="M1420,430 C1420,560 260,560 260,430"
              stroke={palette.bordeauxProfond}
              strokeWidth="3"
              strokeDasharray="10 8"
              fill="none"
              markerEnd="url(#arrow)"
            />
          </svg>

          <DiagramNode
            icon="shop"
            label="Acteur"
            name="Le commerçant"
            desc="Crée une campagne en deux clics."
            delay={14}
          />
          <DiagramNode
            icon="card"
            label="Plateforme"
            name="Walletiz"
            desc="Envoie le push, mesure, apprend, recommence."
            core
            delay={20}
          />
          <DiagramNode
            icon="user"
            label="Bénéficiaire"
            name="Le client"
            desc="Reçoit l'offre, revient en boutique."
            delay={26}
          />

          <Pill label="↑ Notification push" color={palette.info} delay={32} style={{ top: "18%", left: "40%" }} />
          <Pill label="↓ Statistiques" color={palette.succes} delay={36} style={{ bottom: "16%", left: "40%" }} />
          <Pill
            label="↺ Il revient"
            color={palette.bordeauxLueur}
            delay={40}
            style={{ top: "47%", left: "63%" }}
          />
        </div>
      </div>
    </Frame>
  );
};
