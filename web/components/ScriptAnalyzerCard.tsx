"use client";

import { ScriptAnalysis } from "@/lib/types";
import { AlertCircle, CheckCircle, Sparkles, MessageSquare, BookOpen, Share2 } from "lucide-react";

interface ScriptAnalyzerCardProps {
  analysis?: ScriptAnalysis;
}

export default function ScriptAnalyzerCard({ analysis }: ScriptAnalyzerCardProps) {
  if (!analysis) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center text-xs text-zinc-500">
        Paste a video script in the configuration panel above to generate detailed Hook, Body, and Call-to-Action (CTA) diagnostics.
      </div>
    );
  }

  const { hook, body, cta, overallScriptScore } = analysis;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/40 bg-emerald-500/10";
    if (score >= 60) return "text-amber-400 border-amber-500/40 bg-amber-500/10";
    return "text-rose-400 border-rose-500/40 bg-rose-500/10";
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-3">
        <div>
          <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            <span>Script Structure & Copywriting Audit</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Empirical deconstruction of Hook tension, Body pacing density, and CTA conversion velocity.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-950 px-3.5 py-1.5 rounded-lg border border-zinc-800 self-start sm:self-auto">
          <span className="text-xs text-zinc-400 font-mono">Script Virality Score:</span>
          <span className="text-lg font-mono font-bold text-zinc-100">{overallScriptScore}</span>
          <span className="text-xs text-zinc-500 font-mono">/ 100</span>
        </div>
      </div>

      {/* 3-Column Diagnostic Cards: Hook, Body, CTA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Hook Analysis */}
        <div className="bg-zinc-950/70 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                <span>1. Opening Hook (0-5s)</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-mono font-semibold border ${getScoreColor(hook.score)}`}>
                {hook.score}/100
              </span>
            </div>

            <div className="text-[11px] font-mono text-zinc-400 mb-2">
              Pattern: <span className="text-zinc-200">{hook.detectedStyle}</span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-2.5 rounded text-xs text-zinc-300 italic mb-3 line-clamp-3">
              "{hook.text}"
            </div>

            <div className="text-xs text-zinc-400 space-y-1.5">
              <p className="flex items-start gap-1.5">
                {hook.isCliche ? (
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <span className="text-[11px] leading-relaxed">{hook.critique}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2. Body & Pacing Analysis */}
        <div className="bg-zinc-950/70 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                <span>2. Body & Narrative Pacing</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-mono font-semibold border ${getScoreColor(body.score)}`}>
                {body.score}/100
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-zinc-900/90 p-2 rounded border border-zinc-800 mb-3">
              <div>
                <span className="text-zinc-500 block">Length:</span>
                <span className="text-zinc-200 font-semibold">{body.wordCount} words</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Est. Runtime:</span>
                <span className="text-zinc-200 font-semibold">~{body.estimatedDurationSec}s</span>
              </div>
            </div>

            <div className="text-xs text-zinc-400 space-y-2">
              <p className="text-[11px] leading-relaxed">{body.critique}</p>
              <div className="text-[11px] text-zinc-300 bg-zinc-900/60 p-2 rounded border border-zinc-800/80">
                <strong>Pacing Recommendation:</strong> {body.pacingAdvice}
              </div>
            </div>
          </div>
        </div>

        {/* 3. CTA Analysis */}
        <div className="bg-zinc-950/70 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>3. Call to Action (CTA)</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-mono font-semibold border ${getScoreColor(cta.score)}`}>
                {cta.score}/100
              </span>
            </div>

            <div className="text-[11px] font-mono text-zinc-400 mb-2">
              Mechanism: <span className="text-zinc-200">{cta.ctaType}</span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-2.5 rounded text-xs text-zinc-300 italic mb-3 line-clamp-3">
              "{cta.text}"
            </div>

            <div className="text-xs text-zinc-400">
              <p className="text-[11px] leading-relaxed">{cta.critique}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Rewrite Variants Section */}
      {hook.rewrites && hook.rewrites.length > 0 && (
        <div className="bg-zinc-950/60 border border-zinc-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
              <span>High-Retention Script Alternative Rewrites</span>
            </span>
            <span className="text-[11px] font-mono text-zinc-500">Based on viral copywriting heuristics</span>
          </div>

          <div className="space-y-2">
            {hook.rewrites.map((rewrite, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 text-xs text-zinc-300 p-2.5 rounded bg-zinc-900 border border-zinc-800/80 font-mono"
              >
                <span className="text-zinc-500 font-bold shrink-0">Option {i + 1}:</span>
                <span className="font-sans leading-relaxed text-zinc-200">{rewrite}</span>
              </div>
            ))}
          </div>

          {cta.suggestedCta && cta.suggestedCta.length > 0 && (
            <div className="pt-2 border-t border-zinc-800/60 mt-3">
              <span className="text-[11px] font-semibold text-zinc-400 block mb-1.5">
                High-Converting CTA Options:
              </span>
              <div className="space-y-1.5 text-xs text-zinc-300">
                {cta.suggestedCta.map((sug, idx) => (
                  <div key={idx} className="p-2 rounded bg-zinc-900/80 border border-zinc-800/60 text-[11px]">
                    {sug}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
