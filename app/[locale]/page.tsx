import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import ContactCTA from "@/components/ContactCTA";
import Contact from "@/components/Contact";
import SectionAbout from "@/components/SectionAbout";
import ServicesAccordion from "@/components/ServicesAccordion";

import Process from "@/components/Process"; 
import FAQSection from "@/components/Faq";
import { FAQS } from "@/components/faq/faq.data";
import RestoreScroll from "@/components/ui/RestoreScroll";
import GamificationBoot from "@/components/gamification/Boot";
import TriggersBoot from "@/components/gamification/TriggersBoot";
import AchievementsUI from "@/components/gamification/AchievementsUI";
import MissionsBoot from "@/components/gamification/MissionsBoot";
import { getDict } from "@/lib/i18n/getDict";
import ProjectsSection from "@/components/ProjectsSection";
import { FEATURED_PROJECTS_BASE } from "@/components/projects/project.data";

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

  const featuredProjects = FEATURED_PROJECTS_BASE
  .filter((p: any) => featuredIds.has(p.id))
  .map((p: any) => {

    const t = (dict.projects.items as Record<string, any>)[p.id];
    if (!t) return p;
    return { ...p, ...t };
  });



  return (
    <SiteShell locale={locale as "es" | "en"}>
      <main>
        <RestoreScroll />
        <Hero copy={dict.hero}/>
        
        <GamificationBoot />
        <TriggersBoot />
        <MissionsBoot />
        <AchievementsUI />
        <ServicesAccordion copy={dict.services} />

        {
          /*
          <ProjectsIntro />
          <ProjectsList />
          */
        }
        <ProjectsSection items={featuredProjects} copy={dict.projects} />


        <Process copy={dict.process} />
        <SectionAbout />
        <ContactCTA />
        <FAQSection items={FAQS} />
        <Contact />
      </main>
    </SiteShell>
  );
}
