import React from 'react';
import { Logo } from './Logo';
import { PageRoute, ServiceCategory } from '../types';
import { CATEGORIES_DATA } from '../data/servicesData';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldAlert,
  ArrowUpRight,
  Heart,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute, category?: ServiceCategory, serviceSlug?: string) => void;
  onOpenEnquiry: (serviceName?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnquiry }) => {
  return (
    <footer className="bg-[#0b1d3d] text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left focus:outline-none"
              aria-label="Safehands Enterprises Home"
            >
              <Logo variant="white" />
            </button>
            <p className="text-sm text-slate-300 leading-relaxed pr-2">
              Your trusted partner for client coordination, documentation assistance, business tax filings, licences, certificates, and loan assistance in Panvel, Vadghar, Pushpak, and nearby Raigad areas.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href="https://wa.me/917666040771?text=Hello%20Safehands%20Enterprises"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="tel:+917666040771"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Call 7666040771</span>
              </a>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Monday - Saturday: 9:00 AM - 7:00 PM</span>
            </div>
          </div>

          {/* Col 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  All Services (25+)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-white transition-colors text-left"
                >
                  Resources &amp; Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors text-left"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Categories (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Our Services
            </h3>
            <ul className="space-y-2 text-sm">
              {CATEGORIES_DATA.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate('category', cat.id)}
                    className="hover:text-white transition-colors text-left flex items-center justify-between w-full group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {cat.name}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-blue-400 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Information (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact &amp; Visit
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <address className="not-italic text-xs leading-relaxed text-slate-300">
                  Shop No. 4, Plot No. 284, Hari Vithal Complex, Sector R3, Pushpak Old Panvel, Vadghar, Raigad - 410220
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="tel:+917666040771"
                  className="text-xs hover:text-white transition-colors font-medium"
                >
                  +91 76660 40771
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="https://wa.me/917666040771"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs hover:text-white transition-colors font-medium"
                >
                  Chat on WhatsApp: 7666040771
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:safehandsenterprises@gmail.com"
                  className="text-xs hover:text-white transition-colors truncate"
                >
                  safehandsenterprises@gmail.com
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenEnquiry()}
                  className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Request Callback
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Box (Honest & Factual) */}
        <div className="my-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">Legal &amp; Service Disclaimer: </strong>
            Safehands Enterprises is a private administrative support and client coordination consultancy. We are not a government department, banking institution, or law firm. We facilitate paperwork preparation, portal filings, and procedural assistance. Issuance of certificates, licenses, and bank loan approvals remains at the sole statutory discretion of respective government authorities and financial institutions.
          </div>
        </div>

        {/* Bottom copyright & links */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>
            &copy; 2026 Safehands Enterprises. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Panvel • Vadghar • Pushpak • Karanjade</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
