import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  Shield,
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  Star,
  PhoneCall,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Database,
  ChevronRight,
  Download
} from 'lucide-react';

import { OverviewTab } from './views/OverviewTab';
import { ServicesTab } from './views/ServicesTab';
import { LeadsTab } from './views/LeadsTab';
import { TestimonialsTab } from './views/TestimonialsTab';
import { ReviewsTab } from './views/ReviewsTab';
import { ContactTab } from './views/ContactTab';
import { SettingsTab } from './views/SettingsTab';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

type AdminTab = 'overview' | 'services' | 'leads' | 'testimonials' | 'reviews' | 'contact' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const { user, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);

  const navItems: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'services', label: 'Services & Catalog', icon: Briefcase },
    { id: 'leads', label: 'Client Inquiries / Leads', icon: Users },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'reviews', label: 'Customer Reviews', icon: Star },
    { id: 'contact', label: 'Contact & Office Details', icon: PhoneCall },
    { id: 'settings', label: 'Database & Settings', icon: Settings }
  ];

  const handleSelectLeadFromOverview = (leadId: number) => {
    setSelectedLeadId(leadId);
    setActiveTab('leads');
  };

  const getTabTitle = (tab: AdminTab) => {
    switch (tab) {
      case 'overview':
        return 'Operations Dashboard';
      case 'services':
        return 'Services Management';
      case 'leads':
        return 'Client Inquiries & Leads';
      case 'testimonials':
        return 'Client Testimonials';
      case 'reviews':
        return 'Ratings & Reviews';
      case 'contact':
        return 'Office Contact Information';
      case 'settings':
        return 'Database & Hostinger Settings';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-sm text-white font-serif">Safehands Admin</span>
            <span className="block text-[10px] text-slate-400">Panvel Operations</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToSite}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            title="View Website"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900/95 lg:bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 border border-blue-400/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-sm text-white font-serif tracking-tight">
                  Safehands
                </h1>
                <span className="text-[11px] text-slate-400 tracking-wider uppercase font-semibold">
                  Admin Portal
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400 transition'}`} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Hostinger Ready Badge + Admin Profile */}
        <div className="p-3 border-t border-slate-800 space-y-3">
          {/* Quick Hostinger Download shortcut */}
          <a
            href="/safehands.sql"
            download="safehands.sql"
            className="flex items-center justify-between p-2.5 bg-slate-950/70 hover:bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300 hover:text-white transition group"
          >
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono">safehands.sql</span>
            </div>
            <Download className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
          </a>

          {/* User Profile and Logout */}
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <span className="block text-xs font-semibold text-white truncate">
                {user?.email || 'safehands@gmail.com'}
              </span>
              <span className="block text-[10px] text-emerald-400 font-medium">
                Super Administrator
              </span>
            </div>
            <button
              onClick={() => logout()}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition cursor-pointer"
              title="Logout of admin session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Desktop Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-slate-900/60 border-b border-slate-800 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Safehands Enterprises</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Admin</span>
            <span className="text-slate-600">/</span>
            <span className="font-semibold text-white">{getTabTitle(activeTab)}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </button>
          </div>
        </header>

        {/* Tab View Container */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewTab
              onNavigateTab={(tab) => setActiveTab(tab as AdminTab)}
              onSelectLead={handleSelectLeadFromOverview}
            />
          )}

          {activeTab === 'services' && <ServicesTab />}

          {activeTab === 'leads' && (
            <LeadsTab
              initialLeadId={selectedLeadId}
              onClearInitialLead={() => setSelectedLeadId(null)}
            />
          )}

          {activeTab === 'testimonials' && <TestimonialsTab />}

          {activeTab === 'reviews' && <ReviewsTab />}

          {activeTab === 'contact' && <ContactTab />}

          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>
    </div>
  );
};
