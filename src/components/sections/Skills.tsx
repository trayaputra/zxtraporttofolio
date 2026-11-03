import { skills, techChips } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/hooks/useInView";

interface SkillCardProps {
  icon: (typeof skills)[number]["icon"];
  title: string;
  description: string;
  level: number;
  delay: number;
}

function SkillCard({ icon: Icon, title, description, level, delay }: SkillCardProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.3 });

  return (
    <Reveal direction="up" delay={delay}>
      <article className="skill-card" ref={ref}>
        <span className="skill-card__icon" aria-hidden="true">
          <Icon size={20} />
        </span>
        <h3 className="skill-card__title">{title}</h3>
        <p className="skill-card__desc">{description}</p>
        <div className="skill-card__meter">
          <div
            className="skill-card__track"
            role="progressbar"
            aria-valuenow={level}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Tingkat penguasaan ${title}`}
          >
            <span
              className="skill-card__bar"
              style={{ width: inView ? `${level}%` : "0%" }}
            />
          </div>
          <span className="skill-card__level">{level}%</span>
        </div>
      </article>
    </Reveal>
  );
}

export function Skills() {
  return (
    <section className="section section--alt" id="skills">
      <div className="container">
        <SectionHeader
          eyebrow="02 · Keahlian"
          title="Perangkat yang saya pakai sehari-hari"
          description="Bukan daftar panjang tanpa arah — ini yang benar-benar saya gunakan untuk mengirim produk."
        />

        <div className="skills__grid">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.title}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
              level={skill.level}
              delay={index * 80}
            />
          ))}
        </div>

        <Reveal direction="up" delay={200}>
          <ul className="chips" aria-label="Teknologi yang dikuasai">
            {techChips.map((chip) => {
              const Icon = chip.icon;
              return (
                <li className="chip" key={chip.label}>
                  <Icon size={14} aria-hidden="true" />
                  <span>{chip.label}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
