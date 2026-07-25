# CityStory — version photoréaliste (footage IA + overlays Remotion)

> Objectif : mêmes beats que la séquence animée `CityStory`, mais en **prises réelles**
> (vraies personnes, vrais bâtiments) générées par IA vidéo, puis **habillées en Remotion**
> pour l'UI Walletiz (notifications, QR, carte de fidélité, titres) — nette et à la charte.

## Pipeline
1. Générer chaque plan en clip IA (Higgsfield — Kling 3.0 / Seedance), 16:9, ~5 s.
2. Importer les clips dans Remotion (`<OffthreadVideo>`), les enchaîner.
3. Superposer les éléments Up Walletiz (bulles push, QR, carte, titres) déjà codés dans `src/city/`.
4. Ajouter voix off + bruitages, rendre le MP4 final.

## Coût estimé
- ~7,5 crédits / clip 5 s (Kling 3.0 Turbo). 6 plans ≈ **45 crédits**.
- Option éco : moins de plans, ou 1 clip héro (l'ouverture) à 7,5 crédits pour tester.

---

## Plans & prompts (EN — les modèles répondent mieux en anglais)

### Plan 1 — Descente drone à travers les nuages
> Cinematic aerial drone shot at dusk, slowly descending through soft low clouds that
> partially blur the frame, revealing a lively European city street below with warm shop
> lights, wet pavement reflections, shallow depth of field, photorealistic, 35mm, film grain.
- **Overlay Remotion** : titre « Comment Walletiz propulse votre commerce » (mot par mot).

### Plan 2 — Le bâtiment aux 3 commerces
> Photorealistic ground-level shot of a modern building housing three adjacent storefronts
> at dusk, warm interior lighting, a burger restaurant with blue signage, a coffee shop with
> dark-beige signage, a beauty salon with light-beige signage, clean facades, people walking
> by, shallow depth of field, cinematic.
- **Overlay** : logos + noms (Top Burger / Café Tropic / Onyx Beauty) en incrustation nette.

### Plan 3 — Le commerçant envoie sa campagne
> Photorealistic medium shot of a friendly shop owner standing in front of their storefront,
> looking down and tapping on a smartphone screen, warm evening light, bokeh background,
> genuine expression, cinematic, 50mm.
- **Overlay** : grand écran Walletiz « Envoyer → Envoyé ✓ » (composant `BigPhone`).

### Plan 4 — Les passants reçoivent la notification
> Photorealistic street scene, several diverse pedestrians walking on a sidewalk at dusk,
> each glancing at their smartphone, warm city lights, candid, shallow depth of field, cinematic.
- **Overlay** : 3 bulles de notification push (composant `PushBubble`) + badges.

### Plan 5 — Scan du QR au comptoir
> Photorealistic close-up inside a burger restaurant at the checkout counter, a customer's
> hand holding a smartphone scanning a QR code standing on the counter, warm lighting,
> shallow depth of field, cinematic, appetizing.
- **Overlay** : QR net (`QRCode`) + carte de fidélité « +1 tampon » (Remotion).

### (Option) Plan 6 — Écran de fin
> Reprendre l'outro Walletiz existante (logo + CTA) en motion-design.

---

## Notes
- Le texte lisible (notifs, QR, carte, titres) reste **toujours** en Remotion : les modèles
  vidéo IA rendent le texte illisible.
- La version animée actuelle (`CityStory`) sert d'**animatic / storyboard** — même cadrage,
  même timing, même récit.
