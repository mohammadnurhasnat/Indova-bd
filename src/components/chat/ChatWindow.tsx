import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2 } from 'lucide-react';
import { ChatMessageItem } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { ChatMessage, ChatAttachment } from '../../types';

interface ChatWindowProps {
  chatMessages: ChatMessage[];
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  isChatTyping: boolean;
  chatInput: string;
  setChatInput: React.Dispatch<React.SetStateAction<string>>;
  handleChatSubmit: (e: React.FormEvent, attachment?: ChatAttachment | null) => void;
  handleClearChat: () => void;
  playTypingSound: () => void;
}

const ChatWindow = ({
  chatMessages,
  isChatOpen,
  setIsChatOpen,
  isChatTyping,
  chatInput,
  setChatInput,
  handleChatSubmit,
  handleClearChat,
  playTypingSound
}: ChatWindowProps) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen, isChatTyping]);

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => chatInputRef.current?.focus(), 250);
    }
  }, [isChatOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 15 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="mb-3.5 bg-white/95 backdrop-blur-xl border border-black/[0.08] rounded-2xl shadow-[0_12px_44px_rgba(30,41,59,0.14)] w-[calc(100vw-24px)] sm:max-w-[420px] h-[520px] sm:h-[590px] max-h-[calc(100vh-130px)] flex flex-col overflow-hidden"
    >
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="bg-transparent border-b border-black/[0.06] text-slate-800 py-3 px-4 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-black text-sm tracking-tight leading-none text-slate-800">
              Meditrip Assistant
            </h3>
            {isChatTyping && (
              <span className="text-[10px] text-emerald-600 animate-pulse italic ml-1 font-sans font-bold">
                typing...
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClearChat}
              className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-sans font-extrabold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200/50 rounded-lg transition-all cursor-pointer outline-none focus:outline-none"
              title="Clear Chat History"
            >
              <Trash2 size={12} className="relative top-[-0.5px]" />
              <span>Clear Chat</span>
            </button>
            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              className="p-1 rounded-lg hover:bg-black/[0.05] text-slate-400 hover:text-slate-700 transition-colors cursor-pointer outline-none focus:outline-none flex items-center justify-center"
              aria-label="Close Chat"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        <div 
          className="flex-1 overflow-y-auto overscroll-contain p-3.5 space-y-3 bg-slate-50 flex flex-col select-text"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {chatMessages.map((msg) => (
            <ChatMessageItem key={msg.id} msg={msg} />
          ))}

          <AnimatePresence>
            {isChatTyping && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, height: "auto", scale: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, scale: 0.9, y: 5 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="self-start flex flex-col items-start max-w-[85%] origin-bottom-left overflow-hidden shrink-0"
              >
                <div className="px-3.5 py-2.5 bg-white border border-slate-200 shadow-3xs rounded-xl rounded-tl-none flex items-center gap-1.5 mt-1 select-none">
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0 }}
                    className="w-1.5 h-1.5 bg-[#80461B]/50 rounded-full"
                  />
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.18 }}
                    className="w-1.5 h-1.5 bg-[#80461B]/80 rounded-full"
                  />
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.36 }}
                    className="w-1.5 h-1.5 bg-[#80461B] rounded-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        <ChatInput 
          chatInput={chatInput}
          setChatInput={setChatInput}
          isChatTyping={isChatTyping}
          onSubmit={handleChatSubmit}
          playTypingSound={playTypingSound}
          chatInputRef={chatInputRef}
        />
      </div>
    </motion.div>
  );
};

export default ChatWindow;
