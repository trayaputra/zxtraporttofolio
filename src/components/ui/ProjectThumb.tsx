import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import "@/styles/project-thumb.css";

/* ============================================================
   Thumbnail kartu proyek.

   Urutan sumber gambar:
   1. `image`    → file lokal di public/images/... ATAU URL eksternal
   2. `fallback` → dipakai otomatis bila `image` gagal dimuat (404/offline)
   3. placeholder gradien + ikon lucide (selalu aman, tanpa file apa pun)

   Jadi: kartu tetap bagus walau gambar belum sempat di-upload.
   ============================================================ */

type ThumbStatus = "empty" | "loading" | "loaded" | "error";

export interface ProjectThumbProps {
  /** Judul proyek — dipakai sebagai teks alternatif gambar. */
  title: string;
  /** Ikon lucide untuk placeholder / fallback visual. */
  icon: LucideIcon;
  /** Kelas variasi warna, mis. "thumb-1". */
  variant?: string;
  /** Sumber utama: path lokal (images/x.png) atau URL https. */
  image?: string;
  /** Sumber cadangan bila `image` gagal dimuat. */
  fallback?: string;
  /** Rasio aspek thumbnail. Default 16/9. */
  ratio?: string;
}

export function ProjectThumb({
  title,
  icon: Icon,
  variant,
  image,
  fallback,
  ratio = "16 / 9",
}: ProjectThumbProps) {
  const [src, setSrc] = useState<string | undefined>(image);
  const [status, setStatus] = useState<ThumbStatus>(image ? "loading" : "empty");

  useEffect(() => {
    if (!image) {
      setSrc(undefined);
      setStatus("empty");
      return;
    }
    setSrc(image);
    setStatus("loading");
  }, [image]);

  /** Gagal load → coba fallback sekali, kalau tetap gagal pakai placeholder. */
  function handleError() {
    if (src && fallback && src !== fallback) {
      setSrc(fallback);
      setStatus("loading");
      return;
    }
    setStatus("error");
  }

  const showImage = Boolean(src) && (status === "loading" || status === "loaded");

  return (
    <div
      className={`project-thumb ${variant ?? ""}`.trim()}
      style={{ ["--thumb-ratio" as string]: ratio }}
    >
      {showImage ? (
        <img
          className={`project-thumb__img ${status === "loaded" ? "is-ready" : ""}`.trim()}
          src={src}
          alt={`Thumbnail proyek ${title}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={handleError}
        />
      ) : null}

      {status === "loading" ? (
        <span className="project-thumb__skeleton" aria-hidden="true" />
      ) : null}

      {!showImage ? (
        <span className="project-thumb__placeholder" aria-hidden="true">
          <span className="project-thumb__grid" />
          <span className="project-thumb__badge">
            <Icon size={26} strokeWidth={1.8} />
          </span>
        </span>
      ) : null}
    </div>
  );
}
