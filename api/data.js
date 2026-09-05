// Fonction serverless (Vercel) — SYNCHRONISATION.
// Lit / écrit un unique bloc de données partagé (notes, planning, particuliers,
// commerces appelés) dans la base Upstash Redis connectée au projet.
// Tous les appareils partagent le même contenu.
//
// Les identifiants viennent des variables d'environnement injectées par
// l'intégration Vercel/Upstash (KV_REST_API_URL / KV_REST_API_TOKEN).

const REST_URL =
  process.env.KV_REST_API_URL ||
  process.env.STORAGE_KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL ||
  "";
const REST_TOKEN =
  process.env.KV_REST_API_TOKEN ||
  process.env.STORAGE_KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  "";

const KEY = "walletiz:data";

async function redis(command) {
  const r = await fetch(REST_URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + REST_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  if (!r.ok) throw new Error("Redis HTTP " + r.status);
  return r.json();
}

module.exports = async (req, res) => {
  // Base non configurée → on le signale au client (il reste en mode local).
  if (!REST_URL || !REST_TOKEN) {
    res.status(200).json({ configured: false });
    return;
  }

  try {
    if (req.method === "GET") {
      const j = await redis(["GET", KEY]);
      let data = null;
      if (j && j.result) {
        try { data = JSON.parse(j.result); } catch { data = null; }
      }
      res.status(200).json({ configured: true, data });
      return;
    }

    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") {
        try { body = JSON.parse(body); } catch { body = {}; }
      }
      const data = body && body.data;
      if (data === undefined) {
        res.status(400).json({ error: "Données manquantes." });
        return;
      }
      await redis(["SET", KEY, JSON.stringify(data)]);
      res.status(200).json({ configured: true, ok: true });
      return;
    }

    res.status(405).json({ error: "Méthode non autorisée." });
  } catch (err) {
    res.status(502).json({ error: "Base injoignable : " + (err.message || err) });
  }
};
