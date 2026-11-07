import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../../utils/audio';
import myPhoto from '../../assets/my_photo.jpeg';
import './PhotoRevealCard.css';

interface SkillBubbleData {
  id: string;
  name: string;
  color: string;
  glow: string;
  floatDuration: number;
  positionDesktop: string;
  positionMobile: string;
}

const SKILL_BUBBLES: SkillBubbleData[] = [
  // Left Side Constellation (7 Skills)
  {
    id: 'python',
    name: 'Python',
    color: '#00D9FF',
    glow: 'rgba(0, 217, 255, 0.5)',
    floatDuration: 3.2,
    positionDesktop: 'top-2 -left-28 lg:-left-44',
    positionMobile: ''
  },
  {
    id: 'ts',
    name: 'TypeScript',
    color: '#3178C6',
    glow: 'rgba(49, 120, 198, 0.5)',
    floatDuration: 3.7,
    positionDesktop: 'top-16 -left-60 lg:-left-76',
    positionMobile: ''
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    color: '#9B5CFF',
    glow: 'rgba(155, 92, 255, 0.5)',
    floatDuration: 4.1,
    positionDesktop: 'top-[36%] -left-32 lg:-left-52',
    positionMobile: ''
  },
  {
    id: 'nlp',
    name: 'NLP',
    color: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.5)',
    floatDuration: 3.5,
    positionDesktop: 'top-[52%] -left-64 lg:-left-80',
    positionMobile: ''
  },
  {
    id: 'cv',
    name: 'Computer Vision',
    color: '#10B981',
    glow: 'rgba(16, 185, 129, 0.5)',
    floatDuration: 3.9,
    positionDesktop: 'top-[68%] -left-28 lg:-left-44',
    positionMobile: ''
  },
  {
    id: 'dl',
    name: 'Deep Learning',
    color: '#00FFAA',
    glow: 'rgba(0, 255, 170, 0.5)',
    floatDuration: 3.4,
    positionDesktop: 'bottom-6 -left-56 lg:-left-72',
    positionMobile: ''
  },
  {
    id: 'numpy',
    name: 'NumPy & Pandas',
    color: '#6366F1',
    glow: 'rgba(99, 102, 241, 0.5)',
    floatDuration: 4.3,
    positionDesktop: 'bottom-[-16px] -left-16 lg:-left-32',
    positionMobile: ''
  },

  // Right Side Constellation (7 Skills)
  {
    id: 'react',
    name: 'React',
    color: '#38BDF8',
    glow: 'rgba(56, 189, 248, 0.5)',
    floatDuration: 3.3,
    positionDesktop: 'top-2 -right-28 lg:-right-44',
    positionMobile: ''
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    color: '#06B6D4',
    glow: 'rgba(6, 182, 212, 0.5)',
    floatDuration: 3.8,
    positionDesktop: 'top-16 -right-60 lg:-right-76',
    positionMobile: ''
  },
  {
    id: 'uiux',
    name: 'UI/UX Design',
    color: '#EC4899',
    glow: 'rgba(236, 72, 153, 0.5)',
    floatDuration: 4.2,
    positionDesktop: 'top-[36%] -right-32 lg:-right-52',
    positionMobile: ''
  },
  {
    id: 'figma',
    name: 'Figma',
    color: '#F43F5E',
    glow: 'rgba(244, 63, 94, 0.5)',
    floatDuration: 3.6,
    positionDesktop: 'top-[52%] -right-64 lg:-right-80',
    positionMobile: ''
  },
  {
    id: 'threejs',
    name: 'Three.js',
    color: '#10E7B2',
    glow: 'rgba(16, 231, 178, 0.5)',
    floatDuration: 4.0,
    positionDesktop: 'top-[68%] -right-28 lg:-right-44',
    positionMobile: ''
  },
  {
    id: 'java',
    name: 'Java',
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.5)',
    floatDuration: 3.5,
    positionDesktop: 'bottom-6 -right-56 lg:-right-72',
    positionMobile: ''
  },
  {
    id: 'cprog',
    name: 'C Programming',
    color: '#60A5FA',
    glow: 'rgba(96, 165, 250, 0.5)',
    floatDuration: 4.4,
    positionDesktop: 'bottom-[-16px] -right-16 lg:-right-32',
    positionMobile: ''
  }
];

interface InteractiveBubbleProps {
  bubble: SkillBubbleData;
}

const InteractiveBubble: React.FC<InteractiveBubbleProps> = ({ bubble }) => {
  const [isBursting, setIsBursting] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBursting) return;

    soundFx.playHover();
    setIsBursting(true);

    // Auto-restore after burst animation
    setTimeout(() => {
      setIsBursting(false);
    }, 900);
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Burst Particles */}
      <AnimatePresence>
        {isBursting && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i * 60) * (Math.PI / 180);
              const distance = 46;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, scale: 1.2, opacity: 1 }}
                  animate={{ x, y, scale: 0, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: bubble.color,
                    boxShadow: `0 0 10px ${bubble.glow}`
                  }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Bubble Pill */}
      <motion.button
        onClick={handleClick}
        animate={
          isBursting
            ? { scale: 0, opacity: 0 }
            : {
                scale: 1,
                opacity: 1,
                y: [0, -8, 0]
              }
        }
        transition={
          isBursting
            ? { duration: 0.25 }
            : {
                y: {
                  duration: bubble.floatDuration,
                  repeat: Infinity,
                  ease: 'easeInOut'
                },
                scale: { type: 'spring', stiffness: 400, damping: 15 }
              }
        }
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative px-4 py-2 rounded-full bg-[#0C0E15]/90 border border-white/10 hover:border-white/30 backdrop-blur-md shadow-lg cursor-pointer flex items-center gap-2 select-none transition-colors"
        style={{
          boxShadow: `0 4px 20px -2px rgba(0, 0, 0, 0.6), 0 0 15px -3px ${bubble.glow}`
        }}
        title={`Click to burst ${bubble.name}`}
        aria-label={`Skill node: ${bubble.name}`}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
          style={{ backgroundColor: bubble.color, boxShadow: `0 0 8px ${bubble.color}` }}
        />
        <span className="font-mono text-xs font-semibold text-[#F5F5FA] group-hover:text-white tracking-wide whitespace-nowrap">
          {bubble.name}
        </span>
      </motion.button>
    </div>
  );
};

