import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flag, ShieldCheck } from 'lucide-react';
import { achievementsData } from '../../data/achievements';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-[#08090D] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#9B5CFF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <SectionHeading
          eyebrow="05 // RECOGNITION & PARTICIPATION"
          title="Milestones along the way."
          subtitle="Verified innovation challenges, national-level hackathon participation, and technical club honors."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {achievementsData.map((item, idx) => {
            const isAward = item.type === 'Award';
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard
                  maxTilt={5}
                  className="h-full rounded-2xl bg-[#0C0E15] border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-white/20 glow-card"
                >
                  <div>
                    {/* Header: Trophy / Flag icon & Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`p-3 rounded-xl border flex items-center justify-center ${
                          isAward
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            : 'bg-[#9B5CFF]/10 border-[#9B5CFF]/30 text-[#00D9FF]'
                        }`}
                      >
                        {isAward ? <Trophy className="w-5 h-5" /> : <Flag className="w-5 h-5" />}
                      </div>

                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                          isAward
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                            : 'bg-[#00D9FF]/10 border-[#00D9FF]/30 text-[#00D9FF]'
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>

                    {/* Title & Organization */}
                    <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#F5F5FA] tracking-tight mb-1.5 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs font-mono text-[#5C6275] mb-3">
                      {item.organization}
                    </p>

                    <p className="text-xs sm:text-sm text-[#9095A6] leading-relaxed mb-6 font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Certificate / Verification Placeholder */}
                  <div className="pt-4 border-t border-white/[0.08]">
                    <div className="p-3 rounded-lg bg-[#121520] border border-white/[0.05] flex items-center justify-between text-xs font-mono text-[#F5F5FA]">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-[11px] text-[#9095A6]">{item.highlight}</span>
                      </div>
                      <span className="text-[10px] text-[#00D9FF] font-medium tracking-wider uppercase">[VERIFIED]</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
