/**
 * Frame — l'habillage broadcast commun à toutes les scènes.
 * Fond froid ANIMÉ (grille qui dérive, halo qui respire, balayage lumineux),
 * chrome (wordmark, section, pagination), filets d'angle, zone utile (safe area).
 * Le contenu reçoit une caméra continue (léger zoom + dérive) → jamais statique.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { design } from "../design";
import { useCamera, usePulse } from "../motion";

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
  const frame = useCurrentFrame();
  const camera = useCamera();
  const pulse = usePulse(0.22);

  // Dérive lente de la grille et du halo.
  const gridShift = (frame * 0.25) % 96;
  const lueurScale = interpolate(pulse, [0, 1], [0.92, 1.08]);
  const lueurOpacity = interpolate(pulse, [0, 1], [0.22, 0.45]);
  // Balayage lumineux diagonal qui traverse lentement la scène.
  const sweepX = interpolate((frame % 260) / 260, [0, 1], [-600, 2400]);

  return (
    <AbsoluteFill
      style={{
        background: gradients.fondScene,
        color: palette.blancCasse,
        fontFamily: fonts.corps,
        overflow: "hidden",
      }}
    >
      {/* Texture froide qui dérive */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${palette.lisere} 1px, transparent 1px), linear-gradient(90deg, ${palette.lisere} 1px, transparent 1px)`,
          backgroundSize: "96px 96px",
          backgroundPosition: `${gridShift}px ${gridShift}px`,
          opacity: 0.05,
        }}
      />
      {/* Halo bordeaux qui respire */}
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          right: -300,
          top: -400,
          background: gradients.lueurBordeaux,
          opacity: lueurOpacity,
          transform: `scale(${lueurScale})`,
        }}
      />
      {/* Balayage lumineux diagonal */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: sweepX,
          width: 500,
          background:
            "linear-gradient(105deg, transparent, rgba(214,72,107,0.10), transparent)",
          transform: "skewX(-12deg)",
          pointerEvents: "none",
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
              boxShadow: `0 0 ${interpolate(pulse, [0, 1], [12, 26])}px ${palette.bordeauxLueur}`,
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

      {/* Zone utile — avec caméra continue */}
      <AbsoluteFill style={{ padding: spacing.safe }}>
        <div style={{ width: "100%", height: "100%", transform: camera.transform }}>
          {children}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