export const PhotoRevealSection: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleFirstHover = () => {
    if (!isRevealed) {
      soundFx.playSelect();
      setIsRevealed(true);
    }
  };

  return (
    <section
      id="persona-card"
      className="relative py-16 sm:py-24 bg-[#08090D] overflow-hidden border-t border-b border-white/[0.06]"
    >
      {/* Background cyber ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#9B5CFF]/10 via-[#00D9FF]/10 to-transparent rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono tracking-[0.16em] uppercase mb-3 bg-[#0C0E15] border border-white/10 text-[#00D9FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
            // 02 · IDENTITY MATRIX
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-[-0.03em] text-[#F5F5FA] leading-[1.08]">
            Interactive Neural Persona
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#9095A6] font-sans leading-relaxed">
            Hover over the cyber card to decrypt identity photo. Click skill nodes to test particle burst kinetics.
          </p>
        </div>

        {/* Central Stage: Photo Card surrounded by Interactive Skill Bubbles */}
        <div className="relative flex items-center justify-center w-full max-w-4xl min-h-[460px] sm:min-h-[520px]">
          
          {/* Desktop Skill Bubbles (Positioned organically in 3D space around the card) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            {SKILL_BUBBLES.map((bubble) => (
              <div
                key={bubble.id}
                className={`absolute ${bubble.positionDesktop} pointer-events-auto z-20`}
              >
                <InteractiveBubble bubble={bubble} />
              </div>
            ))}
          </div>

          {/* THE EXACT SUPPLIED PHOTO CARD IMPLEMENTATION */}
          <div
            className="photo-card-wrapper z-10"
            onMouseEnter={handleFirstHover}
            onTouchStart={handleFirstHover}
          >
            <div className="container noselect">
              <div className="canvas">
                {/* All 25 3D Tracking Quadrants for Full Fluid Perspective Tilt */}
                <div className="tracker tr-1" />
                <div className="tracker tr-2" />
                <div className="tracker tr-3" />
                <div className="tracker tr-4" />
                <div className="tracker tr-5" />
                <div className="tracker tr-6" />
                <div className="tracker tr-7" />
                <div className="tracker tr-8" />
                <div className="tracker tr-9" />
                <div className="tracker tr-10" />
                <div className="tracker tr-11" />
                <div className="tracker tr-12" />
                <div className="tracker tr-13" />
                <div className="tracker tr-14" />
                <div className="tracker tr-15" />
                <div className="tracker tr-16" />
                <div className="tracker tr-17" />
                <div className="tracker tr-18" />
                <div className="tracker tr-19" />
                <div className="tracker tr-20" />
                <div className="tracker tr-21" />
                <div className="tracker tr-22" />
                <div className="tracker tr-23" />
                <div className="tracker tr-24" />
                <div className="tracker tr-25" />

                <div id="card">
                  <div className="card-content">
                    <div className="card-glare" />

                    {/* Cyber line beam scanners */}
                    <div className="cyber-lines">
                      <span /><span /><span /><span />
                    </div>

                    {/* Initial Prompt text (Hides upon reveal) */}
                    <p id="prompt" className={isRevealed ? 'hidden-prompt' : ''}>
                      {isRevealed ? '' : 'HOVER TO REVEAL'}
                    </p>

                    {/* Integrated Photo Layer (Revealed smoothly on first hover, remains permanent) */}
                    <div className={`photo-reveal-layer ${isRevealed ? 'revealed' : ''}`}>
                      <img
                        src={myPhoto}
                        alt="Prateek Mohanty"
                        className="photo-image"
                        loading="eager"
                      />
                    </div>

                    {/* Hover Title */}
                    <div className="title">CYBER<br />CARD</div>

                    {/* Radial Glowing Elements */}
                    <div className="glowing-elements">
                      <div className="glow-1" />
                      <div className="glow-2" />
                      <div className="glow-3" />
                    </div>

                    {/* Subtitle / Nameplate */}
                    <div className="subtitle">
                      <span>PRATEEK</span>
                      <span className="highlight">MOHANTY</span>
                    </div>

                    {/* Floating particle spans */}
                    <div className="card-particles">
                      <span /><span /><span /> <span /><span /><span />
                    </div>

                    {/* Cyber tech corner brackets */}
                    <div className="corner-elements">
                      <span /><span /><span /><span />
                    </div>

                    {/* Animated vertical scanline */}
                    <div className="scan-line" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Skill Bubbles (Flexibly displayed below card on small viewports) */}
        <div className="md:hidden flex flex-wrap items-center justify-center gap-2 mt-8 w-full max-w-md">
          {SKILL_BUBBLES.map((bubble) => (
            <InteractiveBubble key={bubble.id} bubble={bubble} />
          ))}
        </div>

      </div>
    </section>
  );
};

