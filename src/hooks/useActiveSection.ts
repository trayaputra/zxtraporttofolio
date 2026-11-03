import { useEffect, useState } from "react";

/**
 * Mengembalikan id section yang sedang aktif di navbar
 * berdasarkan posisi scroll.
 */
export function useActiveSection(ids: string[], offset = 140): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const handle = () => {
      let current = "";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }

      const doc = document.documentElement;
      const atBottom = doc.scrollTop + doc.clientHeight >= doc.scrollHeight - 4;
      if (atBottom && ids.length > 0) {
        current = ids[ids.length - 1];
      }

      setActive(current);
    };

    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);

    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, [ids, offset]);

  return active;
}
