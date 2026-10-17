import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  User, 
  X,
  Send
} from 'lucide-react';
import { Notice, Language, UserRole } from '../../types';
import { CivicStore } from '../../services/store';

interface AdminNoticesProps {
  language: Language;
  notices: Notice[];
  adminRole: UserRole;
}

export const AdminNotices: React.FC<AdminNoticesProps> = ({ notices, adminRole }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [titleEn, setTitleEn] = useState('');
  const [titleMr, setTitleMr] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [contentMr, setContentMr] = useState('');
  const [category, setCategory] = useState<'water' | 'health' | 'civic' | 'tender' | 'environment'>('civic');
  const [isUrgent, setIsUrgent] = useState(false);
  const [author, setAuthor] = useState('Public Relations Officer, PCMC');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim() || !contentEn.trim()) return;

    CivicStore.createNotice({
      title: {
        en: titleEn,
        mr: titleMr || titleEn,
        hi: titleEn
      },
      content: {
        en: contentEn,
        mr: contentMr || contentEn,
        hi: contentEn
      },
      category,
      isUrgent,
      status: 'published',
      author
    });

    setShowCreateModal(false);
    setTitleEn('');
    setTitleMr('');
    setContentEn('');
    setContentMr('');
    setIsUrgent(false);
  };

  const handleToggleStatus = (id: string) => {
    CivicStore.toggleNoticeStatus(id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      CivicStore.deleteNotice(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Manage Public Notices & Circulars
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Draft, preview, publish and archive municipal alerts broadcast to citizens.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pcmc-600 hover:bg-pcmc-700 text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Notice</span>
        </button>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Notice ID</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Urgent Flag</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {notices.map((n) => (
                <tr key={n.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">{n.id}</td>
                  <td className="py-3 px-4 max-w-sm">
                    <div className="font-bold text-slate-900">{n.title.en}</div>
                    <div className="text-[11px] text-slate-500 truncate">{n.content.en}</div>
                  </td>
                  <td className="py-3 px-4 uppercase font-semibold text-[10px] text-slate-600">
                    {n.category}
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{n.publishedDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      n.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {n.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {n.isUrgent ? (
                      <span className="flex items-center gap-1 text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Urgent
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Normal</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                    <button
                      onClick={() => handleToggleStatus(n.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition"
                      title={n.status === 'published' ? 'Archive notice' : 'Publish notice'}
                    >
                      {n.status === 'published' ? <EyeOff className="w-4 h-4 text-amber-600" /> : <Eye className="w-4 h-4 text-emerald-600" />}
                    </button>
                    <button
                      onClick={() => handleDelete(n.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 transition"
                      title="Delete notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Notice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-pcmc-600" />
                <h3 className="font-bold text-base text-slate-900">Publish Public Municipal Notice</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Title (English) *</label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g., Water pipeline interconnection shutdown in Bhosari"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-pcmc-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Title (मराठी अनुवाद - पर्यायी)</label>
                <input
                  type="text"
                  value={titleMr}
                  onChange={(e) => setTitleMr(e.target.value)}
                  placeholder="उदा., भोसरी जलवाहिनी दुरुस्ती पाणीपुरवठा बंद नोटीस"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-pcmc-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-pcmc-500"
                  >
                    <option value="water">Water Supply</option>
                    <option value="health">Public Health & Cleanliness</option>
                    <option value="civic">Property Tax & Civic</option>
                    <option value="tender">Tenders & Contracts</option>
                    <option value="environment">Environment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Issuing Authority</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-pcmc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Content *</label>
                <textarea
                  rows={3}
                  required
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  placeholder="Provide complete public advisory details, affected areas, and helplines..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-pcmc-500"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
                <input
                  type="checkbox"
                  id="urgentNoticeCheck"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="w-4 h-4 rounded text-pcmc-600 focus:ring-pcmc-500"
                />
                <label htmlFor="urgentNoticeCheck" className="text-xs font-bold text-amber-900 cursor-pointer">
                  Mark as URGENT (Displays priority banner on Citizen App)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pcmc-600 hover:bg-pcmc-700 text-white text-xs font-bold shadow-sm"
                >
                  Publish Notice
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
