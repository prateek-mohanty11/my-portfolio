import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { experiencesData } from '../../data/experience';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';

export const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(experiencesData[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-[#08090D] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#00D9FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        <SectionHeading
          eyebrow="04 // LEADERSHIP & ROLES"
          title="Experience that shaped my journey."
          subtitle="Leadership roles, creative management, and industrial internship exposure."
        />

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          
          {experiencesData.map((exp, idx) => {
            const isExpanded = expandedId === exp.id;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0C0E15] border-2 border-[#9B5CFF] flex items-center justify-center shadow-[0_0_10px_rgba(155,92,255,0.4)] group-hover:border-[#00D9FF] group-hover:shadow-[0_0_12px_rgba(0,217,255,0.5)] transition-all">
                  <div className="w-2 h-2 rounded-full bg-[#00D9FF]" />
                </div>

                {/* Experience Card */}
                <TiltCard
                  maxTilt={3}
                  className="rounded-xl bg-[#0C0E15] border border-white/[0.08] p-6 sm:p-7 transition-all duration-300 hover:border-white/20 glow-card"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#121520] border border-[#00D9FF]/25 text-[#00D9FF]">
                        {exp.tag}
                      </span>
                      <span className="text-[11px] font-mono text-[#5C6275] uppercase tracking-wider">
                        • {exp.type}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleExpand(exp.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-[#9095A6] hover:text-[#00D9FF] transition-colors"
                    >
                      <span>{isExpanded ? "[ COLLAPSE ]" : "[ EXPAND ]"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Role & Org */}
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#F5F5FA] tracking-tight group-hover:text-[#00D9FF] transition-colors">
                    {exp.role}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#9095A6] font-sans mt-1 mb-3.5">
                    <Building2 className="w-3.5 h-3.5 text-[#9B5CFF]" />
                    <span className="text-[#F5F5FA]/90 font-medium">{exp.organization}</span>
                  </div>

                  {/* Core Description */}
                  <p className="text-xs sm:text-sm text-[#9095A6] leading-relaxed mb-4 font-sans">
                    "{exp.description}"
                  </p>

                  {/* Expandable Skills and Details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 border-t border-white/[0.08] space-y-3"
                    >
                      <span className="text-[11px] font-mono text-[#5C6275] uppercase tracking-wider block">
                        Core Competencies & Hands-On Scope:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {exp.skillsInvolved.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#121520] text-[#CCD0DF] border border-white/[0.05]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </TiltCard>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
