import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  User, 
  Clock, 
  CheckCircle, 
  Star, 
  AlertTriangle, 
  Trash2, 
  Droplets, 
  Lightbulb, 
  Building, 
  Dog, 
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Language, Complaint, ComplaintCategory } from '../../types';
import { translations } from '../../i18n/translations';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { CivicStore } from '../../services/store';

interface ComplaintDetailProps {
  language: Language;
  complaint: Complaint;
  onBack: () => void;
  onUpdateComplaint: (updated: Complaint) => void;
}

export const ComplaintDetail: React.FC<ComplaintDetailProps> = ({
  language,
  complaint,
  onBack,
  onUpdateComplaint
}) => {
  const t = translations[language];

  // Feedback Form State
  const [rating, setRating] = useState<number>(complaint.feedback?.rating || 5);
  const [comment, setComment] = useState<string>(complaint.feedback?.comment || '');
  const [feedbackSaved, setFeedbackSaved] = useState<boolean>(!!complaint.feedback);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const getCategoryIcon = (cat: ComplaintCategory) => {
    switch (cat) {
      case 'potholes': return AlertTriangle;
      case 'garbage': return Trash2;
      case 'drainage': return Droplets;
      case 'water_leakage': return Droplets;
      case 'streetlights': return Lightbulb;
      case 'encroachment': return Building;
      case 'stray_animals': return Dog;
      default: return HelpCircle;
    }
  };

  const Icon = getCategoryIcon(complaint.category);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    setTimeout(() => {
      CivicStore.addFeedback(complaint.id, rating, comment);
      setFeedbackSaved(true);
      setSubmittingFeedback(false);

      // Refresh local complaint state
      const refreshed = CivicStore.getComplaintById(complaint.id);
      if (refreshed) {
        onUpdateComplaint(refreshed);
      }
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-12 space-y-6">
      
      {/* Top back navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Complaints</span>
      </button>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-pcmc-50 text-pcmc-700 border border-pcmc-200 flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-extrabold text-pcmc-800 bg-pcmc-50 px-2.5 py-1 rounded-lg border border-pcmc-200">
                  {complaint.id}
                </span>
                <PriorityBadge priority={complaint.priority} />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                {complaint.title}
              </h1>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2">
            <StatusBadge status={complaint.status} />
            <span className="text-[11px] text-slate-400">
              Submitted: {complaint.createdAt}
            </span>
          </div>
        </div>

        {/* Description & Location Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="md:col-span-2 space-y-2">
            <h3 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Grievance Description
            </h3>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
              {complaint.description}
            </p>

            {/* Public Resolution Notes if available */}
            {complaint.publicResolutionNotes && (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 mt-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Official Resolution Remark:</span>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm">
                  {complaint.publicResolutionNotes}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Location & Jurisdiction
            </h3>

            <div className="space-y-2 text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-pcmc-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">{complaint.locality}</strong> ({complaint.ward})
                  <p className="text-[11px] text-slate-500 mt-0.5">{complaint.landmark}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                GPS: {complaint.coordinates.lat.toFixed(4)}° N, {complaint.coordinates.lng.toFixed(4)}° E
              </div>
            </div>

            {/* Assigned Department summary */}
            <div className="pt-3 border-t border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {t.assignedToDept}
              </span>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <Building2 className="w-4 h-4 text-pcmc-600" />
                <span>{complaint.assignedDepartment || 'Pending Assignment'}</span>
              </div>
              {complaint.assignedStaffName && (
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Officer: {complaint.assignedStaffName}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Attached Photo Viewer */}
        {complaint.photoUrl && (
          <div className="pt-4 border-t border-slate-100">
            <h3 className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2">
              Attached Inspection Photo (Demo)
            </h3>
            <div className="rounded-2xl overflow-hidden border border-slate-200 max-w-md bg-slate-900">
              <img
                src={complaint.photoUrl}
                alt="Complaint evidence"
                className="w-full h-56 object-cover"
              />
            </div>
          </div>
        )}

      </div>

      {/* Resolution Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Clock className="w-5 h-5 text-pcmc-600" />
          <h2 className="font-bold text-base text-slate-900">{t.timelineTitle}</h2>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {complaint.timeline.map((event, idx) => {
            const isLatest = idx === complaint.timeline.length - 1;
            return (
              <div key={event.id || idx} className="relative group">
                {/* Timeline node */}
                <span className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${
                  isLatest ? 'bg-pcmc-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                </span>

                <div className="bg-slate-50 hover:bg-slate-100/70 p-3.5 rounded-2xl border border-slate-100 transition space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-xs text-slate-800">
                      {event.status}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {event.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {event.notes}
                  </p>
                  <div className="text-[10px] text-slate-400 font-medium">
                    Updated by: {event.updatedBy}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Citizen Feedback Form (Available when Resolved) */}
      {complaint.status === 'Resolved' && (
        <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="font-bold text-base text-slate-900">{t.citizenFeedbackTitle}</h2>
              <p className="text-xs text-slate-500">Your feedback helps improve PCMC municipal service quality.</p>
            </div>
          </div>

          {feedbackSaved ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800">
                  {t.feedbackSubmitted}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= (complaint.feedback?.rating || rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-600 italic">
                "{complaint.feedback?.comment || comment}"
              </p>
              <span className="text-[10px] text-slate-400 block">
                Recorded on {complaint.feedback?.submittedAt || 'Today'}
              </span>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {t.rateService}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 rounded-lg transition hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {rating} out of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Comments or Suggestions
                </label>
                <textarea
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.feedbackPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-pcmc-500"
                />
              </div>

              <button
                type="submit"
                disabled={submittingFeedback}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submittingFeedback ? 'Saving...' : t.submitFeedback}</span>
              </button>
            </form>
          )}

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Audited under PCMC Sarathi Grievance Quality Framework</span>
          </div>
        </div>
      )}

    </div>
  );
};
