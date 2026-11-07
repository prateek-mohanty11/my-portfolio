import React from 'react';
import { ArrowUp, Code2 } from 'lucide-react';
import { profileData } from '../../data/profile';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050608] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Monogram and Identity */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-[#10121A] border border-[#9B5CFF]/40 flex items-center justify-center font-display font-bold text-lg text-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.2)]">
            PM
          </div>
          <div>
            <h4 className="font-display font-bold text-base text-[#F5F5FA]">
              {profileData.name}
            </h4>
            <p className="text-xs font-mono text-[#A3A8B8]">
              Aspiring AI/ML Engineer • Creative Developer • UI/UX Designer
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href={profileData.contact.github}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-[#10121A] text-[#A3A8B8] hover:text-[#00D9FF] border border-white/5 hover:border-[#00D9FF]/40 transition-all"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={profileData.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-[#10121A] text-[#A3A8B8] hover:text-[#00D9FF] border border-white/5 hover:border-[#00D9FF]/40 transition-all"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={profileData.contact.leetcode}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-[#10121A] text-[#A3A8B8] hover:text-amber-400 border border-white/5 hover:border-amber-400/40 transition-all"
            aria-label="LeetCode"
          >
            <Code2 className="w-4 h-4" />
          </a>
        </div>

        {/* Back to top button */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-[#A3A8B8]">
            © {currentYear} Prateek Mohanty. All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-[#151824] border border-white/10 hover:border-[#00D9FF]/50 text-[#F5F5FA] hover:text-[#00D9FF] transition-all group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
