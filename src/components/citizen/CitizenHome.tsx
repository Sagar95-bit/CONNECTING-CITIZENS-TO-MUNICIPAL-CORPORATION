import React from 'react';
import { 
  PlusCircle, 
  MapPin, 
  ArrowRight, 
  AlertTriangle, 
  Clock, 
  Building2, 
  Droplets, 
  FileText, 
  Trash2, 
  Lightbulb, 
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { Language, Complaint, Notice } from '../../types';
import { translations } from '../../i18n/translations';
import { StatusBadge } from '../common/Badge';

interface CitizenHomeProps {
  language: Language;
  selectedLocality: string;
  onSelectLocality: (locality: string) => void;
  complaints: Complaint[];
  notices: Notice[];
  onNavigateTab: (tab: string) => void;
  onSelectComplaint: (complaint: Complaint) => void;
  onOpenReportWithCategory?: (category: string) => void;
  onOpenEmergencyModal: () => void;
}

export const CitizenHome: React.FC<CitizenHomeProps> = ({
  language,
  selectedLocality,
  complaints,
  notices,
  onNavigateTab,
  onSelectComplaint,
  onOpenReportWithCategory,
  onOpenEmergencyModal
}) => {
  const t = translations[language];

  // Filter complaints based on locality if chosen
  const displayComplaints = selectedLocality === 'All'
    ? complaints
    : complaints.filter(c => c.locality.toLowerCase().includes(selectedLocality.toLowerCase()));

  // Active / recent complaints (up to 3)
  const activeComplaints = displayComplaints.slice(0, 3);

  // Urgent notice if available
  const urgentNotice = notices.find(n => n.isUrgent && n.status === 'published') || notices[0];

  const quickCategories = [
    { id: 'potholes', label: t.cat_potholes, icon: AlertTriangle, color: 'bg-amber-100 text-amber-800' },
    { id: 'garbage', label: t.cat_garbage, icon: Trash2, color: 'bg-emerald-100 text-emerald-800' },
    { id: 'drainage', label: t.cat_drainage, icon: Droplets, color: 'bg-blue-100 text-blue-800' },
    { id: 'streetlights', label: t.cat_streetlights, icon: Lightbulb, color: 'bg-yellow-100 text-yellow-800' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-6 pb-24 lg:pb-12">
      
      {/* Greeting & Locality Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t.greeting}
            </h1>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t.greetingSub} • {selectedLocality === 'All' ? 'Whole PCMC Area' : `${selectedLocality}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pcmc-50 text-pcmc-900 border border-pcmc-200 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-pcmc-600" />
            <span>{selectedLocality === 'All' ? 'All Localities' : selectedLocality}</span>
          </div>
          <button
            onClick={onOpenEmergencyModal}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold transition"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Helpline</span>
          </button>
        </div>
      </div>

      {/* Hero Action Card: Report Issue */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pcmc-700 via-pcmc-600 to-emerald-700 text-white p-6 sm:p-8 shadow-card">
        <div className="relative z-10 max-w-xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30 mb-3">
            नागरिक सेवा केंद्र
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.reportIssueTitle}
          </h2>
          <p className="text-pcmc-100 text-sm mt-2 leading-relaxed">
            {t.reportIssueDesc}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('report')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-pcmc-800 font-bold text-sm shadow-md hover:bg-pcmc-50 transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-pcmc-600" />
              <span>{t.reportBtn}</span>
            </button>
            <button
              onClick={() => onNavigateTab('complaints')}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-sm border border-white/20 transition"
            >
              <span>{t.trackComplaintsTitle}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative backdrop elements */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
      </div>

      {/* Quick Category Issue Triggers */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Quick Report Category
          </h3>
          <span className="text-xs text-slate-500">Tap to start filing</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (onOpenReportWithCategory) {
                    onOpenReportWithCategory(cat.id);
                  } else {
                    onNavigateTab('report');
                  }
                }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-pcmc-500 hover:shadow-subtle transition text-left group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cat.color} group-hover:scale-105 transition`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-pcmc-700 transition">
                    {cat.label}
                  </h4>
                  <p className="text-[10px] text-slate-500">Fast dispatch</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Urgent Notice Banner */}
      {urgentNotice && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase bg-amber-200 text-amber-800 px-2 py-0.5 rounded">
                  {t.urgentTag}
                </span>
                <span className="text-xs text-slate-500">{urgentNotice.publishedDate}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-1">
                {urgentNotice.title[language] || urgentNotice.title.en}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                {urgentNotice.content[language] || urgentNotice.content.en}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('notices')}
            className="flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-100/80 px-3 py-2 rounded-lg transition flex-shrink-0"
          >
            <span>Read Details</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Two Column Section: Active Complaints & Key Municipal Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Active Complaints */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-pcmc-50 text-pcmc-700 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-pcmc-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{t.trackComplaintsTitle}</h3>
                  <p className="text-[11px] text-slate-500">Live grievance redressal status</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('complaints')}
                className="text-xs font-semibold text-pcmc-700 hover:text-pcmc-800 flex items-center gap-1"
              >
                <span>{t.viewAll}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {activeComplaints.length === 0 ? (
              <div className="text-center py-8 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <CheckCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-600 font-medium">No complaints active in this locality.</p>
                <button
                  onClick={() => onNavigateTab('report')}
                  className="mt-3 text-xs font-bold text-pcmc-600 hover:underline"
                >
                  File a new complaint
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {activeComplaints.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectComplaint(item);
                      onNavigateTab('complaints');
                    }}
                    className="p-3.5 rounded-xl border border-slate-100 hover:border-pcmc-200 hover:bg-slate-50/70 transition cursor-pointer flex items-start justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-pcmc-800 bg-pcmc-50 px-2 py-0.5 rounded">
                          {item.id}
                        </span>
                        <span className="text-xs text-slate-500">• {item.locality}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-pcmc-700 line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <StatusBadge status={item.status} size="sm" />
                      <span className="text-[10px] text-slate-400 mt-1">
                        {item.createdAt.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 text-[11px]">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              Avg. Resolution: <strong>24-48 Hours</strong>
            </span>
            <button
              onClick={() => onNavigateTab('complaints')}
              className="text-pcmc-700 font-bold text-[11px] hover:underline"
            >
              Track by Reference ID &rarr;
            </button>
          </div>
        </div>

        {/* Right Column: Key Municipal Services */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{t.servicesQuickTitle}</h3>
                  <p className="text-[11px] text-slate-500">Tax, Water, Certificates & Permits</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('services')}
                className="text-xs font-semibold text-pcmc-700 hover:text-pcmc-800 flex items-center gap-1"
              >
                <span>{t.viewAll}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onNavigateTab('services')}
                className="p-3 rounded-xl border border-slate-100 hover:border-pcmc-300 hover:bg-pcmc-50/30 transition text-left space-y-1.5"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">{t.servicePropertyTax}</h4>
                <p className="text-[10px] text-slate-500">10% Early Rebate Calculator</p>
              </button>

              <button
                onClick={() => onNavigateTab('services')}
                className="p-3 rounded-xl border border-slate-100 hover:border-pcmc-300 hover:bg-pcmc-50/30 transition text-left space-y-1.5"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                  <Droplets className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">{t.serviceWater}</h4>
                <p className="text-[10px] text-slate-500">New tap & bill estimate</p>
              </button>

              <button
                onClick={() => onNavigateTab('services')}
                className="p-3 rounded-xl border border-slate-100 hover:border-pcmc-300 hover:bg-pcmc-50/30 transition text-left space-y-1.5"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">{t.serviceCertificates}</h4>
                <p className="text-[10px] text-slate-500">YCM Hospital records search</p>
              </button>

              <button
                onClick={() => onNavigateTab('services')}
                className="p-3 rounded-xl border border-slate-100 hover:border-pcmc-300 hover:bg-pcmc-50/30 transition text-left space-y-1.5"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Trash2 className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">{t.serviceWaste}</h4>
                <p className="text-[10px] text-slate-500">Debris & garden truck booking</p>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 text-[11px]">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              All services include demo workflows
            </span>
            <span className="text-[11px] font-semibold text-slate-600">32 Prabhags Active</span>
          </div>
        </div>

      </div>

    </div>
  );
};
