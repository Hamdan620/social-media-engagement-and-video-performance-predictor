"use client";

import { PRESETS } from "@/lib/presets";
import { VideoInputs } from "@/lib/types";

interface PresetsBarProps {
  onSelectPreset: (inputs: VideoInputs) => void;
  activePresetId?: string;
}

export default function PresetsBar({ onSelectPreset, activePresetId }: PresetsBarProps) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          ⚡ 1-Click Creative Presets
        </span>
        <span className="text-xs text-slate-500">Simulate tested creative archetypes</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {PRESETS.map((preset) => {
          const isSelected = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.inputs)}
              type="button"
              className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden group ${
                isSelected
                  ? "bg-purple-950/40 border-purple-500/80 shadow-md shadow-purple-500/10"
                  : "bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {preset.name}
                </span>
              </div>
              <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300 mb-1.5">
                {preset.badge}
              </span>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {preset.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
