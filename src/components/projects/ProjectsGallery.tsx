import React, { useState } from 'react';
import type { ProjectNode, EngineeringDiscipline } from '../../types/portfolio';
import { DISCIPLINE_CONFIG } from '../../data/projectsData';
import {
  Search,
  FileCode2,
  Crosshair,
  ArrowRight,
} from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

interface ProjectsGalleryProps {
  projects: ProjectNode[];
  onSelectProject: (project: ProjectNode) => void;
  onFocusOnWeb: (project: ProjectNode) => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  projects,
  onSelectProject,
  onFocusOnWeb,
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<
    EngineeringDiscipline | 'all'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) => {
    const matchesDiscipline =
      selectedDiscipline === 'all' || project.discipline === selectedDiscipline;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesDiscipline && matchesSearch;
  });

  const filterTabs: Array<{ id: EngineeringDiscipline | 'all'; label: string }> = [
    { id: 'all', label: 'All Projects' },
    { id: 'robotics', label: 'Robotics' },
    { id: 'software', label: 'Full-Stack' },
    { id: 'hardware', label: 'Hardware' },
    { id: 'cad', label: 'CAD / 3D' },
    { id: 'ai', label: 'Vision & AI' },
  ];

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sillitha-border pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sillitha-card border border-electric-500/30 text-xs font-mono text-electric-300 shadow-glow-electric">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-accent animate-pulse" />
              <span>PROJECT GALLERY & ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-sans">
              Featured Portfolio
            </h2>
            <p className="text-base text-slate-400 font-sans max-w-2xl">
              Cross-disciplinary engineering systems: from NASA Lunabotics rovers and multi-arm
              kinematics to custom Roblox spatial engines and 3D wearable tactical armor.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search ROS2, CAD, Roblox, Armor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-mono rounded-full bg-sillitha-card border border-sillitha-border text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric-500 transition-all"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = selectedDiscipline === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedDiscipline(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-electric-600 text-white font-bold shadow-glow-electric'
                    : 'bg-sillitha-card border border-sillitha-border text-slate-400 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const config = DISCIPLINE_CONFIG[project.discipline];
            return (
              <div
                key={project.id}
                className="group rounded-3xl sillitha-card border border-sillitha-border overflow-hidden flex flex-col justify-between hover:border-electric-500/50 transition-all duration-300 shadow-xl"
              >
                {/* Image Banner */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-sillitha-950">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sillitha-950 via-sillitha-950/30 to-transparent" />

                  {/* Discipline Badge & Status */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border backdrop-blur-md ${config.badgeClass}`}
                    >
                      {config.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-sillitha-950/80 border border-sillitha-border text-emerald-400 backdrop-blur-md">
                      {project.status}
                    </span>
                  </div>

                  {/* Quick Focus on Hero Web Button */}
                  <button
                    onClick={() => onFocusOnWeb(project)}
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-sillitha-card/90 border border-sillitha-border text-[11px] font-mono text-slate-300 hover:text-white hover:bg-electric-600 backdrop-blur-md transition-all shadow-md cursor-pointer"
                    title="Highlight on the interactive web"
                  >
                    <Crosshair className="w-3 h-3 text-electric-400" />
                    <span>Focus on Web</span>
                  </button>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-electric-300 transition-colors uppercase font-sans leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-electric-400">
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed pt-1">
                      {project.shortSummary}
                    </p>
                  </div>

                  {/* Metrics preview */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-sillitha-border">
                    {project.metrics.slice(0, 2).map((m, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-xl bg-sillitha-950 border border-sillitha-border"
                      >
                        <div className="text-[10px] font-mono text-slate-400 truncate">
                          {m.label}
                        </div>
                        <div className="text-xs font-bold text-white font-mono">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-sillitha-950 border border-sillitha-border text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider bg-sillitha-950 border border-sillitha-border text-white hover:bg-electric-600 hover:border-electric-500 transition-all cursor-pointer"
                    >
                      <FileCode2 className="w-3.5 h-3.5 text-electric-400" />
                      <span>Documentation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {project.fullDocumentation.githubUrl && (
                      <a
                        href={project.fullDocumentation.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-full bg-sillitha-950 border border-sillitha-border text-slate-400 hover:text-white transition-colors"
                        title="GitHub Repo"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-sillitha-card border border-sillitha-border">
            <p className="text-slate-400 font-mono text-sm">
              No engineering projects match &ldquo;{searchQuery}&rdquo;.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
