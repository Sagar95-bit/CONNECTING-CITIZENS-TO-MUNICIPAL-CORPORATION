import React from 'react';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Building2, 
  Star,
  ChevronRight,
  Shield
} from 'lucide-react';
import { Complaint, UserRole, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { INITIAL_DEPARTMENTS } from '../../services/store';

interface AdminOverviewProps {
  language: Language;
  complaints: Complaint[];
  adminRole: UserRole;
  onNavigateTab: (tab: string) => void;
  onSelectComplaint: (complaint: Complaint) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  language,
  complaints,
  adminRole,
  onNavigateTab,
  onSelectComplaint
}) => {
  const t = translations[language];

  // Role based filtering (if Ward Officer, highlight Ward D complaints)
  const isWardOfficer = adminRole === 'ward_officer';
  const roleComplaints = isWardOfficer 
    ? complaints.filter(c => c.ward === 'Ward D')
    : complaints;

  const total = roleComplaints.length;
  const openCount = roleComplaints.filter(c => c.status === 'Submitted').length;
  const assignedCount = roleComplaints.filter(c => c.status === 'Assigned').length;
  const inProgressCount = roleComplaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount = roleComplaints.filter(c => c.status === 'Resolved').length;
  const urgentCount = roleComplaints.filter(c => c.priority === 'Urgent' && c.status !== 'Resolved').length;

  // Citizen satisfaction calculation
  const ratedComplaints = roleComplaints.filter(c => c.feedback && c.feedback.rating > 0);
  const avgRating = ratedComplaints.length > 0
    ? (ratedComplaints.reduce((acc, c) => acc + (c.feedback?.rating || 0), 0) / ratedComplaints.length).toFixed(1)
    : '4.8';

  // Category breakdown
  const categoryCounts: { [key: string]: number } = {};
  roleComplaints.forEach(c => {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
  });

  // Ward breakdown
  const wardCounts: { [key: string]: number } = {};
  complaints.forEach(c => {
    wardCounts[c.ward] = (wardCounts[c.ward] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Card */}
      <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Civic Grievance Command Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-pcmc-500/20 text-pcmc-300 border border-pcmc-500/30">
              Live Demo Monitor
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isWardOfficer 
              ? 'Displaying filtered metrics for Ward D (Wakad, Pimple Saudagar, Pimple Nilakh)'
              : 'Pimpri-Chinchwad Municipal Corporation city-wide redressal operations'}
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('inbox')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pcmc-600 hover:bg-pcmc-700 text-white font-bold text-xs transition shadow-md active:scale-95"
        >
          <span>Open Redressal Inbox</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        {/* Total */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total</span>
            <ClipboardList className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-slate-900">{total}</div>
          <p className="text-[10px] text-slate-500">Across all categories</p>
        </div>

        {/* Pending / Submitted */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-[11px] font-bold uppercase tracking-wider">Unassigned</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-amber-700">{openCount}</div>
          <p className="text-[10px] text-amber-600">Requires triage</p>
        </div>

        {/* Assigned */}
        <div className="bg-white p-4 rounded-2xl border border-blue-200 bg-blue-50/20 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-blue-600">
            <span className="text-[11px] font-bold uppercase tracking-wider">Assigned</span>
            <Users className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-blue-700">{assignedCount}</div>
          <p className="text-[10px] text-blue-600">With field engineer</p>
        </div>

        {/* In Progress */}
        <div className="bg-white p-4 rounded-2xl border border-indigo-200 bg-indigo-50/20 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-indigo-600">
            <span className="text-[11px] font-bold uppercase tracking-wider">In Progress</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-indigo-700">{inProgressCount}</div>
          <p className="text-[10px] text-indigo-600">Work order active</p>
        </div>

        {/* Urgent / Overdue */}
        <div className="bg-white p-4 rounded-2xl border border-rose-200 bg-rose-50/20 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-rose-600">
            <span className="text-[11px] font-bold uppercase tracking-wider">Urgent SLA</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-rose-700">{urgentCount}</div>
          <p className="text-[10px] text-rose-600">Priority escalation</p>
        </div>

        {/* Resolved */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-[11px] font-bold uppercase tracking-wider">Resolved</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{resolvedCount}</div>
          <p className="text-[10px] text-emerald-600">Satisfaction: {avgRating}★</p>
        </div>

      </div>

      {/* Two Columns: Category Breakdown & Ward Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Complaints by Civic Category
            </h3>
            <span className="text-xs text-slate-500">Live tally</span>
          </div>

          <div className="space-y-3">
            {[
              { id: 'potholes', label: 'Potholes & Roads', color: 'bg-amber-500' },
              { id: 'garbage', label: 'Garbage & Waste', color: 'bg-emerald-500' },
              { id: 'drainage', label: 'Drainage & Sewage', color: 'bg-blue-500' },
              { id: 'water_leakage', label: 'Water Leakage', color: 'bg-cyan-500' },
              { id: 'streetlights', label: 'Streetlights & Power', color: 'bg-yellow-500' },
              { id: 'stray_animals', label: 'Stray Animals', color: 'bg-orange-500' }
            ].map(cat => {
              const count = categoryCounts[cat.id] || 0;
              const percent = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={cat.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{cat.label}</span>
                    <span>{count} cases ({percent}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full ${cat.color} transition-all duration-500`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PCMC Administrative Ward Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Zonal Ward Redressal Volume
            </h3>
            <span className="text-xs text-slate-500">8 PCMC Administrative Zones</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { ward: 'Ward A', areas: 'Nigdi, Akurdi, Pradhikaran' },
              { ward: 'Ward B', areas: 'Chinchwad, Ravet, Kiwale' },
              { ward: 'Ward C', areas: 'Bhosari, Indrayani Nagar' },
              { ward: 'Ward D', areas: 'Wakad, Saudagar, Gurav' },
              { ward: 'Ward E', areas: 'Dighi, Bopkhel, Charholi' },
              { ward: 'Ward F', areas: 'Moshi, Chikhali' },
              { ward: 'Ward G', areas: 'Pimpri, Rahatani' },
              { ward: 'Ward H', areas: 'Sangvi, Dapodi' }
            ].map((w) => {
              const count = wardCounts[w.ward] || 0;
              return (
                <div key={w.ward} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{w.ward}</span>
                    <span className="text-xs font-extrabold text-pcmc-800 bg-white px-2 py-0.5 rounded shadow-xs">
                      {count} cases
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 truncate">{w.areas}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Recent High Priority Grievances Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Recent Action Items
            </h3>
            <p className="text-xs text-slate-500">Requires review, assignment or status transition</p>
          </div>
          <button
            onClick={() => onNavigateTab('inbox')}
            className="text-xs font-bold text-pcmc-700 hover:underline"
          >
            View all grievances &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Ticket ID</th>
                <th className="py-2.5 px-3 font-semibold">Issue Summary</th>
                <th className="py-2.5 px-3 font-semibold">Locality / Ward</th>
                <th className="py-2.5 px-3 font-semibold">Priority</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roleComplaints.slice(0, 5).map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-mono font-bold text-pcmc-800">{c.id}</td>
                  <td className="py-3 px-3 font-medium text-slate-800 max-w-xs truncate">{c.title}</td>
                  <td className="py-3 px-3 text-slate-600">{c.locality} ({c.ward})</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      c.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-slate-700">{c.status}</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onSelectComplaint(c)}
                      className="px-2.5 py-1 rounded-lg bg-pcmc-50 hover:bg-pcmc-100 text-pcmc-700 font-bold text-[11px] transition"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
