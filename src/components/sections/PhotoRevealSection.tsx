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
  pathX: number[];
  pathY: number[];
  rotate: number[];
  duration: number;
  wobbleDuration: string;
  desktopPos: string;
}

// 6 Autonomous Wandering Soap Bubbles with grand-tour roving trajectories across the screen space
const SKILL_BUBBLES: SkillBubbleData[] = [
  {
    id: 'python',
    name: 'Python',
    color: '#00D9FF',
    glow: 'rgba(0, 217, 255, 0.45)',
    // Roams vertically & horizontally across the entire left side (travels over 460px up & down)
    pathX: [0, 90, -15, 140, 20, 160, -25, 80, 0],
    pathY: [0, 150, 320, 460, 310, 140, 230, 50, 0],
    rotate: [0, 6, -8, 7, -5, 6, -7, 3, 0],
    duration: 23,
    wobbleDuration: '7.2s',
    desktopPos: 'top-[8%] left-[4%]'
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    color: '#9B5CFF',
    glow: 'rgba(155, 92, 255, 0.45)',
    // Glides across the entire top open corridor above the card from left to right and back (over 480px traversal)
    pathX: [0, 160, 340, 480, 320, 140, -50, 0],
    pathY: [0, 35, -10, 45, -20, 25, -15, 0],
    rotate: [0, -6, 8, -5, 7, -4, 3, 0],
    duration: 25,
    wobbleDuration: '8.4s',
    desktopPos: 'top-[3%] left-[16%]'
  },
  {
    id: 'dl',
    name: 'Deep Learning',
    color: '#00FFAA',
    glow: 'rgba(0, 255, 170, 0.45)',
    // Roams diagonally across lower-left and middle-lower zones (travels up 280px and back)
    pathX: [0, 120, 220, 80, -20, 150, 10, 100, 0],
    pathY: [0, -160, -280, -140, -240, -80, -190, -60, 0],
    rotate: [0, 5, -6, 7, -4, 6, -5, 2, 0],
    duration: 22,
    wobbleDuration: '6.8s',
    desktopPos: 'bottom-[8%] left-[6%]'
  },
  {
    id: 'react',
    name: 'React',
    color: '#38BDF8',
    glow: 'rgba(56, 189, 248, 0.45)',
    // Roams vertically & horizontally across the entire right side (travels over 460px up & down)
    pathX: [0, -90, 25, -140, -30, -150, 35, -70, 0],
    pathY: [0, 160, 320, 460, 290, 150, 230, 60, 0],
    rotate: [0, -7, 6, -8, 5, -6, 4, -2, 0],
    duration: 21,
    wobbleDuration: '7.8s',
    desktopPos: 'top-[8%] right-[5%]'
  },
  {
    id: 'uiux',
    name: 'UI/UX Design',
    color: '#EC4899',
    glow: 'rgba(236, 72, 153, 0.45)',
    // Glides across the bottom open corridor underneath the card from right to left and back (over 480px traversal)
    pathX: [0, -160, -340, -480, -320, -140, 50, 0],
    pathY: [0, -35, 15, -45, 20, -25, 10, 0],
    rotate: [0, 6, -5, 8, -6, 4, -3, 0],
    duration: 26,
    wobbleDuration: '8.1s',
    desktopPos: 'bottom-[3%] right-[16%]'
  },
  {
    id: 'java',
    name: 'Java',
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.45)',
    // Roams diagonally across mid-right to lower-right zones (swoops 300px upwards and back)
    pathX: [0, -120, -70, 35, -140, -35, 20, -80, 0],
    pathY: [0, -150, -300, -180, -70, -240, -120, -40, 0],
    rotate: [0, -5, 7, -6, 5, -4, 6, -2, 0],
    duration: 24,
    wobbleDuration: '6.5s',
    desktopPos: 'bottom-[12%] right-[8%]'
  }
];

interface InteractiveBubbleProps {
  bubble: SkillBubbleData;
  isMobile?: boolean;
}

