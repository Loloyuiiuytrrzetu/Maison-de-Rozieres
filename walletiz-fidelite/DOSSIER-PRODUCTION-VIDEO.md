# 🎬 Dossier de production — Vidéo promotionnelle **Walletiz Fidélité**

> Dossier prêt à tourner. Toute la matière (style, voix off, prompts vidéo plan par plan, montage) est spécifiée pour un rendu via le workflow **video-explainer** de Higgsfield, sans avoir à rien réécrire. Il ne reste qu'à lancer les générations une fois le budget crédits disponible.

---

## 1. Résumé du projet

| | |
|---|---|
| **Produit** | Walletiz Fidélité — SaaS de carte de fidélité digitale par QR code, sans application à télécharger |
| **Cible** | Commerçants & restaurateurs |
| **Durée** | 60 s (6 blocs de 10 s) — extensible à 90 s (9 blocs) |
| **Format** | 9:16 (réseaux sociaux) **et** 16:9 (site / YouTube) — mêmes prompts, on change juste l'aspect du *style key* |
| **Ton** | Professionnel, énergique, orienté résultats |
| **Style visuel** | Flat 2D vectoriel moderne, **non photoréaliste** (règle du workflow) |

### 🎨 Direction artistique
- **Couleur principale :** rouge **bordeaux profond** (`#6B1F2A`, accents `#8E2436`) sur titres, boutons, transitions, éléments d'UI.
- **Fond :** blanc dominant (`#FFFFFF` / `#F7F5F4`), épuré mais avec du punch.
- **Rythme :** transitions énergiques (wipes, snap zooms), animations fluides, contrastes marqués, montage soutenu.
- **Accent secondaire :** doré discret (`#C9A24B`) uniquement pour les récompenses / le premium.

---

## 2. 💰 Budget crédits (Higgsfield)

| Étape | Coût unitaire | Version 60 s (6 blocs) | Version 90 s (9 blocs) |
|---|---|---|---|
| Style key (image `nano_banana_pro`) | 2 cr | 2 | 2 |
| Clip vidéo 10 s (`gemini_omni`, 720p) | **30 cr** | 180 | 270 |
| Voix off / bloc (`seed_audio`) | 0,3 cr | 1,8 | 2,7 |
| Montage (`explainer_video`) | gratuit | 0 | 0 |
| Sous-titres (option, `patrick`) | 0,05 cr / bloc | +0,3 | +0,45 |
| **Total estimé** | | **≈ 184 cr** | **≈ 275 cr** |

