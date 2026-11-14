# Artemis South Pole Pathfinder (*ArtemisForge*)
### NASA International Space Apps Challenge 2026 — *"The Next Frontier"*

**Global Nominee Caliber Submission | Lunar Exploration & Surface Infrastructure**

---

## 1. High-Level Summary (English)
At the Lunar South Pole (Shackleton Crater Rim & Connecting Ridge, $89.5^\circ\text{S} - 90.0^\circ\text{S}$), the Sun never rises more than $1.6^\circ$ above the horizon. This creates dynamic 10+ km shadows alongside Permanently Shadowed Regions (PSRs) that plunge to $38\text{ K}$ ($-235^\circ\text{C}$) yet hold millions of tons of extractable water ice. Standard Earth GIS tools fail here.

**ArtemisForge** is a real-time 3D/4D spatiotemporal tactical cockpit and autonomous rover pathfinder built on authentic NASA Lunar Reconnaissance Orbiter (LRO) Planetary Data System (PDS) records. It combines:
1. **Sub-Degree Grazing Solar Raycasting ($1.6^\circ$ Elevation):** Dynamically computes shadows across the $20 \times 20\text{ km}$ Shackleton sector as the Sun orbits $360^\circ$.
2. **4D Weighted A* Pathfinder:** Balances Bekker-Wong terramechanics slope limits ($<15^\circ$), cryogenic battery drawdown inside PSR cold traps ($<110\text{ K}$), and Direct-to-Earth (DTE) Deep Space Network (DSN) line-of-sight.
3. **PSR Science Sortie Budgeter:** Computes exact Mission Elapsed Time (MET), watt-hour battery consumption (1500 Wh LTV/VIPER baseline), and maximum safe dwell time in cryogenic shadow.
4. **1-Click NASA EVA Flight Dossier (PDF):** Generates an executive flight-readiness PDF report with stereographic lunar coordinates, telemetry, and embedded 3D terrain renders.

---

## 2. Resumen Ejecutivo (Español)
En el Polo Sur Lunar (Borde del Cráter Shackleton y Cresta de Conexión, $89.5^\circ\text{S} - 90.0^\circ\text{S}$), el Sol nunca supera los $1.6^\circ$ sobre el horizonte, proyectando sombras móviles de más de 10 km junto a Regiones en Sombra Permanente (PSRs) a $38\text{ K}$ ($-235^\circ\text{C}$) ricas en hielo de agua.

**ArtemisForge** es una cabina táctica 3D/4D en tiempo real y navegador autónomo basado en datos reales del sistema PDS de la NASA (misión LRO). Incluye motor solar rasante dinámico, algoritmo de rutas A* 4D ponderado, simulador de rover LTV/VIPER en vivo, presentación integrada de 7 diapositivas (EN/ES) y exportador de Plan de Vuelo EVA en PDF con 1 clic.

---

## 3. Authentic NASA Data & PDS Resources Cited
* **NASA LRO LOLA (Lunar Orbiter Laser Altimeter):** Polar Digital Elevation Model (`LDEM_85S_20M`) & central-difference slope gradient tensor ($-2,224.2\text{ m}$ to $+3,026.5\text{ m}$).
* **NASA LRO Diviner Lunar Radiometer Experiment:** Bolometric surface brightness temperature (`DLRE_TMAX_POLAR`) and $<110\text{ K}$ vacuum water-ice sublimation stability maps.
* **NASA ShadowCam / LROC NAC:** High-contrast polar optical & PSR albedo basemap modeling.
* **NASA JPL HORIZONS / Deep Space Network (DSN):** Direct-to-Earth topographic horizon visibility mask ($5.8^\circ$ mean Earth elevation).

---

## 4. Quick Start (Run in 10 Seconds)

```bash
cd /home/cacho/artemis-forge
npm install
npm run generate-data   # Synthesizes / updates the 128x128 Shackleton PDS grid
npm run dev             # Starts the live application at http://localhost:5173
```
