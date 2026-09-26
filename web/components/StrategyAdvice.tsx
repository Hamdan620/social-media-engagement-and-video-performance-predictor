"use client";

import { Lightbulb, CheckCircle2 } from "lucide-react";

interface StrategyAdviceProps {
  recommendations: string[];
}

export default function StrategyAdvice({ recommendations }: StrategyAdviceProps) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/40 border border-indigo-500/30 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Algorithmic Copilot Suggestions</h3>
          <p className="text-xs text-slate-400">Actionable creative tweaks to maximize feed distribution</p>
        </div>
      </div>

      <div className="space-y-2.5 mt-4">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300"
          >
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{rec}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
