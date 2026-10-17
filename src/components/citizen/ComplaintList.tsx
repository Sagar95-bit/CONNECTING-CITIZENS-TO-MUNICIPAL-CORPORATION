import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  ChevronRight, 
  AlertTriangle, 
  Trash2, 
  Droplets, 
  Lightbulb, 
  Building, 
  Dog, 
  HelpCircle,
  Plus
} from 'lucide-react';
import { Language, Complaint, ComplaintStatus, ComplaintCategory } from '../../types';
import { translations } from '../../i18n/translations';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { PCMC_LOCALITIES } from '../../services/store';

interface ComplaintListProps {
  language: Language;
  complaints: Complaint[];
  selectedLocality: string;
  onSelectComplaint: (complaint: Complaint) => void;
  onNavigateToReport: () => void;
}

export const ComplaintList: React.FC<ComplaintListProps> = ({
  language,
  complaints,
  selectedLocality,
  onSelectComplaint,
  onNavigateToReport
}) => {
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterLocality, setFilterLocality] = useState<string>(selectedLocality);
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'priority'>('latest');

  const statusTabs: { id: string; label: string; count: number }[] = [
    { id: 'All', label: t.allStatus, count: complaints.length },
    { id: 'Submitted', label: t.status_Submitted, count: complaints.filter(c => c.status === 'Submitted').length },
    { id: 'Assigned', label: t.status_Assigned, count: complaints.filter(c => c.status === 'Assigned').length },
    { id: 'In Progress', label: t.status_In_Progress, count: complaints.filter(c => c.status === 'In Progress').length },
    { id: 'Resolved', label: t.status_Resolved, count: complaints.filter(c => c.status === 'Resolved').length },
    { id: 'Rejected', label: t.status_Rejected, count: complaints.filter(c => c.status === 'Rejected').length },
  ];

  const getCategoryIcon = (cat: ComplaintCategory) => {
    switch (cat) {
      case 'potholes': return AlertTriangle;
      case 'garbage': return Trash2;
      case 'drainage': return Droplets;
      case 'water_leakage': return Droplets;
      case 'streetlights': return Lightbulb;
      case 'encroachment': return Building;
      case 'stray_animals': return Dog;
      default: return HelpCircle;
    }
  };

  // Filter complaints
  const filtered = complaints.filter(c => {
    // Search query matches ID, title, description, or landmark
    const matchesSearch = searchQuery === '' || 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.locality.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;

    // Category filter
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;

    // Locality filter
    const matchesLocality = filterLocality === 'All' || c.locality.toLowerCase().includes(filterLocality.toLowerCase());

    return matchesSearch && matchesStatus && matchesCategory && matchesLocality;
  });

  // Sort complaints
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'priority') {
      const pMap = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
      return (pMap[b.priority] || 0) - (pMap[a.priority] || 0);
    }
    if (sortBy === 'oldest') {
      return a.createdAt.localeCompare(b.createdAt);
    }
    return b.createdAt.localeCompare(a.createdAt);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-12 space-y-6">
      
      {/* Header & New Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {t.myComplaintsTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track and monitor resolution progress across PCMC administrative wards.
          </p>
        </div>

        <button
          onClick={onNavigateToReport}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pcmc-600 hover:bg-pcmc-700 text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.reportBtn}</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle space-y-3">
        
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchComplaints}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-pcmc-500 bg-slate-50/50"
          />
        </div>

        {/* Secondary Filters: Locality, Category, Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Locality
            </label>
            <select
              value={filterLocality}
              onChange={(e) => setFilterLocality(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-pcmc-500"
            >
              <option value="All">All Localities</option>
              {PCMC_LOCALITIES.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name} ({loc.ward})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-pcmc-500"
            >
              <option value="All">All Categories</option>
              <option value="potholes">{t.cat_potholes}</option>
              <option value="garbage">{t.cat_garbage}</option>
              <option value="drainage">{t.cat_drainage}</option>
              <option value="water_leakage">{t.cat_water_leakage}</option>
              <option value="streetlights">{t.cat_streetlights}</option>
              <option value="encroachment">{t.cat_encroachment}</option>
              <option value="stray_animals">{t.cat_stray_animals}</option>
              <option value="other">{t.cat_other}</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Sort Order
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-pcmc-500"
            >
              <option value="latest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">Highest Urgency</option>
            </select>
          </div>
        </div>

      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {statusTabs.map((tab) => {
          const isActive = selectedStatus === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                isActive
                  ? 'bg-pcmc-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Complaint Cards List */}
      {sorted.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center">
          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">{t.noComplaintsFound}</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {t.noComplaintsSub}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('All');
              setSelectedCategory('All');
              setFilterLocality('All');
            }}
            className="mt-4 text-xs font-bold text-pcmc-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((item) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <div
                key={item.id}
                onClick={() => onSelectComplaint(item)}
                className="bg-white rounded-2xl border border-slate-200 hover:border-pcmc-300 hover:shadow-card transition cursor-pointer p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:bg-pcmc-50 group-hover:text-pcmc-700 group-hover:border-pcmc-200 transition">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-extrabold text-pcmc-800 bg-pcmc-50 border border-pcmc-200 px-2.5 py-0.5 rounded-lg">
                        {item.id}
                      </span>
                      <PriorityBadge priority={item.priority} />
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {item.locality} ({item.ward})
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-pcmc-700 transition">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-1 max-w-2xl">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span>Filed: {item.createdAt}</span>
                      {item.assignedDepartment && (
                        <span>• Dept: <strong className="text-slate-600">{item.assignedDepartment}</strong></span>
                      )}
                      {item.feedback && (
                        <span className="text-emerald-600 font-semibold">• Rated: {item.feedback.rating}★</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex-shrink-0">
                  <StatusBadge status={item.status} />
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-pcmc-600 group-hover:text-white text-slate-500 flex items-center justify-center transition">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
