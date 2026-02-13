import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import ContactCTA from "@/components/ContactCTA";
import Contact from "@/components/Contact";
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
import MissionsBoot from "@/components/gamification/MissionsBoot";
import { getDict } from "@/lib/i18n/getDict";

const featuredIds = new Set([
  "academia-platform-project",
  "mironline-platform-project",
  "latiendita-puntodeventa-project",
]);

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);

  return (
    <SiteShell>
      <main>
        <RestoreScroll />
        <Hero copy={dict.hero}/>
        
        <GamificationBoot />
        <TriggersBoot />
        <MissionsBoot />
        <AchievementsUI />
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
      </main>
    </SiteShell>
  );
}
