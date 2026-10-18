import { useState, useRef } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ConcentricSpiderWebCanvas } from './components/hero/ConcentricSpiderWebCanvas';
import { NodePopupCard } from './components/hero/NodePopupCard';
import { ProjectDeepDiveModal } from './components/modals/ProjectDeepDiveModal';
import { ProjectsGallery } from './components/projects/ProjectsGallery';
import { ServicesSection } from './components/services/ServicesSection';
import { AboutPhilosophy } from './components/about/AboutPhilosophy';
import { ContactFreelanceHub } from './components/contact/ContactFreelanceHub';
import { PROJECTS_DATA, DISCIPLINE_CONFIG, TYREE_PROFILE } from './data/projectsData';
import type { ProjectNode, EngineeringDiscipline } from './types/portfolio';
import {
  ArrowDown,
  Terminal,
  ArrowRight,
  GraduationCap,
  MapPin,
} from 'lucide-react';
import { SpiderGraphic } from './components/common/SpiderGraphic';

export function App() {
  const [selectedNode, setSelectedNode] = useState<ProjectNode | null>(
    // Start with Mechanical Spider Arms highlighted
    PROJECTS_DATA.find((p) => p.id === 'mechanical-spider-arms') || PROJECTS_DATA[0]
  );
  const [hoveredNode, setHoveredNode] = useState<ProjectNode | null>(null);
  const [deepDiveProject, setDeepDiveProject] = useState<ProjectNode | null>(null);
  const [activeHeroDiscipline, setActiveHeroDiscipline] = useState<
    EngineeringDiscipline | 'all'
  >('all');
  const [inquiryDiscipline, setInquiryDiscipline] = useState<EngineeringDiscipline | null>(
    null
  );

  const webSectionRef = useRef<HTMLDivElement | null>(null);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDeepDive = (project: ProjectNode) => {
    setDeepDiveProject(project);
  };

  const handleSelectServiceForInquiry = (discipline: EngineeringDiscipline) => {
    setInquiryDiscipline(discipline);
    handleNavigate('contact');
  };

  const handleFocusOnWeb = (project: ProjectNode) => {
    setSelectedNode(project);
    webSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col selection:bg-electric-600/30 selection:text-electric-300 relative font-sans overflow-x-hidden">

      {/* Global Navigation Bar */}
      <Navbar onNavigate={handleNavigate} />

      {/* 1. HERO SECTION: BRAND STATEMENT & LETS CONNECT */}
      <section
        id="hero"
        className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8"
      >
        {/* Brand Spider Emblem Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-sillitha-card border border-slate-700 shadow-md">
          <SpiderGraphic size={24} glow={true} />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
            ENGINEERING STUDIO
          </span>
        </div>

        {/* Exact Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-sans leading-[1.05] max-w-5xl">
          Sillitha Web <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 via-electric-500 to-electric-300">
            by Tyree Holt
          </span>
        </h1>

        {/* Bio & Education Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-mono text-slate-300">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sillitha-card border border-slate-700">
            <GraduationCap className="w-4 h-4 text-electric-400" />
            {TYREE_PROFILE.university} &bull; Mechanical Engineering &apos;28
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sillitha-card border border-slate-700">
            <MapPin className="w-4 h-4 text-electric-400" />
            {TYREE_PROFILE.location}
          </span>
        </div>

        {/* Exact Brand Statement & Philosophy */}
        <div className="max-w-3xl space-y-4">
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-sans leading-relaxed">
            Sillitha web is a one-person engineering studio offering website development,
            app development, and CAD design. Built on the idea that the best solutions come from
            connecting disciplines most people keep separate.
          </p>
        </div>

        {/* Pill Buttons: LETS CONNECT in Vibrant Purple */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => handleNavigate('contact')}
            className="px-9 py-4 rounded-full font-bold text-sm uppercase tracking-wider text-white bg-electric-600 hover:bg-electric-500 shadow-glow-electric-lg transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
          >
            <span>Lets Connect</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleNavigate('web')}
            className="px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider text-slate-200 hover:text-white bg-sillitha-card hover:bg-sillitha-cardHover border border-slate-700 transition-all cursor-pointer shadow-md"
          >
            Visit The Web
          </button>
        </div>

        {/* Down Indicator */}
        <button
          onClick={() => handleNavigate('web')}
          className="pt-10 flex flex-col items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer group"
        >
          <span>EXPLORE INTERACTIVE WEB</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-electric-400" />
        </button>
      </section>

      {/* 2. INTERACTIVE SHOWCASE SECTION: VISIT THE WEB! */}
      <section
        id="web"
        ref={webSectionRef}
        className="py-20 px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto w-full space-y-10"
      >
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sillitha-card border border-slate-700 text-xs font-mono text-slate-300 shadow-md">
            <span className="w-2 h-2 rounded-full bg-electric-500 animate-pulse" />
            <span>INTERACTIVE RADAR & CONCENTRIC WEB</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase font-sans">
            Visit The Web!
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Select a web intersection to inspect engineering documentation,
            CAD models, and code repositories.
          </p>

          {/* Quick discipline filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveHeroDiscipline('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeHeroDiscipline === 'all'
                  ? 'bg-electric-600 text-white font-bold shadow-glow-electric'
                  : 'bg-sillitha-card border border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              All Projects
            </button>
            {Object.entries(DISCIPLINE_CONFIG).map(([key, conf]) => (
              <button
                key={key}
                onClick={() =>
                  setActiveHeroDiscipline(key as EngineeringDiscipline)
                }
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeHeroDiscipline === key
                    ? 'bg-electric-600 text-white font-bold shadow-glow-electric'
                    : 'bg-sillitha-card border border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <span>{conf.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Concentric Spider Web Canvas + Node Preview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Spider Web Canvas (structural grey silk strands) */}
          <div className="lg:col-span-8 w-full">
            <ConcentricSpiderWebCanvas
              projects={PROJECTS_DATA}
              selectedNode={selectedNode}
              onSelectNode={(node) => setSelectedNode(node)}
              hoveredNode={hoveredNode}
              onHoverNode={(node) => setHoveredNode(node)}
              activeDisciplineFilter={activeHeroDiscipline}
            />
          </div>

          {/* Pop-Up / Drawer Card */}
          <div className="lg:col-span-4 w-full flex justify-center">
            {selectedNode ? (
              <NodePopupCard
                project={selectedNode}
                onClose={() => setSelectedNode(null)}
                onOpenDeepDive={handleOpenDeepDive}
              />
            ) : (
              <div className="w-full p-8 rounded-3xl sillitha-card border border-slate-700 text-center space-y-4 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-sillitha-950 border border-slate-700 flex items-center justify-center text-white mx-auto">
                  <Terminal className="w-6 h-6 animate-pulse text-electric-400" />
                </div>
                <h4 className="text-xl font-bold text-white uppercase font-sans">
                  Select a Project Node
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  Click any purple intersection on the spider web to inspect robotics, CAD models,
                  or mobile app engineering specs.
                </p>
                <button
                  onClick={() =>
                    setSelectedNode(
                      PROJECTS_DATA.find((p) => p.id === 'mechanical-spider-arms') || null
                    )
                  }
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-electric-600 hover:bg-electric-500 text-white shadow-glow-electric transition-all cursor-pointer"
                >
                  Inspect Spider Arms
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION (Exact 3-column layout with electric blue headers) */}
      <ServicesSection
        onSelectServiceForInquiry={handleSelectServiceForInquiry}
      />

      {/* 4. FEATURED PROJECTS GALLERY */}
      <ProjectsGallery
        projects={PROJECTS_DATA}
        onSelectProject={handleOpenDeepDive}
        onFocusOnWeb={handleFocusOnWeb}
      />

      {/* 5. ABOUT TYREE HOLT & RESUME PROFILE (IIT Mechanical Engineering, Experience, Skills) */}
      <AboutPhilosophy />

      {/* 6. FREELANCE INQUIRY & CONTACT HUB (Tyreeholt1@gmail.com, (872) 381-4570) */}
      <ContactFreelanceHub preselectedDiscipline={inquiryDiscipline} />

      {/* 7. BRAND FOOTER (Glowing white spider center top, newsletter, copyright) */}
      <Footer />

      {/* 8. DEEP DIVE MODAL OVERLAY */}
      <ProjectDeepDiveModal
        project={deepDiveProject}
        isOpen={Boolean(deepDiveProject)}
        onClose={() => setDeepDiveProject(null)}
      />
    </div>
  );
}

export default App;
