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

  const drawWeb = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !container || !ctx) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.44;
    const activeNode = hoveredNode || selectedNode;
    const activeIntersection = activeNode
      ? intersectionsRef.current.get(activeNode.id)
      : undefined;

    // Draw the radial structural strands.
    for (let spoke = 0; spoke < SPOKE_COUNT; spoke += 1) {
      const angle = (spoke / SPOKE_COUNT) * Math.PI * 2;
      const endX = centerX + Math.cos(angle) * maxRadius;
      const endY = centerY + Math.sin(angle) * maxRadius;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = activeIntersection?.spokeIndex === spoke
        ? 'rgba(224, 224, 224, 0.72)'
        : 'rgba(160, 160, 160, 0.36)';
      ctx.lineWidth = activeIntersection?.spokeIndex === spoke ? 1.6 : 1;
      ctx.stroke();
    }

    // Draw the concentric silk rings with a shallow inward sag.
    for (let ring = 1; ring <= RING_COUNT; ring += 1) {
      const ringFraction = ring / RING_COUNT;
      const ringRadius = ringFraction * maxRadius;
      const isActive = activeIntersection &&
        Math.abs(activeIntersection.ringFraction - ringFraction) < 0.12;

      ctx.beginPath();
      for (let spoke = 0; spoke < SPOKE_COUNT; spoke += 1) {
        const angle1 = (spoke / SPOKE_COUNT) * Math.PI * 2;
        const angle2 = ((spoke + 1) / SPOKE_COUNT) * Math.PI * 2;
        const p1x = centerX + Math.cos(angle1) * ringRadius;
        const p1y = centerY + Math.sin(angle1) * ringRadius;
        const p2x = centerX + Math.cos(angle2) * ringRadius;
        const p2y = centerY + Math.sin(angle2) * ringRadius;
        const midX = (p1x + p2x) / 2;
        const midY = (p1y + p2y) / 2;
        const controlX = midX + (centerX - midX) * 0.14;
        const controlY = midY + (centerY - midY) * 0.14;

        if (spoke === 0) ctx.moveTo(p1x, p1y);
        ctx.quadraticCurveTo(controlX, controlY, p2x, p2y);
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

  useEffect(() => {
    syncWebNodes();
    window.addEventListener('resize', syncWebNodes);
    return () => window.removeEventListener('resize', syncWebNodes);
  }, [syncWebNodes]);

  useEffect(() => {
    drawWeb();
  }, [drawWeb]);

  const getCoordinates = (
    event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
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

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoordinates(event);
    const hit = findNodeAtCoords(x, y);
    if (hit !== hoveredNode) onHoverNode(hit);
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
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <SpiderGraphic size={56} glow={true} />
      </div>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => onHoverNode(null)}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        aria-label="Interactive structural spider web. Select a web intersection to inspect a project."
        className="relative z-10 w-full h-full cursor-crosshair touch-none select-none"
      />
    </div>
  );
};