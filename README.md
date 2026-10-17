# PCMC Citizen Connect (पिंपरी-चिंचवड सिटीझन कनेक्ट)

> **IMPORTANT DISCLAIMER:**  
> **This is an independent academic and concept prototype** created to demonstrate modern, responsive civic services software architecture for Pimpri-Chinchwad Municipal Corporation (PCMC), Maharashtra, India.  
> **This is NOT an official government application and does NOT claim government approval or affiliation.** No real complaints are submitted to municipal authorities, no real citizen payments are processed, and no real government certificates or Aadhaar data are collected.

---

## 🏛️ Project Overview

**PCMC Citizen Connect** is a responsive full-stack civic services prototype designed with a mobile-first citizen experience and a desktop/tablet-optimized Municipal Operations Dashboard. It demonstrates end-to-end grievance redressal, real-time ticket tracking, interactive municipal calculators, official public advisories, and administrative workflow routing across PCMC's 8 administrative zones (Wards A through H).

---

## 🚀 How to Run the Application

### 1. Prerequisites
- **Node.js**: v18 or higher (Portable Node.js v22.12.0 is already configured at `C:\Users\HP\nodejs`)
- **Web Browser**: Chrome, Edge, Firefox, or Safari

### 2. Opening the Project Directory
Open PowerShell or your preferred terminal and navigate to the project directory:
```powershell
cd C:\Users\HP\.gemini\antigravity\scratch\pcmc-citizen-connect
```

### 3. Starting the Development Server
Run the following command to start the Vite local server:
```powershell
$env:PATH = "C:\Users\HP\nodejs;$env:PATH"
& "C:\Users\HP\nodejs\npm.cmd" run dev
```
*(Or simply `npm run dev` if Node.js is in your global PATH).*

### 4. Opening in Browser
Once the server starts, open your web browser and navigate to:
```
http://localhost:5173
```

### 5. Building for Production
To generate an optimized production bundle:
```powershell
$env:PATH = "C:\Users\HP\nodejs;$env:PATH"
& "C:\Users\HP\nodejs\npm.cmd" run build
```
The compiled assets will be placed in the `dist/` directory.

---

## 🔑 Demo Access & Role Credentials

No password or complex setup is required. The platform includes a **1-Click Demo Login** for testing different user personas:

| Role Persona | Target Scope | Key Capabilities |
| :--- | :--- | :--- |
| **Citizen User** | Mobile-First Citizen App | File complaints with GPS & photos, track ticket progress, calculate Property Tax rebates, search birth records, view emergency helplines. |
| **Municipal Commissioner / Admin** | City-Wide (All Wards A - H) | Executive KPI dashboard, cross-department analytics, grievance redressal triage, audit trail inspection. |
| **Ward Officer** | Ward D (Wakad & Pimple Saudagar) | Zonal grievance inbox, assign junior engineers & sanitary squads, publish ward notices. |
| **Field Inspector / Junior Engineer** | PWD Roads & Health Squad | Add confidential internal notes, inspect on-site photo evidence, update work order status to "In Progress" or "Resolved". |

> **Top Switcher Bar:** You can switch between the **Citizen App** and **Municipal Admin Portal** at any time using the persistent switcher at the top of the screen.

---

## 🌟 Key Application Features

### Part A — Citizen Application (Mobile-First)
1. **Welcome & Multilingual Support**: Trilingual interface in **English**, **मराठी (Marathi)**, and **हिंदी (Hindi)**.
2. **Citizen Home Screen**:
   - Locality & Ward selector (Wakad, Bhosari, Chinchwad, Pimpri, Akurdi, Nigdi, Ravet, Sangvi, Moshi, etc.).
   - Prominent "Report a Civic Issue" call-to-action.
   - Quick category buttons (Potholes, Garbage, Drainage, Streetlights).
   - Live Active Complaints tracker card.
   - Urgent Municipal Advisories banner (e.g., Ravet Pumping Station water shutdown).
   - Emergency contacts pill.
