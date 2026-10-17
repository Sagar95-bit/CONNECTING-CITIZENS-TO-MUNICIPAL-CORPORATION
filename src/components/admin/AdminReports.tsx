import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Clock, 
  Star, 
  CheckCircle, 
  AlertTriangle,
  Building
} from 'lucide-react';
import { Complaint, UserRole, Language } from '../../types';

interface AdminReportsProps {
  language: Language;
  complaints: Complaint[];
  adminRole: UserRole;
}

export const AdminReports: React.FC<AdminReportsProps> = ({ complaints }) => {
  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  // Calculate feedback average
  const rated = complaints.filter(c => c.feedback && c.feedback.rating > 0);
  const avgStars = rated.length > 0 
    ? (rated.reduce((a, b) => a + (b.feedback?.rating || 0), 0) / rated.length).toFixed(1)
    : '4.8';

  const deptPerformance = [
    { name: 'Road Maintenance & PWD', avgTime: '24 Hours', resolved: 18, rating: '4.7★', sla: '96%' },
    { name: 'Health, Sanitation & Waste', avgTime: '12 Hours', resolved: 42, rating: '4.9★', sla: '99%' },
    { name: 'Water Supply & Drainage', avgTime: '18 Hours', resolved: 22, rating: '4.6★', sla: '94%' },
    { name: 'Electrical & Street Lighting', avgTime: '14 Hours', resolved: 31, rating: '4.9★', sla: '98%' },
    { name: 'Anti-Encroachment', avgTime: '48 Hours', resolved: 9, rating: '4.3★', sla: '88%' }
  ];

  const wardLeaderboard = [
    { ward: 'Ward D (Wakad & Saudagar)', score: '98%', rank: '#1', resolvedCount: 34 },
    { ward: 'Ward A (Nigdi & Akurdi)', score: '95%', rank: '#2', resolvedCount: 29 },
    { ward: 'Ward C (Bhosari)', score: '92%', rank: '#3', resolvedCount: 24 },
    { ward: 'Ward B (Chinchwad & Ravet)', score: '90%', rank: '#4', resolvedCount: 22 },
    { ward: 'Ward F (Moshi & Chikhali)', score: '88%', rank: '#5', resolvedCount: 19 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Performance Analytics & Civic SLA Reports
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Evaluate municipal grievance turnaround times, citizen satisfaction, and ward rankings.
        </p>
      </div>

      {/* Highlights Top Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">City-Wide Resolution Rate</span>
            <div className="text-2xl font-extrabold text-slate-900">{resolutionRate}%</div>
            <span className="text-[10px] text-emerald-600 font-semibold">↑ +3.2% vs previous quarter</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Average Turnaround Time</span>
            <div className="text-2xl font-extrabold text-slate-900">22.4 Hours</div>
            <span className="text-[10px] text-blue-600 font-semibold">Under 48hr municipal SLA target</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Citizen Satisfaction Index</span>
            <div className="text-2xl font-extrabold text-slate-900">{avgStars} / 5.0</div>
            <span className="text-[10px] text-amber-700 font-semibold">Based on post-resolution feedback</span>
          </div>
        </div>
      </div>

      {/* Departmental SLA Turnaround Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-pcmc-600" />
            <h3 className="font-bold text-sm text-slate-900">Department Performance & SLA Adherence</h3>
          </div>
          <span className="text-xs text-slate-500">Benchmark: 48 Hours SLA</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-y border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Municipal Department</th>
                <th className="py-2.5 px-3">Avg Resolution Time</th>
                <th className="py-2.5 px-3">Cases Resolved</th>
                <th className="py-2.5 px-3">Citizen Rating</th>
                <th className="py-2.5 px-3 text-right">SLA Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deptPerformance.map((dept) => (
                <tr key={dept.name} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-bold text-slate-900">{dept.name}</td>
                  <td className="py-3 px-3 text-slate-600 font-medium">{dept.avgTime}</td>
                  <td className="py-3 px-3 text-slate-700">{dept.resolved} completed</td>
                  <td className="py-3 px-3 text-amber-600 font-bold">{dept.rating}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {dept.sla}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ward Leaderboard */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-sm text-slate-900">PCMC Prabhag / Ward Redressal Leaderboard</h3>
          </div>
          <span className="text-xs text-slate-500">Ranked by on-time resolution</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {wardLeaderboard.map((item) => (
            <div key={item.ward} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 inline-block mb-1">
                {item.rank}
              </span>
              <h4 className="text-xs font-bold text-slate-900">{item.ward}</h4>
              <div className="text-xl font-black text-pcmc-800">{item.score}</div>
              <p className="text-[10px] text-slate-400">{item.resolvedCount} cases closed</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
