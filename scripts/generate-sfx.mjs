/**
 * Génère les bruitages (SFX) de la vidéo, synthétisés en WAV — 100 % offline.
 * Sortie : public/sfx/*.wav (mono, 44.1 kHz, 16-bit PCM).
 * Lancer : node scripts/generate-sfx.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const SR = 44100;
const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "sfx");
fs.mkdirSync(outDir, { recursive: true });

// --- utilitaires ---
const clamp = (x) => Math.max(-1, Math.min(1, x));
const env = (t, dur, attack = 0.005, release = 0.2) => {
  if (t < attack) return t / attack;
  const r = dur - release;
  if (t > r) return Math.max(0, 1 - (t - r) / release);
  return 1;
};

function writeWav(name, samples, gain = 0.9) {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 2, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(1, 22); // mono
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    const v = clamp(samples[i] * gain);
    buf.writeInt16LE(Math.round(v * 32767), 44 + i * 2);
  }
  fs.writeFileSync(path.join(outDir, name), buf);
  console.log("écrit", name, (n / SR).toFixed(2) + "s");
}

const make = (dur, fn) => {
  const n = Math.floor(dur * SR);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) s[i] = fn(i / SR, i);
  return s;
};

// Bruit filtré (one-pole lowpass) pour des whoosh doux.
function lowpass(samples, cutoff = 0.15) {
  let y = 0;
  const out = new Float32Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    y += cutoff * (samples[i] - y);
    out[i] = y;
  }
  return out;
}

// --- 1. WHOOSH (transition de scène) ---
{
  const dur = 0.55;
  const noise = make(dur, () => Math.random() * 2 - 1);
  const lp = lowpass(noise, 0.08);
  const s = make(dur, (t, i) => {
    const e = env(t, dur, 0.06, 0.3);
    // enveloppe en cloche + léger sifflement descendant
    const bell = Math.sin((Math.PI * t) / dur);
    const air = Math.sin(2 * Math.PI * (700 - 500 * (t / dur)) * t) * 0.15;
    return (lp[i] * 2.2 + air) * e * bell;
  });
  writeWav("whoosh.wav", s, 0.6);
}

// --- 2. IMPACT (slam d'un grand élément) ---
{
  const dur = 0.45;
  const s = make(dur, (t) => {
    const e = env(t, dur, 0.002, 0.35);
    const freq = 90 - 45 * Math.min(1, t / 0.2); // descente 90→45 Hz
    const body = Math.sin(2 * Math.PI * freq * t);
    const click = t < 0.02 ? (Math.random() * 2 - 1) * (1 - t / 0.02) : 0;
    return (body * 0.9 + click * 0.6) * e;
  });
  writeWav("impact.wav", s, 0.95);
}

// --- 3. POP (apparition d'une carte / élément) ---
{
  const dur = 0.16;
  const s = make(dur, (t) => {
    const e = env(t, dur, 0.002, 0.12);
    const freq = 520 + 380 * (t / dur); // léger pitch up
    return Math.sin(2 * Math.PI * freq * t) * e;
  });
  writeWav("pop.wav", s, 0.5);
}

// --- 4. RISER (montée de tension avant une preuve) ---
{
  const dur = 0.7;
  const noise = lowpass(make(dur, () => Math.random() * 2 - 1), 0.05);
  const s = make(dur, (t, i) => {
    const amp = Math.pow(t / dur, 2); // amplitude croissante
    const freq = 200 + 600 * (t / dur); // 200→800 Hz
    const tone = Math.sin(2 * Math.PI * freq * t);
    return (tone * 0.7 + noise[i] * 1.5) * amp;
  });
  writeWav("riser.wav", s, 0.4);
}

// --- 5. TICK (incrément de compteur) ---
{
  const dur = 0.03;
  const s = make(dur, (t) => {
    const e = env(t, dur, 0.001, 0.028);
    return Math.sin(2 * Math.PI * 1300 * t) * e;
  });
  writeWav("tick.wav", s, 0.35);
}

// --- 6. CHIME (écran de fin) ---
{
  const dur = 0.9;
  const partials = [523.25, 784, 1046.5]; // Do–Sol–Do
  const s = make(dur, (t) => {
    const e = env(t, dur, 0.005, 0.6);
    let v = 0;
    partials.forEach((f, k) => {
      const start = k * 0.06;
      if (t >= start) v += Math.sin(2 * Math.PI * f * (t - start)) * Math.pow(0.5, k);
    });
    return v * e;
  });
  writeWav("chime.wav", s, 0.4);
}

console.log("SFX générés dans", outDir);
