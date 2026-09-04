import React from 'react';
import { ServiceItem } from '../types';
import { ServiceIcon } from './ServiceIcon';
import { ArrowRight, Clock, FileCheck2, MessageCircle } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  onViewDetails: (slug: string) => void;
  onEnquire: (name: string) => void;
  variant?: 'standard' | 'compact' | 'featured';
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onViewDetails,
  onEnquire,
  variant = 'standard',
}) => {
  return (
    <div
      className={`group relative bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        variant === 'featured' ? 'p-6 ring-1 ring-blue-50' : 'p-5'
      }`}
    >
      {/* Top row: Icon & Badges */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 flex-shrink-0">
            <ServiceIcon name={service.iconName} className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {service.popular && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                Popular
              </span>
            )}
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full truncate max-w-[130px]">
              {service.categoryName}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <h3
          onClick={() => onViewDetails(service.slug)}
          className="text-base font-bold text-slate-900 group-hover:text-blue-700 cursor-pointer transition-colors leading-snug"
        >
          {service.name}
        </h3>

        <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
          {service.shortDescription}
        </p>

        {/* Key Features Pill */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate max-w-[140px]">{service.turnaroundTime}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{service.requiredDocuments.length} Docs Check</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onViewDetails(service.slug)}
          className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={() => onEnquire(service.name)}
          className="py-2 px-3 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center gap-1"
          title={`Enquire for ${service.name}`}
        >
          <span>Enquire</span>
        </button>

        <a
          href={`https://wa.me/917666040771?text=${encodeURIComponent(`Hello Safehands Enterprises, I need assistance with ${service.name}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
          title="Ask on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-emerald-600" />
        </a>
      </div>
    </div>
  );
};
