"use client";

import { PredictionResult } from "@/lib/types";
import { Eye, TrendingUp, Users, Compass, Activity, Clock } from "lucide-react";

interface PerformanceMetricsProps {
  prediction: PredictionResult;
}

export default function PerformanceMetrics({ prediction }: PerformanceMetricsProps) {
  const {
    score,
    tier,
    confidence,
    totalViewsFormatted,
    followerBaseViews,
    algorithmicFypViews,
    fypPercentage,
    threeSecRetention,
    completionRate,
    sharesToLikesRatio,
  } = prediction;

  const tierBadges: Record<string, { label: string; badgeClass: string; desc: string }> = {
    "Viral (Top 10%)": {
      label: "Viral Recommendation Takeover",
      badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      desc: "Top decile algorithm momentum with widespread explore feed breakout.",
    },
    High: {
      label: "High Algorithmic Reach",
      badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      desc: "Strong completion metrics driving repeat seed-pool expansion.",
    },
    Medium: {
      label: "Moderate Feed Reach",
      badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      desc: "Typical performance relying heavily on existing follower engagement.",
    },
    Low: {
      label: "Low Retention Attrition",
      badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      desc: "Early drop-off suppresses distribution beyond the initial test seed pool.",
    },
  };

  const badge = tierBadges[tier] || tierBadges["Medium"];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
      {/* Top Banner: Tier & Overall Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-zinc-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badge.badgeClass}`}>
              {badge.label}
            </span>
            <span className="text-xs font-mono text-zinc-400">Confidence: {confidence}%</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">{tier}</h2>
          <p className="text-xs text-zinc-400 mt-0.5">{badge.desc}</p>
        </div>

        <div className="flex items-center gap-3 bg-zinc-950 px-4 py-2.5 rounded-lg border border-zinc-800 shrink-0">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-zinc-500">Algorithm Score</div>
            <div className="text-xs text-zinc-400">Normalized Index</div>
          </div>
          <div className="text-3xl font-mono font-bold text-zinc-100">{score}</div>
          <span className="text-xs font-mono text-zinc-500">/ 100</span>
        </div>
      </div>

      {/* Dual-Channel Projected Views Section */}
      <div className="py-5 border-b border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-zinc-400" />
              <span>Projected 72-Hour Total Reach</span>
            </span>
            <div className="text-2xl font-bold font-mono text-zinc-100 mt-1">{totalViewsFormatted}</div>
          </div>
          <div className="text-xs font-mono text-zinc-400 text-left sm:text-right">
            <span>Dual-Channel Distribution Model</span>
            <div className="text-[11px] text-zinc-500">Seed Audience + Algorithmic For You Page (FYP)</div>
          </div>
        </div>

        {/* Visual Channel Breakdown Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden flex">
            <div
              className="bg-zinc-500 h-full"
              style={{ width: `${100 - fypPercentage}%` }}
              title="Follower Base Views"
            ></div>
            <div
              className="bg-emerald-500 h-full"
              style={{ width: `${fypPercentage}%` }}
              title="Algorithmic FYP Views"
            ></div>
          </div>

          <div className="flex justify-between text-xs font-mono pt-1">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-zinc-500"></span>
              <span>Follower Base: ~{followerBaseViews.toLocaleString()} ({100 - fypPercentage}%)</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>FYP / Explore: ~{algorithmicFypViews.toLocaleString()} ({fypPercentage}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Algorithm Retention Rates */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5">
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-3.5">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span>3s Scroll-Stop Rate</span>
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div className="text-lg font-mono font-bold text-zinc-100">{threeSecRetention}%</div>
          <p className="text-[11px] text-zinc-500 mt-0.5">Benchmark passing initial 3s window</p>
        </div>

        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-3.5">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span>Full Watch Completion</span>
            <Activity className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div className="text-lg font-mono font-bold text-zinc-100">{completionRate}%</div>
          <p className="text-[11px] text-zinc-500 mt-0.5">Primary catalyst for explore feed expansion</p>
        </div>

        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-3.5">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span>Share Velocity Ratio</span>
            <TrendingUp className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div className="text-lg font-mono font-bold text-zinc-100 truncate">{sharesToLikesRatio}</div>
          <p className="text-[11px] text-zinc-500 mt-0.5">Shares per like signal</p>
        </div>
      </div>
    </div>
  );
}
