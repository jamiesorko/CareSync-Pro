
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
      <defs>
        <linearGradient id="helix-grad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Helix Strand A */}
      <path d="M30 20C30 20 70 40 70 50C70 60 30 80 30 80" stroke="url(#helix-grad)" strokeWidth="8" strokeLinecap="round" opacity="0.4" />
      {/* Helix Strand B */}
      <path d="M70 20C70 20 30 40 30 50C30 60 70 80 70 80" stroke="url(#helix-grad)" strokeWidth="8" strokeLinecap="round" />
      {/* Central Pulse */}
      <path d="M50 15V85" stroke="white" strokeWidth="2" strokeDasharray="4 4" className="animate-[pulse_2s_infinite]" />
      <circle cx="50" cy="50" r="6" fill="white" filter="url(#glow)" className="animate-pulse" />
    </svg>
  </div>
);

export default Logo;
