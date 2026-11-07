import React from 'react';
import { ShieldAlert, BarChart3 } from 'lucide-react';

// Visual 01: NeedSense AI Geospatial Intelligence Dashboard
export const GeospatialVisual: React.FC = () => {
  return (
    <div className="relative w-full h-56 sm:h-64 rounded-xl bg-[#0B0D14] border border-[#9B5CFF]/30 p-4 overflow-hidden flex flex-col justify-between font-mono text-[11px]">
      {/* Background coordinate grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-60" />

      {/* Top telemetry bar */}
      <div className="relative z-10 flex items-center justify-between text-[#A3A8B8] border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-semibold">GEOSPATIAL FEED // ACTIVE</span>
        </div>
        <span className="text-[#9B5CFF]">LAT: 19.3149° N | LNG: 84.7941° E</span>
      </div>

      {/* Center cluster nodes simulation */}
      <div className="relative z-10 my-auto flex items-center justify-around">
        {/* Hotspot 1 */}
        <div className="relative flex flex-col items-center">
          <div className="relative">
            <span className="absolute -inset-2 rounded-full bg-[#9B5CFF]/30 animate-ping" />
            <div className="w-5 h-5 rounded-full bg-[#9B5CFF] flex items-center justify-center text-[9px] text-white font-bold shadow-[0_0_15px_#9B5CFF]">
              98
            </div>
          </div>
          <span className="mt-2 text-[10px] text-[#F5F5FA] bg-[#151824] px-1.5 py-0.5 rounded border border-white/10">
            Sector-A Urgent
          </span>
        </div>

        {/* Hotspot 2 */}
        <div className="relative flex flex-col items-center">
          <div className="relative">
            <span className="absolute -inset-1.5 rounded-full bg-[#00D9FF]/30 animate-ping" />
            <div className="w-4 h-4 rounded-full bg-[#00D9FF] flex items-center justify-center text-[9px] text-black font-bold shadow-[0_0_12px_#00D9FF]">
              42
            </div>
          </div>
          <span className="mt-2 text-[10px] text-[#A3A8B8] bg-[#151824] px-1.5 py-0.5 rounded border border-white/10">
            Sector-B Moderate
          </span>
        </div>

        {/* Hotspot 3 */}
        <div className="relative flex flex-col items-center">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
          <span className="mt-2 text-[10px] text-[#A3A8B8] bg-[#151824] px-1.5 py-0.5 rounded border border-white/10">
            Escalation Risk
          </span>
        </div>
      </div>

      {/* Floating Alert Panel */}
      <div className="relative z-10 p-2.5 rounded-lg bg-[#151824]/90 border border-[#9B5CFF]/40 backdrop-blur-md flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#9B5CFF]" />
          <span className="text-[#F5F5FA]">AI Incident Cluster Resolved</span>
        </div>
        <span className="text-[10px] text-[#00D9FF] font-semibold">12 Volunteers Dispatched</span>
      </div>
    </div>
  );
};

// Visual 02: SkillGapRadar Futuristic Radar Analytics Interface
export const RadarVisual: React.FC = () => {
  return (
    <div className="relative w-full h-56 sm:h-64 rounded-xl bg-[#0B0D14] border border-[#00D9FF]/30 p-4 overflow-hidden flex flex-col justify-between font-mono text-[11px]">
      <div className="absolute inset-0 bg-cyber-grid opacity-60" />

      {/* Radar header */}
      <div className="relative z-10 flex items-center justify-between text-[#A3A8B8] border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#00D9FF]" />
          <span className="text-white font-semibold">MARKET DEMAND VS SKILL MATRIX</span>
        </div>
        <span className="text-[#00D9FF]">+34% AI Alignment</span>
      </div>

      {/* Radar Graphic Simulation */}
      <div className="relative z-10 flex items-center justify-center my-auto">
        <div className="relative w-32 h-32 rounded-full border border-white/15 flex items-center justify-center">
          {/* Inner circles */}
          <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border border-[#00D9FF]/30 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#00D9FF]" />
            </div>
          </div>

          {/* Sweeper beam */}
          <div className="absolute inset-0 animate-radar-sweep pointer-events-none origin-center">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#00D9FF]/20 to-transparent" />
          </div>

          {/* Radar skill vertices */}
          <span className="absolute -top-3 text-[9px] text-[#00D9FF] bg-[#10121A] px-1 rounded">Deep Learning</span>
          <span className="absolute -bottom-3 text-[9px] text-[#F5F5FA] bg-[#10121A] px-1 rounded">System Design</span>
          <span className="absolute -left-6 text-[9px] text-[#A3A8B8] bg-[#10121A] px-1 rounded">Python</span>
          <span className="absolute -right-6 text-[9px] text-[#9B5CFF] bg-[#10121A] px-1 rounded">Fullstack</span>
        </div>
      </div>

      {/* Bottom metric bar */}
      <div className="relative z-10 p-2 rounded-lg bg-[#151824]/90 border border-white/10 flex items-center justify-between text-xs">
        <span className="text-[#A3A8B8]">Curriculum Gap Forecast:</span>
        <span className="text-emerald-400 font-semibold">Personalized Path Generated</span>
      </div>
    </div>
  );
};

// Visual 03: LexiLab Interactive Compiler Learning Platform
export const CodeCompilerVisual: React.FC = () => {
  return (
    <div className="relative w-full h-56 sm:h-64 rounded-xl bg-[#0B0D14] border border-[#3B82F6]/30 p-3 sm:p-4 overflow-hidden flex flex-col justify-between font-mono text-[11px]">
      {/* Editor title bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[#A3A8B8]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-white font-semibold">lexical_scanner.c</span>
        </div>
        <span className="text-[#3B82F6]">LEXER: PASS (0 ERRORS)</span>
      </div>

      {/* Code Stream */}
      <div className="my-2 space-y-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[#A3A8B8]/50">01</span>
          <span className="text-[#9B5CFF]">int</span>
          <span className="text-[#00D9FF]">computeTokens</span>
          <span className="text-white">(</span>
          <span className="text-[#9B5CFF]">char</span>
          <span className="text-amber-300">*source</span>
          <span className="text-white">) &#123;</span>
        </div>
        <div className="flex items-center gap-2 pl-4">
          <span className="text-[#A3A8B8]/50">02</span>
          <span className="text-[#9B5CFF]">Token</span>
          <span className="text-white">tok =</span>
          <span className="text-emerald-400">getNextToken</span>
          <span className="text-white">();</span>
        </div>
        <div className="flex items-center gap-2 pl-4">
          <span className="text-[#A3A8B8]/50">03</span>
          <span className="text-[#9B5CFF]">return</span>
          <span className="text-white">tok.type;</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#A3A8B8]/50">04</span>
          <span className="text-white">&#125;</span>
        </div>
      </div>

      {/* Token Output stream chip visual */}
      <div className="p-2 rounded-lg bg-[#151824] border border-white/10 flex items-center gap-2 overflow-x-auto text-[10px]">
        <span className="px-1.5 py-0.5 rounded bg-[#9B5CFF]/20 text-[#9B5CFF] border border-[#9B5CFF]/40">
          [KW: int]
        </span>
        <span className="px-1.5 py-0.5 rounded bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/40">
          [ID: computeTokens]
        </span>
        <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
          [SYM: (]
        </span>
        <span className="px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
          [EOF]
        </span>
      </div>
    </div>
  );
};
