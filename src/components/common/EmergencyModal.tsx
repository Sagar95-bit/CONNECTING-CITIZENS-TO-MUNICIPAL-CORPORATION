import React from 'react';
import { X, Phone, AlertTriangle, ShieldCheck, Flame, HeartPulse, Building } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;
  const t = translations[language];

  const emergencyContacts = [
    {
      title: 'PCMC Sarathi Civic Helpline',
      subtitle: 'Central Citizen Grievance & Information Desk',
      phone: '8888006666',
      icon: Phone,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: '24x7 Available'
    },
    {
      title: 'Disaster Management Control Room',
      subtitle: 'Floods, Tree Falls, Building Collapse',
      phone: '020-27425511',
      icon: AlertTriangle,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      badge: 'Emergency'
    },
    {
      title: 'PCMC Fire Brigade Control',
      subtitle: 'Fire Hazards & Rescue Operations',
      phone: '101',
      icon: Flame,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      badge: 'Immediate Response'
    },
    {
      title: 'Emergency Medical & Ambulance',
      subtitle: 'Government 108 Ambulance Network',
      phone: '108',
      icon: HeartPulse,
      color: 'bg-red-50 text-red-700 border-red-200',
      badge: 'Life Support'
    },
    {
      title: 'Yashwantrao Chavan Memorial (YCM) Hospital',
      subtitle: 'PCMC Central Municipal Multi-Speciality Hospital, Pimpri',
      phone: '020-27422201',
      icon: Building,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      badge: 'Casualty / ICU'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">{t.emergencyHelplines}</h3>
              <p className="text-xs text-slate-400">Pimpri-Chinchwad Municipal Corporation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close emergency modal"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 sm:p-6 space-y-3 max-h-[70vh] overflow-y-auto">
          <p className="text-xs text-slate-500">
            Tap any telephone number to initiate a call during civic or medical emergencies in PCMC jurisdiction.
          </p>

          {emergencyContacts.map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-pcmc-300 hover:shadow-subtle transition flex items-center justify-between gap-3 bg-slate-50/50"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${contact.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-slate-900">{contact.title}</h4>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {contact.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{contact.subtitle}</p>
                  </div>
                </div>

                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pcmc-600 hover:bg-pcmc-700 text-white text-xs font-bold transition flex-shrink-0 active:scale-95 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{contact.phone}</span>
                </a>
              </div>
            );
          })}

          <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>PCMC Sarathi 24x7 Citizen Assistance Centre</span>
          </div>
        </div>

      </div>
    </div>
  );
};
