"use client";

import { FeatureImpact } from "@/lib/types";
import { ArrowUpRight, ArrowDownRight, Info } from "lucide-react";

interface FeatureImpactChartProps {
  attributions: FeatureImpact[];
}

export default function FeatureImpactChart({ attributions }: FeatureImpactChartProps) {
  // Take top 6 drivers
  const topDrivers = attributions.slice(0, 6);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Explainable AI (XAI) Attribution</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Individual positive and negative point drivers influencing your video score.
          </p>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          SHAP-Equivalent Values
        </span>
      </div>

      <div className="space-y-3">
        {topDrivers.map((item, idx) => {
          const isPositive = item.direction === "positive";
          const maxAbsImpact = 14.0;
          const barWidthPercent = Math.min(100, Math.round((Math.abs(item.impact) / maxAbsImpact) * 100));

          return (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/70 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                      isPositive ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{item.feature}</span>
                </div>
                <span
                  className={`text-xs font-mono font-bold ${
                    isPositive ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {isPositive ? `+${item.impact}` : item.impact} pts
                </span>
              </div>

              {/* Impact Bar */}
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-1.5">
                <div
                  className={`h-full rounded-full ${
                    isPositive
                      ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                      : "bg-gradient-to-r from-rose-500 to-red-600"
                  }`}
                  style={{ width: `${barWidthPercent}%` }}
                ></div>
              </div>

              <p className="text-[11px] text-slate-400 leading-normal flex items-start gap-1.5">
                <Info className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                <span>{item.explanation}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
