import { useState, useEffect } from 'react';
import { db, auth, initAuth, googleSignIn, getAuthToken, setAuthToken, logout as googleLogout, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc, getDocs, collection, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { createGoogleSheet, appendRowToGoogleSheet } from '../workspace';

export function useGoogleSheets() {
  const [sheetsUser, setSheetsUser] = useState<any>(null);
  const [sheetsToken, setSheetsToken] = useState<string | null>(null);
  const [activeSheetId, setActiveSheetId] = useState<string>(() => {
    try {
      return localStorage.getItem('meditrip_active_sheet_id') || '';
    } catch {
      return '';
    }
  });
  const [activeSheetUrl, setActiveSheetUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('meditrip_active_sheet_url') || '';
    } catch {
      return '';
    }
  });
  const [syncedCount, setSyncedCount] = useState<number | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [syncErrorMessage, setSyncErrorMessage] = useState<string>('');
  const [sheetLoading, setSheetLoading] = useState<boolean>(false);
  const [leadList, setLeadList] = useState<any[]>([]);
  const [leadListLoading, setLeadListLoading] = useState<boolean>(false);

  // Listen to Google Sheets auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setSheetsUser(user);
        if (user && user.email) {
          localStorage.setItem('meditrip_logged_in_email', user.email);
        }
        if (token) {
          setSheetsToken(token);
          setAuthToken(token);
        } else {
          const localToken = getAuthToken();
          if (localToken) setSheetsToken(localToken);
        }
      },
      () => {
        setSheetsUser(null);
        setSheetsToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch leads from Firestore to display in Admin dashboard (restricted to authorized administrator only)
  const fetchLeadsFromFirestore = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser || currentUser.email?.toLowerCase() !== 'mohammadnurhasnat@gmail.com') {
      console.log('Skipping lead fetch for non-admin visitor.');
      return;
    }

    setLeadListLoading(true);
    try {
      const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const leads: any[] = [];
      querySnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        leads.push({
          id: d.id || docSnap.id,
          name: d.name || 'Anonymous User',
          phone: d.phone || 'N/A',
          visaType: d.visaType || 'General Inquiry',
          notes: d.notes || '',
          package: d.package || 'None',
          status: d.status || 'pending',
          createdAt: d.createdAt ? d.createdAt.toDate() : new Date(),
        });
      });
      setLeadList(leads);
    } catch (err) {
      console.error('Error fetching leads:', err);
      handleFirestoreError(err, OperationType.LIST, 'applications');
    } finally {
      setLeadListLoading(false);
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user && user.email?.toLowerCase() === 'mohammadnurhasnat@gmail.com') {
        fetchLeadsFromFirestore();
      }
    });
    return () => unsub();
  }, []);

  const handleSheetsLogin = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setSheetsUser(res.user);
        setSheetsToken(res.accessToken);
        setAuthToken(res.accessToken);
        fetchLeadsFromFirestore();
      }
    } catch (err: any) {
      console.error('Login process error:', err);
    }
  };

  const handleSheetsLogout = async () => {
    try {
      await googleLogout();
      setSheetsUser(null);
      setSheetsToken(null);
      setAuthToken(null);
    } catch (err) {
      console.error('Logout process error:', err);
    }
  };

  const handleCreateSheet = async () => {
    if (!sheetsToken) return;
    setSheetLoading(true);
    setSyncStatus('idle');
    try {
      const docTitle = `Meditrip Lead Inquiries - ${new Date().toLocaleDateString()}`;
      const sheetData = await createGoogleSheet(sheetsToken, docTitle);
      const id = sheetData.spreadsheetId;
      const url = `https://docs.google.com/spreadsheets/d/${id}`;
      
      setActiveSheetId(id);
      setActiveSheetUrl(url);
      localStorage.setItem('meditrip_active_sheet_id', id);
      localStorage.setItem('meditrip_active_sheet_url', url);

      const headers = [
        "Inquiry ID", 
        "Patient Name", 
        "Phone / WhatsApp", 
        "Visa & Service Type", 
        "Package Selected", 
        "Notes / Special Notes", 
        "Inquiry Status", 
        "Submission Date"
      ];
      await appendRowToGoogleSheet(sheetsToken, id, 'Sheet1!A1:H1', headers);
    } catch (err: any) {
      console.error('Error creating Google Sheet:', err);
      setSyncStatus('error');
      setSyncErrorMessage(err.message || 'Failed to create spreadsheet in Google Drive.');
    } finally {
      setSheetLoading(false);
    }
  };

  const handleSyncLeadsToSheet = async () => {
    if (!sheetsToken || !activeSheetId) return;
    setSyncStatus('syncing');
    setSyncErrorMessage('');

    try {
      const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const latestLeads: any[] = [];
      querySnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        latestLeads.push({
          id: d.id || docSnap.id,
          name: d.name || 'Anonymous User',
          phone: d.phone || 'N/A',
          visaType: d.visaType || 'General Inquiry',
          notes: d.notes || '',
          package: d.package || 'None',
          status: d.status || 'pending',
          createdAt: d.createdAt ? d.createdAt.toDate() : new Date(),
        });
      });

      if (latestLeads.length === 0) {
        setSyncStatus('success');
        setSyncedCount(0);
        return;
      }

      let count = 0;
      for (const lead of latestLeads) {
        const row = [
          lead.id,
          lead.name,
          lead.phone,
          lead.visaType,
          lead.package,
          lead.notes,
          lead.status,
          lead.createdAt ? lead.createdAt.toLocaleString() : 'N/A'
        ];
        await appendRowToGoogleSheet(sheetsToken, activeSheetId, 'Sheet1', row);
        count++;
      }

      setSyncStatus('success');
      setSyncedCount(count);
      setLeadList(latestLeads);
    } catch (err: any) {
      console.error('Error syncing leads to Google Sheet:', err);
      setSyncStatus('error');
      setSyncErrorMessage(err.message || 'Failed to sync spreadsheet data. Please check permissions.');
    }
  };

  return {
    sheetsUser,
    sheetsToken,
    activeSheetId,
    activeSheetUrl,
    syncedCount,
    syncStatus,
    syncErrorMessage,
    sheetLoading,
    leadList,
    leadListLoading,
    fetchLeadsFromFirestore,
    handleSheetsLogin,
    handleSheetsLogout,
    handleCreateSheet,
    handleSyncLeadsToSheet
  };
}
