/**
 * Marques fictives des 3 commerces de la séquence CityStory.
 * Ce sont les identités des clients de Walletiz (pas la charte Walletiz elle-même).
 */
export type Brand = {
  key: "burger" | "cafe" | "beauty";
  name: string;
  facade: string; // couleur de façade
  facadeDark: string;
  sign: string; // bandeau enseigne
  accent: string;
  ink: string; // couleur du texte sur l'enseigne
  awning: string; // store/banne
  push: string; // notification push
  pushTitle: string;
};

export const brands: Record<Brand["key"], Brand> = {
  burger: {
    key: "burger",
    name: "TOP BURGER",
    facade: "#1E5FA8",
    facadeDark: "#154379",
    sign: "#2E7DD1",
    accent: "#67B5F5",
    ink: "#FFFFFF",
    awning: "#1B75C4",
    pushTitle: "Top Burger",
    push: "Semaine prochaine : 2 menus achetés = 1 boisson offerte 🍔",
  },
  cafe: {
    key: "cafe",
    name: "CAFÉ TROPIC",
    facade: "#8B6A45",
    facadeDark: "#6E5236",
    sign: "#A67C52",
    accent: "#C79A63",
    ink: "#FDF6EC",
    awning: "#9A7048",
    pushTitle: "Café Tropic",
    push: "Aujourd'hui : 1 café acheté, le 2ᵉ offert ☕",
  },
  beauty: {
    key: "beauty",
    name: "ONYX BEAUTY",
    facade: "#E6D5B8",
    facadeDark: "#CBB791",
    sign: "#EFE2CC",
    accent: "#B79A6A",
    ink: "#2A2320",
    awning: "#DCC9A6",
    pushTitle: "Onyx Beauty",
    push: "Ce mois-ci : 1 soin réservé = −20 % sur le prochain 💅",
  },
};

export const brandList: Brand[] = [brands.burger, brands.cafe, brands.beauty];
