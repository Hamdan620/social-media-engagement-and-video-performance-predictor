"use client";

import { Database, ShieldCheck, Cpu, Layers } from "lucide-react";

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
    { name: "High Engagement", count: "2,644", pct: "26.4%", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
    { name: "Low Engagement", count: "2,522", pct: "25.2%", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/30" },
    { name: "Viral (Top 10%)", count: "705", pct: "7.1%", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
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
      {/* Header */}
      <div className="border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
            Empirical Validation Audit
          </span>
          <span className="text-xs font-mono text-zinc-500">10,000 Verified Vectors</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
          Dataset Architecture & Cross-Validation Metrics
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl leading-relaxed">
          Transparent inspection of the short-form multimodal dataset distributions, 5-Fold Stratified Cross-Validation results, and normalized confusion matrix.
        </p>
      </div>

      {/* Benchmark KPIs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Total Vectors", val: datasetSummary.totalRecords, sub: "Multimodal Records" },
          { label: "Feature Matrix", val: datasetSummary.featureDimensions, sub: "Independent Vars" },
          { label: "5-Fold CV Acc", val: datasetSummary.crossValAccuracy, sub: "Stratified Mean" },
          { label: "Holdout Acc", val: datasetSummary.testAccuracy, sub: "20% Holdout Test" },
          { label: "Weighted F1", val: datasetSummary.weightedF1, sub: "Harmonic Average" },
          { label: "Macro F1", val: datasetSummary.macroF1, sub: "Class-Balanced" },
        ].map((kpi, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3.5">
            <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider block mb-1">
              {kpi.label}
            </span>
            <div className="text-lg font-mono font-bold text-zinc-100 tracking-tight">{kpi.val}</div>
            <span className="text-[10px] text-zinc-500 mt-0.5 block">{kpi.sub}</span>
          </div>
        ))}
      </div>

      {/* Class Distribution Breakdown */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-zinc-100 mb-1 flex items-center gap-2">
          <Layers className="w-4 h-4 text-zinc-400" />
          <span>Balanced Tier Distribution (N = 10,000)</span>
        </h3>
        <p className="text-xs text-zinc-400 mb-4">
          Natural distribution modeling realistic platform reach: Medium as median baseline, with Viral strictly isolated to the top ~7-10%.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tierStats.map((t, idx) => (
            <div key={idx} className={`p-4 rounded-lg border ${t.bg}`}>
              <span className={`text-xs font-semibold ${t.color}`}>{t.name}</span>
              <div className="text-2xl font-mono font-bold text-zinc-100 mt-1">{t.count}</div>
              <span className="text-xs text-zinc-400 font-mono">{t.pct} of total records</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column Grid: Feature Importances & Confusion Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Global Feature Importance */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-100 mb-1 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-zinc-400" />
            <span>Random Forest Gini Feature Importances</span>
          </h3>
          <p className="text-xs text-zinc-400 mb-4">
            Trained ensemble weights across 120 decision trees showing runtime and hook as primary predictors.
          </p>

          <div className="space-y-3">
            {featureImportances.map((item, idx) => {
              const maxScore = 0.18;
              const width = Math.round((item.score / maxScore) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-300">{item.feature}</span>
                    <span className="font-mono text-zinc-400 font-semibold">{(item.score * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-400 rounded-full"
                      style={{ width: `${width}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Normalized Confusion Matrix */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-100 mb-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-zinc-400" />
            <span>Normalized Confusion Matrix (%)</span>
          </h3>
          <p className="text-xs text-zinc-400 mb-4">
            Evaluated on holdout test partition (N = 2,000). Diagonal cells represent correct classifications.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="py-2.5 px-3 text-left">Actual Class</th>
                  <th className="py-2.5 px-2">Pred Low</th>
                  <th className="py-2.5 px-2">Pred Med</th>
                  <th className="py-2.5 px-2">Pred High</th>
                  <th className="py-2.5 px-2">Pred Viral</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 font-mono">
                {confusionMatrix.map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-800/40">
                    <td className="py-3 px-3 text-left font-sans font-medium text-zinc-300">
                      {row.actual}
                    </td>
                    <td className={`py-3 px-2 rounded font-semibold ${row.actual.includes("Low") ? "bg-zinc-800 text-zinc-100" : "text-zinc-500"}`}>
                      {row.predLow}%
                    </td>
                    <td className={`py-3 px-2 rounded font-semibold ${row.actual.includes("Medium") ? "bg-zinc-800 text-zinc-100" : "text-zinc-500"}`}>
                      {row.predMed}%
                    </td>
                    <td className={`py-3 px-2 rounded font-semibold ${row.actual.includes("High") ? "bg-zinc-800 text-zinc-100" : "text-zinc-500"}`}>
                      {row.predHigh}%
                    </td>
                    <td className={`py-3 px-2 rounded font-semibold ${row.actual.includes("Viral") ? "bg-zinc-800 text-zinc-100" : "text-zinc-500"}`}>
                      {row.predViral}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 rounded bg-zinc-950/60 border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed">
            💡 <strong>Evaluation Finding:</strong> Actual Viral videos show zero misclassifications into Low, demonstrating robust mathematical boundary separation.
          </div>
        </div>
      </div>
    </div>
  );
}
