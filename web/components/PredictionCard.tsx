"use client";

import { useEffect } from "react";
import { PredictionResult } from "@/lib/types";
import { Eye, TrendingUp, Clock, Share2, Flame, Award, AlertTriangle, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

interface PredictionCardProps {
  prediction: PredictionResult;
}

export default function PredictionCard({ prediction }: PredictionCardProps) {
  const {
    score,
    tier,
    probabilities,
    estimatedViews,
    threeSecRetention,
    completionRate,
    sharesToLikesRatio,
  } = prediction;

  // Trigger celebration confetti when Viral score achieved!
  useEffect(() => {
    if (tier === "Viral (Top 10%)") {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981"],
        });
      } catch (e) {
        // Fallback gracefully
      }
    }
  }, [tier, score]);

  const tierStyles = {
    "Viral (Top 10%)": {
      gradient: "from-purple-900/50 via-slate-900 to-indigo-950/60",
      border: "border-purple-500/60",
      glow: "shadow-purple-500/20",
      badgeBg: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      scoreColor: "text-purple-400",
      icon: Flame,
      tag: "🔥 VIRAL BREAKTHROUGH POTENTIAL",
    },
    High: {
      gradient: "from-emerald-950/50 via-slate-900 to-teal-950/60",
      border: "border-emerald-500/60",
      glow: "shadow-emerald-500/20",
      badgeBg: "bg-emerald-500 text-slate-950",
      scoreColor: "text-emerald-400",
      icon: Award,
      tag: "🚀 HIGH ENGAGEMENT DISTRIBUTION",
    },
    Medium: {
      gradient: "from-amber-950/40 via-slate-900 to-yellow-950/40",
      border: "border-amber-500/50",
      glow: "shadow-amber-500/20",
      badgeBg: "bg-amber-500 text-slate-950",
      scoreColor: "text-amber-400",
      icon: TrendingUp,
      tag: "⚡ MODERATE REACH BASELINE",
    },
    Low: {
      gradient: "from-rose-950/40 via-slate-900 to-red-950/40",
      border: "border-rose-500/50",
      glow: "shadow-rose-500/20",
      badgeBg: "bg-rose-500 text-white",
      scoreColor: "text-rose-400",
      icon: AlertTriangle,
      tag: "⚠️ HIGH RETENTION DROP RISK",
    },
  };

  const style = tierStyles[tier];
  const IconComponent = style.icon;

  // Radial calculation (stroke-dasharray)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div
      className={`rounded-3xl border ${style.border} bg-gradient-to-b ${style.gradient} p-6 shadow-xl ${style.glow} transition-all duration-300 relative overflow-hidden`}
    >
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${style.badgeBg}`}>
            {style.tag}
          </span>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Multimodal Random Forest Ensemble</span>
        </div>
      </div>

      {/* Main Score & Radial Gauge */}
      <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* Circular SVG Gauge */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="text-slate-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r={radius}
                className={`${style.scoreColor} transition-all duration-1000 ease-out`}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className={`text-3xl font-black tracking-tight ${style.scoreColor}`}>
                {score}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Score / 100
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Predicted Engagement
            </div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <span>{tier}</span>
              <IconComponent className={`w-6 h-6 ${style.scoreColor}`} />
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Based on algorithmic retention affinity across 17 video parameters.
            </p>
          </div>
        </div>

        {/* Highlighted Est. Views Card */}
        <div className="w-full sm:w-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:min-w-[220px]">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
            <Eye className="w-4 h-4 text-purple-400" />
            <span>Estimated Reach</span>
          </div>
          <div className="text-lg font-bold text-white tracking-tight">{estimatedViews}</div>
          <div className="text-[11px] text-slate-500 mt-1">72-hour algorithmic window</div>
        </div>
      </div>

      {/* Benchmark Metrics Grid */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>3s Retention</span>
          </div>
          <div className="text-base font-bold text-white">{threeSecRetention}%</div>
          <div className="text-[10px] text-slate-500">Scroll-stop rate</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Completion</span>
          </div>
          <div className="text-base font-bold text-white">{completionRate}%</div>
          <div className="text-[10px] text-slate-500">Full watch-through</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Share2 className="w-3.5 h-3.5 text-pink-400" />
            <span>Share Ratio</span>
          </div>
          <div className="text-base font-bold text-white truncate">{sharesToLikesRatio}</div>
          <div className="text-[10px] text-slate-500">Shares per like</div>
        </div>
      </div>

      {/* Tier Probability Breakdown */}
      <div className="mt-5 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
          <span>Tier Probability Distribution</span>
          <span className="text-[11px] text-slate-500">Calibrated Softmax Ensembles</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {(["Low", "Medium", "High", "Viral (Top 10%)"] as const).map((t) => {
            const prob = probabilities[t] || 0;
            const isCurrent = t === tier;
            const barColors = {
              "Viral (Top 10%)": "bg-purple-500",
              High: "bg-emerald-500",
              Medium: "bg-amber-500",
              Low: "bg-rose-500",
            };
            return (
              <div key={t} className="text-center">
                <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-center gap-1">
                  <span className="truncate">{t.replace(" (Top 10%)", "")}</span>
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${barColors[t]} ${
                      isCurrent ? "opacity-100" : "opacity-40"
                    }`}
                    style={{ width: `${prob}%` }}
                  ></div>
                </div>
                <div className={`text-xs font-bold mt-1 ${isCurrent ? "text-white" : "text-slate-500"}`}>
                  {prob}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
