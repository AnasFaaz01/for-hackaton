"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiBell, HiClock, HiEye, HiHandRaised, HiTrash, HiSpeakerWave, HiCheckCircle, HiFunnel, HiAdjustmentsHorizontal } from "react-icons/hi2";
import { loadGestureLog, subscribeToGestureUpdates, clearGestureLog, acknowledgeEntry, getStats } from "@/lib/gestureLog";
import { GestureLogEntry } from "@/types";

const TYPE_CONFIG: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; border: string; text: string }> = {
  hand: { icon: HiHandRaised, color: "blue", bg: "bg-blue-900/30", border: "border-blue-700/30", text: "text-blue-300" },
  eye: { icon: HiEye, color: "emerald", bg: "bg-emerald-900/30", border: "border-emerald-700/30", text: "text-emerald-300" },
};

const GESTURE_BADGES: Record<string, { bg: string; text: string; label: string }> = {
  YES: { bg: "bg-green-900/40", text: "text-green-400", label: "Confirm" },
  NO: { bg: "bg-red-900/40", text: "text-red-400", label: "Refuse" },
  HELP: { bg: "bg-amber-900/40", text: "text-amber-400", label: "Assistance" },
  HELLO: { bg: "bg-blue-900/40", text: "text-blue-400", label: "Greeting" },
  WATER: { bg: "bg-cyan-900/40", text: "text-cyan-400", label: "Water/Food" },
  EMERGENCY: { bg: "bg-red-900/60", text: "text-red-300", label: "Emergency" },
};

