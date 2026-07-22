/**
 * Composition maître : enchaîne les 9 scènes du script avec des fondus.
 * Durée totale calculée depuis content.ts (voir walletizDurationInFrames).
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { design } from "./design";
import { sceneContent, sceneSeconds, sec, TRANSITION_FRAMES } from "./content";

import { SceneHighlight } from "./scenes/SceneHighlight";
import { SceneTitle } from "./scenes/SceneTitle";
import { SceneFeature } from "./scenes/SceneFeature";
import { SceneStat } from "./scenes/SceneStat";
import { SceneGauge } from "./scenes/SceneGauge";
import { SceneCompare } from "./scenes/SceneCompare";
import { SceneDiagram } from "./scenes/SceneDiagram";
import { SceneRecap } from "./scenes/SceneRecap";
import { SceneOutro } from "./scenes/SceneOutro";

// Ordre des scènes (id → durée + rendu).
const scenes = [
  { key: "highlight", dur: sceneSeconds.highlight, node: <SceneHighlight {...sceneContent.highlight} /> },
  { key: "title", dur: sceneSeconds.title, node: <SceneTitle {...sceneContent.title} /> },
  { key: "feature02", dur: sceneSeconds.feature02, node: <SceneFeature {...sceneContent.feature02} /> },
  { key: "stat", dur: sceneSeconds.stat, node: <SceneStat {...sceneContent.stat} /> },
  { key: "feature04", dur: sceneSeconds.feature04, node: <SceneFeature {...sceneContent.feature04} /> },
  { key: "gauge", dur: sceneSeconds.gauge, node: <SceneGauge {...sceneContent.gauge} /> },
  { key: "compare", dur: sceneSeconds.compare, node: <SceneCompare {...sceneContent.compare} /> },
  { key: "diagram", dur: sceneSeconds.diagram, node: <SceneDiagram {...sceneContent.diagram} /> },
  { key: "recap", dur: sceneSeconds.recap, node: <SceneRecap {...sceneContent.recap} /> },
  { key: "outro", dur: sceneSeconds.outro, node: <SceneOutro {...sceneContent.outro} /> },
];

/** Durée totale de la vidéo maître (frames), fondus déduits. */
export const walletizDurationInFrames =
  scenes.reduce((acc, s) => acc + sec(s.dur), 0) - (scenes.length - 1) * TRANSITION_FRAMES;

export const Walletiz: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: design.palette.nuitFroide }}>
      <TransitionSeries>
        {scenes.map((s, i) => (
          <React.Fragment key={s.key}>
            <TransitionSeries.Sequence durationInFrames={sec(s.dur)}>
              {s.node}
            </TransitionSeries.Sequence>
            {i < scenes.length - 1 && (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
              />
            )}
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
