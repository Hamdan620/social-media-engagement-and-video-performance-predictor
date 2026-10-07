import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Social Video Performance Predictor | Short-Form Analytics & Script Diagnostics",
  description:
    "Data Science research platform predicting video performance, explore reach, and script quality across TikTok, Instagram Reels, and YouTube Shorts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-zinc-800 selection:text-zinc-100">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        <footer className="border-t border-zinc-800/80 py-8 text-center text-xs text-zinc-500">
          <p>Social Video Engagement & Performance Predictor • Academic Data Science Project</p>
          <p className="mt-1 font-mono text-[11px]">
            Trained on 10,000 Multimodal Short-Form Vectors • Scikit-Learn Random Forest Pipeline
          </p>
        </footer>
      </body>
    </html>
  );
}
