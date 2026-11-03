# Portofolio — Traya Putra

Website portofolio pribadi yang dibangun dengan **React 18 + TypeScript + Vite**.
Seluruh konten terpusat di satu file data, styling memakai CSS murni (tanpa framework CSS).

## ✨ Fitur

- **Dark / Light mode** — tersimpan di `localStorage`, mengikuti preferensi sistem, tanpa "flash" warna saat load (script inline di `index.html`).
- **Responsif** — layout adaptif mobile → desktop, navigasi mobile di layar kecil.
- **Animasi scroll reveal** — `IntersectionObserver` lewat hook `useInView`, hemat performa.
- **Efek typing** pada judul hero dan **counter angka** animasi (`useCountUp`).
- **Filter proyek** berdasarkan kategori, dihitung dengan `useMemo`.
- **Form kontak** dengan validasi inline + kirim via `mailto:` (tanpa backend).
- **Aksesibilitas** — skip link, `aria-*`, navigasi keyboard, dan dukungan `prefers-reduced-motion`.
- **Progress bar** baca di atas halaman + indikator section aktif di navbar (`useScrollProgress`, `useActiveSection`).
- **SEO & social meta** (Open Graph, theme-color, favicon SVG).

## 📁 Struktur

```
.
├── index.html                  # entry Vite + meta & anti-flash theme
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx                # bootstrap React
│   ├── App.tsx                 # susunan halaman
│   ├── data/
│   │   └── site.ts             # SEMUA konten: profil, skill, proyek, pengalaman, kontak
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useInView.ts
│   │   ├── useCountUp.ts
│   │   ├── useScrollProgress.ts
│   │   └── useActiveSection.ts
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── sections/           # Hero, About, Skills, Projects, Experience, Contact
│   │   └── ui/                 # Reveal, ThemeToggle, ScrollProgress, SkipLink, BackToTop, SectionHeader
│   ├── styles/
│   │   └── global.css          # design token + seluruh styling
│   └── vite-env.d.ts
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Menjalankan

Butuh Node.js 18+.

```bash
npm install
npm run dev        # server dev di http://localhost:5173
```

Perintah lain:

```bash
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + build produksi ke dist/
npm run preview    # pratinjau hasil build
```

## 🎨 Kustomisasi

| Yang ingin diubah | Lokasi |
| --- | --- |
| Nama, role, tagline, tentang, lokasi | `src/data/site.ts` |
| Daftar proyek & filter kategori | `src/data/site.ts` → `projects`, `projectFilters` |
| Skill, pengalaman, kontak | `src/data/site.ts` → `skills`, `experiences`, `contactItems` |
| Kata-kata efek typing | `src/data/site.ts` → `profile.typing` |
| Warna, radius, font, spacing | `src/styles/global.css` → blok `:root` |
| Meta SEO & judul halaman | `index.html` |

## 📦 Deploy

**Vercel** — framework terdeteksi otomatis sebagai Vite:

| Setting | Nilai |
| --- | --- |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

**GitHub Pages** — `base: "./"` di `vite.config.ts` membuat hasil build bisa dibuka dari sub-folder.
Jalankan `npm run build`, lalu publikasikan isi folder `dist/`.

## 📄 Lisensi

Bebas dipakai dan dimodifikasi untuk keperluan pribadi.
