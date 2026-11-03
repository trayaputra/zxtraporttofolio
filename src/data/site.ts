import type { LucideIcon } from "lucide-react";
import {
  Braces,
  CircleDot,
  Code2,
  Database,
  Github,
  Globe,
  Layers,
  Mail,
  MapPin,
  Palette,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";

/* ============================================================
   Seluruh konten situs dikumpulkan di sini supaya mudah diubah.
   ============================================================ */

/** Email publik portofolio — dipakai di About, Contact, Footer, dan form mailto. */
export const EMAIL = "putrakurniawan@mui.skin";

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  email: string;
  github: string;
  githubUrl: string;
  location: string;
  languages: string;
  status: string;
  typing: string[];
  stats: { label: string; value: number | string; suffix?: string; animated?: boolean }[];
  about: string[];
  highlights: string[];
  initials: string;
}

export const profile: Profile = {
  name: "Traya Putra",
  role: "Web Developer & UI Engineer",
  tagline:
    "Web developer yang fokus pada antarmuka cepat, aksesibel, dan enak dipakai. Suka merapikan detail kecil sampai produk terasa mulus.",
  email: EMAIL,
  github: "github.com/trayaputra",
  githubUrl: "https://github.com/trayaputra",
  location: "Indonesia (GMT+7)",
  languages: "ID / EN",
  status: "Open to work",
  typing: ["web yang cepat", "UI yang rapi", "produk yang mudah dipakai", "React + TypeScript"],
  stats: [
    { label: "Pengalaman", value: 4, suffix: "+ tahun", animated: true },
    { label: "Proyek", value: 28, suffix: "+ selesai", animated: true },
    { label: "Fokus", value: "Frontend & DX" },
  ],
  about: [
    "Saya developer yang senang mengubah desain menjadi antarmuka nyata yang terasa ringan. Mulai dari struktur HTML yang semantik, CSS yang tertata, sampai JavaScript yang tidak membuat browser menangis.",
    "Sekarang saya banyak bekerja dengan React dan TypeScript: tipe yang jelas bikin refactor lebih berani, dan komponen yang kecil bikin kode mudah dibaca orang lain.",
  ],
  highlights: [
    "Fokus pada performa & Core Web Vitals",
    "Kolaborasi erat dengan desainer & produk",
    "Kode rapi, terdokumentasi, mudah dilanjutkan",
  ],
  initials: "TP",
};

/* ---------- Navigasi ---------- */
export interface NavLink {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navLinks: NavLink[] = [
  { id: "about", label: "Tentang", href: "#about", icon: CircleDot },
  { id: "skills", label: "Keahlian", href: "#skills", icon: Zap },
  { id: "projects", label: "Proyek", href: "#projects", icon: Layers },
  { id: "experience", label: "Pengalaman", href: "#experience", icon: Sparkles },
  { id: "contact", label: "Kontak", href: "#contact", icon: Mail },
];

/* ---------- Keahlian (icon dari lucide-react) ---------- */
export interface Skill {
  icon: LucideIcon;
  title: string;
  description: string;
  level: number;
}

export const skills: Skill[] = [
  {
    icon: Code2,
    title: "Frontend",
    description:
      "HTML semantik, CSS modern, TypeScript, React, dan aksesibilitas yang benar-benar bisa dipakai.",
    level: 95,
  },
  {
    icon: Server,
    title: "Backend",
    description: "Node.js, Express, REST API, autentikasi, dan integrasi database relasional.",
    level: 80,
  },
  {
    icon: Palette,
    title: "UI / UX",
    description: "Design system, prototyping, layout responsif, dan mikro-interaksi yang jelas.",
    level: 85,
  },
  {
    icon: Rocket,
    title: "DevOps",
    description: "Git, CI/CD, deployment statis, optimasi build, caching, dan monitoring dasar.",
    level: 75,
  },
];

/** Chip teknologi — masing-masing punya icon lucide sendiri. */
export const techChips: { label: string; icon: LucideIcon }[] = [
  { label: "TypeScript", icon: Braces },
  { label: "React", icon: Globe },
  { label: "Vite", icon: Zap },
  { label: "Node.js", icon: Server },
  { label: "CSS3", icon: Palette },
  { label: "PostgreSQL", icon: Database },
  { label: "Git", icon: Github },
  { label: "Terminal", icon: Terminal },
  { label: "Testing", icon: CircleDot },
  { label: "Tooling", icon: Wrench },
];

/* ---------- Proyek ---------- */
export type ProjectCategory = "web" | "ui" | "tool";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  tag: string;
  description: string;
  tech: string[];
  index: string;
  thumb: string;
  icon: LucideIcon;
  /**
   * Gambar thumbnail. Bisa path lokal di dalam `public/`
   * (mis. "images/projects/nama.png") ATAU URL eksternal (https://...).
   * Kalau dikosongkan / file tidak ada, kartu otomatis memakai
   * placeholder gradien + ikon — tampilan tetap rapi.
   */
  image?: string;
  /** Sumber cadangan bila `image` gagal dimuat (404 / offline). */
  fallbackImage?: string;
  /** Rasio aspek thumbnail, default "16 / 9". Contoh lain: "4 / 3", "21 / 9". */
  thumbRatio?: string;
  /** URL yang dibuka saat tombol detail diklik. Wajib https/http. */
  url: string;
  /** Label tombol — default "Detail proyek". */
  linkLabel?: string;
  /** Buka di tab baru? default true untuk tautan eksternal. */
  external?: boolean;
}

