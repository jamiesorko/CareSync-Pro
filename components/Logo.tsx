
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]">
      {/* Outer Shield Hexagon */}
      <path 
        d="M50 5L85 22V48C85 72 50 95 50 95C50 95 15 72 15 48V22L50 5Z" 
        fill="url(#logo-grad-main)" 
        fillOpacity="0.15" 
        stroke="url(#logo-grad-main)" 
        strokeWidth="3"
      />
      {/* Internal Pulse Path */}
      <path 
        d="M30 50H42L50 30L58 70L66 50H70" 
        stroke="white" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="animate-pulse"
      />
      {/* Accents */}
      <circle cx="50" cy="5" r="3" fill="#6366f1" className="opacity-50" />
      <defs>
        <linearGradient id="logo-grad-main" x1="15" y1="5" x2="85" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default Logo;
