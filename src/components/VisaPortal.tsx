import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  googleSignIn,
  initAuth,
  logout,
  db,
  auth,
  handleFirestoreError,
  OperationType
} from '../firebase';
import {
  listDriveFiles,
  uploadBackupToDrive,
  listUserGoogleForms,
  sendGmailEmail,
  fetchGoogleFormStructure,
  fetchGoogleFormResponses,
  DriveFile
} from '../workspace';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import {
  Database,
  Mail,
  FileText,
  AlertTriangle,
  Send,
  Trash2,
  ExternalLink,
  Plus,
  RefreshCw,
  LogOut,
  FolderOpen,
  CheckCircle,
  FileSpreadsheet,
  Info,
  Clock,
  LayoutGrid
} from 'lucide-react';

interface VisaPortalProps {
  onSelectVisaService?: (serviceName: string) => void;
  selectedPackageFromApp: string | null;
}

interface Application {
  id: string;
  userId: string;
  name: string;
  phone: string;
  visaType: string;
  notes: string;
  package: string;
  status: 'pending' | 'reviewing' | 'completed';
  createdAt?: any;
}

export default function VisaPortal({ onSelectVisaService, selectedPackageFromApp }: VisaPortalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showIframeWarning, setShowIframeWarning] = useState<boolean>(false);

  // Active sub-navigation tab in the portal dashboard
  const [activeTab, setActiveTab] = useState<'applications' | 'drive' | 'gmail' | 'forms'>('applications');

  // Firestore App list state
  const [applications, setApplications] = useState<Application[]>([]);
  const [appsLoading, setAppsLoading] = useState<boolean>(false);
  const [newAppName, setNewAppName] = useState<string>('');
  const [newAppPhone, setNewAppPhone] = useState<string>('');
  const [newAppVisa, setNewAppVisa] = useState<string>('Medical Visa Assistance');
  const [newAppNotes, setNewAppNotes] = useState<string>('');
  const [creatingApp, setCreatingApp] = useState<boolean>(false);

  // Drive state
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([]);
  const [driveLoading, setDriveLoading] = useState<boolean>(false);
  const [backupStatus, setBackupStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [backingUp, setBackingUp] = useState<boolean>(false);

  // Gmail state
  const [emailTo, setEmailTo] = useState<string>('');
  const [emailSubject, setEmailSubject] = useState<string>('My Meditrip Visa Application Summary');
  const [emailMsg, setEmailMsg] = useState<string>('');
  const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);

  // Forms state
  const [formsList, setFormsList] = useState<DriveFile[]>([]);
  const [formsLoading, setFormsLoading] = useState<boolean>(false);
  const [selectedFormId, setSelectedFormId] = useState<string>('');
  const [selectedFormStructure, setSelectedFormStructure] = useState<any>(null);
  const [selectedFormResponses, setSelectedFormResponses] = useState<any>(null);
  const [inspectingForm, setInspectingForm] = useState<boolean>(false);

  // Init Auth logic
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, cachedToken) => {
        setUser(currentUser);
        if (cachedToken) {
          setToken(cachedToken);
          setNeedsAuth(false);
        } else {
          // Signed in but cached token cleared/expired
          setNeedsAuth(true);
        }
        setAuthLoading(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
        setAuthLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch Firestore applications of current logged in user
  const fetchApplications = async () => {
    if (!user) return;
    setAppsLoading(true);
    const path = 'applications';
    try {
      const q = query(collection(db, path), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      const docsList: Application[] = [];
      snapshot.forEach((docSnap) => {
        docsList.push(docSnap.data() as Application);
      });
      setApplications(docsList);
    } catch (err) {
      console.error('Error fetching applications from Firestore:', err);
    } finally {
      setAppsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  // Load section-specific data when tab changes
  useEffect(() => {
    if (!token) return;
    if (activeTab === 'drive') {
      loadDriveFiles();
    } else if (activeTab === 'forms') {
      loadGoogleForms();
    } else if (activeTab === 'gmail' && applications.length > 0) {
      // Auto-populate message draft with their current application checklist
      const summary = applications.map(app => 
        `- **Service**: ${app.visaType}\n  - **Applicant**: ${app.name}\n  - **Phone**: ${app.phone}\n  - **Package**: ${app.package}\n  - **Status**: ${app.status.toUpperCase()}`
      ).join('\n');
      setEmailMsg(`Hello!\n\nHere is a summary of my active Indian Visa checklist items and registration details:\n\n${summary}\n\nProcessed securely via Meditrip Integration Portal.`);
    }
  }, [activeTab, token]);

  const handleLogin = async () => {
    setAuthLoading(true);
    setLoginError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      console.error('Google alignment authentication canceled/failed:', err);
      const errMsg = err?.message || String(err);
      if (errMsg.includes('popup-closed-by-user') || errMsg.includes('auth/popup-closed-by-user')) {
        setLoginError('The Google sign-in window was closed before completion. This is extremely common when running inside an embedded sandbox iframe.');
        setShowIframeWarning(true);
      } else {
        setLoginError(errMsg);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setNeedsAuth(true);
      setApplications([]);
      setDriveFiles([]);
      setFormsList([]);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Google Drive integrations
  const loadDriveFiles = async () => {
    if (!token) return;
    setDriveLoading(true);
    try {
      const files = await listDriveFiles(token);
      setDriveFiles(files);
    } catch (err) {
      console.error(err);
    } finally {
      setDriveLoading(false);
    }
  };

  const handleBackupToDrive = async () => {
    if (!token || !user) return;
    const confirmBackup = window.confirm(
      'Are you sure you want to create a new Meditrip backup document in your Google Drive folder?'
    );
    if (!confirmBackup) return;

    setBackingUp(true);
    setBackupStatus(null);
    try {
      const timeStr = new Date().toLocaleString();
      const content = `MEDITRIP VISA ASSISTANT BACKUP REPORT\n=======================================\nTimestamp: ${timeStr}\nApplicant Profile Email: ${user.email}\nApplicant Display Name: ${user.displayName || 'Unspecified'}\n\nACTIVE APPLICATIONS & MEMORANDUMS:\n${
        applications.length === 0
          ? 'No active applications found on Firestore.'
          : applications.map((app, i) => `[${i + 1}] ID: ${app.id}\n    Category: ${app.visaType}\n    Name: ${app.name}\n    Phone: ${app.phone}\n    Package: ${app.package}\n    Status: ${app.status}`).join('\n\n')
      }\n\nThank you for choosing Meditrip!`;

      const fileName = `Meditrip_Visa_Backup_${Date.now()}.txt`;
      await uploadBackupToDrive(token, fileName, content);
      setBackupStatus({ type: 'success', msg: `Successfully uploaded "${fileName}" to your Google Drive!` });
      loadDriveFiles(); // Refresh directory list
    } catch (err: any) {
      setBackupStatus({ type: 'error', msg: err.message || 'Drive transmission failed.' });
    } finally {
      setBackingUp(false);
    }
  };

  // Gmail interactions
  const handleSendGmailEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!emailTo) {
      alert('Please specify a destination recipient email address.');
      return;
    }

    const confirmSend = window.confirm(
      `Send emails directly from your Gmail account to "${emailTo}"?`
    );
    if (!confirmSend) return;

    setSendingEmail(true);
    setEmailStatus(null);
    try {
      const formattedHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #f1f5f9; padding: 24px; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #80461B; border-bottom: 2px solid #80461B; padding-bottom: 8px; margin-top: 0;">Meditrip Visa Assistant Portal</h2>
          <p style="color: #334155; font-size: 15px;">You have received a compiled Indian Visa Requirements report and registration review file.</p>
          <div style="background-color: #f8fafc; border-left: 4px solid #80461B; padding: 12px; margin: 18px 0; border-radius: 0 6px 6px 0;">
            <pre style="white-space: pre-wrap; font-family: inherit; color: #475569; margin: 0; font-size: 14px;">${emailMsg.replace(/\n/g, '<br/>')}</pre>
          </div>
          <p style="font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 12px; margin-bottom: 0;">This email was sent on your behalf securely via Microsoft/Google API Integrations using Meditrip App.</p>
        </div>
      `;

      await sendGmailEmail(token, emailTo, emailSubject, formattedHtml);
      setEmailStatus({ type: 'success', msg: `Gmail sent successfully to ${emailTo}!` });
      setEmailTo('');
    } catch (err: any) {
      setEmailStatus({ type: 'error', msg: err?.message || 'Failed to dispatch Gmail.' });
    } finally {
      setSendingEmail(false);
    }
  };

  // Google Forms interactions
  const loadGoogleForms = async () => {
    if (!token) return;
    setFormsLoading(true);
    try {
      const files = await listUserGoogleForms(token);
      setFormsList(files);
    } catch (err) {
      console.error(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const handleInspectForm = async (formId: string) => {
    if (!token || !formId) return;
    setInspectingForm(true);
    setSelectedFormId(formId);
    setSelectedFormStructure(null);
    setSelectedFormResponses(null);

    try {
      const structure = await fetchGoogleFormStructure(token, formId);
      setSelectedFormStructure(structure);

      const responses = await fetchGoogleFormResponses(token, formId);
      setSelectedFormResponses(responses);
    } catch (err: any) {
      console.error(err);
      alert(`Could not fetch detail (Standard account may require explicit forms permission): ${err.message}`);
    } finally {
      setInspectingForm(false);
    }
  };

  // Create a new application in Firestore
  const handleCreateApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!newAppName || !newAppPhone) {
      alert('Please provide applicant name and phone.');
      return;
    }

    setCreatingApp(true);
    const id = 'app_' + Math.random().toString(36).substring(2, 11);
    const targetPath = `applications/${id}`;

    try {
      // Compile new application document matching types & schema perfectly
      const newApp: Application = {
        id,
        userId: user.uid,
        name: newAppName,
        phone: newAppPhone,
        visaType: newAppVisa,
        notes: newAppNotes || 'Registered from web portal.',
        package: selectedPackageFromApp || 'Standard Verification Pack',
        status: 'pending'
      };

      // Set document with Server Timestamp as mandated by Rules
      await setDoc(doc(db, 'applications', id), {
        ...newApp,
        createdAt: serverTimestamp()
      });

      // Clear input fields
      setNewAppName('');
      setNewAppPhone('');
      setNewAppNotes('');
      // Refresh applications from Firestore
      await fetchApplications();
    } catch (err: any) {
      handleFirestoreError(err, OperationType.CREATE, targetPath);
    } finally {
      setCreatingApp(false);
    }
  };

  // Delete application from Firestore
  const handleDeleteApplication = async (id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this visa registration record? This action cannot be undone.'
    );
    if (!confirmDelete) return;

    const targetPath = `applications/${id}`;
    try {
      await deleteDoc(doc(db, 'applications', id));
      await fetchApplications();
    } catch (err: any) {
      handleFirestoreError(err, OperationType.DELETE, targetPath);
    }
  };

  // Populate form defaults if package from parent changes
  useEffect(() => {
    if (selectedPackageFromApp) {
      setNewAppNotes(`Selected package: ${selectedPackageFromApp}`);
    }
  }, [selectedPackageFromApp]);

  return (
    <div id="visa-portal-container" className="pt-2 sm:pt-4">
      {/* Auth state loader */}
      {authLoading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white/60 border border-black/[0.05] rounded-3xl animate-pulse">
          <RefreshCw className="animate-spin text-[#80461B] mb-2" size={24} />
          <span className="text-slate-500 text-sm font-sans">Connecting to security providers...</span>
        </div>
      ) : needsAuth ? (
        /* Sign-In Splash screen */
        <div className="relative overflow-hidden border border-black/[0.05] bg-white/70 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 lg:p-12 text-center shadow-md flex flex-col items-center">
          <div className="absolute top-[-50px] left-[-50px] w-48 h-48 rounded-full bg-[#80461B]/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

          {/* Secure badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#80461B]/10 px-3 py-1.5 rounded-full text-xs text-[#80461B] font-bold tracking-wide mb-4 uppercase">
            <Database size={11} /> Secure Database & Workspace Sync
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight mb-3">
            Unlock your Meditrip Client Workspace
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mb-8 font-sans">
            Connect your secure Firebase cloud account details and integrate your Google Drive and Gmail to backup application documents and send instant PDF/HTML reports safely!
          </p>

          {/* Troubleshooting and sandbox warnings */}
          {loginError && !loginError.toLowerCase().includes('popup') ? (
            <div className="mb-6 p-4 bg-red-50/90 border border-red-200/50 rounded-2xl text-left max-w-md flex gap-2.5 items-start animate-fade-in">
              <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <div>
                <h4 className="text-red-800 text-xs sm:text-sm font-sans font-bold leading-tight">Authentication Problem</h4>
                <p className="text-red-700 text-xs mt-1 leading-relaxed font-sans">{loginError}</p>
              </div>
            </div>
          ) : (loginError || showIframeWarning || (typeof window !== 'undefined' && window.self !== window.top)) ? (
            <div className="mb-6 p-4 bg-amber-50/90 border border-amber-200/50 rounded-2xl text-left max-w-md transition-all">
              <div className="flex gap-2.5 items-start">
                <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="text-amber-800 text-xs sm:text-sm font-sans font-bold leading-tight">
                    {loginError ? 'Iframe Storage/Popup Blocked' : 'Sandbox Iframe Context'}
                  </h4>
                  <p className="text-[#80461B] text-xs mt-1 leading-relaxed font-sans">
                    {loginError 
                      ? 'The secure Google connection was blocked. Standard OAuth popups are heavily restricted inside embedded previews unless opened in a separate browser window.'
                      : 'You are viewing this app inside an embedded preview iframe. Direct Google auth popups can be blocked by web browser sandbox restrictions.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => window.open(window.location.href, '_blank')}
                className="mt-3.5 w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 active:scale-[0.98] text-amber-800 border border-amber-200 font-sans text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <ExternalLink size={13} /> Open App in New Tab to Login
              </button>
            </div>
          ) : null}

          <button
            onClick={handleLogin}
            className="gsi-material-button inline-flex items-center justify-center transition-all duration-300 transform active:scale-95 hover:shadow-xl border border-slate-200 cursor-pointer"
            id="workspace-signin-btn"
          >
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper flex items-center">
              <div className="gsi-material-button-icon py-2.5 px-3 border-r border-slate-200">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-[18px] h-[18px]">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents px-4 py-2 text-sm font-sans font-bold text-slate-700">
                Continue with Google
              </span>
            </div>
          </button>
        </div>
      ) : (
        /* Authenticated Workspace Hub */
        <div className="border border-black/[0.05] bg-white/80 backdrop-blur-2xl rounded-3xl shadow-sm flex flex-col overflow-hidden">
          {/* Header Profile Info panel */}
          <div className="px-5 py-4 sm:p-6 border-b border-black/[0.05] bg-[#80461B]/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  referrerPolicy="no-referrer"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-1.5 border-[#80461B]/30"
                />
              ) : (
                <div className="w-10 h-10 bg-[#80461B]/10 hover:bg-[#80461B]/25 rounded-full flex items-center justify-center font-semibold text-[#80461B]">
                  {user.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <div className="text-center sm:text-left">
                <span className="block font-sans font-bold text-slate-900 text-sm">{user.displayName || 'Client Account'}</span>
                <span className="block text-slate-500 text-xs font-mono">{user.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-[#10B981]/10 px-2.5 py-1 rounded-full text-[10px] sm:text-xs text-[#10B981] font-sans font-bold">
                <CheckCircle size={10} /> Syncing
              </span>
              <button
                onClick={handleLogout}
                className="p-1 px-3 border border-red-100 hover:border-red-300 bg-red-50/50 hover:bg-red-50 text-red-650 rounded-lg text-xs font-sans font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
              >
                <LogOut size={12} /> Log out
              </button>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="flex overflow-x-auto border-b border-black/[0.05] px-4 pt-2 gap-1.5 scrollbar-thin">
            {[
              { id: 'applications', label: 'Firestore Storage', icon: Database },
              { id: 'drive', label: 'Google Drive Backup', icon: FolderOpen },
              { id: 'gmail', label: 'Gmail Report', icon: Mail },
              { id: 'forms', label: 'Google Forms', icon: FileSpreadsheet }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              const activeColorClass = (id: string) => {
                switch(id) {
                  case 'applications': return 'border-emerald-500 text-emerald-700';
                  case 'drive': return 'border-amber-500 text-amber-700';
                  case 'gmail': return 'border-rose-500 text-rose-700';
                  default: return 'border-blue-500 text-blue-700';
                }
              };
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-sans font-bold border-b-2 whitespace-nowrap transition-all duration-200 cursor-pointer py-3 ${
                    isActive
                      ? activeColorClass(tab.id)
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <TabIcon size={13} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Contents */}
          <div className="p-5 sm:p-6 lg:p-8 flex-grow">
            <AnimatePresence mode="wait">
              {activeTab === 'applications' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key="applications-tab"
                  className="space-y-6"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Submission registration form */}
                    <form onSubmit={handleCreateApplication} className="w-full lg:w-5/12 space-y-4 border border-black/[0.04] p-5 rounded-2xl bg-slate-50/50">
                      <h3 className="font-sans font-bold text-slate-950 text-sm border-b border-black/[0.05] pb-2 flex items-center gap-1.5 text-[#80461B]">
                        <Plus size={15} /> Save Visa Application Record
                      </h3>

                      <div>
                        <label className="block text-xs font-sans font-bold text-slate-500 uppercase mb-1">Applicant Full Name</label>
                        <input
                          type="text"
                          required
                          value={newAppName}
                          onChange={(e) => setNewAppName(e.target.value)}
                          placeholder="e.g. Abul Hasan"
                          className="w-full p-2.5 border border-slate-200 focus:border-[#80461B]/50 bg-white rounded-lg text-xs font-sans focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-sans font-bold text-slate-500 uppercase mb-1">Applicant Phone (WhatsApp)</label>
                        <input
                          type="text"
                          required
                          value={newAppPhone}
                          onChange={(e) => setNewAppPhone(e.target.value)}
                          placeholder="e.g. +88017XXXXXXXX"
                          className="w-full p-2.5 border border-slate-200 focus:border-[#80461B]/50 bg-white rounded-lg text-xs font-sans focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-sans font-bold text-slate-500 uppercase mb-1">Visa Category</label>
                          <select
                            value={newAppVisa}
                            onChange={(e) => setNewAppVisa(e.target.value)}
                            className="w-full p-2 text-xs font-sans bg-white border border-slate-200 focus:outline-none rounded-lg h-9"
                          >
                            <option>Medical Visa Assistance</option>
                            <option>Tourist Visa Guide</option>
                            <option>Business Document Prep</option>
                            <option>Double Entry Fast-Track</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-sans font-bold text-slate-500 uppercase mb-1">Selected Plan</label>
                          <input
                            type="text"
                            disabled
                            value={selectedPackageFromApp || 'Standard verification'}
                            className="w-full p-2 text-xs font-sans bg-slate-100 border border-slate-200 text-slate-500 rounded-lg h-9"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-sans font-bold text-slate-500 uppercase mb-1">Specifications & Notes</label>
                        <textarea
                          rows={2}
                          value={newAppNotes}
                          onChange={(e) => setNewAppNotes(e.target.value)}
                          placeholder="Enter supporting hospital details, travel dates or specifics..."
                          className="w-full p-2.5 border border-slate-200 focus:border-[#80461B]/50 bg-white rounded-lg text-xs font-sans focus:outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={creatingApp}
                        className="w-full bg-emerald-50 hover:bg-emerald-100 active:scale-98 transition-all text-emerald-800 border border-emerald-200 font-sans font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer disabled:opacity-80"
                      >
                        {creatingApp ? (
                          <>
                            <RefreshCw className="animate-spin" size={12} />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Database size={12} />
                            Save to Cloud Database
                          </>
                        )}
                      </button>
                    </form>

                    {/* Applications cloud records list */}
                    <div className="w-full lg:w-7/12 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-sans font-bold text-slate-800 text-sm flex items-center gap-1">
                          Active Cloud Records ({applications.length})
                        </span>
                        <button
                          onClick={fetchApplications}
                          disabled={appsLoading}
                          className="p-1 px-2 border border-slate-200 hover:bg-slate-100 rounded-lg text-[11px] font-sans text-slate-600 flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw size={11} className={appsLoading ? 'animate-spin' : ''} />
                          Reload
                        </button>
                      </div>

                      {appsLoading ? (
                        <div className="space-y-2">
                          {[1, 2].map((id) => (
                            <div key={id} className="h-16 animate-pulse bg-slate-100 rounded-xl" />
                          ))}
                        </div>
                      ) : applications.length === 0 ? (
                        <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/20">
                          <Database className="mx-auto text-slate-300 mb-2" size={24} />
                          <span className="block text-slate-450 text-xs font-sans">No saved visa applications found in Firestore yet.</span>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                          {applications.map((app) => (
                            <div
                              key={app.id}
                              className="p-4 border border-black/[0.04] bg-white rounded-xl shadow-sm hover:border-[#80461B]/20 flex items-center justify-between hover:shadow-md transition-all duration-150"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-sans font-bold text-[#80461B] text-xs sm:text-sm">{app.name}</span>
                                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">{app.package}</span>
                                </div>
                                <div className="text-[11px] sm:text-xs text-slate-600 font-sans">
                                  Category: <span className="font-semibold">{app.visaType}</span> | Phone: <span className="font-mono">{app.phone}</span>
                                </div>
                                {app.notes && (
                                  <p className="text-[10px] sm:text-xs text-slate-450 italic max-w-md line-clamp-1">
                                    "{app.notes}"
                                  </p>
                                )}
                              </div>

                              <button
                                onClick={() => handleDeleteApplication(app.id)}
                                className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 border border-red-100 text-red-650 flex items-center justify-center transition-colors cursor-pointer ml-3 shrink-0"
                                title="Delete backup"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'drive' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key="drive-tab"
                  className="space-y-5"
                >
                  <div className="bg-sky-500/[0.03] border border-sky-500/10 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-start gap-2.5">
                      <Info className="text-[#80461B] shrink-0 mt-0.5" size={16} />
                      <div className="text-left">
                        <span className="block font-sans font-bold text-slate-900 text-xs sm:text-sm">Google Drive File Backup Center</span>
                        <span className="block text-slate-500 text-xs font-sans mt-0.5 leading-relaxed">
                          Backup your registered visa configurations and checklists directly to your Google Drive as text logs for safety!
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleBackupToDrive}
                      disabled={backingUp || applications.length === 0}
                      className="whitespace-nowrap px-4 py-2 bg-amber-50 hover:bg-amber-100 active:scale-95 disabled:opacity-50 text-amber-800 border border-amber-200 font-sans font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      {backingUp ? <RefreshCw size={12} className="animate-spin" /> : <FolderOpen size={12} />}
                      {backingUp ? "Uploading to Drive..." : "Backup to Drive"}
                    </button>
                  </div>

                  {backupStatus && (
                    <div className={`p-3 text-xs font-sans rounded-xl border flex items-center gap-2 ${
                      backupStatus.type === 'success' 
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                        : 'bg-red-50 border-red-100 text-red-800'
                    }`}>
                      <CheckCircle size={14} />
                      {backupStatus.msg}
                    </div>
                  )}

                  {/* Drive Files list */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-bold text-slate-800 text-sm">
                        Recent Google Drive Files
                      </span>
                      <button
                        onClick={loadDriveFiles}
                        disabled={driveLoading}
                        className="p-1 px-2.5 border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-sans text-slate-600 flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw size={11} className={driveLoading ? 'animate-spin' : ''} />
                        Sync Files
                      </button>
                    </div>

                    {driveLoading ? (
                      <div className="space-y-2">
                        {[1, 2, 3].map((id) => (
                          <div key={id} className="h-11 animate-pulse bg-slate-50 border border-slate-100 rounded-lg" />
                        ))}
                      </div>
                    ) : driveFiles.length === 0 ? (
                      <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-xl">
                        <FolderOpen className="mx-auto text-slate-300 mb-2" size={24} />
                        <span className="block text-slate-400 text-xs font-sans">No files found on Google Drive root. Try uploading a backup first!</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                        {driveFiles.map((f) => (
                          <div
                            key={f.id}
                            className="p-3 border border-slate-100 bg-white rounded-xl shadow-sm hover:border-slate-200 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              {f.iconLink ? (
                                <img src={f.iconLink} alt="Icon" className="w-5 h-5 shrink-0" referrerPolicy="no-referrer" />
                              ) : (
                                <FileText size={16} className="text-slate-400 shrink-0" />
                              )}
                              <div className="text-left overflow-hidden">
                                <span className="block text-xs font-sans font-bold text-slate-800 truncate" title={f.name}>{f.name}</span>
                                <span className="block text-[9px] text-slate-400 truncate font-sans">{f.mimeType.split('/').pop()}</span>
                              </div>
                            </div>

                            {f.webViewLink && (
                              <a
                                href={f.webViewLink}
                                target="_blank"
                                rel="noreferrer"
                                className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 flex items-center justify-center shrink-0 text-slate-500 hover:text-slate-900 transition-colors"
                              >
                                <ExternalLink size={11} />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'gmail' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key="gmail-tab"
                  className="space-y-4"
                >
                  <form onSubmit={handleSendGmailEmail} className="space-y-4 border border-slate-100 p-5 rounded-2xl bg-slate-50/30">
                    <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2 mb-2 text-[#80461B]">
                      <Mail size={15} />
                      <h3 className="font-sans font-bold text-slate-950 text-xs sm:text-sm">Send Instant Email Report via Gmail</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-sans font-bold text-slate-500 uppercase mb-1">Destination Recipient Email</label>
                        <input
                          type="email"
                          required
                          value={emailTo}
                          onChange={(e) => setEmailTo(e.target.value)}
                          placeholder="e.g. support@meditripbd.com"
                          className="w-full p-2.5 border border-slate-200 focus:border-[#80461B]/50 bg-white rounded-lg text-xs font-sans h-9"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-sans font-bold text-slate-500 uppercase mb-1">Subject Title</label>
                        <input
                          type="text"
                          required
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          placeholder="Gmail Title"
                          className="w-full p-2.5 border border-slate-200 focus:border-[#80461B]/50 bg-white rounded-lg text-xs font-sans h-9"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-bold text-slate-500 uppercase mb-1">Email Body Draft (Plain text formatted into beautiful HTML template)</label>
                      <textarea
                        rows={4}
                        required
                        value={emailMsg}
                        onChange={(e) => setEmailMsg(e.target.value)}
                        placeholder="Detail your inquiry, requirements checklist, passport issues..."
                        className="w-full p-2.5 border border-slate-200 focus:border-[#80461B]/50 bg-white rounded-lg text-xs font-sans focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sendingEmail}
                      className="w-full sm:w-auto px-5 py-2.5 bg-rose-50 hover:bg-rose-100 active:scale-95 disabled:opacity-50 text-rose-700 border border-rose-200 font-sans font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      {sendingEmail ? <RefreshCw size={12} className="animate-spin" /> : <Send size={12} />}
                      {sendingEmail ? "Dispatching via Gmail..." : "Send via Gmail API"}
                    </button>
                  </form>

                  {emailStatus && (
                    <div className={`p-3 text-xs font-sans rounded-xl border flex items-center gap-2 ${
                      emailStatus.type === 'success' 
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                        : 'bg-red-50 border-red-100 text-red-800'
                    }`}>
                      <CheckCircle size={14} />
                      {emailStatus.msg}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'forms' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key="forms-tab"
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Forms dropdown file loader */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-sans font-bold text-slate-800 text-xs sm:text-sm">
                          Select Google Form (Drive Queries)
                        </span>
                        <button
                          onClick={loadGoogleForms}
                          disabled={formsLoading}
                          className="p-1 px-2 border border-slate-200 hover:bg-slate-100 rounded-lg text-[10px] font-sans text-slate-600 flex items-center gap-1"
                        >
                          <RefreshCw size={10} className={formsLoading ? 'animate-spin' : ''} />
                          Reload
                        </button>
                      </div>

                      {formsLoading ? (
                        <div className="h-10 animate-pulse bg-slate-100 rounded-lg" />
                      ) : formsList.length === 0 ? (
                        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                          <FileSpreadsheet className="mx-auto text-slate-300 mb-1" size={20} />
                          <span className="block text-slate-450 text-[11px] font-sans">No Google Forms identified in your Google Drive root. Create a form first on forms.google.com!</span>
                        </div>
                      ) : (
                        <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
                          {formsList.map((form) => (
                            <button
                              key={form.id}
                              onClick={() => handleInspectForm(form.id)}
                              className={`w-full text-left p-3 rounded-lg border text-xs font-sans font-bold flex items-center justify-between transition-all ${
                                selectedFormId === form.id
                                  ? 'border-[#80461B] bg-[#80461B]/[0.02] text-[#80461B]'
                                  : 'border-slate-150 hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <FileSpreadsheet size={14} className="text-[#80461B] shrink-0" />
                                <span className="truncate">{form.name}</span>
                              </div>
                              <ExternalLink size={10} className="text-slate-400 shrink-0 ml-2" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Questions & Responses Visualizer */}
                    <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/20 text-left min-h-[220px] flex flex-col">
                      <h4 className="font-sans font-bold text-slate-900 text-xs sm:text-sm border-b border-slate-100 pb-2 mb-3 flex items-center gap-1.5">
                        <LayoutGrid size={13} className="text-[#80461B]" />
                        Forms Response & Schema Monitor
                      </h4>

                      {inspectingForm ? (
                        <div className="flex-grow flex flex-col items-center justify-center py-10 animate-pulse">
                          <RefreshCw className="animate-spin text-[#80461B] mb-2" size={18} />
                          <span className="text-slate-500 text-xs font-sans">Connecting with Forms REST endpoints...</span>
                        </div>
                      ) : selectedFormStructure ? (
                        <div className="space-y-4 text-xs font-sans flex-grow">
                          <div>
                            <span className="block font-bold text-slate-900 text-sm">{selectedFormStructure.info?.title || 'Form'}</span>
                            <span className="block text-slate-500 leading-relaxed text-[11px] mt-0.5">{selectedFormStructure.info?.description || 'No description provided.'}</span>
                          </div>

                          <div className="space-y-2">
                            <span className="block font-bold text-slate-700 text-[11px] uppercase tracking-wide">Fields Detected ({selectedFormStructure.items?.length || 0})</span>
                            <div className="grid grid-cols-2 gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                              {selectedFormStructure.items?.map((item: any, idx: number) => (
                                <div key={idx} className="p-2 border border-slate-100 bg-white rounded-lg truncate" title={item.title}>
                                  <span className="font-semibold block truncate text-slate-800">{item.title}</span>
                                  <span className="text-[9px] text-slate-400 uppercase font-mono">{item.questionItem?.question?.required ? 'Required' : 'Optional'}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="border-t border-slate-100 pt-3">
                            <span className="block font-bold text-slate-700 text-[11px] uppercase tracking-wide mb-1">Response Volume</span>
                            <div className="p-2 bg-[#80461B]/5 border border-[#80461B]/10 rounded-lg flex items-center justify-between">
                              <span className="text-slate-600">Total Valid Submissions:</span>
                              <span className="font-mono font-bold text-[#80461B]">{selectedFormResponses?.responses?.length || 0}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-grow flex flex-col items-center justify-center py-10 text-slate-400">
                          <Info size={18} className="mb-1 text-slate-300" />
                          <span className="text-xs font-sans text-center px-4">Select a custom Google Form from the left panel to fetch dynamic questions and response volumes!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
