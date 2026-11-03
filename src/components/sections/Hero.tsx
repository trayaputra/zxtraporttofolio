import { useEffect, useState } from "react";
import { ArrowDown, Github, Mail, MapPin, Send } from "lucide-react";
import { heroCode, profile } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";

/** Efek mesin tik untuk daftar kata di hero. */
function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length] ?? "";

    if (!deleting && text === word) {
      const hold = setTimeout(() => setDeleting(true), 1500);
      return () => clearTimeout(hold);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((current) => (current + 1) % words.length);
      return;
    }

    const timer = setTimeout(
      () => {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      },
      deleting ? 35 : 85,
    );

    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return text;
}

interface StatProps {
  label: string;
  value: number | string;
  suffix?: string;
  animated?: boolean;
}

function Stat({ label, value, suffix, animated }: StatProps) {
  const { ref, inView } = useInView<HTMLLIElement>({ threshold: 0.4 });
  const counted = useCountUp(typeof value === "number" ? value : 0, inView && Boolean(animated));
  const display = typeof value === "number" && animated ? counted : value;

  return (
    <li className="stat" ref={ref}>
      <span className="stat__value">
        {display}
        {suffix ? <em className="stat__suffix">{suffix}</em> : null}
      </span>
      <span className="stat__label">{label}</span>
    </li>
  );
}

export function Hero() {
  const typed = useTypewriter(profile.typing);

  return (
    <section className="hero" id="home">
      <div className="container hero__inner">
        <div className="hero__content">
          <Reveal direction="down">
            <span className="pill">
              <span className="dot dot--live" aria-hidden="true" />
              {profile.status}
            </span>
          </Reveal>

          <Reveal direction="up" delay={60}>
            <h1 className="hero__title">
              {profile.name}
              <span className="hero__title-accent">.</span>
            </h1>
          </Reveal>

          <Reveal direction="up" delay={110}>
            <p className="hero__role">{profile.role}</p>
          </Reveal>

          <Reveal direction="up" delay={160}>
            <p className="hero__tagline">{profile.tagline}</p>
          </Reveal>

          <Reveal direction="up" delay={210}>
            <p className="hero__typing">
              <span className="hero__typing-prefix">sedang membangun</span>
              <strong className="hero__typing-word">
                {typed}
                <i className="caret" aria-hidden="true" />
              </strong>
            </p>
          </Reveal>

          <Reveal direction="up" delay={260}>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#projects">
                <Send size={16} aria-hidden="true" />
                <span>Lihat proyek</span>
              </a>
              <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
                <Mail size={16} aria-hidden="true" />
                <span>Hubungi saya</span>
              </a>
            </div>
          </Reveal>

          <Reveal direction="up" delay={310}>
            <p className="hero__meta">
              <span>
                <MapPin size={14} aria-hidden="true" />
                {profile.location}
              </span>
              <span>
                <Github size={14} aria-hidden="true" />
                {profile.github}
              </span>
            </p>
          </Reveal>

          <Reveal direction="up" delay={360}>
            <ul className="hero__stats">
              {profile.stats.map((stat) => (
                <Stat
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  animated={stat.animated}
                />
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="hero__visual">
          <Reveal direction="left" delay={200}>
            <div className="code-card">
              <div className="code-card__bar">
                <span className="code-card__dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="code-card__file">profile.ts</span>
              </div>
              <pre className="code-card__body">
                <code>{heroCode}</code>
              </pre>
            </div>
          </Reveal>

          <Reveal direction="left" delay={300}>
            <a className="hero__scroll" href="#about">
              <ArrowDown size={15} aria-hidden="true" />
              <span>Geser untuk menjelajah</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
