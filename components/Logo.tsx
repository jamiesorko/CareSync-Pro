
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
      <path d="M50 5L15 20V45C15 70 50 95 50 95C50 95 85 70 85 45V20L50 5Z" fill="url(#logo-grad)" fillOpacity="0.2" stroke="url(#logo-grad)" strokeWidth="4"/>
      <path d="M30 50H42L50 35L58 65L66 50H70" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
      <defs>
        <linearGradient id="logo-grad" x1="15" y1="5" x2="85" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default Logo;
