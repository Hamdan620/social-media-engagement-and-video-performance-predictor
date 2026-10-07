"use client";

import { useState, useMemo } from "react";
import { VideoInputs, PredictionResult } from "@/lib/types";
import { PRESETS } from "@/lib/presets";
import { predictEngagement } from "@/lib/modelEngine";
import AnalysisForm from "@/components/AnalysisForm";
import ExecutiveSummary from "@/components/ExecutiveSummary";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import ScriptAnalyzerCard from "@/components/ScriptAnalyzerCard";
import VariableImpactChart from "@/components/VariableImpactChart";
import { Play, RotateCcw, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function PerformancePredictorPage() {
  const [inputs, setInputs] = useState<VideoInputs>(PRESETS[0].inputs);

  const prediction: PredictionResult = useMemo(() => {
    return predictEngagement(inputs);
  }, [inputs]);

  const handleSelectPreset = (presetInputs: VideoInputs) => {
    setInputs(presetInputs);
  };

  const handleReset = () => {
    setInputs(PRESETS[0].inputs);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Title & Academic Overview */}
      <div className="border-b border-zinc-800 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                Data Science Capstone / Research Project
              </span>
              <span className="text-xs font-mono text-zinc-500">Dataset N=10,000</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
              Short-Form Video Performance Predictor & Script Diagnostic Studio
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl leading-relaxed">
              Empirical modeling of algorithmic discovery curves across TikTok, Instagram Reels, and YouTube Shorts.
              Evaluates opening hook tension, narrative pacing, audio velocity, and audience baseline scaling.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Parameters</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Parameter Input & Script Workspace */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono">
            Step 1: Configure Video Attributes & Input Script
          </h2>
          <span className="text-xs text-zinc-500">Reactive Multi-Variable Input Form</span>
        </div>
        <AnalysisForm inputs={inputs} onChange={setInputs} onSelectPreset={handleSelectPreset} />
      </section>

      {/* 2. Generated Executive Dashboard (The user requested dashboard of all selected variables) */}
      <section className="space-y-6 pt-4 border-t border-zinc-800">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono">
            Step 2: Executive Analysis Dashboard & Audit Ledger
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Analysis Generated</span>
          </div>
        </div>

        {/* 2a. All Variables Summary Dashboard */}
        <ExecutiveSummary inputs={inputs} />

        {/* 2b. View Projections & Retention KPIs */}
        <PerformanceMetrics prediction={prediction} />

        {/* 2c. Dedicated Script Audit Card (Hook, Body, CTA) */}
        {prediction.scriptAnalysis && (
          <ScriptAnalyzerCard analysis={prediction.scriptAnalysis} />
        )}

        {/* 2d. Feature Impact Decomposition & Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <VariableImpactChart attributions={prediction.attributions} />

          {/* Actionable Strategy Recommendations */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
            <div className="pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-100">
                Actionable Optimization Recommendations
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Model-identified adjustments to increase retention velocity and push into a higher reach tier.
              </p>
            </div>

            <div className="space-y-2.5">
              {prediction.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-zinc-950/70 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="font-mono text-zinc-500 font-bold shrink-0">{idx + 1}.</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-zinc-950/40 rounded border border-zinc-800 text-[11px] text-zinc-500 leading-normal">
              💡 <strong>Methodology Note:</strong> Recommendations are derived from multi-variable decision trees trained on 10,000 short-form records, penalizing low completion percentages while rewarding immediate retention halting hooks.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
