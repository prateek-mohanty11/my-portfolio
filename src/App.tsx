import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { SkillsTree } from './components/sections/SkillsTree';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Achievements } from './components/sections/Achievements';
import { GitHubActivity } from './components/sections/GitHubActivity';
import { LeetCodeStats } from './components/sections/LeetCodeStats';
import { Contact } from './components/sections/Contact';
import { CustomCursor } from './components/ui/CustomCursor';

export function App() {
  return (
    <div className="min-h-screen bg-[#08090D] text-[#F5F5FA] font-sans selection:bg-[#9B5CFF]/30 selection:text-[#00D9FF] relative overflow-x-hidden">
      {/* Desktop Custom Interactive Cursor */}
      <CustomCursor />

      {/* Floating Glassmorphic Navbar */}
      <Navbar />

      {/* Main Interactive Flow */}
      <main>
        <Hero />
        <About />
        <SkillsTree />
        <Projects />
        <Experience />
        <Achievements />
        <GitHubActivity />
        <LeetCodeStats />
        <Contact />
      </main>

      {/* Minimal Futuristic Footer */}
      <Footer />
    </div>
  );
}

export default App;
