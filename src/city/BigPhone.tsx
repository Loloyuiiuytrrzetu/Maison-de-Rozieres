/** Grand iPhone (mockup) avec l'app Walletiz + un doigt qui tape "Envoyer". */
import React from "react";
import { interpolate } from "remotion";
import { design } from "../design";

const { palette, gradients, fonts, fontWeights } = design;

export const BigPhone: React.FC<{
  width?: number;
  tap?: number; // 0..1 : le doigt descend et presse
  sent?: number; // 0..1 : état "Envoyé"
  style?: React.CSSProperties;
}> = ({ width = 360, tap = 0, sent = 0, style }) => {
  const height = width * 2.05;
  const press = interpolate(tap, [0.4, 0.55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fingerY = interpolate(tap, [0, 0.5], [height * 0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ripple = interpolate(tap, [0.5, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width, height, position: "relative", ...style }}>
      {/* Coque */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: width * 0.14,
          background: "#05080C",
          boxShadow: `0 40px 120px rgba(0,0,0,0.6), 0 0 60px ${palette.bordeaux}33`,
          padding: width * 0.035,
        }}
      >
        {/* Écran */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: width * 0.11,
            overflow: "hidden",
            background: gradients.fondScene,
          }}
        >
          {/* Encoche */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              width: width * 0.32,
              height: 22,
              borderRadius: 12,
              background: "#05080C",
              zIndex: 5,
            }}
          />
          {/* Header appli */}
          <div style={{ padding: `${width * 0.11}px ${width * 0.07}px ${width * 0.05}px`, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 16, height: 16, borderRadius: 999, background: palette.bordeaux, boxShadow: `0 0 12px ${palette.bordeauxLueur}` }} />
            <span style={{ fontFamily: fonts.titres, fontWeight: fontWeights.bold, color: palette.blancCasse, fontSize: width * 0.07, letterSpacing: "0.12em" }}>
              WALLETIZ
            </span>
          </div>

          {/* Carte campagne */}
          <div style={{ margin: `0 ${width * 0.07}px`, padding: width * 0.06, borderRadius: 18, background: palette.ardoise, border: `1px solid ${palette.lisere}` }}>
            <div style={{ fontFamily: fonts.labels, fontSize: width * 0.045, letterSpacing: "0.14em", textTransform: "uppercase", color: palette.bordeauxLueur }}>
              Nouvelle campagne
            </div>
            <div style={{ fontFamily: fonts.titres, fontWeight: fontWeights.bold, fontSize: width * 0.075, color: palette.blancCasse, marginTop: 8, lineHeight: 1.15 }}>
              Notification push
            </div>
            <div style={{ color: palette.grisBrume, fontSize: width * 0.05, marginTop: 8, lineHeight: 1.4 }}>
              À tous vos clients à proximité
            </div>
          </div>

          {/* Bouton Envoyer */}
          <div style={{ position: "absolute", left: width * 0.07, right: width * 0.07, bottom: width * 0.16 }}>
            <div
              style={{
                position: "relative",
                height: width * 0.2,
                borderRadius: 16,
                background: gradients.accentBordeaux,
                display: "grid",
                placeItems: "center",
                boxShadow: `0 12px 40px ${palette.bordeaux}66`,
                transform: `scale(${1 - press * 0.05})`,
                overflow: "hidden",
              }}
            >
              {/* onde au tap */}
              <div
                style={{
                  position: "absolute",
                  width: width * 0.9 * ripple,
                  height: width * 0.9 * ripple,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.25)",
                  opacity: 1 - ripple,
                }}
              />
              <span style={{ fontFamily: fonts.labels, fontWeight: fontWeights.semibold, letterSpacing: "0.14em", textTransform: "uppercase", color: palette.blancCasse, fontSize: width * 0.055 }}>
                {sent > 0.5 ? "Envoyé ✓" : "Envoyer"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Doigt qui tape */}
      <div
        style={{
          position: "absolute",
          left: "54%",
          bottom: `calc(${width * 0.16}px - ${fingerY}px)`,
          width: width * 0.34,
          height: width * 0.5,
          transform: `translateY(${fingerY}px)`,
          opacity: interpolate(tap, [0, 0.08, 0.95, 1], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.5))",
        }}
      >
        <svg viewBox="0 0 120 180" width="100%" height="100%">
          <path d="M46 6c10 0 16 8 16 20v56l18-8c10-4 22 0 24 12l6 34c3 18-10 34-28 36l-28 3c-16 2-30-8-34-24L20 116c-3-12 4-22 14-24 8-2 12 2 12 2V26C46 14 40 6 46 6z" fill="#E8B58C" stroke="#C98A63" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};
