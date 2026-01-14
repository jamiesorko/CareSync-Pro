
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]">
      <path 
        d="M50 5L85 20V45C85 70 50 95 50 95C50 95 15 70 15 45V20L50 5Z" 
        fill="url(#logo-grad-main)" 
        fillOpacity="0.1" 
        stroke="url(#logo-grad-main)" 
        strokeWidth="4"
      />
      <path 
        d="M35 50H45L50 35L55 65L65 50H75" 
        stroke="white" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="animate-pulse shadow-white"
      />
      <path 
        d="M50 15V25M50 75V85M25 50H30M70 50H75" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="opacity-40"
      />
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
