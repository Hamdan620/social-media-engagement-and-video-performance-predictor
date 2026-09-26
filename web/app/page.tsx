"use client";

import { useState, useMemo } from "react";
import { VideoInputs, PredictionResult } from "@/lib/types";
import { PRESETS } from "@/lib/presets";
import { predictEngagement } from "@/lib/modelEngine";
import PresetsBar from "@/components/PresetsBar";
import StudioForm from "@/components/StudioForm";
import PredictionCard from "@/components/PredictionCard";
import FeatureImpactChart from "@/components/FeatureImpactChart";
import StrategyAdvice from "@/components/StrategyAdvice";
import { Sparkles, RefreshCw, Cpu } from "lucide-react";

export default function StudioPage() {
  const [inputs, setInputs] = useState<VideoInputs>(PRESETS[0].inputs);
  const [activePresetId, setActivePresetId] = useState<string>(PRESETS[0].id);

  // Compute prediction dynamically or on demand
  const prediction: PredictionResult = useMemo(() => {
    return predictEngagement(inputs);
  }, [inputs]);

  const handleSelectPreset = (newInputs: VideoInputs) => {
    setInputs(newInputs);
    const matched = PRESETS.find((p) => p.inputs.hook_type === newInputs.hook_type && p.inputs.video_length === newInputs.video_length);
    if (matched) {
      setActivePresetId(matched.id);
    } else {
      setActivePresetId("");
    }
  };

  const handleFormChange = (newInputs: VideoInputs) => {
    setInputs(newInputs);
    setActivePresetId("");
  };

  return (
    <div className="space-y-6">
      {/* Header / Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/20 p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Trained on 10,000 Multimodal Video Records (17 Features)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Short-Form Video Engagement & Viral Predictor
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Forecast TikTok, Instagram Reels, and YouTube Shorts algorithmic distribution before publishing.
            Leverage multimodal machine learning to optimize hooks, pacing, audio velocity, and scheduling.
          </p>
        </div>
      </div>

      {/* 1-Click Creative Presets */}
      <PresetsBar onSelectPreset={handleSelectPreset} activePresetId={activePresetId} />

      {/* Main Studio Workspace: 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Studio (7 cols on large) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Creative Parameters Studio</span>
            </h2>
            <button
              type="button"
              onClick={() => handleSelectPreset(PRESETS[0].inputs)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Default</span>
            </button>
          </div>

          <StudioForm inputs={inputs} onChange={handleFormChange} />
        </div>

        {/* Right Column: Prediction Engine & Explainable AI (5 cols on large) */}
        <div className="lg:col-span-5 space-y-6 sticky top-20">
          <PredictionCard prediction={prediction} />
          <StrategyAdvice recommendations={prediction.copilotRecommendations} />
          <FeatureImpactChart attributions={prediction.attributions} />
        </div>
      </div>
    </div>
  );
}
