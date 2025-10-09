import Layout from "@/components/Layout";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Instagram from "@/components/portfolio/Instagram";
import Contact from "@/components/portfolio/Contact";

export default function Index() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Instagram />
      <Contact />
    </Layout>
  );
}
