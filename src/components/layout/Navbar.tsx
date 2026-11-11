import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Volume2, VolumeX, Bot, Download, ExternalLink } from 'lucide-react';
import { profileData } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { cn } from '../../utils/cn';
import { soundFx } from '../../utils/audio';

const navItems = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Achievements', href: '#achievements', id: 'achievements' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

interface NavbarProps {
  onOpenAiAssistant?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiAssistant }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const activeSection = useActiveSection(navItems.map(item => item.id), 250);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    soundFx.playSelect();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFx.playSelect();
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-4 sm:px-6 md:px-8',
          scrolled ? 'pt-3 pb-3' : 'pt-6 pb-4'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* PM Monogram Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={scrollToTop}
              className="group relative flex items-center gap-3 focus:outline-none"
              aria-label="Prateek Mohanty - Home"
            >
              <div className="relative w-9 h-9 rounded-lg bg-[#0C0E15] border border-white/[0.12] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#00D9FF]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#9B5CFF]/15 to-[#00D9FF]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="font-display font-black text-base text-[#F5F5FA] group-hover:text-[#00D9FF] transition-colors tracking-tight">
                  PM
                </span>
                {/* Glow accent */}
                <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-[#00D9FF]" />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-display font-bold text-[#F5F5FA] tracking-tight group-hover:text-[#00D9FF] transition-colors">
                  Prateek Mohanty
                </span>
                <span className="text-[10px] font-mono text-[#5C6275] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AI & Creative Dev
                </span>
              </div>
            </button>
          </motion.div>

          {/* Floating Pill Menu - Desktop */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn(
              'hidden md:flex items-center gap-1 px-3.5 py-1.5 rounded-full transition-all duration-300',
              scrolled
                ? 'bg-[#0C0E15]/90 backdrop-blur-md border border-white/[0.08] shadow-md'
                : 'bg-[#0C0E15]/60 backdrop-blur-sm border border-white/[0.05]'
            )}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onMouseEnter={() => soundFx.playHover()}
                  onClick={() => soundFx.playSelect()}
                  className={cn(
                    'relative px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-200',
                    isActive
                      ? 'text-[#F5F5FA]'
                      : 'text-[#9095A6] hover:text-[#F5F5FA]'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-[#171B29] border border-[#00D9FF]/30 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </motion.nav>

          {/* Right Action / Status / Optional Resume / Audio / AI Assistant */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              aria-label={isMuted ? "Unmute audio feedback" : "Mute audio feedback"}
              title={isMuted ? "Enable UI sounds" : "Mute UI sounds"}
              className="p-2 rounded-lg bg-[#0C0E15] border border-white/[0.08] text-[#9095A6] hover:text-[#00D9FF] hover:border-[#00D9FF]/40 transition-colors hidden sm:inline-flex"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00D9FF]" />}
            </button>

            {/* AI Assistant Pill Button */}
            {onOpenAiAssistant && (
              <button
                onClick={() => {
                  soundFx.playSelect();
                  onOpenAiAssistant();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium text-[#00D9FF] bg-[#0C0E15] border border-[#00D9FF]/30 hover:border-[#00D9FF] transition-all"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask AI</span>
              </button>
            )}

            {profileData.contact.resumeUrl && (
              <div className="hidden sm:inline-flex items-center rounded-lg bg-[#0C0E15] border border-[#00D9FF]/30 hover:border-[#00D9FF] p-0.5 transition-all">
                <a
                  href={profileData.contact.resumeUrl}
                  download="Prateek_Mohanty_AI_ML_Resume.pdf"
                  onClick={() => soundFx.playSelect()}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium text-[#00D9FF] hover:bg-[#00D9FF]/10 rounded-md transition-colors"
                  title="Download Prateek Mohanty's Resume (PDF)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </a>
                <span className="w-px h-3.5 bg-white/10 my-auto" />
                <a
                  href={profileData.contact.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playSelect()}
                  className="inline-flex items-center p-1.5 text-[#9095A6] hover:text-[#00D9FF] hover:bg-[#00D9FF]/10 rounded-md transition-colors"
                  title="View Resume in new tab"
                  aria-label="View Resume in new tab"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <a
              href="#contact"
              onClick={() => soundFx.playSelect()}
              className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium font-sans text-white bg-[#9B5CFF] hover:bg-[#8844FF] border border-[#9B5CFF] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>Let's Connect</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                soundFx.playSelect();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2.5 rounded-xl bg-[#10121A] border border-white/10 text-[#F5F5FA] hover:text-[#00D9FF] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden rounded-2xl bg-[#10121A]/95 backdrop-blur-2xl border border-white/15 p-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    soundFx.playSelect();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium text-[#F5F5FA] hover:bg-[#151824] hover:text-[#00D9FF] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[#A3A8B8]">→</span>
                </a>
              ))}

              {onOpenAiAssistant && (
                <button
                  onClick={() => {
                    soundFx.playSelect();
                    setMobileMenuOpen(false);
                    onOpenAiAssistant();
                  }}
                  className="flex items-center justify-between py-2 px-3 rounded-lg text-sm font-mono text-[#00D9FF] bg-[#151824] transition-colors text-left"
                >
                  <span className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    <span>Ask Prateek's AI</span>
                  </span>
                  <span className="text-xs">✨</span>
                </button>
              )}

              {profileData.contact.resumeUrl && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={profileData.contact.resumeUrl}
                    download="Prateek_Mohanty_AI_ML_Resume.pdf"
                    onClick={() => {
                      soundFx.playSelect();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-mono font-medium text-[#00D9FF] bg-[#151824] border border-[#00D9FF]/30 hover:border-[#00D9FF] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CV</span>
                  </a>
                  <a
                    href={profileData.contact.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      soundFx.playSelect();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-mono text-[#9095A6] bg-[#151824] border border-white/10 hover:text-[#F5F5FA] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View PDF</span>
                  </a>
                </div>
              )}

              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={() => {
                    soundFx.playSelect();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#9B5CFF] to-[#7B2CBF] shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                  <span>Let's Connect</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
