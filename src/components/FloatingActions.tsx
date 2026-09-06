import React, { useState } from 'react';
import { Phone, Sparkles, X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FloatingActionsProps {
  onOpenEnquiry: (serviceName?: string) => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenEnquiry }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Expanded Quick Options */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2 mb-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <a
            href="tel:+917666040771"
            id="floating-call-button-1"
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-800 rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-transform active:scale-95 text-xs font-bold"
            title="Call 7666040771"
          >
            <Phone className="w-4 h-4 text-blue-600" />
            <span>Call 7666040771</span>
          </a>

          <a
            href="tel:+918097759771"
            id="floating-call-button-2"
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-800 rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-transform active:scale-95 text-xs font-bold"
            title="Call 8097759771"
          >
            <Phone className="w-4 h-4 text-blue-600" />
            <span>Call 8097759771</span>
          </a>

          <button
            onClick={() => {
              onOpenEnquiry();
              setIsOpen(false);
            }}
            id="floating-enquiry-button"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0f2b5c] text-white rounded-full shadow-lg hover:bg-blue-900 transition-transform active:scale-95 text-xs font-bold"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Send Enquiry Form</span>
          </button>
        </div>
      )}

      {/* Main Action Buttons */}
      <div className="flex items-center gap-2">
        {/* WhatsApp Direct Link */}
        <a
          href="https://wa.me/917666040771?text=Hello%20Safehands%20Enterprises,%20I%20need%20assistance%20with%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          id="floating-whatsapp-direct"
          aria-label="Chat on WhatsApp"
          className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
          title="Chat on WhatsApp"
        >
          <WhatsAppIcon className="w-6 h-6 fill-white text-white" />
        </a>

        {/* Toggle Menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="floating-menu-toggle"
          aria-label="Quick contact options"
          className="w-12 h-12 rounded-full bg-[#0f2b5c] hover:bg-blue-900 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
