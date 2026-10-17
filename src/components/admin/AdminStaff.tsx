import React from 'react';
import { Building2, Users, Phone, Mail, MapPin, Briefcase } from 'lucide-react';
import { INITIAL_DEPARTMENTS, INITIAL_STAFF } from '../../services/store';
import { Language, UserRole } from '../../types';

interface AdminStaffProps {
  language: Language;
  adminRole: UserRole;
}

export const AdminStaff: React.FC<AdminStaffProps> = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Departmental Hierarchy & Staff Allocation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          PCMC civic departments, responsible nodal officers, and active grievance workloads.
        </p>
      </div>

      {/* Departments Overview Cards */}
      <div>
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          PCMC Administrative Departments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INITIAL_DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-pcmc-50 text-pcmc-700 flex items-center justify-center font-bold text-xs">
                  {dept.code}
                </div>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                  {dept.activeStaffCount} Field Crew
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900">{dept.name.en}</h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{dept.name.mr}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs space-y-1 text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Head Officer:</span>
                  <span className="font-semibold text-slate-800">{dept.headOfficer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Desk Direct Line:</span>
                  <span className="font-mono text-slate-700">{dept.contactNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Active Grievance Queue:</span>
                  <span className="font-extrabold text-pcmc-800 bg-pcmc-50 px-2 py-0.2 rounded">
                    {dept.openCasesCount} Cases
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-pcmc-600" />
            <h2 className="font-bold text-sm text-slate-900">Nodal Staff Directory & Case Load</h2>
          </div>
          <span className="text-xs text-slate-500">{INITIAL_STAFF.length} Officers Registered</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-y border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Officer Name</th>
                <th className="py-2.5 px-3">Role / Designation</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Ward Jurisdiction</th>
                <th className="py-2.5 px-3">Contact</th>
                <th className="py-2.5 px-3 text-right">Active Cases</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INITIAL_STAFF.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-bold text-slate-900">{staff.name}</td>
                  <td className="py-3 px-3 text-slate-600">{staff.role}</td>
                  <td className="py-3 px-3 font-semibold text-pcmc-700">{staff.departmentCode}</td>
                  <td className="py-3 px-3 text-slate-600">{staff.ward}</td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                    {staff.phone}
                  </td>
                  <td className="py-3 px-3 text-right font-extrabold text-slate-900">
                    <span className="bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {staff.activeCases} active
                    </span>
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
