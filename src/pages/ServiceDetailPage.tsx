import React, { useState } from 'react';
import { getServiceBySlug, ALL_SERVICES_DATA } from '../data/servicesData';
import { PageRoute, ServiceCategory } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceIcon } from '../components/ServiceIcon';
import {
  Clock,
  FileCheck,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Phone,
  AlertCircle,
  ArrowRight,
  MapPin,
  CheckSquare,
  Square,
  Share2,
} from 'lucide-react';

interface ServiceDetailPageProps {
  serviceSlug: string;
  onNavigate: (route: PageRoute, category?: ServiceCategory, serviceSlug?: string) => void;
  onOpenEnquiry: (serviceName?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceSlug,
  onNavigate,
  onOpenEnquiry,
}) => {
  const service = getServiceBySlug(serviceSlug) || ALL_SERVICES_DATA[0];
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleDoc = (index: number) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;
  const totalCount = service.requiredDocuments.length;

  const relatedServices = (service.relatedServiceSlugs || [])
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean);

  return (
    <div className="w-full pb-16 bg-[#fcfdfd]">
      <Breadcrumbs
        items={[
          { label: 'Services', route: 'services' },
          { label: service.categoryName, route: 'category', category: service.category },
          { label: service.name, active: true },
        ]}
        onNavigate={onNavigate}
      />

      {/* Detail Header Banner */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                  {service.categoryName}
                </span>
                {service.popular && (
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
                    Popular Service
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{service.turnaroundTime}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b5c] tracking-tight font-display">
                {service.name}
              </h1>

              <p className="text-base text-slate-600 leading-relaxed">
                {service.shortDescription}
              </p>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2 self-start flex-shrink-0">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={() => onOpenEnquiry(service.name)}
                className="px-5 py-2.5 rounded-xl bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold text-xs shadow transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Inquire Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left/Main Column: In-depth Details (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-10">
              {/* 1. Overview */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 space-y-3">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  <span>Service Overview</span>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.fullDescription}
                </p>

                {service.whoNeedsThis && (
                  <div className="mt-4 pt-4 border-t border-slate-100 bg-blue-50/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                    <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
                      Who Needs This Service?
                    </h3>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {service.whoNeedsThis}
                    </p>
                  </div>
                )}
              </div>

              {/* 2. Interactive Document Checklist */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Required Documents Checklist</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Click the checkboxes below to track the documents you have ready before visiting us.
                    </p>
                  </div>

                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start">
                    {checkedCount} of {totalCount} ready
                  </span>
                </div>

                <div className="space-y-2.5 pt-2">
                  {service.requiredDocuments.map((doc, idx) => {
                    const isChecked = !!checkedDocs[idx];

                    return (
                      <div
                        key={idx}
                        onClick={() => toggleDoc(idx)}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors text-xs ${
                          isChecked
                            ? 'bg-emerald-50/70 border-emerald-200 text-slate-900 font-semibold'
                            : 'bg-slate-50/50 border-slate-200/70 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-emerald-600"
                          aria-label={`Toggle document ${doc}`}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                        <span className="flex-1 leading-snug">{doc}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[11px] text-slate-500 pt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>Please bring original copies for verification and physical appointments.</span>
                </div>
              </div>

              {/* 3. Step-by-Step Procedure */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 space-y-4">
                <h2 className="text-xl font-bold text-slate-900">
                  Step-by-Step Assistance Process
                </h2>
                <div className="space-y-3">
                  {service.processSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 text-xs">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center flex-shrink-0 mt-0.5 text-[11px]">
                        {idx + 1}
                      </div>
                      <div className="flex-1 pt-0.5 text-slate-700 font-medium leading-relaxed">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Important Compliance Notes */}
              {service.importantNotes && (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1.5">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>Important Compliance Notice:</span>
                  </div>
                  <p className="text-amber-800 leading-relaxed pl-5">
                    {service.importantNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Right Sticky Sidebar (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6 sticky top-24">
              {/* Quick Action Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Assistance Plan
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    Get Started With Safehands
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Have your documents reviewed by our team in Panvel.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  <button
                    onClick={() => onOpenEnquiry(service.name)}
                    className="w-full py-3 px-4 rounded-xl bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Request Callback for {service.name}</span>
                  </button>

                  <a
                    href={`https://wa.me/917666040771?text=${encodeURIComponent(`Hello Safehands Enterprises, I need assistance with ${service.name}. Here is my document readiness: ${checkedCount}/${totalCount} documents.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Chat on WhatsApp: 7666040771</span>
                  </a>

                  <a
                    href="tel:+917666040771"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Call Our Desk: 7666040771</span>
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-relaxed">
                      Shop No. 4, Plot No. 284, Hari Vithal Complex, Sector R3, Pushpak Old Panvel
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Monday - Saturday: 9:00 AM - 7:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Related Services
                  </h4>
                  <div className="space-y-2">
                    {relatedServices.map((rel) => {
                      if (!rel) return null;
                      return (
                        <button
                          key={rel.id}
                          onClick={() => onNavigate('service-detail', undefined, rel.slug)}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-200/80"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                              <ServiceIcon name={rel.iconName} className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                              {rel.name}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
