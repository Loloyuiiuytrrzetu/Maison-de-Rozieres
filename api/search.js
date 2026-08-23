// Fonction serverless (Vercel) — MODE PROSPECTION.
// Reçoit un métier + une zone (ex: "coiffeur" + "Guadeloupe") et renvoie
// la liste des commerces avec téléphone, site web (ou non), et lien d'avis.
//
// La clé Google reste secrète côté serveur (GOOGLE_PLACES_API_KEY).

const PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";

// Nombre max de pages Google à récupérer (20 résultats/page → 60 max).
const MAX_PAGES = 3;

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
  const metier = (body && body.metier ? String(body.metier) : "").trim();
  const zone = (body && body.zone ? String(body.zone) : "Guadeloupe").trim();

  if (!metier) {
    res.status(400).json({ error: "Indique un métier (ex : coiffeur, institut de beauté)." });
    return;
  }

  const query = `${metier} ${zone}`;

  try {
    const all = [];
    let pageToken = null;

    for (let page = 0; page < MAX_PAGES; page++) {
      const requestBody = {
        textQuery: query,
        languageCode: "fr",
        regionCode: "FR",
        maxResultCount: 20,
      };
      if (pageToken) requestBody.pageToken = pageToken;

      const googleRes = await fetch(PLACES_SEARCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          // On demande téléphone, site web, horaires + statut (+ token de page).
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
            "places.googleMapsUri",
            "nextPageToken",
          ].join(","),
        },
        body: JSON.stringify(requestBody),
      });

      const data = await googleRes.json();

      if (!googleRes.ok) {
        const message =
          (data && data.error && data.error.message) ||
          "Erreur lors de l'appel à l'API Google Places.";
        res.status(googleRes.status).json({ error: message });
        return;
      }

      const places = (data && data.places) || [];
      for (const p of places) {
        const tel = p.internationalPhoneNumber || p.nationalPhoneNumber || "";
        // Statut horaires : on privilégie currentOpeningHours (tient compte
        // des horaires exceptionnels), sinon regularOpeningHours.
        const oh = p.currentOpeningHours || p.regularOpeningHours || null;
        let openNow = null;
        if (oh && typeof oh.openNow === "boolean") openNow = oh.openNow;
        const hours = (oh && oh.weekdayDescriptions) || null; // 7 lignes (lundi→dimanche)

        all.push({
          placeId: p.id,
          nom: p.displayName ? p.displayName.text : "",
          adresse: p.formattedAddress || "",
          telephone: p.nationalPhoneNumber || p.internationalPhoneNumber || "",
          // Numéro « propre » pour le lien tel: (on garde le + et les chiffres).
          telLink: tel ? "tel:" + tel.replace(/[^0-9+]/g, "") : "",
          website: p.websiteUri || "",
          businessStatus: p.businessStatus || "",
          openNow, // true / false / null (horaires inconnus)
          hours, // tableau des horaires de la semaine, ou null
          // Lien vers la fiche Google du commerce.
          googleUrl: p.googleMapsUri || `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(p.id)}`,
          reviewLink: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(
            p.id
          )}`,
        });
      }

      pageToken = (data && data.nextPageToken) || null;
      if (!pageToken) break; // plus de pages
    }

    res.status(200).json({ query, total: all.length, results: all });
  } catch (err) {
    res.status(502).json({
      error: "Impossible de contacter Google Places : " + err.message,
    });
  }
};
