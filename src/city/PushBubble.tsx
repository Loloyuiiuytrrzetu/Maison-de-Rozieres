/** Bulle de notification push (style iOS) pour un commerce. */
import React from "react";
import { design } from "../design";
import type { Brand } from "./brands";
import { Logo } from "./Logos";

const { palette, fonts, fontWeights } = design;

export const PushBubble: React.FC<{
  brand: Brand;
  width?: number;
  now?: string;
  style?: React.CSSProperties;
}> = ({ brand, width = 460, now = "maintenant", style }) => {
  return (
    <div
      style={{
        width,
        background: "rgba(20,28,38,0.92)",
        backdropFilter: "blur(8px)",
        border: `1px solid ${palette.lisere}`,
        borderRadius: 22,
        padding: 18,
        display: "flex",
        gap: 14,
        boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
        ...style,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: brand.sign,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        <Logo brand={brand} size={40} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontFamily: fonts.titres, fontWeight: fontWeights.bold, fontSize: 22, color: palette.blancCasse }}>
            {brand.pushTitle}
          </span>
          <span style={{ fontFamily: fonts.labels, fontSize: 14, color: palette.grisEstompe }}>{now}</span>
        </div>
        <div style={{ fontFamily: fonts.corps, fontSize: 20, color: palette.grisBrume, marginTop: 4, lineHeight: 1.35 }}>
          {brand.push}
        </div>
      </div>
    </div>
  );
};
