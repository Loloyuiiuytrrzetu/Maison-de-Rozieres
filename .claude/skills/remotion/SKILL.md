---
name: remotion
description: Créer et rendre des animations vidéo avec Remotion (React) dans ce projet. À utiliser dès qu'il faut ajouter une composition, animer un élément, gérer les timings/transitions, prévisualiser dans le Studio, ou rendre une vidéo/image (mp4, gif, png, séquence). Déclencheurs : "animation", "vidéo", "Remotion", "composition", "rendu", "motion design", "générique", "intro", "Reels/Shorts".
---

# Remotion — animations vidéo dans ce projet

Remotion permet de créer des vidéos avec React : chaque image (frame) est un rendu
React, et le mouvement vient du numéro d'image courant. Ce projet est déjà configuré
et fonctionnel.

## Structure du projet

```
remotion.config.ts        # Config de rendu (format, qualité, concurrence)
src/index.ts              # Point d'entrée : registerRoot(RemotionRoot)
src/Root.tsx              # Liste des <Composition /> (le catalogue du Studio)
src/compositions/         # Une animation = un composant React ici
  ├─ Main.tsx             # Enchaîne TitleCard + LogoReveal avec un fondu
  ├─ TitleCard.tsx        # Carte de titre paramétrable (schéma Zod)
  └─ LogoReveal.tsx       # Révélation du monogramme « MR »
```

## Commandes

- `npm run dev` / `npm run studio` — ouvre le **Studio Remotion** (aperçu interactif, http://localhost:3000)
- `npm run render` — rendre une composition, ex : `npx remotion render src/index.ts Main out/main.mp4`
- `npm run still` — exporter une image fixe : `npx remotion still src/index.ts TitleCard out/title.png`
- `npm run lint` — vérification TypeScript (`tsc --noEmit`)
- Lister les compositions : `npx remotion compositions src/index.ts`

## Principes clés

1. **Le temps = `useCurrentFrame()`.** Toute animation dérive du numéro d'image. Pas de
   `setTimeout`, pas d'animation CSS pilotée par le temps réel — tout est déterministe.

2. **`useVideoConfig()`** donne `fps`, `width`, `height`, `durationInFrames`.

3. **Interpolation.** Fait varier une valeur en fonction de l'image :
   ```tsx
   const opacity = interpolate(frame, [0, 30], [0, 1], {
     extrapolateLeft: "clamp",
     extrapolateRight: "clamp",
   });
   ```

4. **Ressorts (spring).** Mouvement naturel :
   ```tsx
   const s = spring({ frame, fps, config: { damping: 200 } });
   ```

5. **Séquencement.** `<Sequence from={60} durationInFrames={90}>` décale un enfant dans le
   temps (son `frame` local repart de 0). `<Series>` enchaîne, `<TransitionSeries>` ajoute
   des transitions (fade, slide, wipe…) via `@remotion/transitions`.

6. **`<AbsoluteFill>`** = un conteneur plein écran positionné en absolu (fond, calques).

## Ajouter une nouvelle animation

1. Créer `src/compositions/MonAnim.tsx` exportant un composant React.
2. Optionnel : définir un schéma Zod pour rendre les props éditables dans le Studio.
3. Déclarer une `<Composition id="MonAnim" .../>` dans `src/Root.tsx`
   (avec `component`, `durationInFrames`, `fps`, `width`, `height`, `defaultProps`).
4. `npm run dev` pour prévisualiser, puis `npx remotion render src/index.ts MonAnim out/mon-anim.mp4`.

Gabarit minimal :
```tsx
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const MonAnim: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#0e0e10", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ color: "white", opacity }}>Bonjour</h1>
    </AbsoluteFill>
  );
};
```

## Formats de sortie

- **mp4** (défaut, H.264) — `out/x.mp4`
- **gif** — ajouter `--codec=gif` : `npx remotion render src/index.ts LogoReveal out/logo.gif --codec=gif`
- **png transparent / fond transparent** — `--image-format=png --pixel-format=yuva420p` (codec `prores` ou `vp8`/`vp9`)
- **séquence d'images** — cible un dossier : `npx remotion render src/index.ts Main out/frames --sequence`
- **format vertical** (Reels/TikTok/Shorts) — voir `TitleCard-Vertical` (1080×1920) dans `Root.tsx`

## Polices

Par défaut les compositions utilisent une pile serif sans réseau
(`'Playfair Display', Georgia, serif`) pour un rendu fiable partout, y compris hors ligne.

Pour une police Google premium chargée par Remotion :
```tsx
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";
const { fontFamily } = loadFont("normal", { weights: ["400", "700"], subsets: ["latin"] });
```
⚠️ Le chargement se fait par réseau au rendu. Limitez `weights`/`subsets` pour éviter des
dizaines de requêtes. Dans un environnement au réseau restreint, préférez la pile locale.

## Packages disponibles

`@remotion/transitions` (fondus/wipes), `@remotion/shapes` (formes SVG animables),
`@remotion/google-fonts` (polices). Autres utiles à installer au besoin :
`@remotion/media-utils` (audio/waveforms), `@remotion/noise`, `@remotion/lottie`, `@remotion/gif`.

## Bonnes pratiques

- Garder chaque composition **déterministe** : même image → même rendu (sinon les frames scintillent).
- Utiliser `random("seed")` de Remotion, jamais `Math.random()`.
- Envelopper les chargements asynchrones (fonts, données) avec `delayRender()` / `continueRender()`.
- Régler `durationInFrames` = `fps × secondes`.
- Documentation officielle : https://www.remotion.dev/docs
