import { useEffect, useState } from "react";

export interface ScrollState {
  /** 0 - 1, posisi scroll halaman */
  progress: number;
  /** true ketika halaman sudah discroll lebih dari 40px */
  scrolled: boolean;
  /** posisi scroll dalam px */
  y: number;
}

export function useScrollProgress(): ScrollState {
  const [state, setState] = useState<ScrollState>({ progress: 0, scrolled: false, y: 0 });

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const y = doc.scrollTop || document.body.scrollTop || 0;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? y / max : 0;

      setState({
        progress: Math.min(Math.max(progress, 0), 1),
        scrolled: y > 40,
        y,
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return state;
}
