import React, { useEffect, useState } from 'react';
import { Code2, Flame, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';

interface LeetCodeStatsData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
}

export const LeetCodeStats: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeStatsData | null>(null);

  useEffect(() => {
    const fetchLeetCode = async () => {
      try {
        const res = await fetch('https://leetcode-stats-api.herokuapp.com/prateek_mohanty11');
        if (res.ok) {
          const data = await res.json();
          if (data && data.status === 'success') {
            setStats({
              totalSolved: data.totalSolved,
              easySolved: data.easySolved,
              mediumSolved: data.mediumSolved,
              hardSolved: data.hardSolved,
              acceptanceRate: data.acceptanceRate,
              ranking: data.ranking
            });
          }
        }
      } catch {
        // Fallback gracefully without fabricating numbers
      }
    };

    fetchLeetCode();
  }, []);

  return (
    <section id="leetcode" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-[#08090D] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#9B5CFF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="07 // ALGORITHMIC RIGOR"
            title="Consistency through problem solving."
            subtitle="Data structures, algorithms, and computational problem-solving on LeetCode."
            className="mb-0"
          />

          <a
            href="https://leetcode.com/u/prateek_mohanty11/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono bg-[#151824] border border-amber-500/30 hover:border-amber-400 text-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.1)]"
          >
            <Code2 className="w-4 h-4" />
            <span>@prateek_mohanty11</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Dashboard Content */}
        <TiltCard
          maxTilt={4}
          className="rounded-3xl bg-[#10121A]/90 border border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-2xl glow-card"
        >
          {stats ? (
            /* Live stats view */
            <div className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#151824] border border-white/5 text-center">
                  <span className="text-3xl font-display font-bold text-[#F5F5FA]">{stats.totalSolved}</span>
                  <span className="block text-xs font-mono text-[#A3A8B8] mt-1">Total Solved</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#151824] border border-emerald-500/20 text-center">
                  <span className="text-3xl font-display font-bold text-emerald-400">{stats.easySolved}</span>
                  <span className="block text-xs font-mono text-[#A3A8B8] mt-1">Easy</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#151824] border border-amber-500/20 text-center">
                  <span className="text-3xl font-display font-bold text-amber-400">{stats.mediumSolved}</span>
                  <span className="block text-xs font-mono text-[#A3A8B8] mt-1">Medium</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#151824] border border-rose-500/20 text-center">
                  <span className="text-3xl font-display font-bold text-rose-400">{stats.hardSolved}</span>
                  <span className="block text-xs font-mono text-[#A3A8B8] mt-1">Hard</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0D14] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                <span className="text-[#A3A8B8]">Acceptance Rate: <strong className="text-white">{stats.acceptanceRate}%</strong></span>
                <span className="text-[#A3A8B8]">Global Ranking: <strong className="text-[#00D9FF]">#{stats.ranking.toLocaleString()}</strong></span>
              </div>
            </div>
          ) : (
            /* Clean fallback profile card */
            <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="space-y-4 max-w-lg text-left">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <Flame className="w-4 h-4" />
                  <span>ALGORITHMIC CODING PROFILE</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-[#F5F5FA]">
                  Continuous Practice & Algorithmic Foundations
                </h3>
                <p className="text-sm text-[#A3A8B8] leading-relaxed">
                  Regularly solving foundational and advanced algorithmic problems across Java, C, and Python focusing on Array manipulations, Linked Lists, Trees, Dynamic Programming, and Graph traversal.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-lg bg-[#151824] text-xs font-mono text-[#00D9FF] border border-white/5">
                    Data Structures
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#151824] text-xs font-mono text-[#9B5CFF] border border-white/5">
                    Algorithms
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#151824] text-xs font-mono text-amber-400 border border-white/5">
                    Java & C Problem Solving
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#151824] border border-white/10 text-center w-full md:w-auto min-w-[260px] flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                  <Code2 className="w-8 h-8" />
                </div>
                <span className="text-sm font-display font-bold text-[#F5F5FA] mb-1">
                  Prateek Mohanty
                </span>
                <span className="text-xs font-mono text-[#A3A8B8] mb-4">
                  leetcode.com/u/prateek_mohanty11
                </span>
                <a
                  href="https://leetcode.com/u/prateek_mohanty11/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-mono font-medium text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
                >
                  Inspect Live Profile
                </a>
              </div>
            </div>
          )}
        </TiltCard>

      </div>
    </section>
  );
};
