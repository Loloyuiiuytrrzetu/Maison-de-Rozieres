/** Personnage stylisé (vue de face) tenant un téléphone. Pose "bend" pour se pencher. */
import React from "react";

export const Person: React.FC<{
  outfit: string;
  skin?: string;
  hair?: string;
  phoneGlow?: string;
  bend?: number; // 0 = debout, 1 = penché vers l'avant
  height?: number;
  style?: React.CSSProperties;
}> = ({
  outfit,
  skin = "#E8B58C",
  hair = "#2B2A2E",
  phoneGlow = "#67B5F5",
  bend = 0,
  height = 260,
  style,
}) => {
  const rot = bend * 34;
  return (
    <div style={{ width: height * (120 / 280), height, ...style }}>
      <svg viewBox="0 0 120 280" width="100%" height="100%">
        {/* ombre au sol */}
        <ellipse cx="60" cy="272" rx="42" ry="8" fill="rgba(0,0,0,0.35)" />
        {/* jambes */}
        <rect x="44" y="180" width="14" height="88" rx="7" fill="#26303C" />
        <rect x="62" y="180" width="14" height="88" rx="7" fill="#26303C" />
        {/* groupe haut du corps (se penche) */}
        <g transform={`rotate(${rot} 60 178)`}>
          <rect x="40" y="96" width="40" height="92" rx="18" fill={outfit} />
          {/* bras + avant-bras tenant le téléphone devant */}
          <rect x="30" y="112" width="12" height="40" rx="6" fill={outfit} transform="rotate(18 36 132)" />
          <rect x="78" y="112" width="12" height="40" rx="6" fill={outfit} transform="rotate(-18 84 132)" />
          {/* mains */}
          <circle cx="48" cy="150" r="7" fill={skin} />
          <circle cx="72" cy="150" r="7" fill={skin} />
          {/* téléphone tenu */}
          <rect x="50" y="138" width="20" height="30" rx="4" fill="#0F1620" stroke="#2A3846" strokeWidth="1.5" />
          <rect x="53" y="142" width="14" height="22" rx="2" fill={phoneGlow} opacity="0.9" />
          {/* tête */}
          <circle cx="60" cy="74" r="22" fill={skin} />
          <path d="M38 70a22 22 0 0 1 44 0c0-16-10-24-22-24S38 54 38 70z" fill={hair} />
        </g>
      </svg>
    </div>
  );
};
