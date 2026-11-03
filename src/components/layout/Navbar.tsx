import { useEffect, useState } from "react";
import { Github, Mail, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { Theme } from "@/hooks/useTheme";

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const SECTION_IDS = navLinks.map((link) => link.id);

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const { scrolled } = useScrollProgress();
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);

  // Tutup menu mobile saat ukuran layar berubah ke desktop atau saat Esc ditekan.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Cegah body ikut scroll saat menu mobile terbuka.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavigate = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""}`.trim()}>
      <nav className="navbar__inner container" aria-label="Navigasi utama">
        <a className="brand" href="#home" onClick={handleNavigate}>
          <span className="brand__mark" aria-hidden="true">
            {profile.initials}
          </span>
          <span className="brand__name">
            {profile.name}
            <em className="brand__role">{profile.role}</em>
          </span>
        </a>

        <ul className={`nav-links ${open ? "is-open" : ""}`.trim()} id="primary-nav">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  className={`nav-link ${isActive ? "is-active" : ""}`.trim()}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  onClick={handleNavigate}
                >
                  <Icon size={15} aria-hidden="true" />
                  <span>{link.label}</span>
                </a>
              </li>
            );
          })}
          <li className="nav-links__mobile-actions">
            <a className="btn btn--ghost" href={profile.githubUrl} target="_blank" rel="noreferrer">
              <Github size={15} aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a className="btn btn--primary" href={`mailto:${profile.email}`}>
              <Mail size={15} aria-hidden="true" />
              <span>Hubungi</span>
            </a>
          </li>
        </ul>

        <div className="navbar__actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} compact />
          <a
            className="btn btn--primary navbar__cta"
            href={`mailto:${profile.email}`}
          >
            <Mail size={15} aria-hidden="true" />
            <span>Hubungi saya</span>
          </a>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? "Tutup menu" : "Buka menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
