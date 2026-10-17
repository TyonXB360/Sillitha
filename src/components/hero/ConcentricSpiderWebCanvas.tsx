import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { ProjectNode, EngineeringDiscipline } from '../../types/portfolio';
import { SpiderGraphic } from '../common/SpiderGraphic';
import { Eye, Sparkles, Activity } from 'lucide-react';

interface ConcentricSpiderWebCanvasProps {
  projects: ProjectNode[];
  selectedNode: ProjectNode | null;
  onSelectNode: (node: ProjectNode) => void;
  hoveredNode: ProjectNode | null;
  onHoverNode: (node: ProjectNode | null) => void;
  activeDisciplineFilter: EngineeringDiscipline | 'all';
}

interface WebIntersection {
  nodeId: string;
  project: ProjectNode;
  spokeIndex: number;
  ringIndex: number;
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
}

interface WebPhoton {
  spokeIndex: number;
  direction: 'inward' | 'outward';
  progress: number;
  speed: number;
  color: string;
}

export const ConcentricSpiderWebCanvas: React.FC<ConcentricSpiderWebCanvasProps> = ({
  projects,
  selectedNode,
  onSelectNode,
  hoveredNode,
  onHoverNode,
  activeDisciplineFilter,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [photonsEnabled, setPhotonsEnabled] = useState(true);

  // Configuration for concentric orb spider web
  const SPOKE_COUNT = 12;
  const RING_COUNT = 7;

  const intersectionsRef = useRef<Map<string, WebIntersection>>(new Map());
  const photonsRef = useRef<WebPhoton[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; isOver: boolean }>({
    x: -1000,
    y: -1000,
    isOver: false,
  });

  // Calculate and sync node coordinates on the web geometry
  const syncWebNodes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.44;

    const newMap = new Map<string, WebIntersection>();

    projects.forEach((proj, idx) => {
      const angleRad = (proj.radialPosition.spokeAngleDeg * Math.PI) / 180;
      const spokeIdx = Math.round(
        (proj.radialPosition.spokeAngleDeg / 360) * SPOKE_COUNT
      ) % SPOKE_COUNT;
      const r = proj.radialPosition.ringFraction * maxRadius;

      const x = centerX + Math.cos(angleRad) * r;
      const y = centerY + Math.sin(angleRad) * r;

      newMap.set(proj.id, {
        nodeId: proj.id,
        project: proj,
        spokeIndex: spokeIdx,
        ringIndex: Math.round(proj.radialPosition.ringFraction * RING_COUNT),
        x,
        y,
        radius: proj.featured ? 22 : 18,
        pulsePhase: idx * 0.9,
      });
    });

    intersectionsRef.current = newMap;

    // Initialize traveling silver-grey photons if empty
    if (photonsRef.current.length === 0) {
      const pList: WebPhoton[] = [];
      for (let i = 0; i < SPOKE_COUNT; i++) {
        pList.push({
          spokeIndex: i,
          direction: i % 2 === 0 ? 'outward' : 'inward',
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          color: i % 2 === 0 ? '#FFFFFF' : '#CBD5E1',
        });
      }
      photonsRef.current = pList;
    }
  }, [projects]);

  // Canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      syncWebNodes();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.44;

      ctx.clearRect(0, 0, width, height);

      // Determine active highlight spokes/rings
      let activeSpokeIndex = -1;
      let activeRingFraction = -1;

      const activeNode = hoveredNode || selectedNode;
      if (activeNode) {
        const inter = intersectionsRef.current.get(activeNode.id);
        if (inter) {
          activeSpokeIndex = inter.spokeIndex;
          activeRingFraction = activeNode.radialPosition.ringFraction;
        }
      }

      // 1. DRAW RADIAL SPOKES (In shades of light to silver-grey #888888 / #CCCCCC)
      for (let s = 0; s < SPOKE_COUNT; s++) {
        const angle = (s / SPOKE_COUNT) * Math.PI * 2;
        const x2 = centerX + Math.cos(angle) * maxRadius;
        const y2 = centerY + Math.sin(angle) * maxRadius;

        const isSpokeActive = activeSpokeIndex === s;

        ctx.beginPath();
        // Start just outside central spider icon radius (approx 38px)
        const startX = centerX + Math.cos(angle) * 38;
        const startY = centerY + Math.sin(angle) * 38;
        ctx.moveTo(startX, startY);
        ctx.lineTo(x2, y2);

        if (isSpokeActive) {
          // Luminous bright silver-white active strand
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2.4;
          ctx.shadowColor = '#E2E8F0';
          ctx.shadowBlur = 12;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          // Subtle silver-grey structural spoke
          ctx.strokeStyle = 'rgba(203, 213, 225, 0.28)'; // Clean #CBD5E1 at 28% opacity
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // 2. DRAW CONCENTRIC POLYGONAL WEB RINGS (Silver-grey with authentic silk catenary sag)
      for (let r = 1; r <= RING_COUNT; r++) {
        const ringFraction = r / RING_COUNT;
        const ringRadius = ringFraction * maxRadius;

        const isRingActive =
          activeRingFraction > 0 &&
          Math.abs(activeRingFraction - ringFraction) < 0.12;

        ctx.beginPath();
        for (let s = 0; s < SPOKE_COUNT; s++) {
          const angle1 = (s / SPOKE_COUNT) * Math.PI * 2;
          const nextS = (s + 1) % SPOKE_COUNT;
          const angle2 = (nextS / SPOKE_COUNT) * Math.PI * 2;

          const p1x = centerX + Math.cos(angle1) * ringRadius;
          const p1y = centerY + Math.sin(angle1) * ringRadius;
          const p2x = centerX + Math.cos(angle2) * ringRadius;
          const p2y = centerY + Math.sin(angle2) * ringRadius;

          // Catenary sag control point: pulls slightly inward toward the center spider
          const midX = (p1x + p2x) / 2;
          const midY = (p1y + p2y) / 2;
          const sagIntensity = 0.14;
          const ctrlX = midX + (centerX - midX) * sagIntensity;
          const ctrlY = midY + (centerY - midY) * sagIntensity;

          if (s === 0) {
            ctx.moveTo(p1x, p1y);
          }
          ctx.quadraticCurveTo(ctrlX, ctrlY, p2x, p2y);
        }

        if (isRingActive) {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2.0;
          ctx.shadowColor = '#CBD5E1';
          ctx.shadowBlur = 10;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          // Shades of grey (#888888 - #CCCCCC)
          ctx.strokeStyle = `rgba(200, 205, 215, ${0.12 + (r / RING_COUNT) * 0.14})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }

      // 3. TRAVELING SILVER-GREY & WHITE PHOTONS
      if (photonsEnabled) {
        photonsRef.current.forEach((photon) => {
          photon.progress += photon.speed;
          if (photon.progress > 1) {
            photon.progress = 0;
          }

          const angle = (photon.spokeIndex / SPOKE_COUNT) * Math.PI * 2;
          const pFrac =
            photon.direction === 'outward'
              ? photon.progress
              : 1 - photon.progress;
          const currentR = 38 + pFrac * (maxRadius - 38);

          const px = centerX + Math.cos(angle) * currentR;
          const py = centerY + Math.sin(angle) * currentR;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = photon.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // 4. DRAW VIBRANT PURPLE INTERACTIVE NODES
      intersectionsRef.current.forEach((item) => {
        item.pulsePhase += dt * 2.5;

        const isSelected = selectedNode?.id === item.nodeId;
        const isHovered = hoveredNode?.id === item.nodeId;
        const isDimmed =
          activeDisciplineFilter !== 'all' &&
          item.project.discipline !== activeDisciplineFilter;

        const currentRadius = isSelected
          ? item.radius * 1.35
          : isHovered
          ? item.radius * 1.2
          : item.radius;

        ctx.save();

        // Pulsing purple outer halo around active node
        if (isSelected || isHovered) {
          const rippleR = currentRadius + Math.sin(item.pulsePhase) * 6 + 14;
          ctx.beginPath();
          ctx.arc(item.x, item.y, rippleR, 0, Math.PI * 2);
          ctx.strokeStyle = '#5B50F6'; // Vibrant purple
          ctx.lineWidth = 1.8;
          ctx.shadowColor = '#5B50F6';
          ctx.shadowBlur = 20;
          ctx.stroke();
        }

        // Secondary segmented reticle for featured project
        if (item.project.featured) {
          ctx.beginPath();
          const angleOffset = time * 0.001;
          ctx.arc(
            item.x,
            item.y,
            currentRadius + 6,
            angleOffset,
            angleOffset + Math.PI * 1.4
          );
          ctx.strokeStyle = '#5B50F6';
          ctx.lineWidth = 1.6;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
        }

        // Node Outer Shell (Deep dark background with vibrant purple border)
        ctx.beginPath();
        ctx.arc(item.x, item.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#161622' : '#0F0F14';
        ctx.shadowColor = isSelected ? '#5B50F6' : '#4F46E5';
        ctx.shadowBlur = isSelected || isHovered ? 26 : 14;
        ctx.fill();

        ctx.lineWidth = isSelected ? 3.2 : 2.4;
        ctx.strokeStyle = isDimmed ? '#475569' : isSelected ? '#FFFFFF' : '#5B50F6';
        ctx.stroke();

        // Node Glowing Core (Vibrant Purple / White Highlight)
        ctx.beginPath();
        ctx.arc(item.x, item.y, currentRadius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = isSelected
          ? '#FFFFFF'
          : isHovered
          ? '#5B50F6'
          : '#4F46E5';
        ctx.shadowColor = '#5B50F6';
        ctx.shadowBlur = 10;
        ctx.fill();

        // Label Tag Below Node (High contrast white text on dark card)
        const labelY = item.y + currentRadius + 14;
        ctx.font = '700 12px Inter, system-ui, sans-serif';
        const titleMetrics = ctx.measureText(item.project.title);
        const pillWidth = Math.max(titleMetrics.width + 20, 100);
        const pillHeight = 24;

        ctx.fillStyle = isSelected
          ? '#5B50F6'
          : 'rgba(17, 17, 23, 0.94)';
        ctx.strokeStyle = isSelected
          ? '#FFFFFF'
          : isHovered
          ? '#5B50F6'
          : 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 0;

        roundRect(
          ctx,
          item.x - pillWidth / 2,
          labelY - 14,
          pillWidth,
          pillHeight,
          6
        );
        ctx.fill();
        ctx.stroke();

        // Label Text (Clean Crisp White)
        ctx.fillStyle = isSelected ? '#FFFFFF' : isDimmed ? '#94A3B8' : '#F8FAFC';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.project.title, item.x, labelY - 2);

        ctx.restore();
      });

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [
    projects,
    selectedNode,
    hoveredNode,
    activeDisciplineFilter,
    photonsEnabled,
    syncWebNodes,
  ]);

  // Coordinates and node hit test
  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      if (e.touches.length > 0) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
      return { x: 0, y: 0 };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const findNodeAtCoords = (x: number, y: number): ProjectNode | null => {
    for (const item of intersectionsRef.current.values()) {
      const dx = item.x - x;
      const dy = item.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= item.radius + 18) {
        return item.project;
      }
    }
    return null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoordinates(e);
    mouseRef.current.x = x;
    mouseRef.current.y = y;
    mouseRef.current.isOver = true;

    const hit = findNodeAtCoords(x, y);
    if (hit !== hoveredNode) {
      onHoverNode(hit);
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.isOver = false;
    onHoverNode(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoordinates(e);
    const hit = findNodeAtCoords(x, y);
    if (hit) {
      onSelectNode(hit);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoordinates(e);
    const hit = findNodeAtCoords(x, y);
    if (hit) {
      onHoverNode(hit);
      onSelectNode(hit);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[580px] sm:h-[680px] lg:h-[740px] overflow-hidden rounded-3xl border border-slate-700/80 bg-sillitha-900 shadow-2xl flex items-center justify-center"
    >
      {/* Background ambient lighting and radial fade */}
      <div className="absolute inset-0 pointer-events-none radial-fade-mask bg-gradient-to-b from-sillitha-850 via-transparent to-sillitha-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Interactive Concentric Spider Web Canvas (Shades of grey silk lines) */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        className="relative z-10 w-full h-full cursor-crosshair touch-none select-none"
      />

      {/* Central High-Contrast Glowing White Spider Sitting at Hub of Web */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center justify-center">
        <SpiderGraphic size={80} glow={true} className="animate-spider-pulse" />
        <span className="text-[11px] font-mono tracking-widest text-white font-extrabold uppercase mt-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
          SILLITHA
        </span>
      </div>

      {/* Top Bar Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sillitha-card/95 border border-slate-700 backdrop-blur-md text-xs font-mono text-slate-200 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-500"></span>
          </span>
          <span>RADIAL WEB: <strong className="text-white">INTERACTIVE</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPhotonsEnabled(!photonsEnabled)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono rounded-full border transition-all cursor-pointer ${
              photonsEnabled
                ? 'bg-sillitha-card border-slate-600 text-white shadow-md'
                : 'bg-sillitha-950 border-slate-800 text-slate-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">Web Silk Photons</span>
          </button>

          {/* Target Flagship: Mechanical Spider Arms */}
          <button
            onClick={() => {
              const arms = projects.find((p) => p.id === 'mechanical-spider-arms');
              if (arms) onSelectNode(arms);
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-electric-600 text-white hover:bg-electric-500 transition-all shadow-glow-electric cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Target Spider Arms</span>
          </button>
        </div>
      </div>

      {/* Bottom Hint Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-sillitha-card/95 border border-slate-700 backdrop-blur-md text-xs text-slate-300 font-mono shadow-md">
          <Activity className="w-3.5 h-3.5 text-electric-accent" />
          <span>Click any purple node along the grey web strands to inspect engineering documentation</span>
        </div>
      </div>
    </div>
  );
};

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
