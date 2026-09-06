import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import officePhoto from '../assets/images/office_team_1788520698036.jpg';
import {
  ShieldCheck,
  Compass,
  Target,
  Users,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Phone,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEnquiry: (serviceName?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  return (
    <div className="w-full pb-16 bg-[#fcfdfd]">
      <Breadcrumbs items={[{ label: 'About Us', active: true }]} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              About Safehands Enterprises
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b5c] tracking-tight font-display">
              Your Trusted Partner for Growth &amp; Support in Panvel
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Safehands Enterprises is dedicated to providing straightforward client coordination, documentation assistance, and administrative support services to residents, students, professionals, and business owners across Panvel, Vadghar, Pushpak, and nearby areas.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Presence Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-slate-700 text-sm leading-relaxed">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display">
                Solving Everyday Documentation Challenges
              </h2>

              <p>
                In today&apos;s digital era, applying for a government certificate, registering a business under GST or MSME, filing annual taxes, or securing home financing requires navigating multiple complex online portals and fulfilling rigid document criteria. A single spelling discrepancy or missing affidavit often leads to weeks of delays and repeated visits.
              </p>

              <p>
                Safehands Enterprises was established to provide a friendly, dependable, and physically accessible center where citizens can walk in, have their documents reviewed by experienced consultants, and receive step-by-step guidance from start to finish.
              </p>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/60 space-y-2 text-xs">
                <div className="font-bold text-blue-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>Our Service Motto:</span>
                </div>
                <p className="text-blue-950 italic">
                  &quot;Client Coordination, Documentation &amp; Administrative Support Services — Your Trusted Partner For Growth &amp; Support.&quot;
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  src={officePhoto}
                  alt="Safehands Team Office in Panvel"
                  referrerPolicy="no-referrer"
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-14 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              What Sets Our Service Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Meticulous Accuracy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We review every Aadhaar number, PAN spelling, date of birth, and property agreement line before portal submission to ensure your application sails through verification smoothly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Strict Confidentiality</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your personal IDs, bank statements, and business figures are handled with high privacy standards. We do not share customer files with third parties.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Clear &amp; Honest Communication</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We provide truthful timelines and document checklists from day one. No false promises, hidden charges, or exaggerated claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Scope & Boundaries (Prompt Mandatory Compliance) */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Our Professional Scope &amp; Transparency Pledge
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Clear boundaries on what we do and how we operate.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed">
              <div className="space-y-2 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>What We Do:</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 pl-5 list-disc">
                  <li>Review documents to identify common submission errors</li>
                  <li>Prepare government portal application forms accurately</li>
                  <li>Schedule appointments at PSK, Aadhaar centers, and RTO</li>
                  <li>Assist with GST, ITR, and Udyam business tax filings</li>
                  <li>Compile bank loan dossiers according to lender guidelines</li>
                  <li>High-speed Xerox, scan, and legal document printing</li>
                </ul>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-slate-100 border border-slate-200">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-slate-600" />
                  <span>What We Respectfully Do Not Do:</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 pl-5 list-disc">
                  <li>We do not claim government authorization or agency status</li>
                  <li>We do not guarantee bank loan approvals or interest rates</li>
                  <li>We do not bypass statutory government procedures</li>
                  <li>We do not submit forged, inaccurate, or unverified papers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office & Locality CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl bg-[#0f2b5c] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Visit Us at Hari Vithal Complex, Panvel
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
                Open Monday to Saturday from 9:00 AM to 7:00 PM. We are always happy to answer your documentation questions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
              <a
                href="https://wa.me/917666040771?text=Hello%20Safehands%20Enterprises"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all flex items-center gap-1.5"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white text-white" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="tel:+917666040771"
                className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center gap-1.5"
                title="Call 7666040771"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>7666040771</span>
              </a>
              <a
                href="tel:+918097759771"
                className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center gap-1.5"
                title="Call 8097759771"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>8097759771</span>
              </a>
              <button
                onClick={() => onOpenEnquiry()}
                className="px-4 py-2.5 rounded-xl bg-white text-[#0f2b5c] hover:bg-slate-100 font-bold text-xs transition-all"
              >
                Request Callback
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
