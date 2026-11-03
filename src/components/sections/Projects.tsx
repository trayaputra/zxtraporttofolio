import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  projectFilters,
  projects,
  type ProjectCategory,
} from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectThumb } from "@/components/ui/ProjectThumb";

type FilterValue = ProjectCategory | "all";

export function Projects() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeader
          eyebrow="03 · Proyek"
          title="Beberapa hal yang sudah saya bangun"
          description="Pilihan proyek yang paling menggambarkan cara saya memecahkan masalah."
          aside={
            <div className="filters" role="tablist" aria-label="Filter kategori proyek">
              {projectFilters.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  role="tab"
                  aria-selected={filter === item.value}
                  className={`filter ${filter === item.value ? "is-active" : ""}`.trim()}
                  onClick={() => setFilter(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          }
        />

        <div className="projects__grid">
          {visible.map((project, index) => {
            const Icon = project.icon;
            const external = project.external ?? false;

            return (
              <Reveal key={project.id} direction="up" delay={index * 70}>
                <article className={`project-card ${project.thumb}`}>
                  {/* Thumbnail gambar — otomatis jatuh ke placeholder gradien
                      bila file gambar belum di-upload. */}
                  <ProjectThumb
                    title={project.title}
                    icon={Icon}
                    variant={project.thumb}
                    image={project.image}
                    fallback={project.fallbackImage}
                    ratio={project.thumbRatio ?? "16 / 9"}
                  />

                  <div className="project-card__head">
                    <span className="project-card__index">{project.index}</span>
                    <span className="project-card__tag">{project.tag}</span>
                  </div>

                  <span className="project-card__icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>

                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>

                  <ul className="project-card__tech">
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>

                  <a
                    className="project-card__more"
                    href={project.url}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={`${project.linkLabel ?? "Detail proyek"} ${project.title}`}
                  >
                    {project.linkLabel ?? "Detail proyek"}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="projects__empty">Belum ada proyek di kategori ini.</p>
        ) : null}
      </div>
    </section>
  );
}
