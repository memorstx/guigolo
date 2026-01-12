import Hero from "@/components/Hero";
import ProjectsIntro from "@/components/ProjectsIntro";
import ProjectsList from "@/components/ProjectList";
import Process from "@/components/Process"; 
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectsIntro />
      <ProjectsList />
      <Process />
      <ContactCTA />
    </main>
  );
}
