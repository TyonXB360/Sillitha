import React from 'react';
import { SERVICES_DATA } from '../../data/projectsData';
import type { EngineeringDiscipline } from '../../types/portfolio';
import {
  Globe,
  Layers,
  Cpu,
  Clock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (discipline: EngineeringDiscipline) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForInquiry,
}) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-electric-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-electric-300" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-electric-accent" />;
      default:
        return <Cpu className="w-6 h-6 text-electric-400" />;
    }
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="text-center space-y-5 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sillitha-card border border-electric-500/30 text-xs font-mono text-electric-300 shadow-glow-electric">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-accent animate-pulse" />
            <span>CORE DISCIPLINES & CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-sans">
            Here are the services I can provide for your business
          </h2>

          {/* Sillitha Philosophy Quote */}
          <div className="p-6 rounded-2xl bg-sillitha-card/80 border border-sillitha-border max-w-3xl mx-auto backdrop-blur-md">
            <p className="text-base sm:text-lg text-slate-300 font-sans italic leading-relaxed">
              &ldquo;Sillitha is said to stand for compassion, creativity, reliability, and a love of life and as such that energy will be brought forward with each project.&rdquo;
            </p>
          </div>
        </div>

        {/* Exact 3-Column Grid with Electric Blue Headers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              className="group rounded-3xl sillitha-card p-7 sm:p-8 flex flex-col justify-between space-y-6 hover:border-electric-500/50 transition-all duration-300 relative overflow-hidden shadow-xl"
            >
              {/* Electric blue top glow indicator */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-electric-600 via-electric-500 to-electric-accent" />

              <div className="space-y-5">
                {/* Number & Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-sillitha-950 border border-sillitha-border flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono font-bold text-electric-400 bg-sillitha-950 px-3 py-1 rounded-full border border-sillitha-border">
                    0{index + 1}
                  </span>
                </div>

                {/* Electric Blue Header */}
                <div>
                  <h3 className="text-2xl font-bold text-electric-400 group-hover:text-white transition-colors uppercase font-sans leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    {service.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Core Deliverables */}
                <div className="space-y-2.5 pt-3 border-t border-sillitha-border">
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-bold block">
                    Deliverables
                  </span>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-electric-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {service.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-sillitha-950 border border-sillitha-border text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Turnaround & Action */}
              <div className="pt-4 border-t border-sillitha-border space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>TYPICAL TURNAROUND:</span>
                  <span className="text-white font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-electric-400" />
                    {service.turnaround}
                  </span>
                </div>

                <button
                  onClick={() => onSelectServiceForInquiry(service.discipline)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider bg-electric-600 hover:bg-electric-500 text-white shadow-glow-electric transition-all cursor-pointer"
                >
                  <span>Inquire For This Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
