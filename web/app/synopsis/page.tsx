'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer, Download, CheckCircle2, FileText } from 'lucide-react';

export default function SynopsisPage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 print:bg-white print:text-black">
      {/* Top Action Bar (Hidden when printing/saving to PDF) */}
      <nav className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur print:hidden">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 hidden sm:inline-flex">
              <CheckCircle2 className="w-3.5 h-3.5" /> Size: &lt; 1 MB (Form Limit: 10 MB)
            </span>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              Save / Print as PDF
            </button>
          </div>
        </div>
      </nav>

      {/* Main Document Body */}
      <main className="max-w-4xl mx-auto px-4 py-8 print:p-0 print:max-w-none">
        <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-lg shadow-xl print:shadow-none print:p-0 print:rounded-none">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-5 mb-6">
            <div className="text-[11px] font-bold tracking-widest text-slate-600 uppercase mb-1">
              Academic Project Submission
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
              Project Synopsis
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              Social Media Engagement &amp; Short-Form Video Performance Predictor using Machine Learning &amp; NLP
            </h1>
            <div className="mt-4 flex flex-wrap justify-between items-center bg-slate-50 border border-slate-200 rounded px-4 py-2 text-xs text-slate-700">
              <div>
                <span className="font-semibold text-slate-900">Domain:</span> Machine Learning &amp; Natural Language Processing
              </div>
              <div>
                <span className="font-semibold text-slate-900">Platform:</span> Cloud Web Application
              </div>
              <div>
                <span className="font-semibold text-slate-900">Academic Year:</span> 2026
              </div>
            </div>
          </div>

          {/* Section 1 */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              1. Introduction
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              Short-form video has become the primary medium of digital audience engagement across platforms including Instagram Reels, TikTok, and YouTube Shorts. Algorithmic distribution in these platforms is governed by complex retention curves, initial hook velocity, viewer drop-off rates, and user interaction signals. Creators, influencers, and marketing organizations face significant uncertainty when developing content, lacking pre-publication insights into how their videos will perform. This project introduces a predictive analytics and natural language processing system that evaluates video parameters and script narratives before publication, forecasting engagement rates, multi-channel view distribution (follower base vs. algorithmic explore feed), and audience retention metrics.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              2. Problem Statement
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              Existing analytics platforms are entirely retrospective—reporting performance metrics only after a video has been published and underperformed. Creators have no automated, objective pre-flight tool to evaluate whether their video hook (0–5 seconds), delivery pacing (words per minute), call-to-action (CTA), hashtags, audio choices, or upload schedule will trigger algorithmic distribution before committing production time and financial resources.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              3. Project Objectives
            </h2>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5">
              <li>
                <strong>Pre-Publication Engagement Forecasting:</strong> Predict engagement rate (%), expected watch time, shares, comments, and retention rate based on 17 multi-dimensional creator, production, and scheduling variables.
              </li>
              <li>
                <strong>Dual-Channel Audience Attribution:</strong> Isolate <em>Follower Base Views</em> from <em>Algorithmic FYP / Explore Discovery Views</em> across creator scales ranging from 0 to 1,000,000+ followers.
              </li>
              <li>
                <strong>NLP Script Quality &amp; Retention Diagnostics:</strong>
                <ul className="list-circle pl-5 mt-1 space-y-1">
                  <li><strong>Hook Evaluation (0–5s):</strong> Detect clichéd intros (&ldquo;Hey guys&rdquo;, &ldquo;Today I will...&rdquo;), identify curiosity gaps, and provide 3 high-retention algorithmic rewrites.</li>
                  <li><strong>Body Delivery Pacing:</strong> Calculate words-per-minute (WPM) delivery pacing and flag filler/fluff content.</li>
                  <li><strong>Call-to-Action (CTA):</strong> Score comment, share, and save conversion signals.</li>
                </ul>
              </li>
              <li>
                <strong>Explainable AI (XAI):</strong> Provide feature attribution (SHAP-inspired) to give creators transparent insights into which variables contributed positively or negatively to the final prediction.
              </li>
              <li>
                <strong>Production Cloud Deployment:</strong> Deliver an accessible, academic-grade web interface deployed on the cloud.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              4. Hardware &amp; Software Requirements
            </h2>
            <div className="border border-slate-200 rounded overflow-hidden text-xs">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="w-1/3 bg-slate-50 font-semibold p-2.5 text-slate-900 border-r border-slate-200">
                      Hardware Requirements
                    </td>
                    <td className="p-2.5 text-slate-700 leading-relaxed">
                      • <strong>Processor:</strong> Intel Core i5 / AMD Ryzen 5 or higher<br />
                      • <strong>RAM:</strong> 8 GB minimum (16 GB recommended)<br />
                      • <strong>Storage:</strong> 256 GB SSD / HDD<br />
                      • <strong>Network:</strong> Broadband Internet connectivity
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 bg-slate-50 font-semibold p-2.5 text-slate-900 border-r border-slate-200">
                      Software Requirements
                    </td>
                    <td className="p-2.5 text-slate-700 leading-relaxed">
                      • <strong>Operating System:</strong> Windows 10/11, Linux, macOS<br />
                      • <strong>Languages:</strong> Python 3.10+, TypeScript, JavaScript (Node.js 20+)<br />
                      • <strong>ML &amp; Data Science:</strong> Scikit-Learn (Random Forest, Gradient Boosting), NumPy, Pandas, Joblib<br />
                      • <strong>NLP Modules:</strong> Heuristic tokenization, sentiment matching, retention pattern analyzers<br />
                      • <strong>Frontend / Framework:</strong> Next.js 14 (App Router), React 18, Tailwind CSS, Lucide Icons<br />
                      • <strong>Hosting &amp; Version Control:</strong> Vercel Cloud Platform, Git &amp; GitHub
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              5. System Architecture &amp; Methodology
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed mb-2">
              The project pipeline consists of five interconnected modules:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded p-3 font-mono text-[10.5px] text-slate-800 leading-tight overflow-x-auto">
              {`+-------------------------------------------------------------------------+
|                               USER INPUTS                               |
|   (Follower Count, Script Text, Platform, Niche, Production, Schedule)  |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                       PROCESSING & ANALYTICS CORE                       |
|  +---------------------------------+  +-------------------------------+ |
|  |     NLP Script Analyzer Engine  |  |  ML Multi-Regression Engine   | |
|  | • Hook Tension (0-5s Window)    |  | • Engagement Rate (%)         | |
|  | • Body Delivery Pacing (150 WPM)|  | • Follower Base Views         | |
|  | • CTA Conversion Scoring        |  | • Algorithmic FYP Views       | |
|  | • Algorithmic Script Rewrites   |  | • SHAP Feature Attribution    | |
|  +---------------------------------+  +-------------------------------+ |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                    EXECUTIVE PRESENTATION DASHBOARD                     |
| • Dual-Channel View Forecast (Follower Views vs. FYP Discovery Reach)   |
| • Performance Tier Badge & Metric KPIs (Watch Time, Likes, Comments)   |
| • Hook, Body, & CTA Diagnostic Cards with 3 Specific Rewrite Options   |
| • Complete 17-Variable Executive Parameters Audit Ledger               |
+-------------------------------------------------------------------------+`}
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              6. Dataset &amp; Model Evaluation
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              The system was trained on a comprehensive dataset of <strong>10,000 short-form video records</strong> modeling multi-factor interactions across 6 primary content niches (Technology, Comedy, Fitness, Education, Finance, Lifestyle) and 3 leading platforms (TikTok, Instagram Reels, YouTube Shorts). Supervised regression modeling utilizing Random Forest and Gradient Boosting algorithms achieved high predictive accuracy (<strong>R² ≈ 0.88</strong>), effectively minimizing root mean squared error (RMSE).
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              7. Expected Outcomes &amp; Practical Applications
            </h2>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5">
              <li><strong>Pre-Production Validation:</strong> Empowers content creators to test and refine hooks, pacing, and schedules before recording.</li>
              <li><strong>Objective Script Optimization:</strong> Automates script quality audits, replacing weak openings with proven retention hooks.</li>
              <li><strong>Transparent Algorithmic Expectations:</strong> Distinguishes baseline follower distribution from FYP viral exploration reach.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              8. Verification &amp; Project Links
            </h2>
            <div className="text-xs text-slate-700 space-y-1 font-mono">
              <div>
                • <strong>Live Deployed Platform:</strong>{' '}
                <a
                  href="https://web-beta-lyart-5xnw34e0lc.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  https://web-beta-lyart-5xnw34e0lc.vercel.app
                </a>
              </div>
              <div>
                • <strong>GitHub Repository:</strong>{' '}
                <a
                  href="https://github.com/Hamdan620/social-media-engagement-and-video-performance-predictor"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  https://github.com/Hamdan620/social-media-engagement-and-video-performance-predictor
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
            <span>Prepared for Major Project Review</span>
            <span>Document Size: &lt; 10 MB (Print to PDF compliant)</span>
          </div>
        </div>
      </main>
    </div>
  );
}
