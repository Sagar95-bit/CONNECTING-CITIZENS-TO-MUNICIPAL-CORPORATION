import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Trash2, 
  Droplets, 
  Lightbulb, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  X, 
  Navigation, 
  ShieldCheck, 
  Phone, 
  User, 
  Mail, 
  FileText,
  Building,
  Dog,
  HelpCircle,
  Image as ImageIcon
} from 'lucide-react';
import { Language, ComplaintCategory, Complaint } from '../../types';
import { translations } from '../../i18n/translations';
import { PCMC_LOCALITIES, CivicStore } from '../../services/store';

interface ComplaintFormProps {
  language: Language;
  defaultCategory?: ComplaintCategory;
  defaultLocality?: string;
  onSuccess: (complaint: Complaint) => void;
  onCancel: () => void;
}

const SAMPLE_DEMO_PHOTOS = [
  {
    name: 'Road Pothole',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    category: 'potholes'
  },
  {
    name: 'Overflowing Waste',
    url: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=600&q=80',
    category: 'garbage'
  },
  {
    name: 'Dark Streetlight',
    url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80',
    category: 'streetlights'
  },
  {
    name: 'Water Leakage',
    url: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80',
    category: 'water_leakage'
  }
];

export const ComplaintForm: React.FC<ComplaintFormProps> = ({
  language,
  defaultCategory = 'potholes',
  defaultLocality = 'Wakad',
  onSuccess,
  onCancel
}) => {
  const t = translations[language];

  // Form State
  const [category, setCategory] = useState<ComplaintCategory>(defaultCategory);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locality, setLocality] = useState(defaultLocality === 'All' ? 'Wakad' : defaultLocality);
  const [landmark, setLandmark] = useState('');
  const [citizenName, setCitizenName] = useState('Aniket Pawar');
  const [citizenPhone, setCitizenPhone] = useState('9822098765');
  const [citizenEmail, setCitizenEmail] = useState('aniket.pawar@demo.in');
  
  // Geolocation Demo
  const [coords, setCoords] = useState<{ lat: number; lng: number; addressString: string }>({
    lat: 18.5987,
    lng: 73.7684,
    addressString: 'Datta Mandir Road, Wakad, Pimpri-Chinchwad 411057'
  });
  const [gpsSimulated, setGpsSimulated] = useState(false);

  // Photo
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);

  // Status
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdComplaint, setCreatedComplaint] = useState<Complaint | null>(null);

  const categoriesConfig: { id: ComplaintCategory; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'potholes', label: t.cat_potholes, icon: AlertTriangle, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 'garbage', label: t.cat_garbage, icon: Trash2, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { id: 'drainage', label: t.cat_drainage, icon: Droplets, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { id: 'water_leakage', label: t.cat_water_leakage, icon: Droplets, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
    { id: 'streetlights', label: t.cat_streetlights, icon: Lightbulb, color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
    { id: 'encroachment', label: t.cat_encroachment, icon: Building, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { id: 'stray_animals', label: t.cat_stray_animals, icon: Dog, color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { id: 'other', label: t.cat_other, icon: HelpCircle, color: 'text-slate-600 bg-slate-50 border-slate-200' }
  ];

  // Detect Demo GPS based on selected locality
  const handleDetectGPS = () => {
    setGpsSimulated(true);
    const locObj = PCMC_LOCALITIES.find(l => l.name === locality) || PCMC_LOCALITIES[0];
    
    // Coordinates mapping for major PCMC areas
    const locMap: { [key: string]: [number, number] } = {
      'Wakad': [18.5987, 73.7684],
      'Pimple Saudagar': [18.5982, 73.7937],
      'Pimple Nilakh': [18.5828, 73.7844],
      'Chinchwad': [18.6322, 73.7915],
      'Ravet': [18.6473, 73.7438],
      'Pimpri': [18.6298, 73.8131],
      'Bhosari': [18.6276, 73.8427],
      'Akurdi': [18.6492, 73.7707],
      'Nigdi Pradhikaran': [18.6548, 73.7645],
      'Sangvi': [18.5772, 73.8188],
      'Moshi': [18.6756, 73.8488],
      'Dighi': [18.6186, 73.8765]
    };

    const coord = locMap[locality] || [18.6298, 73.8131];
    setCoords({
      lat: coord[0],
      lng: coord[1],
      addressString: `${locality} Sector Hub, ${locObj.ward}, Pimpri-Chinchwad`
    });

    setTimeout(() => {
      setGpsSimulated(false);
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) {
      errs.title = 'Please provide a short summary of the issue';
    }
    if (!description.trim() || description.length < 10) {
      errs.description = 'Please describe the issue in at least 10 characters';
    }
    if (!locality) {
      errs.locality = 'Please select a locality';
    }
    if (!citizenName.trim()) {
      errs.citizenName = 'Citizen name is required';
    }
    if (!citizenPhone.trim() || citizenPhone.length < 10) {
      errs.citizenPhone = 'Please enter a valid 10-digit mobile number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const locObj = PCMC_LOCALITIES.find(l => l.name === locality) || { name: locality, ward: 'Ward D' };

    // Auto-determine priority based on category
    const priority = (category === 'potholes' || category === 'drainage') ? 'Urgent' : 'Medium';

    setTimeout(() => {
      const newComplaint = CivicStore.createComplaint({
        title,
        description,
        category,
        locality,
        ward: locObj.ward,
        landmark: landmark || `${locality} Main Road`,
        coordinates: coords,
        photoUrl: photoUrl || undefined,
        citizenName,
        citizenPhone,
        citizenEmail,
        priority
      });

      setIsSubmitting(false);
      setCreatedComplaint(newComplaint);
    }, 600);
  };

  // If complaint created, show success modal
  if (createdComplaint) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 text-center space-y-6">
          
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {t.submissionSuccess}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-3">
              {t.ticketIdLabel}
            </h2>
            <div className="mt-2 inline-block px-5 py-2.5 rounded-2xl bg-slate-100 border border-slate-300 font-mono text-xl sm:text-2xl font-extrabold text-pcmc-800">
              {createdComplaint.id}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Save this reference number to track resolution or inquire via PCMC Sarathi helpline (8888 00 6666).
            </p>
          </div>

          {/* Details Summary Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Category:</span>
              <span className="font-semibold text-slate-800 capitalize">{createdComplaint.category.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Locality & Ward:</span>
              <span className="font-semibold text-slate-800">{createdComplaint.locality} ({createdComplaint.ward})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Citizen:</span>
              <span className="font-semibold text-slate-800">{createdComplaint.citizenName} ({createdComplaint.citizenPhone})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Initial Status:</span>
              <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Submitted (Pending Department Assignment)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onSuccess(createdComplaint)}
              className="flex-1 py-3 px-4 rounded-xl bg-pcmc-600 hover:bg-pcmc-700 text-white font-bold text-sm shadow-md transition"
            >
              {t.trackNow}
            </button>
            <button
              onClick={() => {
                setCreatedComplaint(null);
                setTitle('');
                setDescription('');
                setPhotoUrl('');
              }}
              className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition"
            >
              {t.fileAnother}
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-12">
      
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onCancel}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 flex items-center gap-1"
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {t.formTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t.formSub}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Category Selection */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-3">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            1. {t.selectCategory} <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {categoriesConfig.map((cat) => {
              const Icon = cat.icon;
              const isSelected = category === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition ${
                    isSelected
                      ? 'border-pcmc-600 bg-pcmc-50/70 ring-2 ring-pcmc-600/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 border ${cat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-bold ${isSelected ? 'text-pcmc-900' : 'text-slate-700'}`}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Issue Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-4">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            2. Issue Details & Description <span className="text-rose-500">*</span>
          </label>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              {t.issueTitle} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.issueTitlePlaceholder}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition ${
                errors.title ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500' : 'border-slate-200 focus:border-pcmc-500'
              }`}
            />
            {errors.title && <p className="text-[11px] text-rose-500 mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              {t.description} <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.descriptionPlaceholder}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition ${
                errors.description ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500' : 'border-slate-200 focus:border-pcmc-500'
              }`}
            />
            {errors.description && <p className="text-[11px] text-rose-500 mt-1">{errors.description}</p>}
          </div>
        </div>

        {/* Step 3: Locality & Geo-Location */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              3. Location & PCMC Ward <span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleDetectGPS}
              className="flex items-center gap-1.5 text-xs font-bold text-pcmc-700 bg-pcmc-50 hover:bg-pcmc-100 px-3 py-1.5 rounded-lg border border-pcmc-200 transition"
            >
              <Navigation className={`w-3.5 h-3.5 text-pcmc-600 ${gpsSimulated ? 'animate-spin' : ''}`} />
              <span>{t.detectLocation}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {t.locality} <span className="text-rose-500">*</span>
              </label>
              <select
                value={locality}
                onChange={(e) => {
                  setLocality(e.target.value);
                  // Update address preview
                  const locObj = PCMC_LOCALITIES.find(l => l.name === e.target.value);
                  if (locObj) {
                    setCoords(prev => ({
                      ...prev,
                      addressString: `${locObj.name} Main Road, ${locObj.ward}, Pimpri-Chinchwad`
                    }));
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-pcmc-500"
              >
                {PCMC_LOCALITIES.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name} ({loc.ward})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {t.landmark}
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder={t.landmarkPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-pcmc-500"
              />
            </div>
          </div>

          {/* Demo Map Pin Preview */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-pcmc-100 text-pcmc-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-pcmc-700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Demo Coordinates Selected</span>
                <span className="text-[11px] font-mono text-slate-500">
                  {coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° E
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {coords.addressString}
              </p>
            </div>
          </div>
        </div>

        {/* Step 4: Photo Attachment (File Upload or Demo Library) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              4. {t.photoUpload}
            </label>
            <span className="text-xs text-slate-500">Helps inspection team</span>
          </div>

          {photoUrl ? (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-h-52 bg-slate-900 group">
              <img src={photoUrl} alt="Complaint preview" className="w-full h-48 object-cover" />
              <button
                type="button"
                onClick={() => setPhotoUrl('')}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-rose-600 transition"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/60 text-white text-[11px] backdrop-blur-sm">
                Photo attached for inspection
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                
                {/* File input */}
                <label className="flex-1 border-2 border-dashed border-slate-200 hover:border-pcmc-400 rounded-2xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center bg-slate-50/50">
                  <Camera className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-xs font-bold text-slate-700">Upload or Snap Photo</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG supported</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Sample Demo Photos Picker button */}
                <button
                  type="button"
                  onClick={() => setShowPhotoPicker(!showPhotoPicker)}
                  className="flex-1 border border-slate-200 hover:border-pcmc-300 rounded-2xl p-4 text-center transition flex flex-col items-center justify-center bg-white"
                >
                  <ImageIcon className="w-6 h-6 text-pcmc-600 mb-1" />
                  <span className="text-xs font-bold text-slate-700">Pick Realistic Demo Photo</span>
                  <span className="text-[10px] text-pcmc-600 mt-0.5 font-medium">Select from 4 civic presets</span>
                </button>

              </div>

              {/* Photo presets selector */}
              {showPhotoPicker && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SAMPLE_DEMO_PHOTOS.map((sample) => (
                    <div
                      key={sample.name}
                      onClick={() => {
                        setPhotoUrl(sample.url);
                        setShowPhotoPicker(false);
                      }}
                      className="cursor-pointer group rounded-lg overflow-hidden border border-slate-200 hover:border-pcmc-500 transition relative"
                    >
                      <img src={sample.url} alt={sample.name} className="w-full h-20 object-cover group-hover:scale-105 transition" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                        <span className="text-[10px] font-semibold text-white">{sample.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Step 5: Citizen Contact Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-4">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            5. {t.contactInfo} <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {t.fullName} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-pcmc-500"
                />
              </div>
              {errors.citizenName && <p className="text-[11px] text-rose-500 mt-1">{errors.citizenName}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {t.phoneNumber} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  value={citizenPhone}
                  onChange={(e) => setCitizenPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-pcmc-500"
                />
              </div>
              {errors.citizenPhone && <p className="text-[11px] text-rose-500 mt-1">{errors.citizenPhone}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {t.email}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={citizenEmail}
                  onChange={(e) => setCitizenEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-pcmc-500"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Prototype notice: Demo contact info is stored locally and never transmitted to real servers.</span>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs sm:text-sm transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl bg-pcmc-600 hover:bg-pcmc-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-pcmc-600/30 flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t.submitting}</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                <span>{t.submitBtn}</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
