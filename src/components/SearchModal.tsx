import React, { useState, useEffect, useRef } from 'react';
import { ALL_SERVICES_DATA, CATEGORIES_DATA } from '../data/servicesData';
import { RESOURCES_DATA } from '../data/resourcesData';
import { ServiceIcon } from './ServiceIcon';
import { ServiceCategory } from '../types';
import { Search, X, ArrowRight, FileText, Sparkles, BookOpen } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (slug: string) => void;
  onSelectCategory: (category: ServiceCategory) => void;
  onSelectResource: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
  onSelectCategory,
  onSelectResource,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const filteredServices = cleanQuery
    ? ALL_SERVICES_DATA.filter(
        (s) =>
          s.name.toLowerCase().includes(cleanQuery) ||
          s.shortDescription.toLowerCase().includes(cleanQuery) ||
          s.categoryName.toLowerCase().includes(cleanQuery) ||
          s.requiredDocuments.some((d) => d.toLowerCase().includes(cleanQuery))
      )
    : ALL_SERVICES_DATA.slice(0, 6);

  const filteredCategories = cleanQuery
    ? CATEGORIES_DATA.filter(
        (c) =>
          c.name.toLowerCase().includes(cleanQuery) ||
          c.description.toLowerCase().includes(cleanQuery)
      )
    : [];

  const filteredResources = cleanQuery
    ? RESOURCES_DATA.filter(
        (r) =>
          r.title.toLowerCase().includes(cleanQuery) ||
          r.summary.toLowerCase().includes(cleanQuery)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services (e.g., GST, Passport, Domicile, Loan, Xerox)..."
            className="w-full text-base bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-4 divide-y divide-slate-100 flex-1">
          {/* Service Categories Matches */}
          {filteredCategories.length > 0 && (
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                Service Categories
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onClose();
                    }}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 text-left transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${cat.colorScheme.bg} ${cat.colorScheme.text}`}>
                      <ServiceIcon name={cat.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{cat.name}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{cat.tagline}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Services Matches */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
              <span>{cleanQuery ? 'Matching Services' : 'Popular Services'}</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {filteredServices.length} found
              </span>
            </div>

            {filteredServices.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm">
                No services found for &quot;{query}&quot;. Try searching for &quot;PAN&quot;, &quot;Loan&quot;, or &quot;Certificate&quot;.
              </div>
            ) : (
              <div className="space-y-1.5">
                {filteredServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      onSelectService(service.slug);
                      onClose();
                    }}
                    className="w-full flex items-start justify-between gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 text-left transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-700 mt-0.5 flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                        <ServiceIcon name={service.iconName} className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors flex items-center gap-2">
                          <span>{service.name}</span>
                          {service.popular && (
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {service.shortDescription}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400 font-medium">
                          <span>{service.categoryName}</span>
                          <span>•</span>
                          <span>{service.turnaroundTime}</span>
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Guides / Resources Matches */}
          {filteredResources.length > 0 && (
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                Helpful Guides &amp; Checklists
              </div>
              <div className="space-y-1.5">
                {filteredResources.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => {
                      onSelectResource(article.slug);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <div className="text-xs font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">
                        {article.title}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                      {article.readTime}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between px-4">
          <span>Search 25+ government, tax, loan &amp; certificate services</span>
          <span className="font-semibold text-blue-700">Safehands Enterprises • Panvel</span>
        </div>
      </div>
    </div>
  );
};
