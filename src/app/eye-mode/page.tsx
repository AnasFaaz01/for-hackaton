"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiEye, HiMicrophone, HiArrowPath, HiVideoCamera, HiStop, HiPause } from "react-icons/hi2";
import { useEyeGesture } from "@/hooks/useEyeGesture";
import { EYE_GESTURE_MAP } from "@/types";

const GESTURE_GUIDE = [
  { label: "YES", desc: "Look Left" },
  { label: "NO", desc: "Look Right" },
  { label: "HELP", desc: "Double Blink (fast)" },
  { label: "WATER", desc: "Open Mouth" },
  { label: "PAUSE", desc: "Close eyes 3s then open wide to resume", cls: "text-amber-400 border-amber-700/30 bg-amber-900/20" },
];

export default function EyeModePage() {
  const {
    videoRef, canvasRef, gesture, confidence,
    loading, error, cameraOn, faceDetected, isPaused, startCamera, stopCamera,
  } = useEyeGesture();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/50 text-emerald-300 text-sm font-medium mb-4 border border-emerald-700/30">
            <HiEye className="w-4 h-4" />
            Eye Gesture Mode
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Eye Gesture Communication
          </h1>
          <p className="mt-3 text-slate-400 text-lg max-w-2xl mx-auto">
            Use your eyes and face — look left, right, open your mouth, or blink twice. Close eyes for 3s to pause.
          </p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-xl mx-auto mb-6 p-4 rounded-2xl bg-red-900/50 border border-red-700/50 text-red-300 text-sm shadow-lg"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isPaused && cameraOn && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-xl mx-auto mb-4 p-3 rounded-2xl bg-amber-900/40 border border-amber-600/40 text-amber-300 text-sm text-center font-medium shadow-lg flex items-center justify-center gap-2"
            >
              <HiPause className="w-4 h-4" />
              System PAUSED — Open eyes wide to resume
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] ring-1 ring-white/10">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/95 z-20">
                  <div className="text-center">
                    <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-300 text-sm font-medium">Loading face tracking model...</p>
                    <p className="text-slate-500 text-xs mt-1">Downloading MediaPipe WASM (may take a moment)</p>
                  </div>
                </div>
              )}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                playsInline
                muted
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {!cameraOn && !loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/95 z-10">
                  <div className="text-center max-w-xs">
                    <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-dashed border-emerald-400/30 flex items-center justify-center mx-auto mb-6">
                      <HiVideoCamera className="w-10 h-10 text-emerald-400/60" />
                    </div>
                    <button
                      onClick={startCamera}
                      className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-lg shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      Start Camera
                    </button>
                    <p className="mt-4 text-slate-500 text-xs">
                      Chrome will ask for camera permission. Please allow it.
                    </p>
                  </div>
                </div>
              )}

              {cameraOn && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-sm text-white/80 text-xs font-medium flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-amber-500" : faceDetected ? "bg-emerald-500" : "bg-yellow-500"}`} />
                  {isPaused ? "PAUSED" : faceDetected ? "Face Detected" : "No Face"}
                </div>
              )}
            </div>

            {cameraOn && (
              <div className="flex items-center gap-3">
                <button
                  onClick={stopCamera}
                  className="px-5 py-2.5 rounded-xl bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-200 flex items-center gap-2"
                >
                  <HiStop className="w-4 h-4" />
                  Stop Camera
                </button>
                <span className={`text-sm flex items-center gap-1.5 ${isPaused ? "text-amber-400" : faceDetected ? "text-emerald-400" : "text-slate-500"}`}>
                  <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-amber-500" : faceDetected ? "bg-emerald-500 animate-pulse" : "bg-slate-600"}`} />
                  {isPaused ? "Paused — tracking off" : faceDetected ? "Face detected — tracking eyes" : "No face in view"}
                </span>
              </div>
            )}

            <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-900/50 flex items-center justify-center">
                  <HiMicrophone className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200">Voice Alerts Active</div>
                  <div className="text-xs text-slate-500">
                    Eye gestures trigger spoken alerts. HELP requires 2s hold before alert.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {isPaused ? (
                <motion.div
                  key="paused"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gradient-to-br from-amber-900/60 to-amber-950/60 rounded-3xl p-8 border border-amber-700/50 shadow-xl text-center"
                >
                  <div className="text-6xl mb-2">⏸</div>
                  <div className="text-2xl font-bold text-amber-300 mb-1">PAUSED</div>
                  <div className="text-sm text-amber-400/70 mb-5">Tracking suspended</div>
                  <div className="text-xs text-amber-400/50">Open eyes wide to resume</div>
                </motion.div>
              ) : gesture && confidence > 0.5 ? (
                <motion.div
                  key="result"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50 shadow-xl text-center"
                >
                  <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 mb-1">
                    {gesture}
                  </div>
                  <div className="text-sm text-slate-400 mb-5">
                    {EYE_GESTURE_MAP[gesture]?.description}
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(confidence * 100, 100)}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 rounded-full"
                    />
                  </div>
                  <div className="mt-2 text-xs font-medium text-slate-500">
                    {Math.round(confidence * 100)}% confidence
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-xs font-medium border border-green-700/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Speaking alert...
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="waiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 border-2 border-dashed border-slate-700/50 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                    <HiEye className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-slate-400 font-medium">Waiting for eye gesture...</p>
                  <p className="text-slate-600 text-xs mt-1">Move your eyes or blink to communicate</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-sm">
              <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                <HiArrowPath className="w-4 h-4 text-emerald-400" />
                Eye Gesture Guide
              </h3>
              <div className="space-y-2.5">
                {GESTURE_GUIDE.map((g) => {
                  const isActive = gesture === g.label;
                  const isPauseItem = g.label === "PAUSE";
                  return (
                    <div
                      key={g.label}
                      className={`flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 ${
                        isPauseItem
                          ? isPaused
                            ? "bg-amber-900/40 border border-amber-600/40 scale-[1.02]"
                            : "hover:bg-amber-900/20 border border-transparent"
                          : isActive
                            ? "bg-emerald-900/30 border border-emerald-700/30 scale-[1.02]"
                            : "hover:bg-slate-700/30 border border-transparent"
                      }`}
                    >
                      <span className={`font-bold text-sm ${
                        isPauseItem
                          ? isPaused ? "text-amber-300" : "text-slate-400"
                          : isActive ? "text-emerald-300" : "text-slate-300"
                      }`}>
                        {g.label}
                      </span>
                      <span className="text-slate-500 text-xs">{g.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                const entry = gesture ? EYE_GESTURE_MAP[gesture] : null;
                if (entry && typeof window !== "undefined" && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                  const u = new SpeechSynthesisUtterance(entry.description);
                  window.speechSynthesis.speak(u);
                }
              }}
              disabled={!gesture}
              className={`w-full py-3.5 rounded-2xl transition-all duration-200 text-sm font-medium ${
                gesture
                  ? "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 hover:border-slate-500"
                  : "bg-slate-800/50 text-slate-600 border border-slate-700/30 cursor-not-allowed"
              }`}
            >
              Replay Last Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
