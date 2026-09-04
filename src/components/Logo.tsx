import React from 'react';
import logoImg from '../assets/images/safehands_logo_1788520653667.jpg';

interface LogoProps {
  variant?: 'full' | 'compact' | 'white';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '' }) => {
  const isWhite = variant === 'white';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Shield Emblem with Handshake & Ribbon */}
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl overflow-hidden shadow-sm border border-slate-200/80 bg-white p-0.5">
        <img
          src={logoImg}
          alt="Safehands Enterprises Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Brand Typography matching official banner & reference design */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span className={`text-lg sm:text-xl font-extrabold tracking-tight uppercase font-display ${isWhite ? 'text-white' : 'text-[#0f2b5c]'}`}>
            Safehands
          </span>
        </div>
        <span className={`text-[9px] sm:text-[10px] tracking-[0.16em] uppercase font-bold ${isWhite ? 'text-blue-200' : 'text-slate-500'}`}>
          — Enterprises —
        </span>
        {variant === 'full' && (
          <span className={`text-[8.5px] font-medium tracking-tight hidden sm:block ${isWhite ? 'text-slate-300' : 'text-emerald-700 font-semibold'}`}>
            Your Trusted Partner For Growth &amp; Support
          </span>
        )}
      </div>
    </div>
  );
};
