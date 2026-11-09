import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowDown, Code2, Sparkles } from 'lucide-react';
import { profileData } from '../../data/profile';
import { SplineHero } from '../spline/SplineHero';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { soundFx } from '../../utils/audio';
import { forwardToCanvas } from '../../utils/forwardCanvasEvent';

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
      className="relative min-h-[100svh] flex items-center justify-center pt-28 sm:pt-36 md:pt-40 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden bg-cyber-grid"
    >
      {/* IMMERSIVE 3D BACKGROUND (Interactive Canvas, Full-Bleed & Enlarged) */}
      <SplineHero className="z-0 pointer-events-auto" />

      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#9B5CFF]/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* FOREGROUND HERO CONTENT (Floats seamlessly over the 3D background with pointer event passthrough) */}
      <div className="max-w-7xl mx-auto w-full relative z-10 pointer-events-none flex flex-col justify-center text-left">
        <div className="max-w-3xl">
          
          {/* Eyebrow Label: HELLO, I'M */}
          {/* Small Status & Category Intro */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center gap-2.5 mb-3.5 pointer-events-none w-fit"
          >
            <span
              onPointerMove={forwardToCanvas}
              onMouseMove={forwardToCanvas}
              className="px-3 py-1 rounded-md text-[11px] font-mono tracking-[0.16em] uppercase bg-[#0C0E15] border border-white/10 text-[#00D9FF] flex items-center gap-2 pointer-events-auto cursor-default shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
              HELLO, I'M
            </span>
            <span className="text-xs font-mono text-[#9095A6] hidden sm:inline-block pointer-events-none">
              // B.Tech AI & ML • 3rd Year
            </span>
          </motion.div>

          {/* SIGNATURE EDITORIAL NAME TYPOGRAPHY WITH DUAL HOVER & 3D PASS-THROUGH */}
          <div
            className="relative my-2 select-none pointer-events-none w-fit max-w-full"
            aria-label="Prateek Mohanty"
          >
            <motion.h1
              variants={letterContainerVariants}
              initial="hidden"
              animate="visible"
              className="font-name font-black tracking-[-0.035em] uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.92]"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              {/* Pure crawlable text for search engine indexers and screen readers */}
              <span className="sr-only">Prateek Mohanty</span>

              {/* First Name: PRATEEK */}
              <div className="overflow-hidden flex items-center pointer-events-none" aria-hidden="true">
                {firstName.split("").map((char, index) => (
                  <motion.span
                    key={`first-${index}`}
                    variants={letterVariants}
                    onMouseEnter={() => soundFx.playHover()}
                    onPointerMove={forwardToCanvas}
                    onMouseMove={forwardToCanvas}
                    onPointerDown={forwardToCanvas}
                    onPointerUp={forwardToCanvas}
                    whileHover={{
                      y: -10,
                      scale: 1.15,
                      color: '#00D9FF',
                      textShadow: '0 0 30px rgba(0, 217, 255, 0.9)',
                      transition: { type: 'spring' as const, stiffness: 450, damping: 12 }
                    }}
                    className="inline-block cursor-pointer px-[1px] text-[#F5F5FA] drop-shadow-sm transition-colors pointer-events-auto"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Last Name: MOHANTY. with Architectural Punctuation */}
              <div className="overflow-hidden relative flex items-center mt-1 sm:mt-1.5 pointer-events-none" aria-hidden="true">
                {lastName.split("").map((char, index) => (
                  <motion.span
                    key={`last-${index}`}
                    variants={letterVariants}
                    onMouseEnter={() => soundFx.playHover()}
                    onPointerMove={forwardToCanvas}
                    onMouseMove={forwardToCanvas}
                    onPointerDown={forwardToCanvas}
                    onPointerUp={forwardToCanvas}
                    whileHover={{
                      y: -10,
                      scale: 1.15,
                      color: '#9B5CFF',
                      textShadow: '0 0 35px rgba(155, 92, 255, 0.95)',
                      transition: { type: 'spring' as const, stiffness: 450, damping: 12 }
                    }}
                    className={`inline-block cursor-pointer px-[1px] drop-shadow-sm transition-colors pointer-events-auto ${
                      char === '.' ? 'text-[#00D9FF]' : 'text-gradient-purple-cyan'
                    }`}
                  >
                    {char}
                  </motion.span>
                ))}

                {/* Refined subtle Light Sweep */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
                  <div className="w-14 h-full bg-gradient-to-r from-transparent via-white to-transparent animate-light-sweep" />
                </div>
              </div>
            </motion.h1>

            {/* Precision Accent Rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="h-[1.5px] w-36 sm:w-52 bg-gradient-to-r from-[#9B5CFF] via-[#00D9FF] to-transparent mt-3.5 pointer-events-none"
            />
          </div>

          {/* Professional Identity Stack */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-5 sm:mt-6 mb-4 sm:mb-5 pointer-events-none"
          >
            {profileData.headline.map((item, idx) => (
              <React.Fragment key={item}>
                <span
                  onPointerMove={forwardToCanvas}
                  onMouseMove={forwardToCanvas}
                  className="text-xs sm:text-sm font-display font-medium text-[#F5F5FA] bg-[#0C0E15] px-3 sm:px-3.5 py-1.5 rounded-lg border border-white/[0.08] hover:border-white/20 transition-colors pointer-events-auto cursor-default shadow-xs"
                >
                  {item}
                </span>
                {idx < profileData.headline.length - 1 && (
                  <span className="text-[#9B5CFF] font-mono text-xs opacity-60 pointer-events-none">/</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Supporting Text — Editorial Monospaced Quote Treatment */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-sm sm:text-base text-[#9095A6] max-w-xl leading-relaxed mb-6 sm:mb-8 font-sans border-l-2 border-[#9B5CFF]/40 pl-4 py-1 pointer-events-none"
          >
            "Exploring intelligent technologies. Building meaningful digital experiences. Turning ideas into reality."
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center gap-3 sm:gap-3.5 mb-6 sm:mb-8 pointer-events-none"
          >
            <a
              href="#projects"
              onClick={() => soundFx.playSelect()}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg font-display font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B5CFF] to-[#7B2CBF] hover:from-[#A86DFF] hover:to-[#8E3DE6] shadow-[0_2px_16px_rgba(155,92,255,0.3)] transition-all transform hover:-translate-y-0.5 pointer-events-auto"
            >
              <Sparkles className="w-4 h-4 text-[#00D9FF]" />
              <span>Explore My Work</span>
            </a>

            <a
              href="#contact"
              onClick={() => soundFx.playSelect()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-display font-medium text-xs sm:text-sm text-[#F5F5FA] bg-[#0C0E15] border border-white/10 hover:border-[#00D9FF]/50 hover:text-[#00D9FF] transition-all transform hover:-translate-y-0.5 pointer-events-auto"
            >
              <span>Let's Connect</span>
            </a>
          </motion.div>

          {/* Social Links Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex items-center gap-3 sm:gap-3.5 text-[#9095A6] pointer-events-none"
          >
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#5C6275] pointer-events-none">
              // PROFILES:
            </span>
            <div className="flex items-center gap-2 pointer-events-auto">
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                onMouseEnter={() => soundFx.playHover()}
                className="p-2.5 rounded-lg bg-[#0C0E15] border border-white/[0.08] text-[#9095A6] hover:text-[#00D9FF] hover:border-[#00D9FF]/40 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                onMouseEnter={() => soundFx.playHover()}
                className="p-2.5 rounded-lg bg-[#0C0E15] border border-white/[0.08] text-[#9095A6] hover:text-[#00D9FF] hover:border-[#00D9FF]/40 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.contact.leetcode}
                target="_blank"
                rel="noreferrer"
                aria-label="LeetCode Profile"
                onMouseEnter={() => soundFx.playHover()}
                className="p-2.5 rounded-lg bg-[#0C0E15] border border-white/[0.08] text-[#9095A6] hover:text-[#9B5CFF] hover:border-[#9B5CFF]/40 transition-all"
              >
                <Code2 className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Floating Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[#A3A8B8] z-10 pointer-events-none"
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
