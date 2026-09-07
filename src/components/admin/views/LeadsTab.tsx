import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  FileText,
  Download,
  Trash2,
  CheckCircle2,
  X,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Edit,
  Save
} from 'lucide-react';

interface LeadsTabProps {
  initialLeadId?: number | null;
  onClearInitialLead?: () => void;
}

export const LeadsTab: React.FC<LeadsTabProps> = ({ initialLeadId, onClearInitialLead }) => {
  const { apiFetch } = useAdminAuth();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesStatus, setNotesStatus] = useState<string>('');
  const [notesText, setNotesText] = useState<string>('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await apiFetch(`/api/admin/leads?status=${statusFilter}&search=${encodeURIComponent(searchTerm)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setLeads(data.data);

          // If initial lead ID was passed from Overview, open it
          if (initialLeadId) {
            const found = data.data.find((l: any) => l.id === initialLeadId);
            if (found) {
              handleOpenLead(found);
            }
            if (onClearInitialLead) onClearInitialLead();
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch leads', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleOpenLead = (lead: any) => {
    setSelectedLead(lead);
    setNotesStatus(lead.status || 'new');
    setNotesText(lead.admin_notes || lead.adminNotes || '');
    setActionSuccessMsg(null);
  };

  const handleUpdateLeadStatus = async (leadId: number, newStatus: string) => {
    try {
      const res = await apiFetch(`/api/admin/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setLeads(leads.map(l => (l.id === leadId ? { ...l, status: newStatus } : l)));
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
          setNotesStatus(newStatus);
        }
      }
    } catch (err) {
      console.error('Failed to update lead status', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setSavingNotes(true);
    try {
      const res = await apiFetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: notesStatus,
          admin_notes: notesText
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionSuccessMsg('Lead details updated successfully!');
        setLeads(leads.map(l => (l.id === selectedLead.id ? { ...l, status: notesStatus, admin_notes: notesText } : l)));
        setSelectedLead({ ...selectedLead, status: notesStatus, admin_notes: notesText });
        setTimeout(() => setActionSuccessMsg(null), 2500);
      }
    } catch (err) {
      console.error('Failed to save notes', err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDeleteLead = async (leadId: number) => {
    try {
      const res = await apiFetch(`/api/admin/leads/${leadId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== leadId));
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(null);
        }
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error('Failed to delete lead', err);
    }
  };

  // WhatsApp click handler
  const getWhatsAppLink = (phone: string, name: string, service: string) => {
    const cleanDigits = phone.replace(/\D/g, '');
    const intlNumber = cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits;
    const msg = encodeURIComponent(
      `Hello ${name}, this is Safehands Enterprises (Panvel). We received your inquiry regarding "${service}". How may we assist you today?`
    );
    return `https://wa.me/${intlNumber}?text=${msg}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight font-serif">
            Client Inquiries & Documentation Leads
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Store, view, update status, and communicate directly with applicants
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchLeads}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <a
            href="/api/admin/leads-export/csv"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 hover:border-blue-500 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </form>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Inquiries' },
            { id: 'new', label: 'New' },
            { id: 'contacted', label: 'Contacted' },
            { id: 'in_progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <RefreshCw className="w-7 h-7 animate-spin text-blue-500 mb-2" />
            <span className="text-xs">Fetching client leads...</span>
          </div>
        ) : leads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Applicant / Date</th>
                  <th className="px-4 py-3.5">Service Requested</th>
                  <th className="px-4 py-3.5">Contact Info</th>
                  <th className="px-4 py-3.5">Locality</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => handleOpenLead(lead)}
                    className="hover:bg-slate-800/40 transition cursor-pointer group"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-sm text-white group-hover:text-blue-400 transition">
                        {lead.name}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>
                          {new Date(lead.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="font-medium text-slate-200 block">{lead.service}</span>
                      {lead.message && (
                        <span className="text-[11px] text-slate-400 block truncate max-w-xs mt-0.5">
                          "{lead.message}"
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="space-y-1">
                        <a
                          href={`tel:${lead.phone}`}
                          className="text-slate-300 hover:text-blue-400 flex items-center gap-1.5 transition font-mono"
                        >
                          <Phone className="w-3 h-3 text-slate-500" />
                          <span>{lead.phone}</span>
                        </a>
                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-slate-400 hover:text-blue-400 flex items-center gap-1.5 transition text-[11px]"
                          >
                            <Mail className="w-3 h-3 text-slate-500" />
                            <span className="truncate max-w-[150px]">{lead.email}</span>
                          </a>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-400 whitespace-nowrap">
                      {lead.locality ? (
                        <div className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{lead.locality}</span>
                        </div>
                      ) : (
                        <span className="text-slate-600">Panvel Region</span>
                      )}
                    </td>

                    <td className="px-4 py-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                        className={`text-[11px] font-semibold rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer ${
                          lead.status === 'new'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : lead.status === 'contacted'
                            ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                            : lead.status === 'in_progress'
                            ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                            : lead.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        <option value="new" className="bg-slate-900 text-white">New</option>
                        <option value="contacted" className="bg-slate-900 text-white">Contacted</option>
                        <option value="in_progress" className="bg-slate-900 text-white">In Progress</option>
                        <option value="completed" className="bg-slate-900 text-white">Completed</option>
                        <option value="cancelled" className="bg-slate-900 text-white">Cancelled</option>
                      </select>
                    </td>

                    <td className="px-5 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={getWhatsAppLink(lead.phone, lead.name, lead.service)}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 bg-emerald-950/60 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg border border-emerald-800/60 transition"
                          title="Chat on WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleOpenLead(lead)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition"
                          title="Open Details & Notes"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(lead.id)}
                          className="p-1.5 bg-slate-800 hover:bg-red-600/30 text-slate-400 hover:text-red-300 rounded-lg border border-slate-700 transition"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center text-slate-500 text-sm">
            No leads found matching your criteria.
          </div>
        )}
      </div>

      {/* Lead Detail & Admin Notes Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-serif">{selectedLead.name}</h3>
                  <span className="text-[10px] font-mono text-slate-500">#{selectedLead.id}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Submitted on {new Date(selectedLead.created_at).toLocaleString('en-IN')} via {selectedLead.source || 'website'}
                </p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              {actionSuccessMsg && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{actionSuccessMsg}</span>
                </div>
              )}

              {/* Client Contact Info & Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Phone Number</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-white font-mono">{selectedLead.phone}</span>
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="p-1 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded transition"
                      title="Call"
                    >
                      <Phone className="w-3 h-3" />
                    </a>
                    <a
                      href={getWhatsAppLink(selectedLead.phone, selectedLead.name, selectedLead.service)}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 bg-emerald-950 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded transition"
                      title="WhatsApp"
                    >
                      <MessageSquare className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Email Address</span>
                  <div className="mt-1">
                    {selectedLead.email ? (
                      <a href={`mailto:${selectedLead.email}`} className="text-xs text-blue-400 hover:underline">
                        {selectedLead.email}
                      </a>
                    ) : (
                      <span className="text-xs text-slate-600">Not provided</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Service Inquiry</span>
                  <span className="text-xs font-medium text-slate-200 mt-1 block">{selectedLead.service}</span>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Locality</span>
                  <span className="text-xs text-slate-300 mt-1 block">{selectedLead.locality || 'Old Panvel Area'}</span>
                </div>
              </div>

              {/* Client Query / Note */}
              {selectedLead.message && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Client's Inquired Message
                  </label>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed">
                    "{selectedLead.message}"
                  </div>
                </div>
              )}

              {/* Status Update */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Update Inquiry Status
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {['new', 'contacted', 'in_progress', 'completed', 'cancelled'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setNotesStatus(st)}
                      className={`py-2 px-2 text-center text-xs font-semibold rounded-xl border transition cursor-pointer capitalize ${
                        notesStatus === st
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Administrative Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Administrative Tracking Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Record client updates, required documents received, Panvel office filing reference number..."
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(selectedLead.id)}
                className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {savingNotes ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h4 className="text-base font-bold text-white">Delete Client Lead #{deleteConfirmId}?</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              This will permanently delete this client inquiry from the database. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteLead(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl hover:bg-red-500 cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
