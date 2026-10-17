import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Building2, 
  Clock, 
  Lock, 
  Globe, 
  CheckCircle2, 
  Save, 
  AlertTriangle,
  FileText,
  ShieldAlert
} from 'lucide-react';
import { Complaint, UserRole, Language, ComplaintStatus } from '../../types';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { INITIAL_DEPARTMENTS, INITIAL_STAFF, CivicStore } from '../../services/store';

interface AdminComplaintDetailProps {
  language: Language;
  complaint: Complaint;
  adminRole: UserRole;
  onBack: () => void;
  onComplaintUpdated: (complaint: Complaint) => void;
}

export const AdminComplaintDetail: React.FC<AdminComplaintDetailProps> = ({
  complaint,
  adminRole,
  onBack,
  onComplaintUpdated
}) => {
  // Editable form state
  const [status, setStatus] = useState<ComplaintStatus>(complaint.status);
  const [department, setDepartment] = useState<string>(complaint.assignedDepartment || INITIAL_DEPARTMENTS[0].name.en);
  const [selectedStaffId, setSelectedStaffId] = useState<string>(complaint.assignedStaffId || INITIAL_STAFF[0].id);
  const [publicNote, setPublicNote] = useState<string>(complaint.publicResolutionNotes || '');
  const [newInternalNote, setNewInternalNote] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Filter staff by department
  const availableStaff = INITIAL_STAFF;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const staffMember = availableStaff.find(s => s.id === selectedStaffId) || availableStaff[0];

    const currentRoleName = adminRole === 'admin' 
      ? 'Executive Admin' 
      : adminRole === 'ward_officer' 
        ? 'Ward Officer More' 
        : 'Field Engr. Shinde';

    setTimeout(() => {
      // 1. Assign complaint
      CivicStore.assignComplaint(
        complaint.id,
        department,
        staffMember.id,
        staffMember.name,
        currentRoleName
      );

      // 2. Update status and notes
      CivicStore.updateComplaintStatus(
        complaint.id,
        status,
        publicNote,
        newInternalNote.trim() ? newInternalNote : undefined,
        currentRoleName
      );

      setIsSaving(false);
      setShowSavedToast(true);

      const refreshed = CivicStore.getComplaintById(complaint.id);
      if (refreshed) {
        onComplaintUpdated(refreshed);
      }

      setTimeout(() => setShowSavedToast(false), 2000);
    }, 400);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Toast Notification */}
      {showSavedToast && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 text-xs border border-slate-700 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Complaint updates & assignment saved successfully!</span>
        </div>
      )}

      {/* Top back navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>&larr; Back to Redressal Inbox</span>
      </button>

      {/* Ticket Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-extrabold text-pcmc-800 bg-pcmc-50 border border-pcmc-200 px-3 py-1 rounded-xl">
              {complaint.id}
            </span>
            <PriorityBadge priority={complaint.priority} />
            <StatusBadge status={complaint.status} />
            <span className="text-xs text-slate-500">• Filed {complaint.createdAt}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            {complaint.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-pcmc-600" />
            {complaint.locality} ({complaint.ward}) • Landmark: {complaint.landmark}
          </p>
        </div>

        <div className="text-right flex-shrink-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Last Updated
          </span>
          <span className="text-xs font-semibold text-slate-700">{complaint.updatedAt}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 spans): Citizen Report, Location, Photo & Internal Notes */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Citizen Description Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Citizen Description & Evidence
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
              {complaint.description}
            </p>

            {/* Photo preview */}
            {complaint.photoUrl && (
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                  Attached Photo Evidence:
                </span>
                <div className="rounded-xl overflow-hidden border border-slate-200 max-h-56 bg-slate-900">
                  <img src={complaint.photoUrl} alt="Complaint preview" className="w-full h-52 object-cover" />
                </div>
              </div>
            )}

            {/* GPS coordinates */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-pcmc-600" />
                GPS Coordinates: {complaint.coordinates.lat.toFixed(4)}° N, {complaint.coordinates.lng.toFixed(4)}° E
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {complaint.coordinates.addressString}
              </span>
            </div>
          </div>

          {/* Citizen Info Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Citizen Complainant Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Name</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  {complaint.citizenName}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Mobile Phone</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  {complaint.citizenPhone}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Email</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {complaint.citizenEmail || 'Not provided'}
                </span>
              </div>
            </div>
          </div>

          {/* Internal Notes History (Hidden from Citizens) */}
          <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-subtle space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-amber-100">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>Internal Officer Notes (Hidden from Citizen)</span>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded">
                RESTRICTED ACCESS
              </span>
            </div>

            {complaint.internalNotes.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">
                No internal technical notes recorded yet. Add observations below.
              </p>
            ) : (
              <div className="space-y-2">
                {complaint.internalNotes.map((note, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200 text-xs text-amber-950 font-mono">
                    {note}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Audit Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Milestone Audit Trail
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              {complaint.timeline.map((evt, idx) => (
                <div key={evt.id || idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-slate-800">{evt.status}</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">{evt.notes}</p>
                    <span className="text-[10px] text-slate-400">By: {evt.updatedBy}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">{evt.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (1 span): Administrative Controls & Update Form */}
        <div className="space-y-6">
          <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-5 sticky top-24">
            
            <div className="pb-3 border-b border-slate-100">
              <h2 className="font-bold text-base text-slate-900">Redressal Controls</h2>
              <p className="text-xs text-slate-500">Update status, assign officer & submit notes</p>
            </div>

            {/* Status Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Update Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ComplaintStatus)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-pcmc-500 bg-white"
              >
                <option value="Submitted">Submitted (Unassigned)</option>
                <option value="Assigned">Assigned to Department</option>
                <option value="In Progress">In Progress (Field Work Active)</option>
                <option value="Resolved">Resolved (Closure)</option>
                <option value="Rejected">Rejected (Out of Municipal Scope)</option>
              </select>
            </div>

            {/* Department Assignment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Assign Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-pcmc-500 bg-white"
              >
                {INITIAL_DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.name.en}>
                    {d.name.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Staff Officer Assignment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Responsible Officer / Inspector
              </label>
              <select
                value={selectedStaffId}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-pcmc-500 bg-white"
              >
                {availableStaff.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.role} - {s.ward})
                  </option>
                ))}
              </select>
            </div>

            {/* Public Resolution Note (Visible to Citizen) */}
            <div>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                <Globe className="w-3.5 h-3.5 text-pcmc-600" />
                <span>Public Note (Visible to Citizen)</span>
              </div>
              <textarea
                rows={2}
                value={publicNote}
                onChange={(e) => setPublicNote(e.target.value)}
                placeholder="Message displayed to citizen upon status update..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-pcmc-500"
              />
            </div>

            {/* Internal Staff Notes (Hidden from Citizen) */}
            <div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Add Internal Note (Staff Only)</span>
              </div>
              <textarea
                rows={2}
                value={newInternalNote}
                onChange={(e) => setNewInternalNote(e.target.value)}
                placeholder="Technical notes, material dispatch ID, vendor comments..."
                className="w-full p-2.5 rounded-xl border border-amber-200 bg-amber-50/30 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3 px-4 rounded-xl bg-pcmc-600 hover:bg-pcmc-700 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving Changes...' : 'Save & Publish Updates'}</span>
            </button>

            <div className="text-[10px] text-slate-400 text-center">
              Changes propagate immediately to the Citizen App tracker.
            </div>

          </form>
        </div>

      </div>

    </div>
  );
};
