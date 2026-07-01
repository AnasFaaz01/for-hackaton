"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { HiBars3, HiXMark, HiChevronDown } from "react-icons/hi2";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/types";
import { voiceAlert } from "@/lib/tts";

const NAV_LINKS = [
 { href: "/", label: "Home" },
 { href: "/hand-mode", label: "Hand Mode" },
 { href: "/eye-mode", label: "Eye Mode" },
 { href: "/nurse-view", label: "Nurse View" },
 { href: "/logs", label: "Logs" },
 { href: "/about", label: "About" },
 { href: "/emergency", label: "Emergency", highlight: true },
];

export default function Navbar() {
 const [open, setOpen] = useState(false);
 const [langOpen, setLangOpen] = useState(false);
 const pathname = usePathname();
 const currentLang = voiceAlert.getLanguage();
 const currentLangInfo = SUPPORTED_LANGUAGES[currentLang];

 const handleLanguageChange = (lang: SupportedLanguage) => {
   voiceAlert.setLanguage(lang);
   setLangOpen(false);
 };

 return (
   <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="flex items-center justify-between h-16">
         <a href="/" className="flex items-center gap-2.5 shrink-0">
           <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-500/20">
             <span className="text-white font-extrabold text-sm tracking-tight">CS</span>
           </div>
           <div className="hidden sm:block">
             <span className="font-bold text-gray-800 text-lg tracking-tight">CareSpeak</span>
             <span className="text-blue-600 font-bold text-lg"> AI</span>
           </div>
         </a>

         <div className="hidden lg:flex items-center gap-1">
           {NAV_LINKS.map((link) => {
             const isActive = pathname === link.href;
             return (
               <a
                 key={link.href}
                 href={link.href}
                 className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                   isActive
                     ? link.highlight
                       ? "bg-red-50 text-red-700"
                       : "bg-blue-50 text-blue-700"
                     : link.highlight
                     ? "text-gray-600 hover:text-red-600 hover:bg-red-50/50"
                     : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                 }`}
               >
                 {link.label}
               </a>
             );
           })}
         </div>

         <div className="flex items-center gap-3">
           <div className="relative">
             <button
               onClick={() => setLangOpen(!langOpen)}
               className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors"
             >
               <span className="text-base">{currentLangInfo.native}</span>
               <HiChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
             </button>
             {langOpen && (
               <motion.div
                 initial={{ opacity: 0, y: -8 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
               >
                 {(Object.entries(SUPPORTED_LANGUAGES) as [SupportedLanguage, { label: string; native: string }][]).map(([code, info]) => (
                   <button
                     key={code}
                     onClick={() => handleLanguageChange(code)}
                     className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                       currentLang === code ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-600 hover:bg-gray-50"
                     }`}
                   >
                     <span>{info.native}</span>
                     <span className="text-gray-400 text-xs">{info.label}</span>
                   </button>
                 ))}
               </motion.div>
             )}
           </div>

           <button
             onClick={() => setOpen(!open)}
             className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
           >
             {open ? <HiXMark className="w-5 h-5" /> : <HiBars3 className="w-5 h-5" />}
           </button>
         </div>
       </div>
     </div>

     {open && (
       <motion.div
         initial={{ opacity: 0, height: 0 }}
         animate={{ opacity: 1, height: "auto" }}
         exit={{ opacity: 0, height: 0 }}
         className="lg:hidden border-t border-gray-100 bg-white"
       >
         <div className="px-4 py-3 space-y-1">
           {NAV_LINKS.map((link) => {
             const isActive = pathname === link.href;
             return (
               <a
                 key={link.href}
                 href={link.href}
                 onClick={() => setOpen(false)}
                 className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                   isActive
                     ? link.highlight
                       ? "bg-red-50 text-red-700"
                       : "bg-blue-50 text-blue-700"
                     : "text-gray-600 hover:bg-gray-50"
                 }`}
               >
                 {link.label}
               </a>
             );
           })}
         </div>
       </motion.div>
     )}
   </nav>
 );
}
