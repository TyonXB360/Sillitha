import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ProjectNode, EngineeringDiscipline } from '../../types/portfolio';

interface ConcentricSpiderWebCanvasProps {
  projects: ProjectNode[];
  selectedNode: ProjectNode | null;
  onSelectNode: (node: ProjectNode) => void;
  hoveredNode: ProjectNode | null;
  onHoverNode: (node: ProjectNode | null) => void;
  activeDisciplineFilter: EngineeringDiscipline | 'all';
}

interface WebIntersection {
  project: ProjectNode;
  spokeIndex: number;
  ringFraction: number;
  x: number;
  y: number;
}

interface PointerPhysics {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  strength: number;
  targetStrength: number;
  initialized: boolean;
}

const SPOKE_COUNT = 12;
const RING_COUNT = 7;
const TAU = Math.PI * 2;

const spokeAngle = (index: number) =>
  (index / SPOKE_COUNT) * TAU + Math.sin(index * 2.17) * 0.026 + Math.cos(index * 0.73) * 0.014;

const ringRadius = (ring: number, spoke: number, maxRadius: number) => {
  const base = ring / RING_COUNT;
  const irregularity = Math.sin(spoke * 1.61 + ring * 0.87) * 0.012;
  return (base + irregularity) * maxRadius;
};

