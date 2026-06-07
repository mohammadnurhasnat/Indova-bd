import React, { useState, useEffect } from 'react';
import { FileText as FileTextIcon, Check, CheckCheck, Copy, MapPin, Phone, Mail, Globe, Users, MessageSquare, Facebook } from 'lucide-react';
import type { ChatMessage, ChatAttachment } from '../../types';

const MessageAttachmentInfo = ({ attachment }: { attachment: ChatAttachment }) => {
  const [imgData, setImgData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (attachment.type.startsWith('image/') && attachment.id) {
      setLoading(true);
      import('firebase/firestore').then(({ getDoc, doc }) => {
        import('../../firebase').then(({ db }) => {
          getDoc(doc(db, 'chat_attachments', attachment.id!)).then(snap => {
            if (snap.exists() && snap.data().data) {
              setImgData(snap.data().data);
            }
            setLoading(false);
          }).catch(() => setLoading(false));
        });
      });
    }
  }, [attachment]);

  const handleDownload = async () => {
    try {
      if (imgData) {
        const a = document.createElement('a');
        a.href = imgData;
        a.download = attachment.name;
        a.click();
        return;
      }
      const { getDoc, doc } = await import('firebase/firestore');
      const { db } = await import('../../firebase');
      const snap = await getDoc(doc(db, 'chat_attachments', attachment.id || ''));
      if (snap.exists() && snap.data().data) {
        const a = document.createElement('a');
        a.href = snap.data().data;
        a.download = attachment.name;
        a.click();
      } else {
        alert("Attachment not found or expired.");
      }
    } catch(err) {
      console.error(err);
      alert("Failed to download attachment.");
    }
  };

  if (attachment.type.startsWith('image/')) {
    return (
      <div 
        onClick={handleDownload}
        className="mb-2 rounded-lg bg-white/60 border border-black/5 hover:bg-white/80 transition-colors cursor-pointer overflow-hidden flex flex-col items-center justify-center relative min-w-[150px] min-h-[100px]"
        title="Click to view/download"
      >
        {loading ? (
          <span className="text-xs text-emerald-800/60 p-4">Loading image...</span>
        ) : imgData ? (
          <img src={imgData} alt={attachment.name} className="w-full max-w-xs object-contain max-h-48" />
        ) : (
          <div className="flex items-center gap-2 p-2 w-full">
            <FileTextIcon size={16} className="text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold text-emerald-800 break-all">{attachment.name}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={handleDownload}
      className="flex items-center gap-2 mb-2 p-2 rounded-lg bg-white/60 border border-black/5 hover:bg-white/80 transition-colors cursor-pointer"
      title="Click to download document"
    >
      <FileTextIcon size={16} className="text-emerald-600 shrink-0" />
      <span className="text-xs font-semibold text-emerald-800 break-all">{attachment.name}</span>
    </div>
  );
};

const renderMessageContent = (text: string) => {
  if (!text) return null;

  let cleanText = text.replace(/\*\*/g, "");
  cleanText = cleanText.replace(/📍/g, " {__MAP_PIN__} ");
  cleanText = cleanText.replace(/📞/g, " {__PHONE__} ");
  cleanText = cleanText.replace(/📧/g, " {__MAIL__} ");
  cleanText = cleanText.replace(/🌐/g, " {__GLOBE__} ");
  cleanText = cleanText.replace(/👥/g, " {__USERS__} ");

  const lines = cleanText.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, lIdx) => {
        const words = line.split(" ");
        const renderedWords = words.map((word, wIdx) => {
          const cleanWord = word.replace(/[.,()?!"'“”:;]/g, "").trim();

          if (cleanWord === "{__MAP_PIN__}") {
            return <MapPin key={`ic-map-${lIdx}-${wIdx}`} size={14} className="inline-block text-[#80461B]/80 mx-1 align-text-bottom shrink-0 h-4 w-4" />;
          }
          if (cleanWord === "{__PHONE__}") {
            return <Phone key={`ic-phone-${lIdx}-${wIdx}`} size={13} className="inline-block text-slate-500 mx-1 align-text-bottom shrink-0 h-3.5 w-3.5" />;
          }
          if (cleanWord === "{__MAIL__}") {
            return <Mail key={`ic-mail-${lIdx}-${wIdx}`} size={13} className="inline-block text-slate-500 mx-1 align-text-bottom shrink-0 h-3.5 w-3.5" />;
          }
          if (cleanWord === "{__GLOBE__}") {
            return <Globe key={`ic-globe-${lIdx}-${wIdx}`} size={13} className="inline-block text-slate-500 mx-1 align-text-bottom shrink-0 h-3.5 w-3.5" />;
          }
          if (cleanWord === "{__USERS__}") {
            return <Users key={`ic-users-${lIdx}-${wIdx}`} size={13} className="inline-block text-slate-500 mx-1 align-text-bottom shrink-0 h-3.5 w-3.5" />;
          }

          if (cleanWord === "+8801332601510" || cleanWord === "01332601510" || cleanWord === "013326-01510") {
            const isWhatsAppMention = line.toLowerCase().includes("whatsapp") || line.toLowerCase().includes("হোয়াটসঅ্যাপ") || line.toLowerCase().includes("wa.me");
            
            if (isWhatsAppMention) {
              return (
                <a
                  key={`wa-${lIdx}-${wIdx}`}
                  href="https://wa.me/8801332601510"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 mx-0.5 rounded bg-emerald-555 bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-semibold text-xs transition-all shadow-3xs hover:scale-105 active:scale-95 align-middle select-none decoration-transparent"
                  title="Open WhatsApp chat"
                >
                  <MessageSquare size={11} className="fill-white/10 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              );
            } else {
              return (
                <a
                  key={`phone-${lIdx}-${wIdx}`}
                  href="tel:+8801332601510"
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 mx-0.5 rounded bg-[#80461B]/10 hover:bg-[#80461B]/20 text-[#80461B] border border-[#80461B]/20 font-sans font-semibold text-xs transition-all shadow-3xs hover:scale-105 active:scale-95 align-middle select-none decoration-transparent"
                  title="Initiate direct dial call"
                >
                  <Phone size={9} className="shrink-0" />
                  <span>Call Dial</span>
                </a>
              );
            }
          }

          if (cleanWord.includes("wa.me/8801332601510") || cleanWord.includes("wa.me")) {
            return (
              <a
                key={`wa-link-${lIdx}-${wIdx}`}
                href="https://wa.me/8801332601510"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-1.5 py-0.5 mx-0.5 rounded bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-semibold text-xs transition-all shadow-3xs hover:scale-105 active:scale-95 align-middle select-none decoration-transparent"
                title="WhatsApp chat link"
              >
                <MessageSquare size={11} className="fill-white/10 shrink-0" />
                <span>WhatsApp</span>
              </a>
            );
          }

          if (cleanWord.includes("facebook.com") || cleanWord.includes("facebook.com/mymeditrip") || cleanWord === "mymeditrip") {
            return (
              <a
                key={`fb-${lIdx}-${wIdx}`}
                href="https://facebook.com/mymeditrip"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-1.5 py-0.5 mx-0.5 rounded bg-[#1877F2] hover:bg-[#166FE5] text-white font-sans font-semibold text-xs transition-all shadow-3xs hover:scale-105 active:scale-95 align-middle select-none decoration-transparent"
                title="Visit Meditrip Facebook Page"
              >
                <Facebook size={10} className="fill-white shrink-0" />
                <span>Facebook</span>
              </a>
            );
          }

          return word + " ";
        });

        return (
          <div key={lIdx} className="leading-relaxed">
            {renderedWords}
          </div>
        );
      })}
    </div>
  );
};

export const ChatMessageItem = ({ msg }: { msg: ChatMessage; key?: string }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(msg.text);
      setCopiedId(msg.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div
      className={`flex flex-col max-w-[85%] ${
        msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'
      }`}
    >
      <div
        className={`px-3.5 py-2.5 text-sm leading-normal rounded-xl whitespace-pre-line text-left select-text cursor-text ${
          msg.role === 'user'
            ? 'bg-emerald-50 border border-emerald-100 text-emerald-950 rounded-tr-none shadow-3xs font-medium'
            : 'bg-white text-slate-800 border border-slate-150 shadow-3xs rounded-tl-none font-medium'
        }`}
      >
        {msg.attachment && (
          <MessageAttachmentInfo attachment={msg.attachment} />
        )}
        {renderMessageContent(msg.text)}
      </div>
      
      <div className="flex items-center gap-1.5 mt-0.5 px-1 justify-between w-full">
        <span className="text-[9px] text-slate-400 inline-block shrink-0">
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>

        {msg.role === 'user' && (
          <div className="flex items-center text-slate-400">
            {msg.synced ? <CheckCheck size={12} className="text-emerald-500" /> : <Check size={12} />}
          </div>
        )}
        {msg.role === 'model' && (
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded hover:bg-black/[0.04] text-slate-400 hover:text-slate-655 transition-all cursor-pointer outline-none flex items-center gap-1 shrink-0"
            title="Copy text"
          >
            {copiedId === msg.id ? (
              <Check size={9} className="text-emerald-600 font-bold" />
            ) : (
              <Copy size={9} />
            )}
            <span className="text-[8px] text-slate-400 select-none">
              {copiedId === msg.id ? 'Copied' : 'Copy'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
