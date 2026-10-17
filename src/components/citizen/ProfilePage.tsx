import React, { useState } from 'react';
import { 
  User, 
  Globe, 
  Bell, 
  ShieldCheck, 
  PhoneCall, 
  FileText, 
  ChevronRight, 
  HelpCircle, 
  AlertCircle,
  Building2,
  Check
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface ProfilePageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenEmergencyModal: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  language,
  onLanguageChange,
  onOpenEmergencyModal
}) => {
  const t = translations[language];

  // Demo settings states
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSaveSettings = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  const faqs = [
    {
      q: 'What is the standard resolution time for civic complaints in PCMC?',
      a: 'PCMC aims to resolve urgent issues (potholes on major roads, major water leaks, dead animal clearance) within 24-48 hours. Routine civil work may take 3-7 days depending on site inspection.'
    },
    {
      q: 'How does the PCMC Sarathi helpline assist citizens?',
      a: 'PCMC Sarathi (8888 00 6666) is the official 24x7 citizen contact center providing information on 250+ civic services, complaints registration, and status follow-ups.'
    },
    {
      q: 'Which administrative ward covers my area in Pimpri-Chinchwad?',
      a: 'PCMC is divided into 8 administrative zones: Ward A (Nigdi, Akurdi), Ward B (Chinchwad, Ravet), Ward C (Bhosari), Ward D (Wakad, Pimple Saudagar), Ward E (Dighi, Charholi), Ward F (Moshi, Chikhali), Ward G (Pimpri, Rahatani), and Ward H (Sangvi, Dapodi).'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-12 space-y-6">
      
      {/* Toast Notification */}
      {showSavedToast && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 text-xs border border-slate-700 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Demo preferences updated successfully!</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {t.profileTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage your interface language, simulated notifications, and explore civic assistance.
        </p>
      </div>

      {/* Citizen Card (Demo) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-pcmc-50 text-pcmc-700 border border-pcmc-200 flex items-center justify-center font-bold text-xl">
            <User className="w-7 h-7 text-pcmc-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Aniket Pawar</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pcmc-100 text-pcmc-800">
                Citizen Account (Demo)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              +91 98220 98765 • aniket.pawar@demo.in
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Primary Locality: Wakad (Ward D), Pimpri-Chinchwad
            </p>
          </div>
        </div>

        <button
          onClick={onOpenEmergencyModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition flex-shrink-0"
        >
          <PhoneCall className="w-4 h-4 text-rose-600" />
          <span>Emergency Contacts</span>
        </button>
      </div>

      {/* Language Preference Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Globe className="w-5 h-5 text-pcmc-600" />
          <div>
            <h3 className="font-bold text-sm text-slate-900">{t.languageSetting}</h3>
            <p className="text-xs text-slate-500">Switch application language across Marathi, English, and Hindi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onLanguageChange('en')}
            className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
              language === 'en'
                ? 'border-pcmc-600 bg-pcmc-50/70 font-bold ring-2 ring-pcmc-600/30'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <span className="block text-sm text-slate-900">English</span>
              <span className="text-[11px] text-slate-500 font-normal">Standard System Interface</span>
            </div>
            {language === 'en' && <Check className="w-4 h-4 text-pcmc-600" />}
          </button>

          <button
            onClick={() => onLanguageChange('mr')}
            className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
              language === 'mr'
                ? 'border-pcmc-600 bg-pcmc-50/70 font-bold ring-2 ring-pcmc-600/30'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <span className="block text-sm text-slate-900">मराठी (Marathi)</span>
              <span className="text-[11px] text-slate-500 font-normal">स्थानिक राज्यभाषा</span>
            </div>
            {language === 'mr' && <Check className="w-4 h-4 text-pcmc-600" />}
          </button>

          <button
            onClick={() => onLanguageChange('hi')}
            className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
              language === 'hi'
                ? 'border-pcmc-600 bg-pcmc-50/70 font-bold ring-2 ring-pcmc-600/30'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <span className="block text-sm text-slate-900">हिंदी (Hindi)</span>
              <span className="text-[11px] text-slate-500 font-normal">राष्ट्रभाषा</span>
            </div>
            {language === 'hi' && <Check className="w-4 h-4 text-pcmc-600" />}
          </button>
        </div>

        <p className="text-[11px] text-slate-400 italic">
          {t.translationNotice}
        </p>
      </div>

      {/* Notification Preferences (Demo) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Bell className="w-5 h-5 text-pcmc-600" />
          <div>
            <h3 className="font-bold text-sm text-slate-900">Simulated Notification Preferences</h3>
            <p className="text-xs text-slate-500">Configure how you receive ticket status milestones</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-800 block">SMS Alerts on Status Changes</span>
              <span className="text-[11px] text-slate-500">Receive SMS whenever an officer updates your ticket.</span>
            </div>
            <button
              onClick={() => {
                setSmsEnabled(!smsEnabled);
                handleSaveSettings();
              }}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                smsEnabled ? 'bg-pcmc-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                smsEnabled ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-800 block">Email Resolution Reports</span>
              <span className="text-[11px] text-slate-500">Receive formal completion certificate via email upon resolution.</span>
            </div>
            <button
              onClick={() => {
                setEmailEnabled(!emailEnabled);
                handleSaveSettings();
              }}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                emailEnabled ? 'bg-pcmc-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                emailEnabled ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <HelpCircle className="w-5 h-5 text-pcmc-600" />
          <div>
            <h3 className="font-bold text-sm text-slate-900">{t.helpAndFaq}</h3>
            <p className="text-xs text-slate-500">Key civic procedures and administrative guidelines</p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-pcmc-100 text-pcmc-800 text-[10px] flex items-center justify-center font-bold">
                  Q
                </span>
                {faq.q}
              </h4>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prototype & Privacy Disclaimer Notice */}
      <div className="bg-slate-900 text-slate-300 rounded-3xl p-6 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <AlertCircle className="w-5 h-5" />
          <span>{t.privacyDisclaimer}</span>
        </div>
        <p className="text-xs leading-relaxed text-slate-400">
          {t.privacyText}
        </p>
        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span>PCMC Citizen Connect • Academic & Concept Prototype</span>
          <span>Version 1.0-prototype</span>
        </div>
      </div>

    </div>
  );
};