3. **Comprehensive Complaint Filing**:
   - Multi-category support: Potholes, Garbage & Waste, Drainage Overflow, Water Leakage, Non-functional Streetlights, Encroachments, Stray Animals, and Other issues.
   - **Simulated GPS Geo-Location Detector** that populates coordinates and addresses based on the selected PCMC locality.
   - **Photo Evidence Attachment**: Upload image files or choose from 4 preset civic inspection photos.
   - Field validation & instant **Unique Ticket Reference ID** generation (`PCMC-2026-XXXX`).
4. **My Complaints & Live Tracking**:
   - Filterable by status: *Submitted*, *Assigned*, *In Progress*, *Resolved*, and *Rejected*.
   - Search by Ticket ID, keywords, or locality.
   - Step-by-step resolution history timeline with actor names and timestamps.
   - **Citizen Feedback Form**: Rate the resolved work (1 to 5 stars) and submit review comments.
5. **Municipal Services Directory**:
   - **Interactive Property Tax Calculator**: Select residential/commercial, enter carpet area (sq.ft), compute tax breakdown and the official **10% Early Bird Rebate**, and simulate downloading a demo tax receipt.
   - **Birth Certificate Search Tool**: Search simulated PCMC institutional hospital records (YCM Hospital, Pimpri) and check digital verification status.
   - Water Connection Guidelines, Bulk Waste / Ghanta Gadi scheduling, Trade Licenses, and Building Permissions.
6. **Public Notices & Announcements**: Official circulars with category filters and urgency tags.
7. **Citizen Profile**: Language settings, simulated SMS/Email alert toggles, Frequently Asked Questions (FAQ), and PCMC 24x7 Helplines (Sarathi 8888 00 6666, Disaster Cell, Fire 101, Ambulance 108).

### Part B — Municipal Admin Dashboard (Desktop & Tablet)
1. **Executive Overview**: Real-time KPI counters (Total, Open, In Progress, Overdue/Escalated, Resolved) and citizen satisfaction scores.
2. **Visual Analytics**: Complaints distribution across civic categories and 8 administrative PCMC zones (Ward A through Ward H).
3. **Redressal Inbox**: Advanced search and multi-filtering (Status, Priority, Category, Ward, Department), sorting, and quick triage.
4. **Complaint Detail & Assignment Console**:
   - Full citizen submission details, map coordinates, and photo evidence.
   - **Department Assignment**: PWD, Health & Sanitation, Water Supply, Electrical, Encroachment, Veterinary.
   - **Staff Assignment**: Route tickets to specific nodal officers (e.g. Er. Rajesh Patil, Dr. Sunita Kadam, Er. Amit Deshmukh).
   - **Status Transitions**: Submitted &rarr; Assigned &rarr; In Progress &rarr; Resolved / Rejected.
   - **Separated Notes**: Public resolution remarks (visible to citizen) vs. **🔒 Confidential Internal Notes** (strictly hidden from citizen).
5. **Notices Management**: Create, draft, preview, toggle published/archived status, and delete public advisories.
6. **Staff Directory**: Workload distribution and active case counts across municipal divisions.
7. **Performance Reports & SLA Analytics**: Average turnaround times, departmental SLA compliance percentages, and ward leaderboard rankings.
8. **Administrative Audit Trail**: Real-time log tracking all system events with timestamps and actor signatures.

---

## 🔄 Two-Way Synchronized Behavior

- Both the **Citizen App** and **Municipal Admin Portal** connect to a shared data layer with local browser persistence (`localStorage`).
- **Submit a complaint** as a citizen &rarr; It immediately appears in the Admin Redressal Inbox!
- **Assign an officer or resolve a ticket** in the Admin Portal &rarr; The citizen's complaint tracker updates instantly with the new milestone and timestamp!
- **Reset Demo Data**: Click "Reset Demo" in the top bar anytime to restore the rich sample dataset.

---

## 📁 Project Architecture & File Structure

