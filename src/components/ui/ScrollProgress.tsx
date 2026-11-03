import { useScrollProgress } from "@/hooks/useScrollProgress";

/** Bar tipis di paling atas halaman sebagai indikator progres baca. */
export function ScrollProgress() {
  const { progress } = useScrollProgress();

  return (
    <div className="scroll-progress" role="presentation" aria-hidden="true">
      <span className="scroll-progress__bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
