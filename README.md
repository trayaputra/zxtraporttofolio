# Portofolio — Traya Putra

Website portofolio pribadi, dibuat dengan **HTML, CSS, dan JavaScript murni** (tanpa framework, tanpa build step). Cukup buka `index.html` atau host langsung lewat GitHub Pages.

## ✨ Fitur

- **Dark / Light mode** — tersimpan di `localStorage`, otomatis mengikuti preferensi sistem.
- **Responsif** — layout adaptif dari mobile hingga desktop, menu hamburger di layar kecil.
- **Animasi scroll reveal** — menggunakan `IntersectionObserver`, hemat performa.
- **Efek typing** pada judul hero dan **counter angka** animasi.
- **Filter proyek** berdasarkan kategori (Web App / UI / Tools).
- **Form kontak** dengan validasi inline + kirim via `mailto:`.
- **Aksesibilitas** — skip link, `aria-*`, navigasi keyboard, dan dukungan `prefers-reduced-motion`.
- **Progress bar** baca di atas halaman + indikator section aktif di navbar.
- **SEO & social meta** (Open Graph, theme-color, favicon SVG).

## 📁 Struktur

```
.
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       └── favicon.svg
└── README.md
```

## 🚀 Menjalankan

Buka file `index.html` langsung di browser:

```bash
# atau jalankan server statis lokal
npx serve .
```

## 🎨 Kustomisasi

| Yang ingin diubah | Lokasi |
| --- | --- |
| Warna, radius, font | `assets/css/style.css` → blok `:root` |
| Nama, deskripsi, proyek | `index.html` |
| Kata-kata efek typing | `assets/js/main.js` → variabel `words` |
| Alamat email kontak | `index.html` & `assets/js/main.js` (`mailto:`) |

## 📦 Deploy ke GitHub Pages

1. Buka **Settings → Pages** di repository.
2. Pada *Source*, pilih branch `main` dan folder `/ (root)`.
3. Simpan, lalu akses `https://<username>.github.io/<repo>/`.

## 📄 Lisensi

Bebas dipakai dan dimodifikasi untuk keperluan pribadi.
