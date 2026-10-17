import React from 'react';
import { Shield, ShieldAlert, ArrowRight, UserCheck, Briefcase, HardHat } from 'lucide-react';
import { UserRole, Language } from '../../types';
import { translations } from '../../i18n/translations';

interface AdminLoginProps {
  language: Language;
  onLogin: (role: UserRole) => void;
  onBackToCitizen: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  language,
  onLogin,
  onBackToCitizen
}) => {
  const t = translations[language];

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 text-center relative">
          <div className="w-14 h-14 rounded-2xl bg-pcmc-600/30 border border-pcmc-500/40 mx-auto flex items-center justify-center mb-3">
            <Shield className="w-7 h-7 text-pcmc-400" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
            SIMULATED DEMO LOGIN
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            PCMC Municipal Admin Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Grievance Redressal & Operations Management Console
          </p>
        </div>

        {/* Demo Notice */}
        <div className="p-4 bg-amber-50 border-b border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <p>
            <strong>{t.demoAccessNote}</strong> This portal demonstrates municipal staff workflows (ticket assignment, SLA tracking, internal notes). No real credentials or government intranet access required.
          </p>
        </div>

        {/* Role Selection */}
        <div className="p-6 sm:p-8 space-y-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            {t.adminRoleSelector}
          </label>

          <div className="space-y-3">
            
            {/* Role 1: Municipal Administrator */}
            <button
              onClick={() => onLogin('admin')}
              className="w-full p-4 rounded-2xl border border-slate-200 hover:border-pcmc-500 hover:bg-pcmc-50/40 text-left transition flex items-center justify-between group shadow-subtle"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-pcmc-700 transition">
                      Municipal Commissioner / Admin
                    </h3>
                    <span className="text-[10px] font-extrabold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                      Full Access
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    City-wide analytics, all wards, audit logs, staff management
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-pcmc-600 group-hover:translate-x-1 transition flex-shrink-0" />
            </button>

            {/* Role 2: Ward Officer */}
            <button
              onClick={() => onLogin('ward_officer')}
              className="w-full p-4 rounded-2xl border border-slate-200 hover:border-pcmc-500 hover:bg-pcmc-50/40 text-left transition flex items-center justify-between group shadow-subtle"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-pcmc-700 transition">
                      Ward Officer (Ward D - Wakad & Saudagar)
                    </h3>
                    <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      Zonal Lead
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Grievance assignment, ward status updates, notices publishing
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-pcmc-600 group-hover:translate-x-1 transition flex-shrink-0" />
            </button>

            {/* Role 3: Field Inspector */}
            <button
              onClick={() => onLogin('field_worker')}
              className="w-full p-4 rounded-2xl border border-slate-200 hover:border-pcmc-500 hover:bg-pcmc-50/40 text-left transition flex items-center justify-between group shadow-subtle"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                  <HardHat className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-pcmc-700 transition">
                      Junior Engineer / Field Inspector
                    </h3>
                    <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      Field Redressal
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    On-ground inspection, internal notes, resolution closure
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-pcmc-600 group-hover:translate-x-1 transition flex-shrink-0" />
            </button>

          </div>

          <div className="pt-4 text-center">
            <button
              onClick={onBackToCitizen}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
            >
              &larr; Return to Citizen Interface
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
