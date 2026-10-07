"use client";

import { FeatureImpact } from "@/lib/types";
import { Plus, Minus, Info } from "lucide-react";

interface VariableImpactChartProps {
  attributions: FeatureImpact[];
}

export default function VariableImpactChart({ attributions }: VariableImpactChartProps) {
  const topDrivers = attributions.slice(0, 7);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-zinc-800">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100">
            Variable Impact Attribution (SHAP Decomposition)
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Individual point additions and subtractions relative to baseline performance.
          </p>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
          Ensemble Weights
        </span>
      </div>

      <div className="space-y-3">
        {topDrivers.map((item, idx) => {
          const isPositive = item.direction === "positive";
          const maxAbsImpact = 12.0;
          const barWidthPercent = Math.min(100, Math.round((Math.abs(item.impact) / maxAbsImpact) * 100));

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-medium text-zinc-200">
                  {isPositive ? (
                    <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Minus className="w-3.5 h-3.5 text-rose-400" />
                  )}
                  <span>{item.feature}</span>
                </div>
                <span className={`font-mono font-semibold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                  {isPositive ? `+${item.impact}` : item.impact} pts
                </span>
              </div>

              {/* Impact Bar */}
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isPositive ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                  style={{ width: `${barWidthPercent}%` }}
                ></div>
              </div>

              <p className="text-[11px] text-zinc-500 leading-normal flex items-start gap-1">
                <Info className="w-3 h-3 text-zinc-600 shrink-0 mt-0.5" />
                <span>{item.explanation}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
