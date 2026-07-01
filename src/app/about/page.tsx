"use client";

import { motion } from "framer-motion";
import { HiShieldCheck, HiBolt, HiDevicePhoneMobile, HiGlobeAlt, HiHeart, HiAcademicCap } from "react-icons/hi2";

const TECH_STACK = [
  { name: "Next.js 15", desc: "App Router, React 19, TypeScript 5.8" },
  { name: "MediaPipe", desc: "Hand & face landmark detection via WASM" },
  { name: "Web Speech API", desc: "Browser-native text-to-speech" },
  { name: "Web Audio API", desc: "Synthesized alert tones (OscillatorNode)" },
  { name: "Tailwind CSS 4", desc: "Utility-first styling with dark mode" },
  { name: "BroadcastChannel", desc: "Cross-tab real-time synchronization" },
];

const ACCURACY_FEATURES = [
  "Temporal smoothing: 12-frame window with 75% majority vote",
  "Hold-time ramp: 800ms required for full confidence",
  "Resting-state debounce: auto-raises threshold after 5+ rapid transitions",
  "Multi-language TTS: 8 languages supported",
  "10-second cooldown prevents repeated same-gesture alerts",
  "Emergency alert with 10-second countdown and cancel capability",
];

const USE_CASES = [
  { title: "ICU & Critical Care", desc: "Intubated patients who cannot speak due to breathing tubes" },
  { title: "Post-Surgery Recovery", desc: "Patients emerging from anesthesia with limited mobility" },
  { title: "Stroke Rehabilitation", desc: "Individuals with aphasia or hemiparesis" },
  { title: "ALS / MND Care", desc: "Progressive condition where movement becomes limited" },
  { title: "Temporary Paralysis", desc: "Patients under neuromuscular blocking agents" },
  { title: "Speech Therapy", desc: "Augmentative communication during recovery" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
            <HiHeart className="w-4 h-4" />
            About CareSpeak AI
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Giving Every Patient a Voice
          </h1>
        </motion.div>

        {/* Problem */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-3xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Problem</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
              Millions of hospitalized patients worldwide cannot communicate basic needs because they are intubated,
              paralyzed, or speech-impaired. A sip of water, a need for help, or a simple yes or no becomes a struggle.
              Nurses and caregivers are stretched thin and cannot always be at the bedside. Existing assistive
              communication devices are expensive, complex, and require significant movement.
            </p>
          </div>
        </motion.section>

        {/* Solution */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl p-8 md:p-12 border border-blue-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Solution</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
              CareSpeak AI turns any laptop with a webcam into an assistive communication device. Using on-device AI
              (MediaPipe WebAssembly), it tracks hand gestures or eye movements in real-time and converts them into
              spoken voice alerts. No servers, no data leaves the device, and no expensive hardware is needed.
            </p>
          </div>
        </motion.section>

        {/* Pipeline */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">The AI Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Camera Input", desc: "Webcam captures video at 640x480. MediaPipe locates 21 hand landmarks or 478 face landmarks per frame at 30+ FPS.", color: "blue" },
              { step: "2", title: "Gesture Classification", desc: "Rule-based classifiers detect thumbs up/down, index-pinky, open palm, both-hands-open, gaze direction, and double-blinks with temporal smoothing.", color: "emerald" },
              { step: "3", title: "Voice Output", desc: "Web Speech API announces the gesture in the patient&apos;s chosen language. HELP & EMERGENCY also trigger a synthesized alert tone.", color: "violet" },
            ].map((s) => (
              <div key={s.step} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm ${
                  s.color === "blue" ? "bg-blue-50 text-blue-600" :
                  s.color === "emerald" ? "bg-emerald-50 text-emerald-600" :
                  "bg-violet-50 text-violet-600"
                }`}>
                  <HiAcademicCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Step {s.step}: {s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Privacy */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-3xl p-8 md:p-12 border border-green-100">
            <div className="flex items-center gap-3 mb-4">
              <HiShieldCheck className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Privacy First</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
              All AI processing happens entirely in your browser via WebAssembly. No video frames, no landmarks, no
              personal data are ever sent to a server. The system works offline after the initial model download. No
              accounts, no tracking, no cloud dependencies.
            </p>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <HiBolt className="w-7 h-7 text-blue-600" />
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-300">
                <h3 className="font-bold text-gray-900 mb-1">{tech.name}</h3>
                <p className="text-gray-500 text-sm">{tech.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Accuracy */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Noise Reduction & Accuracy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ACCURACY_FEATURES.map((feat, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <HiShieldCheck className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700 text-sm">{feat}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Use Cases */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Hospital Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                  <HiHeart className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{uc.title}</h3>
                <p className="text-gray-500 text-sm">{uc.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center py-12 border-t border-gray-100"
        >
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <HiGlobeAlt className="w-4 h-4" />
            Built for Hackathon 2026 — Open source, free to use
          </div>
          <div className="mt-2 text-gray-300 text-xs">
            CareSpeak AI v1.0.0 — Giving every patient a voice.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
