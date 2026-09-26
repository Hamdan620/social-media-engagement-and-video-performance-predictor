"use client";

import { useState } from "react";
import { VideoInputs } from "@/lib/types";
import { PRESETS } from "@/lib/presets";
import { predictEngagement } from "@/lib/modelEngine";
import { SplitSquareVertical, Trophy, ArrowRight, Zap, Check } from "lucide-react";

export default function ABTestingPage() {
  const [conceptA, setConceptA] = useState<VideoInputs>(PRESETS[0].inputs);
  const [conceptB, setConceptB] = useState<VideoInputs>(PRESETS[1].inputs);

  const predA = predictEngagement(conceptA);
  const predB = predictEngagement(conceptB);

  const diff = Math.round((predA.score - predB.score) * 10) / 10;
  const winner = diff >= 0 ? "A" : "B";
  const absDiff = Math.abs(diff);

  const updateA = (field: keyof VideoInputs, val: any) => {
    setConceptA((prev) => ({ ...prev, [field]: val }));
  };

  const updateB = (field: keyof VideoInputs, val: any) => {
    setConceptB((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/20 p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>A/B Creative Split-Testing Engine</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Creative Concept Comparator
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Compare two video hooks, pacing setups, or audio strategies head-to-head before spending hours editing.
          </p>
        </div>
      </div>

      {/* Winner Spotlight Card */}
      <div className="rounded-3xl border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-purple-500/10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-0.5">
              Simulated Winner
            </div>
            <h2 className="text-xl font-bold text-white">
              Concept {winner} Outperforms by {absDiff} Engagement Points
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Concept {winner} achieves {winner === "A" ? predA.estimatedViews : predB.estimatedViews} compared to{" "}
              {winner === "A" ? predB.estimatedViews : predA.estimatedViews}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/80 px-6 py-3 rounded-2xl border border-slate-800">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Concept A</span>
            <div className={`text-2xl font-black ${winner === "A" ? "text-purple-400" : "text-slate-400"}`}>
              {predA.score}
            </div>
          </div>
          <span className="text-slate-600 font-bold">vs</span>
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Concept B</span>
            <div className={`text-2xl font-black ${winner === "B" ? "text-purple-400" : "text-slate-400"}`}>
              {predB.score}
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Concept A Card */}
        <div
          className={`rounded-3xl p-6 border transition-all ${
            winner === "A"
              ? "bg-slate-900/90 border-purple-500/60 shadow-md shadow-purple-500/10"
              : "bg-slate-900/60 border-slate-800"
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Variation 1</span>
              <h3 className="text-lg font-bold text-white">Concept A</h3>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                winner === "A" ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"
              }`}
            >
              {predA.tier} ({predA.score} pts)
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Hook Style</label>
              <select
                value={conceptA.hook_type}
                onChange={(e) => updateA("hook_type", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
              >
                {["Visual Shock", "Curiosity Gap", "Bold Statement", "Storytelling", "Question", "Listicle"].map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Platform</label>
                <select
                  value={conceptA.target_platform}
                  onChange={(e) => updateA("target_platform", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                >
                  {["TikTok", "Instagram Reels", "YouTube Shorts"].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Duration: {conceptA.video_length}s</label>
                <input
                  type="range"
                  min="5"
                  max="90"
                  value={conceptA.video_length}
                  onChange={(e) => updateA("video_length", parseInt(e.target.value))}
                  className="w-full accent-purple-500 mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Trending Sound</label>
                <button
                  type="button"
                  onClick={() => updateA("has_trending_audio", conceptA.has_trending_audio === 1 ? 0 : 1)}
                  className={`w-full py-2 rounded-xl font-bold transition-colors ${
                    conceptA.has_trending_audio === 1 ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {conceptA.has_trending_audio === 1 ? "Yes (Trending)" : "No (Original)"}
                </button>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Cuts/Min: {conceptA.cut_frequency_per_min}</label>
                <input
                  type="range"
                  min="2"
                  max="28"
                  value={conceptA.cut_frequency_per_min}
                  onChange={(e) => updateA("cut_frequency_per_min", parseInt(e.target.value))}
                  className="w-full accent-purple-500 mt-2"
                />
              </div>
            </div>

            {/* Metrics Breakdown for A */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Est. Reach:</span>
                <span className="font-bold text-white">{predA.estimatedViews}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>3s Retention:</span>
                <span className="font-bold text-white">{predA.threeSecRetention}%</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Completion:</span>
                <span className="font-bold text-white">{predA.completionRate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Concept B Card */}
        <div
          className={`rounded-3xl p-6 border transition-all ${
            winner === "B"
              ? "bg-slate-900/90 border-purple-500/60 shadow-md shadow-purple-500/10"
              : "bg-slate-900/60 border-slate-800"
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Variation 2</span>
              <h3 className="text-lg font-bold text-white">Concept B</h3>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                winner === "B" ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"
              }`}
            >
              {predB.tier} ({predB.score} pts)
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Hook Style</label>
              <select
                value={conceptB.hook_type}
                onChange={(e) => updateB("hook_type", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
              >
                {["Visual Shock", "Curiosity Gap", "Bold Statement", "Storytelling", "Question", "Listicle"].map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Platform</label>
                <select
                  value={conceptB.target_platform}
                  onChange={(e) => updateB("target_platform", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                >
                  {["TikTok", "Instagram Reels", "YouTube Shorts"].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Duration: {conceptB.video_length}s</label>
                <input
                  type="range"
                  min="5"
                  max="90"
                  value={conceptB.video_length}
                  onChange={(e) => updateB("video_length", parseInt(e.target.value))}
                  className="w-full accent-indigo-500 mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Trending Sound</label>
                <button
                  type="button"
                  onClick={() => updateB("has_trending_audio", conceptB.has_trending_audio === 1 ? 0 : 1)}
                  className={`w-full py-2 rounded-xl font-bold transition-colors ${
                    conceptB.has_trending_audio === 1 ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {conceptB.has_trending_audio === 1 ? "Yes (Trending)" : "No (Original)"}
                </button>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Cuts/Min: {conceptB.cut_frequency_per_min}</label>
                <input
                  type="range"
                  min="2"
                  max="28"
                  value={conceptB.cut_frequency_per_min}
                  onChange={(e) => updateB("cut_frequency_per_min", parseInt(e.target.value))}
                  className="w-full accent-indigo-500 mt-2"
                />
              </div>
            </div>

            {/* Metrics Breakdown for B */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Est. Reach:</span>
                <span className="font-bold text-white">{predB.estimatedViews}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>3s Retention:</span>
                <span className="font-bold text-white">{predB.threeSecRetention}%</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Completion:</span>
                <span className="font-bold text-white">{predB.completionRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
