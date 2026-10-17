import React from 'react';
import { Home, ClipboardList, PlusCircle, LayoutGrid, Bell, User } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface BottomNavProps {
  language: Language;
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadNoticesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  language,
  activeTab,
  onTabChange,
  unreadNoticesCount = 2
}) => {
  const t = translations[language];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        
        {/* Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition ${
            activeTab === 'home' ? 'text-pcmc-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5">{t.navHome}</span>
        </button>

        {/* Complaints */}
        <button
          onClick={() => onTabChange('complaints')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition ${
            activeTab === 'complaints' ? 'text-pcmc-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ClipboardList className={`w-5 h-5 ${activeTab === 'complaints' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5">{t.navComplaints}</span>
        </button>

        {/* Center Report Action */}
        <button
          onClick={() => onTabChange('report')}
          className="flex flex-col items-center -mt-5 group"
        >
          <div className="w-12 h-12 rounded-full bg-pcmc-600 group-hover:bg-pcmc-700 text-white flex items-center justify-center shadow-lg shadow-pcmc-600/30 border-2 border-white transition active:scale-95">
            <PlusCircle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold text-pcmc-700">{t.navReport}</span>
        </button>

        {/* Services */}
        <button
          onClick={() => onTabChange('services')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition ${
            activeTab === 'services' ? 'text-pcmc-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <LayoutGrid className={`w-5 h-5 ${activeTab === 'services' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5">{t.navServices}</span>
        </button>

        {/* Notices */}
        <button
          onClick={() => onTabChange('notices')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg relative transition ${
            activeTab === 'notices' ? 'text-pcmc-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Bell className={`w-5 h-5 ${activeTab === 'notices' ? 'stroke-[2.5]' : ''}`} />
            {unreadNoticesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">{t.navNotices}</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition ${
            activeTab === 'profile' ? 'text-pcmc-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5">{t.navProfile}</span>
        </button>

      </div>
    </nav>
  );
};
