/**
 * CityStory — séquence narrative :
 *  1. Vue aérienne de la ville + nuages, titre mot par mot.
 *  2. Zoom sur le bâtiment aux 3 commerces (+ 1 responsable devant chacun).
 *  3. Responsable + grand téléphone : il se penche et tape "Envoyer".
 *  4. Dézoom : les passants reçoivent la notification push des 3 commerces.
 *  5. Intérieur Top Burger : le client scanne le QR et récupère le tampon.
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { design } from "../design";
import { progress, useFloat, usePulse } from "../motion";
import { SfxTrack } from "../components/Sfx";
import { brands, brandList } from "../city/brands";
import { Person } from "../city/Person";
import { ShopFacade } from "../city/ShopFacade";
import { BigPhone } from "../city/BigPhone";
import { PushBubble } from "../city/PushBubble";
import { QRCode } from "../city/QRCode";
import { Clouds } from "../city/Clouds";

const { palette, gradients, fonts, fontWeights, textScale, spacing, radius, typography } =
  design;

/* ============================ Décors ============================ */

// Vue aérienne : toits sombres avec fenêtres allumées.
const AerialCity: React.FC = () => {
  const cells: React.ReactNode[] = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  for (let gy = 0; gy < 5; gy++) {
    for (let gx = 0; gx < 8; gx++) {
      const w = 150 + rnd() * 70;
      const h = 130 + rnd() * 70;
      const shade = 14 + Math.floor(rnd() * 16);
      cells.push(
        <div
          key={`${gx}-${gy}`}
          style={{
            position: "absolute",
            left: gx * 240 + 30 + rnd() * 20,
            top: gy * 210 + 30 + rnd() * 20,
            width: w,
            height: h,
            background: `rgb(${shade},${shade + 6},${shade + 14})`,
            borderRadius: 6,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 12 + (i % 3) * (w / 3.4),
                top: 14 + Math.floor(i / 3) * (h / 2.6),
                width: 14,
                height: 14,
                borderRadius: 3,
                background: rnd() > 0.5 ? palette.attention : palette.info,
                opacity: rnd() > 0.35 ? 0.85 : 0.15,
              }}
            />
          ))}
        </div>,
      );
    }
  }
  return (
    <AbsoluteFill style={{ background: gradients.fondScene }}>
      {/* rues */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(38,54,74,0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(38,54,74,0.5) 2px, transparent 2px)",
          backgroundSize: "240px 210px",
          opacity: 0.5,
        }}
      />
      {cells}
    </AbsoluteFill>
  );
};

// Sol de rue (trottoir + chaussée) partagé.
const Ground: React.FC<{ top?: number }> = ({ top = 760 }) => (
  <>
    <div style={{ position: "absolute", left: 0, right: 0, top, height: 60, background: "#2A3846" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: top + 60, bottom: 0, background: "#121A24" }} />
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: top + 96,
        height: 6,
        backgroundImage: `repeating-linear-gradient(90deg, ${palette.attention} 0 46px, transparent 46px 92px)`,
        opacity: 0.6,
      }}
    />
  </>
);

/* ============================ Plan 1 — Aérien + titre ============================ */

