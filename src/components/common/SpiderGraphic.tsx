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
}) => (
  <span
    className={`inline-flex shrink-0 items-center justify-center select-none ${className}`}
    style={{ width: size, height: size }}
  >
    <img
      src="/sillitha-logo.png"
      alt="Sillitha spider logo"
      draggable={false}
      className="h-full w-full object-contain"
      style={{ filter: glow ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))' : undefined }}
    />
  </span>
);