import { experiences } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Experience() {
  return (
    <section className="section section--alt" id="experience">
      <div className="container">
        <SectionHeader
          eyebrow="04 · Pengalaman"
          title="Jejak perjalanan"
          description="Dari belajar fundamental sampai mengerjakan proyek untuk klien nyata."
        />

        <ol className="timeline">
          {experiences.map((item, index) => (
            <li className="timeline__item" key={item.title}>
              <Reveal direction="left" delay={index * 90}>
                <div className="timeline__card">
                  <span className="timeline__year">{item.year}</span>
                  <h3 className="timeline__title">{item.title}</h3>
                  <p className="timeline__desc">{item.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
