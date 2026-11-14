import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { computeDynamicShadowMask, findOptimalLunarRoute } from "../src/pathfinder.js";
import { I18N } from "../src/i18n.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const datasetPath = path.join(rootDir, "public", "data", "shackleton_pds_grid.json");
const htmlPath = path.join(rootDir, "index.html");
const mainJsPath = path.join(rootDir, "src", "main.js");

const dataset = JSON.parse(fs.readFileSync(datasetPath, "utf-8"));
const html = fs.readFileSync(htmlPath, "utf-8");
const mainJs = fs.readFileSync(mainJsPath, "utf-8");

console.log("=== 1. VERIFYING SHACKLETON PDS DATASET ===");
const N = dataset.metadata.grid_size;
if (N !== 128 || dataset.elevation_m.length !== 128) {
  throw new Error("Invalid grid dimensions");
}
console.log(`[PASS] Grid Size: ${N}x${N} (${dataset.metadata.domain_km}x${dataset.metadata.domain_km} km)`);

console.log("\n=== 2. VERIFYING 4D A* PATHFINDER ON ALL 4 ARTEMIS PRESETS ===");
for (const preset of dataset.presets) {
  const mask = computeDynamicShadowMask(dataset, preset.sun_azimuth, 1.6);
  const res = findOptimalLunarRoute(dataset, mask, {
    start: preset.start,
    goal: preset.goal,
    maxSlope: preset.max_slope,
    weightSlope: preset.weights.slope,
    weightShadow: preset.weights.shadow,
    weightComms: preset.weights.comms
  });

  const t = res.telemetry;
  if (res.waypoints.length < 5) {
    throw new Error(`Route too short for preset ${preset.id}`);
  }
  console.log(
    `[PASS] ${preset.id.padEnd(24)} | WP: ${String(res.waypoints.length).padStart(2)} | Dist: ${t.distanceKm} km | MET: ${t.durationFormatted} | Batt: ${t.batteryRemainingPct}% | MaxSlope: ${t.maxSlopeDeg}° | Ice: ${t.maxIceWt}wt% | Verdict: ${t.verdict} (${res.computeMs}ms)`
  );
}

console.log("\n=== 3. VERIFYING DOM IDs & BILINGUAL I18N INTEGRITY ===");
const idMatches = [... mainJs.matchAll(/getElementById\("([^"]+)"\)/g)].map((m) => m[1]);
for (const id of idMatches) {
  if (!html.includes(`id="${id}"`)) {
    throw new Error(`Missing DOM id="${id}" in index.html`);
  }
}
console.log(`[PASS] All ${idMatches.length} explicit DOM IDs referenced in src/main.js exist in index.html`);

if (I18N.en.slides.length !== 7 || I18N.es.slides.length !== 7) {
  throw new Error("Pitch deck must have exactly 7 slides in both EN and ES");
}
console.log("[PASS] 7-Slide Pitch Deck verified in both English and Español");
console.log("\nALL CHECKS PASSED WITH ZERO ERRORS.");
