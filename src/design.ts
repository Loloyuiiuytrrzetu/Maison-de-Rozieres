/**
 * ============================================================================
 *  CHARTE GRAPHIQUE — WALLETIZ
 *  Source de vérité des design tokens. Importée par toutes les compositions.
 *  Règle : rien n'est implicite. Chaque valeur a un NOM et un RÔLE.
 *  Ambiance : bordeaux vif sur fond froid, motion design punchy & moderne
 *  (inspiration 1600.agency). Format cible : 16:9 — 1920×1080 @ 30 fps.
 * ============================================================================
 */

/* ------------------------------------------------------------------ */
/*  1. COULEURS — chaque teinte a un nom propre + un rôle              */
/* ------------------------------------------------------------------ */

export const palette = {
  // --- Fonds froids (du plus sombre au plus clair) ---
  /** RÔLE : fond principal de la scène (near-black bleuté). */
  nuitFroide: "#0A0F16",
  /** RÔLE : surface surélevée / carte / panneau posé sur le fond. */
  ardoise: "#111A25",
  /** RÔLE : panneau secondaire, séparation de zones. */
  brumeFroide: "#1A2634",
  /** RÔLE : liseré / bordure froide discrète (1px). */
  lisere: "#26364A",

  // --- Accent principal : le bordeaux (l'identité Walletiz) ---
  /** RÔLE : accent PRINCIPAL — CTA, mots-clés, traits d'accent, logo. */
  bordeaux: "#A81D45",
  /** RÔLE : bordeaux profond — états pressés, dégradés, ombres colorées. */
  bordeauxProfond: "#6E1230",
  /** RÔLE : bordeaux clair/lumineux — halos, survols, reflets. */
  bordeauxLueur: "#D6486B",

  // --- Textes (froids, contrastés) ---
  /** RÔLE : texte PRIMAIRE — titres, énoncés forts (blanc cassé froid). */
  blancCasse: "#F3F6FA",
  /** RÔLE : texte SECONDAIRE — sous-titres, descriptions. */
  grisBrume: "#A2B4C6",
  /** RÔLE : texte ATTÉNUÉ — labels, légendes, mentions discrètes. */
  grisEstompe: "#63768A",

  // --- Signaux fonctionnels (distincts du bordeaux d'accent) ---
  /** RÔLE : SUCCÈS / valeur positive (hausse de stats, validation). */
  succes: "#3ED598",
  /** RÔLE : INFO / mise en avant data froide (graphes, notifications). */
  info: "#3AB7F0",
  /** RÔLE : AVERTISSEMENT / attention. */
  attention: "#F4A73B",
  /** RÔLE : ALERTE / erreur / signal critique. */
  alerte: "#FF4D4D",

  // --- Utilitaires ---
  /** RÔLE : blanc pur (réservé aux reflets/étincelles, jamais du texte). */
  blancPur: "#FFFFFF",
  /** RÔLE : noir pur (ombres portées denses). */
  noir: "#000000",
} as const;

/**
 * Dégradés nommés (réutilisables pour fonds et accents).
 */
export const gradients = {
  /** RÔLE : fond de scène — dégradé froid subtil, du haut sombre vers le bas. */
  fondScene: `linear-gradient(160deg, ${palette.ardoise} 0%, ${palette.nuitFroide} 60%)`,
  /** RÔLE : accent bordeaux dynamique (boutons, barres, soulignés). */
  accentBordeaux: `linear-gradient(120deg, ${palette.bordeaux} 0%, ${palette.bordeauxProfond} 100%)`,
  /** RÔLE : lueur bordeaux (glow derrière un élément clé). */
  lueurBordeaux: `radial-gradient(circle, ${palette.bordeauxLueur}55 0%, transparent 70%)`,
} as const;

/* ------------------------------------------------------------------ */
/*  2. TYPOGRAPHIE — 3 polices, chacune avec un rôle                   */
/* ------------------------------------------------------------------ */
/*
 * Les valeurs ci-dessous sont des PILES de polices avec repli système :
 * le rendu fonctionne même hors-ligne. Pour charger les vraies polices
 * (Space Grotesk, Inter, IBM Plex Mono) via Remotion, voir le SKILL.md
 * (@remotion/google-fonts) — à faire une seule fois dans src/fonts.ts.
 */
export const fonts = {
  /** RÔLE : TITRES / display — impact, grotesk géométrique, punchy. */
  titres: "'Space Grotesk', 'Arial Narrow', system-ui, sans-serif",
  /** RÔLE : CORPS — descriptions, phrases, lisibilité maximale. */
  corps: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  /** RÔLE : LABELS / DATA — kickers, chiffres de stats, métadonnées (mono). */
  labels: "'IBM Plex Mono', 'SFMono-Regular', Menlo, Consolas, monospace",
} as const;

/**
 * Graisses nommées (cohérentes avec les 3 familles).
 */
export const fontWeights = {
  /** RÔLE : corps standard. */
  normal: 400,
  /** RÔLE : accent léger, sous-titres. */
  medium: 500,
  /** RÔLE : titres secondaires, labels. */
  semibold: 600,
  /** RÔLE : titres principaux, display. */
  bold: 700,
} as const;

/* ------------------------------------------------------------------ */
/*  3. ÉCHELLE DE TAILLES DE TEXTE (en px, pensée pour du 1080p)       */
/* ------------------------------------------------------------------ */
/*
 * Échelle modulaire ~1.4. Chaque palier a un NOM et un usage précis.
 * En 1920×1080, le texte doit être grand : ces valeurs sont calibrées
 * pour la lisibilité vidéo, pas pour du web.
 */
