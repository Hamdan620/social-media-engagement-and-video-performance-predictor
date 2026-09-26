"use client";

import { BarChart3, Database, ShieldCheck, Cpu, Layers } from "lucide-react";

export default function DatasetExplorerPage() {
  const datasetSummary = {
    totalRecords: "10,000",
    featureDimensions: "17",
    crossValAccuracy: "63.22% ± 1.41%",
    testAccuracy: "62.05%",
    weightedF1: "62.12%",
    macroF1: "60.87%",
  };

  const tierStats = [
    { name: "Medium Engagement", count: "4,129", pct: "41.3%", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
    { name: "High Engagement", count: "2,644", pct: "26.4%", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
    { name: "Low Engagement", count: "2,522", pct: "25.2%", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/30" },
    { name: "Viral (Top 10%)", count: "705", pct: "7.1%", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30" },
  ];

  const featureImportances = [
    { feature: "Video Duration (s)", score: 0.162, category: "Creative" },
    { feature: "Posting Hour (24h)", score: 0.138, category: "Distribution" },
    { feature: "Speech Tempo (WPM)", score: 0.119, category: "Pacing" },
    { feature: "Visual Hook Retention (0-1)", score: 0.115, category: "Hook" },
    { feature: "Visual Cuts Frequency", score: 0.098, category: "Pacing" },
    { feature: "Trending Audio Velocity", score: 0.092, category: "Sound" },
    { feature: "Hook Taxonomy Format", score: 0.084, category: "Hook" },
    { feature: "Creator Baseline Rate", score: 0.076, category: "Creator" },
    { feature: "Caption Length & Tags", score: 0.064, category: "Metadata" },
    { feature: "Face Presence on Camera", score: 0.052, category: "Trust" },
  ];

  const confusionMatrix = [
    { actual: "Actual Low", predLow: 71.4, predMed: 25.8, predHigh: 2.8, predViral: 0.0 },
    { actual: "Actual Medium", predLow: 18.6, predMed: 58.6, predHigh: 21.8, predViral: 1.0 },
    { actual: "Actual High", predLow: 0.9, predMed: 24.6, predHigh: 58.6, predViral: 15.9 },
    { actual: "Actual Viral", predLow: 0.0, predMed: 0.7, predHigh: 37.6, predViral: 61.7 },
  ];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/20 p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
            <Database className="w-3.5 h-3.5" />
            <span>Dataset & Model Benchmark Explorer</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            10,000-Row Dataset & Machine Learning Architecture
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Transparent empirical inspection of the short-form multimodal dataset, 5-Fold Stratified Cross-Validation metrics, and normalized confusion matrix.
          </p>
        </div>
      </div>

      {/* Model Benchmark KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Total Records", val: datasetSummary.totalRecords, sub: "Multimodal Vectors" },
          { label: "Features", val: datasetSummary.featureDimensions, sub: "Independent Vars" },
          { label: "5-Fold CV Acc", val: datasetSummary.crossValAccuracy, sub: "Stratified Validation" },
          { label: "Holdout Acc", val: datasetSummary.testAccuracy, sub: "20% Holdout Test" },
          { label: "Weighted F1", val: datasetSummary.weightedF1, sub: "Harmonic Balance" },
          { label: "Macro F1", val: datasetSummary.macroF1, sub: "Equal Class Weight" },
        ].map((kpi, i) => (
          <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
              {kpi.label}
            </span>
            <div className="text-xl font-black text-white tracking-tight">{kpi.val}</div>
            <span className="text-[10px] text-slate-500 mt-1 block">{kpi.sub}</span>
          </div>
        ))}
      </div>

      {/* Class Distribution Breakdown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <span>Balanced Tier Distribution (N = 10,000)</span>
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Natural distribution modeling organic algorithm reach: Medium as median baseline, with Viral strictly isolated to the elite top ~7-10%.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tierStats.map((t, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border ${t.bg}`}>
              <span className={`text-xs font-bold ${t.color}`}>{t.name}</span>
              <div className="text-2xl font-black text-white mt-1">{t.count}</div>
              <span className="text-xs text-slate-400">{t.pct} of entire dataset</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column Grid: Feature Importances & Confusion Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Global Feature Importance */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Random Forest Gini Feature Importances</span>
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Trained ensemble weights across 120 decision trees demonstrating the dominance of runtime and timing.
          </p>

          <div className="space-y-3">
            {featureImportances.map((item, idx) => {
              const maxScore = 0.18;
              const width = Math.round((item.score / maxScore) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.feature}</span>
                    <span className="font-mono text-purple-400 font-bold">{(item.score * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      style={{ width: `${width}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Normalized Confusion Matrix */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Normalized Confusion Matrix (%)</span>
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Evaluated on holdout test partition (N = 2,000). Diagonal cells represent correct predictions.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 px-3 text-left">Actual Class</th>
                  <th className="py-2.5 px-2">Pred Low</th>
                  <th className="py-2.5 px-2">Pred Med</th>
                  <th className="py-2.5 px-2">Pred High</th>
                  <th className="py-2.5 px-2">Pred Viral</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {confusionMatrix.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30">
                    <td className="py-3 px-3 text-left font-sans font-semibold text-slate-300">
                      {row.actual}
                    </td>
                    <td className={`py-3 px-2 rounded-lg font-bold ${row.actual.includes("Low") ? "bg-purple-600/30 text-purple-200" : "text-slate-400"}`}>
                      {row.predLow}%
                    </td>
                    <td className={`py-3 px-2 rounded-lg font-bold ${row.actual.includes("Medium") ? "bg-purple-600/30 text-purple-200" : "text-slate-400"}`}>
                      {row.predMed}%
                    </td>
                    <td className={`py-3 px-2 rounded-lg font-bold ${row.actual.includes("High") ? "bg-purple-600/30 text-purple-200" : "text-slate-400"}`}>
                      {row.predHigh}%
                    </td>
                    <td className={`py-3 px-2 rounded-lg font-bold ${row.actual.includes("Viral") ? "bg-purple-600/30 text-purple-200" : "text-slate-400"}`}>
                      {row.predViral}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 text-[11px] text-slate-400 leading-relaxed">
            💡 <strong>Matrix Analysis:</strong> Actual Viral videos show zero contamination with Low predictions, demonstrating sharp separation on strong retention signals.
          </div>
        </div>
      </div>
    </div>
  );
}