export const ConcentricSpiderWebCanvas: React.FC<ConcentricSpiderWebCanvasProps> = ({
  projects,
  selectedNode,
  onSelectNode,
  hoveredNode,
  onHoverNode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intersectionsRef = useRef<Map<string, WebIntersection>>(new Map());
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef<PointerPhysics>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    strength: 0,
    targetStrength: 0,
    initialized: false,
  });
  const animateRef = useRef<FrameRequestCallback>(() => {});
  const [intersections, setIntersections] = useState<WebIntersection[]>([]);

  const drawWeb = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !container || !ctx) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.44;
    const activeNode = hoveredNode || selectedNode;
    const activeIntersection = activeNode
      ? intersectionsRef.current.get(activeNode.id)
      : undefined;
    const pointer = pointerRef.current;

    const bend = (x: number, y: number) => {
      if (pointer.strength < 0.005) return { x, y };
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 0.01) return { x, y };
      const influence = Math.exp(-(distance * distance) / (2 * 145 * 145));
      const offset = 18 * influence * pointer.strength;
      return { x: x + (dx / distance) * offset, y: y + (dy / distance) * offset };
    };

    // Curved radial strands use individually offset controls for an organic sweep.
    for (let spoke = 0; spoke < SPOKE_COUNT; spoke += 1) {
      const angle = spokeAngle(spoke);
      const tangentX = -Math.sin(angle);
      const tangentY = Math.cos(angle);
      const curve = Math.sin(spoke * 1.9) * 9;
      const control1 = bend(
        centerX + Math.cos(angle) * maxRadius / 3 + tangentX * curve * 0.35,
        centerY + Math.sin(angle) * maxRadius / 3 + tangentY * curve * 0.35
      );
      const control2 = bend(
        centerX + Math.cos(angle) * maxRadius * 2 / 3 + tangentX * curve,
        centerY + Math.sin(angle) * maxRadius * 2 / 3 + tangentY * curve
      );
      const endRadius = ringRadius(RING_COUNT, spoke, maxRadius);
      const end = bend(centerX + Math.cos(angle) * endRadius, centerY + Math.sin(angle) * endRadius);
      const isActive = activeIntersection?.spokeIndex === spoke;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.bezierCurveTo(control1.x, control1.y, control2.x, control2.y, end.x, end.y);
      ctx.strokeStyle = isActive ? 'rgba(224, 224, 224, 0.72)' : 'rgba(160, 160, 160, 0.36)';
      ctx.lineWidth = 0.9 + (spoke % 3) * 0.12;
      ctx.stroke();
    }

    // Each ring has uneven spacing and a slightly shifting anchor at every spoke.
    for (let ring = 1; ring <= RING_COUNT; ring += 1) {
      const ringFraction = ring / RING_COUNT;
      const isActive = activeIntersection && Math.abs(activeIntersection.ringFraction - ringFraction) < 0.12;
      ctx.beginPath();

      for (let spoke = 0; spoke < SPOKE_COUNT; spoke += 1) {
        const nextSpoke = (spoke + 1) % SPOKE_COUNT;
        const angle1 = spokeAngle(spoke);
        const angle2 = spokeAngle(nextSpoke);
        const radius1 = ringRadius(ring, spoke, maxRadius);
        const radius2 = ringRadius(ring, nextSpoke, maxRadius);
        const p1 = bend(centerX + Math.cos(angle1) * radius1, centerY + Math.sin(angle1) * radius1);
        const p2 = bend(centerX + Math.cos(angle2) * radius2, centerY + Math.sin(angle2) * radius2);
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        const inwardSag = 0.11 + Math.sin(spoke * 1.3 + ring) * 0.025;
        const lateralSway = Math.sin(spoke * 2.1 + ring * 0.7) * 4;
        const tangentX = -(p2.y - p1.y);
        const tangentY = p2.x - p1.x;
        const tangentLength = Math.hypot(tangentX, tangentY) || 1;
        const control = bend(
          midX + (centerX - midX) * inwardSag + (tangentX / tangentLength) * lateralSway,
          midY + (centerY - midY) * inwardSag + (tangentY / tangentLength) * lateralSway
        );

        if (spoke === 0) ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(control.x, control.y, p2.x, p2.y);
      }

      ctx.strokeStyle = isActive
        ? 'rgba(224, 224, 224, 0.72)'
        : `rgba(160, 160, 160, ${0.17 + ringFraction * 0.13})`;
      ctx.lineWidth = isActive ? 1.5 : 0.85 + (ring % 3) * 0.08;
      ctx.stroke();
    }
  }, [hoveredNode, selectedNode]);

  const syncWebNodes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.44;
    const nextIntersections = projects.map((project) => {
      const rawAngle = (project.radialPosition.spokeAngleDeg * Math.PI) / 180;
      const spokeIndex = Math.round((project.radialPosition.spokeAngleDeg / 360) * SPOKE_COUNT) % SPOKE_COUNT;
      const angle = spokeAngle(spokeIndex) + (rawAngle - (spokeIndex / SPOKE_COUNT) * TAU);
      const fraction = project.radialPosition.ringFraction;
      const warpedRadius = (fraction + Math.sin(spokeIndex * 1.61 + fraction * RING_COUNT * 0.87) * 0.012) * maxRadius;
      return {
        project,
        spokeIndex,
        ringFraction: fraction,
        x: centerX + Math.cos(angle) * warpedRadius,
        y: centerY + Math.sin(angle) * warpedRadius,
      };
    });

    intersectionsRef.current = new Map(nextIntersections.map((item) => [item.project.id, item]));
    setIntersections(nextIntersections);
    drawWeb();
  }, [drawWeb, projects]);

  animateRef.current = () => {
    frameRef.current = null;
    const pointer = pointerRef.current;
    pointer.x += (pointer.targetX - pointer.x) * 0.24;
    pointer.y += (pointer.targetY - pointer.y) * 0.24;
    pointer.strength += (pointer.targetStrength - pointer.strength) * 0.2;

    const stillMoving =
      Math.abs(pointer.targetX - pointer.x) > 0.2 ||
      Math.abs(pointer.targetY - pointer.y) > 0.2 ||
      Math.abs(pointer.targetStrength - pointer.strength) > 0.005;
    if (!stillMoving) {
      pointer.x = pointer.targetX;
      pointer.y = pointer.targetY;
      pointer.strength = pointer.targetStrength;
    }

    drawWeb();
    if (stillMoving) frameRef.current = requestAnimationFrame(animateRef.current);
  };

  const scheduleDraw = () => {
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(animateRef.current);
  };

  useEffect(() => {
    syncWebNodes();
    window.addEventListener('resize', syncWebNodes);
    return () => {
      window.removeEventListener('resize', syncWebNodes);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [syncWebNodes]);

  useEffect(() => {
    drawWeb();
  }, [drawWeb]);

  const getCoordinates = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoordinates(event);
    const pointer = pointerRef.current;
    if (!pointer.initialized) {
      pointer.x = x;
      pointer.y = y;
      pointer.initialized = true;
    }
    pointer.targetX = x;
    pointer.targetY = y;
    pointer.targetStrength = 1;
    scheduleDraw();

    const hit = intersectionsRef.current.values();
    let hovered: ProjectNode | null = null;
    for (const point of hit) {
      if (Math.hypot(point.x - x, point.y - y) < 18) {
        hovered = point.project;
        break;
      }
    }
    if (hovered !== hoveredNode) onHoverNode(hovered);
  };

  const handlePointerLeave = () => {
    pointerRef.current.targetStrength = 0;
    scheduleDraw();
    onHoverNode(null);
  };

  const activeNode = hoveredNode || selectedNode;
  const spiderAngle = activeNode ? activeNode.radialPosition.spokeAngleDeg - 90 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[580px] sm:h-[680px] lg:h-[740px] overflow-hidden rounded-3xl border border-slate-700/80 bg-black flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label="Interactive spider web. Hover a circular project point to flex the strands, or select it to inspect the project."
        className="absolute inset-0 z-10 w-full h-full touch-none select-none"
      />

      {intersections.map((point) => {
        const isSelected = selectedNode?.id === point.project.id;
        const isHovered = hoveredNode?.id === point.project.id;
        return (
          <button
            key={point.project.id}
            type="button"
            aria-label={`Open ${point.project.title}`}
            title={point.project.title}
            onClick={() => onSelectNode(point.project)}
            onPointerEnter={() => onHoverNode(point.project)}
            onPointerLeave={() => onHoverNode(null)}
            onFocus={() => onHoverNode(point.project)}
            onBlur={() => onHoverNode(null)}
            className={`absolute z-20 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              isSelected || isHovered
                ? 'scale-110 border-white bg-white/20 shadow-[0_0_0_4px_rgba(255,255,255,0.08)]'
                : 'border-white/65 bg-black/75 hover:scale-110 hover:border-white hover:bg-white/15'
            }`}
            style={{ left: point.x, top: point.y }}
          >
            <span className={`h-2 w-2 rounded-full transition-colors ${isSelected || isHovered ? 'bg-white' : 'bg-slate-300'}`} />
          </button>
        );
      })}

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-30"
        aria-hidden="true"
        style={{ transform: `translate(-50%, -50%) rotate(${spiderAngle}deg)`, transition: 'transform 380ms ease-out' }}
      >
        <img
          src="/spider-detailed.png"
          alt=""
          draggable={false}
          className="h-32 w-28 select-none object-contain sm:h-40 sm:w-36"
          style={{ filter: 'contrast(1.22) brightness(1.08) drop-shadow(0 0 8px rgba(255, 255, 255, 0.45))' }}
        />
      </div>
    </div>
  );
};