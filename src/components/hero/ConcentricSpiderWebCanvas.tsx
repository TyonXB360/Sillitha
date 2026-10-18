import React, { useCallback, useEffect, useRef } from 'react';
import type { ProjectNode, EngineeringDiscipline } from '../../types/portfolio';
import { SpiderGraphic } from '../common/SpiderGraphic';

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
  radius: number;
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

    // Gently push nearby silk away from the pointer, like a web under light tension.
    const bend = (x: number, y: number) => {
      if (pointer.strength < 0.005) return { x, y };
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 0.01) return { x, y };
      const reach = 145;
      const influence = Math.exp(-(distance * distance) / (2 * reach * reach));
      const offset = 18 * influence * pointer.strength;
      return { x: x + (dx / distance) * offset, y: y + (dy / distance) * offset };
    };

    // Draw radial strands as curves so local pointer tension can flex them smoothly.
    for (let spoke = 0; spoke < SPOKE_COUNT; spoke += 1) {
      const angle = (spoke / SPOKE_COUNT) * Math.PI * 2;
      const end = bend(
        centerX + Math.cos(angle) * maxRadius,
        centerY + Math.sin(angle) * maxRadius
      );
      const control1 = bend(
        centerX + Math.cos(angle) * maxRadius / 3,
        centerY + Math.sin(angle) * maxRadius / 3
      );
      const control2 = bend(
        centerX + Math.cos(angle) * maxRadius * 2 / 3,
        centerY + Math.sin(angle) * maxRadius * 2 / 3
      );
      const isActive = activeIntersection?.spokeIndex === spoke;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.bezierCurveTo(control1.x, control1.y, control2.x, control2.y, end.x, end.y);
      ctx.strokeStyle = isActive ? 'rgba(224, 224, 224, 0.72)' : 'rgba(160, 160, 160, 0.36)';
      ctx.lineWidth = isActive ? 1.6 : 1;
      ctx.stroke();
    }

    // Draw concentric silk rings with a shallow inward sag.
    for (let ring = 1; ring <= RING_COUNT; ring += 1) {
      const ringFraction = ring / RING_COUNT;
      const ringRadius = ringFraction * maxRadius;
      const isActive = activeIntersection &&
        Math.abs(activeIntersection.ringFraction - ringFraction) < 0.12;

      ctx.beginPath();
      for (let spoke = 0; spoke < SPOKE_COUNT; spoke += 1) {
        const angle1 = (spoke / SPOKE_COUNT) * Math.PI * 2;
        const angle2 = ((spoke + 1) / SPOKE_COUNT) * Math.PI * 2;
        const p1 = bend(
          centerX + Math.cos(angle1) * ringRadius,
          centerY + Math.sin(angle1) * ringRadius
        );
        const p2 = bend(
          centerX + Math.cos(angle2) * ringRadius,
          centerY + Math.sin(angle2) * ringRadius
        );
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        const control = bend(
          midX + (centerX - midX) * 0.14,
          midY + (centerY - midY) * 0.14
        );

        if (spoke === 0) ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(control.x, control.y, p2.x, p2.y);
      }
      ctx.strokeStyle = isActive
        ? 'rgba(224, 224, 224, 0.72)'
        : `rgba(160, 160, 160, ${0.18 + ringFraction * 0.12})`;
      ctx.lineWidth = isActive ? 1.5 : 1;
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
    const nextIntersections = new Map<string, WebIntersection>();

    projects.forEach((project) => {
      const angle = (project.radialPosition.spokeAngleDeg * Math.PI) / 180;
      const ringFraction = project.radialPosition.ringFraction;
      nextIntersections.set(project.id, {
        project,
        spokeIndex: Math.round((project.radialPosition.spokeAngleDeg / 360) * SPOKE_COUNT) % SPOKE_COUNT,
        ringFraction,
        x: centerX + Math.cos(angle) * ringFraction * maxRadius,
        y: centerY + Math.sin(angle) * ringFraction * maxRadius,
        radius: project.featured ? 22 : 18,
      });
    });

    intersectionsRef.current = nextIntersections;
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
    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(animateRef.current);
    }
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

  const getCoordinates = (
    event: React.PointerEvent<HTMLCanvasElement> |
      React.MouseEvent<HTMLCanvasElement> |
      React.TouchEvent<HTMLCanvasElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if ('touches' in event && event.touches.length > 0) {
      return { x: event.touches[0].clientX - rect.left, y: event.touches[0].clientY - rect.top };
    }
    if ('clientX' in event) {
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
    return { x: 0, y: 0 };
  };

  const findNodeAtCoords = (x: number, y: number): ProjectNode | null => {
    for (const intersection of intersectionsRef.current.values()) {
      if (Math.hypot(intersection.x - x, intersection.y - y) <= intersection.radius + 8) {
        return intersection.project;
      }
    }
    return null;
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

    const hit = findNodeAtCoords(x, y);
    if (hit !== hoveredNode) onHoverNode(hit);
  };

  const handlePointerLeave = () => {
    pointerRef.current.targetStrength = 0;
    scheduleDraw();
    onHoverNode(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoordinates(event);
    const hit = findNodeAtCoords(x, y);
    if (hit) onSelectNode(hit);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoordinates(event);
    const hit = findNodeAtCoords(x, y);
    if (hit) {
      onHoverNode(hit);
      onSelectNode(hit);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[580px] sm:h-[680px] lg:h-[740px] overflow-hidden rounded-3xl border border-slate-700/80 bg-black flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        aria-label="Interactive structural spider web. Move your pointer to flex the strands, or select a web intersection to inspect a project."
        className="relative z-10 w-full h-full cursor-crosshair touch-none select-none"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <SpiderGraphic size={88} glow={true} />
      </div>
    </div>
  );
};