const Shot1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = interpolate(frame, [0, 195], [1.05, 1.2], { extrapolateRight: "clamp" });
  const cloudCover = interpolate(frame, [40, 90], [1, 0.55], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const words = ["Comment", "Walletiz", "propulse", "votre", "commerce"];

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <AerialCity />
      </AbsoluteFill>
      <Clouds cover={cloudCover} />
      {/* scrim pour lisibilité */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, rgba(10,15,22,0.55) 0%, transparent 60%)" }} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: spacing.safe }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 22, maxWidth: 1500 }}>
          {words.map((w, i) => {
            const s = spring({ frame: frame - 55 - i * 9, fps, config: design.springs.bounce });
            const op = interpolate(s, [0, 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <span
                key={i}
                style={{
                  fontFamily: fonts.titres,
                  fontWeight: fontWeights.bold,
                  fontSize: 92,
                  letterSpacing: typography.letterSpacing.tight,
                  color: w === "Walletiz" ? palette.bordeauxLueur : palette.blancCasse,
                  opacity: op,
                  transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px) scale(${interpolate(s, [0, 1], [0.6, 1])})`,
                  textShadow: "0 6px 30px rgba(0,0,0,0.6)",
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ============================ Plan 2 — Bâtiment 3 commerces ============================ */

const managerOutfit: Record<string, string> = { burger: "#2E7DD1", cafe: "#8B6A45", beauty: "#6E5A44" };

const Shot2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = interpolate(frame, [0, 135], [1.15, 1.3], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: gradients.fondScene }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 60%" }}>
        <Ground top={780} />
        {/* Bâtiment : 3 devantures accolées */}
        <div style={{ position: "absolute", left: "50%", top: 250, transform: "translateX(-50%)", display: "flex", gap: 10 }}>
          {brandList.map((b, i) => {
            const s = spring({ frame: frame - 6 - i * 8, fps, config: design.springs.punchy });
            return (
              <div key={b.key} style={{ opacity: interpolate(s, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }), transform: `translateY(${interpolate(s, [0, 1], [-40, 0])}px)` }}>
                <ShopFacade brand={b} width={420} height={530} />
              </div>
            );
          })}
        </div>
        {/* 3 responsables devant */}
        <div style={{ position: "absolute", left: "50%", top: 620, transform: "translateX(-50%)", display: "flex", gap: 200 }}>
          {brandList.map((b, i) => {
            const s = spring({ frame: frame - 40 - i * 8, fps, config: design.springs.bounce });
            return (
              <div key={b.key} style={{ width: 220, display: "flex", justifyContent: "center", opacity: interpolate(s, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }), transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})` }}>
                <Person outfit={managerOutfit[b.key]} phoneGlow={b.accent} height={240} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <Title section="Le bâtiment" />
    </AbsoluteFill>
  );
};

/* ============================ Plan 3 — Responsable + grand téléphone ============================ */

const Shot3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = brands.beauty;
  const zoom = interpolate(frame, [0, 30, 165], [0.9, 1.05, 1.12], { extrapolateRight: "clamp" });
  // Le responsable se penche entre 55 et 80 ; le tap du téléphone entre 60 et 110.
  const bend = interpolate(frame, [55, 82], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tap = interpolate(frame, [60, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sent = interpolate(frame, [104, 112], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phoneIn = spring({ frame: frame - 20, fps, config: design.springs.bounce });

  return (
    <AbsoluteFill style={{ background: gradients.fondScene }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "60% 55%" }}>
        <Ground top={800} />
        {/* Devanture du commerce (gauche) */}
        <div style={{ position: "absolute", left: 120, top: 210 }}>
          <ShopFacade brand={b} width={560} height={640} />
        </div>
        {/* Responsable (centre) qui se penche, juste à gauche du téléphone */}
        <div style={{ position: "absolute", left: 960, top: 470 }}>
          <Person outfit={managerOutfit.beauty} phoneGlow={b.accent} height={360} bend={bend} />
        </div>
        {/* Grand téléphone (milieu-droite) */}
        <div
          style={{
            position: "absolute",
            right: 300,
            top: 210,
            opacity: interpolate(phoneIn, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(phoneIn, [0, 1], [80, 0])}px) scale(${interpolate(phoneIn, [0, 1], [0.7, 1])})`,
          }}
        >
          <BigPhone width={380} tap={tap} sent={sent} />
        </div>
      </AbsoluteFill>
      <Title section="Il envoie sa campagne" />
    </AbsoluteFill>
  );
};

/* ============================ Plan 4 — Passants + notifications ============================ */

const passers = [
  { x: 120, outfit: "#A81D45", brand: "burger" as const },
  { x: 440, outfit: "#3AB7F0", brand: null },
  { x: 720, outfit: "#3ED598", brand: "cafe" as const },
  { x: 1020, outfit: "#F4A73B", brand: null },
  { x: 1300, outfit: "#8B6A45", brand: "beauty" as const },
  { x: 1600, outfit: "#A2B4C6", brand: null },
];

const Shot4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = interpolate(frame, [0, 40], [1.25, 1.0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: gradients.fondScene }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 50%" }}>
        {/* Bâtiment réduit en haut */}
        <div style={{ position: "absolute", left: "50%", top: 60, transform: "translateX(-50%) scale(0.5)", display: "flex", gap: 10, opacity: 0.9 }}>
          {brandList.map((b) => (
            <ShopFacade key={b.key} brand={b} width={420} height={430} />
          ))}
        </div>
        <Ground top={780} />
        {/* Passants, tous avec un téléphone */}
        {passers.map((p, i) => {
          const walk = useFloatSafe(frame, fps, 6, 0.4, i);
          return (
            <div key={i} style={{ position: "absolute", left: p.x, top: 560 + walk }}>
              <Person outfit={p.outfit} height={230} phoneGlow={palette.bordeauxLueur} />
              {/* petit badge de notif sur chaque passant */}
              <NotifBadge frame={frame - 30 - i * 4} fps={fps} />
            </div>
          );
        })}
      </AbsoluteFill>

      {/* 3 grandes bulles de notification (une par commerce) */}
      <BubbleAt frame={frame} fps={fps} delay={44} x={70} y={150} brandKey="burger" />
      <BubbleAt frame={frame} fps={fps} delay={58} x={730} y={110} brandKey="cafe" />
      <BubbleAt frame={frame} fps={fps} delay={72} x={1390} y={170} brandKey="beauty" />

      <Title section="Tous vos clients, notifiés" />
    </AbsoluteFill>
  );
};

const NotifBadge: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const s = spring({ frame, fps, config: design.springs.bounce });
  return (
    <div
      style={{
        position: "absolute",
        right: -6,
        top: -6,
        width: 40,
        height: 40,
        borderRadius: 999,
        background: gradients.accentBordeaux,
        display: "grid",
        placeItems: "center",
        color: "#fff",
        fontFamily: fonts.labels,
        fontWeight: 700,
        fontSize: 22,
        transform: `scale(${s})`,
        boxShadow: `0 0 20px ${palette.bordeauxLueur}`,
      }}
    >
      1
    </div>
  );
};

const BubbleAt: React.FC<{ frame: number; fps: number; delay: number; x: number; y: number; brandKey: "burger" | "cafe" | "beauty" }> = ({ frame, fps, delay, x, y, brandKey }) => {
  const s = spring({ frame: frame - delay, fps, config: design.springs.bounce });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: interpolate(s, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
        transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px) scale(${interpolate(s, [0, 1], [0.8, 1])})`,
      }}
    >
      <PushBubble brand={brands[brandKey]} width={470} />
    </div>
  );
};

/* ============================ Plan 5 — Comptoir + QR + tampon ============================ */

const Shot5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = brands.burger;
  const scan = interpolate(frame, [40, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampPop = spring({ frame: frame - 92, fps, config: design.springs.bounce });
  const beamY = interpolate(scan, [0, 1], [0, 190]);

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${b.facadeDark} 0%, #0E1620 70%)` }}>
      {/* Bandeau enseigne / menu au fond */}
      <div style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 60, height: 60, borderRadius: 14, background: b.sign, display: "grid", placeItems: "center" }}>
          <span style={{ fontFamily: fonts.titres, fontWeight: 700, color: "#fff", fontSize: 30 }}>T</span>
        </div>
        <span style={{ fontFamily: fonts.titres, fontWeight: 700, fontSize: 52, color: "#fff", letterSpacing: "0.04em" }}>TOP BURGER</span>
      </div>

      {/* Comptoir */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 300, background: "linear-gradient(180deg, #6E5236, #4A3722)", boxShadow: "0 -10px 40px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 300, height: 16, background: "#8B6A45" }} />

      {/* Borne QR sur le comptoir (gauche) */}
      <div style={{ position: "absolute", left: 360, bottom: 300 }}>
        <div style={{ width: 300, background: "#0F1620", borderRadius: 18, padding: 22, border: `2px solid ${palette.lisere}`, transform: "translateY(-40px)" }}>
          <div style={{ textAlign: "center", fontFamily: fonts.labels, letterSpacing: "0.14em", textTransform: "uppercase", color: palette.bordeauxLueur, fontSize: 18, marginBottom: 12 }}>Scannez pour votre tampon</div>
          <div style={{ position: "relative" }}>
            <QRCode size={240} />
            {/* faisceau de scan */}
            <div style={{ position: "absolute", left: 12, right: 12, top: 12 + beamY, height: 5, background: palette.alerte, boxShadow: `0 0 16px ${palette.alerte}`, opacity: scan > 0 && scan < 1 ? 0.9 : 0 }} />
          </div>
        </div>
      </div>

      {/* Client au comptoir (droite) tenant le téléphone */}
      <div style={{ position: "absolute", right: 380, bottom: 120 }}>
        <Person outfit="#A81D45" height={360} bend={interpolate(frame, [20, 40], [0.15, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} phoneGlow={palette.bordeauxLueur} />
      </div>

      {/* Carte de fidélité qui apparaît + tampon du jour */}
      <div style={{ position: "absolute", right: 180, top: 210, opacity: interpolate(frame, [70, 82], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <div style={{ width: 460, background: palette.ardoise, border: `1px solid ${palette.lisere}`, borderRadius: 20, padding: 26 }}>
          <div style={{ fontFamily: fonts.labels, letterSpacing: "0.14em", textTransform: "uppercase", color: palette.bordeauxLueur, fontSize: 18 }}>Carte de fidélité</div>
          <div style={{ fontFamily: fonts.titres, fontWeight: 700, color: "#fff", fontSize: 34, margin: "6px 0 18px" }}>Top Burger</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {Array.from({ length: 10 }).map((_, i) => {
              const filled = i < 6 || (i === 6 && stampPop > 0.2);
              const isNew = i === 6;
              return (
                <div
                  key={i}
                  style={{
                    aspectRatio: "1",
                    borderRadius: 999,
                    border: `2px solid ${palette.lisere}`,
                    background: filled ? gradients.accentBordeaux : "transparent",
                    display: "grid",
                    placeItems: "center",
                    color: "#fff",
                    fontFamily: fonts.labels,
                    fontSize: 22,
                    transform: isNew ? `scale(${interpolate(stampPop, [0, 1], [0, 1])})` : "scale(1)",
                    boxShadow: isNew && stampPop > 0.3 ? `0 0 20px ${palette.bordeauxLueur}` : "none",
                  }}
                >
                  {filled ? "★" : ""}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* étiquette +1 tampon */}
      <div style={{ position: "absolute", right: 300, top: 150, opacity: stampPop, transform: `scale(${interpolate(stampPop, [0, 1], [0.5, 1])})` }}>
        <div style={{ background: gradients.accentBordeaux, color: "#fff", fontFamily: fonts.titres, fontWeight: 700, fontSize: 30, padding: "10px 22px", borderRadius: 999, boxShadow: `0 0 30px ${palette.bordeauxLueur}` }}>
          +1 tampon du jour
        </div>
      </div>

      <Title section="Il récupère son tampon" />
    </AbsoluteFill>
  );
};

/* ============================ Habillage commun (léger) ============================ */

const Title: React.FC<{ section: string }> = ({ section }) => {
  const frame = useCurrentFrame();
  const pulse = usePulse(0.3);
  return (
    <>
      <div style={{ position: "absolute", top: spacing.lg, left: spacing.xl, display: "flex", alignItems: "center", gap: spacing.sm }}>
        <div style={{ width: 12, height: 12, borderRadius: 999, background: palette.bordeaux, boxShadow: `0 0 ${interpolate(pulse, [0, 1], [10, 22])}px ${palette.bordeauxLueur}` }} />
        <span style={{ fontFamily: fonts.titres, fontWeight: fontWeights.bold, fontSize: textScale.label, letterSpacing: typography.letterSpacing.kicker, color: palette.blancCasse }}>WALLETIZ</span>
        <span style={{ color: palette.lisere, fontFamily: fonts.labels }}>/</span>
        <span style={{ fontFamily: fonts.labels, fontSize: textScale.kicker, letterSpacing: typography.letterSpacing.kicker, textTransform: "uppercase", color: palette.grisEstompe }}>{section}</span>
      </div>
    </>
  );
};

// useFloat mais paramétrable par index sans hooks conditionnels.
const useFloatSafe = (frame: number, fps: number, amp: number, speed: number, phase: number) =>
  Math.sin((frame / fps) * speed * Math.PI * 2 + phase) * amp;

/* ============================ Montage ============================ */

const SHOTS = [
  { key: "aerial", dur: 195, node: <Shot1 />, sfx: [{ name: "whoosh" as const, volume: 0.5 }, { name: "riser" as const, at: 40, volume: 0.35 }] },
  { key: "building", dur: 135, node: <Shot2 />, sfx: [{ name: "whoosh" as const, volume: 0.5 }, { name: "pop" as const, at: 40, volume: 0.5 }, { name: "pop" as const, at: 48, volume: 0.5 }, { name: "pop" as const, at: 56, volume: 0.5 }] },
  { key: "phone", dur: 165, node: <Shot3 />, sfx: [{ name: "whoosh" as const, volume: 0.5 }, { name: "pop" as const, at: 20, volume: 0.5 }, { name: "impact" as const, at: 104, volume: 0.6 }] },
  { key: "push", dur: 165, node: <Shot4 />, sfx: [{ name: "whoosh" as const, volume: 0.5 }, { name: "pop" as const, at: 44, volume: 0.5 }, { name: "pop" as const, at: 58, volume: 0.5 }, { name: "pop" as const, at: 72, volume: 0.5 }] },
  { key: "counter", dur: 175, node: <Shot5 />, sfx: [{ name: "whoosh" as const, volume: 0.5 }, { name: "riser" as const, at: 40, volume: 0.3 }, { name: "impact" as const, at: 92, volume: 0.6 }, { name: "chime" as const, at: 96, volume: 0.5 }] },
];

const T = 12;
export const cityStoryDurationInFrames = SHOTS.reduce((a, s) => a + s.dur, 0) - (SHOTS.length - 1) * T;

export const CityStory: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: palette.nuitFroide }}>
      <TransitionSeries>
        {SHOTS.map((s, i) => (
          <React.Fragment key={s.key}>
            <TransitionSeries.Sequence durationInFrames={s.dur}>
              <AbsoluteFill>
                <SfxTrack cues={s.sfx} />
                {s.node}
              </AbsoluteFill>
            </TransitionSeries.Sequence>
            {i < SHOTS.length - 1 && (
              <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
            )}
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
