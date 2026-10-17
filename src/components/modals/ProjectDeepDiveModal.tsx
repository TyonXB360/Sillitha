import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectNode } from '../../types/portfolio';
import { DISCIPLINE_CONFIG } from '../../data/projectsData';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  Cpu,
  Layers,
  Activity,
  FileText,
  Boxes,
  Zap,
} from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

interface ProjectDeepDiveModalProps {
  project: ProjectNode | null;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'overview' | 'specs' | 'schematic' | 'code' | 'gallery';

export const ProjectDeepDiveModal: React.FC<ProjectDeepDiveModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setActiveTab('overview');
  }, [project?.id]);

  if (!isOpen || !project) return null;

  const config = DISCIPLINE_CONFIG[project.discipline];
  const doc = project.fullDocumentation;

  const handleCopyCode = () => {
    if (doc.codeSnippet) {
      navigator.clipboard.writeText(doc.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-sillitha-950/90 backdrop-blur-xl"
        />

        {/* Modal Window Container (High contrast greys and whites) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col bg-sillitha-card border border-slate-700 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Top Purple Accent Strip */}
          <div className="h-1.5 w-full bg-gradient-to-r from-electric-600 via-electric-500 to-electric-accent shrink-0" />

          {/* Header */}
          <div className="p-6 sm:p-7 border-b border-slate-700/80 bg-sillitha-950/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full border border-slate-700 bg-sillitha-900 text-slate-200">
                  {config.name}
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-sillitha-900 border border-slate-700 text-emerald-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {project.status}
                </span>
                <span className="text-xs font-mono text-slate-400 hidden md:inline">
                  NODE ID: #{project.id.toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-sans">
                {project.title}
              </h2>
              <p className="text-sm text-slate-300 font-mono mt-1">
                {project.subtitle}
              </p>
            </div>

            {/* Quick Action Links & Close */}
            <div className="flex items-center gap-2.5 self-end sm:self-center">
              {doc.liveDemoUrl && (
                <a
                  href={doc.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-electric-600 text-white hover:bg-electric-500 text-xs font-bold uppercase tracking-wider transition-colors shadow-glow-electric"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Connect</span>
                </a>
              )}
              {doc.githubUrl && (
                <a
                  href={doc.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sillitha-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-sillitha-800 transition-colors ml-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-700/80 bg-sillitha-950/40 overflow-x-auto shrink-0">
            <TabButton
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              icon={<FileText className="w-3.5 h-3.5" />}
              label="Overview & Architecture"
            />
            <TabButton
              active={activeTab === 'specs'}
              onClick={() => setActiveTab('specs')}
              icon={<Activity className="w-3.5 h-3.5" />}
              label="Engineering Specs"
            />
            {doc.schematicSteps && (
              <TabButton
                active={activeTab === 'schematic'}
                onClick={() => setActiveTab('schematic')}
                icon={<Layers className="w-3.5 h-3.5" />}
                label="System Flow Schematic"
              />
            )}
            {doc.codeSnippet && (
              <TabButton
                active={activeTab === 'code'}
                onClick={() => setActiveTab('code')}
                icon={<Terminal className="w-3.5 h-3.5" />}
                label="Firmware / Code"
              />
            )}
            {doc.mediaGallery.length > 0 && (
              <TabButton
                active={activeTab === 'gallery'}
                onClick={() => setActiveTab('gallery')}
                icon={<Boxes className="w-3.5 h-3.5" />}
                label="CAD Models & Media"
              />
            )}
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-200 leading-relaxed">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-sillitha-950 border border-slate-700 text-left"
                    >
                      <div className="text-[11px] font-mono text-slate-400">
                        {m.label}
                      </div>
                      <div className="text-lg font-bold text-white mt-1">
                        {m.value}
                      </div>
                      {m.change && (
                        <div className="text-[11px] text-electric-300 font-mono mt-0.5">
                          {m.change}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Scope */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-electric-400" />
                    Project Scope & Objectives
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                    {doc.overview}
                  </p>
                </div>

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-sillitha-950 border border-slate-700 space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                      The Engineering Challenge
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      {doc.challenge}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-sillitha-950 border border-slate-700 space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                      The Engineered Solution
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      {doc.solution}
                    </p>
                  </div>
                </div>

                {/* System Architecture */}
                <div className="p-5 rounded-2xl bg-sillitha-950 border border-slate-700 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-electric-400" />
                    System Architecture & Control Hierarchy
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
                    {doc.systemArchitecture}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                    Key Deliverables & Artifacts
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {doc.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl bg-sillitha-950 border border-slate-700 text-xs sm:text-sm text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-electric-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: SPECS */}
            {activeTab === 'specs' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="overflow-hidden rounded-2xl border border-slate-700 bg-sillitha-950">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-sillitha-900 border-b border-slate-700 text-slate-300 font-mono text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Subsystem / Parameter</th>
                        <th className="py-3 px-4">Engineered Specification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono">
                      {doc.techSpecs.map((spec, i) => (
                        <tr
                          key={i}
                          className="hover:bg-sillitha-850/60 transition-colors"
                        >
                          <td className="py-3 px-4 font-semibold text-slate-300">
                            {spec.label}
                          </td>
                          <td className="py-3 px-4 text-white font-bold">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-5 rounded-2xl bg-sillitha-950 border border-slate-700 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                    Technologies & Protocols
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-sillitha-900 border border-slate-700 text-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: SCHEMATIC */}
            {activeTab === 'schematic' && doc.schematicSteps && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <p className="text-xs sm:text-sm text-slate-300 font-mono">
                  Multi-stage execution and mechanical integration pipeline:
                </p>

                <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-700 space-y-6">
                  {doc.schematicSteps.map((step, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-electric-500 bg-sillitha-950 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-electric-500" />
                      </div>

                      <div className="p-5 rounded-2xl bg-sillitha-950 border border-slate-700 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono font-bold text-electric-400">
                            STAGE {step.step}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white uppercase">
                          {step.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 4: CODE */}
            {activeTab === 'code' && doc.codeSnippet && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between gap-2 px-5 py-3 bg-sillitha-950 rounded-t-2xl border border-slate-700 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-electric-400" />
                    <span className="text-white font-bold">
                      {doc.codeSnippet.title}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sillitha-card hover:bg-sillitha-cardHover border border-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-b-2xl border border-t-0 border-slate-700 bg-sillitha-950 p-5 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                  <pre>
                    <code>{doc.codeSnippet.code}</code>
                  </pre>
                </div>
              </motion.div>
            )}

            {/* TAB 5: GALLERY */}
            {activeTab === 'gallery' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {doc.mediaGallery.map((m, idx) => (
                  <div
                    key={idx}
                    className="group rounded-2xl overflow-hidden border border-slate-700 bg-sillitha-950 flex flex-col"
                  >
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={m.url}
                        alt={m.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-sillitha-950/90 border border-slate-700 text-[10px] font-mono text-white uppercase backdrop-blur-md">
                        {m.type}
                      </div>
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="text-sm font-bold text-white uppercase">{m.title}</h4>
                      <p className="text-xs text-slate-300">{m.caption}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-5 border-t border-slate-700/80 bg-sillitha-950/80 flex items-center justify-between gap-4 shrink-0">
            <span className="text-xs font-mono text-slate-400">
              Press <kbd className="px-2 py-0.5 rounded-md bg-sillitha-card border border-slate-700 text-white font-mono">Esc</kbd> to exit
            </span>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-electric-600 hover:bg-electric-500 text-white shadow-glow-electric transition-colors cursor-pointer"
            >
              Close Documentation
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
      active
        ? 'bg-electric-600 text-white font-bold shadow-glow-electric'
        : 'text-slate-300 hover:text-white hover:bg-sillitha-card'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);
