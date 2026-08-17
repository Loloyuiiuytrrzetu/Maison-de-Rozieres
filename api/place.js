// Fonction serverless (Vercel) : reçoit un nom de commerce + une ville,
// interroge l'API Google Places (New) pour trouver le place_id, et renvoie
// le lien direct « laisser un avis ».
//
// La clé Google N'EST JAMAIS envoyée au navigateur : elle est lue ici,
// côté serveur, depuis la variable d'environnement GOOGLE_PLACES_API_KEY.

const PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";

module.exports = async (req, res) => {
  // On n'accepte que le POST (le navigateur envoie du JSON).
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

  // Récupération du corps de la requête (nom + ville).
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const nom = (body && body.nom ? String(body.nom) : "").trim();
  const ville = (body && body.ville ? String(body.ville) : "").trim();

  if (!nom || !ville) {
    res.status(400).json({ error: "Renseigne un nom de commerce ET une ville." });
    return;
  }

  const query = `${nom} ${ville}`;

  try {
    const googleRes = await fetch(PLACES_SEARCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        // Field mask : on ne demande que les champs utiles (moins de coût, réponse plus légère).
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress",
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: "fr",
        regionCode: "FR",
        maxResultCount: 5,
      }),
    });

    const data = await googleRes.json();

    if (!googleRes.ok) {
      // Google renvoie un message d'erreur exploitable (clé invalide, API non activée, etc.).
      const message =
        (data && data.error && data.error.message) ||
        "Erreur lors de l'appel à l'API Google Places.";
      res.status(googleRes.status).json({ error: message });
      return;
    }

    const places = (data && data.places) || [];
    if (places.length === 0) {
      res.status(404).json({ error: "Aucun commerce trouvé pour cette recherche." });
      return;
    }

    // On construit la liste des résultats avec, pour chacun, le lien direct d'avis.
    const results = places.map((p) => ({
      placeId: p.id,
      nom: p.displayName ? p.displayName.text : "",
      adresse: p.formattedAddress || "",
      reviewLink: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(
        p.id
      )}`,
    }));

    res.status(200).json({
      query,
      best: results[0], // le résultat le plus pertinent selon Google
      results, // les autres, au cas où le premier ne serait pas le bon
    });
  } catch (err) {
    res.status(502).json({
      error: "Impossible de contacter Google Places : " + err.message,
    });
  }
};
