import React, { useRef, useState } from 'react';
import { Paperclip, Send, X, FileText as FileTextIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { ChatAttachment } from '../../types';

interface ChatInputProps {
  chatInput: string;
  setChatInput: React.Dispatch<React.SetStateAction<string>>;
  isChatTyping: boolean;
  onSubmit: (e: React.FormEvent, attachment?: ChatAttachment | null) => void;
  playTypingSound: () => void;
  chatInputRef?: React.RefObject<HTMLInputElement>;
}

export const ChatInput = ({
  chatInput,
  setChatInput,
  isChatTyping,
  onSubmit,
  playTypingSound,
  chatInputRef
}: ChatInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<ChatAttachment | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            let width = img.width;
            let height = img.height;
            const MAX_SIZE = 1200;
            
            if (width > height && width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            } else if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
            
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);
            
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
            const base64Length = compressedDataUrl.length - (compressedDataUrl.indexOf(',') + 1);
            const sizeInBytes = 4 * Math.ceil(base64Length / 3) * 0.5624896334383812;
            
            if (sizeInBytes > 700 * 1024) {
              setFileError("ফাইলটি অনেক বড়। দয়া করে ছোট ফাইল আপলোড করুন।");
              setSelectedFile(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
              return;
            }
            
            setFileError(null);
            setSelectedFile({
              name: file.name,
              type: 'image/jpeg',
              data: compressedDataUrl,
            });
          };
          if (event.target?.result) {
            img.src = event.target.result as string;
          }
        };
        reader.readAsDataURL(file);
      } else {
        if (file.size > 700 * 1024) {
          setFileError("ফাইলটি অনেক বড় (৭০০ কেবি এর চেয়ে বেশি)। দয়া করে ছোট ফাইল আপলোড করুন, অথবা সরাসরি আমাদের হোয়াটসঅ্যাপে (+৮৮০১৩৩২৬০১৫১০) পাঠান।");
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          return;
        }
        setFileError(null);
        const reader = new FileReader();
        reader.onload = (event) => {
          setSelectedFile({
            name: file.name,
            type: file.type,
            data: event.target?.result as string,
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e, selectedFile);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      {/* Selected File Preview */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, height: 0, padding: 0 }}
            animate={{ opacity: 1, height: 'auto', padding: '8px 14px' }}
            exit={{ opacity: 0, height: 0, padding: 0 }}
            className="bg-emerald-50/80 border-t border-emerald-100 flex items-center justify-between overflow-hidden"
          >
            <div className="flex items-center gap-2 truncate">
              {selectedFile.type.startsWith('image/') && selectedFile.data ? (
                <div className="h-10 w-10 shrink-0 bg-slate-200 rounded overflow-hidden border border-emerald-200">
                  <img src={selectedFile.data} alt={selectedFile.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <FileTextIcon size={14} className="text-emerald-700 shrink-0" />
              )}
              <span className="text-xs font-semibold text-emerald-800 truncate" title={selectedFile.name}>
                {selectedFile.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
        {fileError && (
          <motion.div
            initial={{ opacity: 0, height: 0, padding: 0 }}
            animate={{ opacity: 1, height: 'auto', padding: '8px 14px' }}
            exit={{ opacity: 0, height: 0, padding: 0 }}
            className="bg-rose-50/85 border-t border-rose-100 flex items-center justify-between overflow-hidden gap-2"
          >
            <div className="flex-1 text-xs text-rose-800 font-medium">
              {fileError}
            </div>
            <button
              type="button"
              onClick={() => setFileError(null)}
              className="p-1 text-slate-400 hover:text-rose-500 transition-colors shrink-0"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleFormSubmit} className="p-2.5 border-t border-slate-200 bg-white flex items-center gap-2 shrink-0">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange}
        />
        <button
           type="button"
           onClick={() => fileInputRef.current?.click()}
           className="w-10 h-10 rounded-lg text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0"
           title="Attach Document/Image"
        >
           <Paperclip size={18} />
        </button>
        <input
          ref={chatInputRef}
          type="text"
          value={chatInput}
          onChange={(e) => {
            setChatInput(e.target.value);
            playTypingSound();
          }}
          placeholder="Ask anything (বাংলা/English)..."
          className="flex-1 text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-emerald-500 hover:border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none transition-all outline-none"
          disabled={isChatTyping}
        />
        <button
          type="submit"
          disabled={(!chatInput.trim() && !selectedFile) || isChatTyping}
          className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-250 hover:bg-emerald-100 flex items-center justify-center cursor-pointer transition-all hover:scale-[1.04] active:scale-[0.97] disabled:opacity-40 disabled:scale-100 outline-none focus:outline-none shrink-0 shadow-sm font-sans font-bold"
          aria-label="Send query"
        >
          <Send size={15} />
        </button>
      </form>
    </>
  );
};
