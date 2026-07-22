/**
 * Helpers de mouvement dérivés de la charte (src/design.ts).
 * Toutes les animations passent par ici → cohérence garantie.
 * Inclut les entrées (spring physics) ET le mouvement continu (caméra, flottement,
 * pulsation) qui empêche l'image d'être statique — l'effet « vivant ».
 */
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { SpringConfig } from "remotion";
import { design } from "./design";

export type SpringName = keyof typeof design.springs;
export type EntranceKind = keyof typeof design.entrances;

/** Valeur 0→1 d'un ressort nommé de la charte, avec délai optionnel (en frames). */
export const progress = (
  frame: number,
  fps: number,
  name: SpringName = "ferme",
  delay = 0,
): number =>
  spring({
    frame: frame - delay,
    fps,
    config: design.springs[name] as Partial<SpringConfig>,
  });

/** Style d'entrée nommé → {opacity, transform}. Combine scale + translate selon le token. */
export const entrance = (
  frame: number,
  fps: number,
  kind: EntranceKind = "fadeUp",
  delay = 0,
): { opacity: number; transform: string } => {
  const token = design.entrances[kind] as {
    spring: SpringName;
    fromY?: number;
    fromX?: number;
    fromScale?: number;
  };
  const s = progress(frame, fps, token.spring, delay);
  const parts: string[] = [];
  if (token.fromScale != null) parts.push(`scale(${interpolate(s, [0, 1], [token.fromScale, 1])})`);
  if (token.fromY != null) parts.push(`translateY(${interpolate(s, [0, 1], [token.fromY, 0])}px)`);
  if (token.fromX != null) parts.push(`translateX(${interpolate(s, [0, 1], [token.fromX, 0])}px)`);
  // L'opacité monte plus vite que le ressort pour rester visible pendant le dépassement.
  const opacity = interpolate(s, [0, 0.55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, transform: parts.length ? parts.join(" ") : "none" };
};

/** Décalage en frames pour le i-ème élément d'une cascade (stagger). */
export const staggerDelay = (i: number, step: number = design.durations.stagger): number =>
  i * step;

/* ------------------------------------------------------------------ */
/*  Mouvement continu — hooks (utilisent le contexte Remotion)         */
/* ------------------------------------------------------------------ */

/**
 * Caméra type « Ken Burns » : léger zoom avant + dérive lente sur toute la scène.
 * Empêche l'image d'être figée. À appliquer sur le conteneur de contenu.
 */
export const useCamera = (): { transform: string } => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = interpolate(frame, [0, Math.max(1, durationInFrames)], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(t, [0, 1], [1.03, 1.06]);
  const x = interpolate(t, [0, 1], [-6, 6]);
  const y = interpolate(t, [0, 1], [5, -5]);
  return { transform: `scale(${scale}) translate(${x}px, ${y}px)` };
};

/** Flottement vertical continu (idle) — sinusoïde en px. */
export const useFloat = (amp = 10, speedHz = 0.5, phase = 0): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return Math.sin((frame / fps) * speedHz * Math.PI * 2 + phase) * amp;
};

/** Pulsation 0→1 continue (pour halos, lueurs qui « respirent »). */
export const usePulse = (speedHz = 0.4, phase = 0): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (Math.sin((frame / fps) * speedHz * Math.PI * 2 + phase) + 1) / 2;
};

/**
 * Punch d'échelle qui « claque » puis se stabilise (overshoot → 1).
 * À multiplier dans un transform pour faire vibrer un élément à son arrivée.
 */
export const usePunchScale = (delay = 0, name: SpringName = "slam", peak = 1.22): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = progress(frame, fps, name, delay);
  return interpolate(p, [0, 0.5, 1], [peak, 1.04, 1]);
};
