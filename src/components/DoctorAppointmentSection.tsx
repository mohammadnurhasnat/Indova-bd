import React from 'react';
import { Stethoscope, RefreshCw, Check, MessageCircle } from 'lucide-react';
import { HOSPITALS_LIST } from '../data/additionalData';
import { RenderIcon } from './RenderIcon';

interface DoctorAppointmentSectionProps {
  setSelectedHospitalInfo: (info: any) => void;
  handleOpenUnifiedModal: (serviceType: string, defaultMessage: string) => void;
}

export function DoctorAppointmentSection({ setSelectedHospitalInfo, handleOpenUnifiedModal }: DoctorAppointmentSectionProps) {
  return (
    <section id="doctor-appointment" className="py-16 lg:py-24 relative z-10 bg-slate-50/70 border-y border-black/[0.05]">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid: Speciality Grid on Left, Feature Info on Right (Image 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Handcrafted Department Selector Grid (Image 2 Left) */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="bg-white border border-black/[0.04] rounded-[32px] p-6 sm:p-8 shadow-sm text-left relative transition-all hover:shadow-md duration-200">
              {/* Top Logo Badge */}
              <div className="w-14 h-14 rounded-2xl bg-[#80461B]/5 border border-[#80461B]/15 flex items-center justify-center mb-6 shadow-3xs">
                <Stethoscope className="w-7 h-7 text-[#80461B] stroke-[2.2]" />
              </div>

              {/* Main Title and Subtitle */}
              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight mb-3">
                Hospital Doctors Appointments
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-sans mb-8">
                Apollo, Fortis, Max Healthcare, AIIMS, Medanta, MGM, Manipal, Rabindranath Tagore, Caree Infertility, CMC, and global specialist booking.
              </p>

              {/* Department Label */}
              <div className="border-b border-dashed border-slate-205/60 pb-3 mb-5">
                <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-slate-400 uppercase font-sans">
                  Select a Specialized Department to Consult with Expert Doctors
                </span>
              </div>

              {/* Custom Grid Layout - 11 departments */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Cardiology', detail: 'Heart Care', icon: 'Heart' },
                  { name: 'Neurology', detail: 'Brain & Spine', icon: 'Brain' },
                  { name: 'Orthopedics', detail: 'Bone & Joints', icon: 'Bone' },
                  { name: 'Ophthalmology', detail: 'Eye Services', icon: 'Eye' },
                  { name: 'Oncology', detail: 'Cancer Care', icon: 'Activity' },
                  { name: 'Pediatrics', detail: 'Child Specialist', icon: 'Baby' },
                  { name: 'Gastroentrology', detail: 'Digestive Systems', icon: 'Activity' },
                  { name: 'Infertility (IVF)', detail: 'Fertility Support', icon: 'Sparkles' },
                  { name: 'Nephrology', detail: 'Kidney Health', icon: 'Droplet' },
                  { name: 'General Medicine', detail: 'Primary Care', icon: 'User' },
                  { name: 'ENT', detail: 'Ear, Nose & Throat', icon: 'Stethoscope' }
                ].map((spec) => (
                  <div
                    key={spec.name}
                    onClick={() => handleOpenUnifiedModal("Hospital Doctor Appointment", `Hello Meditrip, I would like to book an appointment with a specialist in the ${spec.name} (${spec.detail}) department.`)}
                    className="group p-3 sm:p-4 rounded-xl border border-black/[0.04] bg-slate-50/50 hover:bg-white hover:border-[#80461B]/35 hover:shadow-3xs transition-all duration-200 flex flex-col items-start gap-2.5 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#80461B]/5 text-[#80461B] flex items-center justify-center shrink-0 group-hover:bg-[#80461B] group-hover:text-white transition-colors">
                      <RenderIcon name={spec.icon} size={15} />
                    </div>
                    <div className="w-full text-left">
                      <span className="block text-xs font-bold text-slate-900 group-hover:text-[#80461B] transition-colors truncate">
                        {spec.name}
                      </span>
                      <span className="block text-[10px] text-slate-400 truncate font-sans mt-0.5">
                        {spec.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions & Detailed Attributes (Image 2 Right) */}
          <div className="lg:col-span-6 xl:col-span-5 text-left flex flex-col items-start justify-center">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 bg-[#80461B]/5 border border-[#80461B]/15 px-4 py-1.5 rounded-full mb-4 text-xs font-sans font-bold uppercase tracking-wider text-[#80461B]">
              Medical Bookings
            </span>

            {/* Heading */}
            <h2 className="font-display font-black text-3xl sm:text-4.5xl text-slate-900 tracking-tight leading-none mb-3">
              Hospital Doctor Appointment Booking Service
            </h2>

            {/* Golden Bronze Underline paired with small teal Sync Icon */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-16 h-1 bg-[#80461B] rounded-full" />
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981]">
                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow text-[#1FB57A]" />
              </div>
            </div>

            {/* Paragraph description */}
            <p className="text-slate-655 text-sm sm:text-[15px] leading-relaxed font-sans mb-8">
              To obtain an Indian Medical Visa, an online Doctor/Hospital Appointment invitation letter is mandatory. We provide genuine medical coordinator appointments directly with top Indian hospitals and provide the appointment letters immediately for your application.
            </p>

            {/* Column Check List */}
            <div className="space-y-5 w-full">
              {[
                {
                  title: "Genuine Invitation Invite",
                  desc: "Embassy approved hospital letters from Apollo, Fortis, Max Healthcare, AIIMS, Medanta, MGM, Manipal, Rabindranath Tagore, Caree Infertility, CMC"
                },
                {
                  title: "Fast Appointment Scheduling",
                  desc: "We manage hospital correspondence inside 24 to 48 hours"
                },
                {
                  title: "Attendants Invitation Checklist",
                  desc: "Up to 3 attendant invite credentials synchronized in single letter"
                }
              ].map((feat, fi) => (
                <div key={fi} className="flex gap-4 items-start">
                  {/* Pale green check icon wrapper */}
                  <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 shadow-3xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-sans leading-tight">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ═══════════════ PARTNER HOSPITALS SECTION (Image 1) ═══════════════ */}
        <div className="text-center pt-16 border-t border-black/[0.04] mt-16 mb-10">
          <span className="inline-flex items-center gap-1.5 bg-[#80461B]/5 border border-[#80461B]/15 px-4 py-1.5 rounded-full mb-3 text-xs font-sans font-bold uppercase tracking-wider text-[#80461B]">
            Trusted Networks
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4.5xl text-slate-900 tracking-tight">
            Our Partner Hospitals
          </h2>
          <div className="w-16 h-1 bg-[#80461B] mx-auto my-4 rounded-full" />
          <p className="text-slate-655 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            We collaborate with foremost super-specialty hospitals in India to schedule direct appointments and coordinate official embassy visa invitation letters.
          </p>
        </div>

        {/* Seamless left-to-right Auto-scrolling Marquee */}
        <div className="relative w-full overflow-hidden py-6 bg-white border-y border-black/[0.04] select-none mb-14">
          {/* Elegant blur overlays to cover fading edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50/70 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee-reverse flex whitespace-nowrap min-w-full">
            {/* First block of hospitals */}
            <div className="flex gap-12 pr-12 items-center flex-row">
              {HOSPITALS_LIST.map((hosp, idx) => (
                <div
                  key={`hosp-1-${idx}`}
                  onClick={() => setSelectedHospitalInfo(hosp)}
                  className="flex items-center gap-3 bg-slate-50 border border-black/[0.03] pl-3.5 pr-5 py-2.5 rounded-2xl shadow-3xs cursor-pointer hover:border-[#80461B]/20 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-white p-0.5 border border-black/[0.02] flex items-center justify-center shrink-0">
                    {hosp.logo}
                  </div>
                  <span className="font-display font-bold text-slate-800 text-xs sm:text-sm tracking-tight">
                    {hosp.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Second block of hospitals to loop seamlessly */}
            <div className="flex gap-12 pr-12 items-center flex-row">
              {HOSPITALS_LIST.map((hosp, idx) => (
                <div
                  key={`hosp-2-${idx}`}
                  onClick={() => setSelectedHospitalInfo(hosp)}
                  className="flex items-center gap-3 bg-slate-50 border border-black/[0.03] pl-3.5 pr-5 py-2.5 rounded-2xl shadow-3xs cursor-pointer hover:border-[#80461B]/20 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-white p-0.5 border border-black/[0.02] flex items-center justify-center shrink-0">
                    {hosp.logo}
                  </div>
                  <span className="font-display font-bold text-slate-800 text-xs sm:text-sm tracking-tight">
                    {hosp.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Card "Ready to Book Your Appointment?" (Image 1 Base) */}
        <div className="mt-12 text-center max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-[#80461B]/20 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
            <h3 className="font-display font-black text-slate-900 text-xl sm:text-2xl leading-tight mb-2">
              Ready to Book Your Appointment?
            </h3>
            <p className="text-slate-655 text-xs sm:text-sm max-w-xl mx-auto mb-6">
              Get direct embassy-approved invitation letters from any partner hospital of your choice and verify requirements instantly.
            </p>
            
            {/* Centered Cream Pill Button */}
            <button
              type="button"
              onClick={() => handleOpenUnifiedModal("Hospital Doctor Appointment", "Hello Meditrip, I want to book an appointment — please help me secure a doctor appointment.")}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FFFBF5] border border-[#80461B]/25 text-[#80461B] hover:bg-[#FFFBF5]/90 hover:border-[#80461B]/45 text-xs font-bold uppercase tracking-widest rounded-full shadow-xs transition-all hover:scale-[1.02] cursor-pointer shadow-3xs"
            >
              <MessageCircle size={14} className="stroke-[2.5]" /> Book Appointment Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
