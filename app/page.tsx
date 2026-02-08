import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
import RestoreScroll from "@/components/ui/RestoreScroll";
import GamificationBoot from "@/components/gamification/Boot";
import TriggersBoot from "@/components/gamification/TriggersBoot";
import AchievementsUI from "@/components/gamification/AchievementsUI";


const featuredIds = new Set([
  "academia-platform-project",
  "mironline-platform-project",
  "latiendita-puntodeventa-project",
]);

export default function Home() {
  return (
    <main className="bg-neutral-black-900">
      <GamificationBoot />
      <TriggersBoot />
      <AchievementsUI />
      <RestoreScroll />
      <Navbar />
      <Hero />
      <ServicesAccordion />
      {
        /*
        <ProjectsIntro />
        <ProjectsList />
        */
      }
      <ProjectsSection items={projects.filter((p) => featuredIds.has(p.id))} />
      <Process />
      <SectionAbout />
      <ContactCTA />
      <FAQSection items={FAQS} />
      <Contact />
      <Footer />
    </main>
  );
}