export default function NurseViewPage() {
  const [log, setLog] = useState<GestureLogEntry[]>([]);
  const [latest, setLatest] = useState<GestureLogEntry | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [filter, setFilter] = useState<"all" | "hand" | "eye" | "unacknowledged">("all");
  const [soundOn, setSoundOn] = useState(true);

  const stats = useMemo(() => getStats(), [log]);

  useEffect(() => {
    const entries = loadGestureLog();
    setLog(entries);
    setLatest(entries[0] ?? null);
  }, []);

  useEffect(() => {
    const unsub = subscribeToGestureUpdates(
      (entry) => {
        setLog((prev) => [entry, ...prev].slice(0, 200));
        setLatest(entry);
      },
      () => {
        setLog([]);
        setLatest(null);
      },
      (entryId) => {
        setLog((prev) => prev.map((e) => e.id === entryId ? { ...e, acknowledged: true } : e));
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

  const handleAcknowledge = useCallback((id: string) => {
    acknowledgeEntry(id);
    setLog((prev) => prev.map((e) => e.id === id ? { ...e, acknowledged: true } : e));
  }, []);

  const filteredLog = useMemo(() => {
    switch (filter) {
      case "hand": return log.filter((e) => e.type === "hand");
      case "eye": return log.filter((e) => e.type === "eye");
      case "unacknowledged": return log.filter((e) => !e.acknowledged);
      default: return log;
    }
  }, [log, filter]);

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    const now = new Date();
    const diffMs = now.getTime() - ts;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDescription = (entry: GestureLogEntry): string => {
    return entry.description.replace(/^[^—]*—\s*/, "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-900/50 text-rose-300 text-sm font-medium mb-4 border border-rose-700/30">
                <HiBell className="w-4 h-4" />
                Nurse Dashboard — Real-Time Patient Monitor
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Patient Communication Monitor
              </h1>
              <p className="mt-2 text-slate-400">
                Live feed of all patient gestures — acknowledge alerts as you respond.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSoundOn((v) => !v)}
                className={`px-3 py-2 rounded-xl text-sm border transition-all duration-200 flex items-center gap-1.5 ${
                  soundOn ? "bg-slate-700/50 text-slate-300 border-slate-600/50" : "bg-slate-800/50 text-slate-600 border-slate-700/30"
                }`}
              >
                <HiSpeakerWave className="w-4 h-4" />
                {soundOn ? "Sound On" : "Sound Off"}
              </button>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-4 py-2 rounded-xl bg-slate-700/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 text-sm border border-slate-600/50 hover:border-red-700/30 transition-all duration-200 flex items-center gap-2"
              >
                <HiTrash className="w-4 h-4" />
                Clear Log
              </button>
            </div>
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
                <button onClick={handleClear} className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors">Clear</button>
                <button onClick={() => setShowClearConfirm(false)} className="px-4 py-1.5 rounded-lg bg-slate-600 hover:bg-slate-500 text-white text-xs font-medium transition-colors">Cancel</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700/50 shadow-sm"
          >
            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">Latest</div>
            <div className="text-2xl font-bold text-white">
              {latest ? (
                <span className={GESTURE_BADGES[latest.gesture]?.text ?? "text-white"}>{latest.gesture}</span>
              ) : "—"}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {latest ? formatTime(latest.timestamp) : "No alerts"}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700/50 shadow-sm"
          >
            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">Today</div>
            <div className="text-2xl font-bold text-white">{stats.today}</div>
            <div className="text-xs text-slate-500 mt-1">gestures recorded</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700/50 shadow-sm"
          >
            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">Unacknowledged</div>
            <div className={`text-2xl font-bold ${stats.unacknowledged > 0 ? "text-amber-400" : "text-white"}`}>
              {stats.unacknowledged}
            </div>
            <div className="text-xs text-slate-500 mt-1">pending review</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700/50 shadow-sm"
          >
            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">Total</div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-xs text-slate-500 mt-1">all-time gestures</div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <HiFunnel className="w-4 h-4 text-slate-500" />
            {(["all", "unacknowledged", "hand", "eye"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  filter === f
                    ? "bg-slate-700 text-white border border-slate-600"
                    : "text-slate-400 hover:text-slate-300 border border-transparent"
                }`}
              >
                {f === "all" ? "All" : f === "unacknowledged" ? "Unread" : f === "hand" ? "Hand" : "Eye"}
              </button>
            ))}
          </div>
          <div className="text-xs text-slate-500">
            {filteredLog.length} of {log.length} entries
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-slate-700/50 shadow-xl overflow-hidden"
        >
          {filteredLog.length === 0 ? (
            <div className="text-center py-20">
              <HiBell className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No gestures recorded yet</p>
              <p className="text-slate-600 text-xs mt-1">Gestures from Hand or Eye mode will appear here in real time.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700/30">
              {filteredLog.map((entry, i) => {
                const badge = GESTURE_BADGES[entry.gesture] ?? GESTURE_BADGES.HELP;
                const typeCfg = TYPE_CONFIG[entry.type] ?? TYPE_CONFIG.hand;
                const Icon = typeCfg.icon;
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(i * 0.02, 0.5) }}
                    className={`flex items-center gap-4 px-6 py-4 transition-all duration-200 ${
                      !entry.acknowledged ? "bg-slate-700/20 border-l-2 border-l-amber-500" : "hover:bg-slate-700/10"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${typeCfg.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${typeCfg.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${badge.text}`}>{entry.gesture}</span>
                        <span className={`px-2 py-0.5 rounded ${badge.bg} ${badge.text} text-xs font-medium`}>
                          {badge.label}
                        </span>
                        <span className={`px-2 py-0.5 rounded ${typeCfg.bg} ${typeCfg.text} text-xs`}>
                          {entry.type}
                        </span>
                        {!entry.acknowledged && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 truncate">
                        {formatDescription(entry)}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {formatTime(entry.timestamp)} &middot; {Math.round(entry.confidence * 100)}% confidence
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!entry.acknowledged && (
                        <button
                          onClick={() => handleAcknowledge(entry.id)}
                          className="p-2 rounded-lg bg-emerald-900/30 hover:bg-emerald-700/40 text-emerald-400 transition-all duration-200"
                          title="Acknowledge"
                        >
                          <HiCheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.speechSynthesis) {
                            window.speechSynthesis.cancel();
                            const u = new SpeechSynthesisUtterance(entry.description);
                            window.speechSynthesis.speak(u);
                          }
                        }}
                        className="p-2 rounded-lg bg-slate-700/30 hover:bg-slate-600/50 text-slate-400 transition-all duration-200"
                        title="Replay"
                      >
                        <HiSpeakerWave className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
