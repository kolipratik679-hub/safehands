import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ALL_SERVICES_DATA, CATEGORIES_DATA, getPopularServices } from '../data/servicesData';
import { RESOURCES_DATA } from '../data/resourcesData';
import { FAQS_DATA, CLIENT_EXPERIENCES } from '../data/faqsData';
import { PageRoute, ServiceCategory } from '../types';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceIcon } from '../components/ServiceIcon';
import { HeroTypewriter } from '../components/HeroTypewriter';
import { ServiceTicker } from '../components/ServiceTicker';
import heroPhoto from '../assets/images/hero_consultation_1788520674614.jpg';
import officePhoto from '../assets/images/office_team_1788520698036.jpg';
import {
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Phone,
  ShieldCheck,
  FileCheck,
  Users,
  Compass,
  Sparkles,
  ChevronRight,
  BookOpen,
  MapPin,
  Clock,
  HelpCircle,
  ChevronDown,
  Check,
  Send,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute, category?: ServiceCategory, serviceSlug?: string) => void;
  onOpenEnquiry: (serviceName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenEnquiry }) => {
  const [activeStep, setActiveStep] = useState(2); // In-progress stepper preview
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickService, setQuickService] = useState('General Consultation');
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [faqExpanded, setFaqExpanded] = useState<string | null>(FAQS_DATA[0].id);

  const popularServices = getPopularServices();

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim() || quickPhone.length < 10) return;
    setQuickSubmitted(true);
  };

  const statusSteps = [
    { label: 'Enquiry Received', status: 'completed' },
    { label: 'Documents Verified', status: 'completed' },
    { label: 'Application Assistance', status: 'active' },
    { label: 'Portal Processing', status: 'pending' },
    { label: 'Completed & Delivered', status: 'pending' },
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
        {/* Subtle geometric background accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content (lg:col-span-7) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>DOCUMENTATION • GOVERNMENT • BUSINESS • FINANCE</span>
              </div>

              {/* Main Headline with HeroTypewriter */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b5c] tracking-tight leading-[1.2] font-display min-h-[5.6rem] sm:min-h-[4.8rem] lg:min-h-[7.2rem]">
                Get Your Important Work Done — <br className="hidden sm:inline" />
                With the <HeroTypewriter />
              </h1>

              {/* Subheadline description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                From government applications and certificates to GST, ITR, business registrations and financial assistance, Safehands helps simplify everyday documentation and service processes in Panvel, Vadghar, Pushpak, and nearby areas.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onOpenEnquiry()}
                  id="hero-primary-cta"
                  className="px-6 py-3.5 rounded-xl bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Get Service Assistance</span>
                </button>

                <a
                  href="https://wa.me/917666040771?text=Hello%20Safehands%20Enterprises,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-whatsapp-cta"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Four Trust Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-slate-700 border-t border-slate-200/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Trusted Assistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Clear Guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>Secure Handling</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Customer Focused</span>
                </div>
              </div>
            </motion.div>

            {/* Right Visual (lg:col-span-5) — Interactive Service Request Tracker with Consultation photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
                {/* Image Header */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={heroPhoto}
                    alt="Safehands Consultation Desk in Panvel"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                        Live File Preparation
                      </div>
                      <div className="text-sm font-bold">Client Coordination Portal</div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/90 text-white font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                      Active Desk
                    </span>
                  </div>
                </div>

                {/* Interactive Status Steps Card (From Reference Screenshot) */}
                <div className="p-5 bg-white space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Your Service Request Flow
                    </span>
                    <span className="text-[11px] text-blue-700 font-semibold">
                      Step-by-step
                    </span>
                  </div>

                  <div className="space-y-3">
                    {statusSteps.map((step, idx) => {
                      const isDone = idx < activeStep;
                      const isCurrent = idx === activeStep;

                      return (
                        <div
                          key={idx}
                          onClick={() => setActiveStep(idx)}
                          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                            isCurrent
                              ? 'bg-blue-50/80 border border-blue-200 font-bold text-blue-900'
                              : isDone
                              ? 'text-slate-700 hover:bg-slate-50'
                              : 'text-slate-400 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {isDone ? (
                              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            ) : isCurrent ? (
                              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 animate-pulse">
                                <span className="text-[10px] font-bold">{idx + 1}</span>
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center flex-shrink-0">
                                <span className="text-[10px]">{idx + 1}</span>
                              </div>
                            )}
                            <span>{step.label}</span>
                          </div>

                          <span className="text-[10px] uppercase font-bold">
                            {isDone ? 'Verified' : isCurrent ? 'In Progress' : 'Upcoming'}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Help Card bottom bar */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Phone className="w-3.5 h-3.5 text-blue-600" />
                      <span>Need quick help?</span>
                    </div>
                    <a
                      href="tel:+917666040771"
                      className="font-bold text-blue-700 hover:underline"
                    >
                      Call 7666040771
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Safehands Continuous Services & Coverage Marquee */}
      <ServiceTicker />

      {/* 2. SERVICE CATEGORIES ("What Do You Need Help With?") */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto space-y-2 mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              What Do You Need Help With?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Choose a service category and get the right information, documents and assistance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES_DATA.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                onClick={() => onNavigate('category', cat.id)}
                className="group relative p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${cat.colorScheme.bg} ${cat.colorScheme.text} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <ServiceIcon name={cat.iconName} className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {cat.name}
                  </h3>

                  <div className="text-xs font-semibold text-emerald-700 mt-1 mb-2">
                    {cat.tagline}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700 group-hover:text-blue-800">
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. POPULAR SERVICES GRID */}
      <section className="py-16 bg-slate-50/60 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Frequent Inquiries
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                Our Most Popular Services
              </h2>
              <p className="text-sm text-slate-600">
                Direct assistance with daily government, business, and financial processes.
              </p>
            </div>

            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-50 border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm transition-all hover:shadow self-start md:self-auto active:scale-95"
            >
              <span>View All 25+ Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <ServiceCard
                  service={service}
                  onViewDetails={(slug) => onNavigate('service-detail', undefined, slug)}
                  onEnquire={(name) => onOpenEnquiry(name)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY PEOPLE CHOOSE SAFEHANDS */}
      <section className="py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: The 6 Pillars (lg:col-span-7) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Our Service Commitment
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                  Why People Choose Safehands
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  We bridge the gap between complex government portals, bank paperwork, and everyday citizens with reliable, friendly, and transparent assistance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5 group">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <ServiceIcon name="Building2" className="w-4 h-4" />
                    </div>
                    <span>One Place for Many Needs</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-10 leading-relaxed">
                    Government, documentation, business registrations and financial assistance under one roof.
                  </p>
                </div>

                <div className="space-y-1.5 group">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Compass className="w-4 h-4" />
                    </div>
                    <span>Clear Guidance</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-10 leading-relaxed">
                    Understand what is required, the step-by-step process, and next steps clearly without confusing jargon.
                  </p>
                </div>

                <div className="space-y-1.5 group">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <span>Document Focused Support</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-10 leading-relaxed">
                    We help review documentation beforehand to reduce mistakes and avoid portal rejections.
                  </p>
                </div>

                <div className="space-y-1.5 group">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span>Easy Communication</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-10 leading-relaxed">
                    Call or connect with our Panvel office through WhatsApp for quick queries and updates.
                  </p>
                </div>

                <div className="space-y-1.5 group">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span>Local &amp; Convenient</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-10 leading-relaxed">
                    Conveniently located at Hari Vithal Complex, Sector R3, Pushpak Old Panvel with easy local access.
                  </p>
                </div>

                <div className="space-y-1.5 group">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                      <Users className="w-4 h-4" />
                    </div>
                    <span>Customer-First Approach</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-10 leading-relaxed">
                    We focus on your convenience and provide transparent communication regarding timelines.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Office Photo + Genuine Factual Milestones (lg:col-span-5) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="group rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src={officePhoto}
                  alt="Safehands Team Consultation in Panvel"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Factual Highlights Banner */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="p-3 bg-white rounded-lg border border-slate-200/60 text-center hover:border-blue-300 transition-colors">
                  <div className="text-2xl font-black text-[#0f2b5c] font-display">25+</div>
                  <div className="text-[11px] font-semibold text-slate-600 mt-0.5">Services Handled</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200/60 text-center hover:border-emerald-300 transition-colors">
                  <div className="text-2xl font-black text-emerald-700 font-display">6</div>
                  <div className="text-[11px] font-semibold text-slate-600 mt-0.5">Specialized Verticals</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200/60 text-center hover:border-blue-300 transition-colors">
                  <div className="text-base font-extrabold text-blue-800 leading-tight">Panvel &amp; Raigad</div>
                  <div className="text-[11px] font-semibold text-slate-600 mt-0.5">Local Presence</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200/60 text-center hover:border-indigo-300 transition-colors">
                  <div className="text-base font-extrabold text-indigo-800 leading-tight">WhatsApp / Walk-in</div>
                  <div className="text-[11px] font-semibold text-slate-600 mt-0.5">Instant Support</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (5-STEP PROCESS) */}
      <section className="py-16 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto space-y-2 mb-14"
          >
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Simple &amp; Organized Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
              How It Works
            </h2>
            <p className="text-sm text-slate-300">
              A clear process to get your paperwork and applications completed without confusion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: '01',
                title: 'Choose Service',
                desc: 'Select the service you need assistance with from our catalog or discuss your requirement with us.',
                icon: 'FileText',
              },
              {
                step: '02',
                title: 'Share Details',
                desc: 'Send your basic details via form, WhatsApp, or drop by our office at Hari Vithal Complex.',
                icon: 'MessageCircle',
              },
              {
                step: '03',
                title: 'Document Check',
                desc: 'We review your documents thoroughly to check validity and prevent portal rejection errors.',
                icon: 'FileCheck',
              },
              {
                step: '04',
                title: 'Assistance',
                desc: 'We assist you through the application filing, appointment booking, or banking file compilation.',
                icon: 'Sparkles',
              },
              {
                step: '05',
                title: 'Completion',
                desc: 'Receive confirmation, acknowledgement receipts, and status updates directly on WhatsApp.',
                icon: 'CheckCircle2',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between hover:bg-slate-800 transition-colors group hover:border-slate-600"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-amber-400 tracking-widest bg-slate-700/80 px-2.5 py-1 rounded-md">
                      {item.step}
                    </span>
                    <ServiceIcon name={item.icon} className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('how-it-works')}
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Learn more about documentation requirements &amp; timelines</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. LEAD CAPTURE ENQUIRY BAR ("Not Sure What You Need?") */}
      <section className="py-10 bg-[#0f2b5c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-8"
          >
            <div className="max-w-3xl mx-auto text-center space-y-2 mb-6">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display">
                Not Sure What You Need?
              </h3>
              <p className="text-xs sm:text-sm text-blue-100">
                Tell us what you&apos;re trying to get done. We&apos;ll guide you toward the right service and required documents.
              </p>
            </div>

            {quickSubmitted ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-center space-y-2 max-w-lg mx-auto">
                <div className="text-sm font-bold text-emerald-300">
                  Thank You! We have received your request.
                </div>
                <p className="text-xs text-slate-200">
                  We will call you shortly at <strong>{quickPhone}</strong>.
                </p>
                <a
                  href={`https://wa.me/917666040771?text=${encodeURIComponent(`Hello Safehands, I sent a consultation request for ${quickService}. Name: ${quickName}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Continue on WhatsApp</span>
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleQuickSubmit}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 max-w-4xl mx-auto items-center"
              >
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="sm:col-span-3">
                  <input
                    type="tel"
                    required
                    placeholder="10-Digit Mobile"
                    maxLength={10}
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="sm:col-span-3">
                  <select
                    value={quickService}
                    onChange={(e) => setQuickService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="General Consultation">What do you need help with?</option>
                    <option value="GST & Taxes">GST &amp; Taxes</option>
                    <option value="MSME Udyam">MSME Udyam Certificate</option>
                    <option value="Passport Assistance">Passport Assistance</option>
                    <option value="PAN / Aadhaar Update">PAN / Aadhaar Update</option>
                    <option value="Domicile / Income Certificate">Domicile / Income Certificate</option>
                    <option value="Home / Personal Loan">Home / Personal Loan</option>
                    <option value="Food Licence (FSSAI)">Food Licence (FSSAI)</option>
                    <option value="Railway Ticket / Xerox">Railway Ticket / Xerox</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5 active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Talk to Safehands</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* 7. CLIENT EXPERIENCES / TESTIMONIALS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto space-y-2 mb-12"
          >
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Community Trust
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Real Experiences from Our Valued Clients
            </h2>
            <p className="text-sm text-slate-600">
              Feedback from individuals and business owners across Panvel, Karanjade, and Pushpak.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLIENT_EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3 text-xs">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
                    &quot;{exp.comment}&quot;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{exp.clientName}</div>
                    <div className="text-[11px] text-slate-500">{exp.locality}</div>
                  </div>
                  <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                    {exp.serviceUsed}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RESOURCES & GUIDES PREVIEW */}
      <section className="py-16 bg-slate-50/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
          >
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Helpful Articles
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                Documentation &amp; Filing Guides
              </h2>
              <p className="text-sm text-slate-600">
                Read our straightforward guides before submitting your applications.
              </p>
            </div>

            <button
              onClick={() => onNavigate('resources')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline"
            >
              <span>View All Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCES_DATA.slice(0, 3).map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => onNavigate('resource-detail', undefined, article.slug)}
                className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-3">
                    <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION PREVIEW */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2 mb-10"
          >
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Common Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600">
              Clear answers regarding document requirements, timelines, and office visits.
            </p>
          </motion.div>

          <div className="space-y-3">
            {FAQS_DATA.slice(0, 5).map((faq) => {
              const isExpanded = faqExpanded === faq.id;

              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-slate-200/90 overflow-hidden bg-white transition-colors"
                >
                  <button
                    onClick={() => setFaqExpanded(isExpanded ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-slate-800 hover:text-blue-700 gap-4"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                        isExpanded ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('faq')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline"
            >
              <span>View all frequently asked questions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 10. FINAL BOTTOM CTA BANNER */}
      <section className="py-14 bg-gradient-to-r from-[#0f2b5c] to-[#1e3a8a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto space-y-2"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display">
              Ready to Get Your Important Work Handled?
            </h2>
            <p className="text-sm sm:text-base text-blue-100">
              Visit our Panvel office or reach out on WhatsApp to get your paperwork started today.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenEnquiry()}
              className="px-6 py-3.5 rounded-xl bg-white text-[#0f2b5c] hover:bg-slate-100 font-bold text-sm shadow-md transition-all active:scale-98"
            >
              Request Consultation Call
            </button>
            <a
              href="https://wa.me/917666040771?text=Hello%20Safehands%20Enterprises"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow transition-all flex items-center gap-2 active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp: 7666040771</span>
            </a>
          </div>

          <div className="text-xs text-slate-300 pt-2 flex items-center justify-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Shop No. 4, Plot No. 284, Hari Vithal Complex, Sector R3, Pushpak Old Panvel</span>
          </div>
        </div>
      </section>
    </div>
  );
};
