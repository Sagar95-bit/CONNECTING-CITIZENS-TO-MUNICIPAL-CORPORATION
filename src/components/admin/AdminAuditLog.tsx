import React, { useState } from 'react';
import { Shield, Clock, Filter, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { AuditLogEntry, Language, UserRole } from '../../types';

interface AdminAuditLogProps {
  language: Language;
  auditLogs: AuditLogEntry[];
  adminRole: UserRole;
}

export const AdminAuditLog: React.FC<AdminAuditLogProps> = ({ auditLogs }) => {
  const [filterAction, setFilterAction] = useState<string>('ALL');

  const filtered = auditLogs.filter(log => {
    if (filterAction === 'ALL') return true;
    return log.action.includes(filterAction);
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'COMPLAINT_CREATED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">CREATED</span>;
      case 'STATUS_UPDATED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">STATUS</span>;
      case 'OFFICER_ASSIGNED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">ASSIGNED</span>;
      case 'COMPLAINT_RESOLVED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">RESOLVED</span>;
      case 'NOTICE_PUBLISHED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-800">NOTICE</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">{action}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Administrative Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Immutable log of all user submissions, status transitions, staff dispatches, and notice publications.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="p-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none"
          >
            <option value="ALL">All Event Types</option>
            <option value="COMPLAINT">Grievance Events</option>
            <option value="STATUS">Status Changes</option>
            <option value="ASSIGNED">Officer Assignments</option>
            <option value="NOTICE">Public Notices</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action Type</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4">Performed By</th>
                <th className="py-3 px-4">Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 text-slate-500 font-mono whitespace-nowrap text-[11px]">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {getActionBadge(log.action)}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-pcmc-800 whitespace-nowrap">
                    {log.entityId || 'System'}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 whitespace-nowrap">
                    {log.performedBy}
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-md">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-xs text-slate-500">
        <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span>Audit events are recorded synchronously in the demo storage layer for verifiable state inspection.</span>
      </div>

    </div>
  );
};
