import React from 'react';
import { Landmark, MapPin, PhoneCall, PlusCircle } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { PCMC_LOCALITIES } from '../../services/store';

interface HeaderProps {
  language: Language;
  selectedLocality: string;
  onLocalityChange: (locality: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenEmergencyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  selectedLocality,
  onLocalityChange,
  activeTab,
  onTabChange,
  onOpenEmergencyModal
}) => {
  const t = translations[language];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-10 sm:top-9 z-30 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Civic Branding */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => onTabChange('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-pcmc-600 flex items-center justify-center text-white shadow-md shadow-pcmc-600/20 flex-shrink-0">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight leading-none">
                  PCMC Connect
                </span>
                <span className="text-[10px] bg-pcmc-100 text-pcmc-800 font-semibold px-1.5 py-0.5 rounded">
                  नागरी सेवा
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Pimpri-Chinchwad Municipal Corporation
              </p>
            </div>
          </div>

          {/* Center: Locality Quick Picker */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-full border border-slate-200 transition text-xs">
              <MapPin className="w-3.5 h-3.5 text-pcmc-600" />
              <select
                value={selectedLocality}
                onChange={(e) => onLocalityChange(e.target.value)}
                aria-label="Select locality"
                className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer text-xs"
              >
                <option value="All">{t.allLocalities}</option>
                {PCMC_LOCALITIES.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name} ({loc.ward})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Emergency Helplines Pill */}
            <button
              onClick={onOpenEmergencyModal}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition text-xs font-semibold"
              title="View PCMC Emergency Helplines"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
              <span>Sarathi 8888006666</span>
            </button>
          </div>

          {/* Right Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => onTabChange('home')}
              className={`px-3 py-2 rounded-lg transition ${
                activeTab === 'home'
                  ? 'text-pcmc-700 bg-pcmc-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.navHome}
            </button>
            <button
              onClick={() => onTabChange('complaints')}
              className={`px-3 py-2 rounded-lg transition ${
                activeTab === 'complaints'
                  ? 'text-pcmc-700 bg-pcmc-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.navComplaints}
            </button>
            <button
              onClick={() => onTabChange('services')}
              className={`px-3 py-2 rounded-lg transition ${
                activeTab === 'services'
                  ? 'text-pcmc-700 bg-pcmc-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.navServices}
            </button>
            <button
              onClick={() => onTabChange('notices')}
              className={`px-3 py-2 rounded-lg transition ${
                activeTab === 'notices'
                  ? 'text-pcmc-700 bg-pcmc-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.navNotices}
            </button>
            <button
              onClick={() => onTabChange('profile')}
              className={`px-3 py-2 rounded-lg transition ${
                activeTab === 'profile'
                  ? 'text-pcmc-700 bg-pcmc-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.navProfile}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onTabChange('report')}
              className="ml-2 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-pcmc-600 hover:bg-pcmc-700 text-white shadow-sm font-semibold text-xs tracking-wide transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.reportBtn}</span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};
