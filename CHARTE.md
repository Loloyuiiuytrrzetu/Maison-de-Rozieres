# Charte graphique — Walletiz

> **Source de vérité technique : [`src/design.ts`](./src/design.ts).**
> Ce document est la version lisible, **à relire avant chaque animation**.
> Règle absolue : tout est nommé, rien n'est implicite. On ne code jamais une
> couleur, une taille ou une durée « en dur » — on utilise un token nommé.

**Contexte** : vidéo de présentation du SaaS **Walletiz** pour les commerçants.
Message d'ouverture : ce que Walletiz propose réellement → **campagnes & notifications
push** + **statistiques & connaissance client**.
**Ton** : punchy & moderne. **Inspiration** : 1600.agency (motion cinématique,
sombre, typographie cinétique). **Format** : 16:9 — 1920×1080 @ 30 fps.

---

## 1. Couleurs

Chaque couleur a un **nom** et un **rôle**. On ne dit jamais « le rouge » mais
« `bordeaux` (accent principal) ».

### Fonds froids

| Nom | Hex | Rôle |
|---|---|---|
| `nuitFroide` | `#0A0F16` | Fond principal de la scène (near-black bleuté) |
| `ardoise` | `#111A25` | Surface surélevée / carte / panneau |
| `brumeFroide` | `#1A2634` | Panneau secondaire, séparation de zones |
| `lisere` | `#26364A` | Bordure froide discrète (1px) |

### Accent principal — le bordeaux (identité Walletiz)

| Nom | Hex | Rôle |
|---|---|---|
| `bordeaux` | `#A81D45` | **Accent PRINCIPAL** — CTA, mots-clés, traits, logo |
| `bordeauxProfond` | `#6E1230` | États pressés, dégradés, ombres colorées |
| `bordeauxLueur` | `#D6486B` | Halos, survols, reflets lumineux |

### Textes

| Nom | Hex | Rôle |
|---|---|---|
| `blancCasse` | `#F3F6FA` | Texte **primaire** — titres, énoncés forts |
| `grisBrume` | `#A2B4C6` | Texte **secondaire** — sous-titres, descriptions |
| `grisEstompe` | `#63768A` | Texte **atténué** — labels, légendes, mentions |

### Signaux fonctionnels (distincts du bordeaux)

| Nom | Hex | Rôle |
|---|---|---|
| `succes` | `#3ED598` | Succès / valeur positive (hausse de stats, validation) |
| `info` | `#3AB7F0` | Info / data froide (graphes, notifications) |
| `attention` | `#F4A73B` | Avertissement / attention |
| `alerte` | `#FF4D4D` | Alerte / erreur / signal critique |

### Dégradés nommés

| Nom | Rôle |
|---|---|
| `fondScene` | Fond de scène — dégradé froid `ardoise → nuitFroide` |
| `accentBordeaux` | Accent dynamique `bordeaux → bordeauxProfond` (boutons, barres) |
| `lueurBordeaux` | Glow radial bordeaux derrière un élément clé |

**Règles d'usage couleur**
- Le **bordeaux** est un accent : ~10 % de l'image max. Il attire l'œil sur UN point.
- Le texte est toujours froid (`blancCasse` / `grisBrume`), jamais bordeaux sur de longs blocs.
- `succes`/`info`/`attention`/`alerte` servent uniquement aux **signaux data**, pas à la déco.

---

## 2. Typographie — 3 polices, 3 rôles

| Nom du rôle | Police (pile) | Rôle |
|---|---|---|
| `fonts.titres` | **Space Grotesk** → Arial Narrow → sans-serif | Titres / display, impact |
| `fonts.corps` | **Inter** → system-ui → sans-serif | Corps de texte, descriptions |
| `fonts.labels` | **IBM Plex Mono** → Menlo → monospace | Kickers, chiffres de stats, métadonnées |

> Les piles ont un repli système : le rendu marche **hors-ligne**. Pour charger les
> vraies polices via Remotion (`@remotion/google-fonts`), voir `.claude/skills/remotion/SKILL.md`.

**Graisses** (`fontWeights`) : `normal` 400 · `medium` 500 · `semibold` 600 · `bold` 700.

---

