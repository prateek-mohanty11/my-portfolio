import { useState } from 'react';
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
import { AiAssistantModal } from './components/ui/AiAssistantModal';
import { Bot } from 'lucide-react';
import { soundFx } from './utils/audio';

export function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#08090D] text-[#F5F5FA] font-sans selection:bg-[#9B5CFF]/30 selection:text-[#00D9FF] relative overflow-x-hidden">
      {/* Desktop Custom Interactive Cursor */}
      <CustomCursor />

      {/* Floating Glassmorphic Navbar */}
      <Navbar onOpenAiAssistant={() => setIsAiOpen(true)} />

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

      {/* Floating AI Assistant Trigger Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            soundFx.playSelect();
            setIsAiOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#10121A]/90 border border-[#00D9FF]/40 hover:border-[#00D9FF] backdrop-blur-xl text-xs font-mono text-[#F5F5FA] hover:text-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.25)] hover:shadow-[0_0_25px_rgba(0,217,255,0.45)] transition-all transform hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Bot className="w-4 h-4 text-[#00D9FF]" />
          <span>Ask AI</span>
        </button>
      </div>

      {/* AI Assistant Modal */}
      <AiAssistantModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}

export default App;