const FloatingBubbleSphere: React.FC<InteractiveBubbleProps> = ({ bubble, isMobile }) => {
  const [isBursting, setIsBursting] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBursting) return;

    soundFx.playHover();
    setIsBursting(true);

    // Re-inflate soap bubble after burst animation
    setTimeout(() => {
      setIsBursting(false);
    }, 850);
  };

  const animX = isMobile
    ? [0, 14, -12, 10, 0]
    : bubble.pathX;
  const animY = isMobile
    ? [0, -12, 14, -8, 0]
    : bubble.pathY;
  const animDuration = isMobile ? 8.5 : bubble.duration;

  return (
    <div className="relative inline-flex items-center justify-center select-none">
      {/* Radial Particle & Shockwave Burst */}
      <AnimatePresence>
        {isBursting && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
            {/* Expanding Shockwave Ring */}
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute w-20 h-20 rounded-full border-2"
              style={{
                borderColor: bubble.color,
                boxShadow: `0 0 20px ${bubble.glow}`
              }}
            />

            {/* 10 Radial Iridescent Spark Particles */}
            {Array.from({ length: 10 }).map((_, i) => {
              const angle = (i * 36) * (Math.PI / 180);
              const distance = 46 + (i % 3) * 16;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, scale: 1.5, opacity: 1 }}
                  animate={{ x, y, scale: 0, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: bubble.color,
                    boxShadow: `0 0 12px ${bubble.glow}`
                  }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* CONTINUOUS AUTONOMOUS WANDERING MOTION OVER THE SCREEN SPACE */}
      <motion.div
        animate={
          isBursting
            ? { scale: 0, opacity: 0 }
            : {
                x: animX,
                y: animY,
                rotate: bubble.rotate,
                scale: 1,
                opacity: 1
              }
        }
        transition={
          isBursting
            ? { duration: 0.2, ease: 'easeIn' }
            : {
                x: {
                  duration: animDuration,
                  repeat: Infinity,
                  ease: 'easeInOut'
                },
                y: {
                  duration: animDuration * 0.9,
                  repeat: Infinity,
                  ease: 'easeInOut'
                },
                rotate: {
                  duration: animDuration * 1.1,
                  repeat: Infinity,
                  ease: 'easeInOut'
                },
                scale: { type: 'spring', stiffness: 400, damping: 15 }
              }
        }
        whileHover={{ scale: 1.18 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleClick}
        className="soap-bubble"
        style={
          {
            '--wobble-duration': bubble.wobbleDuration,
            '--bubble-glow': bubble.glow
          } as React.CSSProperties
        }
        title={`Click to pop ${bubble.name}`}
        aria-label={`Interactive soap bubble: ${bubble.name}`}
      >
        {/* 1. Rotating Iridescent Chromatic Sheen with hollowed transparent center */}
        <div className="soap-bubble-iridescence" />

        {/* 2. Top-Left Primary Curved Specular Highlight Arc */}
        <div className="soap-bubble-arc" />

        {/* 3. Pinpoint Specular Star Glint */}
        <div className="soap-bubble-glint" />

        {/* 4. Secondary Bottom-Right Curved Reflection */}
        <div className="soap-bubble-secondary-arc" />

        {/* 5. Bottom Caustic Pool */}
        <div
          className="soap-bubble-caustic"
          style={{
            background: `radial-gradient(ellipse at center, ${bubble.color}45 0%, rgba(155, 92, 255, 0.2) 50%, transparent 80%)`
          }}
        />

        {/* 6. Crisp, Ultra-Readable Nameplate inside the Bubble */}
        <div className="soap-bubble-content">
          <span className="soap-bubble-title">
            {bubble.name}
          </span>
          <span
            className="soap-bubble-dot"
            style={{
              backgroundColor: bubble.color,
              boxShadow: `0 0 8px ${bubble.color}`
            }}
          />
        </div>
      </motion.div>
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
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#9B5CFF]/10 via-[#00D9FF]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

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
            Hover over the card to decrypt identity photo. Click orbiting soap bubbles to pop them.
          </p>
        </div>

        {/* Central Stage: Photo Card in Center with Autonomous Soap Bubbles Roaming Dynamically Over the Screen */}
        <div className="relative flex items-center justify-center w-full max-w-5xl min-h-[520px] sm:min-h-[580px] lg:min-h-[640px]">
          
          {/* Desktop Floating Soap Bubbles — freely roaming vast screen trajectories without colliding with the card */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            {SKILL_BUBBLES.map((bubble) => (
              <div
                key={bubble.id}
                className={`absolute ${bubble.desktopPos} pointer-events-auto z-20`}
              >
                <FloatingBubbleSphere bubble={bubble} />
              </div>
            ))}
          </div>

          {/* THE EXACT SUPPLIED PHOTO CARD IMPLEMENTATION (CENTER STAGE) */}
          <div
            className="photo-card-wrapper z-10 my-4"
            onMouseEnter={handleFirstHover}
            onTouchStart={handleFirstHover}
          >
            <div className="container noselect">
              <div className="canvas">
                {/* 25 3D Tracking Quadrants for Perspective Tilt */}
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

        {/* Mobile Floating Bubbles (Arranged cleanly with organic drift and zero overlap on smaller screens) */}
        <div className="md:hidden flex flex-col items-center gap-6 mt-6 w-full max-w-sm">
          <div className="flex justify-center gap-3">
            {SKILL_BUBBLES.slice(0, 3).map((bubble) => (
              <FloatingBubbleSphere key={bubble.id} bubble={bubble} isMobile={true} />
            ))}
          </div>
          <div className="flex justify-center gap-3">
            {SKILL_BUBBLES.slice(3, 6).map((bubble) => (
              <FloatingBubbleSphere key={bubble.id} bubble={bubble} isMobile={true} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
