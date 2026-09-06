import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import {
  FileText,
  MessageCircle,
  FileCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Phone,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEnquiry: (serviceName?: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  const [selectedStep, setSelectedStep] = useState(0);

  const detailedSteps = [
    {
      step: '01',
      title: 'Choose Service & Initial Consultation',
      subtitle: 'Identify what you need to achieve',
      desc: 'Browse our catalog of 25+ services across government applications, tax returns, MSME certificates, or loans. You can also directly explain your situation to our consultants via phone or WhatsApp.',
      whatYouDo: 'Tell us your goal (e.g., college admission domicile, opening a current account, home loan application).',
      whatWeDo: 'We identify the exact statutory procedure, expected government fees, and provide a tailored document checklist.',
      icon: FileText,
    },
    {
      step: '02',
      title: 'Share Basic Details & Documentation',
      subtitle: 'Collate your foundational papers',
      desc: 'Provide copies of your primary proofs (Aadhaar, PAN, utility bills, school leaving certificates, or financial statements). You can bring them to our Panvel office or send digital scans/photos on WhatsApp.',
      whatYouDo: 'Gather your identity and address records according to the checklist.',
      whatWeDo: 'We verify document integrity, check for spelling consistency, and confirm compliance with current department mandates.',
      icon: MessageCircle,
    },
    {
      step: '03',
      title: 'Document Scrutiny & Affidavit Preparation',
      subtitle: 'Eliminate potential rejection points',
      desc: 'Most government portal rejections happen due to minor clerical mismatches between school records, Aadhaar, and applicant affidavits. We rectify formatting issues, resize scans to portal limits, and draft necessary declarations.',
      whatYouDo: 'Sign drafted declarations or self-attest supporting documents.',
      whatWeDo: 'We prepare the complete digital dossier, generate required affidavits, and convert documents into high-resolution PDFs.',
      icon: FileCheck,
    },
    {
      step: '04',
      title: 'Application Assistance & Appointment Booking',
      subtitle: 'Execution on statutory portals',
      desc: 'We assist with submitting the application on the respective official portal (Aaple Sarkar, Income Tax, GST, FoSCoS, Sarathi, or Passport Seva) and schedule physical verification slots where mandated.',
      whatYouDo: 'Attend any mandatory in-person slot (e.g. Passport Seva Kendra or Aadhaar Biometric counter).',
      whatWeDo: 'We pay government challans, generate Application Reference Numbers (ARN/URN), and hand over the slot booking appointment sheet.',
      icon: Sparkles,
    },
    {
      step: '05',
      title: 'Tracking, Completion & Handover',
      subtitle: 'Receive your verified credentials',
      desc: 'We monitor your file through departmental scrutiny stages. Once approved, we download the digitally signed certificate, laminate the physical copy, and hand it over to you or send the verified PDF via WhatsApp.',
      whatYouDo: 'Collect your laminated certificate or download your verified e-document.',
      whatWeDo: 'We share status updates throughout and verify that the government QR code validates correctly.',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="w-full pb-16 bg-[#fcfdfd]">
      <Breadcrumbs items={[{ label: 'How It Works', active: true }]} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Transparent 5-Step Process
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b5c] tracking-tight font-display">
              How Safehands Gets Your Work Done
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              We have refined our workflow into five structured steps to make sure your applications are prepared accurately, submitted promptly, and tracked until completion.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive 5-Step Detail Explorer */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Step Selection Tabs (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-2.5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
                Workflow Overview
              </div>
              {detailedSteps.map((step, idx) => {
                const isSelected = selectedStep === idx;
                const IconComponent = step.icon;

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedStep(idx)}
                    className={`w-full flex items-start gap-3.5 p-4 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-300 shadow-sm'
                        : 'bg-white border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isSelected
                          ? 'bg-[#0f2b5c] text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {step.step}
                    </div>
                    <div>
                      <div
                        className={`text-sm font-bold ${
                          isSelected ? 'text-blue-900' : 'text-slate-800'
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{step.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step Detail Display (lg:col-span-8) */}
            <div className="lg:col-span-8">
              {(() => {
                const current = detailedSteps[selectedStep];
                const IconComponent = current.icon;

                return (
                  <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-black text-amber-600 tracking-wider">
                            STEP {current.step} OF 05
                          </span>
                          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                            {current.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {current.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                        <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                          What You Do:
                        </div>
                        <p className="text-slate-600 leading-relaxed">{current.whatYouDo}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/60 space-y-1.5">
                        <div className="font-bold text-blue-900 uppercase tracking-wider text-[11px]">
                          How Safehands Assists:
                        </div>
                        <p className="text-blue-950 leading-relaxed">{current.whatWeDo}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() =>
                          setSelectedStep((prev) => (prev > 0 ? prev - 1 : 4))
                        }
                        className="text-xs font-bold text-slate-500 hover:text-slate-800"
                      >
                        &larr; Previous Step
                      </button>

                      <button
                        onClick={() =>
                          setSelectedStep((prev) => (prev < 4 ? prev + 1 : 0))
                        }
                        className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
                      >
                        <span>Next Step</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>
        </div>
      </section>

      {/* Helpful Tips Section */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto space-y-4 text-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">
              3 Helpful Tips Before Submitting Documents
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Keep these in mind for a smooth and fast service experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-xs text-slate-600">
            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm">1. Check Name Spellings</div>
              <p className="leading-relaxed">
                Ensure your name and date of birth match across Aadhaar, PAN, and school certificates. Mismatches are the #1 cause of portal delays.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm">2. Keep Mobile Linked</div>
              <p className="leading-relaxed">
                Most portals (Income Tax, Udyam, Aaple Sarkar, UIDAI) require OTP verification sent to your Aadhaar-linked mobile phone.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm">3. Carry Originals</div>
              <p className="leading-relaxed">
                When visiting Passport Seva Kendras, RTO offices, or Sub-Registrars, government officials inspect original papers alongside self-attested photocopies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="p-8 rounded-2xl bg-[#0f2b5c] text-white max-w-3xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold">
              Have Questions About Your Document Status?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100">
              Our consultants at Hari Vithal Complex, Pushpak Old Panvel are ready to assist.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
              <a
                href="https://wa.me/917666040771?text=Hello%20Safehands%20Enterprises,%20I%20have%20questions%20about%20the%20application%20process."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white text-white" />
                <span>WhatsApp 7666040771</span>
              </a>
              <a
                href="tel:+917666040771"
                className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                title="Call 7666040771"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>7666040771</span>
              </a>
              <a
                href="tel:+918097759771"
                className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                title="Call 8097759771"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>8097759771</span>
              </a>
              <button
                onClick={() => onOpenEnquiry()}
                className="px-4 py-2.5 rounded-xl bg-white text-[#0f2b5c] hover:bg-slate-100 font-bold text-xs transition-all"
              >
                Inquire With Our Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
