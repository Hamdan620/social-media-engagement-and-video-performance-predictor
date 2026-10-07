"use client";

import { VideoInputs } from "@/lib/types";
import { User, Film, Clock, FileText, CheckCircle2 } from "lucide-react";

interface ExecutiveSummaryProps {
  inputs: VideoInputs;
}

export default function ExecutiveSummary({ inputs }: ExecutiveSummaryProps) {
  const words = inputs.script_text ? inputs.script_text.trim().split(/\s+/).filter(Boolean).length : 0;
  const scriptDuration = Math.round((words / 150) * 60);

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M followers`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K followers`;
    return `${count} followers`;
  };

  const categories = [
    {
      title: "Creator Context",
      icon: User,
      items: [
        { label: "Account Audience", value: `${formatFollowers(inputs.follower_count)} (${inputs.follower_count.toLocaleString()})` },
        { label: "Target Platform", value: inputs.target_platform },
        { label: "Content Category", value: inputs.content_niche },
      ],
    },
    {
      title: "Creative & Script",
      icon: FileText,
      items: [
        { label: "Opening Hook", value: inputs.hook_type },
        { label: "Script Word Count", value: words > 0 ? `${words} words` : "No script text" },
        { label: "Estimated Read Time", value: words > 0 ? `~${scriptDuration}s (at 150 WPM)` : "N/A" },
      ],
    },
    {
      title: "Production Mechanics",
      icon: Film,
      items: [
        { label: "Total Runtime", value: `${inputs.video_length} seconds` },
        { label: "Audio Strategy", value: inputs.has_trending_audio === 1 ? `Trending Audio (#${inputs.sound_popularity_index})` : "Original Audio" },
        { label: "Visual Pacing", value: `${inputs.cut_frequency_per_min} cuts/min` },
        { label: "Speech Cadence", value: `${inputs.speech_tempo_wpm} WPM` },
      ],
    },
    {
      title: "Distribution Schedule",
      icon: Clock,
      items: [
        { label: "Posting Hour", value: `${inputs.posting_hour}:00 (24h clock)` },
        { label: "Day of Week", value: inputs.posting_day },
        { label: "Face Presence", value: inputs.face_presence === 1 ? "Solo On-Camera" : inputs.face_presence === 2 ? "Duo / Collab" : "Faceless B-Roll" },
      ],
    },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-zinc-800">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            <span>Executive Parameters Audit</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Full ledger of input parameters evaluated by the Random Forest inference engine.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded border border-zinc-700/60">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>All 17 Features Locked</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-300 mb-2.5">
                <Icon className="w-3.5 h-3.5 text-zinc-400" />
                <span>{cat.title}</span>
              </div>
              <dl className="space-y-1.5 text-xs">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex flex-col">
                    <dt className="text-[11px] text-zinc-500">{item.label}</dt>
                    <dd className="font-medium text-zinc-200 truncate">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
}
