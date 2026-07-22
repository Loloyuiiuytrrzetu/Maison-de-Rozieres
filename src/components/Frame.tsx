/**
 * Frame — l'habillage broadcast commun à toutes les scènes.
 * Fond froid + texture + lueur bordeaux, chrome (wordmark, section, pagination),
 * filets d'angle, zone utile (safe area). Reproduit le lookbook, piloté par les tokens.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { design } from "../design";

const { palette, gradients, fonts, fontWeights, textScale, spacing, radius, typography } =
  design;

const kickerStyle: React.CSSProperties = {
  fontFamily: fonts.labels,
  fontSize: textScale.kicker,
  letterSpacing: typography.letterSpacing.kicker,
  textTransform: "uppercase",
  color: palette.grisEstompe,
};

const Tick: React.FC<{ pos: "tl" | "tr" | "bl" | "br" }> = ({ pos }) => {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 26,
    height: 26,
    borderStyle: "solid",
    borderColor: palette.lisere,
    borderWidth: 0,
  };
  const map: Record<string, React.CSSProperties> = {
    tl: { top: spacing.lg, left: spacing.lg, borderTopWidth: 2, borderLeftWidth: 2 },
    tr: { top: spacing.lg, right: spacing.lg, borderTopWidth: 2, borderRightWidth: 2 },
    bl: { bottom: spacing.lg, left: spacing.lg, borderBottomWidth: 2, borderLeftWidth: 2 },
    br: { bottom: spacing.lg, right: spacing.lg, borderBottomWidth: 2, borderRightWidth: 2 },
  };
  return <div style={{ ...base, ...map[pos] }} />;
};

export const Frame: React.FC<{
  section: string;
  index: string;
  total?: string;
  footerLeft?: string;
  footerRight?: string;
  children: React.ReactNode;
}> = ({ section, index, total = "09", footerLeft, footerRight, children }) => {
  return (
    <AbsoluteFill
      style={{
        background: gradients.fondScene,
        color: palette.blancCasse,
        fontFamily: fonts.corps,
      }}
    >
      {/* Texture froide très discrète */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${palette.lisere} 1px, transparent 1px), linear-gradient(90deg, ${palette.lisere} 1px, transparent 1px)`,
          backgroundSize: "96px 96px",
          opacity: 0.05,
        }}
      />
      {/* Lueur bordeaux d'ambiance */}
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          right: -300,
          top: -400,
          background: gradients.lueurBordeaux,
          opacity: 0.35,
        }}
      />

      {/* Chrome haut */}
      <div
        style={{
          position: "absolute",
          top: spacing.lg,
          left: spacing.xl,
          right: spacing.xl,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: radius.pill,
              background: palette.bordeaux,
              boxShadow: `0 0 18px ${palette.bordeauxLueur}`,
            }}
          />
          <span
            style={{
              fontFamily: fonts.titres,
              fontWeight: fontWeights.bold,
              fontSize: textScale.label,
              letterSpacing: typography.letterSpacing.kicker,
            }}
          >
            WALLETIZ
          </span>
          <span style={{ color: palette.lisere, fontFamily: fonts.labels }}>/</span>
          <span style={kickerStyle}>{section}</span>
        </div>
        <div
          style={{
            fontFamily: fonts.labels,
            fontSize: textScale.label,
            letterSpacing: typography.letterSpacing.kicker,
          }}
        >
          {index} <span style={{ color: palette.grisEstompe }}>/ {total}</span>
        </div>
      </div>

      <Tick pos="tl" />
      <Tick pos="tr" />
      <Tick pos="bl" />
      <Tick pos="br" />

      {(footerLeft || footerRight) && (
        <div
          style={{
            position: "absolute",
            bottom: spacing.lg,
            left: spacing.xl,
            right: spacing.xl,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={kickerStyle}>{footerLeft}</span>
          <span style={kickerStyle}>{footerRight}</span>
        </div>
      )}

      {/* Zone utile */}
      <AbsoluteFill style={{ padding: spacing.safe }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
