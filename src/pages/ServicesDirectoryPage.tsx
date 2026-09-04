import React, { useState, useMemo } from 'react';
import { ALL_SERVICES_DATA, CATEGORIES_DATA } from '../data/servicesData';
import { PageRoute, ServiceCategory } from '../types';
import { ServiceCard } from '../components/ServiceCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Search, Filter, Sparkles, CheckCircle2 } from 'lucide-react';

interface ServicesDirectoryPageProps {
  onNavigate: (route: PageRoute, category?: ServiceCategory, serviceSlug?: string) => void;
  onOpenEnquiry: (serviceName?: string) => void;
}

export const ServicesDirectoryPage: React.FC<ServicesDirectoryPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return ALL_SERVICES_DATA.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.requiredDocuments.some((d) =>
          d.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full pb-16 bg-[#fcfdfd]">
      <Breadcrumbs
        items={[{ label: 'All Services', active: true }]}
        onNavigate={onNavigate}
      />

      {/* Page Header */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Comprehensive Service Directory
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b5c] tracking-tight font-display">
              All 25+ Documentation, Tax &amp; Financial Services
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore our complete range of government portal filings, business certifications, loan liaison support, and utility printing services in Panvel and Raigad.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="mt-8 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services or required documents..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm text-slate-800 bg-white shadow-sm"
              />
            </div>

            {/* Total count badge */}
            <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 self-end md:self-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Showing {filteredServices.length} of {ALL_SERVICES_DATA.length} Services</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-5 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#0f2b5c] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Services ({ALL_SERVICES_DATA.length})
            </button>
            {CATEGORIES_DATA.map((cat) => {
              const count = ALL_SERVICES_DATA.filter((s) => s.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat.shortTitle}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filteredServices.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <p className="text-base font-semibold text-slate-700">
                No services matched your query &quot;{searchQuery}&quot;.
              </p>
              <p className="text-xs text-slate-500">
                Try searching for a different keyword or browse all categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-bold text-blue-700 underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onViewDetails={(slug) => onNavigate('service-detail', undefined, slug)}
                  onEnquire={(name) => onOpenEnquiry(name)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
