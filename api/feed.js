// Fonction serverless (Vercel) — SECTION "SANS SITE" (liste du jour).
// Renvoie un mélange de commerces SANS site web, dans la zone choisie.
// On exclut ceux qui sont EXPLICITEMENT fermés maintenant (ou fermés
// définitivement) ; on garde les ouverts + ceux aux horaires inconnus.
// Les métiers piochés tournent selon la date → liste différente chaque jour.
//
// La clé Google reste secrète côté serveur (GOOGLE_PLACES_API_KEY).

const PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";

// Réservoir de métiers (on les parcourt tous, dans un ordre qui tourne
// chaque jour, jusqu'à avoir assez de résultats).
const CATEGORIES = [
  "coiffeur", "barbier", "institut de beauté", "salon de manucure",
  "onglerie", "spa", "salon de massage", "pizzeria", "restaurant",
  "snack", "food truck", "boulangerie", "pâtisserie", "fleuriste",
  "garage automobile", "carrosserie", "salon de tatouage", "bar",
  "boucherie", "poissonnerie", "pressing", "cordonnerie",
  "toilettage canin", "photographe", "salle de sport", "esthéticienne",
  "traiteur", "auto-école", "opticien", "bijouterie",
];

const TARGET = 80;       // on arrête de chercher une fois ce nombre atteint
const MAX_RESULTS = 60;  // taille max de la liste renvoyée

function dayNumber(d) { return Math.floor(d.getTime() / 86400000); }

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, rand) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Méthode non autorisée. Utilise POST." });
    return;
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Clé API manquante (GOOGLE_PLACES_API_KEY)." });
    return;
  }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  const zone = (body && body.zone ? String(body.zone) : "Guadeloupe").trim();

  const day = dayNumber(new Date());
  const rand = mulberry32(day);

  // Ordre des métiers qui glisse chaque jour.
  const order = [];
  for (let i = 0; i < CATEGORIES.length; i++) {
    order.push(CATEGORIES[(day + i) % CATEGORIES.length]);
  }

  async function fetchCategory(cat, pageToken) {
    const reqBody = { textQuery: `${cat} ${zone}`, languageCode: "fr", regionCode: "FR", maxResultCount: 20 };
    if (pageToken) reqBody.pageToken = pageToken;
    const r = await fetch(PLACES_SEARCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": [
          "places.id", "places.displayName", "places.formattedAddress",
          "places.internationalPhoneNumber", "places.nationalPhoneNumber",
          "places.websiteUri", "places.businessStatus",
          "places.currentOpeningHours", "places.regularOpeningHours",
          "nextPageToken",
        ].join(","),
      },
      body: JSON.stringify(reqBody),
    });
    return r.ok ? r.json() : null;
  }

  try {
    const seen = new Set();
    const open = [];     // ouverts confirmés
    const unknown = [];  // horaires inconnus (on ne peut pas dire fermé)

    for (const cat of order) {
      if (open.length + unknown.length >= TARGET) break;

      let pageToken = null;
      for (let page = 0; page < 2; page++) { // jusqu'à 2 pages par métier
        const data = await fetchCategory(cat, pageToken);
        if (!data) break;
        const places = data.places || [];

        for (const p of places) {
          if (!p.id || seen.has(p.id)) continue;
          if (p.websiteUri) continue; // filtre : PAS de site
          if (p.businessStatus && p.businessStatus !== "OPERATIONAL") continue; // pas fermé def/temp

          const oh = p.currentOpeningHours || p.regularOpeningHours || null;
          const openNow = oh && typeof oh.openNow === "boolean" ? oh.openNow : null;
          if (openNow === false) continue; // exclut uniquement les FERMÉS maintenant

          const tel = p.internationalPhoneNumber || p.nationalPhoneNumber || "";
          if (!tel) continue; // sans numéro on ne peut pas appeler

          seen.add(p.id);
          const item = {
            placeId: p.id,
            nom: p.displayName ? p.displayName.text : "",
            adresse: p.formattedAddress || "",
            categorie: cat,
            telephone: p.nationalPhoneNumber || p.internationalPhoneNumber || "",
            telLink: "tel:" + tel.replace(/[^0-9+]/g, ""),
            website: "",
            businessStatus: p.businessStatus || "",
            openNow, // true ou null
            hours: (oh && oh.weekdayDescriptions) || null,
            reviewLink: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(p.id)}`,
          };
          (openNow === true ? open : unknown).push(item);
        }

        pageToken = data.nextPageToken || null;
        if (!pageToken) break;
        if (open.length + unknown.length >= TARGET) break;
      }
    }

    // Ouverts confirmés d'abord, puis horaires inconnus ; mélange stable/jour.
    shuffle(open, rand);
    shuffle(unknown, rand);
    const all = open.concat(unknown).slice(0, MAX_RESULTS);

    res.status(200).json({
      zone,
      total: all.length,
      openCount: open.length,
      results: all,
    });
  } catch (err) {
    res.status(502).json({ error: "Impossible de contacter Google Places : " + err.message });
  }
};
