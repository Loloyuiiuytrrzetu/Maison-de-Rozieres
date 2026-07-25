/** Faux QR code (visuel) déterministe, avec les 3 carrés de repère. */
import React from "react";

const N = 25;

// Motif pseudo-aléatoire stable (pas un vrai QR, purement visuel).
const filled = (x: number, y: number): boolean => {
  const inFinder = (fx: number, fy: number) =>
    x >= fx && x < fx + 7 && y >= fy && y < fy + 7;
  if (inFinder(0, 0) || inFinder(N - 7, 0) || inFinder(0, N - 7)) {
    // dessiné séparément
    return false;
  }
  const h = Math.sin((x + 1) * 12.9898 + (y + 1) * 78.233) * 43758.5453;
  return (h - Math.floor(h)) > 0.52;
};

const Finder: React.FC<{ x: number; y: number; c: string }> = ({ x, y, c }) => (
  <>
    <rect x={x} y={y} width={7} height={7} fill={c} />
    <rect x={x + 1} y={y + 1} width={5} height={5} fill="#FFFFFF" />
    <rect x={x + 2} y={y + 2} width={3} height={3} fill={c} />
  </>
);

export const QRCode: React.FC<{ size?: number; color?: string; style?: React.CSSProperties }> = ({
  size = 220,
  color = "#0F1620",
  style,
}) => {
  const cells: React.ReactNode[] = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (filled(x, y)) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />);
    }
  }
  return (
    <div style={{ width: size, height: size, background: "#FFFFFF", borderRadius: 10, padding: size * 0.06, ...style }}>
      <svg viewBox={`0 0 ${N} ${N}`} width="100%" height="100%" shapeRendering="crispEdges">
        {cells}
        <Finder x={0} y={0} c={color} />
        <Finder x={N - 7} y={0} c={color} />
        <Finder x={0} y={N - 7} c={color} />
      </svg>
    </div>
  );
};
