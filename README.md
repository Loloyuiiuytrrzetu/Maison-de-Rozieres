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

| ID                   | Description                                 | Format    | Durée |
| -------------------- | ------------------------------------------- | --------- | ----- |
| `Main`               | Carte de titre + révélation du logo (fondu) | 1920×1080 | 10 s  |
| `TitleCard`          | Carte de titre paramétrable                 | 1920×1080 | 5 s   |
| `LogoReveal`         | Révélation du monogramme « MR »             | 1920×1080 | 4 s   |
| `TitleCard-Vertical` | Carte de titre format réseaux sociaux       | 1080×1920 | 5 s   |

## Rendre une vidéo

```bash
# mp4 (défaut)
npx remotion render src/index.ts Main out/main.mp4

# raccourci
npm run render:main

# image fixe
npx remotion still src/index.ts TitleCard out/title.png

# gif
npx remotion render src/index.ts LogoReveal out/logo.gif --codec=gif
```

Les sorties vont dans `out/` (ignoré par git).

## Structure

```
remotion.config.ts     # Config de rendu
src/index.ts           # Point d'entrée
src/Root.tsx           # Catalogue des compositions
src/compositions/      # Une animation = un fichier
```

## Créer une nouvelle animation

1. Ajouter un composant dans `src/compositions/`.
2. L'enregistrer via une `<Composition />` dans `src/Root.tsx`.
3. Prévisualiser avec `npm run dev`, puis rendre.

Guide détaillé et conventions : voir le skill **`.claude/skills/remotion/SKILL.md`**
(Claude Code le charge automatiquement pour toute tâche liée aux animations).

## Scripts

- `npm run dev` / `npm run studio` — Studio Remotion
- `npm run render` — rendu d'une composition
- `npm run still` — export d'une image fixe
- `npm run lint` — vérification TypeScript
- `npm run upgrade` — mettre à jour Remotion
