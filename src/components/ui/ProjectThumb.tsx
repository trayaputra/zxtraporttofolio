import { useCallback, useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import "@/styles/project-thumb.css";

/* ============================================================
   Thumbnail kartu proyek — versi LIQUID GLASS.

   Urutan sumber gambar:
   1. `image`    → file lokal di public/images/... ATAU URL eksternal
   2. `fallback` → dipakai otomatis bila `image` gagal dimuat (404/offline)
   3. placeholder gradien + ikon lucide (selalu aman, tanpa file apa pun)

   Efek kaca:
   - Lapisan gambar asli selalu sedikit "membias" lewat filter #liquid-ripple.
   - Sebuah lensa (kaca pembesar) mengikuti kursor: di posisi itu gambar
     digambar ulang lebih besar + terdistorsi, jadi terlihat seperti
     tetesan air yang membiaskan gambar di bawahnya.

   Posisi lensa dikirim ke CSS lewat custom property --lens-x / --lens-y
   (persen). Update di-throttle pakai requestAnimationFrame supaya ringan.
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

  const rootRef = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);
  const pointer = useRef({ x: 50, y: 50 });

  useEffect(() => {
    if (!image) {
      setSrc(undefined);
      setStatus("empty");
      return;
    }
    setSrc(image);
    setStatus("loading");
  }, [image]);

  /** Bersihkan frame yang menggantung saat komponen dilepas. */
  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  /** Gagal load → coba fallback sekali, kalau tetap gagal pakai placeholder. */
  function handleError() {
    if (src && fallback && src !== fallback) {
      setSrc(fallback);
      setStatus("loading");
      return;
    }
    setStatus("error");
  }

  /** Simpan posisi kursor sebagai persen, lalu tulis ke CSS sekali per frame. */
  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const node = rootRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    pointer.current = {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };

    if (frame.current !== null) return;

    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const el = rootRef.current;
      if (!el) return;
      el.style.setProperty("--lens-x", `${pointer.current.x.toFixed(2)}%`);
      el.style.setProperty("--lens-y", `${pointer.current.y.toFixed(2)}%`);
    });
  }, []);

  const showImage = Boolean(src) && (status === "loading" || status === "loaded");

  return (
    <div
      ref={rootRef}
      className={`project-thumb project-thumb--glass ${variant ?? ""}`.trim()}
      style={{ ["--thumb-ratio" as string]: ratio }}
      onPointerMove={handlePointerMove}
      data-has-image={showImage ? "true" : "false"}
    >
      {showImage ? (
        <>
          {/* Gambar dasar — sedikit dibiaskan agar terasa di balik kaca */}
          <img
            className={`project-thumb__img ${status === "loaded" ? "is-ready" : ""}`.trim()}
            src={src}
            alt={`Thumbnail proyek ${title}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setStatus("loaded")}
            onError={handleError}
          />

          {/* Lensa: gambar sama, diperbesar, terdistorsi, mengikuti kursor */}
          <span className="project-thumb__lens" aria-hidden="true">
            <img
              className="project-thumb__lens-img"
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              onError={handleError}
            />
          </span>
        </>
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

      {/* Kilau kaca + tepi specular, selalu di atas gambar */}
      <span className="project-thumb__gloss" aria-hidden="true" />
      <span className="project-thumb__rim" aria-hidden="true" />
    </div>
  );
}
