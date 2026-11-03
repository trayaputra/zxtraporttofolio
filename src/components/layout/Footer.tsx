import { Github, Mail, MapPin } from "lucide-react";
import { contactItems, navLinks, profile } from "@/data/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { Theme } from "@/hooks/useTheme";

interface FooterProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Footer({ theme, onToggleTheme }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a className="brand" href="#home">
              <span className="brand__mark" aria-hidden="true">
                {profile.initials}
              </span>
              <span className="brand__name">
                {profile.name}
                <em className="brand__role">{profile.role}</em>
              </span>
            </a>
            <p className="footer__tagline">{profile.tagline}</p>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>

          <nav className="footer__col" aria-label="Navigasi footer">
            <h3 className="footer__title">Jelajahi</h3>
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h3 className="footer__title">Kontak</h3>
            <ul className="footer__contact">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <Icon size={15} aria-hidden="true" />
                    <span>{item.label}</span>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="footer__static">{content}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__title">Lokasi</h3>
            <p className="footer__meta">
              <MapPin size={15} aria-hidden="true" />
              <span>{profile.location}</span>
            </p>
            <p className="footer__meta">
              <span className="dot dot--live" aria-hidden="true" />
              <span>{profile.status}</span>
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {profile.name}. Dibuat dengan React, TypeScript &amp; Vite.
          </p>
          <a className="footer__top" href="#home">
            Kembali ke atas ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
