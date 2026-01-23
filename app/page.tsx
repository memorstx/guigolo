import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsIntro from "@/components/ProjectsIntro";
import ProjectsList from "@/components/ProjectList";
import ContactCTA from "@/components/ContactCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionAbout from "@/components/SectionAbout";
import ServicesAccordion from "@/components/ServicesAccordion";
import ProjectsSection from "@/components/ProjectsSection";
import { projects } from "@/components/projects/project.data";
import Process from "@/components/Process"; 
import FAQSection from "@/components/Faq";
import { FAQS } from "@/components/faq/faq.data";

export default function Home() {
  return (
    <main className="bg-neutral-black-900">
      <Navbar />
      <Hero />
      <SectionAbout />
      <ServicesAccordion />
      {
        /*
        <ProjectsIntro />
        <ProjectsList />
        */
      }
      <ProjectsSection items={projects} />
      <Process />
      <FAQSection items={FAQS} />
      <ContactCTA />
      <Contact />
      <Footer />
    </main>
  );
}
