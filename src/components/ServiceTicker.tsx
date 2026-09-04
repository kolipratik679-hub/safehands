import React from 'react';
import { ShieldCheck, CheckCircle, MapPin, Sparkles } from 'lucide-react';

const TICKER_ITEMS = [
  { text: 'PAN Card New & Correction', type: 'service' },
  { text: 'Aadhaar Card Updates', type: 'service' },
  { text: 'GST Registration & Monthly Returns', type: 'service' },
  { text: 'Income Tax Return (ITR)', type: 'service' },
  { text: 'Shop Act Gumasta Licence', type: 'service' },
  { text: 'MSME / Udyam Certificate', type: 'service' },
  { text: 'Home & Business Loan Assistance', type: 'service' },
  { text: 'Food Licence (FSSAI)', type: 'service' },
  { text: 'Gazette Name Change', type: 'service' },
  { text: 'Serving Panvel, Vadghar, Pushpak & Raigad', type: 'location' },
  { text: '100% Transparent Documentation', type: 'trust' },
];

export const ServiceTicker: React.FC = () => {
  return (
    <div className="w-full bg-[#0b1f42] text-white py-3 overflow-hidden border-y border-blue-900/50 relative shadow-inner">
      <div className="max-w-7xl mx-auto px-4 relative flex items-center">
        {/* Static label pill on the left for context */}
        <div className="hidden md:flex items-center gap-1.5 pr-4 pl-1 text-[11px] font-bold uppercase tracking-wider text-amber-300 border-r border-blue-800/80 flex-shrink-0 z-10 bg-[#0b1f42]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Assistance</span>
        </div>

        {/* Continuous ticker track */}
        <div className="overflow-hidden w-full select-none">
          <div className="flex w-max animate-marquee space-x-8 hover:[animation-play-state:paused]">
            {/* Double the list for seamless continuous infinite loop */}
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs text-slate-200 whitespace-nowrap font-medium transition-colors hover:text-white"
              >
                {item.type === 'service' && (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                )}
                {item.type === 'location' && (
                  <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                )}
                {item.type === 'trust' && (
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                )}
                <span>{item.text}</span>
                <span className="text-slate-600 ml-6 select-none">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
