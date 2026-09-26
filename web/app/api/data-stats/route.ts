import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const datasetStats = {
    totalRecords: 10000,
    featuresCount: 17,
    crossValidationAccuracy: 63.22,
    holdoutAccuracy: 62.05,
    weightedF1: 62.12,
    macroF1: 60.87,
    classes: ["Low", "Medium", "High", "Viral (Top 10%)"],
    classDistribution: {
      Medium: 4129,
      High: 2644,
      Low: 2522,
      "Viral (Top 10%)": 705,
    },
    topFeatures: [
      { feature: "Video Length (s)", importance: 0.162 },
      { feature: "Posting Hour", importance: 0.138 },
      { feature: "Speech Tempo (WPM)", importance: 0.119 },
      { feature: "Visual Hook Score", importance: 0.115 },
      { feature: "Visual Pacing (Cuts/Min)", importance: 0.098 },
      { feature: "Trending Audio Velocity", importance: 0.092 },
      { feature: "Hook Format", importance: 0.084 },
      { feature: "Creator Baseline Rate", importance: 0.076 },
      { feature: "Face Presence", importance: 0.052 },
      { feature: "Caption Length & Tags", importance: 0.064 },
    ],
    confusionMatrix: [
      [71.4, 25.8, 2.8, 0.0],
      [18.6, 58.6, 21.8, 1.0],
      [0.9, 24.6, 58.6, 15.9],
      [0.0, 0.7, 37.6, 61.7],
    ],
  };

  return NextResponse.json({
    success: true,
    data: datasetStats,
  });
}
