/**
 * Helpers de mouvement dérivés de la charte (src/design.ts).
 * Toutes les animations passent par ici → cohérence garantie.
 */
import { interpolate, spring } from "remotion";
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

/** Style d'entrée nommé (fadeUp / popIn / wipeX / fade) → {opacity, transform}. */
export const entrance = (
  frame: number,
  fps: number,
  kind: EntranceKind = "fadeUp",
  delay = 0,
): { opacity: number; transform: string } => {
  const token = design.entrances[kind] as {
    spring: SpringName;
    fromY?: number;
    fromScale?: number;
  };
  const s = progress(frame, fps, token.spring, delay);
  switch (kind) {
    case "fadeUp":
      return {
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [token.fromY ?? 40, 0])}px)`,
      };
    case "popIn":
      return {
        opacity: s,
        transform: `scale(${interpolate(s, [0, 1], [token.fromScale ?? 0.82, 1])})`,
      };
    default:
      return { opacity: s, transform: "none" };
  }
};

/** Décalage en frames pour le i-ème élément d'une cascade (stagger). */
export const staggerDelay = (i: number, step: number = design.durations.stagger): number =>
  i * step;
