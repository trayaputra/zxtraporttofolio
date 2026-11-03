import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeaderProps {
  /** Label kecil di atas judul, misalnya "02 · Keahlian" */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Konten tambahan di sisi kanan judul (mis. filter) */
  aside?: ReactNode;
}

export function SectionHeader({ eyebrow, title, description, aside }: SectionHeaderProps) {
  return (
    <div className="section-head">
      <div className="section-head__text">
        {eyebrow ? (
          <Reveal direction="up">
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
        ) : null}
        <Reveal direction="up" delay={60}>
          <h2 className="section-title">{title}</h2>
        </Reveal>
        {description ? (
          <Reveal direction="up" delay={120}>
            <p className="section-desc">{description}</p>
          </Reveal>
        ) : null}
      </div>
      {aside ? (
        <Reveal direction="up" delay={140}>
          <div className="section-head__aside">{aside}</div>
        </Reveal>
      ) : null}
    </div>
  );
}
