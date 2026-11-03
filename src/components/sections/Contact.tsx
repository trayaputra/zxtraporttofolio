import { useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { contactItems, profile } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const subject = encodeURIComponent(name ? `Halo dari ${name}` : "Halo Traya");
  const body = encodeURIComponent(message);
  const mailto = `mailto:${profile.email}?subject=${subject}&body=${body}`;

  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHeader
          eyebrow="05 · Kontak"
          title="Punya proyek? Mari bicara"
          description="Terbuka untuk pekerjaan freelance, kolaborasi, atau sekadar bertukar pikiran soal web."
        />

        <div className="contact__grid">
          <Reveal direction="up">
            <div className="contact__card">
              <h3 className="contact__card-title">Hubungi langsung</h3>
              <p className="contact__card-desc">
                Balasan biasanya dalam 1×24 jam pada hari kerja.
              </p>

              <ul className="contact__list">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <span className="contact__icon" aria-hidden="true">
                        <Icon size={17} />
                      </span>
                      <span>{item.label}</span>
                      {item.external ? (
                        <ArrowUpRight size={14} aria-hidden="true" />
                      ) : null}
                    </>
                  );

                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          className="contact__link"
                          href={item.href}
                          {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
                        >
                          {content}
                        </a>
                      ) : (
                        <span className="contact__link contact__link--static">{content}</span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <a className="btn btn--primary contact__cta" href={`mailto:${profile.email}`}>
                <Send size={16} aria-hidden="true" />
                <span>Kirim email</span>
              </a>
            </div>
          </Reveal>

          <Reveal direction="up" delay={120}>
            <form
              className="contact__form"
              onSubmit={(event) => {
                event.preventDefault();
                window.location.href = mailto;
              }}
            >
              <h3 className="contact__card-title">Atau tulis pesan singkat</h3>
              <p className="contact__card-desc">
                Form ini akan membuka aplikasi email kamu — tidak ada data yang dikirim ke server.
              </p>

              <label className="field">
                <span className="field__label">Nama</span>
                <input
                  className="field__input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Nama kamu"
                  autoComplete="name"
                />
              </label>

              <label className="field">
                <span className="field__label">Pesan</span>
                <textarea
                  className="field__input field__input--area"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Ceritakan singkat proyek atau ide kamu…"
                />
              </label>

              <button className="btn btn--primary contact__submit" type="submit">
                <Send size={16} aria-hidden="true" />
                <span>Susun email</span>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
