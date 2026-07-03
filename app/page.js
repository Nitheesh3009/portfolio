import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillsGrid from "@/components/SkillsGrid";
import GitHubStrip from "@/components/GitHubStrip";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatbotButton from "@/components/ChatbotButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <ExperienceTimeline />
        <SkillsGrid />
        <GitHubStrip />
        <Contact />
      </main>
      <Footer />
      <ChatbotButton />
    </>
  );
}
