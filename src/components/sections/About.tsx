import { CheckCircle2, Github, Languages, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const facts = [
  { icon: MapPin, label: "Lokasi", value: profile.location },
  { icon: Languages, label: "Bahasa", value: profile.languages },
  { icon: Mail, label: "Email", value: profile.email },
  { icon: Github, label: "GitHub", value: profile.github },
];

export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeader
          eyebrow="01 · Tentang"
          title="Developer yang peduli detail kecil"
          description="Sedikit cerita tentang cara saya bekerja dan hal yang saya kejar di setiap proyek."
        />

        <div className="about__grid">
          <div className="about__body">
            {profile.about.map((paragraph, index) => (
              <Reveal key={paragraph} direction="up" delay={index * 90}>
                <p className="about__text">{paragraph}</p>
              </Reveal>
            ))}

            <Reveal direction="up" delay={220}>
              <ul className="facts">
                {facts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <li className="fact" key={fact.label}>
                      <span className="fact__icon" aria-hidden="true">
                        <Icon size={16} />
                      </span>
                      <span className="fact__text">
                        <span className="fact__label">{fact.label}</span>
                        <span className="fact__value">{fact.value}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          <Reveal direction="left" delay={140} className="about__aside">
            <div className="about__card">
              <h3 className="about__card-title">Cara saya bekerja</h3>
              <ul className="highlights">
                {profile.highlights.map((item) => (
                  <li className="highlight" key={item}>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