> ⚠️ Le poste vidéo domine tout : 30 crédits par plan. Pour un premier test à petit budget, on peut ne rendre que **le style key + 1 ou 2 blocs clés** (l'accroche + le CTA) puis compléter.

---

## 3. 🖼️ Style key (Phase 1 — image de référence unique)

Image générée **une seule fois**, attachée comme référence à **chaque** clip pour verrouiller le look. Aspect `9:16` pour la version verticale, `16:9` pour l'horizontale.

**Outil :** `generate_image` · **modèle :** `nano_banana_pro`

```
Prompt (EN) :
Flat 2D vector illustration style frame, premium modern SaaS brand aesthetic.
Dominant clean white background (#FFFFFF), deep bordeaux red accents (#6B1F2A and #8E2436)
on shapes, buttons and UI cards, subtle gold highlight (#C9A24B) reserved for reward elements.
Crisp geometric shapes, smooth gradients, soft long shadows, rounded UI cards, bold clean
sans-serif typographic feel, high contrast, energetic and airy composition.
A small friendly shopkeeper character and a smartphone showing a QR code and digital loyalty
stamps. Non-photorealistic, no live-action, no realism, no 3D render, no photographic texture.
aspect_ratio: 9:16   (ou 16:9 pour l'horizontal)
```

➡️ Conserver le **job id** de cette image → c'est la valeur `medias[].role:"image"` de tous les clips.

**Tokens STYLE réutilisables** (à recopier en tête de chaque prompt de bloc) :
`flat 2D vector, clean white background, deep bordeaux red (#6B1F2A) accents, subtle gold reward highlight, rounded UI cards, soft long shadows, high contrast, premium modern SaaS look`

---

## 4. 🎙️ Voix off — Phases 2 (narration FR, un bloc = un clip de 10 s)

> Chaque ligne vise **8–9 secondes** de parole (~20–24 mots). Nombres écrits en toutes lettres. Texte parlé nu, sans didascalie.
> **Voix :** appeler `list_voices`, choisir **une** voix FR chaleureuse et dynamique, réutiliser le même `voice_id` + `voice_type` sur les 6 blocs.

**Bloc 1 — Accroche**
> Vos clients viennent une fois… puis vous oublient. Et si chaque visite les donnait envie de revenir, encore et encore, dans votre commerce ?

**Bloc 2 — La solution**
> Walletiz Fidélité change tout. Le client scanne un simple QR code, collecte ses tampons digitaux, débloque ses récompenses. Aucune application à installer.

**Bloc 3 — Notifications en action**
> Tout se passe en temps réel. Tampon validé, récompense débloquée, client de retour : chaque interaction vit sur son téléphone, à l'instant même.

**Bloc 4 — Dashboard / statistiques**
> Et vous, vous pilotez tout. Clients fidèles en hausse, tampons collectés, taux de retour, récompenses distribuées : vos vraies statistiques, en un coup d'œil.

**Bloc 5 — Propulser les commerces**
> Résultat : plus de clients qui reviennent, un chiffre d'affaires qui grimpe, et un commerce local qui se démarque vraiment de la concurrence.

**Bloc 6 — Call to action**
> Walletiz Fidélité. La fidélité digitale, simple et sans application. Adoptez-la dès aujourd'hui. Contactez-nous et propulsez votre commerce.

---

## 5. 🎞️ Prompts vidéo — Phase 3 (un par bloc, en anglais)

> Template du workflow. Attacher le **style key** à chaque clip. `AUDIO` = ambiance/SFX uniquement (la voix est ajoutée au montage, jamais dans le clip).
> **Outil :** `generate_video` · **modèle :** `gemini_omni` · `duration: 10` · `resolution: "720p"` · `medias:[{value:"<style key job id>", role:"image"}]` · **ne pas** passer d'`aspect_ratio` (hérité du style key).

### Bloc 1 — Accroche
```
STYLE REFERENCE: Match the attached style key EXACTLY — flat 2D vector, clean white background,
deep bordeaux red (#6B1F2A) accents, rounded UI cards, soft long shadows, high contrast, premium SaaS look.
SCENE: A friendly shopkeeper stands behind a counter looking a little worried as a customer walks
out the door; a faded "goodbye" arrow and an empty loyalty card float away. Strong hook energy.
MOTION: Fast push-in on the shopkeeper, the customer silhouette slides out, snappy bordeaux wipe transition.
AUDIO: upbeat energetic marketing music start, soft door-bell chime, light whoosh.
NEGATIVE: color drift, photorealism, 3D render, lip-sync, captions, on-screen text, watermark, realistic faces.
```

### Bloc 2 — La solution (QR + tampons)
```
STYLE REFERENCE: Match the attached style key EXACTLY — flat 2D vector, clean white background,
deep bordeaux red (#6B1F2A) accents, subtle gold reward highlight, rounded UI cards, premium SaaS look.
SCENE: A smartphone centered on screen scans a bordeaux QR code; digital loyalty stamps pop in one by
one onto a rounded card, then a gold reward badge unlocks with a sparkle. "No app to install" idea shown
as a crossed-out app store icon.
MOTION: Phone rises into frame, QR scan beam sweep, stamps stamp in with bouncy pops, reward badge scales up.
AUDIO: clean UI tap sounds, satisfying stamp pops, bright chime on reward, energetic music bed.
NEGATIVE: color drift, photorealism, 3D render, lip-sync, captions, on-screen text, watermark.
```

### Bloc 3 — Notifications en temps réel
```
STYLE REFERENCE: Match the attached style key EXACTLY — flat 2D vector, clean white background,
deep bordeaux red (#6B1F2A) accents, rounded UI cards, soft long shadows, premium SaaS look.
SCENE: Three rounded notification cards cascade onto the white screen in sequence — a stamp-validated card,
a reward-unlocked gold card, a returning-customer card — each with a small bordeaux icon, stacking neatly.
MOTION: Cards slide/bounce in from the right one after another, subtle parallax, gentle glow pulse on arrival.
AUDIO: crisp notification pings (three distinct tones), soft haptic ticks, driving music.
NEGATIVE: color drift, photorealism, 3D render, lip-sync, captions, real text paragraphs, watermark.
```

### Bloc 4 — Dashboard animé (statistiques)
```
STYLE REFERENCE: Match the attached style key EXACTLY — flat 2D vector, clean white background,
deep bordeaux red (#6B1F2A) chart accents, rounded UI cards, soft shadows, premium analytics SaaS look.
SCENE: A clean analytics dashboard builds itself — a rising bordeaux line chart of "clients fidèles",
animated bar chart of collected stamps, a circular gauge for return rate filling up, KPI number tiles
counting upward. Data-driven and confident.
MOTION: Charts draw on from left to right, bars grow upward, gauge sweeps, numbers count up, subtle camera drift.
AUDIO: soft data-blip ticks, rising confident synth, light UI clicks.
NEGATIVE: color drift, photorealism, 3D render, lip-sync, captions, dense unreadable text, watermark.
```
> 📊 **Chiffres à afficher** (placeholders — remplace par tes vraies stats Walletiz) : *Clients fidèles +38 %* · *12 400 tampons collectés* · *Taux de retour 61 %* · *3 200 récompenses distribuées*.

### Bloc 5 — Propulser les commerces
```
STYLE REFERENCE: Match the attached style key EXACTLY — flat 2D vector, clean white background,
deep bordeaux red (#6B1F2A) accents, subtle gold highlight, rounded shapes, premium SaaS look.
SCENE: The same shopkeeper now smiling, a happy crowd of customers streaming back into the shop,
an upward bordeaux growth arrow and a rising revenue coin stack; a small map pin marks the thriving local store.
MOTION: Customers flow in with a lively march, growth arrow shoots up, coins stack with bounce, warm zoom out.
AUDIO: cheerful crowd ambience, coin chimes, triumphant energetic music swell.
NEGATIVE: color drift, photorealism, 3D render, lip-sync, captions, on-screen text, watermark, realistic faces.
```

### Bloc 6 — Call to action final
```
STYLE REFERENCE: Match the attached style key EXACTLY — flat 2D vector, clean white background,
deep bordeaux red (#6B1F2A) accents, premium SaaS look, generous whitespace.
SCENE: The Walletiz logo animates to center on a clean white background, a bordeaux rounded CTA button
"Adoptez Walletiz Fidélité" pulses below, with space reserved for contact details (website / phone) at the bottom.
MOTION: Logo assembles with a smooth reveal, CTA button pulses once, subtle confetti of tiny bordeaux stamps, hold.
AUDIO: final music button / stinger, single confident chime, then settle.
NEGATIVE: color drift, photorealism, 3D render, lip-sync, watermark. (On-screen logo/text is intentional here.)
```
> 🔗 **À personnaliser au bloc 6 :** logo Walletiz réel, slogan, site web, téléphone / e-mail. Le logo et le texte peuvent être ajoutés proprement en post-production (ou via sous-titres/overlay) pour rester nets.

---

## 6. 🧩 Montage — Phase 6 (`explainer_video`, automatique)

Une fois les 6 clips et les 6 voix off rendus, assembler **dans l'ordre** :

```
explainer_video
  params:
    width: 720            # 1280 pour le 16:9
    height: 1280          # 720  pour le 16:9
    # subtitles: { font: "anton" }   # option punchy — décommenter si sous-titres voulus
    items:
      - { video: "<clip 1 job id>", audio: "<voix 1 job id>" }
      - { video: "<clip 2 job id>", audio: "<voix 2 job id>" }
      - { video: "<clip 3 job id>", audio: "<voix 3 job id>" }
      - { video: "<clip 4 job id>", audio: "<voix 4 job id>" }
      - { video: "<clip 5 job id>", audio: "<voix 5 job id>" }
      - { video: "<clip 6 job id>", audio: "<voix 6 job id>" }
```

- Chaque bloc = fenêtre fixe de 10 s → total exact **60 s**.
- Voix plus courte que 10 s → centrée ; légèrement plus longue → accélérée sans altérer la hauteur.
- **Musique :** l'outil ne génère pas de musique. Prévoir une piste rythmée libre de droits à poser au montage final (ou garder les ambiances des clips). Style suggéré : électro-pop corporate, 120–128 BPM, montée sur le bloc 5, stinger sur le bloc 6.

---

## 7. ✅ Checklist de tournage (ordre d'exécution)

1. `generate_image` (nano_banana_pro) → **style key** (garder le job id). *2 cr*
2. `list_voices` → choisir **une** voix FR (garder `voice_id` + `voice_type`).
3. `generate_video` (gemini_omni) × 6 → un clip par bloc, style key attaché. *180 cr*
4. `generate_audio` (seed_audio) × 6 → une voix off par bloc, même voix. *1,8 cr*
5. `explainer_video` → montage final → MP4. *gratuit*
6. (option) sous-titres `anton` au montage · musique posée en post.

---

## 8. 🔁 Variante 9:16 ↔ 16:9

Le seul changement entre les deux formats : l'**aspect du style key** (`9:16` ou `16:9`). Le `gemini_omni` hérite du cadrage de la référence, et le montage prend `720×1280` (vertical) ou `1280×720` (horizontal). Les prompts de bloc et la voix off sont **identiques**.

---

*Dossier généré comme livrable de préproduction. Aucun crédit dépensé. Prêt pour le rendu.*
