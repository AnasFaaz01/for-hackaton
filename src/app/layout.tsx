import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "CareSpeak AI — Assistive Communication for Non-Verbal Patients",
  description:
    "On-device AI that turns any laptop webcam into an assistive communication tool. Patients who cannot speak can use hand gestures or eye movements to express needs — instantly converted to spoken voice alerts. No servers, no setup, no cost.",
  other: {
    "theme-color": "#0a0f1c",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "CareSpeak AI",
    "mobile-web-app-capable": "yes",
    "application-name": "CareSpeak AI",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-[#0a0f1c] text-slate-200 antialiased">
        <ServiceWorkerRegister />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-white/5 bg-[#080c17]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs tracking-tight">CS</span>
                  </div>
                  <div>
                    <span className="font-bold text-base text-white">CareSpeak</span>
                    <span className="text-teal-400 font-bold text-base"> AI</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                  On-device AI assistive communication for patients who cannot speak. 
                  Free for all healthcare use. No data leaves the device.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Modes</h4>
                <div className="space-y-2.5">
                  {[
                    { href: "/hand-mode", label: "Hand Gesture Mode" },
                    { href: "/eye-mode", label: "Eye Tracking Mode" },
                    { href: "/nurse-view", label: "Nurse Dashboard" },
                  ].map((link) => (
                    <a key={link.href} href={link.href}
                      className="block text-sm text-slate-600 hover:text-teal-400 transition-colors"
                    >{link.label}</a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Resources</h4>
                <div className="space-y-2.5">
                  {[
                    { href: "/about", label: "About" },
                    { href: "/logs", label: "Gesture History" },
                    { href: "/emergency", label: "Emergency Alert" },
                  ].map((link) => (
                    <a key={link.href} href={link.href}
                      className="block text-sm text-slate-600 hover:text-teal-400 transition-colors"
                    >{link.label}</a>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-700">
                &copy; {new Date().getFullYear()} CareSpeak AI.
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-700">
                <span>100% on-device processing</span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span>Free for healthcare</span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span>Open source</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
