import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function BackToTop() {
  const { y } = useScrollProgress();
  const visible = y > 600;

  const handle = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? "is-visible" : ""}`.trim()}
      onClick={handle}
      aria-label="Kembali ke atas halaman"
      title="Kembali ke atas"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={18} />
    </button>
  );
}
