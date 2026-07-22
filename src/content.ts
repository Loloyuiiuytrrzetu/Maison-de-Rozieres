/**
 * Contenu de la vidéo Walletiz (textes du script.md) + durées des scènes.
 * Source unique : utilisé par la composition maître (Walletiz) ET par les
 * scènes autonomes enregistrées dans Root.tsx.
 */
import { FPS } from "./design";

export const sceneContent = {
  highlight: {
    kicker: "L'idée en une phrase",
    lead: "Chaque jour, un client pousse votre porte…",
    highlight: "puis disparaît.",
    tail: "",
  },
  title: {
    kicker: "Ce que Walletiz propose vraiment",
    title: "Walletiz",
    subtitle: "Gardez le contact. Faites-les revenir.",
  },
  feature02: {
    section: "Campagnes",
    index: "02",
    kicker: "Pilier 1 · Campagnes & push",
    title: "Relancez au bon moment.",
    lead: "Une promo, un rappel, une offre — directement sur le téléphone du client, sans qu'il installe la moindre appli.",
    cardIdx: "01",
    icon: "push" as const,
    cardTitle: "Campagnes & push",
    cardDesc: "Notifications ciblées et géolocalisées pour faire revenir vos clients au moment clé.",
    cardFooter: "Notification · Géociblage · Sans appli",
    accent: "info" as const,
  },
  stat: {
    kicker: "Taux de clients récurrents",
    prefix: "+",
    value: 37,
    unit: "%",
    line1: "de",
    line1bold: "clients qui reviennent",
    line2: "après une campagne ciblée.",
    sub: "Quand la relance tombe au bon moment, le client repasse la porte. Walletiz déclenche l'envoi automatiquement.",
    side: [
      { k: "Ouverture push", v: "68 %", tone: "info" as const },
      { k: "Panier moyen", v: "+14 %", tone: "succes" as const },
      { k: "Sans appli à installer", v: "0", tone: "blanc" as const },
    ],
  },
  feature04: {
    section: "Statistiques",
    index: "04",
    kicker: "Pilier 2 · Statistiques client",
    title: "Vous savez enfin qui revient.",
    lead: "Clients récurrents, panier moyen, fréquence de visite : vous pilotez à la donnée, plus à l'intuition.",
    cardIdx: "02",
    icon: "stats" as const,
    cardTitle: "Statistiques client",
    cardDesc: "Un tableau de bord clair pour comprendre votre fréquentation et vos habitués.",
    cardFooter: "Tableau de bord · Cohortes · Panier moyen",
    accent: "succes" as const,
  },
  gauge: {
    kicker: "Indice d'engagement",
    title: "Un seul indice pour piloter votre fidélité.",
    lead: "Walletiz agrège fréquence de visite, ouverture des push et retours en boutique, suivi dans le temps.",
    value: 82,
    tag: "Très engagé",
  },
  compare: {
    kicker: "Avant / Avec Walletiz",
    title: "La différence tient en une relance.",
    beforeValue: 100,
    afterValue: 237,
    beforeLabel: "Sans Walletiz",
    afterLabel: "Avec Walletiz",
    beforeDesc: "Le client repart. Aucun moyen de le rappeler, aucune donnée sur son passage.",
    afterDesc: "Campagnes push au bon moment + stats de fréquentation : le client revient.",
  },
  diagram: {
    kicker: "Comment ça marche",
    title: "Une boucle qui ramène le client.",
  },
  recap: {
    kicker: "Récapitulatif",
    title: "Trois leviers, un seul outil.",
    cards: [
      {
        idx: "01",
        icon: "push" as const,
        title: "Campagnes & push",
        desc: "Relancez vos clients au bon moment, sans qu'ils installent la moindre appli.",
        footer: "Notification · Géociblage",
        accent: "info" as const,
      },
      {
        idx: "02",
        icon: "stats" as const,
        title: "Statistiques client",
        desc: "Clients récurrents, panier moyen, fréquence : pilotez à la donnée.",
        footer: "Tableau de bord · Cohortes",
        accent: "succes" as const,
      },
      {
        idx: "03",
        icon: "heart" as const,
        title: "Fidélisation durable",
        desc: "La carte vit dans le Wallet du téléphone. Le client la garde et revient.",
        footer: "Apple · Google Wallet",
        accent: "bordeaux" as const,
      },
    ],
  },
  outro: {
    brand: "Walletiz",
    taglineLead: "Gardez le contact. Faites",
    taglineBold: "revenir vos clients",
    taglineTail: ". La fidélité, dans leur Wallet.",
    cta: "Essayer gratuitement",
    handles: ["walletiz.app", "@walletiz", "hello@walletiz.app"],
  },
};

/** Durées de chaque scène, en secondes (calées sur script.md). */
export const sceneSeconds = {
  highlight: 6,
  title: 7,
  feature02: 9,
  stat: 7,
  feature04: 9,
  gauge: 7,
  compare: 8,
  diagram: 9,
  recap: 6,
  outro: 6,
} as const;

/** Conversion secondes → frames. */
export const sec = (s: number): number => Math.round(s * FPS);

/** Durée du fondu entre deux scènes (frames). */
export const TRANSITION_FRAMES = 15;
