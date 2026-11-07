import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, Volume2, VolumeX, Bot } from 'lucide-react';
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
              <div className="relative w-10 h-10 rounded-xl bg-[#10121A] border border-[#9B5CFF]/40 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#00D9FF] group-hover:shadow-[0_0_15px_rgba(0,217,255,0.4)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#9B5CFF]/20 to-[#00D9FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="font-display font-bold text-lg text-[#F5F5FA] group-hover:text-[#00D9FF] transition-colors tracking-tight">
                  PM
                </span>
                {/* Glow accent */}
                <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-[#00D9FF] blur-[1px]" />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-display font-semibold text-[#F5F5FA] tracking-wide group-hover:text-[#00D9FF] transition-colors">
                  Prateek Mohanty
                </span>
                <span className="text-[10px] font-mono text-[#A3A8B8] flex items-center gap-1">
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
              'hidden md:flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300',
              scrolled
                ? 'bg-[#10121A]/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                : 'bg-[#10121A]/50 backdrop-blur-md border border-white/5'
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
                    'relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200',
                    isActive
                      ? 'text-[#F5F5FA]'
                      : 'text-[#A3A8B8] hover:text-[#F5F5FA]'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-gradient-to-r from-[#9B5CFF]/30 to-[#00D9FF]/20 border border-[#00D9FF]/40 rounded-full"
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
            className="flex items-center gap-2.5"
          >
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              aria-label={isMuted ? "Unmute audio feedback" : "Mute audio feedback"}
              title={isMuted ? "Enable UI sounds" : "Mute UI sounds"}
              className="p-2 rounded-xl bg-[#151824] border border-white/10 text-[#A3A8B8] hover:text-[#00D9FF] hover:border-[#00D9FF]/40 transition-colors hidden sm:inline-flex"
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
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[#00D9FF] bg-[#151824] border border-[#00D9FF]/30 hover:border-[#00D9FF] hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask AI</span>
              </button>
            )}

            {profileData.contact.resumeUrl ? (
              <a
                href={profileData.contact.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium text-[#00D9FF] bg-[#151824] border border-[#00D9FF]/30 hover:border-[#00D9FF] hover:shadow-[0_0_12px_rgba(0,217,255,0.3)] transition-all"
              >
                <span>Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ) : null}

            <a
              href="#contact"
              onClick={() => soundFx.playSelect()}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium font-sans text-white bg-gradient-to-r from-[#9B5CFF] to-[#7B2CBF] hover:from-[#8A4CE6] hover:to-[#6A23A6] shadow-[0_0_20px_rgba(155,92,255,0.3)] hover:shadow-[0_0_25px_rgba(155,92,255,0.5)] transition-all transform hover:-translate-y-0.5"
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
                <a
                  href={profileData.contact.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 px-3 rounded-lg text-sm font-mono text-[#00D9FF] hover:bg-[#151824] transition-colors"
                >
                  <span>Resume</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
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
