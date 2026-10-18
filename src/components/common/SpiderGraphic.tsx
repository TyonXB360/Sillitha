import React from 'react';

interface SpiderGraphicProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const SpiderGraphic: React.FC<SpiderGraphicProps> = ({
  className = '',
  size = 48,
  glow = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Intense Pure White & Soft Luminous Glow Filter */}
          <filter id="white-spider-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Abdomen / Carapace High-Contrast Shading */}
          <radialGradient id="spider-white-core" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="35%" stop-color="#F1F5F9" />
            <stop offset="70%" stop-color="#CBD5E1" />
            <stop offset="90%" stop-color="#64748B" />
            <stop offset="100%" stop-color="#334155" />
          </radialGradient>

          {/* Articulated Leg Bone Gradient */}
          <linearGradient id="spider-leg-bone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="40%" stop-color="#E2E8F0" />
            <stop offset="75%" stop-color="#94A3B8" />
            <stop offset="100%" stop-color="#475569" />
          </linearGradient>

          {/* Spine & Chitin Ridge Gradient */}
          <linearGradient id="spider-ridge-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="50%" stop-color="#F5F5F5" />
            <stop offset="100%" stop-color="#E0E0E0" />
          </linearGradient>
        </defs>

        {/* Ambient Luminous Halo */}
        {glow && (
          <ellipse
            cx="60"
            cy="60"
            rx="46"
            ry="46"
            fill="#FFFFFF"
            opacity="0.16"
            filter="url(#white-spider-glow)"
          />
        )}

        {/* --- 8 ARTICULATED LEGS (Glowing Ivory / High-Contrast White) --- */}
        <g stroke="url(#spider-leg-bone)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Front Left Leg 1 */}
          <path d="M 52 46 L 28 22 L 18 10 L 12 16" />
          {/* Front Right Leg 1 */}
          <path d="M 68 46 L 92 22 L 102 10 L 108 16" />

          {/* Mid-Front Left Leg 2 */}
          <path d="M 50 52 L 22 36 L 8 34 L 4 46" />
          {/* Mid-Front Right Leg 2 */}
          <path d="M 70 52 L 98 36 L 112 34 L 116 46" />

          {/* Mid-Rear Left Leg 3 */}
          <path d="M 50 58 L 20 66 L 10 78 L 12 94" />
          {/* Mid-Rear Right Leg 3 */}
          <path d="M 70 58 L 100 66 L 110 78 L 108 94" />

          {/* Rear Left Leg 4 */}
          <path d="M 52 64 L 30 86 L 24 104 L 30 112" />
          {/* Rear Right Leg 4 */}
          <path d="M 68 64 L 90 86 L 96 104 L 90 112" />
        </g>

        {/* Leg Articulation Knuckles & Spines */}
        <g fill="#FFFFFF">
          <circle cx="28" cy="22" r="2.5" />
          <circle cx="92" cy="22" r="2.5" />
          <circle cx="22" cy="36" r="2.5" />
          <circle cx="98" cy="36" r="2.5" />
          <circle cx="20" cy="66" r="2.5" />
          <circle cx="100" cy="66" r="2.5" />
          <circle cx="30" cy="86" r="2.5" />
          <circle cx="90" cy="86" r="2.5" />
        </g>

        {/* --- CHELICERAE & PEDIPALPS (Front Fangs) --- */}
        <g stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round">
          <path d="M 55 38 L 51 26 L 53 24" />
          <path d="M 65 38 L 69 26 L 67 24" />
        </g>

        {/* --- ABDOMEN (Luminous White Carapace with Detailed Segmentation) --- */}
        <ellipse
          cx="60"
          cy="76"
          rx="19"
          ry="25"
          fill="url(#spider-white-core)"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          filter={glow ? "url(#white-spider-glow)" : undefined}
        />

        {/* Abdomen Spine Ridges & Chitin Textures */}
        <path
          d="M 54 62 Q 60 70 54 88 Q 60 83 66 88 Q 60 70 66 62 Z"
          fill="#FFFFFF"
          opacity="0.95"
        />
        <line x1="60" y1="58" x2="60" y2="95" stroke="#FFFFFF" strokeWidth="1.8" />
        <ellipse cx="60" cy="74" rx="4.5" ry="4.5" fill="#FFFFFF" />
        {/* Subtle horizontal segmented ribs */}
        <path d="M 47 70 Q 60 73 73 70" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 46 78 Q 60 81 74 78" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 48 86 Q 60 89 72 86" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />

        {/* --- CEPHALOTHORAX (Head & Mid-Body) --- */}
        <ellipse
          cx="60"
          cy="48"
          rx="15"
          ry="14"
          fill="url(#spider-white-core)"
          stroke="#FFFFFF"
          strokeWidth="2.2"
        />

        {/* --- GLOWING EYES (Pure Radiant White with Laser Intensity) --- */}
        <circle cx="56" cy="40" r="2.4" fill="#FFFFFF" filter="url(#white-spider-glow)" />
        <circle cx="64" cy="40" r="2.4" fill="#FFFFFF" filter="url(#white-spider-glow)" />
        <circle cx="52" cy="42" r="1.8" fill="#FFFFFF" />
        <circle cx="68" cy="42" r="1.8" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
