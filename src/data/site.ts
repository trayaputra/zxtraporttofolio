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
  email: "hello@traya.dev",
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
}

export const projectFilters: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "web", label: "Web App" },
  { value: "ui", label: "UI / Design" },
  { value: "tool", label: "Tools" },
];

export const projects: Project[] = [
  {
    id: "kasirku",
    title: "KasirKu",
    category: "web",
    tag: "Web App",
    description:
      "Aplikasi kasir ringan untuk UMKM: transaksi, stok, dan laporan harian dalam satu dashboard.",
    tech: ["React", "Express", "SQLite"],
    index: "01",
    thumb: "thumb-1",
    icon: Layers,
  },
  {
    id: "aurora",
    title: "Aurora Design System",
    category: "ui",
    tag: "UI Kit",
    description:
      "Komponen UI yang konsisten, token warna, dan dokumentasi interaktif untuk tim produk.",
    tech: ["Figma", "CSS Vars", "Storybook"],
    index: "02",
    thumb: "thumb-2",
    icon: Palette,
  },
  {
    id: "bundlelens",
    title: "BundleLens",
    category: "tool",
    tag: "Tool",
    description:
      "CLI kecil untuk memantau ukuran bundle dan memberi peringatan saat melebihi budget.",
    tech: ["Node.js", "esbuild", "CLI"],
    index: "03",
    thumb: "thumb-3",
    icon: Terminal,
  },
  {
    id: "catatan",
    title: "Catatan Belajar",
    category: "web",
    tag: "Web App",
    description:
      "PWA untuk mencatat materi belajar, dengan pencarian cepat dan mode offline penuh.",
    tech: ["Vite", "IndexedDB", "PWA"],
    index: "04",
    thumb: "thumb-4",
    icon: Database,
  },
  {
    id: "nusa",
    title: "Landing Nusa",
    category: "ui",
    tag: "Landing",
    description:
      "Landing page agensi travel dengan animasi scroll halus dan skor Lighthouse 98.",
    tech: ["React", "Framer Motion", "SEO"],
    index: "05",
    thumb: "thumb-5",
    icon: Globe,
  },
  {
    id: "jsonmate",
    title: "JsonMate",
    category: "tool",
    tag: "Tool",
    description:
      "Formatter & validator JSON di browser, tanpa server — data tetap di perangkat kamu.",
    tech: ["TypeScript", "Web API"],
    index: "06",
    thumb: "thumb-6",
    icon: Braces,
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
  { icon: Mail, label: "hello@traya.dev", href: "mailto:hello@traya.dev" },
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
