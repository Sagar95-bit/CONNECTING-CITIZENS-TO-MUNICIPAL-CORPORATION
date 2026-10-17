import React from 'react';
import { ComplaintStatus, ComplaintPriority } from '../../types';

interface StatusBadgeProps {
  status: ComplaintStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';
  
  switch (status) {
    case 'Submitted':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Submitted
        </span>
      );
    case 'Assigned':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Assigned
        </span>
      );
    case 'In Progress':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          In Progress
        </span>
      );
    case 'Resolved':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Resolved
        </span>
      );
    case 'Rejected':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          Rejected
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 ${sizeClasses}`}>
          {status}
        </span>
      );
  }
};

interface PriorityBadgeProps {
  priority: ComplaintPriority;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  switch (priority) {
    case 'Urgent':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full bg-rose-100 text-rose-800 border border-rose-300">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping"></span>
          Urgent
        </span>
      );
    case 'High':
      return (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-800 border border-orange-200">
          High
        </span>
      );
    case 'Medium':
      return (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-800 border border-amber-200">
          Medium
        </span>
      );
    case 'Low':
      return (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          Low
        </span>
      );
  }
};
