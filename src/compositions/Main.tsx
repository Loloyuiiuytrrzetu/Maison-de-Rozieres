import { z } from "zod";
import { AbsoluteFill } from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { TitleCard } from "./TitleCard";
import { LogoReveal } from "./LogoReveal";

export const mainSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
});

/**
 * Composition principale : enchaîne la carte de titre puis la
 * révélation du logo avec un fondu entre les deux séquences.
 */
export const Main: React.FC<z.infer<typeof mainSchema>> = ({
  title,
  subtitle,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0e0e10" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={150}>
          <TitleCard title={title} subtitle={subtitle} accentColor="#c9a24b" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 30 })}
        />

        <TransitionSeries.Sequence durationInFrames={120}>
          <LogoReveal />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
