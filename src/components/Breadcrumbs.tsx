import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PageRoute } from '../types';

export interface BreadcrumbItem {
  label: string;
  route?: PageRoute;
  category?: any;
  serviceSlug?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (route: PageRoute, category?: any, serviceSlug?: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5 text-xs text-slate-500 font-medium">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 hover:text-blue-700 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
            {item.active || !item.route ? (
              <span className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(item.route!, item.category, item.serviceSlug)}
                className="hover:text-blue-700 transition-colors truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};
