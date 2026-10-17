import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { ProjectNode, EngineeringDiscipline } from '../../types/portfolio';
import { DISCIPLINE_CONFIG } from '../../data/projectsData';
import { Sparkles, Compass, Eye, ShieldCheck } from 'lucide-react';

interface EngineeringWebCanvasProps {
  projects: ProjectNode[];
  selectedNode: ProjectNode | null;
  onSelectNode: (node: ProjectNode) => void;
  hoveredNode: ProjectNode | null;
  onHoverNode: (node: ProjectNode | null) => void;
  activeDisciplineFilter: EngineeringDiscipline | 'all';
}

interface PhysicsPoint {
  nodeId: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

interface EnergyPulse {
  fromId: string;
  toId: string;
  progress: number;
  speed: number;
  color: string;
}

export const EngineeringWebCanvas: React.FC<EngineeringWebCanvasProps> = ({
  projects,
  selectedNode,
  onSelectNode,
  hoveredNode,
  onHoverNode,
  activeDisciplineFilter,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [physicsEnabled, setPhysicsEnabled] = useState(true);
  const [pulsesEnabled, setPulsesEnabled] = useState(true);

  // Physics simulation state refs
  const pointsRef = useRef<Map<string, PhysicsPoint>>(new Map());
  const mouseRef = useRef<{ x: number; y: number; isDown: boolean; isOver: boolean }>({
    x: -1000,
    y: -1000,
    isDown: false,
    isOver: false,
  });
  const pulsesRef = useRef<EnergyPulse[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  // Initialize or update physics points when projects or dimensions change
  const syncPoints = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    projects.forEach((proj) => {
      const targetX = (proj.canvasCoords.xPercent / 100) * width;
      const targetY = (proj.canvasCoords.yPercent / 100) * height;

      if (!pointsRef.current.has(proj.id)) {
        pointsRef.current.set(proj.id, {
          nodeId: proj.id,
          x: targetX + (Math.random() - 0.5) * 40,
          y: targetY + (Math.random() - 0.5) * 40,
          targetX,
          targetY,
          vx: 0,
          vy: 0,
          radius: proj.featured ? 22 : 16,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      } else {
        const point = pointsRef.current.get(proj.id)!;
        point.targetX = targetX;
        point.targetY = targetY;
        point.radius = proj.featured ? 22 : 16;
      }
    });

    // Populate initial pulses if empty
    if (pulsesRef.current.length === 0) {
      const newPulses: EnergyPulse[] = [];
      projects.forEach((proj) => {
        proj.connectedNodeIds.forEach((connId) => {
          if (Math.random() > 0.4) {
            newPulses.push({
              fromId: proj.id,
              toId: connId,
              progress: Math.random(),
              speed: 0.004 + Math.random() * 0.006,
              color: DISCIPLINE_CONFIG[proj.discipline].accentHex,
            });
          }
        });
      });
      pulsesRef.current = newPulses;
    }
  }, [projects]);

  // Main canvas animation and rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      syncPoints();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      // Clear with dark subtle fade
      ctx.clearRect(0, 0, width, height);

      // Center coordinates for spider web rings
      const centerX = width * 0.5;
      const centerY = height * 0.44;

      // 1. Draw concentric spider web orbital rings
      const ringCount = 5;
      const maxRingRadius = Math.min(width, height) * 0.48;

      ctx.save();
      for (let i = 1; i <= ringCount; i++) {
        const r = (i / ringCount) * maxRingRadius;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.04 - i * 0.005})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
      }

      // Draw faint radial spider web spokes emanating outward
      const spokeCount = 12;
      for (let s = 0; s < spokeCount; s++) {
        const angle = (s / spokeCount) * Math.PI * 2;
        const x2 = centerX + Math.cos(angle) * maxRingRadius;
        const y2 = centerY + Math.sin(angle) * maxRingRadius;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.035)';
        ctx.setLineDash([2, 8]);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Physics update for nodes
      const mouse = mouseRef.current;

      pointsRef.current.forEach((point) => {
        point.pulsePhase += dt * 2.5;

        if (physicsEnabled) {
          // Spring pull toward target position
          const k = 4.5; // spring constant
          const damping = 0.85; // drag damping
          const fx = (point.targetX - point.x) * k;
          const fy = (point.targetY - point.y) * k;

          point.vx = (point.vx + fx * dt) * damping;
          point.vy = (point.vy + fy * dt) * damping;

          // Gentle ambient harmonic organic wave
          point.vx += Math.sin(time * 0.001 + point.pulsePhase) * 0.15;
          point.vy += Math.cos(time * 0.0012 + point.pulsePhase) * 0.15;

          // Mouse interaction (elastic push / pull)
          if (mouse.isOver) {
            const dx = mouse.x - point.x;
            const dy = mouse.y - point.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 140;

            if (dist < repelRadius && dist > 1) {
              const force = (1 - dist / repelRadius) * 25;
              point.vx -= (dx / dist) * force;
              point.vy -= (dy / dist) * force;
            }
          }

          point.x += point.vx;
          point.y += point.vy;
        } else {
          // Lock directly to target
          point.x = point.targetX;
          point.y = point.targetY;
        }
      });

      // 3. Draw inter-node spiderweb threads
      projects.forEach((proj) => {
        const p1 = pointsRef.current.get(proj.id);
        if (!p1) return;

        const isProjSelected = selectedNode?.id === proj.id;
        const isProjHovered = hoveredNode?.id === proj.id;

        proj.connectedNodeIds.forEach((targetId) => {
          // Prevent drawing line twice (only draw if proj.id < targetId or active)
          if (proj.id > targetId && !isProjSelected && !isProjHovered) return;

          const p2 = pointsRef.current.get(targetId);
          if (!p2) return;

          const isConnectedActive =
            isProjSelected ||
            isProjHovered ||
            selectedNode?.id === targetId ||
            hoveredNode?.id === targetId;

          const disciplineMatch =
            activeDisciplineFilter === 'all' ||
            proj.discipline === activeDisciplineFilter;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);

          // Spiderweb slight curve towards canvas center
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          const curvePull = 0.08;
          const ctrlX = midX + (centerX - midX) * curvePull;
          const ctrlY = midY + (centerY - midY) * curvePull;

          ctx.quadraticCurveTo(ctrlX, ctrlY, p2.x, p2.y);

          if (isConnectedActive) {
            // Highly energized glowing thread
            ctx.shadowColor = DISCIPLINE_CONFIG[proj.discipline].accentHex;
            ctx.shadowBlur = 12;
            ctx.strokeStyle = DISCIPLINE_CONFIG[proj.discipline].accentHex;
            ctx.lineWidth = 2.2;
            ctx.setLineDash([]);
            ctx.stroke();
            ctx.shadowBlur = 0; // reset
          } else {
            // Ambient faint thread
            ctx.strokeStyle = disciplineMatch
              ? 'rgba(100, 116, 139, 0.25)'
              : 'rgba(51, 65, 85, 0.12)';
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 5]);
            ctx.stroke();
          }
        });
      });

      // 4. Draw Traveling Energy Pulses along threads
      if (pulsesEnabled) {
        pulsesRef.current.forEach((pulse) => {
          pulse.progress += pulse.speed;
          if (pulse.progress > 1) {
            pulse.progress = 0;
          }

          const fromPoint = pointsRef.current.get(pulse.fromId);
          const toPoint = pointsRef.current.get(pulse.toId);
          if (!fromPoint || !toPoint) return;

          const px = fromPoint.x + (toPoint.x - fromPoint.x) * pulse.progress;
          const py = fromPoint.y + (toPoint.y - fromPoint.y) * pulse.progress;

          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = pulse.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
        });
      }

      // 5. Draw the Nodes & Labels
      projects.forEach((proj) => {
        const point = pointsRef.current.get(proj.id);
        if (!point) return;

        const isSelected = selectedNode?.id === proj.id;
        const isHovered = hoveredNode?.id === proj.id;
        const config = DISCIPLINE_CONFIG[proj.discipline];
        const isDimmed =
          activeDisciplineFilter !== 'all' &&
          proj.discipline !== activeDisciplineFilter;

        const baseRadius = point.radius;
        const currentRadius = isSelected
          ? baseRadius * 1.3
          : isHovered
          ? baseRadius * 1.15
          : baseRadius;

        ctx.save();

        // Pulsing radar halo around selected/hovered node
        if (isSelected || isHovered) {
          const pulseR = currentRadius + Math.sin(point.pulsePhase) * 6 + 10;
          ctx.beginPath();
          ctx.arc(point.x, point.y, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = config.accentHex;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = config.accentHex;
          ctx.shadowBlur = 16;
          ctx.stroke();
        }

        // Secondary spinning segmented reticle for featured/Lunabotics
        if (proj.featured) {
          ctx.beginPath();
          const angleOffset = time * 0.001;
          ctx.arc(
            point.x,
            point.y,
            currentRadius + 6,
            angleOffset,
            angleOffset + Math.PI * 1.5
          );
          ctx.strokeStyle = `${config.accentHex}88`;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
        }

        // Node Outer Ring
        ctx.beginPath();
        ctx.arc(point.x, point.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#070A10';
        ctx.shadowColor = config.accentHex;
        ctx.shadowBlur = isSelected || isHovered ? 25 : 12;
        ctx.fill();

        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.strokeStyle = isDimmed ? '#334155' : config.accentHex;
        ctx.stroke();

        // Node Inner Core Dot
        ctx.beginPath();
        ctx.arc(point.x, point.y, currentRadius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = isSelected
          ? '#FFFFFF'
          : isHovered
          ? config.accentHex
          : `${config.accentHex}DD`;
        ctx.shadowColor = config.accentHex;
        ctx.shadowBlur = 8;
        ctx.fill();

        // Node Title & Discipline Badge Label below node
        const labelY = point.y + currentRadius + 14;

        // Pill background for label
        ctx.font = '600 12px Inter, system-ui, sans-serif';
        const titleMetrics = ctx.measureText(proj.title);
        const pillWidth = Math.max(titleMetrics.width + 16, 80);
        const pillHeight = 22;

        ctx.fillStyle = isSelected
          ? 'rgba(15, 23, 42, 0.95)'
          : 'rgba(7, 10, 16, 0.85)';
        ctx.strokeStyle = isSelected
          ? config.accentHex
          : isHovered
          ? 'rgba(255,255,255,0.3)'
          : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;

        // Draw rounded pill
        roundRect(
          ctx,
          point.x - pillWidth / 2,
          labelY - 14,
          pillWidth,
          pillHeight,
          6
        );
        ctx.fill();
        ctx.stroke();

        // Project Title
        ctx.fillStyle = isSelected ? '#FFFFFF' : isDimmed ? '#94A3B8' : '#F1F5F9';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(proj.title, point.x, labelY - 3);

        // Small discipline tag below
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = config.accentHex;
        ctx.fillText(config.label.toUpperCase(), point.x, labelY + 16);

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
    physicsEnabled,
    pulsesEnabled,
    syncPoints,
  ]);

  // Mouse & Touch event handlers for interactive node selection
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
    for (const proj of projects) {
      const pt = pointsRef.current.get(proj.id);
      if (!pt) continue;
      const dx = pt.x - x;
      const dy = pt.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Comfortable click radius: node radius + 14px buffer
      if (dist <= pt.radius + 18) {
        return proj;
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
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
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
    mouseRef.current.x = x;
    mouseRef.current.y = y;
    mouseRef.current.isOver = true;
    const hit = findNodeAtCoords(x, y);
    if (hit) {
      onHoverNode(hit);
      onSelectNode(hit);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[580px] sm:h-[680px] lg:h-[760px] overflow-hidden rounded-2xl border border-slate-800/80 bg-space-950 cyber-grid-bg shadow-2xl"
    >
      {/* Background ambient lighting and radar sweep */}
      <div className="absolute inset-0 pointer-events-none radial-fade-mask bg-gradient-to-b from-space-900/60 via-transparent to-space-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-cyber-violet/5 rounded-full blur-3xl pointer-events-none" />

      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        className="relative z-10 w-full h-full cursor-crosshair touch-none select-none"
      />

      {/* Canvas Top Bar Controls & Status Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        {/* Status Chip */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-space-900/80 border border-slate-700/60 backdrop-blur-md shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-cyan"></span>
          </span>
          <span className="text-xs font-mono text-slate-300">
            ENGINEERING GRAPH: <span className="text-cyber-cyan font-semibold">INTERACTIVE</span>
          </span>
          <span className="text-slate-600 text-xs">|</span>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            5 Physics Nodes Active
          </span>
        </div>

        {/* Physics & Telemetry Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPulsesEnabled(!pulsesEnabled)}
            title={pulsesEnabled ? 'Disable Energy Pulses' : 'Enable Energy Pulses'}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              pulsesEnabled
                ? 'bg-cyber-cyan/10 border-cyber-cyan/40 text-cyber-cyan shadow-glow-cyan'
                : 'bg-space-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Photons</span>
          </button>

          <button
            onClick={() => setPhysicsEnabled(!physicsEnabled)}
            title={physicsEnabled ? 'Lock Web Coordinates' : 'Enable Spring Physics'}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              physicsEnabled
                ? 'bg-cyber-violet/10 border-cyber-violet/40 text-cyber-violet shadow-glow-violet'
                : 'bg-space-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Elasticity</span>
          </button>

          {/* Quick Focus Lunabotics Flagship Button */}
          <button
            onClick={() => {
              const luna = projects.find((p) => p.id === 'lunabotics');
              if (luna) onSelectNode(luna);
            }}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-cyber-violet/20 border border-cyber-violet/60 text-purple-200 hover:bg-cyber-violet/30 transition-all shadow-glow-violet"
          >
            <Eye className="w-3.5 h-3.5 text-cyber-violet" />
            <span>Target Lunabotics</span>
          </button>
        </div>
      </div>

      {/* Bottom Hint Bar & Discipline Legend */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-space-900/80 border border-slate-800/80 backdrop-blur-md text-xs text-slate-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-cyber-emerald" />
          <span>Click any node to expand project documentation</span>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-space-900/80 border border-slate-800/80 backdrop-blur-md">
          {Object.entries(DISCIPLINE_CONFIG).map(([key, config]) => (
            <div key={key} className="flex items-center gap-1.5 text-[11px] font-mono">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: config.accentHex }}
              />
              <span className="text-slate-300">{config.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Canvas rounded rectangle helper
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
