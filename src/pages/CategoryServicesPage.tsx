import React from 'react';
import { CATEGORIES_DATA, getServicesByCategory } from '../data/servicesData';
import { PageRoute, ServiceCategory } from '../types';
import { ServiceCard } from '../components/ServiceCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceIcon } from '../components/ServiceIcon';
import { ArrowRight, Sparkles, MessageCircle, Phone, CheckCircle } from 'lucide-react';

interface CategoryServicesPageProps {
  category: ServiceCategory;
  onNavigate: (route: PageRoute, category?: ServiceCategory, serviceSlug?: string) => void;
  onOpenEnquiry: (serviceName?: string) => void;
}

export const CategoryServicesPage: React.FC<CategoryServicesPageProps> = ({
  category,
  onNavigate,
  onOpenEnquiry,
}) => {
  const currentCat = CATEGORIES_DATA.find((c) => c.id === category) || CATEGORIES_DATA[0];
  const services = getServicesByCategory(category);

  return (
    <div className="w-full pb-16 bg-[#fcfdfd]">
      <Breadcrumbs
        items={[
          { label: 'Services', route: 'services' },
          { label: currentCat.name, active: true },
        ]}
        onNavigate={onNavigate}
      />

      {/* Category Hero Banner */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                <ServiceIcon name={currentCat.iconName} className="w-4 h-4 text-blue-600" />
                <span>{currentCat.tagline}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b5c] tracking-tight font-display">
                {currentCat.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {currentCat.description}
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
              <button
                onClick={() => onOpenEnquiry(`${currentCat.name} Consultation`)}
                className="px-5 py-2.5 rounded-xl bg-[#0f2b5c] hover:bg-blue-900 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Consult on {currentCat.shortTitle}</span>
              </button>

              <a
                href={`https://wa.me/917666040771?text=${encodeURIComponent(`Hello Safehands Enterprises, I need help with ${currentCat.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Query</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services List Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              Available Services under {currentCat.name} ({services.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onViewDetails={(slug) => onNavigate('service-detail', undefined, slug)}
                onEnquire={(name) => onOpenEnquiry(name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Other Categories Switcher */}
      <section className="py-12 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">
            Explore Other Service Categories
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORIES_DATA.filter((c) => c.id !== category).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate('category', cat.id)}
                className="p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-sm text-left transition-all group"
              >
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 flex items-center justify-between">
                  <span>{cat.shortTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                  {cat.tagline}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
