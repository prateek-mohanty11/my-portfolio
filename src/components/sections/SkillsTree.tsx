import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, ChevronRight, Layers } from 'lucide-react';
import { skillBranches, type SkillItem } from '../../data/skills';
import { SectionHeading } from '../ui/SectionHeading';
import { Modal } from '../ui/Modal';

export const SkillsTree: React.FC = () => {
  const [activeBranchId, setActiveBranchId] = useState<string>(skillBranches[0].id);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const activeBranch = skillBranches.find(b => b.id === activeBranchId) || skillBranches[0];

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-[#08090D] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#9B5CFF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <SectionHeading
          eyebrow="02 // ARCHITECTURE & CAPABILITIES"
          title="Interactive Skill Tree"
          subtitle="A branching graph of technical competencies spanning machine learning, modern engineering, and interface design."
        />

        {/* Branch Selector Tabs / Nodes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {skillBranches.map((branch) => {
            const isSelected = activeBranchId === branch.id;
            return (
              <button
                key={branch.id}
                onClick={() => setActiveBranchId(branch.id)}
                className={`relative p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#151824] shadow-xl'
                    : 'bg-[#10121A]/70 hover:bg-[#151824]/60 border-white/5'
                }`}
                style={{
                  borderColor: isSelected ? branch.color : 'rgba(255, 255, 255, 0.08)',
                  boxShadow: isSelected ? `0 0 25px ${branch.glowColor}` : 'none'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: branch.color }}
                  />
                  <span className="text-[10px] font-mono text-[#A3A8B8]">
                    {branch.skills.length} Nodes
                  </span>
                </div>
                <h3 className="font-display font-semibold text-sm sm:text-base text-[#F5F5FA] mb-1">
                  {branch.name}
                </h3>
                <p className="text-xs text-[#A3A8B8] line-clamp-2">
                  {branch.description}
                </p>
                {isSelected && (
                  <motion.div
                    layoutId="branchIndicator"
                    className="absolute -bottom-[2px] left-6 right-6 h-[2px] rounded-full"
                    style={{ backgroundColor: branch.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* INTERACTIVE TREE VISUALIZER CANVAS */}
        <div className="relative rounded-3xl bg-[#10121A]/90 border border-white/10 p-6 sm:p-10 backdrop-blur-xl overflow-hidden min-h-[480px] flex flex-col justify-between">
          
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />

          {/* Central Root Badge */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#151824] border border-[#9B5CFF]/40 text-[#00D9FF]">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#00D9FF] uppercase tracking-wider">
                    ROOT NODE
                  </span>
                  <span className="text-xs font-mono text-[#A3A8B8]">• Active:</span>
                  <span className="text-xs font-mono font-semibold" style={{ color: activeBranch.color }}>
                    {activeBranch.name}
                  </span>
                </div>
                <h4 className="font-display font-bold text-xl text-[#F5F5FA]">
                  MY TECH STACK
                </h4>
              </div>
            </div>

            <div className="text-xs font-mono text-[#A3A8B8] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Click any skill leaf for application context</span>
            </div>
          </div>

          {/* Branches and Leaves Grid */}
          <div className="relative z-10 my-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBranch.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {activeBranch.skills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.06, duration: 0.3 }}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedSkill(skill)}
                    className="group relative cursor-pointer p-5 rounded-2xl bg-[#151824]/90 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-md glow-card"
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[#A3A8B8] border border-white/5">
                        {skill.category}
                      </span>
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: activeBranch.color }}
                      />
                    </div>

                    <h4 className="font-display font-bold text-lg text-[#F5F5FA] group-hover:text-[#00D9FF] transition-colors mb-1.5 flex items-center justify-between">
                      <span>{skill.name}</span>
                      <ChevronRight className="w-4 h-4 text-[#A3A8B8] group-hover:translate-x-1 group-hover:text-[#00D9FF] transition-all" />
                    </h4>

                    <p className="text-xs text-[#A3A8B8] leading-relaxed mb-4 line-clamp-2">
                      {skill.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {skill.applications.map((app) => (
                        <span
                          key={app}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10121A] text-[#F5F5FA]/80 border border-white/5"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Info bar */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#A3A8B8]">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#9B5CFF]" />
              <span>4 Branches • 17 Core Nodes • Rigorous Computer Science & AI Foundation</span>
            </div>
            <span className="text-[#00D9FF]">Zero fabricated proficiency percentages</span>
          </div>

        </div>

      </div>

      {/* SKILL DETAIL MODAL */}
      <Modal
        isOpen={Boolean(selectedSkill)}
        onClose={() => setSelectedSkill(null)}
        title={selectedSkill ? `${selectedSkill.name}` : ''}
      >
        {selectedSkill && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#151824] border border-[#00D9FF]/30 text-[#00D9FF]">
                {selectedSkill.category}
              </span>
              <span className="text-xs font-mono text-[#A3A8B8]">
                Branch: {activeBranch.name}
              </span>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-[#A3A8B8] mb-2">
                Conceptual Overview & Context
              </h5>
              <p className="text-sm sm:text-base text-[#F5F5FA] leading-relaxed bg-[#151824]/60 p-4 rounded-xl border border-white/5">
                {selectedSkill.description}
              </p>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-[#A3A8B8] mb-3">
                Key Applications in Projects
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedSkill.applications.map((app, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-3 rounded-lg bg-[#151824] border border-white/5 text-xs text-[#F5F5FA]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeBranch.color }} />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#A3A8B8]">
                Applied across NeedSense AI, SkillGapRadar, LexiLab & IIC initiatives
              </span>
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-[#151824] text-[#F5F5FA] hover:bg-[#202538] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

    </section>
  );
};
