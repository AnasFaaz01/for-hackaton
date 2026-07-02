"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Eye, RotateCcw, Camera, StopCircle, Pause, ArrowLeft, ArrowRight, HelpCircle, Droplets, Activity, Fingerprint, Volume2 } from "lucide-react";
import { useEyeGesture } from "@/hooks/useEyeGesture";
import { EYE_GESTURE_MAP } from "@/types";
import { voiceAlert } from "@/lib/tts";

const GESTURE_GUIDE = [
  { label: "YES", desc: "Look Left", icon: ArrowLeft, color: "bg-teal-50 text-teal-600" },
  { label: "NO", desc: "Look Right", icon: ArrowRight, color: "bg-red-50 text-red-500" },
  { label: "HELP", desc: "Double Blink (fast)", icon: HelpCircle, color: "bg-amber-50 text-amber-500" },
  { label: "WATER", desc: "Open Mouth", icon: Droplets, color: "bg-cyan-50 text-cyan-600" },
  { label: "PAUSE", desc: "Close eyes 5s to pause", icon: Pause, color: "bg-slate-100 text-slate-500" },
];

export default function EyeModePage() {
  const {
    videoRef, canvasRef, gesture, confidence,
    loading, error, cameraOn, faceDetected, isPaused, startCamera, stopCamera,
  } = useEyeGesture();

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6 pt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium mb-3">
                <Eye className="w-3.5 h-3.5" />
                Eye Gesture Mode
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Eye Tracking Dashboard
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Use your eyes and face — look left, right, open your mouth, or blink twice. Close eyes for 5s to pause.
              </p>
            </div>
            {cameraOn && (
              <button onClick={stopCamera}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-100 transition-all duration-200"
              >
                <StopCircle className="w-4 h-4" />
                Stop Camera
              </button>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm"
            >{error}</motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isPaused && cameraOn && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium flex items-center gap-2"
            >
              <Pause className="w-4 h-4" />
              System paused — Open eyes wide to resume
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Camera */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative overflow-hidden rounded-xl aspect-[4/3] border border-slate-200 bg-white">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
                  <div className="text-center">
                    <div className="w-10 h-10 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-slate-700 text-sm font-medium">Loading face tracking model...</p>
                    <p className="text-slate-400 text-xs mt-1">Downloading MediaPipe WASM</p>
                  </div>
                </div>
              )}
              <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover scale-x-[-1]" playsInline muted />
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

              {!cameraOn && !loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <div className="text-center max-w-xs">
                    <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-dashed border-teal-300 flex items-center justify-center mx-auto mb-5">
                      <Camera className="w-7 h-7 text-teal-400" />
                    </div>
                    <button onClick={startCamera}
                      className="px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-sm transition-all duration-200 active:scale-[0.97]"
                    >
                      Start Camera
                    </button>
                    <p className="mt-3 text-slate-400 text-xs">Chrome will ask for camera permission</p>
                  </div>
                </div>
              )}

              {cameraOn && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 border border-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 shadow-sm">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? "bg-amber-500" : faceDetected ? "bg-teal-500" : "bg-slate-300"}`} />
                  {isPaused ? "PAUSED" : faceDetected ? "Face Detected" : "No Face"}
                </div>
              )}
            </div>

            {cameraOn && (
              <div className="dashboard-card p-3 flex items-center gap-3">
                <span className={`flex items-center gap-1.5 text-sm ${isPaused ? "text-amber-600" : faceDetected ? "text-teal-600" : "text-slate-400"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? "bg-amber-500" : faceDetected ? "bg-teal-500" : "bg-slate-300"}`} />
                  {isPaused ? "Paused — tracking off" : faceDetected ? "Face detected — tracking eyes" : "No face in view"}
                </span>
                <div className="flex-1" />
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Volume2 className="w-3 h-3" />
                  Voice alerts active
                </div>
              </div>
            )}
          </div>

          {/* Gesture Panel */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {isPaused ? (
                <motion.div key="paused" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                  className="section-card p-8 text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                    <Pause className="w-7 h-7 text-amber-500" />
                  </div>
                  <div className="text-xl font-bold text-amber-700 mb-1">PAUSED</div>
                  <div className="text-sm text-slate-500 mb-4">Tracking suspended</div>
                  <div className="text-xs text-slate-400">Open eyes wide to resume</div>
                </motion.div>
              ) : gesture && confidence > 0.5 ? (
                <motion.div key="result" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                  className="section-card p-8 text-center"
                >
                  <div className="text-5xl font-extrabold text-teal-600 mb-2">
                    {gesture}
                  </div>
                  <div className="text-sm text-slate-600 mb-5">
                    {EYE_GESTURE_MAP[gesture]?.description}
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(confidence * 100, 100)}%` }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-teal-500 rounded-full"
                    />
                  </div>
                  <div className="mt-1.5 text-xs font-medium text-slate-400">
                    {Math.round(confidence * 100)}% confidence
                  </div>
                  <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium border border-teal-200">
                    Gesture detected
                  </div>
                </motion.div>
              ) : (
                <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="section-card p-8 text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <Fingerprint className="w-7 h-7 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-medium">Waiting for eye gesture...</p>
                  <p className="text-slate-400 text-xs mt-1">Move your eyes or blink to communicate</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="section-card p-5">
              <h3 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2 uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-teal-500" />
                Eye Gesture Guide
              </h3>
              <div className="space-y-1.5">
                {GESTURE_GUIDE.map((g) => {
                  const Icon = g.icon;
                  const isActive = gesture === g.label;
                  const isPauseItem = g.label === "PAUSE";
                  return (
                    <div key={g.label}
                      className={`flex items-center justify-between p-2 rounded-lg transition-all duration-200 ${
                        isPauseItem
                          ? isPaused ? "bg-amber-50 border border-amber-200" : "hover:bg-slate-50 border border-transparent"
                          : isActive ? "bg-teal-50 border border-teal-200" : "hover:bg-slate-50 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-md ${g.color} flex items-center justify-center`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className={`font-semibold text-sm ${isPauseItem ? isPaused ? "text-amber-700" : "text-slate-500" : isActive ? "text-teal-700" : "text-slate-600"}`}>
                          {g.label}
                        </span>
                      </div>
                      <span className="text-slate-400 text-xs">{g.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button onClick={() => {
              if (gesture) voiceAlert.speak(gesture, "eye");
            }} disabled={!gesture}
              className={`w-full py-3 rounded-lg transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2 border ${
                gesture ? "section-card border-slate-200 hover:bg-slate-50 text-slate-600" : "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Replay Last Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
