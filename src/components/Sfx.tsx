/** Joue un bruitage (public/sfx/<name>.wav) à partir d'une frame locale. */
import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

export type SfxName = "whoosh" | "impact" | "pop" | "riser" | "tick" | "chime";

export const Sfx: React.FC<{ name: SfxName; at?: number; volume?: number }> = ({
  name,
  at = 0,
  volume = 1,
}) => (
  <Sequence from={at} name={`sfx-${name}`}>
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

/** Groupe de bruitages, pratique pour déclarer plusieurs sons d'un coup. */
export const SfxTrack: React.FC<{
  cues: { name: SfxName; at?: number; volume?: number }[];
}> = ({ cues }) => (
  <>
    {cues.map((c, i) => (
      <Sfx key={i} name={c.name} at={c.at} volume={c.volume} />
    ))}
  </>
);
