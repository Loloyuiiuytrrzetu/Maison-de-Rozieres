/** Logos SVG personnalisés des 3 commerces. */
import React from "react";
import type { Brand } from "./brands";

export const Logo: React.FC<{ brand: Brand; size?: number }> = ({ brand, size = 64 }) => {
  const s = { width: size, height: size };
  if (brand.key === "burger") {
    // Burger : pain haut, salade, steak, pain bas + graines
    return (
      <svg viewBox="0 0 64 64" style={s}>
        <path d="M8 22c0-9 11-15 24-15s24 6 24 15z" fill={brand.accent} />
        <circle cx="24" cy="15" r="1.6" fill={brand.ink} />
        <circle cx="34" cy="13" r="1.6" fill={brand.ink} />
        <circle cx="43" cy="16" r="1.6" fill={brand.ink} />
        <rect x="8" y="23" width="48" height="6" rx="3" fill="#5FB86B" />
        <rect x="8" y="29" width="48" height="8" rx="3" fill="#7A4B2B" />
        <rect x="8" y="38" width="48" height="6" rx="3" fill="#F2C14E" />
        <path d="M8 45c0 7 11 11 24 11s24-4 24-11z" fill={brand.accent} />
      </svg>
    );
  }
  if (brand.key === "cafe") {
    // Tasse + vapeur + feuille tropicale
    return (
      <svg viewBox="0 0 64 64" style={s}>
        <path d="M40 6c6 4 8 12 2 18" stroke={brand.ink} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M32 4c6 4 8 12 2 18" stroke={brand.ink} strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M12 28h34v10a15 15 0 0 1-15 15h-4A15 15 0 0 1 12 38z" fill={brand.ink} />
        <path d="M46 30h6a6 6 0 0 1 0 12h-4" stroke={brand.ink} strokeWidth="3" fill="none" />
        <path d="M20 40c4-6 12-8 18-6-4 6-12 8-18 6z" fill={brand.accent} />
      </svg>
    );
  }
  // beauty : gemme onyx facettée
  return (
    <svg viewBox="0 0 64 64" style={s}>
      <path d="M20 12h24l10 12-22 28L10 24z" fill={brand.accent} />
      <path d="M20 12l12 12 12-12" fill="none" stroke={brand.ink} strokeWidth="2" />
      <path d="M10 24h44" stroke={brand.ink} strokeWidth="2" />
      <path d="M32 24v28" stroke={brand.ink} strokeWidth="2" />
      <path d="M20 12L32 52 44 12" fill="none" stroke={brand.ink} strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
};
