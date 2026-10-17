export type Language = 'en' | 'mr' | 'hi';

export type UserRole = 'citizen' | 'admin' | 'ward_officer' | 'field_worker';

export type ComplaintStatus = 'Submitted' | 'Assigned' | 'In Progress' | 'Resolved' | 'Rejected';

export type ComplaintPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type ComplaintCategory = 
  | 'potholes'
  | 'garbage'
  | 'drainage'
  | 'water_leakage'
  | 'streetlights'
  | 'encroachment'
  | 'stray_animals'
  | 'other';

export interface TimelineEvent {
  id: string;
  status: ComplaintStatus;
  timestamp: string;
  updatedBy: string;
  notes: string;
  isInternal?: boolean;
}

export interface ComplaintFeedback {
  rating: number; // 1 to 5
  comment: string;
  submittedAt: string;
}

export interface Complaint {
  id: string; // e.g. "PCMC-2026-1042"
  title: string;
  description: string;
  category: ComplaintCategory;
  locality: string; // e.g. "Wakad", "Bhosari"
  ward: string; // e.g. "Ward D"
  landmark: string;
  coordinates: {
    lat: number;
    lng: number;
    addressString: string;
  };
  photoUrl?: string;
  citizenName: string;
  citizenPhone: string;
  citizenEmail?: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  assignedDepartment?: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  internalNotes: string[];
  publicResolutionNotes?: string;
  feedback?: ComplaintFeedback;
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface Notice {
  id: string;
  title: {
    en: string;
    mr: string;
    hi: string;
  };
  content: {
    en: string;
    mr: string;
    hi: string;
  };
  category: 'water' | 'health' | 'civic' | 'tender' | 'environment';
  publishedDate: string;
  isUrgent: boolean;
  status: 'published' | 'draft' | 'archived';
  author: string;
}

export interface Department {
  id: string;
  name: {
    en: string;
    mr: string;
    hi: string;
  };
  code: string;
  headOfficer: string;
  contactNumber: string;
  activeStaffCount: number;
  openCasesCount: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  departmentCode: string;
  ward: string;
  phone: string;
  email: string;
  activeCases: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  details: string;
  entityId?: string;
}

export interface CivicService {
  id: string;
  title: {
    en: string;
    mr: string;
    hi: string;
  };
  description: {
    en: string;
    mr: string;
    hi: string;
  };
  category: 'tax' | 'water' | 'certificates' | 'sanitation' | 'trade' | 'building';
  icon: string;
  processingTime: string;
  fees: string;
  requiredDocuments: string[];
  isDemoInteractive: boolean;
}