export const projectFilters: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "web", label: "Web App" },
];

export const projects: Project[] = [
  {
    id: "clouvia-ai",
    title: "Clouvia AI",
    category: "web",
    tag: "Web App",
    description:
      "Platform berbasis AI untuk membantu pekerjaan sehari-hari: percakapan, pembuatan konten, dan tools produktivitas dalam satu antarmuka web yang ringan.",
    tech: ["React", "AI", "TypeScript"],
    index: "01",
    thumb: "thumb-1",
    icon: Sparkles,
    /* 👇 Ganti dengan screenshot asli Anda:
       upload file ke public/images/projects/clouvia-ai.png
       lalu nilai di bawah otomatis terpakai. */
    image: "images/projects/clouvia-ai.png",
    fallbackImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=70",
    thumbRatio: "16 / 9",
    url: "https://clouvia-ai.my.id",
    linkLabel: "Detail proyek",
    external: true,
  },
];

/* ---------- Pengalaman ---------- */
export interface ExperienceItem {
  year: string;
  title: string;
  description: string;
}

export const experiences: ExperienceItem[] = [
  {
    year: "2024 — sekarang",
    title: "Frontend Developer · Freelance",
    description:
      "Mengerjakan dashboard internal dan landing page untuk klien UMKM & agensi, mayoritas dengan React + TypeScript.",
  },
  {
    year: "2023 — 2024",
    title: "Web Developer · Studio Kecil",
    description:
      "Membangun situs profil perusahaan, migrasi ke komponen modular, dan optimasi performa halaman.",
  },
  {
    year: "2022 — 2023",
    title: "Mulai serius di web",
    description:
      "Belajar fundamental HTML, CSS, dan JavaScript lewat proyek nyata serta kontribusi open source.",
  },
];

/* ---------- Kontak ---------- */
export interface ContactItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  external?: boolean;
}

export const contactItems: ContactItem[] = [
  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
  {
    icon: Github,
    label: "github.com/trayaputra",
    href: "https://github.com/trayaputra",
    external: true,
  },
  { icon: MapPin, label: "Indonesia (GMT+7)" },
];

/* ---------- Kode di kartu hero ---------- */
export const heroCode = `const me = {
  nama: "Traya Putra",
  peran: "Web Developer",
  stack: ["TypeScript", "React", "Node"],
  sifat: "detail-oriented",
  bisa() {
    return "kirim kopi ☕ lalu ngoding";
  }
};`;
