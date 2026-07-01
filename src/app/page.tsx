"use client";

import { motion } from "framer-motion";
import { HiHandRaised, HiEye, HiSpeakerWave, HiShieldCheck, HiBolt, HiDevicePhoneMobile } from "react-icons/hi2";

const FEATURES = [
  {
    icon: HiHandRaised,
    title: "Hand Gesture Recognition",
    desc: "Five distinct gestures — thumbs up, thumbs down, index+pinky, open palm, and both hands open — detected via on-device AI with temporal smoothing.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: HiEye,
    title: "Eye Movement Tracking",
    desc: "Iris tracking and blink detection enable communication by gaze direction, double-blink, and long-blink.",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: HiSpeakerWave,
    title: "Instant Voice Alerts",
    desc: "Every gesture triggers a spoken alert so nurses hear the patient&apos;s needs without watching the screen.",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    icon: HiShieldCheck,
    title: "100% Private",
    desc: "All AI runs in-browser via WebAssembly. No video, no data ever leaves your device.",
    gradient: "from-cyan-500 to-cyan-600",
  },
  {
    icon: HiBolt,
    title: "Real-time Inference",
    desc: "Sub-100ms latency. Optimized for CPU-only inference in Google Chrome on any modern laptop.",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    icon: HiDevicePhoneMobile,
    title: "No Setup Required",
    desc: "Open Chrome, grant camera access, and start communicating. No installation, no training, no servers.",
    gradient: "from-rose-500 to-rose-600",
  },
];

const GESTURE_PREVIEWS = [
  { gesture: "YES", emoji: "👍", desc: "Thumbs Up" },
  { gesture: "NO", emoji: "👎", desc: "Thumbs Down" },
  { gesture: "HELP", emoji: "🤘", desc: "Index & Pinky Extended" },
   { gesture: "PAUSE", emoji: "✊", desc: "Fist / Peace (✌️)" },
  { gesture: "WATER", emoji: "🤲", desc: "Both Hands Open" },
];

const EYE_PREVIEWS = [
  { gesture: "YES", emoji: "👁️", desc: "Look Left" },
  { gesture: "NO", emoji: "👁️", desc: "Look Right" },
  { gesture: "HELP", emoji: "👁️", desc: "Double Blink" },
  { gesture: "WATER", emoji: "👄", desc: "Open Mouth" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-50/30 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Hackathon 2026
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight"
          >
            Giving Every Patient{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400">
              a Voice
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto"
          >
            AI-powered communication for patients who cannot speak or move easily. Use hand gestures or eye movements to
            express needs — instantly converted to speech.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/hand-mode"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:translate-y-[-2px] transition-all duration-300"
            >
              <HiHandRaised className="w-5 h-5" />
              Start Hand Mode
            </a>
            <a
              href="/eye-mode"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-lg shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:translate-y-[-2px] transition-all duration-300"
            >
              <HiEye className="w-5 h-5" />
              Start Eye Mode
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Works in Chrome
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              No server required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              100% private
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <HiHandRaised className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-700">Hand Gestures</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {GESTURE_PREVIEWS.map((g) => (
                  <div key={g.gesture} className="text-center p-2 rounded-xl bg-gray-50/80 hover:bg-blue-50 hover:scale-105 transition-all duration-200">
                    <div className="text-2xl mb-0.5">{g.emoji}</div>
                    <div className="text-xs font-semibold text-blue-600">{g.gesture}</div>
                    <div className="text-[10px] text-gray-400">{g.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <HiEye className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-700">Eye Gestures</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {EYE_PREVIEWS.map((g) => (
                  <div key={g.gesture} className="text-center p-2 rounded-xl bg-gray-50/80 hover:bg-emerald-50 hover:scale-105 transition-all duration-200">
                    <div className="text-lg mb-0.5">{g.emoji}</div>
                    <div className="text-xs font-semibold text-emerald-600 mb-0.5">{g.gesture}</div>
                    <div className="text-[10px] text-gray-400">{g.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-medium mb-4">
              The Problem
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Millions of patients cannot communicate basic needs
            </h2>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
              Hospitalized patients who are intubated, paralyzed, or speech-impaired struggle to express pain, thirst, or
              the need for help. Nurses cannot always be at the bedside. Existing solutions are expensive, complex, or
              require significant movement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
              The Solution
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              How CareSpeak AI works
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map((feat) => (
              <motion.div
                key={feat.title}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1`}
                >
                  <feat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Three simple steps
            </h2>
            <p className="mt-3 text-gray-500 text-lg">
              From camera to voice alert in under 100ms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Camera detects", desc: "MediaPipe tracks 21 hand landmarks or 478 face landmarks in real-time via WebAssembly", color: "blue" },
              { step: "02", title: "AI classifies", desc: "Rule-based classifier with temporal smoothing identifies the gesture with confidence scoring", color: "emerald" },
              { step: "03", title: "Voice speaks", desc: "Browser TTS announces the need aloud so caregivers hear it immediately", color: "violet" },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm ${
                  s.color === "blue" ? "bg-blue-50 border border-blue-100" :
                  s.color === "emerald" ? "bg-emerald-50 border border-emerald-100" :
                  "bg-violet-50 border border-violet-100"
                }`}>
                  <span className={`text-2xl font-bold ${
                    s.color === "blue" ? "text-blue-600" :
                    s.color === "emerald" ? "text-emerald-600" :
                    "text-violet-600"
                  }`}>{s.step}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Ready to give every patient a voice?
            </h2>
            <p className="mt-4 text-blue-200 text-lg">
              No installation. No setup. Just open Chrome and start communicating.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/hand-mode"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-blue-700 font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <HiHandRaised className="w-5 h-5" />
                Try Hand Mode
              </a>
              <a
                href="/eye-mode"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-blue-500/20 text-white border border-blue-400/30 font-semibold text-lg hover:bg-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <HiEye className="w-5 h-5" />
                Try Eye Mode
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
