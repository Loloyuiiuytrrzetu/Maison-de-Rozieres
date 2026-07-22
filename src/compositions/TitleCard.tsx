import { z } from "zod";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Pile de polices serif élégantes, sans dépendance réseau au rendu.
// Pour une police premium (Playfair Display), voir .claude/skills/remotion/SKILL.md
// et décommentez l'import @remotion/google-fonts ci-dessous.
const fontFamily = "'Playfair Display', Georgia, 'Times New Roman', serif";

// Schéma Zod : rend les props éditables directement dans le Studio Remotion.
export const titleCardSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  accentColor: z.string(),
});

export const TitleCard: React.FC<z.infer<typeof titleCardSchema>> = ({
  title,
  subtitle,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Le titre monte et apparaît avec un ressort (spring) fluide.
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = titleSpring;

  // Le sous-titre suit avec un léger décalage.
  const subtitleSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 200 },
  });
  const subtitleOpacity = subtitleSpring;

  // Ligne d'accent qui se dessine sous le titre.
  const lineWidth = interpolate(
    spring({ frame: frame - 8, fps, config: { damping: 200 } }),
    [0, 1],
    [0, 320],
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0e0e10",
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      <h1
        style={{
          color: "#f5f5f0",
          fontSize: 96,
          fontWeight: 700,
          margin: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        {title}
      </h1>

      <div
        style={{
          width: lineWidth,
          height: 3,
          backgroundColor: accentColor,
          marginTop: 28,
          marginBottom: 28,
        }}
      />

      <h2
        style={{
          color: "#b8b8b0",
          fontSize: 40,
          fontWeight: 400,
          fontStyle: "italic",
          margin: 0,
          textAlign: "center",
          opacity: subtitleOpacity,
        }}
      >
        {subtitle}
      </h2>
    </AbsoluteFill>
  );
};
