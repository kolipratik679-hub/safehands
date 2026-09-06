import React, { useState, useMemo } from 'react';
import { FAQS_DATA } from '../data/faqsData';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { ChevronDown, Search, HelpCircle, Phone, Sparkles } from 'lucide-react';

interface FaqPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEnquiry: (serviceName?: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(FAQS_DATA[0].id);

  const categories = useMemo(() => {
    return Array.from(new Set(FAQS_DATA.map((f) => f.category)));
  }, []);

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      const matchesCategory =
        activeCategory === 'all' || faq.category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="w-full pb-16 bg-[#fcfdfd]">
      <Breadcrumbs items={[{ label: 'Frequently Asked Questions', active: true }]} onNavigate={onNavigate} />

      {/* Header */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Answers to Common Questions
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b5c] tracking-tight font-display">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Find clear, straightforward information regarding service turnaround times, required original documents, walk-in consultations, and government procedures.
            </p>
          </div>

          {/* Search Box */}
          <div className="mt-8 max-w-xl relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your question (e.g. turnaround, original docs, loans)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm text-slate-800 bg-white shadow-sm"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="mt-5 flex items-center gap-1.5 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#0f2b5c] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Questions ({FAQS_DATA.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {filteredFaqs.length === 0 ? (
            <div className="p-10 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">
                No answers match &quot;{searchQuery}&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-2 text-xs font-bold text-blue-700 underline"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isExpanded = expandedId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className="rounded-xl border border-slate-200/90 bg-white overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-800 hover:text-blue-700 gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-blue-600 mt-0.5">Q.</span>
                        <span>{faq.question}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                          isExpanded ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 pl-11">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Need More Assistance Box */}
          <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Still have an unanswered question?
              </h3>
              <p className="text-xs text-slate-500">
                Speak directly with our team in Panvel for personalized guidance.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/917666040771?text=Hello%20Safehands,%20I%20have%20a%20question%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-white text-white" />
                <span>Ask on WhatsApp</span>
              </a>

              <button
                onClick={() => onOpenEnquiry()}
                className="px-4 py-2 rounded-xl bg-[#0f2b5c] hover:bg-blue-900 text-white text-xs font-bold transition-all"
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
