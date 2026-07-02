"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Cpu, Activity, Eye, Volume2, Lock, Languages, Sliders, Bell } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const ACCURACY_FEATURES = [
  "Temporal smoothing — 12-frame window with 75% majority vote filters random noise",
  "Hold-time ramp — 800ms required for full confidence, preventing momentary false triggers",
  "Resting-state debounce — auto-raises threshold after 5+ rapid transitions in 10 seconds",
  "Hysteresis-based blink detection — prevents false triggers from tracking noise",
  "10-second cooldown — prevents repeated same-gesture alert spam",
  "Distinct audio tones — sine, square, sawtooth, triangle waveforms per gesture type",
];

const USE_CASES = [
  { title: "ICU & Critical Care", desc: "Intubated patients who cannot speak due to breathing tubes or ventilation", icon: Heart },
  { title: "Post-Surgery Recovery", desc: "Patients emerging from anesthesia with limited mobility and speech", icon: Activity },
  { title: "Stroke Rehabilitation", desc: "Individuals with aphasia or hemiparesis regaining communication", icon: Heart },
  { title: "ALS / MND Care", desc: "Progressive conditions where movement becomes increasingly limited", icon: Activity },
  { title: "Temporary Paralysis", desc: "Patients under neuromuscular blocking agents needing to communicate", icon: Activity },
  { title: "Speech Therapy", desc: "Augmentative and alternative communication during recovery", icon: Heart },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12 pt-6">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
            About
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight text-balance">
            Giving every patient{" "}
            <span className="text-teal-600">a way to speak</span>
          </h1>
        </motion.div>

        <motion.section variants={{ hidden: {}, visible: {} }} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <div className="section-card p-7 lg:p-9">
            <h2 className="text-lg font-bold text-slate-900 mb-3">The problem</h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
              Every day in ICUs and hospital wards around the world, patients are awake and alert but 
              cannot communicate. A breathing tube prevents speech. Paralysis or weakness makes it 
              impossible to reach for a call button. A need for water, help, or simply to say 
              &ldquo;yes&rdquo; or &ldquo;no&rdquo; becomes a struggle.
            </p>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-3xl">
              Nurses are stretched thin and cannot be at every bedside. Existing assistive communication 
              devices are expensive, complex, and often require movement that patients simply cannot perform.
            </p>
          </div>
        </motion.section>

        <motion.section variants={{ hidden: {}, visible: {} }} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <div className="section-card p-7 lg:p-9">
            <h2 className="text-lg font-bold text-slate-900 mb-3">How it works</h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
              CareSpeak AI turns any laptop with a webcam into an assistive communication device. 
              Using on-device AI via MediaPipe WebAssembly, it tracks hand gestures or eye movements 
              in real-time and converts them into spoken voice alerts. The entire process runs locally 
              — no data leaves the device, no servers are involved, and no internet connection is 
              required after the initial page load.
            </p>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <h2 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider">Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Camera Input", desc: "Webcam captures video at 640x480. MediaPipe tracks 21 hand landmarks or 478 face landmarks per frame at 30+ FPS on CPU.", icon: Eye },
              { step: "2", title: "Gesture Classification", desc: "Rule-based classifiers with temporal smoothing detect thumbs up/down, index-pinky extension, both-hands-open, gaze direction, and double-blinks.", icon: Sliders },
              { step: "3", title: "Voice Output", desc: "Web Speech API announces the detected need in the patient's chosen language. Each gesture also triggers a unique synthesized alert tone via Web Audio API.", icon: Bell },
            ].map((s) => (
              <motion.div key={s.step} variants={fadeUp} className="section-card p-6">
                <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center mb-3">
                  <s.icon className="w-4 h-4 text-teal-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1 text-sm">Step {s.step}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <h2 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Noise reduction</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {ACCURACY_FEATURES.map((feat, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-start gap-2.5 p-3.5 rounded-lg bg-white border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                <span className="text-slate-600 text-sm">{feat}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <h2 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Use cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {USE_CASES.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="section-card p-4">
                  <Icon className="w-4 h-4 text-teal-600 mb-2.5" />
                  <h3 className="font-semibold text-slate-900 text-sm mb-0.5">{uc.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{uc.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <h2 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[
              { title: "Privacy by design", desc: "Zero data leaves the device. No servers, no accounts, no tracking.", icon: Lock },
              { title: "Zero cost", desc: "Free and open source. No subscriptions, just a laptop with a webcam.", icon: Heart },
              { title: "Universal access", desc: "8 languages. Works in any modern browser. No installation.", icon: Languages },
              { title: "Built for hospitals", desc: "Temporal smoothing, hysteresis, debouncing for real-world reliability.", icon: ShieldCheck },
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="section-card p-4">
                  <Icon className="w-4 h-4 text-teal-600 mb-2.5" />
                  <h3 className="font-semibold text-slate-900 text-sm mb-0.5">{v.title}</h3>
                  <p className="text-slate-500 text-xs">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center py-8 border-t border-slate-200"
        >
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <Heart className="w-4 h-4 text-teal-500" />
            Free for all healthcare use &middot; Open source &middot; Giving every patient a voice.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
