import React, { useState } from 'react';
import { TYREE_PROFILE } from '../../data/projectsData';
import {
  GraduationCap,
  MapPin,
  CheckCircle2,
  Compass,
} from 'lucide-react';

export const AboutPhilosophy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'skills' | 'experience'>('education');

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sillitha-card border border-slate-700 text-xs font-mono text-slate-300 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-accent animate-pulse" />
            <span>ENGINEER PROFILE & BACKGROUND</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-sans">
            About Tyree Holt
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans max-w-3xl mx-auto leading-relaxed">
            {TYREE_PROFILE.bio}
          </p>

          <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-300 pt-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-electric-400" />
              {TYREE_PROFILE.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-electric-400" />
              {TYREE_PROFILE.university}
            </span>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-full bg-sillitha-card border border-slate-700 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('education')}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-electric-600 text-white shadow-glow-electric'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Education & Campus
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-electric-600 text-white shadow-glow-electric'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Skills & Toolchain
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-electric-600 text-white shadow-glow-electric'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Industry Experience
            </button>
          </div>
        </div>

        {/* Tab 1: Education */}
        {activeTab === 'education' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="p-7 rounded-3xl sillitha-card border border-slate-700 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-sillitha-950 border border-slate-700 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6 text-electric-400" />
              </div>
              <div>
                <span className="text-xs font-mono text-electric-400 font-bold uppercase tracking-wider">
                  DEGREE IN PROGRESS (CLASS OF {TYREE_PROFILE.graduationDate.toUpperCase()})
                </span>
                <h3 className="text-2xl font-bold text-white uppercase mt-1 font-sans">
                  {TYREE_PROFILE.degree}
                </h3>
                <h4 className="text-sm font-semibold text-slate-300 font-mono mt-0.5">
                  {TYREE_PROFILE.university} — Chicago, IL
                </h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Concentration in dynamic kinematics, computer-aided design (CAD), additive manufacturing,
                and autonomous robotics. Active member of campus engineering teams including the NASA
                Lunabotics competitive robotics squad.
              </p>
            </div>

            <div className="p-7 rounded-3xl sillitha-card border border-slate-700 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-sillitha-950 border border-slate-700 flex items-center justify-center text-white">
                <Compass className="w-6 h-6 text-electric-400" />
              </div>
              <div>
                <span className="text-xs font-mono text-electric-400 font-bold uppercase tracking-wider">
                  STUDIO ETHOS & MISSION
                </span>
                <h3 className="text-2xl font-bold text-white uppercase mt-1 font-sans">
                  Sillitha Studios
                </h3>
                <h4 className="text-sm font-semibold text-slate-300 font-mono mt-0.5">
                  One-Person Multi-Disciplinary Hub
                </h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                &ldquo;Sillitha web is built on the idea that the best solutions come from connecting
                disciplines most people keep separate. Sillitha stands for compassion, creativity,
                reliability, and a love of life.&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Skills & Toolchain */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl sillitha-card border border-slate-700 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-white font-bold block">
                Programming Languages
              </span>
              <div className="flex flex-wrap gap-2">
                {TYREE_PROFILE.skills.languages.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-sillitha-950 border border-slate-700 text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl sillitha-card border border-slate-700 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-white font-bold block">
                Frameworks & Tools
              </span>
              <div className="flex flex-wrap gap-2">
                {TYREE_PROFILE.skills.frameworksAndTools.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-sillitha-950 border border-slate-700 text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl sillitha-card border border-slate-700 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-white font-bold block">
                CAD & Hardware
              </span>
              <div className="flex flex-wrap gap-2">
                {TYREE_PROFILE.skills.cadAndHardware.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-sillitha-950 border border-slate-700 text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl sillitha-card border border-slate-700 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-white font-bold block">
                Robotics & Platforms
              </span>
              <div className="flex flex-wrap gap-2">
                {TYREE_PROFILE.skills.platforms.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-sillitha-950 border border-slate-700 text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Industry Experience */}
        {activeTab === 'experience' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {TYREE_PROFILE.experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl sillitha-card border border-slate-700 space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/80 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase font-sans">
                      {exp.role}
                    </h3>
                    <h4 className="text-sm font-semibold text-slate-300 font-mono">
                      {exp.company}
                    </h4>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-sillitha-950 border border-slate-700 text-electric-300 self-start sm:self-center">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {exp.description}
                </p>

                <div className="space-y-2 pt-2">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-electric-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
