import React, { useState, useEffect, useRef } from 'react';
import { Phone, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import heroPhoto from '../assets/images/hero_consultation_1788520674614.jpg';

export interface ShowcaseService {
  id: string;
  slug: string;
  name: string;
  categoryName: string;
  categoryTag: string;
  tagline: string;
  badge?: string;
  turnaround: string;
  iconBg: string;
  iconText: string;
}

const SHOWCASE_SERVICES: ShowcaseService[] = [
  {
    id: 'gst-filing',
    slug: 'gst-registration-filing',
    name: 'GST Registration & Return Filing',
    categoryName: 'Business & Tax Services',
    categoryTag: 'GST & Taxes',
    tagline: 'GSTR-1, 3B filings & fresh GSTIN registration',
    badge: 'Popular',
    turnaround: '3-7 Days',
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-700',
  },
  {
    id: 'itr-filing',
    slug: 'itr-filing',
    name: 'Income Tax Return (ITR) Filing',
    categoryName: 'Business & Tax Services',
    categoryTag: 'ITR Filings',
    tagline: 'Salaried, business & capital gains computation',
    badge: 'Fast Processing',
    turnaround: '1-2 Days',
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-700',
  },
  {
    id: 'home-loan',
    slug: 'home-loans',
    name: 'Home Loans & Mortgage Liaison',
    categoryName: 'Loans & Financial Assistance',
    categoryTag: 'Bank Loans',
    tagline: 'File preparation & multi-bank liaison in Panvel',
    badge: 'High Approval',
    turnaround: 'Bank Coordination',
    iconBg: 'bg-indigo-100',
    iconText: 'text-indigo-700',
  },
  {
    id: 'udyam-reg',
    slug: 'msme-udyam-registration',
    name: 'MSME Udyam Registration',
    categoryName: 'Business & Tax Services',
    categoryTag: 'Govt Portal',
    tagline: 'Government certificate for subsidy & bank tenders',
    badge: 'Same Day',
    turnaround: '1-2 Days',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-700',
  },
  {
    id: 'shop-act',
    slug: 'shop-act-licence',
    name: 'Shop Act & Gumasta Licence',
    categoryName: 'Licences & Registrations',
    categoryTag: 'Licences',
    tagline: 'Mandatory commercial establishment registration',
    badge: 'Mandatory',
    turnaround: '2-4 Days',
    iconBg: 'bg-purple-100',
    iconText: 'text-purple-700',
  },
  {
    id: 'fssai-licence',
    slug: 'food-licence-fssai',
    name: 'Food Licence (FSSAI) Registration',
    categoryName: 'Licences & Registrations',
    categoryTag: 'Food & Health',
    tagline: 'Food business operators, stalls, cafes & distributors',
    badge: 'FSSAI Certified',
    turnaround: '3-5 Days',
    iconBg: 'bg-rose-100',
    iconText: 'text-rose-700',
  },
  {
    id: 'pan-card',
    slug: 'pan-card-services',
    name: 'PAN Card (New & Correction)',
    categoryName: 'Government Services',
    categoryTag: 'Govt Identity',
    tagline: 'NSDL portal filing, name/DOB change & instant e-PAN',
    badge: 'Instant Support',
    turnaround: '2-5 Days',
    iconBg: 'bg-sky-100',
    iconText: 'text-sky-700',
  },
  {
    id: 'domicile-income',
    slug: 'income-certificate',
    name: 'Income & Domicile Certificates',
    categoryName: 'Documents & Certificates',
    categoryTag: 'Certificates',
    tagline: 'Tehsil & MahaOnline submission documentation',
    badge: 'Aaple Sarkar',
    turnaround: 'Portal Process',
    iconBg: 'bg-teal-100',
    iconText: 'text-teal-700',
  },
  {
    id: 'business-loan',
    slug: 'business-loans',
    name: 'Business Loan & Working Capital',
    categoryName: 'Loans & Financial Assistance',
    categoryTag: 'Commercial',
    tagline: 'Unsecured & MSME collateral loans assistance',
    badge: 'Bank Tie-ups',
    turnaround: 'Fast Liaison',
    iconBg: 'bg-violet-100',
    iconText: 'text-violet-700',
  },
  {
    id: 'driving-licence',
    slug: 'driving-licence-guidance',
    name: 'Driving Licence & RTO Guidance',
    categoryName: 'Government Services',
    categoryTag: 'RTO Services',
    tagline: 'Sarathi portal slot booking & file compilation',
    badge: 'RTO Panvel',
    turnaround: 'Slot Based',
    iconBg: 'bg-cyan-100',
    iconText: 'text-cyan-700',
  },
];

const VISIBLE_COUNT = 5;

interface HeroServiceShowcaseProps {
  onSelectService?: (slug: string) => void;
  onOpenEnquiry?: (serviceName?: string) => void;
}

export const HeroServiceShowcase: React.FC<HeroServiceShowcaseProps> = ({
  onSelectService,
  onOpenEnquiry,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advancing vertical loop: 1,2,3,4,5 -> 2,3,4,5,6 -> 3,4,5,6,7 -> seamless wrap
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % SHOWCASE_SERVICES.length);
    }, 2800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  // Compute the current 5 visible services with continuous loop indexing
  const visibleServices = Array.from({ length: VISIBLE_COUNT }).map((_, offset) => {
    const serviceIndex = (startIndex + offset) % SHOWCASE_SERVICES.length;
    return {
      service: SHOWCASE_SERVICES[serviceIndex],
      positionIndex: offset,
      serviceIndex,
    };
  });

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      role="region"
      aria-label="Safehands Services Showcase"
    >
      {/* Visual Image Header featuring actual Safehands Consultation Desk */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={heroPhoto}
          alt="Safehands Consultation and Documentation Desk in Panvel"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* Top Overlay Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white">
          <span className="text-[10px] bg-blue-600/90 backdrop-blur-sm text-white font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>Active Desk • Panvel</span>
          </span>
          <span className="text-[10px] bg-slate-800/80 backdrop-blur-sm text-amber-300 font-semibold px-2.5 py-1 rounded-full border border-amber-400/30">
            25+ Citizen &amp; Business Services
          </span>
        </div>

        {/* Bottom Title Bar */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Continuous Service Showcase</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white">
              Official Filings &amp; Document Desk
            </div>
          </div>

          <div className="text-[10px] text-slate-300 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded font-mono">
            {startIndex + 1} / {SHOWCASE_SERVICES.length}
          </div>
        </div>
      </div>

      {/* Auto-advancing Vertically Moving Services List */}
      <div className="p-3 sm:p-4 bg-white space-y-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 px-1">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <span>Live Services in Motion</span>
            {isPaused && (
              <span className="text-[10px] font-normal text-amber-600 lowercase bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                (paused)
              </span>
            )}
          </span>
          <span className="text-[11px] text-blue-700 font-semibold">
            Auto-cycling
          </span>
        </div>

        {/* The 5 visible items container with GPU-accelerated transition */}
        <div className="space-y-1.5 min-h-[265px]">
          {visibleServices.map(({ service, positionIndex, serviceIndex }) => {
            // Position 1 (second item) is treated as the focal/active highlighted item
            const isFocal = positionIndex === 1;

            return (
              <div
                key={`${service.id}-${serviceIndex}`}
                onClick={() => {
                  if (onSelectService) onSelectService(service.slug);
                  else if (onOpenEnquiry) onOpenEnquiry(service.name);
                }}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-300 ${
                  isFocal
                    ? 'bg-gradient-to-r from-blue-50/95 via-indigo-50/80 to-white border-2 border-blue-400/90 shadow-md transform scale-[1.01]'
                    : 'bg-slate-50/60 hover:bg-slate-100/80 border border-slate-200/60 opacity-90 hover:opacity-100'
                }`}
                title={`Click to view details for ${service.name}`}
              >
                {/* Left: Number + Details */}
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold transition-colors ${
                      isFocal
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600'
                    }`}
                  >
                    {serviceIndex + 1}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-bold truncate ${
                          isFocal ? 'text-blue-950' : 'text-slate-800'
                        }`}
                      >
                        {service.name}
                      </span>
                      {isFocal && service.badge && (
                        <span className="hidden sm:inline-block text-[9.5px] font-extrabold bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10.5px] text-slate-500 truncate mt-0.5">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* Right: Category tag & Action Icon */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span
                    className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                      isFocal
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    {service.categoryTag}
                  </span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isFocal ? 'text-blue-700 translate-x-0.5' : 'text-slate-400'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Liaison Bar with Dual Call Links and WhatsApp */}
        <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Need immediate guidance on any service?</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg text-xs font-bold text-slate-800">
              <Phone className="w-3 h-3 text-blue-600" />
              <a href="tel:+917666040771" className="hover:text-blue-700" title="Call 7666040771">
                7666040771
              </a>
              <span className="text-slate-400">/</span>
              <a href="tel:+918097759771" className="hover:text-blue-700" title="Call 8097759771">
                8097759771
              </a>
            </div>

            <a
              href="https://wa.me/917666040771?text=Hello%20Safehands%20Enterprises,%20I%20saw%20your%20services%20and%20want%20to%20inquire."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              title="Chat on WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
