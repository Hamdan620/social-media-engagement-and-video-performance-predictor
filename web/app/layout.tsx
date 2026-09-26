import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ReachCraft AI | Short-Form Video Engagement Predictor",
  description:
    "Production-grade Machine Learning intelligence predicting short-form video engagement tiers (TikTok, Reels, Shorts) across 17 multimodal features.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-purple-500 selection:text-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        <footer className="mt-16 border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
          <p>© 2026 ReachCraft AI. Production Full-Stack Short-Form Engagement Engine.</p>
          <p className="mt-1">Trained on 10,000 multimodal synthetic video vectors • Vercel Edge Serverless Architecture</p>
        </footer>
      </body>
    </html>
  );
}
