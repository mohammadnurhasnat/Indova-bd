import React, { useState, useEffect, useRef, useMemo } from 'react';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import type { ChatMessage, ChatAttachment } from '../types';

export function useChat() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('meditrip_chat_open');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [isChatTyping, setIsChatTyping] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>('');

  // Unified Chat state initialization with unique user id
  const sessionId = useMemo(() => {
    try {
      let id = localStorage.getItem('meditrip_session_id');
      if (!id) {
        id = 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('meditrip_session_id', id);
      }
      return id;
    } catch {
      return 'usr_temp_' + Date.now();
    }
  }, []);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const defaultGreetingText = `আসসালামু আলাইকুম,

This is Mohammad from Meditrip.

I'm pleased to connect with you.

As your Meditrip Assistant, I'm ready to assist you.`;

    try {
      const lastChatTimeStr = localStorage.getItem('meditrip_last_chat_time');
      if (lastChatTimeStr) {
        const lastChatTime = parseInt(lastChatTimeStr, 10);
        if (!isNaN(lastChatTime) && Date.now() - lastChatTime > 12 * 60 * 60 * 1000) {
          localStorage.removeItem('meditrip_chat_history');
        }
      }
    } catch (err) {
      console.error("Error Checking 12-hour expiration", err);
    }

    try {
      const saved = localStorage.getItem('meditrip_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp)
          }));
        }
      }
    } catch (e) {
      console.error("Failed to load chat history from localStorage", e);
    }
    return [
      {
        id: 'welcome',
        role: 'model',
        text: defaultGreetingText,
        timestamp: new Date()
      }
    ];
  });

  // Sync Chats from DB so user can receive admin messages
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chat_sessions', sessionId), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data && data.messages) {
          setChatMessages(prev => {
            // only update if db messages length > local to avoid local overwriting while sending
            if (data.messages.length > prev.length || (data.messages.length > 0 && prev.length === 1)) {
              return data.messages;
            }
            return prev;
          });
        }
      }
    }, (error) => {
      console.warn("Snapshot listener permission warning:", error);
    });
    return () => unsub();
  }, [sessionId]);

  // Sync to Firestore continuously
  useEffect(() => {
    const syncToDb = async () => {
      try {
        const nonSynced = chatMessages.filter(msg => msg.role === 'user' && !msg.synced);
        if (chatMessages.length <= 1 && nonSynced.length === 0) return; // don't sync just welcome msg
        
        // Safely clean and format messages array to remove any accidental 'undefined' fields before Firestore storage
        const cleanMessages = chatMessages.map(msg => {
          const cleanedMsg: any = {
            id: msg.id || "usr_" + Math.random().toString(36).substring(2, 11),
            role: msg.role || 'user',
            text: msg.text || '',
            timestamp: msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp)
          };
          if (msg.attachment !== undefined && msg.attachment !== null) {
            const cleanedAttachment: any = {};
            if (msg.attachment.id !== undefined) cleanedAttachment.id = msg.attachment.id;
            if (msg.attachment.name !== undefined) cleanedAttachment.name = msg.attachment.name;
            if (msg.attachment.type !== undefined) cleanedAttachment.type = msg.attachment.type;
            cleanedMsg.attachment = cleanedAttachment;
          }
          return cleanedMsg;
        });

        await setDoc(doc(db, 'chat_sessions', sessionId), {
          userId: sessionId,
          messages: cleanMessages,
          updatedAt: serverTimestamp()
        }, { merge: true });

        if (nonSynced.length > 0) {
          setChatMessages(prev => prev.map(m => nonSynced.some(un => un.id === m.id) ? { ...m, synced: true } : m));
        }

      } catch(e) {
        console.error("Failed to sync chat to DB", e);
      }
    };
    syncToDb();
  }, [chatMessages, sessionId]);

  // Synchronize chat history/state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('meditrip_chat_history', JSON.stringify(chatMessages));
    } catch (e) {
      console.error("Failed to save chat history to localStorage", e);
    }
  }, [chatMessages]);

  useEffect(() => {
    try {
      localStorage.setItem('meditrip_chat_open', isChatOpen ? 'true' : 'false');
    } catch (e) {
      console.error("Failed to save chat open state to localStorage", e);
    }
  }, [isChatOpen]);

  // Synthesize a premium audio 'pop' sound effect using the Web Audio API
  const playPopSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      // Harmonic pleasant transition: from C5 (523.25 Hz) to E5 (659.25 Hz)
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch {
      // Catch browser blocking policies without crashing
    }
  };

  // Synthesize a very quiet, satisfying tactile keypress/tick typing sound using Web Audio API
  const playTypingSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      const randFreq = 1000 + Math.random() * 300;
      osc.frequency.setValueAtTime(randFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore audio block issues
    }
  };

  const handleClearChat = () => {
    const welcomeMsg = {
      id: 'welcome',
      role: 'model' as const,
      text: `আসসালামু আলাইকুম,

This is Mohammad from Meditrip.

I'm pleased to connect with you.

As your Meditrip Assistant, I'm ready to assist you.`,
      timestamp: new Date()
    };
    setChatMessages([welcomeMsg]);
    try {
      localStorage.setItem('meditrip_chat_history', JSON.stringify([welcomeMsg]));
    } catch (e) {
      console.error("Failed to clear chat history from localStorage", e);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent, attachment?: ChatAttachment | null) => {
    e.preventDefault();
    if (!chatInput.trim() && !attachment) return;

    const userMsg = chatInput.trim();
    setChatInput('');

    // Save timestamp of latest user message interaction for 12-hour expiration tracking
    try {
      localStorage.setItem('meditrip_last_chat_time', Date.now().toString());
    } catch (err) {
      console.error(err);
    }

    let finalAttachmentData: any = attachment ? { ...attachment } : undefined;

    if (finalAttachmentData && finalAttachmentData.data) {
      try {
        const { collection } = await import('firebase/firestore');
        const attachRef = doc(collection(db, 'chat_attachments'));
        
        const cleanAttachData: any = {
          name: finalAttachmentData.name || 'document',
          type: finalAttachmentData.type || 'application/octet-stream',
          data: finalAttachmentData.data,
          userId: sessionId,
          createdAt: serverTimestamp()
        };

        await setDoc(attachRef, cleanAttachData);
        
        finalAttachmentData = {
          id: attachRef.id,
          name: cleanAttachData.name,
          type: cleanAttachData.type
        };
      } catch(err) {
        console.warn("Failed to upload attachment", err);
        finalAttachmentData = undefined;
      }
    }

    const userMessageObject: ChatMessage = {
      id: "usr_" + Math.random().toString(36).substring(2, 11),
      role: 'user',
      text: userMsg,
      timestamp: new Date()
    };
    if (finalAttachmentData !== undefined && finalAttachmentData !== null) {
      userMessageObject.attachment = finalAttachmentData;
    }

    setChatMessages(prev => [...prev, userMessageObject]);
    setIsChatTyping(true);

    const botMsgId = "bot_" + Math.random().toString(36).substring(2, 11);
    setChatMessages(prev => [...prev, {
      id: botMsgId,
      role: 'model',
      text: '',
      timestamp: new Date()
    }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsg || (finalAttachmentData ? `[ফাইল সংযুক্ত করা হয়েছে: ${finalAttachmentData.name}]` : "হ্যালো"),
          history: chatMessages.slice(-10).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text || (msg.attachment ? `[ফাইল সংযুক্ত করা হয়েছে: ${msg.attachment.name}]` : "হ্যালো") }]
          }))
        })
      });

      if (!response.ok) {
        throw new Error("API returned an error");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No readable stream in response");
      }

      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          if (trimmed.startsWith("data: ")) {
            try {
              const jsonStr = trimmed.substring(6);
              const parsed = JSON.parse(jsonStr);
              if (parsed && typeof parsed.text === 'string') {
                playTypingSound();
                setChatMessages(prev => prev.map(msg => {
                  if (msg.id === botMsgId) {
                    return { ...msg, text: msg.text + parsed.text };
                  }
                  return msg;
                }));
              }
            } catch (e) {
              console.error("Error parsing message chunk", e);
            }
          }
        }
      }
      playPopSound();
    } catch (err) {
      console.error("Chatbot query dispatch failed:", err);
      setChatMessages(prev => prev.map(msg => {
        if (msg.id === botMsgId) {
          if (msg.text && msg.text.trim().length > 15) {
            return {
              ...msg,
              text: msg.text + "\n\n*(নেটওয়ার্ক সংযোগ বিঘ্নিত হয়েছে। অনুগ্রহ করে আবার প্রশ্ন করুন অথবা সরাসরি আমাদের হোয়াটসঅ্যাপ নাম্বারে যোগাযোগ করুন)*"
            };
          }
          return {
            ...msg,
            text: 'প্রিয় গ্রাহক, এই মুহূর্তে চ্যাটে আমাদের কোনো লাইভ প্রতিনিধি বা এজেন্ট উপলব্ধ নেই। কোনো প্রতিনিধি ফ্রি হওয়া মাত্রই আপনার সাথে যোগাযোগ করবেন। অথবা অনুগ্রহ করে সরাসরি আমাদের অফিসিয়াল হোয়াটসঅ্যাপ নাম্বারে যোগাযোগ করতে পারেন। সাময়িক এই যান্ত্রিক সমস্যার জন্য আমরা অত্যন্ত আন্তরিকভাবে দুঃখিত।'
          };
        }
        return msg;
      }));
      playPopSound();
    } finally {
      setIsChatTyping(false);
    }
  };

  return {
    isChatOpen,
    setIsChatOpen,
    isChatTyping,
    setIsChatTyping,
    chatInput,
    setChatInput,
    chatMessages,
    setChatMessages,
    playTypingSound,
    handleClearChat,
    handleChatSubmit,
    sessionId
  };
}
