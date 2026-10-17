import React, { useState, useEffect } from 'react';
import { UserRole, Language, Complaint, Notice, AuditLogEntry, ComplaintCategory } from './types';
import { CivicStore } from './services/store';

// Common Components
import { DemoBanner } from './components/common/DemoBanner';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { EmergencyModal } from './components/common/EmergencyModal';

// Citizen Components
import { WelcomeScreen } from './components/citizen/WelcomeScreen';
import { CitizenHome } from './components/citizen/CitizenHome';
import { ComplaintForm } from './components/citizen/ComplaintForm';
import { ComplaintList } from './components/citizen/ComplaintList';
import { ComplaintDetail } from './components/citizen/ComplaintDetail';
import { ServicesDirectory } from './components/citizen/ServicesDirectory';
import { NoticesPage } from './components/citizen/NoticesPage';
import { ProfilePage } from './components/citizen/ProfilePage';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';

export function App() {
  // Global Application State
  const [currentView, setCurrentView] = useState<'citizen' | 'admin'>('citizen');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedLocality, setSelectedLocality] = useState<string>('All');
  const [citizenActiveTab, setCitizenActiveTab] = useState<string>('home');
  const [showWelcome, setShowWelcome] = useState<boolean>(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);

  // Admin State
  const [adminRole, setAdminRole] = useState<UserRole>('admin');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Store data state
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  // Selected complaint in citizen view
  const [citizenSelectedComplaint, setCitizenSelectedComplaint] = useState<Complaint | null>(null);
  
  // Pre-selected category for report form
  const [reportDefaultCategory, setReportDefaultCategory] = useState<ComplaintCategory>('potholes');

  // Load store data & subscribe to updates
  useEffect(() => {
    CivicStore.init();

    const refreshData = () => {
      setComplaints(CivicStore.getComplaints());
      setNotices(CivicStore.getNotices());
      setAuditLogs(CivicStore.getAuditLogs());
    };

    refreshData();
    const unsubscribe = CivicStore.subscribe(refreshData);

    return () => unsubscribe();
  }, []);

  const handleAdminLogin = (role: UserRole) => {
    setAdminRole(role);
    setIsAdminLoggedIn(true);
    setCurrentView('admin');
  };

  const handleSwitchView = (view: 'citizen' | 'admin') => {
    setCurrentView(view);
    if (view === 'admin' && !isAdminLoggedIn) {
      // Show admin demo login if not logged in
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* Top Persistent Demo Disclaimer & View Switcher Bar */}
      <DemoBanner
        currentView={currentView}
        onSwitchView={handleSwitchView}
        adminRole={adminRole}
        onAdminRoleChange={(role) => setAdminRole(role)}
        language={language}
        onLanguageChange={(lang) => setLanguage(lang)}
      />

      {/* VIEW 1: CITIZEN APP */}
      {currentView === 'citizen' && (
        <div className="flex-1 flex flex-col">
          
          {/* First Time / Onboarding Welcome Screen */}
          {showWelcome ? (
            <WelcomeScreen
              language={language}
              onLanguageChange={(lang) => setLanguage(lang)}
              onGetStarted={() => setShowWelcome(false)}
            />
          ) : (
            <>
              {/* Citizen Navigation Header */}
              <Header
                language={language}
                selectedLocality={selectedLocality}
                onLocalityChange={(loc) => setSelectedLocality(loc)}
                activeTab={citizenActiveTab}
                onTabChange={(tab) => {
                  setCitizenActiveTab(tab);
                  setCitizenSelectedComplaint(null);
                }}
                onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
              />

              {/* Citizen Content Views */}
              <main className="flex-1">
                {/* 1. Home Screen */}
                {citizenActiveTab === 'home' && (
                  <CitizenHome
                    language={language}
                    selectedLocality={selectedLocality}
                    onSelectLocality={(loc) => setSelectedLocality(loc)}
                    complaints={complaints}
                    notices={notices}
                    onNavigateTab={(tab) => {
                      setCitizenActiveTab(tab);
                      setCitizenSelectedComplaint(null);
                    }}
                    onSelectComplaint={(c) => {
                      setCitizenSelectedComplaint(c);
                      setCitizenActiveTab('complaints');
                    }}
                    onOpenReportWithCategory={(cat) => {
                      setReportDefaultCategory(cat as ComplaintCategory);
                      setCitizenActiveTab('report');
                    }}
                    onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
                  />
                )}

                {/* 2. My Complaints or Complaint Detail */}
                {citizenActiveTab === 'complaints' && (
                  <>
                    {citizenSelectedComplaint ? (
                      <ComplaintDetail
                        language={language}
                        complaint={citizenSelectedComplaint}
                        onBack={() => setCitizenSelectedComplaint(null)}
                        onUpdateComplaint={(updated) => {
                          setCitizenSelectedComplaint(updated);
                        }}
                      />
                    ) : (
                      <ComplaintList
                        language={language}
                        complaints={complaints}
                        selectedLocality={selectedLocality}
                        onSelectComplaint={(c) => setCitizenSelectedComplaint(c)}
                        onNavigateToReport={() => setCitizenActiveTab('report')}
                      />
                    )}
                  </>
                )}

                {/* 3. Complaint Submission Flow */}
                {citizenActiveTab === 'report' && (
                  <ComplaintForm
                    language={language}
                    defaultCategory={reportDefaultCategory}
                    defaultLocality={selectedLocality}
                    onSuccess={(newComplaint) => {
                      setCitizenSelectedComplaint(newComplaint);
                      setCitizenActiveTab('complaints');
                    }}
                    onCancel={() => setCitizenActiveTab('home')}
                  />
                )}

                {/* 4. Municipal Services Directory */}
                {citizenActiveTab === 'services' && (
                  <ServicesDirectory language={language} />
                )}

                {/* 5. Public Notices & Announcements */}
                {citizenActiveTab === 'notices' && (
                  <NoticesPage language={language} notices={notices} />
                )}

                {/* 6. Citizen Profile & Settings */}
                {citizenActiveTab === 'profile' && (
                  <ProfilePage
                    language={language}
                    onLanguageChange={(lang) => setLanguage(lang)}
                    onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
                  />
                )}
              </main>

              {/* Mobile-first Bottom Navigation */}
              <BottomNav
                language={language}
                activeTab={citizenActiveTab}
                onTabChange={(tab) => {
                  setCitizenActiveTab(tab);
                  setCitizenSelectedComplaint(null);
                }}
              />
            </>
          )}

        </div>
      )}

      {/* VIEW 2: MUNICIPAL ADMIN PORTAL */}
      {currentView === 'admin' && (
        <div className="flex-1 flex flex-col">
          {!isAdminLoggedIn ? (
            <AdminLogin
              language={language}
              onLogin={handleAdminLogin}
              onBackToCitizen={() => setCurrentView('citizen')}
            />
          ) : (
            <AdminLayout
              language={language}
              adminRole={adminRole}
              onAdminRoleChange={(role) => setAdminRole(role)}
              onSwitchToCitizen={() => setCurrentView('citizen')}
              complaints={complaints}
              notices={notices}
              auditLogs={auditLogs}
              onRefreshData={() => {
                setComplaints(CivicStore.getComplaints());
                setNotices(CivicStore.getNotices());
                setAuditLogs(CivicStore.getAuditLogs());
              }}
            />
          )}
        </div>
      )}

      {/* Emergency Helplines Modal */}
      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        language={language}
      />

    </div>
  );
}

export default App;
