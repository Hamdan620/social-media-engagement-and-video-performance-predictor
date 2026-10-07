"use client";

import { VideoInputs, HookType, PlatformType, NicheType } from "@/lib/types";
import { PRESETS } from "@/lib/presets";
import { Users, FileText, Sliders, Calendar, Sparkles } from "lucide-react";

interface AnalysisFormProps {
  inputs: VideoInputs;
  onChange: (newInputs: VideoInputs) => void;
  onSelectPreset: (presetInputs: VideoInputs) => void;
}

export default function AnalysisForm({ inputs, onChange, onSelectPreset }: AnalysisFormProps) {
  const update = (field: keyof VideoInputs, val: any) => {
    onChange({
      ...inputs,
      [field]: val,
    });
  };

  const words = inputs.script_text ? inputs.script_text.trim().split(/\s+/).filter(Boolean).length : 0;
  const estimatedSeconds = Math.round((words / 150) * 60);

  const followerPresets = [
    { label: "0 (New)", val: 0 },
    { label: "1K", val: 1000 },
    { label: "10K", val: 10000 },
    { label: "50K", val: 50000 },
    { label: "100K", val: 100000 },
    { label: "500K", val: 500000 },
    { label: "1M+", val: 1000000 },
  ];

  const hookOptions: HookType[] = [
    "Visual Shock",
    "Curiosity Gap",
    "Bold Statement",
    "Challenge/Dare",
    "Storytelling",
    "Question",
    "Listicle",
  ];

  const platformOptions: PlatformType[] = ["TikTok", "Instagram Reels", "YouTube Shorts"];

  const nicheOptions: NicheType[] = [
    "Tech & AI",
    "Comedy & Skits",
    "Finance & Business",
    "Fitness & Wellness",
    "Lifestyle & Vlog",
    "Education & How-To",
    "Beauty & Fashion",
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
      {/* 1-Click Scenario Archetypes Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Test Scenarios & Presets</span>
          </span>
          <span className="text-[11px] text-zinc-500">Quick-load calibrated test cases</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPreset(p.inputs)}
              className="text-left p-2.5 rounded-lg border border-zinc-800 bg-zinc-950/70 hover:bg-zinc-800/60 hover:border-zinc-700 transition-colors"
            >
              <div className="text-xs font-semibold text-zinc-200 truncate">{p.name}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">{p.badge}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-800 pt-5">
        <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-zinc-400" />
          <span>1. Creator Audience & Platform Context</span>
        </h3>

        <div className="space-y-4">
          {/* Follower Count Control */}
          <div className="bg-zinc-950/60 p-4 rounded-lg border border-zinc-800/80">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-zinc-300">
                Account Follower Count (Baseline Audience)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0"
                  max="5000000"
                  step="500"
                  value={inputs.follower_count}
                  onChange={(e) => update("follower_count", Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-32 bg-zinc-900 border border-zinc-700 rounded px-2.5 py-1 text-xs font-mono text-zinc-100 text-right focus:outline-none focus:border-zinc-500"
                />
                <span className="text-xs text-zinc-400">followers</span>
              </div>
            </div>

            {/* Quick Follower Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {followerPresets.map((preset) => {
                const isActive = inputs.follower_count === preset.val;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => update("follower_count", preset.val)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors border ${
                      isActive
                        ? "bg-zinc-200 text-zinc-950 border-zinc-200 font-semibold"
                        : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              Tests algorithmic merit: determines the ratio between guaranteed follower feed views vs. viral FYP explore distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Target Platform</label>
              <select
                value={inputs.target_platform}
                onChange={(e) => update("target_platform", e.target.value as PlatformType)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
              >
                {platformOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Content Category / Niche</label>
              <select
                value={inputs.content_niche}
                onChange={(e) => update("content_niche", e.target.value as NicheType)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
              >
                {nicheOptions.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Script & Narrative Section */}
      <div className="border-t border-zinc-800 pt-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-zinc-400" />
            <span>2. Video Script & Copywriting Analysis</span>
          </h3>
          <div className="text-xs font-mono text-zinc-400">
            <span>{words} words</span>
            {words > 0 && <span className="text-zinc-500 ml-1.5">| ~{estimatedSeconds}s spoken runtime</span>}
          </div>
        </div>
        <p className="text-xs text-zinc-400 mb-2.5">
          Paste your complete script or voiceover transcript. The NLP engine will automatically diagnose your opening Hook, body pacing, and closing Call-to-Action.
        </p>

        <textarea
          rows={5}
          value={inputs.script_text}
          onChange={(e) => update("script_text", e.target.value)}
          placeholder="Paste video script here... e.g. 'The real reason nobody talks about this tool is...'"
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 font-sans leading-relaxed"
        />
      </div>

      {/* Video Production & Schedule Section */}
      <div className="border-t border-zinc-800 pt-5 space-y-4">
        <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 mb-2">
          <Sliders className="w-4 h-4 text-zinc-400" />
          <span>3. Production Mechanics & Scheduling</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Opening Hook Format</label>
            <select
              value={inputs.hook_type}
              onChange={(e) => update("hook_type", e.target.value as HookType)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
            >
              {hookOptions.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs text-zinc-300 mb-1.5">
              <span>Duration (Seconds)</span>
              <span className="font-mono text-zinc-100 font-semibold">{inputs.video_length}s</span>
            </div>
            <input
              type="range"
              min="5"
              max="90"
              value={inputs.video_length}
              onChange={(e) => update("video_length", parseInt(e.target.value))}
              className="w-full accent-zinc-200 mt-1"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Audio Selection</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => update("has_trending_audio", 1)}
                className={`py-1.5 px-2.5 rounded-lg text-xs font-medium border ${
                  inputs.has_trending_audio === 1
                    ? "bg-zinc-200 text-zinc-950 border-zinc-200 font-semibold"
                    : "bg-zinc-950 text-zinc-400 border-zinc-800"
                }`}
              >
                Trending Audio
              </button>
              <button
                type="button"
                onClick={() => update("has_trending_audio", 0)}
                className={`py-1.5 px-2.5 rounded-lg text-xs font-medium border ${
                  inputs.has_trending_audio === 0
                    ? "bg-zinc-200 text-zinc-950 border-zinc-200 font-semibold"
                    : "bg-zinc-950 text-zinc-400 border-zinc-800"
                }`}
              >
                Original Sound
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <div className="flex justify-between text-xs text-zinc-300 mb-1.5">
              <span>Speech Cadence</span>
              <span className="font-mono text-zinc-100 font-semibold">{inputs.speech_tempo_wpm} WPM</span>
            </div>
            <input
              type="range"
              min="100"
              max="220"
              step="5"
              value={inputs.speech_tempo_wpm}
              onChange={(e) => update("speech_tempo_wpm", parseInt(e.target.value))}
              className="w-full accent-zinc-200"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-zinc-300 mb-1.5">
              <span>Visual Cuts</span>
              <span className="font-mono text-zinc-100 font-semibold">{inputs.cut_frequency_per_min} cuts/min</span>
            </div>
            <input
              type="range"
              min="2"
              max="28"
              value={inputs.cut_frequency_per_min}
              onChange={(e) => update("cut_frequency_per_min", parseInt(e.target.value))}
              className="w-full accent-zinc-200"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-zinc-300 mb-1.5">
              <span>Upload Time</span>
              <span className="font-mono text-zinc-100 font-semibold">{inputs.posting_hour}:00 ({inputs.posting_day.slice(0, 3)})</span>
            </div>
            <input
              type="range"
              min="0"
              max="23"
              value={inputs.posting_hour}
              onChange={(e) => update("posting_hour", parseInt(e.target.value))}
              className="w-full accent-zinc-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
