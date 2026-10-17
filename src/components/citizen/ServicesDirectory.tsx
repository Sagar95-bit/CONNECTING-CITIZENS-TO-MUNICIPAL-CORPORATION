import React, { useState } from 'react';
import { 
  Building2, 
  Droplets, 
  FileText, 
  Trash2, 
  Store, 
  Compass, 
  Search, 
  Clock, 
  Coins, 
  CheckCircle2, 
  FileCheck, 
  X, 
  Calculator, 
  ArrowRight,
  ShieldCheck,
  Download,
  AlertCircle
} from 'lucide-react';
import { Language, CivicService } from '../../types';
import { translations } from '../../i18n/translations';
import { CIVIC_SERVICES, PCMC_LOCALITIES } from '../../services/store';

interface ServicesDirectoryProps {
  language: Language;
}

export const ServicesDirectory: React.FC<ServicesDirectoryProps> = ({ language }) => {
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalService, setActiveModalService] = useState<CivicService | null>(null);

  // Property Tax Calculator Demo State
  const [taxPropertyType, setTaxPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [taxLocality, setTaxLocality] = useState('Wakad');
  const [taxAreaSqFt, setTaxAreaSqFt] = useState('850');
  const [calculatedTax, setCalculatedTax] = useState<{ gross: number; rebate: number; net: number } | null>(null);
  const [receiptGenerated, setReceiptGenerated] = useState(false);

  // Birth Certificate Search Demo State
  const [certSearchNo, setCertSearchNo] = useState('PCMC-B-2024-9182');
  const [certRecord, setCertRecord] = useState<{
    regNo: string;
    childName: string;
    dob: string;
    hospital: string;
    motherName: string;
    fatherName: string;
  } | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return Building2;
      case 'Droplets': return Droplets;
      case 'FileText': return FileText;
      case 'Trash2': return Trash2;
      case 'Store': return Store;
      case 'Compass': return Compass;
      default: return FileText;
    }
  };

  const filteredServices = CIVIC_SERVICES.filter(service => {
    const matchesSearch = searchQuery === '' ||
      service.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.title.mr.includes(searchQuery) ||
      service.description.en.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'all' || service.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const handleCalculateTax = () => {
    const sqft = parseFloat(taxAreaSqFt) || 850;
    const ratePerSqFt = taxPropertyType === 'residential' ? 6.5 : 14.0;
    const annualValuation = sqft * ratePerSqFt * 12;
    const grossTax = Math.round(annualValuation * 0.08);
    const rebate = Math.round(grossTax * 0.10); // 10% early bird rebate
    const netTax = grossTax - rebate;
    setCalculatedTax({ gross: grossTax, rebate, net: netTax });
  };

  const handleSearchCertificate = () => {
    setCertRecord({
      regNo: certSearchNo || 'PCMC-B-2024-9182',
      childName: 'Aarav Patil',
      dob: '14 August 2024',
      hospital: 'Yashwantrao Chavan Memorial Hospital (YCMH), Pimpri',
      motherName: 'Sunita Patil',
      fatherName: 'Sachin Patil'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-12 space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {t.servicesTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          {t.servicesSub}
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.serviceSearch}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-pcmc-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'tax', label: 'Property Tax' },
            { id: 'water', label: 'Water Services' },
            { id: 'certificates', label: 'Certificates' },
            { id: 'sanitation', label: 'Waste & Sanitation' },
            { id: 'trade', label: 'Trade Licenses' },
            { id: 'building', label: 'Building Plans' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-pcmc-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => {
          const Icon = getServiceIcon(service.icon);
          return (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-pcmc-300 hover:shadow-card transition p-5 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-pcmc-50 text-pcmc-700 border border-pcmc-200 flex items-center justify-center group-hover:bg-pcmc-600 group-hover:text-white transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  {service.isDemoInteractive ? (
                    <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      Interactive Tool
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      Information
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-pcmc-700 transition">
                    {service.title[language] || service.title.en}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                    {service.description[language] || service.description.en}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      {t.processingTime}:
                    </span>
                    <span className="font-semibold text-slate-700">{service.processingTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Coins className="w-3.5 h-3.5" />
                      {t.fees}:
                    </span>
                    <span className="font-semibold text-slate-700 truncate max-w-[150px]">{service.fees}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveModalService(service)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-pcmc-50 text-slate-700 hover:text-pcmc-700 border border-slate-200 hover:border-pcmc-200 font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <span>{service.isDemoInteractive ? t.applyDemo : 'View Requirements & Guidelines'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Interactive Detail & Tool Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pcmc-600 flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">
                    {activeModalService.title[language] || activeModalService.title.en}
                  </h3>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    DEMO MUNICIPAL SERVICE WORKFLOW
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveModalService(null);
                  setCalculatedTax(null);
                  setReceiptGenerated(false);
                }}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Description & Overview */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Service Description
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {activeModalService.description[language] || activeModalService.description.en}
                </p>
              </div>

              {/* Requirements & Documents */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t.requiredDocs}
                </h4>
                <div className="space-y-1.5">
                  {activeModalService.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* If Property Tax Service: Show Interactive Tax Calculator Simulator */}
              {activeModalService.id === 'srv_prop_tax' && (
                <div className="p-5 rounded-2xl bg-pcmc-50/50 border border-pcmc-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-pcmc-600" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{t.demoToolPropertyTax}</h4>
                      <p className="text-[11px] text-slate-500">Includes 10% Early Bird Rebate rule under PCMC 2026-27 policy</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Property Type</label>
                      <select
                        value={taxPropertyType}
                        onChange={(e) => setTaxPropertyType(e.target.value as any)}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                      >
                        <option value="residential">Residential Apartment</option>
                        <option value="commercial">Commercial Shop</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Locality</label>
                      <select
                        value={taxLocality}
                        onChange={(e) => setTaxLocality(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                      >
                        {PCMC_LOCALITIES.slice(0, 10).map(l => (
                          <option key={l.name} value={l.name}>{l.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Carpet Area (Sq.Ft)</label>
                      <input
                        type="number"
                        value={taxAreaSqFt}
                        onChange={(e) => setTaxAreaSqFt(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleCalculateTax}
                    className="w-full py-2.5 rounded-xl bg-pcmc-600 hover:bg-pcmc-700 text-white font-bold text-xs shadow-sm transition"
                  >
                    Calculate Property Tax & Concession
                  </button>

                  {calculatedTax && (
                    <div className="p-4 rounded-xl bg-white border border-pcmc-200 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Standard Annual Property Tax:</span>
                        <span className="font-semibold">₹{calculatedTax.gross.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-emerald-600">
                        <span>Early Bird 10% Rebate (Online):</span>
                        <span className="font-bold">- ₹{calculatedTax.rebate.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                        <span>Net Payable Amount:</span>
                        <span className="text-pcmc-800">₹{calculatedTax.net.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="pt-3">
                        {receiptGenerated ? (
                          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-2">
                            <span className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              Demo Receipt #PCMC-TX-2026-9812 Generated
                            </span>
                            <p className="text-[10px] text-slate-500">
                              Simulated paid status for {taxLocality} property ({taxAreaSqFt} sq.ft).
                            </p>
                          </div>
                        ) : (
                          <button
                            onClick={() => setReceiptGenerated(true)}
                            className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Simulate Online Payment & Download Demo Receipt</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* If Birth Certificate Service: Show Verification Checker */}
              {activeModalService.id === 'srv_birth_cert' && (
                <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{t.demoToolBirthCert}</h4>
                      <p className="text-[11px] text-slate-500">Search PCMC institutional records database (Demo)</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={certSearchNo}
                      onChange={(e) => setCertSearchNo(e.target.value)}
                      placeholder="e.g. PCMC-B-2024-9182"
                      className="flex-1 p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none"
                    />
                    <button
                      onClick={handleSearchCertificate}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition"
                    >
                      Search Record
                    </button>
                  </div>

                  {certRecord && (
                    <div className="p-4 rounded-xl bg-white border border-indigo-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="font-mono font-bold text-indigo-700">{certRecord.regNo}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Digitally Verified
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-600">
                        <div>Child Name: <strong className="text-slate-800">{certRecord.childName}</strong></div>
                        <div>Date of Birth: <strong className="text-slate-800">{certRecord.dob}</strong></div>
                        <div>Mother Name: <strong className="text-slate-800">{certRecord.motherName}</strong></div>
                        <div>Father Name: <strong className="text-slate-800">{certRecord.fatherName}</strong></div>
                      </div>
                      <div className="text-[11px] text-slate-500 pt-1">
                        Place of Birth: <strong>{certRecord.hospital}</strong>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Prototype Limitations Notice */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-amber-800 text-xs">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Prototype Simulation:</strong> No actual municipal payments are charged and no official government certificates are granted. This interactive flow demonstrates the end-to-end citizen experience.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setActiveModalService(null);
                  setCalculatedTax(null);
                  setReceiptGenerated(false);
                }}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition"
              >
                Close Modal
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
