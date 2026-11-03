import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SkipLink } from "@/components/ui/SkipLink";
import { BackToTop } from "@/components/ui/BackToTop";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { useTheme } from "@/hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <ScrollProgress />
      <SkipLink />
      <Navbar theme={theme} onToggleTheme={toggle} />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer theme={theme} onToggleTheme={toggle} />
      <BackToTop />
    </>
  );
}
