import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  AlertTriangle, 
  Calendar, 
  User, 
  Droplets, 
  HeartPulse, 
  Building, 
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import { Language, Notice } from '../../types';
import { translations } from '../../i18n/translations';

interface NoticesPageProps {
  language: Language;
  notices: Notice[];
}

export const NoticesPage: React.FC<NoticesPageProps> = ({ language, notices }) => {
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const publishedNotices = notices.filter(n => n.status === 'published');

  const filtered = publishedNotices.filter(notice => {
    const titleText = notice.title[language] || notice.title.en;
    const contentText = notice.content[language] || notice.content.en;

    const matchesSearch = searchQuery === '' ||
      titleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contentText.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'water': return Droplets;
      case 'health': return HeartPulse;
      case 'civic': return Building;
      default: return FileCheck;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-12 space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-pcmc-50 text-pcmc-700 flex items-center justify-center">
            <Bell className="w-5 h-5 text-pcmc-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t.noticesTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.noticesSub}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circulars, water shutdown advisories, civic updates..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-pcmc-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Notices' },
            { id: 'water', label: 'Water Supply' },
            { id: 'health', label: 'Health & Swachhata' },
            { id: 'civic', label: 'Tax & Civic' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-pcmc-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No matching notices found</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or search query.</p>
          </div>
        ) : (
          filtered.map((item) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-5 transition space-y-3 ${
                  item.isUrgent
                    ? 'bg-amber-50/60 border-amber-300 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-subtle'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                      <Icon className="w-4 h-4 text-pcmc-600" />
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-500">
                      {item.id}
                    </span>
                    {item.isUrgent && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-200 text-amber-900 border border-amber-300 animate-pulse">
                        <AlertTriangle className="w-3 h-3 text-amber-700" />
                        {t.urgentTag}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.publishedDate}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {item.title[language] || item.title.en}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {item.content[language] || item.content.en}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    Issued by: <strong className="text-slate-600">{item.author}</strong>
                  </span>
                  <span className="font-medium text-pcmc-700">Official Municipal Notice</span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
