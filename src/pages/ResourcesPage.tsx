import React, { useState, useMemo } from 'react';
import { RESOURCES_DATA } from '../data/resourcesData';
import { PageRoute, ResourceArticle } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import {
  BookOpen,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Share2,
  Phone,
} from 'lucide-react';

interface ResourcesPageProps {
  selectedSlug?: string;
  onNavigate: (route: PageRoute, category?: any, serviceSlug?: string) => void;
  onOpenEnquiry: (serviceName?: string) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  selectedSlug,
  onNavigate,
  onOpenEnquiry,
}) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(selectedSlug || null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const currentArticle = useMemo(() => {
    if (!activeSlug) return null;
    return RESOURCES_DATA.find((r) => r.slug === activeSlug) || null;
  }, [activeSlug]);

  const categories = useMemo(() => {
    return Array.from(new Set(RESOURCES_DATA.map((r) => r.category)));
  }, []);

  const filteredArticles = useMemo(() => {
    if (selectedFilter === 'all') return RESOURCES_DATA;
    return RESOURCES_DATA.filter((r) => r.category === selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="w-full pb-16 bg-[#fcfdfd]">
      <Breadcrumbs
        items={
          currentArticle
            ? [
                { label: 'Resources & Guides', route: 'resources' },
                { label: currentArticle.title, active: true },
              ]
            : [{ label: 'Resources & Guides', active: true }]
        }
        onNavigate={(route) => {
          setActiveSlug(null);
          onNavigate(route);
        }}
      />

      {currentArticle ? (
        /* Full Article Detail Reader View */
        <article className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <button
              onClick={() => setActiveSlug(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline mb-6"
            >
              &larr; Back to All Guides
            </button>

            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-3 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-md">
                    {currentArticle.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {currentArticle.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {currentArticle.publishedDate}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b5c] tracking-tight font-display">
                  {currentArticle.title}
                </h1>

                <p className="text-sm text-slate-600 italic">
                  {currentArticle.summary}
                </p>
              </div>

              {/* Checklist Box */}
              {currentArticle.checklist && currentArticle.checklist.length > 0 && (
                <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
                  <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Essential Checklist for This Process:</span>
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {currentArticle.checklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article Paragraphs */}
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed pt-2">
                {currentArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Article Footer CTA */}
              <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Need assistance with this process?
                  </div>
                  <div className="text-xs text-slate-500">
                    Safehands Enterprises is here to review your documents.
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenEnquiry(currentArticle.title)}
                    className="px-4 py-2 rounded-xl bg-[#0f2b5c] hover:bg-blue-900 text-white text-xs font-bold transition-all"
                  >
                    Consult With Us
                  </button>
                  <a
                    href={`https://wa.me/917666040771?text=${encodeURIComponent(`Hello Safehands, I read your guide on "${currentArticle.title}" and would like assistance.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                    title="Chat on WhatsApp"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-white text-white" />
                    <span>WhatsApp Query</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      ) : (
        /* Guides Catalog View */
        <>
          <section className="py-12 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Knowledge &amp; Procedural Guides
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b5c] tracking-tight font-display">
                  Documentation Checklists &amp; Filing Guides
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Practical, jargon-free guides to help citizens and businesses in Panvel prepare valid document dossiers before applying for government schemes, taxes, and bank loans.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                    selectedFilter === 'all'
                      ? 'bg-[#0f2b5c] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Topics ({RESOURCES_DATA.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                      selectedFilter === cat
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Guides Grid */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setActiveSlug(article.slug)}
                    className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                        <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {article.category}
                        </span>
                        <span>{article.readTime}</span>
                      </div>

                      <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug mb-2">
                        {article.title}
                      </h2>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>

                      {article.checklist && (
                        <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Includes {article.checklist.length}-point Checklist</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
