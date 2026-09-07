import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { useData } from '../../../context/DataContext';
import {
  Search,
  Filter,
  Edit2,
  CheckCircle,
  X,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  Save,
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

export const ServicesTab: React.FC = () => {
  const { apiFetch } = useAdminAuth();
  const { refreshData } = useData();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingService, setEditingService] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form edit states
  const [formName, setFormName] = useState('');
  const [formTurnaround, setFormTurnaround] = useState('');
  const [formPopular, setFormPopular] = useState(false);
  const [formIsActive, setFormIsActive] = useState(true);
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formFullDesc, setFormFullDesc] = useState('');
  const [formWhoNeeds, setFormWhoNeeds] = useState('');
  const [formImportantNotes, setFormImportantNotes] = useState('');
  const [formDocs, setFormDocs] = useState<string[]>([]);
  const [newDocText, setNewDocText] = useState('');
  const [formSteps, setFormSteps] = useState<string[]>([]);
  const [newStepText, setNewStepText] = useState('');

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/admin/services');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setServices(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to load services', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenEdit = (svc: any) => {
    setEditingService(svc);
    setFormName(svc.name || '');
    setFormTurnaround(svc.turnaround_time || svc.turnaroundTime || '');
    setFormPopular(Boolean(svc.popular));
    setFormIsActive(svc.is_active !== undefined ? Boolean(svc.is_active) : true);
    setFormShortDesc(svc.short_description || svc.shortDescription || '');
    setFormFullDesc(svc.full_description || svc.fullDescription || '');
    setFormWhoNeeds(svc.who_needs_this || svc.whoNeedsThis || '');
    setFormImportantNotes(svc.important_notes || svc.importantNotes || '');

    const docs = Array.isArray(svc.required_documents)
      ? svc.required_documents
      : Array.isArray(svc.requiredDocuments)
      ? svc.requiredDocuments
      : [];
    setFormDocs([...docs]);

    const steps = Array.isArray(svc.process_steps)
      ? svc.process_steps
      : Array.isArray(svc.processSteps)
      ? svc.processSteps
      : [];
    setFormSteps([...steps]);

    setNewDocText('');
    setNewStepText('');
    setErrorMsg(null);
    setSaveSuccess(false);
  };

  const handleAddDoc = () => {
    if (!newDocText.trim()) return;
    setFormDocs([...formDocs, newDocText.trim()]);
    setNewDocText('');
  };

  const handleRemoveDoc = (idx: number) => {
    setFormDocs(formDocs.filter((_, i) => i !== idx));
  };

  const handleAddStep = () => {
    if (!newStepText.trim()) return;
    setFormSteps([...formSteps, newStepText.trim()]);
    setNewStepText('');
  };

  const handleRemoveStep = (idx: number) => {
    setFormSteps(formSteps.filter((_, i) => i !== idx));
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setSaving(true);
    setErrorMsg(null);

    const updates = {
      name: formName.trim(),
      turnaround_time: formTurnaround.trim(),
      popular: formPopular ? 1 : 0,
      is_active: formIsActive ? 1 : 0,
      short_description: formShortDesc.trim(),
      full_description: formFullDesc.trim(),
      who_needs_this: formWhoNeeds.trim(),
      important_notes: formImportantNotes.trim(),
      required_documents: formDocs,
      process_steps: formSteps
    };

    try {
      const res = await apiFetch(`/api/admin/services/${editingService.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update service');
      }

      setSaveSuccess(true);
      await fetchServices();
      await refreshData(); // Sync live public website immediately!

      setTimeout(() => {
        setSaveSuccess(false);
        setEditingService(null);
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error updating service');
    } finally {
      setSaving(false);
    }
  };

  // Filtered list
  const filteredServices = services.filter((s) => {
    const matchSearch =
      (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.short_description || s.shortDescription || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight font-serif">
            Service Catalog & Requirements
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage turnaround times, required documents, descriptions, and popular badges
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300">
            {services.length} Total Services in Database
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service by name or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-950/80 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="government">Government & Citizen Services</option>
            <option value="business-tax">Business & Tax Compliance</option>
            <option value="loans-financial">Loan Coordination & Financial</option>
            <option value="documents-certificates">Documentation & Verification</option>
            <option value="licences-registrations">Licences & Registration</option>
            <option value="printing-utility">Printing & Utility Facilitation</option>
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <RefreshCw className="w-7 h-7 animate-spin text-blue-500 mb-2" />
            <span className="text-xs">Loading services from database...</span>
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Service Name</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Turnaround</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-center">Badge</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredServices.map((svc) => (
                  <tr key={svc.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-5 py-4 font-medium text-white max-w-xs">
                      <div className="font-semibold text-sm text-slate-100">{svc.name}</div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5 max-w-sm">
                        {svc.short_description || svc.shortDescription}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {svc.category_name || svc.categoryName || svc.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{svc.turnaround_time || svc.turnaroundTime}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                          svc.is_active === 0
                            ? 'bg-slate-800 text-slate-400 border-slate-700'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        {svc.is_active === 0 ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        {svc.is_active === 0 ? 'Hidden' : 'Live'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      {svc.popular ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          <Sparkles className="w-3 h-3" /> Popular
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleOpenEdit(svc)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl border border-blue-500/30 transition text-xs font-semibold cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500 text-sm">
            No services matched your query.
          </div>
        )}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div>
                <h3 className="text-base font-bold text-white font-serif">
                  Edit Service: {editingService.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  ID: <span className="font-mono text-slate-300">{editingService.id}</span> | Slug: <span className="font-mono text-slate-300">{editingService.slug}</span>
                </p>
              </div>
              <button
                onClick={() => setEditingService(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveService} className="overflow-y-auto p-6 space-y-5 flex-1">
              {errorMsg && (
                <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {saveSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Service updated and synchronized with live database!</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Service Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="mt-1.5 w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Estimated Turnaround Time
                  </label>
                  <input
                    type="text"
                    required
                    value={formTurnaround}
                    onChange={(e) => setFormTurnaround(e.target.value)}
                    placeholder="e.g., 3-5 Working Days"
                    className="mt-1.5 w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formPopular}
                    onChange={(e) => setFormPopular(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-200">Highlight as Popular Service</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-200">Published on Website</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Short Description (Card Summary)
                </label>
                <textarea
                  rows={2}
                  required
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  className="mt-1.5 w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Full Service Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={formFullDesc}
                  onChange={(e) => setFormFullDesc(e.target.value)}
                  className="mt-1.5 w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Target Audience / Who Needs This
                  </label>
                  <textarea
                    rows={2}
                    value={formWhoNeeds}
                    onChange={(e) => setFormWhoNeeds(e.target.value)}
                    className="mt-1.5 w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Important Notes / Caveats
                  </label>
                  <textarea
                    rows={2}
                    value={formImportantNotes}
                    onChange={(e) => setFormImportantNotes(e.target.value)}
                    className="mt-1.5 w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Required Documents List */}
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Required Documents Checklist ({formDocs.length})
                </label>
                <div className="space-y-2">
                  {formDocs.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-200">
                      <span>• {doc}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDoc(idx)}
                        className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add required document..."
                    value={newDocText}
                    onChange={(e) => setNewDocText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDoc())}
                    className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddDoc}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

              {/* Process Steps */}
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Workflow Steps ({formSteps.length})
                </label>
                <div className="space-y-2">
                  {formSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-200">
                      <span>Step {idx + 1}: {step}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(idx)}
                        className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add process step..."
                    value={newStepText}
                    onChange={(e) => setNewStepText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddStep())}
                    className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Step
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Service Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
