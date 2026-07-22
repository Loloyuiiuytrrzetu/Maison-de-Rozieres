/** Bloc de texte qui apparaît avec une entrée nommée de la charte. */
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { entrance, type EntranceKind } from "../motion";

export const AnimatedText: React.FC<{
  children: React.ReactNode;
  kind?: EntranceKind;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, kind = "fadeUp", delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = entrance(frame, fps, kind, delay);
  return (
    <div style={{ ...style, opacity: e.opacity, transform: e.transform }}>{children}</div>
  );
};
