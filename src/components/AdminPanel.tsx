import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc, getDoc, setDoc, onSnapshot, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db, auth, googleSignIn, logout, handleFirestoreError, OperationType } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { ChatSession, ChatAttachment, ChatMessage } from '../types';
import { Send, Paperclip, FileText as FileTextIcon, Trash2, X } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  visaType: string;
  package: string;
  notes: string;
  status: 'pending' | 'reviewing' | 'completed';
  createdAt: any;
}

interface DocCheckPricing {
  basic_price: number;
  standard_price: number;
  premium_price: number;
}
interface ContactSettings {
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  facebook: string;
}
interface SlotPricing {
  medical_price: number;
  business_price: number;
  double_entry_price: number;
  entry_price: number;
  tourist_price: number;
}

const ADMIN_EMAIL = 'mohammadnurhasnat@gmail.com';

const TABS = ['Leads', 'Pricing', 'Contact', 'Admin Chat'];

export default function AdminPanel() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Leads');

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewing' | 'completed'>('all');

  // Pricing state
  const [docCheckPricing, setDocCheckPricing] = useState<DocCheckPricing>({ basic_price: 0, standard_price: 2000, premium_price: 5500 });
  const [slotPricing, setSlotPricing] = useState<SlotPricing>({ medical_price: 0, business_price: 0, double_entry_price: 0, entry_price: 0 });
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingSaved, setPricingSaved] = useState(false);
  const [contact, setContact] = useState<ContactSettings>({ whatsapp: '', phone: '', email: '', address: '', facebook: '' });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSaved, setContactSaved] = useState(false);
  const isAdmin = (email: string | null | undefined) => email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  // Admin Chat states
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [adminChatInput, setAdminChatInput] = useState('');
  const [adminSelectedFile, setAdminSelectedFile] = useState<ChatAttachment | null>(null);
  const adminFileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
      if (u && isAdmin(u.email)) {
        fetchLeads();
        fetchPricing();
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
     if (user && isAdmin(user.email) && activeTab === 'Admin Chat') {
        const q = query(collection(db, 'chat_sessions'), orderBy('updatedAt', 'desc'));
        const unsub = onSnapshot(q, (snap) => {
           const sessions: ChatSession[] = [];
           snap.forEach(d => sessions.push({ id: d.id, ...d.data() } as ChatSession));
           setChatSessions(sessions);
           // Update selected session if open
           setSelectedSession(prev => {
              if (prev) {
                 return sessions.find(s => s.id === prev.id) || null;
              }
              return null;
           });
        });
        return () => unsub();
     }
  }, [user, activeTab]);

  const handleAdminFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAdminSelectedFile({
          name: file.name,
          type: file.type,
          data: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdminChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSession || (!adminChatInput.trim() && !adminSelectedFile)) return;
    
    let finalAttachmentData: any = adminSelectedFile ? { ...adminSelectedFile } : undefined;
    if (finalAttachmentData && finalAttachmentData.data) {
       try {
           const attachRef = doc(collection(db, 'chat_attachments'));
           await setDoc(attachRef, {
              ...finalAttachmentData,
              userId: 'admin',
              createdAt: serverTimestamp()
           });
           finalAttachmentData = {
              id: attachRef.id,
              name: finalAttachmentData.name,
              type: finalAttachmentData.type
           };
       } catch(err) {
           console.warn("Failed to upload attachment", err);
           finalAttachmentData = undefined;
       }
    }

    const newMessage: ChatMessage = {
       id: "admin_" + Math.random().toString(36).substr(2, 9),
       role: 'admin',
       text: adminChatInput.trim(),
       timestamp: Date.now(),
       attachment: finalAttachmentData
    };

    setAdminChatInput('');
    setAdminSelectedFile(null);

    try {
      await updateDoc(doc(db, 'chat_sessions', selectedSession.id), {
         messages: [...selectedSession.messages, newMessage],
         updatedAt: serverTimestamp()
      });
    } catch(err) {
       console.error("Failed to send admin message", err);
    }
  };

  const handleDownloadAttachment = async (attachId: string, name: string) => {
     try {
        const snap = await getDoc(doc(db, 'chat_attachments', attachId));
        if (snap.exists() && snap.data().data) {
           const a = document.createElement('a');
           a.href = snap.data().data;
           a.download = name;
           a.click();
        } else {
           alert("Attachment not found or expired.");
        }
     } catch(err) {
        console.error(err);
        alert("Failed to download attachment.");
     }
  };

  const handleDeleteAttachment = async (session: ChatSession, msgId: string, attachId: string) => {
     if (!window.confirm("Are you sure you want to delete this attachment?")) return;
     try {
        await deleteDoc(doc(db, 'chat_attachments', attachId));
        const updatedMessages = session.messages.map(m => {
           if (m.id === msgId) {
             const { attachment, ...rest } = m;
             return { ...rest, text: rest.text || '[Attachment Deleted]' };
           }
           return m;
        });
        await updateDoc(doc(db, 'chat_sessions', session.id), {
           messages: updatedMessages,
           updatedAt: serverTimestamp()
        });
     } catch (err) {
        console.error(err);
        alert("Failed to delete attachment.");
     }
  };

  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const data: Lead[] = [];
      snap.forEach((d) => data.push({ id: d.id, ...d.data() } as Lead));
      setLeads(data);
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'applications');
    } finally {
      setLeadsLoading(false);
    }
  };
  const fetchContact = async () => {
  try {
    const snap = await getDoc(doc(db, 'settings', 'contact'));
    if (snap.exists()) setContact(prev => 
      Object.keys(prev).every(k => prev[k as keyof ContactSettings] !== '') 
        ? prev 
        : snap.data() as ContactSettings
    );
  } catch (err) {
    console.error(err);
  }
};
fetchContact();
  const fetchPricing = async () => {
    try {
      const docCheck = await getDoc(doc(db, 'pricing', 'doc_check'));
      if (docCheck.exists()) setDocCheckPricing(docCheck.data() as DocCheckPricing);
      const slot = await getDoc(doc(db, 'pricing', 'slot_booking'));
      if (slot.exists()) setSlotPricing(slot.data() as SlotPricing);
    } catch (err) {
      console.error(err);
    }
  };
  const saveContact = async () => {
  setContactLoading(true);
  try {
    await setDoc(doc(db, 'settings', 'contact'), contact);
    setContactSaved(true);
    setTimeout(() => setContactSaved(false), 3000);
  } catch (err) {
    console.error(err);
  } finally {
    setContactLoading(false);
  }
};
  const savePricing = async () => {
    setPricingLoading(true);
    try {
      await setDoc(doc(db, 'pricing', 'doc_check'), docCheckPricing);
      await setDoc(doc(db, 'pricing', 'slot_booking'), slotPricing);
      setPricingSaved(true);
      setTimeout(() => setPricingSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setPricingLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'applications', id), { status });
      setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status: status as any } : l));
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `applications/${id}`);
    }
  };

  const filtered = filter === 'all' ? leads : leads.filter((l) => l.status === filter);

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    reviewing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-slate-500">Loading...</div>
    </div>
  );

  if (!user || !isAdmin(user.email)) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 w-full max-w-sm">
        <div className="text-2xl font-bold text-slate-800">Meditrip Admin</div>
        <div className="text-slate-500 text-sm text-center">Sign in with your admin Google account to continue.</div>
        <button onClick={() => googleSignIn()} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition">
          Sign in with Google
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-xl text-slate-800">Meditrip <span className="text-emerald-600">Admin</span></div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">{user.email}</span>
          <button onClick={() => logout()} className="text-sm text-red-500 hover:text-red-700">Logout</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-6 flex gap-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-sm font-semibold border-b-2 transition ${activeTab === tab ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* LEADS TAB */}
        {activeTab === 'Leads' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {(['all', 'pending', 'reviewing', 'completed'] as const).map((s) => (
                <div key={s} onClick={() => setFilter(s)} className={`cursor-pointer rounded-xl p-4 border transition ${filter === s ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
                  <div className="text-2xl font-bold text-slate-800">{s === 'all' ? leads.length : leads.filter((l) => l.status === s).length}</div>
                  <div className="text-sm text-slate-500 capitalize mt-1">{s === 'all' ? 'Total Leads' : s}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="text-slate-700 font-semibold">{filtered.length} leads</div>
              <button onClick={fetchLeads} className="text-sm bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition">Refresh</button>
            </div>
            {leadsLoading ? (
              <div className="text-center py-20 text-slate-400">Loading leads...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-slate-400">No leads found.</div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['Name', 'Phone', 'Service', 'Package', 'Notes', 'Date', 'Status'].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-slate-600 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((lead, i) => (
                        <tr key={lead.id} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                          <td className="px-4 py-3 font-medium text-slate-800">{lead.name || '—'}</td>
                          <td className="px-4 py-3 text-slate-600">{lead.phone || '—'}</td>
                          <td className="px-4 py-3 text-slate-600">{lead.visaType || '—'}</td>
                          <td className="px-4 py-3 text-slate-600">{lead.package || '—'}</td>
                          <td className="px-4 py-3 text-slate-500 max-w-[200px] truncate">{lead.notes || '—'}</td>
                          <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString('en-GB') : '—'}</td>
                          <td className="px-4 py-3">
                            <select value={lead.status} onChange={(e) => handleStatusChange(lead.id, e.target.value)} className={`text-xs font-semibold px-2 py-1 rounded-lg border-0 outline-none cursor-pointer ${statusColor[lead.status]}`}>
                              <option value="pending">Pending</option>
                              <option value="reviewing">Reviewing</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* PRICING TAB */}
        {activeTab === 'Pricing' && (
          <div className="space-y-8">
            {/* Doc Check Pricing */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="font-bold text-slate-800 text-lg mb-6">Free Doc Check — Pricing</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Basic (Free)', key: 'basic_price' },
                  { label: 'Standard', key: 'standard_price' },
                  { label: 'Premium', key: 'premium_price' },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-600 mb-2">{label} (৳)</label>
                    <input
                      type="number"
                      value={(docCheckPricing as any)[key]}
                      onChange={(e) => setDocCheckPricing((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                      className="w-full border border-slate-200 rounded-lg px-4 py-2 text-slate-800 outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Slot Booking Pricing */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="font-bold text-slate-800 text-lg mb-6">Slot Booking — Pricing</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: 'Medical', key: 'medical_price' },
                  { label: 'Business', key: 'business_price' },
                  { label: 'Double Entry', key: 'double_entry_price' },
                  { label: 'Entry', key: 'entry_price' },
                  { label: 'Tourist', key: 'tourist_price' },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-600 mb-2">{label} (৳)</label>
                    <input
                      type="number"
                      value={(slotPricing as any)[key]}
                      onChange={(e) => setSlotPricing((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                      className="w-full border border-slate-200 rounded-lg px-4 py-2 text-slate-800 outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={savePricing}
              disabled={pricingLoading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-xl transition disabled:opacity-50"
            >
              {pricingLoading ? 'Saving...' : pricingSaved ? '✅ Saved!' : 'Save Pricing'}
            </button>
          </div>
        )} {/* CONTACT TAB */}
{activeTab === 'Contact' && (
  <div className="bg-white rounded-2xl border border-slate-200 p-6">
    <div className="font-bold text-slate-800 text-lg mb-6">Contact & WhatsApp Settings</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[
        { label: 'WhatsApp Number', key: 'whatsapp' },
        { label: 'Phone Number', key: 'phone' },
        { label: 'Email', key: 'email' },
        { label: 'Address', key: 'address' },
        { label: 'Facebook URL', key: 'facebook' },
      ].map(({ label, key }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-slate-600 mb-2">{label}</label>
          <input
            type="text"
            value={(contact as any)[key]}
            onChange={(e) => setContact((prev) => ({ ...prev, [key]: e.target.value }))}
            className="w-full border border-slate-200 rounded-lg px-4 py-2 text-slate-800 outline-none focus:border-emerald-500 transition"
          />
        </div>
      ))}
    </div>
    <button
      onClick={saveContact}
      disabled={contactLoading}
      className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-xl transition disabled:opacity-50"
    >
      {contactLoading ? 'Saving...' : contactSaved ? '✅ Saved!' : 'Save Contact'}
    </button>
  </div>
)}
{activeTab === 'Admin Chat' && (
   <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden min-h-[600px] flex">
      {/* Sidebar: Session List */}
      <div className="w-1/3 border-r border-slate-200 bg-slate-50 overflow-y-auto max-h-[700px]">
         <div className="p-4 border-b border-slate-200 font-bold text-slate-800 sticky top-0 bg-slate-50 z-10">
            Active Chats ({chatSessions.length})
         </div>
         <div className="divide-y divide-slate-100">
            {chatSessions.map((session) => {
               const lastMsg = session.messages[session.messages.length - 1];
               return (
                  <div
                     key={session.id}
                     onClick={() => setSelectedSession(session)}
                     className={`p-4 cursor-pointer hover:bg-emerald-50 transition ${selectedSession?.id === session.id ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'border-l-4 border-transparent'}`}
                  >
                     <div className="font-semibold text-slate-800 mb-1">{session.userId}</div>
                     <div className="text-xs text-slate-500 truncate">{lastMsg ? lastMsg.text || (lastMsg.attachment ? `[Attachment]: ${lastMsg.attachment.name}` : '') : 'No messages'}</div>
                  </div>
               );
            })}
            {chatSessions.length === 0 && (
               <div className="p-8 text-center text-slate-400">No active chats found.</div>
            )}
         </div>
      </div>

      {/* Main Chat Area */}
      <div className="w-2/3 flex flex-col max-h-[700px]">
         {selectedSession ? (
            <>
               <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
                  <div className="font-bold text-slate-800">Chat with {selectedSession.userId}</div>
               </div>
               
               {/* Messages */}
               <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                  {selectedSession.messages.map((msg) => (
                     <div key={msg.id} className={`flex flex-col max-w-[80%] ${msg.role === 'admin' ? 'self-end items-end ml-auto' : 'self-start items-start'}`}>
                        <div className={`px-4 py-3 rounded-xl ${msg.role === 'admin' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'}`}>
                           {msg.attachment && (
                              <div className={`flex items-center gap-2 mb-2 p-2 rounded max-w-full ${msg.role === 'admin' ? 'bg-emerald-700' : 'bg-slate-100'}`}>
                                 <div 
                                    onClick={() => handleDownloadAttachment(msg.attachment!.id, msg.attachment!.name)}
                                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition flex-1 min-w-0"
                                    title="Click to download"
                                 >
                                    <FileTextIcon size={16} className="shrink-0" />
                                    <span className="text-xs truncate font-medium">{msg.attachment.name}</span>
                                 </div>
                                 <button 
                                    onClick={(e) => { e.stopPropagation(); handleDeleteAttachment(selectedSession, msg.id, msg.attachment!.id); }}
                                    className="p-1.5 text-rose-300 hover:text-rose-500 hover:bg-rose-50/10 rounded transition-colors"
                                    title="Delete Attachment"
                                 >
                                    <Trash2 size={14} />
                                 </button>
                              </div>
                           )}
                           <div className="whitespace-pre-line text-sm">{msg.text}</div>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1">{new Date(msg.timestamp).toLocaleTimeString()} ({msg.role})</span>
                     </div>
                  ))}
               </div>

               {/* Admin Reply Form */}
               <div className="p-4 bg-white border-t border-slate-200">
                  {adminSelectedFile && (
                     <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-2 rounded-lg mb-2">
                        <div className="flex items-center gap-2 truncate">
                           <FileTextIcon size={14} className="text-emerald-700 shrink-0" />
                           <span className="text-xs font-medium text-emerald-800 truncate">{adminSelectedFile.name}</span>
                        </div>
                        <button onClick={() => { setAdminSelectedFile(null); if (adminFileInputRef.current) adminFileInputRef.current.value = ''; }} className="text-slate-400 hover:text-red-500"><X size={14}/></button>
                     </div>
                  )}
                  <form onSubmit={handleAdminChatSubmit} className="flex items-center gap-2">
                     <input type="file" ref={adminFileInputRef} className="hidden" onChange={handleAdminFileChange} />
                     <button type="button" onClick={() => adminFileInputRef.current?.click()} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition" title="Attach File">
                        <Paperclip size={18} />
                     </button>
                     <input 
                        type="text" 
                        value={adminChatInput}
                        onChange={(e) => setAdminChatInput(e.target.value)}
                        placeholder="Type reply here..."
                        className="flex-1 px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 transition"
                     />
                     <button type="submit" disabled={!adminChatInput.trim() && !adminSelectedFile} className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition">
                        <Send size={18} />
                     </button>
                  </form>
               </div>
            </>
         ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400">
               Select a session from the sidebar to view chat
            </div>
         )}
      </div>
   </div>
)}
      </div>
    </div>
  );
}
