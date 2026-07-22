import { Composition } from "remotion";
import { Main, mainSchema } from "./compositions/Main";
import { TitleCard, titleCardSchema } from "./compositions/TitleCard";
import { LogoReveal } from "./compositions/LogoReveal";

// Réglages vidéo partagés (1080p, 30 images/seconde).
const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

/**
 * La racine liste toutes les compositions disponibles dans le Studio Remotion.
 * Pour ajouter une nouvelle animation :
 *   1. Créez un composant dans src/compositions/
 *   2. Ajoutez une <Composition /> ci-dessous
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Animation principale : carte de titre + logo enchaînés */}
      <Composition
        id="Main"
        component={Main}
        durationInFrames={FPS * 10}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        schema={mainSchema}
        defaultProps={{
          title: "Maison de Rozières",
          subtitle: "L'élégance à la française",
        }}
      />

      {/* Carte de titre réutilisable, personnalisable via props */}
      <Composition
        id="TitleCard"
        component={TitleCard}
        durationInFrames={FPS * 5}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        schema={titleCardSchema}
        defaultProps={{
          title: "Maison de Rozières",
          subtitle: "L'élégance à la française",
          accentColor: "#c9a24b",
        }}
      />

      {/* Révélation animée du logo */}
      <Composition
        id="LogoReveal"
        component={LogoReveal}
        durationInFrames={FPS * 4}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* Format vertical pour les réseaux sociaux (Reels / TikTok / Shorts) */}
      <Composition
        id="TitleCard-Vertical"
        component={TitleCard}
        durationInFrames={FPS * 5}
        fps={FPS}
        width={1080}
        height={1920}
        schema={titleCardSchema}
        defaultProps={{
          title: "Maison de Rozières",
          subtitle: "L'élégance à la française",
          accentColor: "#c9a24b",
        }}
      />
    </>
  );
};
