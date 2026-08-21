// Fonction serverless (Vercel) — SECTION "SANS SITE" (liste du jour).
// Renvoie un mélange de commerces SANS site web et OUVERTS maintenant,
// dans la zone choisie. Les métiers piochés tournent selon la date,
// donc la liste change chaque jour.
//
// La clé Google reste secrète côté serveur (GOOGLE_PLACES_API_KEY).

const PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";

// Réservoir de métiers piochés à tour de rôle.
const CATEGORIES = [
  "coiffeur",
  "barbier",
  "institut de beauté",
  "salon de manucure",
  "pizzeria",
  "restaurant",
  "food truck",
  "boulangerie",
  "pâtisserie",
  "fleuriste",
  "garage automobile",
  "salon de tatouage",
  "bar",
  "boucherie",
  "pressing",
  "toilettage canin",
  "photographe",
  "salle de sport",
  "esthéticienne",
  "traiteur",
];

// Combien de métiers différents on pioche par jour.
const CATEGORIES_PER_DAY = 5;
// Limite de commerces renvoyés.
const MAX_RESULTS = 40;

function dayNumber(d) {
  // Numéro de jour absolu (change chaque jour, stable dans la journée).
  return Math.floor(d.getTime() / 86400000);
}

// Petit générateur pseudo-aléatoire déterministe (même graine → même ordre).
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Méthode non autorisée. Utilise POST." });
    return;
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error:
        "Clé API manquante. Ajoute GOOGLE_PLACES_API_KEY dans les variables d'environnement Vercel.",
    });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const zone = (body && body.zone ? String(body.zone) : "Guadeloupe").trim();

  const day = dayNumber(new Date());
  const rand = mulberry32(day);

  // Sélection des métiers du jour : point de départ qui glisse chaque jour.
  const start = day % CATEGORIES.length;
  const chosen = [];
  for (let i = 0; i < CATEGORIES_PER_DAY; i++) {
    chosen.push(CATEGORIES[(start + i) % CATEGORIES.length]);
  }

  try {
    const seen = new Set();
    const all = [];

    for (const cat of chosen) {
      const googleRes = await fetch(PLACES_SEARCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": [
            "places.id",
            "places.displayName",
            "places.formattedAddress",
            "places.internationalPhoneNumber",
            "places.nationalPhoneNumber",
            "places.websiteUri",
            "places.businessStatus",
            "places.currentOpeningHours",
            "places.regularOpeningHours",
          ].join(","),
        },
        body: JSON.stringify({
          textQuery: `${cat} ${zone}`,
          languageCode: "fr",
          regionCode: "FR",
          maxResultCount: 20,
        }),
      });

      const data = await googleRes.json();
      if (!googleRes.ok) {
        // Si une catégorie échoue (ex : quota), on continue avec les autres.
        continue;
      }

      const places = (data && data.places) || [];
      for (const p of places) {
        if (!p.id || seen.has(p.id)) continue;

        // Filtre 1 : PAS de site web.
        if (p.websiteUri) continue;

        // Filtre 2 : OUVERT maintenant (statut temps réel Google).
        const oh = p.currentOpeningHours || p.regularOpeningHours || null;
        const openNow = oh && typeof oh.openNow === "boolean" ? oh.openNow : null;
        if (openNow !== true) continue;

        // Filtre 3 : commerce en activité.
        if (p.businessStatus && p.businessStatus !== "OPERATIONAL") continue;

        const tel = p.internationalPhoneNumber || p.nationalPhoneNumber || "";
        // On garde en priorité ceux qui ont un numéro (sinon on ne peut pas appeler).
        if (!tel) continue;

        seen.add(p.id);
        all.push({
          placeId: p.id,
          nom: p.displayName ? p.displayName.text : "",
          adresse: p.formattedAddress || "",
          categorie: cat,
          telephone: p.nationalPhoneNumber || p.internationalPhoneNumber || "",
          telLink: "tel:" + tel.replace(/[^0-9+]/g, ""),
          website: "",
          businessStatus: p.businessStatus || "",
          openNow: true,
          hours: (oh && oh.weekdayDescriptions) || null,
          reviewLink: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(
            p.id
          )}`,
        });
      }
    }

    // Mélange déterministe (même ordre toute la journée, différent le lendemain).
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }

    res.status(200).json({
      zone,
      categories: chosen,
      total: Math.min(all.length, MAX_RESULTS),
      results: all.slice(0, MAX_RESULTS),
    });
  } catch (err) {
    res.status(502).json({
      error: "Impossible de contacter Google Places : " + err.message,
    });
  }
};
