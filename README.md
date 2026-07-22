# Maison de Rozières — Animations vidéo

Projet [Remotion](https://www.remotion.dev) (vidéo en React) prêt à créer des animations.

## Démarrage

```bash
npm install        # installer les dépendances (déjà fait)
npm run dev        # ouvrir le Studio Remotion → http://localhost:3000
```

Le **Studio** offre un aperçu image par image, la timeline, et l'édition en direct des
props des compositions.

## Compositions incluses

Vidéo de présentation Walletiz (script dans `script.md`) : 9 scènes enchaînées + chaque
scène rendable à l'unité (props + schéma Zod éditables dans le Studio). Format 1920×1080, 30 fps.

| ID                 | Scène / archétype            | Durée |
| ------------------ | ---------------------------- | ----- |
| `Walletiz`         | **Vidéo complète** (9 scènes)| 69,5 s|
| `00-Highlight`     | Ouverture — surlignage       | 6 s   |
| `01-Title`         | Ce que Walletiz propose      | 7 s   |
| `02-Feature-Push`  | Pilier — campagnes & push    | 9 s   |
| `03-Stat`          | Grosse stat (+37 %)          | 7 s   |
| `04-Feature-Stats` | Pilier — statistiques client | 9 s   |
| `05-Gauge`         | Jauge d'engagement (82/100)  | 7 s   |
| `06-Compare`       | Comparatif en barres         | 8 s   |
| `07-Diagram`       | Schéma de la boucle          | 9 s   |
| `08-Recap`         | Récapitulatif (3 leviers)    | 6 s   |
| `09-Outro`         | Écran de fin / CTA           | 6 s   |

## Rendre une vidéo

```bash
# la vidéo complète (raccourci)
npm run render:video

# une scène précise
npx remotion render src/index.ts 03-Stat out/stat.mp4

# image fixe d'une scène
npx remotion still src/index.ts 05-Gauge out/gauge.png

# gif
npx remotion render src/index.ts 09-Outro out/outro.gif --codec=gif
```

Les sorties vont dans `out/` (ignoré par git).

## Son

- **Bruitages** : `scripts/generate-sfx.mjs` synthétise `public/sfx/*.wav` (whoosh, impact,
  pop, riser, tick, chime). Câblés par scène via `src/components/Sfx.tsx`.
- **Voix off** : `public/vo/vo.wav` (narration française, générée en TTS). Piste continue
  ajoutée dans `src/Walletiz.tsx`. Les durées de scènes (`src/content.ts`) sont calées sur
  la voix → version narrée serrée (~22 s). Pour un montage plus long sans voix, rallonger
  `sceneSeconds` dans `content.ts`.

## Identité visuelle

- Charte : `src/design.ts` (tokens typés) + `CHARTE.md` (version lisible).
- **Lookbook** : `lookbook/index.html` — 10 archétypes de scènes (1280×720) pour valider
  la direction artistique avant toute animation. Ouvrez `lookbook/index.html` dans un navigateur.

## Structure

```
remotion.config.ts     # Config de rendu
script.md              # Script de la vidéo (VO + texte écran par section)
src/design.ts          # Charte graphique (design tokens)
src/motion.ts          # Helpers d'animation dérivés de la charte
src/content.ts         # Textes + durées des scènes (source unique)
src/Walletiz.tsx       # Composition maître (enchaîne les 9 scènes)
src/Root.tsx           # Catalogue des compositions
src/components/         # Primitives réutilisables (Frame, cartes, jauge, barres…)
src/scenes/            # Une scène animée = un fichier
lookbook/              # Planches HTML de validation d'identité
```

## Créer une nouvelle animation

1. Réutiliser les primitives de `src/components/` (elles lisent `design.ts`).
2. Créer une scène dans `src/scenes/`, l'enregistrer via `<Composition />` dans `src/Root.tsx`.
3. Prévisualiser avec `npm run dev`, puis rendre.

Guide détaillé et conventions : voir le skill **`.claude/skills/remotion/SKILL.md`**
(Claude Code le charge automatiquement pour toute tâche liée aux animations).

## Scripts

- `npm run dev` / `npm run studio` — Studio Remotion
- `npm run render` — rendu d'une composition
- `npm run still` — export d'une image fixe
- `npm run lint` — vérification TypeScript
- `npm run upgrade` — mettre à jour Remotion
