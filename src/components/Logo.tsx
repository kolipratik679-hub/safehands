import React from 'react';
import officialLogo from '../assets/images/safehands-logo.png';

interface LogoProps {
  variant?: 'full' | 'compact' | 'white';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '' }) => {
  const isWhite = variant === 'white';

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 select-none min-w-0 ${className}`}>
      {/* Official Safehands Enterprises Logo Asset - 100% genuine aspect ratio */}
      <div className={`relative flex-shrink-0 rounded-xl overflow-hidden transition-transform duration-200 ${
        isWhite ? 'bg-white p-1 shadow-sm' : 'bg-transparent'
      }`}>
        <img
          src={officialLogo}
          alt="Safehands Enterprises Official Logo"
          referrerPolicy="no-referrer"
          className={`object-contain transition-all aspect-square ${
            variant === 'compact'
              ? 'w-8 h-8 sm:w-9 sm:h-9'
              : 'w-10 h-10 sm:w-11 sm:h-11'
          }`}
        />
      </div>

      {/* Brand Typography matching official banner */}
      <div className="flex flex-col leading-tight min-w-0">
        <div className="flex items-center gap-1">
          <span className={`text-base sm:text-lg font-extrabold tracking-tight uppercase font-display truncate ${isWhite ? 'text-white' : 'text-[#0f2b5c]'}`}>
            Safehands
          </span>
        </div>
        <span className={`text-[8px] sm:text-[9.5px] tracking-[0.14em] uppercase font-bold ${isWhite ? 'text-blue-200' : 'text-slate-500'}`}>
          — Enterprises —
        </span>
        {variant === 'full' && (
          <span className={`text-[8px] font-semibold tracking-tight hidden md:block ${isWhite ? 'text-slate-300' : 'text-emerald-700'}`}>
            Your Trusted Partner For Growth &amp; Support
          </span>
        )}
      </div>
    </div>
  );
};
