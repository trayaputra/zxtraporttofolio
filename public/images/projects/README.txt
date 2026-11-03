Gambar Thumbnail Proyek
=======================

STATUS SEKARANG: thumbnail "Clouvia AI" sudah aktif lewat Cloudinary,
jadi folder ini BOLEH KOSONG. Tidak perlu upload apa pun lagi.

URL yang dipakai kode (lihat src/data/site.ts):

    image  : https://res.cloudinary.com/dqn8dtntr/image/upload/
             c_fill,ar_16:9,g_auto,w_1200,q_auto,f_auto/
             v1793714756/file_0000000087c88211825370ba0c077e70_qrz68c.png

Sumber asli : 1672x941 PNG (1.5 MB). Cloudinary otomatis meng-crop ke
              16:9 dan mengompresi jadi JPEG/WebP ~90 KB -> hemat kuota
              pengunjung dan lebih cepat (Core Web Vitals lebih bagus).
              Link halaman koleksi bisa kedaluwarsa, tapi URL delivery
              di atas tetap hidup selama asetnya ada di cloud `dqn8dtntr`.

fallback : images/projects/clouvia-ai.png  (file lokal di folder ini)
           Dipakai OTOMATIS bila CDN Cloudinary gagal diakses (404/offline).
           Kalau tidak ada, kartu tetap aman: tampil placeholder gradien
           + ikon Sparkles. Tidak akan ada gambar rusak.

---------------------------------------------------------------
MAU PINDAH KE FILE LOKAL? (opsional)
---------------------------------------------------------------

1. Upload lewat web GitHub
   - Buka repository trayaputra/zxtraporttofolio
   - Masuk ke folder public/images/projects
   - Klik "Add file" -> "Upload files", pilih gambar
   - Beri nama: clouvia-ai.png
   - Commit ke branch main

2. Atau lewat git di komputer
   git add public/images/projects/clouvia-ai.png
   git commit -m "chore: tambah thumbnail Clouvia AI lokal"
   git push origin main

3. Lalu di src/data/site.ts tukar posisi nilainya:
      image: "images/projects/clouvia-ai.png",
      fallbackImage: CLOUVIA_THUMB,

---------------------------------------------------------------
MENAMBAH PROYEK BARU DENGAN THUMBAIL
---------------------------------------------------------------

Opsi A - Cloudinary (disarankan, tidak membebani repo):
  1. Upload gambar ke Cloudinary.
  2. Ambil URL delivery, tambahkan transformasi:
     /c_fill,ar_16:9,g_auto,w_1200,q_auto,f_auto/
  3. Isi field `image` pada objek proyek di src/data/site.ts.

Opsi B - File lokal:
  1. Simpan gambar ke public/images/projects/nama-proyek.png
  2. Isi `image: "images/projects/nama-proyek.png"`
  3. Tambahkan `fallbackImage` URL eksternal bila mau ekstra aman.

Catatan penting
---------------
- Format didukung: .png, .jpg, .webp (webp paling ringan).
- Ukuran ideal 1200x675 (rasio 16:9). Rasio lain bisa diatur lewat
  field `thumbRatio`, contoh "4 / 3" atau "21 / 9".
- Gambar selalu di-crop dengan object-fit: cover -> tidak akan gepeng.
- Kompres dulu sebelum upload agar halaman tetap cepat.
- Nama file bersifat case-sensitive di production build.
