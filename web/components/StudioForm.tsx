"use client";

import { useState } from "react";
import { VideoInputs, HookType, PlatformType, NicheType, FollowerTier, VideoResolution } from "@/lib/types";
import { Sparkles, Film, Calendar, UserCheck } from "lucide-react";

interface StudioFormProps {
  inputs: VideoInputs;
  onChange: (newInputs: VideoInputs) => void;
}

export default function StudioForm({ inputs, onChange }: StudioFormProps) {
  const [activeTab, setActiveTab] = useState<"hook" | "pacing" | "schedule" | "creator">("hook");

  const update = (field: keyof VideoInputs, value: any) => {
    onChange({
      ...inputs,
      [field]: value,
    });
  };

  const hookOptions: HookType[] = [
    "Visual Shock",
    "Bold Statement",
    "Question",
    "Storytelling",
    "Listicle",
    "Challenge/Dare",
    "Curiosity Gap",
  ];

  const platformOptions: PlatformType[] = ["TikTok", "Instagram Reels", "YouTube Shorts"];

  const nicheOptions: NicheType[] = [
    "Tech & AI",
    "Fitness & Wellness",
    "Comedy & Skits",
    "Finance & Business",
    "Lifestyle & Vlog",
    "Education & How-To",
    "Beauty & Fashion",
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const followerTiers: FollowerTier[] = [
    "Nano (<10K)",
    "Micro (10K-100K)",
    "Mid (100K-500K)",
    "Macro (500K-2M)",
    "Mega (2M+)",
  ];

  const resolutions: VideoResolution[] = ["720p", "1080p", "4K"];

  const tabs = [
    { id: "hook", label: "Hook & Format", icon: Sparkles },
    { id: "pacing", label: "Pacing & Audio", icon: Film },
    { id: "schedule", label: "Timing & Copy", icon: Calendar },
    { id: "creator", label: "Creator Profile", icon: UserCheck },
  ] as const;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-sm">
      {/* Tab Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-950/60 rounded-2xl border border-slate-800/80 mb-6 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Hook & Format */}
      {activeTab === "hook" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Platform
              </label>
              <select
                value={inputs.target_platform}
                onChange={(e) => update("target_platform", e.target.value as PlatformType)}
                className="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                {platformOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Content Niche
              </label>
              <select
                value={inputs.content_niche}
                onChange={(e) => update("content_niche", e.target.value as NicheType)}
                className="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                {nicheOptions.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Opening Hook Style (0-3s)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {hookOptions.map((hook) => {
                const isSelected = inputs.hook_type === hook;
                return (
                  <button
                    key={hook}
                    type="button"
                    onClick={() => update("hook_type", hook)}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium text-left transition-all ${
                      isSelected
                        ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-sm"
                        : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {hook}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Visual Hook Retention Score</span>
              <span className="font-mono text-purple-400">
                {Math.round(inputs.visual_hook_retention_score * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.15"
              max="0.99"
              step="0.01"
              value={inputs.visual_hook_retention_score}
              onChange={(e) => update("visual_hook_retention_score", parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Visual impact score: camera motion, immediate text graphic, face zoom in the first 2 seconds.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Pacing & Audio */}
      {activeTab === "pacing" && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Video Duration</span>
              <span className="font-mono text-purple-400">{inputs.video_length} seconds</span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              step="1"
              value={inputs.video_length}
              onChange={(e) => update("video_length", parseInt(e.target.value))}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>5s</span>
              <span>Optimal: 15-30s</span>
              <span>120s</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span>Speech Tempo</span>
                <span className="font-mono text-purple-400">{inputs.speech_tempo_wpm} WPM</span>
              </div>
              <input
                type="range"
                min="100"
                max="220"
                step="5"
                value={inputs.speech_tempo_wpm}
                onChange={(e) => update("speech_tempo_wpm", parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
              <span className="text-[10px] text-slate-500">Sweet spot: 140-175 WPM</span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span>Visual Cuts Pacing</span>
                <span className="font-mono text-purple-400">{inputs.cut_frequency_per_min} cuts/min</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                step="1"
                value={inputs.cut_frequency_per_min}
                onChange={(e) => update("cut_frequency_per_min", parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
              <span className="text-[10px] text-slate-500">Sweet spot: 12-20 cuts/min</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-800/40 border border-slate-700/60 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200">Trending Audio Sound</span>
                <p className="text-[11px] text-slate-400">Pair with an algorithmic sound anchor</p>
              </div>
              <button
                type="button"
                onClick={() => update("has_trending_audio", inputs.has_trending_audio === 1 ? 0 : 1)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  inputs.has_trending_audio === 1
                    ? "bg-emerald-500 text-slate-950 shadow-sm"
                    : "bg-slate-700 text-slate-400"
                }`}
              >
                {inputs.has_trending_audio === 1 ? "Active Sound" : "Disabled"}
              </button>
            </div>

            {inputs.has_trending_audio === 1 && (
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Sound Popularity Velocity</span>
                  <span className="font-mono text-emerald-400">Rank #{inputs.sound_popularity_index}/100</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="1"
                  value={inputs.sound_popularity_index}
                  onChange={(e) => update("sound_popularity_index", parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Timing & Copy */}
      {activeTab === "schedule" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span>Posting Hour</span>
                <span className="font-mono text-purple-400">{inputs.posting_hour}:00</span>
              </div>
              <input
                type="range"
                min="0"
                max="23"
                step="1"
                value={inputs.posting_hour}
                onChange={(e) => update("posting_hour", parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
              <span className="text-[10px] text-slate-500">Peak leisure: 18:00 - 21:00</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Posting Day of Week
              </label>
              <select
                value={inputs.posting_day}
                onChange={(e) => update("posting_day", e.target.value)}
                className="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                {daysOfWeek.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span>Caption Word Count</span>
                <span className="font-mono text-purple-400">{inputs.caption_length} words</span>
              </div>
              <input
                type="range"
                min="10"
                max="350"
                step="5"
                value={inputs.caption_length}
                onChange={(e) => update("caption_length", parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span>Hashtag Count</span>
                <span className="font-mono text-purple-400">{inputs.hashtag_count} tags</span>
              </div>
              <input
                type="range"
                min="0"
                max="16"
                step="1"
                value={inputs.hashtag_count}
                onChange={(e) => update("hashtag_count", parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
              <span className="text-[10px] text-slate-500">Recommended: 3-5 tags</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Caption Sentiment Polarity</span>
              <span className="font-mono text-purple-400">
                {inputs.sentiment_score > 0 ? `+${inputs.sentiment_score}` : inputs.sentiment_score}
              </span>
            </div>
            <input
              type="range"
              min="-0.8"
              max="0.9"
              step="0.05"
              value={inputs.sentiment_score}
              onChange={(e) => update("sentiment_score", parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>Controversial / Shock (-0.8)</span>
              <span>Neutral</span>
              <span>Aspirational (+0.9)</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Creator Profile */}
      {activeTab === "creator" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Creator Follower Tier
              </label>
              <select
                value={inputs.creator_follower_tier}
                onChange={(e) => update("creator_follower_tier", e.target.value as FollowerTier)}
                className="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                {followerTiers.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Video Resolution
              </label>
              <select
                value={inputs.video_resolution_quality}
                onChange={(e) => update("video_resolution_quality", e.target.value as VideoResolution)}
                className="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                {resolutions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Baseline Engagement Rate</span>
              <span className="font-mono text-purple-400">{inputs.creator_avg_engagement_rate}%</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="16.0"
              step="0.2"
              value={inputs.creator_avg_engagement_rate}
              onChange={(e) => update("creator_avg_engagement_rate", parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
            <span className="text-[10px] text-slate-500">Benchmark account performance</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Face Presence on Camera
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: 0, label: "Faceless B-Roll" },
                { val: 1, label: "Solo Host" },
                { val: 2, label: "Collab / Reaction" },
              ].map((opt) => {
                const isSelected = inputs.face_presence === opt.val;
                return (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => update("face_presence", opt.val)}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                      isSelected
                        ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-sm"
                        : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
