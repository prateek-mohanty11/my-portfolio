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
                  maxTilt={8}
                  className="h-full rounded-3xl bg-[#10121A]/85 border border-white/10 p-7 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:border-white/20 glow-card"
                >
                  <div>
                    {/* Header: Trophy / Flag icon & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`p-3.5 rounded-2xl border flex items-center justify-center ${
                          isAward
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            : 'bg-[#9B5CFF]/10 border-[#9B5CFF]/30 text-[#00D9FF]'
                        }`}
                      >
                        {isAward ? <Trophy className="w-6 h-6" /> : <Flag className="w-6 h-6" />}
                      </div>

                      <span
                        className={`text-xs font-mono px-3 py-1 rounded-full border ${
                          isAward
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                            : 'bg-[#00D9FF]/10 border-[#00D9FF]/30 text-[#00D9FF]'
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>

                    {/* Title & Organization */}
                    <h3 className="font-display font-bold text-xl text-[#F5F5FA] mb-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs font-mono text-[#A3A8B8] mb-4">
                      {item.organization}
                    </p>

                    <p className="text-sm text-[#A3A8B8] leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Certificate / Verification Placeholder */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="p-3 rounded-xl bg-[#151824] border border-white/5 flex items-center justify-between text-xs font-mono text-[#F5F5FA]">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-[11px] text-[#A3A8B8]">{item.highlight}</span>
                      </div>
                      <span className="text-[10px] text-[#00D9FF]">Verified</span>
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
