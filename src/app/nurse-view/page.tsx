"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Clock, Eye, Hand, Trash2, Volume2, CheckCircle, Filter, Activity, BarChart3 } from "lucide-react";
import { loadGestureLog, subscribeToGestureUpdates, clearGestureLog, acknowledgeEntry, getStats } from "@/lib/gestureLog";
import { GestureLogEntry } from "@/types";

const TYPE_CONFIG: Record<string, { icon: React.ComponentType<{ className?: string }>; text: string }> = {
  hand: { icon: Hand, text: "text-teal-600" },
  eye: { icon: Eye, text: "text-teal-600" },
};

const GESTURE_BADGES: Record<string, { bg: string; text: string; label: string }> = {
  YES: { bg: "bg-teal-50", text: "text-teal-700", label: "Confirm" },
  NO: { bg: "bg-red-50", text: "text-red-600", label: "Refuse" },
  HELP: { bg: "bg-amber-50", text: "text-amber-700", label: "Assistance" },
  HELLO: { bg: "bg-blue-50", text: "text-blue-600", label: "Greeting" },
  WATER: { bg: "bg-cyan-50", text: "text-cyan-700", label: "Water/Food" },
  EMERGENCY: { bg: "bg-red-100", text: "text-red-700", label: "Emergency" },
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
      (entry) => { setLog((prev) => [entry, ...prev].slice(0, 200)); setLatest(entry); },
      () => { setLog([]); setLatest(null); },
      (entryId) => { setLog((prev) => prev.map((e) => e.id === entryId ? { ...e, acknowledged: true } : e)); }
    );
    return unsub;
  }, []);

  useEffect(() => {
    if (!latest) return;
    const interval = setInterval(() => setElapsed(Math.floor((Date.now() - latest.timestamp) / 1000)), 1000);
    return () => clearInterval(interval);
  }, [latest]);

  const handleClear = useCallback(() => { clearGestureLog(); setLog([]); setLatest(null); setShowClearConfirm(false); }, []);
  const handleAcknowledge = useCallback((id: string) => { acknowledgeEntry(id); setLog((prev) => prev.map((e) => e.id === id ? { ...e, acknowledged: true } : e)); }, []);

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
    const diffMin = Math.floor((now.getTime() - ts) / 60000);
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDescription = (entry: GestureLogEntry): string => entry.description.replace(/^[^—]*—\s*/, "");

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6 pt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium mb-3">
                <Bell className="w-3.5 h-3.5" />
                Nurse Dashboard
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Patient Communication Monitor</h1>
              <p className="mt-1 text-sm text-slate-500">Live feed of all patient gestures — acknowledge alerts as you respond.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setSoundOn((v) => !v)}
                className={`px-3 py-2 rounded-lg text-sm border transition-all duration-200 flex items-center gap-1.5 ${
                  soundOn ? "bg-white text-slate-700 border-slate-200" : "bg-slate-100 text-slate-400 border-slate-200"
                }`}
              >
                <Volume2 className="w-4 h-4" />
                {soundOn ? "Sound On" : "Sound Off"}
              </button>
              <button onClick={() => setShowClearConfirm(true)}
                className="px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all duration-200 flex items-center gap-2 text-sm"
              >
                <Trash2 className="w-4 h-4" /> Clear Log
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showClearConfirm && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 flex items-center justify-between"
            >
              <span className="text-red-600 text-sm">Clear all gesture history? This cannot be undone.</span>
              <div className="flex gap-2">
                <button onClick={handleClear} className="px-4 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors">Clear</button>
                <button onClick={() => setShowClearConfirm(false)} className="px-4 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors">Cancel</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Latest", value: latest ? <span className={GESTURE_BADGES[latest.gesture]?.text ?? "text-slate-900"}>{latest.gesture}</span> : "—", sub: latest ? formatTime(latest.timestamp) : "No alerts", delay: 0 },
            { label: "Today", value: stats.today, sub: "gestures recorded", delay: 0.05 },
            { label: "Unacknowledged", value: stats.unacknowledged, sub: "pending review", accent: stats.unacknowledged > 0, delay: 0.1 },
            { label: "Total", value: stats.total, sub: "all-time gestures", delay: 0.15 },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: stat.delay }}
              className="stat-card p-4"
            >
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">{stat.label}</div>
              <div className={`text-xl font-bold ${stat.accent ? "text-amber-600" : "text-slate-900"}`}>{stat.value}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            {(["all", "unacknowledged", "hand", "eye"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                  filter === f ? "bg-teal-50 text-teal-700 border border-teal-200" : "text-slate-500 hover:text-slate-700 border border-transparent"
                }`}
              >
                {f === "all" ? "All" : f === "unacknowledged" ? "Unread" : f === "hand" ? "Hand" : "Eye"}
              </button>
            ))}
          </div>
          <div className="text-xs text-slate-400">{filteredLog.length} of {log.length} entries</div>
        </div>

        {/* Log */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-slate-200 overflow-hidden bg-white"
        >
          {filteredLog.length === 0 ? (
            <div className="text-center py-16">
              <Bell className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No gestures recorded yet</p>
              <p className="text-slate-400 text-xs mt-1">Gestures from Hand or Eye mode will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredLog.map((entry, i) => {
                const badge = GESTURE_BADGES[entry.gesture] ?? GESTURE_BADGES.HELP;
                const typeCfg = TYPE_CONFIG[entry.type] ?? TYPE_CONFIG.hand;
                const Icon = typeCfg.icon;
                return (
                  <motion.div key={entry.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: Math.min(i * 0.02, 0.5) }}
                    className={`flex items-center gap-4 px-5 py-3.5 transition-all duration-200 ${
                      !entry.acknowledged ? "bg-teal-50/50 border-l-2 border-l-teal-500" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${badge.text}`}>{entry.gesture}</span>
                        <span className={`px-2 py-0.5 rounded ${badge.bg} ${badge.text} text-xs font-medium`}>{badge.label}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-xs">{entry.type}</span>
                        {!entry.acknowledged && <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 truncate">{formatDescription(entry)}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{formatTime(entry.timestamp)} &middot; {Math.round(entry.confidence * 100)}% confidence</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!entry.acknowledged && (
                        <button onClick={() => handleAcknowledge(entry.id)}
                          className="p-1.5 rounded-md bg-teal-50 hover:bg-teal-100 text-teal-600 transition-all duration-200" title="Acknowledge"
                        ><CheckCircle className="w-4 h-4" /></button>
                      )}
                      <button onClick={() => {
                        if (typeof window !== "undefined" && window.speechSynthesis) {
                          window.speechSynthesis.cancel();
                          const u = new SpeechSynthesisUtterance(entry.description);
                          window.speechSynthesis.speak(u);
                        }
                      }} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 transition-all duration-200" title="Replay"
                      ><Volume2 className="w-4 h-4" /></button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Gesture Breakdown */}
        {filteredLog.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-6 section-card p-5">
            <h3 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5 text-teal-500" />
              Gesture Breakdown
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {["YES", "NO", "HELP", "WATER", "HELLO", "EMERGENCY"].map((g) => {
                const count = filteredLog.filter((e) => e.gesture === g).length;
                const total = filteredLog.length;
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                const badge = GESTURE_BADGES[g] ?? GESTURE_BADGES.HELP;
                return (
                  <div key={g} className="text-center p-2.5 rounded-lg bg-slate-50">
                    <div className={`text-base font-bold ${badge.text}`}>{count}</div>
                    <div className="text-xs text-slate-400">{g}</div>
                    <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                      <div className={`h-full rounded-full ${badge.bg}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
