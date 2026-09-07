import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Users,
  Briefcase,
  MessageSquare,
  Star,
  Database,
  ArrowUpRight,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

interface OverviewTabProps {
  onNavigateTab: (tab: string) => void;
  onSelectLead: (leadId: number) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab, onSelectLead }) => {
  const { apiFetch } = useAdminAuth();
  const [stats, setStats] = useState<any>(null);
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOverviewData = async () => {
    try {
      setRefreshing(true);
      const [statsRes, dbRes] = await Promise.all([
        apiFetch('/api/admin/stats'),
        apiFetch('/api/admin/settings/status')
      ]);

      if (statsRes.ok) {
        const data = await statsRes.json();
        if (data.success) setStats(data.data);
      }

      if (dbRes.ok) {
        const data = await dbRes.json();
        if (data.success) setDbStatus(data.data);
      }
    } catch (err) {
      console.error('Failed to load overview data', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mb-3" />
        <p className="text-sm">Loading Safehands Enterprises Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight font-serif">
            Operations & Inquiries Overview
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time synchronization with Safehands database & Panvel office portal
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchOverviewData}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
          <a
            href="/safehands.sql"
            download="safehands.sql"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-sm transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download safehands.sql</span>
          </a>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Leads */}
        <div
          onClick={() => onNavigateTab('leads')}
          className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Leads</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-105 transition">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{stats?.totalLeads ?? 0}</span>
            <span className="text-xs text-blue-400 font-medium flex items-center">
              All inquiries <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* New Leads (Action needed) */}
        <div
          onClick={() => onNavigateTab('leads')}
          className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">New Inquiries</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-105 transition">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-amber-300">{stats?.newLeads ?? 0}</span>
            <span className="text-xs text-amber-400/80 font-medium">Pending response</span>
          </div>
        </div>

        {/* Active Services */}
        <div
          onClick={() => onNavigateTab('services')}
          className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Catalog</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{stats?.activeServices ?? 24}</span>
            <span className="text-xs text-emerald-400 font-medium">Active services</span>
          </div>
        </div>

        {/* Testimonials */}
        <div
          onClick={() => onNavigateTab('testimonials')}
          className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Testimonials</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-105 transition">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{stats?.totalTestimonials ?? 0}</span>
            <span className="text-xs text-purple-400 font-medium">Published</span>
          </div>
        </div>

        {/* Reviews & Ratings */}
        <div
          onClick={() => onNavigateTab('reviews')}
          className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Rating</span>
            <div className="w-9 h-9 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center group-hover:scale-105 transition">
              <Star className="w-4 h-4 fill-yellow-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{stats?.averageRating ?? '4.9'}</span>
            <span className="text-xs text-yellow-400 font-medium">/ 5.0 (Google)</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Leads + Database Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 bg-slate-900/80 rounded-2xl border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">Recent Client Inquiries</h3>
              <p className="text-xs text-slate-400">Latest submissions directly from website forms</p>
            </div>
            <button
              onClick={() => onNavigateTab('leads')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
            >
              View All Leads <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {stats?.recentLeads && stats.recentLeads.length > 0 ? (
            <div className="divide-y divide-slate-800/80">
              {stats.recentLeads.map((lead: any) => (
                <div
                  key={lead.id}
                  onClick={() => onSelectLead(lead.id)}
                  className="py-3.5 px-3 -mx-3 rounded-xl hover:bg-slate-800/50 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white group-hover:text-blue-400 transition">
                        {lead.name}
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          lead.status === 'new'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : lead.status === 'contacted'
                            ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                            : lead.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="text-slate-300 font-medium">{lead.service}</span>
                      {lead.locality && <span>• {lead.locality}</span>}
                      <span>• {new Date(lead.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`tel:${lead.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 bg-slate-800 hover:bg-blue-600/30 text-slate-300 hover:text-blue-300 rounded-lg border border-slate-700 transition"
                      title="Call client"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 bg-slate-800 hover:bg-blue-600/30 text-slate-300 hover:text-blue-300 rounded-lg border border-slate-700 transition"
                        title="Email client"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <span className="text-xs text-blue-400 font-medium px-2 py-1 rounded bg-slate-800 border border-slate-700 group-hover:border-blue-500/50">
                      Manage →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-slate-500 text-sm">
              No inquiries recorded yet. Form submissions will appear here instantly.
            </div>
          )}
        </div>

        {/* Database & Hostinger Deployment Status */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white">Database & Hostinger Sync</h3>
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                  dbStatus?.isMysql
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${dbStatus?.isMysql ? 'bg-emerald-400' : 'bg-blue-400 animate-pulse'}`} />
                {dbStatus?.isMysql ? 'MySQL Live' : 'Active Engine'}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Engine Driver:</span>
                  <span className="font-semibold text-slate-200">{dbStatus?.driver}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Target DB Host:</span>
                  <span className="font-mono text-slate-300">{dbStatus?.host}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Database Name:</span>
                  <span className="font-mono text-slate-300">{dbStatus?.database}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium block mb-1.5">Synchronized Records:</span>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>• Services: <span className="font-bold text-white">{dbStatus?.tableCounts?.services ?? 24}</span></div>
                  <div>• Leads: <span className="font-bold text-white">{dbStatus?.tableCounts?.leads ?? 0}</span></div>
                  <div>• Testimonials: <span className="font-bold text-white">{dbStatus?.tableCounts?.testimonials ?? 0}</span></div>
                  <div>• Reviews: <span className="font-bold text-white">{dbStatus?.tableCounts?.reviews ?? 0}</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={() => onNavigateTab('settings')}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer"
            >
              <span>View Hostinger Setup Guide</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[11px] text-slate-500 text-center">
              Ready for 1-click import in Hostinger phpMyAdmin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
