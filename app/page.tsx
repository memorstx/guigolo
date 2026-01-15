import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsIntro from "@/components/ProjectsIntro";
import ProjectsList from "@/components/ProjectList";
import Process from "@/components/Process"; 
import ContactCTA from "@/components/ContactCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-neutral-black-900">
      <Navbar />
      <Hero />
      <ProjectsIntro />
      <ProjectsList />
      <Process />
      <ContactCTA />
      <Contact />
      <Footer />
    </main>
  );
}
