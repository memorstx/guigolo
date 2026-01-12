import Hero from "@/components/Hero";
import ProjectsIntro from "@/components/ProjectsIntro";
import ProjectsList from "@/components/ProjectList";
import Process from "@/components/Process"; 
export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectsIntro />
      <ProjectsList />
      <Process />
    </main>
  );
}
