import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'web', 'services', 'portfolio', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'about' },
    { id: 'services', label: 'services' },
    { id: 'web', label: 'the web' },
    { id: 'portfolio', label: 'portfolio' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-sillitha-950/90 backdrop-blur-md border-b border-sillitha-border py-3.5 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo: Spider graphic + Sillitha text */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
            <img src="/sillitha-logo.png" alt="Sillitha spider logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white font-sans uppercase">
              Sillitha
            </span>
            <span className="text-[10px] font-mono text-electric-300 -mt-1 tracking-wider">
              BY TYREE HOLT
            </span>
          </div>
        </button>

        {/* Center Nav Links (about, services, portfolio) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white font-bold border-b-2 border-electric-500 pb-0.5'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Pill-shaped contact button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => handleLinkClick('contact')}
            className="px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider text-white bg-electric-600 hover:bg-electric-500 shadow-glow-electric transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            contact
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-sillitha-card border border-sillitha-border text-slate-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-sillitha-950/98 border-b border-sillitha-border backdrop-blur-2xl px-5 pt-4 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left px-3 py-2 rounded-xl text-sm font-medium uppercase tracking-wider text-slate-300 hover:text-white hover:bg-sillitha-card"
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleLinkClick('contact')}
            className="w-full py-3 rounded-full text-sm font-bold uppercase tracking-wider bg-electric-600 text-white shadow-glow-electric"
          >
            contact
          </button>
        </div>
      )}
    </header>
  );
};
