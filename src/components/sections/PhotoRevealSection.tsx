import React, { useState } from 'react';
import { motion } from 'framer-motion';
import myPhoto from '../../assets/my_photo.jpeg';
import { soundFx } from '../../utils/audio';
import { ShieldCheck, Sparkles } from 'lucide-react';
import './PhotoRevealCard.css';

export const PhotoRevealSection: React.FC = () => {
  const [hasRevealed, setHasRevealed] = useState(false);

  const handleFirstHover = () => {
    if (!hasRevealed) {
      soundFx.playSelect();
      setHasRevealed(true);
    }
  };

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden border-t border-b border-white/[0.06] bg-[#090B10]">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-[#9B5CFF]/10 via-[#00D9FF]/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading / Eyebrow */}
        <div className="text-center mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[11px] font-mono tracking-[0.16em] uppercase mb-3 bg-[#0C0E15] border border-white/10 text-[#00D9FF]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
            // OPERATOR · IDENTITY
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold tracking-[-0.03em] text-[#F5F5FA]"
          >
            The Developer Behind the Terminal
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-xs sm:text-sm text-[#9095A6] font-mono max-w-md mx-auto"
          >
            [ Interactive 3D Holographic Identity Card ]
          </motion.p>
        </div>

        {/* 3D Cyber Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="cyber-card-wrapper"
          onMouseEnter={handleFirstHover}
          onTouchStart={handleFirstHover}
        >
          <div className="container noselect">
            <div className="canvas">
              {/* 25 3D Tracking Sectors for smooth tilt response */}
              {Array.from({ length: 25 }, (_, i) => (
                <div key={i + 1} className={`tracker tr-${i + 1}`} />
              ))}

              {/* The 3D Cyber Card with Photo Reveal */}
              <div id="card" className={hasRevealed ? "is-revealed" : ""}>
                {/* Photo Element */}
                <img
                  src={myPhoto}
                  alt="Prateek Mohanty"
                  className="card-photo-img"
                />
                
                {/* Vignette Overlay for Depth */}
                <div className="card-photo-overlay" />

                {/* Cyber HUD Content & Interactions */}
                <div className="card-content">
                  <div className="card-glare" />
                  
                  {/* Holographic scanning grid lines */}
                  <div className="cyber-lines">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  {/* Initial prompt text */}
                  <p id="prompt">
                    {hasRevealed ? "OPERATOR REVEALED" : "HOVER TO REVEAL"}
                  </p>

                  {/* Cyber Title */}
                  <div className="title">
                    CYBER<br />CARD
                  </div>

                  {/* Corner Accent Brackets */}
                  <div className="corner-elements">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  {/* Glowing Radial Elements */}
                  <div className="glowing-elements">
                    <div className="glow-1" />
                    <div className="glow-2" />
                    <div className="glow-3" />
                  </div>

                  {/* Name Subtitle */}
                  <div className="subtitle">
                    <span>PRATEEK</span>
                    <span className="highlight">MOHANTY</span>
                  </div>

                  {/* High-tech floating particles */}
                  <div className="card-particles">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  {/* Scanning beam */}
                  <div className="scan-line" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Status Indicator Bar */}
        <div className="mt-8 text-center flex items-center justify-center gap-2 text-xs font-mono text-[#5C6275]">
          <ShieldCheck className={`w-4 h-4 ${hasRevealed ? "text-[#00D9FF]" : "text-[#5C6275]"}`} />
          <span>
            STATUS: <strong className={hasRevealed ? "text-[#00D9FF]" : "text-[#9095A6]"}>
              {hasRevealed ? "BIOMETRIC PHOTO VERIFIED" : "AWAITING CURSOR HOVER"}
            </strong>
          </span>
        </div>

      </div>
    </section>
  );
};