export const textScale = {
  /** RÔLE : mot géant / chiffre héros plein écran. */
  display: 180,
  /** RÔLE : titre principal d'une scène. */
  h1: 104,
  /** RÔLE : titre secondaire. */
  h2: 68,
  /** RÔLE : titre de bloc / sous-section. */
  h3: 46,
  /** RÔLE : phrase d'accroche, chapô. */
  lead: 34,
  /** RÔLE : texte courant. */
  body: 26,
  /** RÔLE : label / bouton. */
  label: 20,
  /** RÔLE : kicker (sur-titre en capitales, lettres espacées). */
  kicker: 18,
  /** RÔLE : légende / mention discrète. */
  caption: 15,
} as const;

/**
 * Interlignage et espacement des lettres, par rôle.
 */
export const typography = {
  lineHeight: {
    /** Titres serrés. */
    tight: 1.05,
    /** Sous-titres. */
    snug: 1.2,
    /** Corps de texte confortable. */
    relaxed: 1.5,
  },
  letterSpacing: {
    /** Titres display (légèrement resserrés). */
    tight: "-0.02em",
    /** Par défaut. */
    normal: "0em",
    /** Kickers en capitales (bien espacés). */
    kicker: "0.18em",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  4. ESPACEMENT & RAYONS (grille cohérente)                          */
/* ------------------------------------------------------------------ */

/** Échelle d'espacement (px) — marges, gouttières, paddings. */
export const spacing = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 40,
  xl: 64,
  xxl: 96,
  /** RÔLE : marge de sécurité (safe area) depuis le bord de l'écran. */
  safe: 120,
} as const;

/** Rayons d'arrondi (px). */
export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

/* ------------------------------------------------------------------ */
/*  5. MOTION — style d'apparition des éléments                        */
/* ------------------------------------------------------------------ */
/*
 * Base temporelle : 30 fps. Les durées sont exprimées EN IMAGES (frames)
 * — unité native de Remotion — avec l'équivalent en secondes en commentaire.
 * Ton "punchy & moderne" => entrées vives avec léger rebond + fondu.
 */

export const FPS = 30;

/** Durées nommées (en frames @30fps). */
export const durations = {
  /** RÔLE : micro-transition (0.27s) — accents, curseurs. */
  instant: 8,
  /** RÔLE : entrée rapide (0.4s) — texte, labels. */
  fast: 12,
  /** RÔLE : entrée standard (0.6s) — titres, cartes. */
  base: 18,
  /** RÔLE : entrée ample (0.9s) — grands éléments, révélations. */
  slow: 27,
  /** RÔLE : décalage entre éléments d'une liste (stagger, 0.13s). */
  stagger: 4,
  /** RÔLE : durée d'une transition entre scènes (fondu). */
  sceneTransition: 15,
} as const;

/**
 * Configs de ressort (spring) — à passer tel quel à spring({ config }).
 * Chaque config a un RÔLE d'intention de mouvement.
 */
export const springs = {
  /** RÔLE : PUNCHY — rebond marqué, l'entrée signature de la marque. */
  punchy: { damping: 12, mass: 0.7, stiffness: 140 },
  /** RÔLE : DOUX — rebond léger, pour les titres. */
  doux: { damping: 18, mass: 0.9, stiffness: 120 },
  /** RÔLE : FERME — arrivée nette sans dépassement (barres, wipes). */
  ferme: { damping: 200 },
} as const;

/**
 * Courbes d'accélération (cubic-bezier) pour les interpolations non-spring.
 */
export const easings = {
  /** RÔLE : standard entrée+sortie. */
  standard: [0.4, 0, 0.2, 1] as const,
  /** RÔLE : sortie rapide (ease-out), pour disparitions. */
  sortie: [0.16, 1, 0.3, 1] as const,
  /** RÔLE : entrée accélérée (ease-in). */
  entree: [0.5, 0, 0.75, 0] as const,
} as const;

/**
 * Styles d'apparition nommés — la « signature » de mouvement Walletiz.
 * Décrivent l'intention ; l'implémentation se fait dans les composants
 * via useCurrentFrame + spring/interpolate (voir SKILL.md).
 */
export const entrances = {
  /** RÔLE : monte + apparaît. Déplacement Y de +40px → 0, opacité 0 → 1. */
  fadeUp: { fromY: 40, spring: "doux", duration: durations.base },
  /** RÔLE : zoom rebond. Échelle 0.8 → 1 avec dépassement, opacité 0 → 1. */
  popIn: { fromScale: 0.82, spring: "punchy", duration: durations.base },
  /** RÔLE : balayage horizontal (barres, soulignés). Largeur 0 → 100%. */
  wipeX: { spring: "ferme", duration: durations.slow },
  /** RÔLE : fondu simple. Opacité 0 → 1, sans déplacement. */
  fade: { spring: "ferme", duration: durations.fast },
} as const;

/* ------------------------------------------------------------------ */
/*  6. CANEVAS — dimensions de référence                               */
/* ------------------------------------------------------------------ */

export const canvas = {
  /** RÔLE : format principal 16:9 (YouTube / site). */
  paysage: { width: 1920, height: 1080, fps: FPS },
  /** RÔLE : format vertical 9:16 (Reels/TikTok/Shorts) — décliné au besoin. */
  portrait: { width: 1080, height: 1920, fps: FPS },
} as const;

/* ------------------------------------------------------------------ */
/*  Regroupement pour import unique : `import { design } from "./design"` */
/* ------------------------------------------------------------------ */

export const design = {
  palette,
  gradients,
  fonts,
  fontWeights,
  textScale,
  typography,
  spacing,
  radius,
  durations,
  springs,
  easings,
  entrances,
  canvas,
  FPS,
} as const;

export default design;
