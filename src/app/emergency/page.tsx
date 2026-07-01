"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { HiExclamationTriangle, HiStop, HiSpeakerWave, HiShieldExclamation } from "react-icons/hi2";
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
    <div className="min-h-screen bg-gradient-to-b from-red-50/30 via-white to-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-4 shadow-sm">
            <HiExclamationTriangle className="w-4 h-4" />
            Emergency Alert System
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Emergency Alert
          </h1>
          <p className="mt-3 text-gray-500 text-lg">
            Use only in case of urgent medical need. Triggers an immediate voice alert.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="mt-12 flex flex-col items-center"
        >
          <button
            onClick={activated ? stopAlert : handleEmergency}
            className={`relative w-72 h-72 rounded-full flex flex-col items-center justify-center text-white font-bold text-2xl shadow-2xl transition-all duration-300 ${
              activated
                ? "bg-red-500 scale-95 shadow-red-500/50"
                : "bg-gradient-to-br from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 hover:scale-105 active:scale-95 shadow-red-500/30 hover:shadow-red-500/50"
            }`}
          >
            {activated ? (
              <>
                <HiStop className="w-14 h-14 mb-3" />
                <span className="text-lg">STOP</span>
                <span className="text-sm font-normal mt-1 opacity-80">{countdown}s</span>
              </>
            ) : (
              <>
                <div className="absolute inset-0 rounded-full border-4 border-red-400/30 animate-ping" />
                <div className="absolute inset-4 rounded-full border-2 border-red-300/20 animate-pulse" />
                <HiExclamationTriangle className="w-14 h-14 mb-3 relative z-10" />
                <span className="relative z-10">TAP FOR</span>
                <span className="relative z-10 text-3xl">EMERGENCY</span>
              </>
            )}
          </button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            {activated ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Alert active — speaking loudly
                </div>
                <p className="text-sm text-gray-400">
                  Tap the button again or wait {countdown}s to cancel.
                </p>
              </motion.div>
            ) : (
              <p className="text-sm text-gray-400">
                Tap the red button above to alert caregivers immediately.
              </p>
            )}
          </motion.div>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
              <HiSpeakerWave className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Voice Alert</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              A loud voice alert plays: &ldquo;EMERGENCY — Medical assistance required immediately!&rdquo;
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
              <HiShieldExclamation className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Auto-expires</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              The alert automatically stops after 10 seconds. Tap the button to cancel early.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <HiExclamationTriangle className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Caregiver Notice</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Alert plays through browser speakers. Caregivers hear it even if they are not watching the screen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
