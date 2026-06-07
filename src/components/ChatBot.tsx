import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { ChatMessage, ChatAttachment } from '../types';

const ChatWindow = React.lazy(() => import('./chat/ChatWindow'));

interface ChatBotProps {
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  isChatTyping: boolean;
  setIsChatTyping: (typing: boolean) => void;
  chatInput: string;
  setChatInput: React.Dispatch<React.SetStateAction<string>>;
  handleChatSubmit: (e: React.FormEvent, attachment?: ChatAttachment | null) => void;
  handleClearChat: () => void;
  playTypingSound: () => void;
}

export function ChatBot({
  chatMessages,
  setChatMessages,
  isChatOpen,
  setIsChatOpen,
  isChatTyping,
  setIsChatTyping,
  chatInput,
  setChatInput,
  handleChatSubmit,
  handleClearChat,
  playTypingSound
}: ChatBotProps) {
  const [isChatHovered, setIsChatHovered] = useState(false);

  return (
    <div 
      className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-[1000] flex flex-col items-end select-text"
      onMouseEnter={() => setIsChatHovered(true)}
      onMouseLeave={() => setIsChatHovered(false)}
    >
      <AnimatePresence>
        {isChatOpen && (
          <Suspense fallback={null}>
            <ChatWindow 
              chatMessages={chatMessages}
              isChatOpen={isChatOpen}
              setIsChatOpen={setIsChatOpen}
              isChatTyping={isChatTyping}
              chatInput={chatInput}
              setChatInput={setChatInput}
              handleChatSubmit={handleChatSubmit}
              handleClearChat={handleClearChat}
              playTypingSound={playTypingSound}
            />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Floating Bubble Button */}
      <div className="flex items-center gap-1.5 font-sans">
        <AnimatePresence>
          {!isChatOpen && isChatHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => setIsChatOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white border border-black/[0.08] shadow-md backdrop-blur-md text-[11px] text-slate-800 font-display font-black tracking-wide flex items-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors shrink-0"
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full status-indicator-dot animate-pulse" />
              Meditrip Assistant
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => {
            setIsChatOpen(!isChatOpen);
            setIsChatHovered(false);
          }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#282828] hover:bg-[#1f1f1f] text-white border border-zinc-700/30 flex items-center justify-center shadow-lg hover:scale-[1.05] transition-all duration-200 cursor-pointer outline-none focus:outline-none relative"
          aria-label="Toggle Meditrip support chatbot"
        >
          {isChatOpen ? (
            <X size={20} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5.5 h-5.5 sm:w-6.5 sm:h-6.5 text-white shrink-0"
            >
              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z" />
              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
