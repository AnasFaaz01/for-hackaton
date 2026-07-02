"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Hand, Eye, Volume2, Activity, Heart, ChevronRight, User, Stethoscope, BarChart3, Clock, AlertTriangle, MessageCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function LandingPage() {
  return (
    <div className="bg-[#0a0f1c] text-slate-200">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay muted loop playsInline
            poster="/hero-bg.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-teal-400 text-xs font-medium uppercase tracking-wider">
                On-Device AI Assistive Communication
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight text-balance"
            >
              For patients who{" "}
              <span className="text-teal-400">cannot speak</span>
              , a simple gesture is enough.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl text-balance"
            >
              One in five hospitalized patients cannot communicate basic needs 
              — thirst, pain, help. CareSpeak AI runs entirely on-device, 
              translating hand gestures and eye movements into spoken alerts. 
              No servers. No expensive hardware. No setup.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a href="/hand-mode"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all duration-200 active:scale-[0.97]"
              >
                <Hand className="w-4 h-4" />
                Try Hand Gesture Mode
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="/eye-mode"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium text-sm transition-all duration-200 active:scale-[0.97]"
              >
                <Eye className="w-4 h-4" />
                Try Eye Tracking Mode
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 flex flex-wrap gap-5 text-xs text-slate-600"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500/60" />
                Runs in your browser
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500/60" />
                No data leaves your device
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500/60" />
                No setup, no cost
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500"
              >
                The Problem
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight text-balance"
              >
                Intubated. Paralyzed. Speech-impaired.{" "}
                <span className="text-teal-400">How do you ask for help?</span>
              </motion.h2>
            </div>
            <div className="lg:col-span-3 space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-400 leading-relaxed text-balance"
              >
                In ICUs and recovery wards around the world, millions of patients 
                are awake and aware but cannot speak. A breathing tube prevents 
                words from forming. Paralysis or weakness makes signaling impossible. 
                A single need — <em className="text-slate-300 not-italic">a sip of water, 
                I&apos;m in pain, I need help</em> — becomes a crisis of silence.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-base sm:text-lg text-slate-400 leading-relaxed"
              >
                Nurses are stretched thin. Existing assistive devices are expensive, 
                complex, and require movement many patients simply cannot make.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { value: "478", label: "Face landmarks tracked per frame", detail: "MediaPipe Face Landmarker" },
              { value: "21", label: "Hand landmarks per hand", detail: "21-point skeletal model" },
              { value: "8", label: "Supported languages", detail: "TTS voice alerts" },
              { value: "30+", label: "Frames per second", detail: "Real-time on CPU" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="stat-card p-5 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1 leading-relaxed">{stat.label}</div>
                <div className="text-[10px] text-slate-700 mt-1">{stat.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 lg:py-32 medical-gradient border-t border-white/5 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500"
            >
              How It Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight text-balance"
            >
              Camera to voice in{" "}
              <span className="text-teal-400">under half a second</span>
            </motion.h2>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Camera detects",
                desc: "MediaPipe runs on-device via WebAssembly, tracking hand landmarks or facial features frame by frame at 30+ FPS — no server, no uploads.",
                detail: "On-device ML via WebAssembly",
              },
              {
                step: "02",
                title: "AI classifies",
                desc: "Gesture classifiers identify thumbs up/down, gaze direction, double-blinks, open mouth, and more. Temporal smoothing filters noise and false triggers.",
                detail: "Rule-based + temporal smoothing",
              },
              {
                step: "03",
                title: "Voice speaks",
                desc: "Browser TTS announces the need aloud in the patient's chosen language. A distinct alert tone plays for each gesture — nurses hear it immediately.",
                detail: "Web Speech API, 8 languages",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="section-card p-7"
              >
                <span className="text-teal-500/40 text-4xl font-bold">{step.step}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <span className="text-[11px] text-slate-600">{step.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GESTURES OVERVIEW ─── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500"
          >
            Supported Gestures
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight text-balance"
          >
            Two modes. Four essential needs. One voice alert.
          </motion.h2>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hand Mode */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="section-card p-7"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-med-500/10 border border-med-500/20 flex items-center justify-center">
                  <Hand className="w-5 h-5 text-med-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Hand Gesture Mode</h3>
                  <p className="text-xs text-slate-500">For patients with hand mobility</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { gesture: "Thumbs Up", means: "Yes — I confirm" },
                  { gesture: "Thumbs Down", means: "No — I refuse" },
                  { gesture: "Index & Pinky", means: "Help — I need assistance" },
                  { gesture: "Both Hands Open", means: "Water / Food" },
                ].map((g, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02] text-sm">
                    <span className="text-slate-300">{g.gesture}</span>
                    <span className="text-slate-500 text-xs">{g.means}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Eye Mode */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="section-card p-7"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Eye Tracking Mode</h3>
                  <p className="text-xs text-slate-500">For patients without hand mobility</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { gesture: "Look Left", means: "Yes — I confirm" },
                  { gesture: "Look Right", means: "No — I refuse" },
                  { gesture: "Double Blink", means: "Help — I need assistance" },
                  { gesture: "Open Mouth", means: "Water / Food" },
                ].map((g, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02] text-sm">
                    <span className="text-slate-300">{g.gesture}</span>
                    <span className="text-slate-500 text-xs">{g.means}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FOR NURSES ─── */}
      <section className="py-24 lg:py-32 medical-gradient border-t border-white/5 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-500"
              >
                For Care Teams
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight text-balance"
              >
                Real-time alerts.{" "}
                <span className="text-teal-400">No extra screen to watch.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-5 text-base text-slate-400 leading-relaxed"
              >
                Every gesture triggers a spoken voice alert. Nurses hear 
                the need — &ldquo;Help — Patient needs immediate assistance&rdquo; — 
                without watching a monitor. The nurse dashboard provides 
                a searchable log with acknowledge workflow for busy wards.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-6 flex flex-wrap gap-6"
              >
                <div>
                  <div className="text-2xl font-bold text-white">4</div>
                  <div className="text-xs text-slate-500">Gesture types</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">8</div>
                  <div className="text-xs text-slate-500">Languages</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">&lt;500ms</div>
                  <div className="text-xs text-slate-500">Gesture to speech</div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="mt-8"
              >
                <a href="/nurse-view"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium text-slate-300 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  Open Nurse Dashboard
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="section-card p-6 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Stethoscope className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-medium text-white">Dashboard preview</span>
              </div>
              <div className="space-y-3">
                {[
                  { gesture: "HELP", time: "Just now", status: "Unread", color: "text-amber-400" },
                  { gesture: "WATER", time: "3m ago", status: "Acknowledged", color: "text-cyan-400" },
                  { gesture: "YES", time: "7m ago", status: "Acknowledged", color: "text-emerald-400" },
                  { gesture: "NO", time: "12m ago", status: "Acknowledged", color: "text-red-400" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white/[0.02]">
                    <div className="flex items-center gap-2.5">
                      <span className={`font-semibold text-sm ${item.color}`}>{item.gesture}</span>
                      <span className="text-[11px] text-slate-600">{item.time}</span>
                    </div>
                    <span className={`text-[11px] ${item.status === "Unread" ? "text-teal-500" : "text-slate-600"}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-600">
                <span>Cross-tab sync via BroadcastChannel</span>
                <span>Exportable logs</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PRIVACY ─── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500"
            >
              Privacy & Security
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-2xl sm:text-3xl font-bold text-white leading-tight text-balance"
            >
              Nothing leaves this device.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed"
            >
              All AI processing runs in-browser via WebAssembly. 
              No video, no images, no data ever transmitted. 
              No accounts. No servers. No tracking.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 lg:py-28 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-500">
              Get Started Now
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight text-balance">
              No installation. No setup.{" "}
              <span className="text-teal-400">Just open Chrome.</span>
            </h2>
            <p className="mt-4 text-base text-slate-400">
              Works with any laptop webcam. Grant camera access and start communicating.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/hand-mode"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all duration-200 active:scale-[0.97]"
              >
                <Hand className="w-4 h-4" />
                Start Hand Mode
              </a>
              <a href="/eye-mode"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium text-sm transition-all duration-200 active:scale-[0.97]"
              >
                <Eye className="w-4 h-4" />
                Start Eye Mode
              </a>
            </div>
            <div className="mt-8 flex justify-center gap-6 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Takes 2 seconds to load
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                Free for all healthcare use
              </span>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
