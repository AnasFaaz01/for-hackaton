# CareSpeak AI

AI-powered communication for patients who cannot speak or move easily.

Turn any laptop with a webcam into an assistive communication device. On-device AI translates hand gestures and eye movements into speech — no servers, no setup, no expensive hardware.

## Features

- **Hand Gesture Mode** — thumbs up/down, peace sign, open palm, both hands open
- **Eye Tracking Mode** — gaze direction, double-blink, mouth gestures
- **Instant Voice Alerts** — speaks the patient's need aloud in 8 languages
- **Nurse Dashboard** — real-time monitor with acknowledge workflow
- **Gesture History** — searchable, exportable logs
- **Emergency Alert** — 10-second countdown with siren
- **100% Private** — all AI runs in-browser via WebAssembly
- **PWA** — installable, works offline after first load

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript 5.8
- MediaPipe (WebAssembly ML)
- Web Speech API + Web Audio API
- Tailwind CSS 4 + Framer Motion
- BroadcastChannel for cross-tab sync

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and grant camera access.

## Privacy

Zero data leaves the device. No servers, no accounts, no tracking. All AI processing runs locally via WebAssembly.
