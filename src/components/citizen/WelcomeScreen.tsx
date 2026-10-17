import React from 'react';
import { Landmark, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface WelcomeScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onGetStarted: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  language,
  onLanguageChange,
  onGetStarted
}) => {
  const t = translations[language];

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Banner with PCMC Civic Green */}
        <div className="bg-gradient-to-br from-pcmc-700 via-pcmc-600 to-pcmc-800 text-white p-6 sm:p-8 text-center relative">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center mb-4 shadow-inner">
            <Landmark className="w-8 h-8 text-white" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30 mb-2">
            पिंपरी-चिंचवड महानगरपालिका
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.appName}
          </h1>
          <p className="text-pcmc-100 text-sm mt-1 max-w-md mx-auto">
            {t.subTitle}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Language Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t.languageSetting} / भाषा निवडा
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`py-3 px-3 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                  language === 'en'
                    ? 'border-pcmc-600 bg-pcmc-50/70 text-pcmc-900 font-bold ring-2 ring-pcmc-600/30'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-base font-bold">English</span>
                <span className="text-[11px] text-slate-500 font-normal">Default</span>
              </button>

              <button
                type="button"
                onClick={() => onLanguageChange('mr')}
                className={`py-3 px-3 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                  language === 'mr'
                    ? 'border-pcmc-600 bg-pcmc-50/70 text-pcmc-900 font-bold ring-2 ring-pcmc-600/30'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-base font-bold">मराठी</span>
                <span className="text-[11px] text-slate-500 font-normal">महाराष्ट्र शासन</span>
              </button>

              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`py-3 px-3 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                  language === 'hi'
                    ? 'border-pcmc-600 bg-pcmc-50/70 text-pcmc-900 font-bold ring-2 ring-pcmc-600/30'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-base font-bold">हिंदी</span>
                <span className="text-[11px] text-slate-500 font-normal">राष्ट्रभाषा</span>
              </button>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  {language === 'mr' ? 'जलद नागरी तक्रार नोंदणी' : language === 'hi' ? 'त्वरित नागरिक शिकायत पंजीकरण' : 'Fast Civic Complaint Filing'}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'mr' ? 'खड्डे, कचरा, पाणी गळती यांसारख्या समस्या फोटो व स्थानासह नोंदवा.' : language === 'hi' ? 'सड़क, कचरा, स्ट्रीट लाइट समस्याओं की फोटो सहित रिपोर्ट करें।' : 'Report potholes, garbage, or water leaks with photos and GPS.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  {language === 'mr' ? 'थेट पारदर्शक निवारण ट्रॅकिंग' : language === 'hi' ? 'पारदर्शी निवारण ट्रैकिंग' : 'Transparent Real-Time Tracking'}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'mr' ? 'तिकीट क्रमांकाद्वारे तक्रारीची स्थिती व नियुक्त अधिकारी पहा.' : language === 'hi' ? 'टिकट नंबर से शिकायत की लाइव स्थिति और समयसीमा देखें।' : 'Track officer assignment, progress updates, and provide feedback.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  {language === 'mr' ? 'महापालिका सेवा व डेमो कॅल्क्युलेटर' : language === 'hi' ? 'निगम सेवाएं व डेमो कैलकुलेटर' : 'Municipal Services & Calculators'}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'mr' ? 'मालमत्ता कर, पाणी बिल, जन्म प्रमाणपत्र मार्गदर्शक.' : language === 'hi' ? 'संपत्ति कर, जल कनेक्शन, जन्म प्रमाण पत्र जानकारी।' : 'Explore Property Tax rebates, water guidelines, and certificate status.'}
                </p>
              </div>
            </div>
          </div>

          {/* Prototype Notice */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
            <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
              {t.disclaimerBanner}
            </p>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={onGetStarted}
            className="w-full py-3.5 px-6 rounded-xl bg-pcmc-600 hover:bg-pcmc-700 text-white font-bold text-sm shadow-md shadow-pcmc-600/30 flex items-center justify-center gap-2 transition active:scale-[0.99]"
          >
            <span>{language === 'mr' ? 'सुरू करा' : language === 'hi' ? 'प्रारंभ करें' : 'Get Started'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};
