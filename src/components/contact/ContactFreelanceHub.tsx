import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Mail,
  Phone,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import type { EngineeringDiscipline, ContactFormData } from '../../types/portfolio';
import { DISCIPLINE_CONFIG } from '../../data/projectsData';

interface ContactFreelanceHubProps {
  preselectedDiscipline?: EngineeringDiscipline | null;
}

export const ContactFreelanceHub: React.FC<ContactFreelanceHubProps> = ({
  preselectedDiscipline,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    organization: '',
    disciplines: preselectedDiscipline ? [preselectedDiscipline] : ['software', 'robotics'],
    budgetTier: '$10k - $25k',
    timeline: '1 - 3 Months',
    projectBrief: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  React.useEffect(() => {
    if (preselectedDiscipline) {
      setFormData((prev) => ({
        ...prev,
        disciplines: prev.disciplines.includes(preselectedDiscipline)
          ? prev.disciplines
          : [...prev.disciplines, preselectedDiscipline],
      }));
    }
  }, [preselectedDiscipline]);

  const toggleDiscipline = (disc: EngineeringDiscipline) => {
    setFormData((prev) => {
      const exists = prev.disciplines.includes(disc);
      if (exists) {
        if (prev.disciplines.length === 1) return prev;
        return { ...prev, disciplines: prev.disciplines.filter((d) => d !== disc) };
      } else {
        return { ...prev, disciplines: [...prev.disciplines, disc] };
      }
    });
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please provide your name or organization contact';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.projectBrief.trim()) {
      errs.projectBrief = 'Please provide a brief outline of the project scope';
    } else if (formData.projectBrief.trim().length < 15) {
      errs.projectBrief = 'Please provide at least 15 characters describing requirements';
    }
    if (formData.disciplines.length === 0) {
      errs.disciplines = 'Select at least one engineering discipline';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#5B50F6', '#00F0FF', '#FFFFFF'],
      });
    }, 1000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('Tyreeholt1@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText('(872) 381-4570');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const budgetTiers = [
    '< $5,000 (Advisory / Review)',
    '$5,000 - $10,000 (Sprint)',
    '$10,000 - $25,000 (Core MVP)',
    '$25,000 - $50,000+ (Full System)',
  ];

  const timelineOptions = ['Immediate (< 2 Weeks)', '1 - 3 Months', 'Q1/Q2 Planning', 'Retainer / Advisory'];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sillitha-card border border-electric-500/30 text-xs font-mono text-electric-300 shadow-glow-electric">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-accent animate-pulse" />
            <span>CONTRACTS & COLLABORATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-sans">
            Let&apos;s Connect & Build Together
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-sans leading-relaxed">
            Ready to bring compassionate, reliable, and multi-disciplinary engineering to your
            project? Reach out directly to Tyree Holt or submit your project details below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct channels & credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl sillitha-card border border-sillitha-border space-y-6 shadow-xl">
              <div className="space-y-2">
                <span className="text-xs font-mono text-electric-400 uppercase tracking-wider font-bold">
                  Direct Inquiries
                </span>
                <h3 className="text-2xl font-bold text-white uppercase font-sans">
                  Tyree Holt
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  Founder & Principal Engineer at Sillitha Web. Bringing software, robotics, and CAD
                  precision together under one roof.
                </p>
              </div>

              {/* Direct Email Card */}
              <div className="p-4 rounded-2xl bg-sillitha-950 border border-slate-700 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-sillitha-card border border-slate-700 flex items-center justify-center text-white shrink-0">
                    <Mail className="w-5 h-5 text-electric-400" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">DIRECT EMAIL</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-white truncate">
                      Tyreeholt1@gmail.com
                    </div>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="p-2.5 rounded-xl bg-sillitha-card hover:bg-sillitha-cardHover border border-slate-700 text-slate-300 hover:text-white transition-colors shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Direct Phone Card */}
              <div className="p-4 rounded-2xl bg-sillitha-950 border border-slate-700 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-sillitha-card border border-slate-700 flex items-center justify-center text-white shrink-0">
                    <Phone className="w-5 h-5 text-electric-400" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">DIRECT PHONE</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-white truncate">
                      (872) 381-4570
                    </div>
                  </div>
                </div>

                <button
                  onClick={copyPhone}
                  className="p-2.5 rounded-xl bg-sillitha-card hover:bg-sillitha-cardHover border border-slate-700 text-slate-300 hover:text-white transition-colors shrink-0 cursor-pointer"
                  title="Copy phone to clipboard"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Quality & IP Guarantees */}
              <div className="space-y-3 pt-2 border-t border-sillitha-border">
                <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-electric-400 shrink-0" />
                  <span>Confidential mutual NDA standard prior to project review</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                  <Terminal className="w-4 h-4 text-electric-300 shrink-0" />
                  <span>100% full intellectual property transfer to client</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-electric-accent shrink-0" />
                  <span>Transparent milestone-based sprint delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Scoping Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl sillitha-card border border-sillitha-border shadow-2xl relative overflow-hidden">
              {isSuccess ? (
                <div className="py-12 px-4 text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-electric-600/20 border border-electric-500 flex items-center justify-center text-electric-300 mx-auto shadow-glow-electric">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white uppercase font-sans">
                      Message Received!
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-electric-300 font-bold">{formData.fullName}</span>.
                      Tyree has received your project brief. You will receive an email response at{' '}
                      <span className="text-electric-300 font-mono">{formData.email}</span> within 24 business hours.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        organization: '',
                        disciplines: ['software'],
                        budgetTier: '$10k - $25k',
                        timeline: '1 - 3 Months',
                        projectBrief: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-electric-600 hover:bg-electric-500 text-white shadow-glow-electric transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Alex Vance"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl bg-sillitha-950 border text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                          errors.fullName
                            ? 'border-rose-500 ring-1 ring-rose-500'
                            : 'border-sillitha-border focus:border-electric-500'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-400 font-mono flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="alex@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl bg-sillitha-950 border text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                          errors.email
                            ? 'border-rose-500 ring-1 ring-rose-500'
                            : 'border-sillitha-border focus:border-electric-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-400 font-mono flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Organization */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block">
                      Organization / Project Title (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Robotics, Design Lab, Startup"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({ ...formData, organization: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-sillitha-950 border border-sillitha-border text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-electric-500 transition-all"
                    />
                  </div>

                  {/* Discipline Selectors */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block">
                      Services Needed *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(
                        ['software', 'robotics', 'hardware', 'cad', 'ai'] as EngineeringDiscipline[]
                      ).map((disc) => {
                        const isSelected = formData.disciplines.includes(disc);
                        const conf = DISCIPLINE_CONFIG[disc];
                        return (
                          <button
                            type="button"
                            key={disc}
                            onClick={() => toggleDiscipline(disc)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? 'bg-electric-600 border border-electric-400 text-white font-bold shadow-glow-electric'
                                : 'bg-sillitha-950 border border-sillitha-border text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            <span>{conf.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.disciplines && (
                      <p className="text-[11px] text-rose-400 font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.disciplines}
                      </p>
                    )}
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budgetTier}
                        onChange={(e) =>
                          setFormData({ ...formData, budgetTier: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-sillitha-950 border border-sillitha-border text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-electric-500 transition-all cursor-pointer"
                      >
                        {budgetTiers.map((b) => (
                          <option key={b} value={b} className="bg-sillitha-950">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block">
                        Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) =>
                          setFormData({ ...formData, timeline: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-sillitha-950 border border-sillitha-border text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-electric-500 transition-all cursor-pointer"
                      >
                        {timelineOptions.map((t) => (
                          <option key={t} value={t} className="bg-sillitha-950">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Brief */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block">
                      Project Goals & Details *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe what you want to build (website, robotic prototype, 3D CAD design, or full-stack application)..."
                      value={formData.projectBrief}
                      onChange={(e) =>
                        setFormData({ ...formData, projectBrief: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl bg-sillitha-950 border text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all resize-none ${
                        errors.projectBrief
                          ? 'border-rose-500 ring-1 ring-rose-500'
                          : 'border-sillitha-border focus:border-electric-500'
                      }`}
                    />
                    {errors.projectBrief && (
                      <p className="text-[11px] text-rose-400 font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.projectBrief}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-full font-bold text-sm uppercase tracking-wider text-white bg-electric-600 hover:bg-electric-500 shadow-glow-electric transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Brief...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
