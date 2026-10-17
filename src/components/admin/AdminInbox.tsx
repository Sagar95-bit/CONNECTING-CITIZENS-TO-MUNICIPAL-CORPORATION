import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  User, 
  ChevronRight, 
  AlertTriangle,
  ArrowUpDown
} from 'lucide-react';
import { Complaint, UserRole, Language, ComplaintStatus, ComplaintPriority } from '../../types';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { PCMC_LOCALITIES, INITIAL_DEPARTMENTS } from '../../services/store';

interface AdminInboxProps {
  language: Language;
  complaints: Complaint[];
  adminRole: UserRole;
  onSelectComplaint: (complaint: Complaint) => void;
}

export const AdminInbox: React.FC<AdminInboxProps> = ({
  complaints,
  adminRole,
  onSelectComplaint
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedWard, setSelectedWard] = useState<string>(adminRole === 'ward_officer' ? 'Ward D' : 'All');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'priority'>('date_desc');

  // Filter complaints
  const filtered = complaints.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      c.id.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.citizenName.toLowerCase().includes(q) ||
      c.locality.toLowerCase().includes(q);

    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || c.priority === selectedPriority;
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesWard = selectedWard === 'All' || c.ward === selectedWard;
    const matchesDept = selectedDepartment === 'All' || c.assignedDepartment === selectedDepartment;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesWard && matchesDept;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'priority') {
      const pMap: { [key: string]: number } = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
      return (pMap[b.priority] || 0) - (pMap[a.priority] || 0);
    }
    if (sortBy === 'date_asc') {
      return a.createdAt.localeCompare(b.createdAt);
    }
    return b.createdAt.localeCompare(a.createdAt);
  });

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Grievance Redressal Inbox
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review citizen complaints, assign departmental staff, and record resolution milestones.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
          Showing <strong>{sorted.length}</strong> of {complaints.length} tickets
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle space-y-3">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Ticket ID (e.g. PCMC-2026-8491), keyword, citizen name, locality..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-pcmc-500 bg-slate-50/50"
          />
        </div>

        {/* Multi-Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          
          {/* Status */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Submitted">Submitted (Unassigned)</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Priority
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full p-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="potholes">Potholes & Roads</option>
              <option value="garbage">Garbage & Waste</option>
              <option value="drainage">Drainage & Sewage</option>
              <option value="water_leakage">Water Leakage</option>
              <option value="streetlights">Streetlights</option>
              <option value="encroachment">Encroachment</option>
              <option value="stray_animals">Stray Animals</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Ward */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Ward
            </label>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="w-full p-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none"
            >
              <option value="All">All Wards (A - H)</option>
              <option value="Ward A">Ward A (Nigdi, Akurdi)</option>
              <option value="Ward B">Ward B (Chinchwad, Ravet)</option>
              <option value="Ward C">Ward C (Bhosari)</option>
              <option value="Ward D">Ward D (Wakad, Saudagar)</option>
              <option value="Ward E">Ward E (Dighi, Charholi)</option>
              <option value="Ward F">Ward F (Moshi, Chikhali)</option>
              <option value="Ward G">Ward G (Pimpri)</option>
              <option value="Ward H">Ward H (Sangvi, Dapodi)</option>
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full p-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none"
            >
              <option value="All">All Departments</option>
              {INITIAL_DEPARTMENTS.map(d => (
                <option key={d.id} value={d.name.en}>{d.name.en}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Sort
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none"
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
              <option value="priority">Urgency First</option>
            </select>
          </div>

        </div>

      </div>

      {/* Table of Complaints */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        {sorted.length === 0 ? (
          <div className="p-8 sm:p-12 text-center">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No grievances matching current filters</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the status, priority, or ward filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Ticket</th>
                  <th className="py-3 px-4">Issue Description</th>
                  <th className="py-3 px-4">Locality / Ward</th>
                  <th className="py-3 px-4">Citizen Contact</th>
                  <th className="py-3 px-4">Department & Staff</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sorted.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => onSelectComplaint(item)}
                    className="hover:bg-slate-50 transition cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-pcmc-800 whitespace-nowrap">
                      {item.id}
                      <span className="block text-[10px] font-normal text-slate-400 font-sans mt-0.5">
                        {item.createdAt.split(' ')[0]}
                      </span>
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-bold text-slate-900 group-hover:text-pcmc-700 transition truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {item.description}
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-pcmc-600" />
                        <span>{item.locality}</span>
                      </div>
                      <span className="text-[11px] text-slate-500">{item.ward}</span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-slate-700">
                      <div className="font-medium">{item.citizenName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{item.citizenPhone}</div>
                    </td>

                    <td className="py-3 px-4 max-w-[180px]">
                      {item.assignedDepartment ? (
                        <div>
                          <div className="font-medium text-slate-800 truncate">{item.assignedDepartment}</div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {item.assignedStaffName || 'Assigned to Dept'}
                          </div>
                        </div>
                      ) : (
                        <span className="text-amber-700 font-bold text-[11px] bg-amber-50 px-2 py-0.5 rounded">
                          Unassigned
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <PriorityBadge priority={item.priority} />
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <StatusBadge status={item.status} size="sm" />
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectComplaint(item);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-pcmc-50 hover:bg-pcmc-600 hover:text-white text-pcmc-700 font-bold text-xs transition"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
