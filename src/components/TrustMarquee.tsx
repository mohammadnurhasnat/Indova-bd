import React from 'react';
import { ShieldCheck, Star, FolderOpen, MessageCircle, Award, Calendar, Plane } from 'lucide-react';

export function TrustMarquee() {
  const items = [
    { icon: ShieldCheck, text: "500+ Visa Processed", color: "text-[#80461B]" },
    { icon: Star, text: "Medical Visa Specialist", color: "text-amber-500" },
    { icon: FolderOpen, text: "Fast Documentation Support", color: "text-[#80461B]" },
    { icon: MessageCircle, text: "WhatsApp Instant Support", color: "text-emerald-500" },
    { icon: Award, text: "Transparent Processing", color: "text-amber-500" },
    { icon: Calendar, text: "IVAC Slot Booking", color: "text-[#80461B]" },
    { icon: Plane, text: "Air Ticket Booking", color: "text-sky-500" },
  ];

  return (
    <div id="trust-strip" className="relative z-10 py-6 bg-white/60 border-y border-black/[0.05] backdrop-blur-md overflow-hidden shadow-sm">
      <div className="max-w-full mx-auto px-4 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex gap-16 pr-16 items-center">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <span key={`original-${index}`} className="flex items-center gap-2.5 font-display font-semibold text-slate-700 text-sm">
                  <Icon className={item.color} size={16} /> {item.text}
                </span>
              );
            })}
          </div>
          {/* Duplicate list to enable continuous looping */}
          <div className="flex gap-16 pr-16 items-center">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <span key={`duplicate-${index}`} className="flex items-center gap-2.5 font-display font-semibold text-slate-700 text-sm">
                  <Icon className={item.color} size={16} /> {item.text}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
