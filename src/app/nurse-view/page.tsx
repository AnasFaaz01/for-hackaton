"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiBell, HiClock, HiEye, HiHandRaised, HiTrash, HiSpeakerWave } from "react-icons/hi2";
import { loadGestureLog, subscribeToGestureUpdates, clearGestureLog } from "@/lib/gestureLog";
import { GestureLogEntry } from "@/types";

const TYPE_CONFIG: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; border: string; text: string }> = {
  hand: { icon: HiHandRaised, color: "blue", bg: "bg-blue-900/30", border: "border-blue-700/30", text: "text-blue-300" },
  eye: { icon: HiEye, color: "emerald", bg: "bg-emerald-900/30", border: "border-emerald-700/30", text: "text-emerald-300" },
};

const GESTURE_COLORS: Record<string, string> = {
  YES: "text-green-400", NO: "text-red-400", HELP: "text-amber-400",
  HELLO: "text-blue-400", WATER: "text-cyan-400", EMERGENCY: "text-red-400",
};

export default function NurseViewPage() {
  const [log, setLog] = useState<GestureLogEntry[]>([]);
  const [latest, setLatest] = useState<GestureLogEntry | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const entries = loadGestureLog();
    setLog(entries);
    setLatest(entries[0] ?? null);

    const unsub = subscribeToGestureUpdates(
      (entry) => {
        setLog((prev) => [entry, ...prev].slice(0, 200));
        setLatest(entry);
      },
      () => {
        setLog([]);
        setLatest(null);
      }
    );

    return unsub;
  }, []);

  useEffect(() => {
    if (!latest) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - latest.timestamp) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [latest]);

  const handleClear = useCallback(() => {
    clearGestureLog();
    setLog([]);
    setLatest(null);
    setShowClearConfirm(false);
  }, []);

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  const formatElapsed = (seconds: number) => {
    if (seconds < 60) return `${seconds}s ago`;
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins}m ${seconds % 60}s ago`;
    const hrs = Math.floor(mins / 60);
    return `${hrs}h ${mins % 60}m ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-900/50 text-rose-300 text-sm font-medium mb-4 border border-rose-700/30">
                <HiBell className="w-4 h-4" />
                Nurse Dashboard — Real-Time
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Patient Communication Monitor
              </h1>
              <p className="mt-2 text-slate-400">
                Live feed of all patient gestures across Hand and Eye modes.
              </p>
            </div>
            <button
              onClick={() => setShowClearConfirm(true)}
              className="px-4 py-2 rounded-xl bg-slate-700/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 text-sm border border-slate-600/50 hover:border-red-700/30 transition-all duration-200 flex items-center gap-2"
            >
              <HiTrash className="w-4 h-4" />
              Clear Log
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-2xl bg-red-900/30 border border-red-700/30 flex items-center justify-between"
            >
              <span className="text-red-300 text-sm">Clear all gesture history? This cannot be undone.</span>
              <div className="flex gap-2">
                <button
                  onClick={handleClear}
                  className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-1.5 rounded-lg bg-slate-600 hover:bg-slate-500 text-white text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50"
          >
            <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Last Gesture</div>
            {latest ? (
              <div>
                <div className={`text-4xl font-extrabold ${GESTURE_COLORS[latest.gesture] ?? "text-white"} mt-1`}>
                  {latest.gesture}
                </div>
                <div className="text-slate-400 text-sm mt-1">{latest.description}</div>
                <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                  <HiClock className="w-3 h-3" />
                  {formatElapsed(elapsed)}
                </div>
              </div>
            ) : (
              <div className="text-slate-500 text-sm mt-2">No gestures recorded yet</div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50"
          >
            <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Total Gestures</div>
            <div className="text-4xl font-extrabold text-white mt-1">{log.length}</div>
            <div className="flex items-center gap-3 mt-3">
              {(["hand", "eye"] as const).map((type) => {
                const count = log.filter((e) => e.type === type).length;
                const cfg = TYPE_CONFIG[type];
                return (
                  <div key={type} className="flex items-center gap-1 text-xs text-slate-500">
                    <cfg.icon className={`w-3 h-3 ${cfg.text}`} />
                    <span>{count}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50"
          >
            <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Alert Status</div>
            <div className="flex items-center gap-3 mt-3">
              <span className={`w-3 h-3 rounded-full ${latest ? "bg-green-500 animate-pulse" : "bg-slate-600"}`} />
              <span className="text-white text-sm font-medium">
                {latest ? `Active — last alert ${formatElapsed(elapsed)}` : "Monitoring..."}
              </span>
            </div>
            <div className="mt-3 text-xs text-slate-500">
              Dashboard updates in real-time across all open tabs
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {log.length === 0 ? (
            <div className="text-center py-20 bg-slate-800/20 rounded-3xl border-2 border-dashed border-slate-700/50">
              <HiBell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">No gestures recorded yet</p>
              <p className="text-slate-600 text-sm mt-1">
                Open Hand Mode or Eye Mode to start recording gestures
              </p>
            </div>
          ) : (
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-slate-700/50 overflow-hidden">
              <div className="divide-y divide-slate-700/30">
                {log.map((entry, i) => {
                  const cfg = TYPE_CONFIG[entry.type] ?? TYPE_CONFIG.hand;
                  const Icon = cfg.icon;
                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className={`flex items-center gap-4 p-4 transition-colors ${
                        i === 0 ? "bg-slate-700/30" : "hover:bg-slate-700/20"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${cfg.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-extrabold ${GESTURE_COLORS[entry.gesture] ?? "text-white"}`}>
                            {entry.gesture}
                          </span>
                          <span className="text-xs text-slate-500 capitalize px-2 py-0.5 rounded-full bg-slate-700/50">
                            {entry.type}
                          </span>
                        </div>
                        <div className="text-sm text-slate-400 truncate">{entry.description}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs text-slate-500">{formatTime(entry.timestamp)}</div>
                        <div className="text-[10px] text-slate-600">
                          {Math.round(entry.confidence * 100)}% confidence
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.speechSynthesis) {
                            window.speechSynthesis.cancel();
                            const u = new SpeechSynthesisUtterance(entry.description);
                            window.speechSynthesis.speak(u);
                          }
                        }}
                        className="p-2 rounded-lg hover:bg-slate-600/30 text-slate-500 hover:text-slate-300 transition-colors"
                        title="Replay alert"
                      >
                        <HiSpeakerWave className="w-4 h-4" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
