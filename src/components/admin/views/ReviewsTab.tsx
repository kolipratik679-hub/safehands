import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { useData } from '../../../context/DataContext';
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  X,
  RefreshCw,
  Eye,
  EyeOff,
  ShieldCheck
} from 'lucide-react';

export const ReviewsTab: React.FC = () => {
  const { apiFetch } = useAdminAuth();
  const { refreshData } = useData();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [authorName, setAuthorName] = useState('');
  const [platform, setPlatform] = useState('Google');
  const [rating, setRating] = useState(5.0);
  const [reviewText, setReviewText] = useState('');
  const [dateDisplay, setDateDisplay] = useState('');
  const [verified, setVerified] = useState(true);
  const [isPublished, setIsPublished] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/admin/reviews');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setReviews(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setAuthorName('');
    setPlatform('Google');
    setRating(5.0);
    setReviewText('');
    setDateDisplay(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
    setVerified(true);
    setIsPublished(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setAuthorName(item.author_name || item.authorName || '');
    setPlatform(item.platform || 'Google');
    setRating(Number(item.rating) || 5.0);
    setReviewText(item.review_text || item.reviewText || '');
    setDateDisplay(item.date_display || item.dateDisplay || '');
    setVerified(item.verified !== undefined ? Boolean(item.verified) : true);
    setIsPublished(item.is_published !== undefined ? Boolean(item.is_published) : true);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      author_name: authorName.trim(),
      platform: platform.trim(),
      rating: Number(rating),
      review_text: reviewText.trim(),
      date_display: dateDisplay.trim(),
      verified: verified ? 1 : 0,
      is_published: isPublished ? 1 : 0
    };

    try {
      if (editingItem) {
        await apiFetch(`/api/admin/reviews/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await apiFetch('/api/admin/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      await fetchReviews();
      await refreshData();
      setModalOpen(false);
    } catch (err) {
      console.error('Failed to save review', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiFetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
      await fetchReviews();
      await refreshData();
      setDeleteId(null);
    } catch (err) {
      console.error('Failed to delete review', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight font-serif">
            Google & Customer Ratings
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Public feedback badges reinforcing trust for Panvel documentation services
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchReviews}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Review</span>
          </button>
        </div>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <RefreshCw className="w-7 h-7 animate-spin text-blue-500 mb-2" />
          <span className="text-xs">Loading customer reviews...</span>
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white">
                        {r.author_name || r.authorName}
                      </h4>
                      {r.verified && (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-0.5" title="Verified Customer">
                          <ShieldCheck className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">
                      Platform: <span className="text-slate-200 font-medium">{r.platform}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-amber-300">{Number(r.rating).toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
                  "{r.review_text || r.reviewText}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">{r.date_display || r.dateDisplay}</span>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      r.is_published === 0
                        ? 'bg-slate-800 text-slate-400 border-slate-700'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {r.is_published === 0 ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
                    {r.is_published === 0 ? 'Hidden' : 'Live'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(r)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(r.id)}
                    className="p-1.5 bg-slate-800 hover:bg-red-600/30 text-slate-400 hover:text-red-300 rounded-lg border border-slate-700 transition cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-slate-500 text-sm">
          No reviews found in database. Click "Add Review" to create one.
        </div>
      )}

      {/* Add / Edit Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h3 className="text-base font-bold text-white font-serif">
                {editingItem ? 'Edit Review' : 'Add New Customer Review'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Author / Reviewer
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g., Mahesh Kadam"
                    className="mt-1 w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Review Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="mt-1 w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Google">Google Maps</option>
                    <option value="JustDial">JustDial</option>
                    <option value="Direct Client">Direct Office Walk-in</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Review Text
                </label>
                <textarea
                  rows={4}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Review content..."
                  className="mt-1 w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Rating (Score)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="mt-1 w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value={5.0}>5.0 Stars (Excellent)</option>
                    <option value={4.8}>4.8 Stars</option>
                    <option value={4.5}>4.5 Stars</option>
                    <option value={4.0}>4.0 Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Date Label
                  </label>
                  <input
                    type="text"
                    value={dateDisplay}
                    onChange={(e) => setDateDisplay(e.target.value)}
                    placeholder="e.g., September 2026"
                    className="mt-1 w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verified}
                    onChange={(e) => setVerified(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-200">Verified Client</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-200">Publish on Website</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <h4 className="text-sm font-bold text-white">Delete Review?</h4>
            <p className="text-xs text-slate-400">
              Are you sure you want to remove this review from the database?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-500 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
