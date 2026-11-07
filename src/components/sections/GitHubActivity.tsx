import React, { useEffect, useState } from 'react';
import { Star, GitFork, BookOpen, ExternalLink, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import { GithubIcon } from '../ui/Icons';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

export const GitHubActivity: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/prateek-mohanty11'),
          fetch('https://api.github.com/users/prateek-mohanty11/repos?sort=updated&per_page=6')
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setUser({
            public_repos: userData.public_repos,
            followers: userData.followers,
            following: userData.following
          });
        }

        if (reposRes.ok) {
          const reposData = await reposRes.json();
          if (Array.isArray(reposData)) {
            setRepos(reposData);
          }
        }
      } catch {
        // Graceful fallback: Network/rate-limit handled
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <section id="github" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-[#08090D] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#00D9FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="06 // OPEN SOURCE & CODE"
            title="Building in public."
            subtitle="Real-time public repository feeds and open-source contributions."
            className="mb-0"
          />

          <a
            href="https://github.com/prateek-mohanty11/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono bg-[#151824] border border-white/10 hover:border-[#00D9FF]/40 text-[#F5F5FA] hover:text-[#00D9FF] transition-all"
          >
            <GithubIcon className="w-4 h-4" />
            <span>@prateek-mohanty11</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#00D9FF]" />
          </a>
        </div>

        {/* GitHub Stats Strip (if fetched) */}
        {user && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-[#10121A] border border-white/10 text-center">
              <span className="text-2xl font-display font-bold text-[#F5F5FA]">{user.public_repos}</span>
              <span className="block text-[11px] font-mono text-[#A3A8B8] mt-1">Public Repositories</span>
            </div>
            <div className="p-4 rounded-xl bg-[#10121A] border border-white/10 text-center">
              <span className="text-2xl font-display font-bold text-[#00D9FF]">{user.followers}</span>
              <span className="block text-[11px] font-mono text-[#A3A8B8] mt-1">Followers</span>
            </div>
            <div className="p-4 rounded-xl bg-[#10121A] border border-white/10 text-center">
              <span className="text-2xl font-display font-bold text-[#9B5CFF]">{user.following}</span>
              <span className="block text-[11px] font-mono text-[#A3A8B8] mt-1">Following</span>
            </div>
          </div>
        )}

        {/* Repositories Grid or Profile Fallback */}
        {repos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <TiltCard
                  maxTilt={6}
                  className="h-full rounded-2xl bg-[#10121A]/85 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:border-[#00D9FF]/40 glow-card"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#A3A8B8]">
                        <BookOpen className="w-4 h-4 text-[#00D9FF]" />
                        <span>Public Repo</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#A3A8B8] group-hover:text-[#00D9FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <h4 className="font-display font-bold text-lg text-[#F5F5FA] group-hover:text-[#00D9FF] transition-colors mb-2 line-clamp-1">
                      {repo.name}
                    </h4>

                    <p className="text-xs text-[#A3A8B8] leading-relaxed mb-6 line-clamp-2">
                      {repo.description || "Public software engineering repository and code assets."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#A3A8B8]">
                    <span className="flex items-center gap-1.5 text-[#F5F5FA]">
                      <span className="w-2 h-2 rounded-full bg-[#9B5CFF]" />
                      {repo.language || "Code"}
                    </span>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </a>
            ))}
          </div>
        ) : (
          /* Graceful Fallback Card */
          <div className="p-8 sm:p-12 rounded-3xl bg-[#10121A]/80 border border-white/10 text-center max-w-2xl mx-auto backdrop-blur-xl">
            <GithubIcon className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
            <h4 className="font-display font-bold text-xl text-[#F5F5FA] mb-2">
              Explore Active Repositories on GitHub
            </h4>
            <p className="text-sm text-[#A3A8B8] leading-relaxed mb-6">
              Access latest commits, open-source experimentations, and project repositories directly on Prateek's official GitHub profile.
            </p>
            <a
              href="https://github.com/prateek-mohanty11/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-xs text-white bg-gradient-to-r from-[#9B5CFF] to-[#7B2CBF] hover:from-[#8A4CE6] hover:to-[#6A23A6] shadow-lg transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View @prateek-mohanty11 on GitHub</span>
            </a>
          </div>
        )}

      </div>
    </section>
  );
};
