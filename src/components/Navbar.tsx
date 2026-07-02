"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Hand, Eye, Activity, FileText, Info, AlertTriangle } from "lucide-react";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/types";
import { voiceAlert } from "@/lib/tts";

const NAV_LINKS = [
  { href: "/hand-mode", label: "Hand Mode", icon: Hand },
  { href: "/eye-mode", label: "Eye Mode", icon: Eye },
  { href: "/nurse-view", label: "Nurse", icon: Activity },
  { href: "/logs", label: "Logs", icon: FileText },
  { href: "/about", label: "About", icon: Info },
  { href: "/emergency", label: "Emergency", icon: AlertTriangle, highlight: true },
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
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <a href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center transition-colors duration-200">
              <span className="text-white font-bold text-xs tracking-tight">CS</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-white text-base tracking-tight">CareSpeak</span>
              <span className="text-teal-400 font-semibold text-base"> AI</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <a key={link.href} href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? link.highlight
                        ? "bg-red-500/10 text-red-400"
                        : "bg-med-500/10 text-med-400"
                      : link.highlight
                      ? "text-slate-500 hover:text-red-400 hover:bg-red-500/5"
                      : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all duration-200"
              >
                <span className="text-xs">{currentLangInfo.native}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    className="absolute right-0 top-full mt-1.5 w-44 rounded-xl bg-[#0f172a] border border-white/10 shadow-xl shadow-black/40 py-1 z-50"
                  >
                    {(Object.entries(SUPPORTED_LANGUAGES) as [SupportedLanguage, { label: string; native: string }][]).map(([code, info]) => (
                      <button key={code} onClick={() => handleLanguageChange(code)}
                        className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center gap-2 ${
                          currentLang === code ? "text-teal-400 bg-teal-500/10 font-medium" : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                        }`}
                      >
                        <span>{info.native}</span>
                        <span className="text-slate-700 text-[10px]">{info.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all duration-200"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/5 bg-[#0a0f1c]"
          >
            <div className="px-4 py-2 space-y-0.5">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <a key={link.href} href={link.href} onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? link.highlight ? "bg-red-500/10 text-red-400" : "bg-med-500/10 text-med-400"
                        : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
