import React, { useState } from 'react';
import { SpiderGraphic } from '../common/SpiderGraphic';
import { Mail, Phone, ArrowRight, Check, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { TYREE_PROFILE } from '../../data/projectsData';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
      setSubscribed(false);
    }, 3500);
  };

  const navLinks = [
    { label: 'about', href: '#about' },
    { label: 'the web', href: '#web' },
    { label: 'services', href: '#services' },
    { label: 'portfolio', href: '#portfolio' },
    { label: 'contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-slate-700/80 bg-black text-slate-300 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-12">
        {/* Glowing White Spider Graphic Center Top */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <SpiderGraphic size={64} glow={true} className="animate-spider-pulse" />
          <span className="text-base font-black tracking-widest text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
            Sillitha Web
          </span>
          <span className="text-xs font-mono text-electric-300 font-bold tracking-wider">
            BY TYREE HOLT • MECHANICAL ENGINEER
          </span>
        </div>

        {/* Newsletter Subscription Bar with Vibrant Purple CTA Button */}
        <div className="w-full max-w-xl">
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-full bg-sillitha-card border border-slate-700 focus-within:border-electric-500 transition-colors shadow-xl"
          >
            <div className="flex-1 flex items-center px-4 w-full">
              <span className="text-xs font-mono text-slate-300 mr-2 whitespace-nowrap hidden sm:inline">
                Sign up to receive updates
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-electric-accent mr-2 hidden sm:inline" />
              <input
                type="email"
                placeholder="Enter your email..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full py-2 bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-electric-600 hover:bg-electric-500 text-white transition-all shadow-glow-electric shrink-0 cursor-pointer"
            >
              {subscribed ? (
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Subscribed!
                </span>
              ) : (
                'subscribe'
              )}
            </button>
          </form>
        </div>

        {/* Main Columns: Contact Details, Nav Links & Socials */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-700/80 text-center md:text-left items-start">
          {/* Direct Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Direct Contact
            </h4>
            <div className="space-y-2 text-sm text-slate-200">
              <a
                href={`mailto:${TYREE_PROFILE.email}`}
                className="flex items-center justify-center md:justify-start gap-2 text-slate-200 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-electric-400" />
                <span>{TYREE_PROFILE.email}</span>
              </a>
              <a
                href="tel:8723814570"
                className="flex items-center justify-center md:justify-start gap-2 text-slate-200 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-electric-400" />
                <span>{TYREE_PROFILE.phone}</span>
              </a>
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 text-xs font-mono">
                <MapPin className="w-3.5 h-3.5 text-electric-400" />
                <span>{TYREE_PROFILE.location}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Site Navigation
            </h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2.5 text-xs font-medium uppercase tracking-wider">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-slate-300 hover:text-white transition-colors font-mono"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect & Social Channels */}
          <div className="space-y-3 md:text-right">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Connect With Tyree
            </h4>
            <div className="flex items-center justify-center md:justify-end gap-3">
              <a
                href={TYREE_PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-sillitha-card border border-slate-700 text-slate-200 hover:text-white hover:border-slate-500 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/sillitha"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-sillitha-card border border-slate-700 text-slate-200 hover:text-white hover:border-slate-500 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-sillitha-card border border-slate-700 text-slate-200 hover:text-white hover:border-slate-500 transition-colors"
                title="X"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 text-xs font-mono text-slate-400 text-center">
          ©2026 — Sillitha web® by Tyree Holt. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
