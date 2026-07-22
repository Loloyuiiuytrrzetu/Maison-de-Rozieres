import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Pile de polices serif élégantes, sans dépendance réseau au rendu.
const fontFamily = "'Playfair Display', Georgia, 'Times New Roman', serif";

/**
 * Révélation d'un monogramme « MR » : le cercle se dessine,
 * puis les initiales apparaissent en fondu et léger zoom.
 */
export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const draw = spring({ frame, fps, config: { damping: 200 } });
  const circumference = 2 * Math.PI * 140;
  const dashOffset = interpolate(draw, [0, 1], [circumference, 0]);

  const letterSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200 },
  });
  const letterOpacity = letterSpring;
  const letterScale = interpolate(letterSpring, [0, 1], [0.7, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0e0e10",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", width: 320, height: 320 }}>
        <svg width={320} height={320} style={{ position: "absolute", inset: 0 }}>
          <circle
            cx={160}
            cy={160}
            r={140}
            fill="none"
            stroke="#c9a24b"
            strokeWidth={4}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 160 160)"
          />
        </svg>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: letterOpacity,
            transform: `scale(${letterScale})`,
          }}
        >
          <span
            style={{
              fontFamily,
              fontSize: 130,
              fontWeight: 700,
              color: "#f5f5f0",
              letterSpacing: -8,
            }}
          >
            MR
          </span>
        </AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
};
