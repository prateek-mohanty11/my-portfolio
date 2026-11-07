import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { projectsData, type Project } from '../../data/projects';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import { Modal } from '../ui/Modal';
import { GeospatialVisual, RadarVisual, CodeCompilerVisual } from './ProjectVisuals';
import { GithubIcon } from '../ui/Icons';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const renderProjectVisual = (type: Project['visualType']) => {
    switch (type) {
      case 'geospatial':
        return <GeospatialVisual />;
      case 'radar':
        return <RadarVisual />;
      case 'code-compiler':
        return <CodeCompilerVisual />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-[#08090D] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#9B5CFF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <SectionHeading
          eyebrow="03 // PORTFOLIO SHOWCASE"
          title="Things I've been building."
          subtitle="Turning ideas into practical digital solutions."
        />

        {/* 3 Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard
                  maxTilt={5}
                  className="h-full rounded-2xl bg-[#0C0E15] border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 glow-card group hover:border-[#00D9FF]/30"
                >
                  <div>
                    {/* Top Meta info */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] font-semibold text-[#5C6275] tracking-wider group-hover:text-[#00D9FF] transition-colors">
                        PROJECT // {project.number}
                      </span>
                      <span
                        className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded border"
                        style={{
                          backgroundColor: `${project.accentColor}12`,
                          borderColor: `${project.accentColor}35`,
                          color: project.accentColor
                        }}
                      >
                        {project.category.split(' ')[0]} Focus
                      </span>
                    </div>

                    {/* Interactive Visual Graphic */}
                    <div className="mb-5 rounded-xl overflow-hidden border border-white/[0.06]">
                      {renderProjectVisual(project.visualType)}
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#F5F5FA] tracking-tight group-hover:text-[#00D9FF] transition-colors mb-1.5">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-[#9095A6] mb-3">
                      {project.category}
                    </p>
                    <p className="text-xs sm:text-sm text-[#9095A6] leading-relaxed mb-5 line-clamp-3 font-sans">
                      {project.solution}
                    </p>

                    {/* Technology tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#121520] text-[#CCD0DF] border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#121520] text-[#5C6275] border border-white/[0.04]">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-xs font-display font-medium tracking-wide text-[#F5F5FA] group-hover:text-[#00D9FF] transition-colors"
                    >
                      <span>View Architecture</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-[#151824] text-[#A3A8B8] hover:text-[#00D9FF] border border-white/5 transition-colors"
                          aria-label="GitHub Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      ) : null}
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-[#151824] text-[#A3A8B8] hover:text-[#00D9FF] border border-white/5 transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* COMPREHENSIVE PROJECT DETAILS MODAL */}
      <Modal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject ? `${selectedProject.title} — System Architecture` : ''}
      >
        {selectedProject && (
          <div className="space-y-6">
            
            {/* Category and Subheading */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-xs font-mono px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: `${selectedProject.accentColor}20`,
                  borderColor: `${selectedProject.accentColor}50`,
                  color: selectedProject.accentColor
                }}
              >
                {selectedProject.category}
              </span>
              <span className="text-xs font-mono text-[#A3A8B8]">
                ID: {selectedProject.number}
              </span>
            </div>

            {/* Visual simulation block */}
            <div className="rounded-2xl overflow-hidden border border-white/10">
              {renderProjectVisual(selectedProject.visualType)}
            </div>

            {/* Problem Statement */}
            <div className="p-4 rounded-xl bg-[#151824] border border-white/5">
              <h5 className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Problem Statement
              </h5>
              <p className="text-sm text-[#F5F5FA] leading-relaxed">
                "{selectedProject.problem}"
              </p>
            </div>

            {/* Proposed Solution */}
            <div className="p-4 rounded-xl bg-[#151824] border border-white/5">
              <h5 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Engineering Solution
              </h5>
              <p className="text-sm text-[#F5F5FA] leading-relaxed">
                {selectedProject.solution}
              </p>
            </div>

            {/* Key Features Implemented */}
            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-[#A3A8B8] mb-3">
                Core Architectural Features
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProject.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-[#151824]/60 border border-white/5 text-xs text-[#F5F5FA]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00D9FF] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-[#A3A8B8] mb-2.5">
                Technology Stack & Tooling
              </h5>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-[#151824] text-[#00D9FF] border border-[#00D9FF]/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* My Contribution */}
            <div className="p-4 rounded-xl bg-[#10121A] border border-[#9B5CFF]/30">
              <h5 className="text-xs font-mono uppercase tracking-wider text-[#9B5CFF] mb-1.5 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#9B5CFF]" />
                Prateek's Engineering Contribution
              </h5>
              <p className="text-xs text-[#A3A8B8] leading-relaxed">
                {selectedProject.contribution}
              </p>
            </div>

            {/* Deployment & Links */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#A3A8B8]">
              <span>Status: Architecture & Prototype Phase</span>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl bg-[#151824] text-[#F5F5FA] hover:bg-[#202538] transition-colors"
              >
                Close Details
              </button>
            </div>

          </div>
        )}
      </Modal>

    </section>
  );
};
