import type { ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  /** Arah animasi masuk */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Delay dalam ms */
  delay?: number;
  /** Nama tag pembungkus */
  as?: ElementType;
  className?: string;
}

/**
 * Pembungkus animasi scroll reveal berbasis IntersectionObserver.
 * Animasi berjalan satu kali saja untuk menghemat performa.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  as,
  className,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = (as ?? "div") as ElementType;

  const offset: Record<NonNullable<RevealProps["direction"]>, string> = {
    up: "translate3d(0, 22px, 0)",
    down: "translate3d(0, -22px, 0)",
    left: "translate3d(22px, 0, 0)",
    right: "translate3d(-22px, 0, 0)",
    none: "none",
  };

  return (
    <Tag
      ref={ref}
      className={`reveal ${className ?? ""}`.trim()}
      style={{
        transitionDelay: `${delay}ms`,
        transform: inView ? "none" : offset[direction],
        opacity: inView ? 1 : 0,
      }}
    >
      {children}
    </Tag>
  );
}
