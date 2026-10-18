import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectNode } from '../../types/portfolio';
import { DISCIPLINE_CONFIG } from '../../data/projectsData';
import {
  X,
  FileCode2,
  ArrowRight,
  Activity,
} from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

interface NodePopupCardProps {
  project: ProjectNode | null;
  onClose: () => void;
  onOpenDeepDive: (project: ProjectNode) => void;
}

export const NodePopupCard: React.FC<NodePopupCardProps> = ({
  project,
  onClose,
  onOpenDeepDive,
}) => {
  if (!project) return null;

  const config = DISCIPLINE_CONFIG[project.discipline];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 12 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="w-full max-w-lg bg-sillitha-card/95 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-700 text-left relative z-30"
      >
        {/* Top Vibrant Purple Accent Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-electric-600 via-electric-500 to-electric-accent" />

        <div className="p-6 sm:p-7 space-y-4">
          {/* Header row: Discipline badge & Close */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full border border-slate-700 bg-sillitha-950 text-slate-200">
                {config.name}
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-sillitha-950 border border-slate-700 text-emerald-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {project.status}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-sillitha-800 transition-colors cursor-pointer"
              aria-label="Close project preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-sans">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-mono">
              {project.subtitle}
            </p>
          </div>

          {/* Visual Preview / Thumbnail */}
          <div className="relative group rounded-2xl overflow-hidden border border-slate-700 h-44 sm:h-48 bg-sillitha-950">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sillitha-950 via-sillitha-950/20 to-transparent" />

            {/* Overlaid Tags */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-sillitha-950/95 border border-slate-700 text-slate-200 backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Short Project Summary (High contrast crisp text) */}
          <p className="text-sm text-slate-200 leading-relaxed font-sans">
            {project.shortSummary}
          </p>

          {/* Engineering Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {project.metrics.slice(0, 2).map((metric, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-sillitha-950 border border-slate-700 flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
                  <Activity className="w-3.5 h-3.5 text-electric-400" />
                  <span>{metric.label}</span>
                </div>
                <div className="text-base font-bold text-white mt-1 font-mono">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Action CTAs in Vibrant Purple (#FFFFFF / #A0A0A0) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={() => onOpenDeepDive(project)}
              className="w-full flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-electric-600 hover:bg-electric-500 shadow-glow-electric transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <FileCode2 className="w-4 h-4 text-white" />
              <span>View Full Documentation</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            {project.fullDocumentation.githubUrl && (
              <a
                href={project.fullDocumentation.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto p-3.5 flex items-center justify-center rounded-full bg-sillitha-950 hover:bg-sillitha-850 border border-slate-700 text-slate-200 hover:text-white transition-colors"
                title="View Source on GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
