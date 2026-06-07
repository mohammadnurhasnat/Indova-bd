import fs from "fs";

let content = fs.readFileSync("src/App.tsx", "utf-8");

const oldText = `<div className="text-slate-650 text-xs sm:text-sm leading-relaxed flex flex-col gap-4 font-sans max-w-xl text-left">
                <p>
                  Indova BD is Bangladesh's vetted Indian visa logistics platform. We reduce the complexity of profile audits, embassy checks, state declarations, and scheduling calendars. Whether you are seeking immediate expert clinical consultations in India, business trades invitation letters, or spouse entry approvals, we provide complete, transparent support.
                </p>
                <p>
                  We coordinate with premier hospital networks across India, preparing mandatory invitations letters and securing IVAC server appointments dates effortlessly. Our core business operations value centers around a simple guarantee: <strong>your passport visa timeline is our responsibility.</strong>
                </p>
              </div>`;

const newText = `<div className="text-slate-650 text-sm leading-relaxed flex flex-col gap-4 font-sans max-w-xl text-left">
                <p>
                  Indova BD is Bangladesh’s premier logistics platform for Indian visas. We streamline complex processes like profile audits, embassy checks, and appointment scheduling. Whether you need medical consultations, business invitation letters, or spouse entry approvals, we provide transparent, end-to-end support.
                </p>
                <p>
                  By coordinating directly with top Indian hospital networks, we ensure effortless documentation and timely IVAC appointments. At Indova BD, <strong>your visa timeline is our responsibility.</strong>
                </p>
              </div>`;

content = content.replace(oldText, newText);


const oldGrids = `{/* Integrity bullet grids */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-8 w-full">
                {[
                  '✓ Transparency',
                  '✓ Speed Processing',
                  '✓ Strict Accuracy',
                  '✓ Client First',
                  '✓ Dedicated Agents',
                  '✓ Verified Letters'
                ].map((val) => (
                  <div key={val} className="py-2.5 px-3 bg-white border border-black/[0.05] rounded-lg text-slate-700 font-sans font-bold text-[11px] text-center shadow-sm">
                    {val}
                  </div>
                ))}
              </div>`;

const newGrids = `{/* Integrity bullet grids */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 w-full">
                {[
                  { title: 'Transparency', icon: null },
                  { title: 'Speed', icon: 'Zap' },
                  { title: 'Client First', icon: 'Heart' },
                  { title: 'Excellence', icon: 'Star' },
                  { title: 'Trust', icon: 'Handshake' },
                  { title: 'Accuracy', icon: 'CheckCircle2' }
                ].map((val) => (
                  <div key={val.title} className="py-3 px-4 bg-white border border-black/[0.04] rounded-xl text-slate-800 font-sans font-bold text-sm text-left shadow-sm flex items-center gap-3 transition-colors hover:bg-slate-50">
                    {val.icon && <RenderIcon name={val.icon as any} size={16} className="text-slate-900" />}
                    {!val.icon && <div className="w-4" />}
                    {val.title}
                  </div>
                ))}
              </div>`;

content = content.replace(oldGrids, newGrids);


const oldStats = `{/* Visual statistics list */}
            <div className="backdrop-blur-2xl bg-white border border-black/[0.06] rounded-[30px] p-8 shadow-md relative order-last lg:order-first">
              <div className="grid grid-cols-3 gap-3">
                
                <div className="p-4 rounded-xl bg-slate-50 border border-black/[0.04] text-center transition-colors hover:bg-slate-100 shadow-sm">
                  <p className="font-display font-black text-2xl text-[#80461B]">7-10</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-semibold">Working Days</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-black/[0.04] text-center transition-colors hover:bg-slate-100 shadow-sm">
                  <p className="font-display font-black text-2xl text-slate-900">5+</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-semibold">Categories</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-black/[0.04] text-center transition-colors hover:bg-slate-100 shadow-sm">
                  <p className="font-display font-black text-2xl text-emerald-600">24/7</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-semibold">Live Support</p>
                </div>
              </div>
            </div>`;

const newStats = `{/* Visual statistics list */}
            <div className="bg-white border border-black/[0.06] rounded-[20px] p-2 sm:p-3 shadow-sm relative order-last lg:order-first w-full max-w-lg mx-auto">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                
                <div className="p-3 sm:p-5 rounded-xl bg-slate-50 border border-black/[0.04] text-center transition-colors hover:bg-slate-100 flex flex-col justify-center items-center">
                  <p className="font-display font-black text-lg sm:text-2xl text-[#80461B]">7-10</p>
                  <p className="text-[9px] sm:text-[11px] text-slate-500 uppercase tracking-widest mt-1 font-semibold leading-tight">Working Days</p>
                </div>
                <div className="p-3 sm:p-5 rounded-xl bg-slate-50 border border-black/[0.04] text-center transition-colors hover:bg-slate-100 flex flex-col justify-center items-center">
                  <p className="font-display font-black text-lg sm:text-2xl text-slate-900">5+</p>
                  <p className="text-[9px] sm:text-[11px] text-slate-500 uppercase tracking-widest mt-1 font-semibold leading-tight">Categories</p>
                </div>
                <div className="p-3 sm:p-5 rounded-xl bg-slate-50 border border-black/[0.04] text-center transition-colors hover:bg-slate-100 flex flex-col justify-center items-center">
                  <p className="font-display font-black text-lg sm:text-2xl text-emerald-600">24/7</p>
                  <p className="text-[9px] sm:text-[11px] text-slate-500 uppercase tracking-widest mt-1 font-semibold leading-tight">Live Support</p>
                </div>
              </div>
            </div>`;

content = content.replace(oldStats, newStats);

fs.writeFileSync("src/App.tsx", content);
console.log("Done updates");
