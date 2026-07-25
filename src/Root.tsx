import React from "react";
import { Composition } from "remotion";
import { FPS } from "./design";
import { sceneContent, sceneSeconds, sec } from "./content";
import { Walletiz, walletizDurationInFrames } from "./Walletiz";
import { CityStory, cityStoryDurationInFrames } from "./scenes/CityStory";

import { SceneHighlight, sceneHighlightSchema } from "./scenes/SceneHighlight";
import { SceneTitle, sceneTitleSchema } from "./scenes/SceneTitle";
import { SceneFeature, sceneFeatureSchema } from "./scenes/SceneFeature";
import { SceneStat, sceneStatSchema } from "./scenes/SceneStat";
import { SceneGauge, sceneGaugeSchema } from "./scenes/SceneGauge";
import { SceneCompare, sceneCompareSchema } from "./scenes/SceneCompare";
import { SceneDiagram, sceneDiagramSchema } from "./scenes/SceneDiagram";
import { SceneRecap, sceneRecapSchema } from "./scenes/SceneRecap";
import { SceneOutro, sceneOutroSchema } from "./scenes/SceneOutro";

const W = 1920;
const H = 1080;

/**
 * Catalogue du Studio Remotion :
 *  - « Walletiz » : la vidéo complète (9 scènes enchaînées).
 *  - Chaque scène est aussi enregistrée seule (props + schéma Zod éditables),
 *    réutilisable et rendable à l'unité.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Vidéo maître */}
      <Composition
        id="Walletiz"
        component={Walletiz}
        durationInFrames={walletizDurationInFrames}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* Séquence narrative (ville → commerces → push → QR) */}
      <Composition
        id="CityStory"
        component={CityStory}
        durationInFrames={cityStoryDurationInFrames}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* Scènes autonomes */}
      <Composition
        id="00-Highlight"
        component={SceneHighlight}
        durationInFrames={sec(sceneSeconds.highlight)}
        fps={FPS}
        width={W}
        height={H}
        schema={sceneHighlightSchema}
        defaultProps={sceneContent.highlight}
      />
      <Composition
        id="01-Title"
        component={SceneTitle}
        durationInFrames={sec(sceneSeconds.title)}
        fps={FPS}
        width={W}
        height={H}
        schema={sceneTitleSchema}
        defaultProps={sceneContent.title}
      />
      <Composition
        id="02-Feature-Push"
        component={SceneFeature}
        durationInFrames={sec(sceneSeconds.feature02)}
        fps={FPS}
        width={W}
        height={H}
        schema={sceneFeatureSchema}
        defaultProps={sceneContent.feature02}
      />
      <Composition
        id="03-Stat"
        component={SceneStat}
        durationInFrames={sec(sceneSeconds.stat)}
        fps={FPS}
        width={W}
        height={H}
        schema={sceneStatSchema}
        defaultProps={sceneContent.stat}
      />
      <Composition
        id="04-Feature-Stats"
        component={SceneFeature}
        durationInFrames={sec(sceneSeconds.feature04)}
        fps={FPS}
        width={W}
        height={H}
        schema={sceneFeatureSchema}
        defaultProps={sceneContent.feature04}
      />
      <Composition
        id="05-Gauge"
        component={SceneGauge}
        durationInFrames={sec(sceneSeconds.gauge)}
        fps={FPS}
        width={W}
        height={H}
        schema={sceneGaugeSchema}
        defaultProps={sceneContent.gauge}
      />
      <Composition
        id="06-Compare"
        component={SceneCompare}
        durationInFrames={sec(sceneSeconds.compare)}
        fps={FPS}
        width={W}
        height={H}
        schema={sceneCompareSchema}
        defaultProps={sceneContent.compare}
      />
      <Composition
        id="07-Diagram"
        component={SceneDiagram}
        durationInFrames={sec(sceneSeconds.diagram)}
        fps={FPS}
        width={W}
        height={H}
        schema={sceneDiagramSchema}
        defaultProps={sceneContent.diagram}
      />
      <Composition
        id="08-Recap"
        component={SceneRecap}
        durationInFrames={sec(sceneSeconds.recap)}
        fps={FPS}
        width={W}
        height={H}
        schema={sceneRecapSchema}
        defaultProps={sceneContent.recap}
      />
      <Composition
        id="09-Outro"
        component={SceneOutro}
        durationInFrames={sec(sceneSeconds.outro)}
        fps={FPS}
        width={W}
        height={H}
        schema={sceneOutroSchema}
        defaultProps={sceneContent.outro}
      />
    </>
  );
};
