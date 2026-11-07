import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowDown, Code2, Sparkles } from 'lucide-react';
import { profileData } from '../../data/profile';
import { SplineHero } from '../spline/SplineHero';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

const firstName = "PRATEEK";
const lastName = "MOHANTY.";

const letterContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.1,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    y: 60,
    opacity: 0,
    filter: 'blur(8px)',
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      damping: 18,
      stiffness: 140,
    },
  },
};

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-32 sm:pt-36 md:pt-40 pb-20 px-4 sm:px-6 md:px-8 overflow-hidden bg-cyber-grid"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#9B5CFF]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Animated Identity & Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Eyebrow Label: HELLO, I'M */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-[#151824] border border-[#9B5CFF]/30 text-[#00D9FF] flex items-center gap-2 shadow-[0_0_15px_rgba(155,92,255,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
              HELLO, I'M
            </span>
            <span className="text-xs font-mono text-[#A3A8B8] hidden sm:inline-block">
              // B.Tech AI & ML • 3rd Year
            </span>
          </motion.div>

          {/* SIGNATURE CINEMATIC NAME REVEAL */}
          <div className="relative my-2 select-none" aria-label="Prateek Mohanty">
            <motion.h1
              variants={letterContainerVariants}
              initial="hidden"
              animate="visible"
              className="font-display font-extrabold tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.98]"
            >
              {/* First Name: PRATEEK */}
              <div className="overflow-hidden flex items-center">
                {firstName.split("").map((char, index) => (
                  <motion.span
                    key={`first-${index}`}
                    variants={letterVariants}
                    whileHover={{
                      y: -8,
                      scale: 1.1,
                      color: '#00D9FF',
                      textShadow: '0 0 20px rgba(0, 217, 255, 0.7)',
                      transition: { type: 'spring' as const, stiffness: 400, damping: 10 }
                    }}
                    className="inline-block cursor-default text-[#F5F5FA] transition-colors"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Last Name: MOHANTY. with Gradient and Light Sweep */}
              <div className="overflow-hidden relative flex items-center mt-1 sm:mt-2">
                {lastName.split("").map((char, index) => (
                  <motion.span
                    key={`last-${index}`}
                    variants={letterVariants}
                    whileHover={{
                      y: -8,
                      scale: 1.1,
                      color: '#9B5CFF',
                      textShadow: '0 0 25px rgba(155, 92, 255, 0.8)',
                      transition: { type: 'spring' as const, stiffness: 400, damping: 10 }
                    }}
                    className={`inline-block cursor-default transition-colors ${
                      char === '.' ? 'text-[#00D9FF]' : 'text-gradient-purple-cyan'
                    }`}
                  >
                    {char}
                  </motion.span>
                ))}

                {/* Subtle Light Sweep beam across the name */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                  <div className="w-16 h-full bg-gradient-to-r from-transparent via-white to-transparent animate-light-sweep" />
                </div>
              </div>
            </motion.h1>

            {/* Sophisticated Animated Underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="h-[2px] w-48 sm:w-64 bg-gradient-to-r from-[#9B5CFF] via-[#00D9FF] to-transparent mt-4"
            />
          </div>

          {/* Professional Identity Stack */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 mt-6 mb-5"
          >
            {profileData.headline.map((item, idx) => (
              <React.Fragment key={item}>
                <span className="text-sm sm:text-base font-display font-medium text-[#F5F5FA] bg-[#151824]/90 px-3 py-1 rounded-lg border border-white/10 shadow-sm">
                  {item}
                </span>
                {idx < profileData.headline.length - 1 && (
                  <span className="text-[#9B5CFF] font-bold text-xs">•</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-base sm:text-lg text-[#A3A8B8] max-w-xl leading-relaxed mb-8 font-sans"
          >
            "Exploring intelligent technologies. Building meaningful digital experiences. Turning ideas into reality."
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-semibold text-sm text-white bg-gradient-to-r from-[#9B5CFF] to-[#7B2CBF] hover:from-[#8A4CE6] hover:to-[#6A23A6] shadow-[0_0_25px_rgba(155,92,255,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-[#00D9FF]" />
              <span>Explore My Work</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-semibold text-sm text-[#F5F5FA] bg-[#10121A] border border-[#00D9FF]/40 hover:border-[#00D9FF] hover:bg-[#151824] shadow-[0_0_15px_rgba(0,217,255,0.15)] transition-all transform hover:-translate-y-0.5"
            >
              <span>Let's Connect</span>
            </a>
          </motion.div>

          {/* Social Links Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex items-center gap-4 text-[#A3A8B8]"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-[#A3A8B8]/70">
              Profiles:
            </span>
            <div className="flex items-center gap-2">
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-[#10121A] border border-white/10 text-[#F5F5FA] hover:text-[#00D9FF] hover:border-[#00D9FF]/40 hover:shadow-[0_0_12px_rgba(0,217,255,0.3)] transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-[#10121A] border border-white/10 text-[#F5F5FA] hover:text-[#00D9FF] hover:border-[#00D9FF]/40 hover:shadow-[0_0_12px_rgba(0,217,255,0.3)] transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.contact.leetcode}
                target="_blank"
                rel="noreferrer"
                aria-label="LeetCode Profile"
                className="p-2.5 rounded-xl bg-[#10121A] border border-white/10 text-[#F5F5FA] hover:text-[#9B5CFF] hover:border-[#9B5CFF]/40 hover:shadow-[0_0_12px_rgba(155,92,255,0.3)] transition-all"
              >
                <Code2 className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Published Spline 3D Scene */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">
          <SplineHero />
        </div>

      </div>

      {/* Floating Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[#A3A8B8]"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#A3A8B8]/60">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-[#00D9FF]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
