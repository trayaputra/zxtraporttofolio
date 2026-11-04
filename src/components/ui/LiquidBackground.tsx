/* ============================================================
   Lapisan latar "liquid glass".

   Struktur (dari belakang ke depan):
     1. base      → gradien radial dasar di atas warna --bg
     2. blob 1-4  → massa warna yang terdistorsi filter #liquid-warp
     3. caustics  → pantulan cahaya terdistorsi filter #liquid-caustic
     4. grain     → noise film tipis agar tidak terlihat "digital halus"
     5. vignette  → peredup tepi supaya konten tetap terbaca

   Posisinya fixed + z-index negatif + pointer-events none, jadi tidak
   mengganggu layout maupun interaksi. Panel kaca di atasnya mengambil
   warna dari lapisan ini lewat backdrop-filter.
   ============================================================ */

export function LiquidBackground() {
  return (
    <div className="liquid-bg" aria-hidden="true">
      <span className="liquid-bg__base" />
      <span className="liquid-bg__blob liquid-bg__blob--1" />
      <span className="liquid-bg__blob liquid-bg__blob--2" />
      <span className="liquid-bg__blob liquid-bg__blob--3" />
      <span className="liquid-bg__blob liquid-bg__blob--4" />
      <span className="liquid-bg__caustics" />
      <span className="liquid-bg__grain" />
      <span className="liquid-bg__vignette" />
    </div>
  );
}
