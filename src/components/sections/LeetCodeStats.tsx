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
          maxTilt={3}
          className="rounded-2xl bg-[#0C0E15] border border-white/[0.08] p-6 sm:p-8 transition-all glow-card"
        >
          {stats ? (
            /* Live stats view */
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#121520] border border-white/[0.06] text-center">
                  <span className="text-3xl font-mono font-bold text-[#F5F5FA]">{stats.totalSolved}</span>
                  <span className="block text-[11px] font-mono text-[#5C6275] uppercase tracking-wider mt-1">Total Solved</span>
                </div>
                <div className="p-4 rounded-xl bg-[#121520] border border-emerald-500/20 text-center">
                  <span className="text-3xl font-mono font-bold text-emerald-400">{stats.easySolved}</span>
                  <span className="block text-[11px] font-mono text-[#5C6275] uppercase tracking-wider mt-1">Easy</span>
                </div>
                <div className="p-4 rounded-xl bg-[#121520] border border-amber-500/20 text-center">
                  <span className="text-3xl font-mono font-bold text-amber-400">{stats.mediumSolved}</span>
                  <span className="block text-[11px] font-mono text-[#5C6275] uppercase tracking-wider mt-1">Medium</span>
                </div>
                <div className="p-4 rounded-xl bg-[#121520] border border-rose-500/20 text-center">
                  <span className="text-3xl font-mono font-bold text-rose-400">{stats.hardSolved}</span>
                  <span className="block text-[11px] font-mono text-[#5C6275] uppercase tracking-wider mt-1">Hard</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#08090D] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <span className="text-[#9095A6]">Acceptance Rate: <strong className="text-white font-semibold">{stats.acceptanceRate}%</strong></span>
                <span className="text-[#9095A6]">Global Ranking: <strong className="text-[#00D9FF] font-semibold">#{stats.ranking.toLocaleString()}</strong></span>
              </div>
            </div>
          ) : (
            /* Clean fallback profile card */
            <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="space-y-4 max-w-lg text-left">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-amber-400">
                  <Flame className="w-4 h-4" />
                  <span>ALGORITHMIC CODING PROFILE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#F5F5FA] tracking-tight">
                  Continuous Practice & Algorithmic Foundations
                </h3>
                <p className="text-xs sm:text-sm text-[#9095A6] leading-relaxed font-sans">
                  Regularly solving foundational and advanced algorithmic problems across Java, C, and Python focusing on Array manipulations, Linked Lists, Trees, Dynamic Programming, and Graph traversal.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-md bg-[#121520] text-[11px] font-mono text-[#00D9FF] border border-white/[0.06]">
                    Data Structures
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#121520] text-[11px] font-mono text-[#9B5CFF] border border-white/[0.06]">
                    Algorithms
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#121520] text-[11px] font-mono text-amber-400 border border-white/[0.06]">
                    Java & C Problem Solving
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#121520] border border-white/[0.08] text-center w-full md:w-auto min-w-[250px] flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3.5">
                  <Code2 className="w-7 h-7" />
                </div>
                <span className="text-sm font-display font-bold text-[#F5F5FA] mb-1">
                  Prateek Mohanty
                </span>
                <span className="text-[11px] font-mono text-[#5C6275] mb-4">
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
