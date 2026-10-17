import React, { useState } from 'react';
import { AlertCircle, RefreshCw, Shield, Smartphone, Globe, Check } from 'lucide-react';
import { UserRole, Language } from '../../types';
import { CivicStore } from '../../services/store';

interface DemoBannerProps {
  currentView: 'citizen' | 'admin';
  onSwitchView: (view: 'citizen' | 'admin') => void;
  adminRole: UserRole;
  onAdminRoleChange: (role: UserRole) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  currentView,
  onSwitchView,
  adminRole,
  onAdminRoleChange,
  language,
  onLanguageChange
}) => {
  const [resetting, setResetting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all demo data to initial sample complaints, notices, and logs?")) {
      setResetting(true);
      CivicStore.resetToDefaults();
      setShowToast(true);
      setTimeout(() => {
        setResetting(false);
        setShowToast(false);
      }, 2000);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-14 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 text-sm border border-slate-700 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Demo data successfully reset to initial PCMC sample set!</span>
        </div>
      )}

      {/* Main Top Control Bar */}
      <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-3 sm:px-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Disclaimer tag */}
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 tracking-wide text-[11px]">
              <AlertCircle className="w-3 h-3 text-amber-400" />
              DEMO PROTOTYPE
            </span>
            <span className="text-slate-400 hidden sm:inline">
              Independent civic concept for Pimpri-Chinchwad Municipal Corporation. Not an official government app.
            </span>
          </div>

          {/* Controls: Switch View, Role, Language, Reset */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            
            {/* View Switcher Toggle */}
            <div className="bg-slate-800 p-0.5 rounded-lg border border-slate-700 flex items-center">
              <button
                onClick={() => onSwitchView('citizen')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition font-medium ${
                  currentView === 'citizen'
                    ? 'bg-pcmc-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Mobile-First Citizen App"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Citizen App</span>
              </button>

              <button
                onClick={() => onSwitchView('admin')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition font-medium ${
                  currentView === 'admin'
                    ? 'bg-pcmc-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Municipal Admin Portal"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>
            </div>

            {/* Admin Role Selector (when in Admin mode) */}
            {currentView === 'admin' && (
              <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md border border-slate-700">
                <span className="text-slate-400 hidden lg:inline">Role:</span>
                <select
                  value={adminRole}
                  onChange={(e) => onAdminRoleChange(e.target.value as UserRole)}
                  aria-label="Select demo admin role"
                  className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer text-xs"
                >
                  <option value="admin" className="bg-slate-800 text-slate-200">Commissioner / Admin</option>
                  <option value="ward_officer" className="bg-slate-800 text-slate-200">Ward Officer (Ward D)</option>
                  <option value="field_worker" className="bg-slate-800 text-slate-200">Field Inspector (PWD/Health)</option>
                </select>
              </div>
            )}

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md border border-slate-700">
              <Globe className="w-3 h-3 text-slate-400" />
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                  language === 'en' ? 'bg-pcmc-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('mr')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                  language === 'mr' ? 'bg-pcmc-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                  language === 'hi' ? 'bg-pcmc-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Reset Data Button */}
            <button
              onClick={handleReset}
              disabled={resetting}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
              title="Reset all complaints and notices to fresh demo data"
            >
              <RefreshCw className={`w-3 h-3 ${resetting ? 'animate-spin text-amber-400' : ''}`} />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
