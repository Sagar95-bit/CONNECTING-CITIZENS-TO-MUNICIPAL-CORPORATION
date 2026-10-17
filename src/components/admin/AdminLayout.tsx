import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Inbox, 
  Bell, 
  Users, 
  BarChart3, 
  Shield, 
  ArrowLeft, 
  Menu, 
  X, 
  FileText,
  UserCheck,
  Smartphone,
  RotateCcw
} from 'lucide-react';
import { UserRole, Language, Complaint, Notice, AuditLogEntry } from '../../types';
import { AdminOverview } from './AdminOverview';
import { AdminInbox } from './AdminInbox';
import { AdminComplaintDetail } from './AdminComplaintDetail';
import { AdminNotices } from './AdminNotices';
import { AdminStaff } from './AdminStaff';
import { AdminReports } from './AdminReports';
import { AdminAuditLog } from './AdminAuditLog';

interface AdminLayoutProps {
  language: Language;
  adminRole: UserRole;
  onAdminRoleChange: (role: UserRole) => void;
  onSwitchToCitizen: () => void;
  complaints: Complaint[];
  notices: Notice[];
  auditLogs: AuditLogEntry[];
  onRefreshData: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  language,
  adminRole,
  onAdminRoleChange,
  onSwitchToCitizen,
  complaints,
  notices,
  auditLogs
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'inbox' | 'notices' | 'staff' | 'reports' | 'audit'>('overview');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unassignedCount = complaints.filter(c => c.status === 'Submitted').length;

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'Municipal Commissioner (Full)';
      case 'ward_officer': return 'Ward D Officer (Zonal)';
      case 'field_worker': return 'Field Inspector (PWD/Health)';
      default: return 'Administrator';
    }
  };

  const navItems = [
    { id: 'overview', label: 'Operations Overview', icon: LayoutDashboard },
    { id: 'inbox', label: 'Grievance Inbox', icon: Inbox, count: unassignedCount },
    { id: 'notices', label: 'Public Notices', icon: Bell },
    { id: 'staff', label: 'Staff & Departments', icon: Users },
    { id: 'reports', label: 'Performance Reports', icon: BarChart3 },
    { id: 'audit', label: 'Audit Trail', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Mobile Top Header for Admin */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <Shield className="w-6 h-6 text-pcmc-400" />
          <div>
            <span className="font-bold text-sm block">PCMC Admin Portal</span>
            <span className="text-[10px] text-slate-400">Demo Operations Center</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSwitchToCitizen}
            className="flex items-center gap-1 text-[11px] font-bold bg-slate-800 text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-700"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Citizen App</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar for Desktop / Tablet */}
      <aside className={`
        ${mobileMenuOpen ? 'block' : 'hidden'} 
        md:block w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col justify-between border-r border-slate-800 z-20
      `}>
        <div className="p-5 space-y-6">
          
          {/* Logo & Portal Branding */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pcmc-600 flex items-center justify-center text-white shadow-md shadow-pcmc-600/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight block">PCMC Admin</span>
              <span className="text-[10px] text-slate-400 block">पिंपरी-चिंचवड महानगरपालिका</span>
            </div>
          </div>

          {/* Active Role Card */}
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider">
                ACTIVE DEMO ROLE
              </span>
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <select
              value={adminRole}
              onChange={(e) => onAdminRoleChange(e.target.value as UserRole)}
              className="w-full bg-slate-900 text-slate-200 text-xs p-2 rounded-xl border border-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="admin">Municipal Commissioner (Full)</option>
              <option value="ward_officer">Ward D Officer (Wakad / Saudagar)</option>
              <option value="field_worker">Field Inspector (PWD/Health)</option>
            </select>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id && !selectedComplaint;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setSelectedComplaint(null);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-pcmc-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="bg-amber-500 text-slate-900 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={onSwitchToCitizen}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700"
          >
            <Smartphone className="w-4 h-4 text-pcmc-400" />
            <span>Switch to Citizen App</span>
          </button>
          <div className="text-[10px] text-slate-500 text-center">
            PCMC Civic Ops v1.0 • Demo Prototype
          </div>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        
        {/* Render Complaint Detail View if one is selected */}
        {selectedComplaint ? (
          <AdminComplaintDetail
            language={language}
            complaint={selectedComplaint}
            adminRole={adminRole}
            onBack={() => setSelectedComplaint(null)}
            onComplaintUpdated={(updated) => {
              setSelectedComplaint(updated);
            }}
          />
        ) : (
          <>
            {activeTab === 'overview' && (
              <AdminOverview
                language={language}
                complaints={complaints}
                adminRole={adminRole}
                onNavigateTab={(tab) => setActiveTab(tab as any)}
                onSelectComplaint={(c) => setSelectedComplaint(c)}
              />
            )}

            {activeTab === 'inbox' && (
              <AdminInbox
                language={language}
                complaints={complaints}
                adminRole={adminRole}
                onSelectComplaint={(c) => setSelectedComplaint(c)}
              />
            )}

            {activeTab === 'notices' && (
              <AdminNotices
                language={language}
                notices={notices}
                adminRole={adminRole}
              />
            )}

            {activeTab === 'staff' && (
              <AdminStaff
                language={language}
                adminRole={adminRole}
              />
            )}

            {activeTab === 'reports' && (
              <AdminReports
                language={language}
                complaints={complaints}
                adminRole={adminRole}
              />
            )}

            {activeTab === 'audit' && (
              <AdminAuditLog
                language={language}
                auditLogs={auditLogs}
                adminRole={adminRole}
              />
            )}
          </>
        )}

      </main>

    </div>
  );
};
