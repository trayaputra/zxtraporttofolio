Gambar Thumbnail Proyek
=======================

Letakkan gambar thumbnail di folder ini:

    public/images/projects/

Nama file yang dibaca kode (lihat src/data/site.ts):

    clouvia-ai.png      <- thumbnail proyek "Clouvia AI" (16:9, ±1200x675 px)
    clouvia-ai-fallback.png  <- opsional, cadangan bila file utama gagal dimuat

Cara menambahkan gambar (pilih salah satu):

1. Upload lewat web GitHub
   - Buka repository trayaputra/zxtraporttofolio
   - Masuk ke folder public/images/projects
   - Klik "Add file" -> "Upload files", pilih gambar, commit ke branch main.

2. Upload lewat git di komputer
   git add public/images/projects/clouvia-ai.png
   git commit -m "chore: tambah thumbnail Clouvia AI"
   git push origin main

Catatan penting
---------------
- Format yang didukung: .png, .jpg, .webp (webp paling ringan).
- Kalau ekstensinya berbeda (misal .jpg), ubah juga nilai `image`
  di src/data/site.ts agar cocok.
- Ukuran ideal 1200x675 (rasio 16:9). Gambar akan otomatis di-crop
  dengan object-fit: cover, jadi tidak akan gepeng.
- Kompres dulu sebelum upload supaya halaman tetap cepat.

Kalau gambar belum ada, kartu proyek TIDAK rusak — komponen ProjectThumb
otomatis menampilkan placeholder gradien + ikon, atau memakai URL
`fallbackImage` dari internet.
