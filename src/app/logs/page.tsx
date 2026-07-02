"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Eye, Hand, Trash2, Volume2, Filter, Search, Download, FileText } from "lucide-react";
import { loadGestureLog, clearGestureLog, subscribeToGestureUpdates } from "@/lib/gestureLog";
import { GestureLogEntry } from "@/types";

const TYPE_CONFIG: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  hand: { icon: Hand, label: "Hand" },
  eye: { icon: Eye, label: "Eye" },
};

const GESTURE_COLORS: Record<string, string> = {
  YES: "text-teal-600", NO: "text-red-500", HELP: "text-amber-600",
  HELLO: "text-blue-600", WATER: "text-cyan-600", EMERGENCY: "text-red-600",
};

function getDateGroup(ts: number): string {
  const now = new Date();
  const date = new Date(ts);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const weekAgo = new Date(today.getTime() - 6 * 86400000);
  if (date >= today) return "Today";
  if (date >= yesterday) return "Yesterday";
  if (date >= weekAgo) return "This Week";
  return "Older";
}

export default function LogsPage() {
  const [log, setLog] = useState<GestureLogEntry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setLog(loadGestureLog());
    const unsub = subscribeToGestureUpdates(
      (entry) => setLog((prev) => [entry, ...prev].slice(0, 200)),
      () => setLog([])
    );
    return unsub;
  }, []);

  const handleClear = useCallback(() => { clearGestureLog(); setLog([]); setShowClearConfirm(false); }, []);
  const handleExport = useCallback(() => {
    const data = JSON.stringify(log, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `carespeak-log-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [log]);

  const filtered = useMemo(() => {
    let result = log;
    if (filter !== "all") result = result.filter((e) => e.type === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((e) => e.gesture.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
    }
    return result;
  }, [log, filter, search]);

  const grouped = useMemo(() => {
    const groups: Record<string, GestureLogEntry[]> = {};
    for (const entry of filtered) {
      const group = getDateGroup(entry.timestamp);
      if (!groups[group]) groups[group] = [];
      groups[group].push(entry);
    }
    return groups;
  }, [filtered]);

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + " " +
      d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  const filterOptions = [
    { value: "all", label: "All", icon: Filter },
    { value: "hand", label: "Hand", icon: Hand },
    { value: "eye", label: "Eye", icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 flex-wrap gap-4 pt-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium mb-3">
              <FileText className="w-3.5 h-3.5" />
              Gesture History
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Gesture Logs</h1>
            <p className="mt-1 text-sm text-slate-500">Complete history of all detected gestures</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleExport}
              className="px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm transition-all duration-200 flex items-center gap-2"
            ><Download className="w-4 h-4" /> Export JSON</button>
            <button onClick={() => setShowClearConfirm(true)}
              className="px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all duration-200 flex items-center gap-2 text-sm"
            ><Trash2 className="w-4 h-4" /> Clear</button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showClearConfirm && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 flex items-center justify-between"
            >
              <span className="text-red-600 text-sm">Clear all gesture history?</span>
              <div className="flex gap-2">
                <button onClick={handleClear} className="px-4 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-medium">Clear</button>
                <button onClick={() => setShowClearConfirm(false)} className="px-4 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium">Cancel</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            {filterOptions.map((opt) => {
              const Icon = opt.icon;
              const active = filter === opt.value;
              return (
                <button key={opt.value} onClick={() => setFilter(opt.value)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    active ? "bg-teal-50 text-teal-700 border border-teal-200" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                  }`}
                ><Icon className="w-3.5 h-3.5" /> {opt.label}</button>
              );
            })}
          </div>
          <div className="relative flex-1 max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input type="text" placeholder="Search gestures..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm placeholder-slate-400 focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>
          <div className="text-xs text-slate-400 whitespace-nowrap">{filtered.length} {filtered.length === 1 ? "entry" : "entries"}</div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-xl border-2 border-dashed border-slate-200 bg-white">
            <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No gestures found</p>
            <p className="text-slate-400 text-xs mt-1">
              {search ? "Try a different search term." : filter !== "all" ? `No ${filter} gestures logged.` : "Use Hand Mode or Eye Mode to start."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([group, entries]) => (
              <div key={group}>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">{group}</h3>
                <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                  <div className="divide-y divide-slate-100">
                    {entries.map((entry, i) => {
                      const cfg = TYPE_CONFIG[entry.type] ?? TYPE_CONFIG.hand;
                      const Icon = cfg.icon;
                      return (
                        <motion.div key={entry.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: Math.min(i * 0.02, 0.5) }}
                          className="flex items-center gap-4 p-3.5 hover:bg-slate-50 transition-colors"
                        >
                          <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-slate-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-base font-extrabold ${GESTURE_COLORS[entry.gesture] ?? "text-slate-900"}`}>{entry.gesture}</span>
                              <span className="text-xs text-slate-400 capitalize px-1.5 py-0.5 rounded-full bg-slate-100">{entry.type}</span>
                              <span className="text-[10px] text-slate-400">{Math.round(entry.confidence * 100)}%</span>
                            </div>
                            <div className="text-sm text-slate-500 truncate">{entry.description}</div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-[10px] text-slate-400">{formatTime(entry.timestamp)}</div>
                          </div>
                          <button onClick={() => {
                            if (typeof window !== "undefined" && window.speechSynthesis) {
                              window.speechSynthesis.cancel();
                              const u = new SpeechSynthesisUtterance(entry.description);
                              window.speechSynthesis.speak(u);
                            }
                          }} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" title="Replay"
                          ><Volume2 className="w-4 h-4" /></button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
