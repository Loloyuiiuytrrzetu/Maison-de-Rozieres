/** Devanture d'un commerce (façade + enseigne + logo + store + vitrine + porte). */
import React from "react";
import type { Brand } from "./brands";
import { Logo } from "./Logos";

export const ShopFacade: React.FC<{
  brand: Brand;
  width?: number;
  height?: number;
  lightsOn?: number; // 0..1 intensité des lumières
}> = ({ brand, width = 420, height = 520, lightsOn = 1 }) => {
  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        background: `linear-gradient(180deg, ${brand.facade} 0%, ${brand.facadeDark} 100%)`,
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.18)",
      }}
    >
      {/* Enseigne */}
      <div
        style={{
          height: 96,
          background: brand.sign,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "0 22px",
          boxShadow: `0 0 ${28 * lightsOn}px ${brand.accent}`,
        }}
      >
        <Logo brand={brand} size={58} />
        <span
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 34,
            letterSpacing: "0.02em",
            color: brand.ink,
          }}
        >
          {brand.name}
        </span>
      </div>

      {/* Store rayé (banne) */}
      <div style={{ display: "flex", height: 34 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            style={{ flex: 1, background: i % 2 ? brand.awning : brand.ink, opacity: i % 2 ? 1 : 0.85 }}
          />
        ))}
      </div>

      {/* Vitrine */}
      <div style={{ position: "absolute", inset: "150px 26px 120px 26px", display: "flex", gap: 14 }}>
        <div
          style={{
            flex: 1,
            background: "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(10,15,22,0.55))",
            border: `3px solid ${brand.facadeDark}`,
            borderRadius: 4,
            boxShadow: `inset 0 0 40px ${brand.accent}44`,
          }}
        />
      </div>

      {/* Porte */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 118,
          background: "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(10,15,22,0.6))",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          border: `3px solid ${brand.facadeDark}`,
          borderBottom: "none",
        }}
      />
      {/* Trottoir */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 16, background: "rgba(0,0,0,0.28)" }} />
    </div>
  );
};
