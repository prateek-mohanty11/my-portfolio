import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Palette, Compass, MapPin, GraduationCap, Code } from 'lucide-react';
import { profileData } from '../../data/profile';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';

const pillars = [
  {
    icon: BrainCircuit,
    title: "Intelligent Systems",
    subtitle: "AI & Machine Learning",
    description: "Architecting data models, predictive intelligence, and algorithmic problem-solving for real-world impact.",
    color: "#9B5CFF",
  },
  {
    icon: Code,
    title: "Applied Software",
    subtitle: "Web & Engineering",
    description: "Developing robust, scalable web architectures and practical software solutions with clean code principles.",
    color: "#00D9FF",
  },
  {
    icon: Palette,
    title: "Thoughtful Design",
    subtitle: "UI/UX & Creative Strategy",
    description: "Bridging technical engineering with aesthetic sensibility, micro-interactions, and human-centered design.",
    color: "#EC4899",
  }
];

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-[#08090D] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#9B5CFF]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <SectionHeading
          eyebrow="01 // PHILOSOPHY & ABOUT"
          title="Curiosity drives everything I build."
          subtitle="Engineering intelligent systems at the intersection of AI, robust software, and immersive design."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Editorial narrative & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl bg-[#0C0E15] border border-white/[0.08] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#9B5CFF]/10 to-transparent pointer-events-none" />

              <div className="space-y-4 text-base sm:text-lg text-[#9095A6] leading-relaxed">
                {profileData.aboutEditorial.paragraphs.map((para, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={index === 0 ? "text-[#F5F5FA] font-display font-semibold text-lg sm:text-xl leading-snug tracking-tight" : "text-sm sm:text-base font-sans text-[#9095A6]"}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Verified academic facts strip */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="flex items-center gap-2.5 text-[#F5F5FA]">
                  <GraduationCap className="w-4 h-4 text-[#00D9FF]" />
                  <span>{profileData.education} ({profileData.academicYear})</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#F5F5FA]">
                  <MapPin className="w-4 h-4 text-[#9B5CFF]" />
                  <span>{profileData.location}</span>
                </div>
              </div>
            </div>

            {/* Quick quote block with clean architectural left-rule */}
            <div className="p-5 rounded-xl bg-[#0C0E15] border-l-2 border-[#00D9FF] border-y border-r border-white/[0.06] flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-[#00D9FF]/10 text-[#00D9FF] flex-shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-sans text-[#F5F5FA] italic leading-relaxed">
                "Technology becomes meaningful when intelligent systems and thoughtful design come together."
              </p>
            </div>
          </div>

          {/* Right Column: 3 Core Pillars */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#5C6275] block mb-2">
              // CORE DISCIPLINES
            </span>

            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <TiltCard
                  key={pillar.title}
                  maxTilt={6}
                  className="p-5 rounded-xl bg-[#0C0E15] border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-sm glow-card"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg border flex-shrink-0"
                      style={{
                        backgroundColor: `${pillar.color}15`,
                        borderColor: `${pillar.color}35`,
                        color: pillar.color
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono text-[#5C6275]">
                          [0{idx + 1}]
                        </span>
                        <h4 className="font-display font-bold text-base text-[#F5F5FA] tracking-tight">
                          {pillar.title}
                        </h4>
                      </div>
                      <p className="text-[11px] font-mono mb-1.5" style={{ color: pillar.color }}>
                        {pillar.subtitle}
                      </p>
                      <p className="text-xs text-[#9095A6] leading-relaxed font-sans">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
