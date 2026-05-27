import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import ContactCTA from "@/components/ContactCTA";
import Contact from "@/components/Contact";
import SectionAbout from "@/components/SectionAbout";
import ServicesAccordion from "@/components/ServicesAccordion";
import Process from "@/components/Process";
import FAQSection from "@/components/Faq";
import { FAQS_BASE } from "@/components/faq/faq.data";
import RestoreScroll from "@/components/ui/RestoreScroll";
import { getDict } from "@/lib/i18n/getDict";
import ProjectsSection from "@/components/ProjectsSection";
import { FEATURED_PROJECTS_BASE } from "@/components/projects/project.data";
import GamificationRuntime from "@/components/gamification/GamificationRuntime";

const featuredIds = new Set([
  "academia-platform-project",
  "mironline-platform-project",
  "latiendita-puntodeventa-project",
]);

type Locale = "es" | "en";

type ProjectBase = (typeof FEATURED_PROJECTS_BASE)[number];

type ProjectTranslation = Partial<ProjectBase>;

type FaqTranslation = {
  q?: string;
  a?: string;
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "en" ? "en" : "es";
  const dict = getDict(locale);

  const projectTranslations = dict.projects.items as Record<
    string,
    ProjectTranslation | undefined
  >;

  const faqTranslations = dict.faq.items as Record<
    string,
    FaqTranslation | undefined
  >;

  const featuredProjects = FEATURED_PROJECTS_BASE.filter((project) =>
    featuredIds.has(project.id)
  ).map((project) => {
    const translation = projectTranslations[project.id];

    if (!translation) return project;

    return { ...project, ...translation };
  });

  const faqItems = FAQS_BASE.map((item) => {
    const translation = faqTranslations[item.id];

    return {
      id: item.id,
      q: translation?.q ?? "",
      a: translation?.a ?? "",
    };
  });

  return (
    <SiteShell locale={locale as Locale}>
      <main>
        <RestoreScroll />
        <Hero copy={dict.hero} />
        <GamificationRuntime />
        <ServicesAccordion copy={dict.services} />

        {/*
          <ProjectsIntro />
          <ProjectsList />
        */}
        <ProjectsSection items={featuredProjects} copy={dict.projects} />

        <Process copy={dict.process} />
        <SectionAbout copy={dict.about} />
        <ContactCTA copy={dict.cta} />
        <FAQSection items={faqItems} copy={dict.faq} />
        <Contact copy={dict.contact} locale={locale as Locale} />
      </main>
    </SiteShell>
  );
}