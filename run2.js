import fs from "fs";

let content = fs.readFileSync("src/App.tsx", "utf-8");

// 1. Fonts globally (for services, steps, packages, slots, etc.)
// Indian Visa Processing Services title:
content = content.replace(/text-xs sm:text-lg/g, "text-sm sm:text-xl");
// Steps title:
content = content.replace(/text-sm sm:text-base lg:text-lg/g, "text-base sm:text-lg lg:text-xl");
// Document Checker Packages title:
content = content.replace(/text-lg lg:text-xl/g, "text-xl lg:text-2xl");

// Change remaining tiny text paragraphs and lists:
content = content.replace(/text-xs leading-relaxed/g, "text-sm leading-relaxed");
content = content.replace(/text-\[9px\] uppercase tracking-wider/g, "text-[10px] sm:text-xs uppercase tracking-wider");
content = content.replace(/text-\[10px\] uppercase tracking-widest mt-1/g, "text-xs uppercase tracking-widest mt-1");
// Change global "text-[10px]" to "text-xs" for readability where applicable (button styles mostly)
content = content.replace(/text-\[10px\]/g, "text-xs");

// 2. Remove 1st photo's text + button (fast & trusted badge)
content = content.replace(/<div className="inline-flex items-center gap-2\.5 bg-white border border-black\/\[0\.08\] px-4 py-2 rounded-full mb-6 relative shadow-sm">[\s\S]*?<\/div>\s*<h1/m, "<h1");

// 3. IVAC Visa Slot Booking side-by-side (2 columns)
content = content.replace(/<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">/g, "<div className=\"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6\">");

// 4. "Let Us Assist You" section -> Remove the 3 boxes / buttons (lines matching WhatsApp, Email, Facebook)
content = content.replace(/\{\/\* Direct Communication points \*\/\}([\s\S]*?)<\/div>\s*<\/div>\s*\{\/\* Premium Glassmorphic Input Form Card \*\/\}/m, "\n            </div>\n\n            {/* Premium Glassmorphic Input Form Card */}");

// 5. "We Build Trust" part removals & updates
// Removed Indova BD badge + 500+ handling
content = content.replace(/\{\/\* Visual statistics list \*\/\}([\s\S]*?)<div className="grid grid-cols-2 gap-4">/m, "{/* Visual statistics list */}\n            <div className=\"backdrop-blur-2xl bg-white border border-black/[0.06] rounded-[30px] p-8 shadow-md relative order-last lg:order-first\">\n              <div className=\"grid grid-cols-3 gap-3\">");

// Remove the `500+` div block specifically
content = content.replace(/<div className="p-4 rounded-xl bg-slate-50 border border-black\/\[0\.04\] text-center transition-colors hover:bg-slate-100 shadow-sm">\s*<p className="font-display font-black text-2xl text-slate-900">500\+<\/p>\s*<p className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-semibold">Visas Handled<\/p>\s*<\/div>/m, "");

// 6 & 7. Footer stuff
content = content.replace(/mb-5">Quick Links<\/h4>\s*<div className="flex flex-col gap-3(?!.5)/m, "mb-5\">Quick Links</h4>\n              <div className=\"flex flex-col gap-1.5");
content = content.replace(/mb-5">Direct Contact<\/h4>\s*<div className="flex flex-col gap-3\.5/m, "mb-5\">Direct Contact</h4>\n              <div className=\"flex flex-col gap-1.5");
// Remove Visa Services column
content = content.replace(/\{\/\* Services Links Column \*\/\}([\s\S]*?)\{\/\* Office Contact Info Column \*\/\}/m, "{/* Office Contact Info Column */}");
// Adjust footer grid columns
content = content.replace(/className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4/g, "className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3");


fs.writeFileSync("src/App.tsx", content);
console.log("Replacements executed");