```
pcmc-citizen-connect/
├── index.html                     # HTML5 entry with civic metadata and fonts
├── package.json                   # Dependencies (React, TypeScript, Vite, Tailwind, Lucide)
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # PCMC Civic Green (#176B52) design theme
├── tsconfig.json                  # TypeScript workspace configuration
├── tsconfig.app.json              # TypeScript app compiler settings
├── vite.config.ts                 # Vite bundler configuration (host & port 5173)
├── src/
│   ├── main.tsx                   # React root entry point
│   ├── App.tsx                    # Top-level application routing and state coordination
│   ├── index.css                  # Tailwind directives and custom scrollbars
│   ├── types/
│   │   └── index.ts               # Complete TypeScript types (Complaint, Notice, Staff, etc.)
│   ├── i18n/
│   │   └── translations.ts        # English, Marathi (मराठी), and Hindi (हिंदी) dictionary
│   ├── services/
│   │   └── store.ts               # Central state store with localStorage sync and pub/sub
│   └── components/
│       ├── common/
│       │   ├── Badge.tsx          # Accessible Status and Priority badges
│       │   ├── BottomNav.tsx      # Mobile-first citizen navigation bar
│       │   ├── DemoBanner.tsx     # Top disclaimer, role selector, language toggles, reset
│       │   ├── EmergencyModal.tsx # PCMC Sarathi & emergency helplines directory
│       │   └── Header.tsx         # Citizen desktop/mobile navigation header
│       ├── citizen/
│       │   ├── WelcomeScreen.tsx  # Onboarding language selection and prototype highlights
│       │   ├── CitizenHome.tsx    # Home dashboard with quick actions and active tracker
│       │   ├── ComplaintForm.tsx  # Multi-step complaint filing with GPS and photo upload
│       │   ├── ComplaintList.tsx  # My Complaints with status tabs, search, and sorting
│       │   ├── ComplaintDetail.tsx# Ticket timeline, assigned officer, citizen rating
│       │   ├── ServicesDirectory.tsx # Property Tax calculator & Birth Certificate tool
│       │   ├── NoticesPage.tsx    # Public circulars and health advisories
│       │   └── ProfilePage.tsx    # Settings, notifications, FAQ, and privacy notice
│       └── admin/
│           ├── AdminLogin.tsx     # 1-Click demo access authentication
│           ├── AdminLayout.tsx    # Responsive admin sidebar and layout wrapper
│           ├── AdminOverview.tsx  # KPI cards, category graphs, and ward distribution
│           ├── AdminInbox.tsx     # Grievance inbox with multi-filters and sorting
│           ├── AdminComplaintDetail.tsx # Assignment controls and internal/public notes
│           ├── AdminNotices.tsx   # Notice authoring, publishing, and archiving
│           ├── AdminStaff.tsx     # Department staff directory and caseloads
│           ├── AdminReports.tsx   # SLA performance and ward leaderboards
│           └── AdminAuditLog.tsx  # Real-time administrative audit trail
```

---

## 🛡️ Prototype Limitations & Production Roadmap

This prototype was developed to establish the UX patterns and reactive workflow logic. Before this system could be deployed into production by municipal authorities, the following enhancements would be necessary:

1. **Authentication & Authorization**:
   - Replace client-side demo roles with secure OAuth2 / Citizen SSO (e.g., MeriPehchaan / DigiLocker integration) and municipal staff Active Directory.
   - Role-Based Access Control (RBAC) enforced on an authenticated backend server.
2. **Backend & Database Infrastructure**:
   - Replace `localStorage` with a robust backend (e.g., PostgreSQL / PostGIS for spatial spatial ward queries, Node.js / Go / Python backend).
   - Encrypted data-at-rest and in-transit (TLS 1.3).
3. **Official PCMC Integrations**:
   - Integrate with the official PCMC Sarathi CRM APIs for bidirectional grievance synchronization.
   - Integrate with the PCMC Property Tax billing system and treasury payment gateways (BillDesk / Razorpay / UPI).
   - Integration with Civil Registration System (CRS) for authentic birth/death certificates.
4. **Media Storage**:
   - Store citizen inspection photos in an S3-compatible secure object store with virus scanning and automated image EXIF redaction.
5. **Notifications**:
   - Connect SMS gateway (Govt. CDAC SMS gateway) and WhatsApp Business API for instant ticket alerts.

---

## 📄 License
Educational & Demonstrative Prototype. Created for civic technology concept evaluation.