## 3. Échelle de tailles de texte (px, calibrée 1080p)

Échelle modulaire ~1.4. Chaque palier est nommé — on ne met jamais une taille au hasard.

| Nom | Taille | Rôle |
|---|---|---|
| `display` | 180 | Mot géant / chiffre héros plein écran |
| `h1` | 104 | Titre principal d'une scène |
| `h2` | 68 | Titre secondaire |
| `h3` | 46 | Titre de bloc / sous-section |
| `lead` | 34 | Accroche, chapô |
| `body` | 26 | Texte courant |
| `label` | 20 | Label / bouton |
| `kicker` | 18 | Sur-titre en CAPITALES, lettres espacées |
| `caption` | 15 | Légende / mention discrète |

**Interlignage** (`typography.lineHeight`) : `tight` 1.05 · `snug` 1.2 · `relaxed` 1.5.
**Espacement lettres** (`typography.letterSpacing`) : `tight` -0.02em · `normal` 0 · `kicker` 0.18em.

---

## 4. Espacement & rayons

**Espacement** (`spacing`, px) : `xs` 8 · `sm` 16 · `md` 24 · `lg` 40 · `xl` 64 · `xxl` 96 · `safe` 120 (marge de sécurité depuis le bord).
**Rayons** (`radius`, px) : `sm` 8 · `md` 16 · `lg` 24 · `pill` 999.

---

## 5. Motion — style d'apparition des éléments

Base : **30 fps**. Durées exprimées **en images (frames)**, unité native de Remotion.
Signature « punchy & moderne » = entrées vives avec **léger rebond + fondu**.

### Durées nommées (`durations`, @30fps)

| Nom | Frames | ≈ Secondes | Rôle |
|---|---|---|---|
| `instant` | 8 | 0.27 s | Micro-transition (accents, curseurs) |
| `fast` | 12 | 0.40 s | Entrée rapide (texte, labels) |
| `base` | 18 | 0.60 s | Entrée standard (titres, cartes) |
| `slow` | 27 | 0.90 s | Entrée ample (grands éléments, révélations) |
| `stagger` | 4 | 0.13 s | Décalage entre éléments d'une liste |
| `sceneTransition` | 15 | 0.50 s | Transition (fondu) entre deux scènes |

### Ressorts (`springs`) — configs à passer à `spring({ config })`

| Nom | Config | Rôle (intention) |
|---|---|---|
| `punchy` | damping 12, mass 0.7, stiffness 140 | **Rebond marqué** — entrée signature de la marque |
| `doux` | damping 18, mass 0.9, stiffness 120 | Rebond léger — pour les titres |
| `ferme` | damping 200 | Arrivée nette sans dépassement (barres, wipes) |

### Courbes (`easings`, cubic-bezier)

`standard` [0.4,0,0.2,1] · `sortie` [0.16,1,0.3,1] (ease-out) · `entree` [0.5,0,0.75,0] (ease-in).

### Styles d'apparition nommés (`entrances`) — la signature Walletiz

| Nom | Effet | Ressort | Durée |
|---|---|---|---|
| `fadeUp` | Monte (+40px → 0) + fondu | `doux` | `base` |
| `popIn` | Zoom rebond (0.82 → 1) + fondu | `punchy` | `base` |
| `wipeX` | Balayage horizontal (largeur 0 → 100 %) | `ferme` | `slow` |
| `fade` | Fondu simple | `ferme` | `fast` |

**Règles de motion**
- **Un** élément entre à la fois, ou en cascade avec `stagger` — jamais tout d'un bloc.
- Le bordeaux qui apparaît utilise `popIn` (rebond) pour marquer l'accent.
- Les titres : `fadeUp`. Les barres/soulignés/stats : `wipeX`. Les fonds : `fade`.
- Rien ne bouge « pour bouger » : chaque animation sert la lecture.

---

## 6. Canevas de référence (`canvas`)

| Nom | Dimensions | Rôle |
|---|---|---|
| `paysage` | 1920×1080 @30fps | **Format principal** — YouTube / site |
| `portrait` | 1080×1920 @30fps | Décliné au besoin — Reels / TikTok / Shorts |

---

*Modifier la charte = modifier `src/design.ts` (source de vérité), puis reporter ici.*
