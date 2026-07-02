"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, StopCircle, Volume2, Clock, Heart } from "lucide-react";
import { voiceAlert } from "@/lib/tts";

export default function EmergencyPage() {
  const [activated, setActivated] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!activated) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0 && activated) {
      setActivated(false);
    }
  }, [activated, countdown]);

  const handleEmergency = useCallback(() => {
    setActivated(true);
    setCountdown(10);
    voiceAlert.speak("EMERGENCY", "hand");
  }, []);

  const stopAlert = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setActivated(false);
    setCountdown(0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-medium mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            Emergency Alert System
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Emergency Alert</h1>
          <p className="mt-2 text-sm text-slate-500">Use only in case of urgent medical need. Triggers an immediate voice alert.</p>
        </motion.div>

        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="mt-10 flex flex-col items-center">
          <button
            onClick={activated ? stopAlert : handleEmergency}
            className={`relative w-56 h-56 rounded-full flex flex-col items-center justify-center text-white font-bold text-xl shadow-lg transition-all duration-300 ${
              activated
                ? "bg-red-600 scale-95 shadow-red-500/30"
                : "bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95 shadow-red-500/20"
            }`}
          >
            {activated ? (
              <>
                <div className="absolute inset-0 rounded-full border-4 border-red-400/50 animate-ping" />
                <StopCircle className="w-10 h-10 mb-2 relative z-10" />
                <span className="text-base relative z-10">STOP</span>
                <span className="text-xs font-normal mt-1 opacity-80 relative z-10">{countdown}s</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-10 h-10 mb-2 relative z-10" />
                <span className="text-base relative z-10">TAP FOR</span>
                <span className="text-xl relative z-10">EMERGENCY</span>
              </>
            )}
          </button>

          <AnimatePresence>
            {activated ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="mt-5 flex flex-col items-center gap-2"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Alert active — speaking loudly
                </div>
                <p className="text-xs text-slate-400">Tap the button again or wait {countdown}s to cancel.</p>
              </motion.div>
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-xs text-slate-400">
                Tap the red button above to alert caregivers immediately.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {[
            { icon: Volume2, title: "Voice Alert", desc: "A loud voice alert plays: \"EMERGENCY — Medical assistance required immediately!\"" },
            { icon: Clock, title: "Auto-expires", desc: "The alert automatically stops after 10 seconds. Tap the button to cancel early." },
            { icon: Heart, title: "Caregiver Notice", desc: "Alert plays through browser speakers. Caregivers hear it even if not watching the screen." },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="section-card p-5"
              >
                <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-red-500" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{card.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
