import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "CareSpeak AI — Giving Every Patient a Voice",
  description:
    "AI-powered communication for patients who cannot speak or move easily. Use hand gestures or eye movements to express needs — instantly converted to text and speech.",
  other: {
    "theme-color": "#1e3a8a",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <ServiceWorkerRegister />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-gray-100 bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">CS</span>
                </div>
                <span className="font-semibold text-gray-700">CareSpeak AI</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
                <a href="/hand-mode" className="hover:text-blue-600 transition-colors">Hand</a>
                <a href="/eye-mode" className="hover:text-blue-600 transition-colors">Eye</a>
                <a href="/nurse-view" className="hover:text-rose-600 transition-colors">Nurse</a>
                <a href="/logs" className="hover:text-blue-600 transition-colors">Logs</a>
                <a href="/about" className="hover:text-blue-600 transition-colors">About</a>
                <a href="/emergency" className="hover:text-red-600 transition-colors">Emergency</a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
              Built with care for Hackathon 2026 — Giving every patient a voice.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
