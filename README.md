# Walletiz — Lien d'avis Google

Petite app interne : tu saisis **nom du commerce + ville**, l'app interroge l'API
Google Places, récupère le `place_id`, et génère le lien direct
`https://search.google.com/local/writereview?placeid=PLACE_ID`
qui ouvre la fenêtre « laisser un avis » de Google.

> La clé Google reste **secrète côté serveur** (fonction serverless Vercel). Elle
> n'est jamais exposée dans le navigateur.

---

## Structure du projet

```
index.html        → la page web (nom + ville, affichage du lien)
api/place.js       → le backend serverless : appelle Google Places avec la clé cachée
.env.example       → modèle de fichier de configuration (clé API)
```

---

## Étape 1 — Créer la clé Google (à faire à la main)

1. Va sur https://console.cloud.google.com
2. Crée un projet (ou choisis-en un), puis **active la facturation** (obligatoire,
   mais gratuit jusqu'à un certain volume).
3. Menu **APIs & Services › Library** → cherche **« Places API (New) »** → **Enable**.
4. Menu **APIs & Services › Credentials › Create credentials › API key**.
5. Copie la clé. (Recommandé : clique **Edit** sur la clé → restreins-la à
   « Places API (New) » pour la sécurité.)

## Étape 2 — Configurer la clé

- **Sur Vercel** (pour le déploiement) : projet → **Settings › Environment
  Variables** → ajoute :
  - Name : `GOOGLE_PLACES_API_KEY`
  - Value : ta clé
- **En local** (pour tester) : copie `.env.example` en `.env.local` et colle ta clé.

## Étape 3 — Tester en local

```bash
npm install -g vercel   # une seule fois
vercel dev              # lance le site en local (http://localhost:3000)
```

## Étape 4 — Déployer

- Relie ce dépôt GitHub à un projet Vercel (Vercel → **Add New › Project** →
  importe `Maison-de-Rozieres`), ou lance `vercel` depuis le dossier.
- Vérifie que la variable `GOOGLE_PLACES_API_KEY` est bien renseignée sur Vercel.
- Une fois déployé, tu obtiens une URL accessible depuis ton téléphone.

---

## Note importante

Pour poster l'avis, **le client devra être connecté à son compte Google** — c'est
imposé par Google, on ne peut pas le contourner. Le lien ouvre directement la
fenêtre d'avis, c'est déjà le maximum possible.
