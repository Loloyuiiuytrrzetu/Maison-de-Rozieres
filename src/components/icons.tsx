/** Petites icônes SVG (trait) référencées par clé sérialisable dans les scènes. */
import React from "react";

export type IconKey = "push" | "stats" | "heart" | "shop" | "user" | "card";

export const Icon: React.FC<{ name: IconKey; color: string; size?: number }> = ({
  name,
  color,
  size = 34,
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "push":
      return (
        <svg {...common}>
          <path d="M4 8a8 8 0 0116 0v5l2 3H2l2-3V8z" />
          <path d="M9 20a3 3 0 006 0" />
        </svg>
      );
    case "stats":
      return (
        <svg {...common}>
          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 21s-8-4.5-8-11a5 5 0 019-3 5 5 0 019 3c0 6.5-8 11-8 11z" />
        </svg>
      );
    case "shop":
      return (
        <svg {...common}>
          <path d="M3 21h18M6 21V8l6-4 6 4v13M9 21v-6h6v6" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      );
    case "card":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18M7 15h4" />
        </svg>
      );
  }
};
