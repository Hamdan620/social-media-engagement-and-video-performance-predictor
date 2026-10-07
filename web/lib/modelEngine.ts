import { VideoInputs, PredictionResult, FeatureImpact, EngagementTier } from "./types";
import { analyzeScript } from "./scriptAnalyzer";

export function predictEngagement(inputs: VideoInputs): PredictionResult {
  let score = 30.0;
  const attributions: FeatureImpact[] = [];
  const recommendations: string[] = [];

  // --- 1. SCRIPT ANALYSIS INTEGRATION ---
  let scriptAnalysis = undefined;
  if (inputs.script_text && inputs.script_text.trim().length > 0) {
    scriptAnalysis = analyzeScript(inputs.script_text);
    // Impact of script quality (-8 to +12 pts)
    const scriptImpact = Math.round(((scriptAnalysis.overallScriptScore - 55) / 45) * 10 * 10) / 10;
    score += scriptImpact;

    attributions.push({
      feature: `Script Quality Index (${scriptAnalysis.overallScriptScore}/100)`,
      impact: scriptImpact,
      direction: scriptImpact >= 0 ? "positive" : "negative",
      explanation:
        scriptImpact >= 0
          ? `Strong narrative structure with high-retention ${scriptAnalysis.hook.detectedStyle}.`
          : `Script contains pacing drag or cliché openings that trigger drop-off.`,
    });

    if (scriptAnalysis.hook.isCliche) {
      recommendations.push(
        "Replace conversational cliché opening ('Hey guys', 'In this video', etc.) with an immediate pattern interrupt."
      );
    }
  }

  // --- 2. HOOK STYLE IMPACT ---
  const hookWeights: Record<string, { pts: number; desc: string }> = {
    "Visual Shock": { pts: 10.0, desc: "Immediate visual disruption halts rapid thumb scroll." },
    "Curiosity Gap": { pts: 8.5, desc: "Unresolved narrative tension drives completion." },
    "Bold Statement": { pts: 7.0, desc: "Polarizing thesis encourages replay & debate." },
    "Challenge/Dare": { pts: 6.0, desc: "Gamified framing triggers curiosity to see outcome." },
    "Storytelling": { pts: 4.5, desc: "Authentic narrative structure with good mid-retention." },
    "Question": { pts: 2.0, desc: "Standard question hook; over-saturated in current feeds." },
    "Listicle": { pts: 0.5, desc: "Static countdown format suffers from low short-form retention." },
  };

  const hookInfo = hookWeights[inputs.hook_type] || { pts: 3.0, desc: "Standard baseline hook." };
  score += hookInfo.pts;
  attributions.push({
    feature: `Hook Style: ${inputs.hook_type}`,
    impact: hookInfo.pts,
    direction: hookInfo.pts >= 4.0 ? "positive" : "negative",
    explanation: hookInfo.desc,
  });

  if (hookInfo.pts < 6.0) {
    recommendations.push(
      "Test high-tension hook archetypes like 'Visual Shock' or 'Curiosity Gap' to raise initial 3-second retention."
    );
  }

  // --- 3. PLATFORM & DURATION AFFINITY ---
  let durPts = 0.0;
  let durDesc = "";
  const len = inputs.video_length;

  if (inputs.target_platform === "TikTok") {
    if (len >= 15 && len <= 34) {
      durPts = 8.5;
      durDesc = "Optimal TikTok runtime (15-34s) for high completion rate and replay loops.";
    } else if (len >= 35 && len <= 60) {
      durPts = 3.0;
      durDesc = "Moderate runtime; requires constant pacing to avoid viewer swipe-away.";
    } else if (len < 15) {
      durPts = 1.0;
      durDesc = "Very brief; yields high completion but limited cumulative watch-time.";
    } else {
      durPts = -8.0;
      durDesc = "Videos longer than 60s face severe drop-off on TikTok explore feeds.";
    }
  } else if (inputs.target_platform === "Instagram Reels") {
    if (len >= 12 && len <= 28) {
      durPts = 8.0;
      durDesc = "Optimal Reels length for repeat loop replays.";
    } else if (len >= 29 && len <= 50) {
      durPts = 2.5;
      durDesc = "Acceptable runtime for Reels, tight editing is required.";
    } else {
      durPts = -7.0;
      durDesc = "Reels audiences drop off quickly past 45s.";
    }
  } else {
    // YouTube Shorts
    if (len >= 25 && len <= 58) {
      durPts = 8.5;
      durDesc = "Optimal Shorts duration for maximized watch-time retention credit.";
    } else if (len >= 10 && len < 25) {
      durPts = 2.0;
      durDesc = "A bit short for YouTube Shorts algorithm which favors 30s+ watch-time.";
    } else {
      durPts = -6.5;
      durDesc = "Excessive duration without high visual pacing penalizes Shorts distribution.";
    }
  }

  score += durPts;
  attributions.push({
    feature: `Duration (${len}s on ${inputs.target_platform})`,
    impact: Math.round(durPts * 10) / 10,
    direction: durPts >= 0 ? "positive" : "negative",
    explanation: durDesc,
  });

  // --- 4. AUDIO VELOCITY ---
  let audioPts = 0.0;
  if (inputs.has_trending_audio === 1) {
    audioPts += 4.5 + (inputs.sound_popularity_index / 100.0) * 6.5;
    score += audioPts;
    attributions.push({
      feature: `Trending Audio (Rank #${inputs.sound_popularity_index}/100)`,
      impact: Math.round(audioPts * 10) / 10,
      direction: "positive",
      explanation: "Algorithmic sound velocity acts as a distribution multiplier.",
    });
  } else {
    audioPts = -5.0;
    score += audioPts;
    attributions.push({
      feature: "Original Audio (Non-Trending)",
      impact: -5.0,
      direction: "negative",
      explanation: "Original audio misses out on platform sound page exploration.",
    });
    recommendations.push(
      "Pair with a trending background sound (even at 5% volume) to trigger algorithmic explore distribution."
    );
  }

  // --- 5. DELIVERY & VISUAL PACING ---
  let tempoPts = 0.0;
  if (inputs.speech_tempo_wpm >= 140 && inputs.speech_tempo_wpm <= 180) {
    tempoPts = 5.0;
  } else if (inputs.speech_tempo_wpm < 120) {
    tempoPts = -5.5;
    recommendations.push("Increase vocal cadence to 145-165 WPM to eliminate dead pauses.");
  } else {
    tempoPts = -3.5;
  }
  score += tempoPts;
  attributions.push({
    feature: `Speech Cadence (${inputs.speech_tempo_wpm} WPM)`,
    impact: Math.round(tempoPts * 10) / 10,
    direction: tempoPts >= 0 ? "positive" : "negative",
    explanation: tempoPts >= 0 ? "Crisp vocal delivery sustains audience attention." : "Vocal delivery too slow or rushed.",
  });

  let cutPts = 0.0;
  if (inputs.cut_frequency_per_min >= 10 && inputs.cut_frequency_per_min <= 22) {
    cutPts = 5.5;
  } else if (inputs.cut_frequency_per_min < 6) {
    cutPts = -6.0;
    recommendations.push("Increase visual cuts to 12-16 cuts/min using B-roll, zooms, or graphics.");
  } else {
    cutPts = -2.5;
  }
  score += cutPts;
  attributions.push({
    feature: `Visual Pacing (${inputs.cut_frequency_per_min} cuts/min)`,
    impact: Math.round(cutPts * 10) / 10,
    direction: cutPts >= 0 ? "positive" : "negative",
    explanation: cutPts >= 0 ? "Dynamic visual shifts keep viewer dopamine engaged." : "Static footage causes drop-off.",
  });

  // --- 6. SCHEDULE & TIMING ---
  let timingPts = 0.0;
  if (inputs.posting_hour >= 18 && inputs.posting_hour <= 21) {
    timingPts += 5.5;
  } else if (inputs.posting_hour >= 12 && inputs.posting_hour <= 14) {
    timingPts += 3.5;
  } else if (inputs.posting_hour >= 7 && inputs.posting_hour <= 9) {
    timingPts += 2.0;
  } else if (inputs.posting_hour >= 1 && inputs.posting_hour <= 5) {
    timingPts -= 9.0;
    recommendations.push("Shift publishing schedule away from low-traffic hours (1:00-5:00 AM) to prime evening (18:00-21:00).");
  }

  if (["Thursday", "Friday", "Saturday", "Sunday"].includes(inputs.posting_day)) {
    timingPts += 2.5;
  }
  score += timingPts;
  attributions.push({
    feature: `Posting Schedule (${inputs.posting_hour}:00, ${inputs.posting_day})`,
    impact: Math.round(timingPts * 10) / 10,
    direction: timingPts >= 0 ? "positive" : "negative",
    explanation: timingPts >= 0 ? "High active user concurrency during peak evening window." : "Low active viewer period.",
  });

  // Final score clamping
  const finalScore = Math.max(3.0, Math.min(99.0, Math.round(score * 10) / 10));

  // Determine Tier
  let tier: EngagementTier = "Medium";
  if (finalScore >= 72.0) {
    tier = "Viral (Top 10%)";
  } else if (finalScore >= 54.0) {
    tier = "High";
  } else if (finalScore >= 36.0) {
    tier = "Medium";
  } else {
    tier = "Low";
  }

  // Softmax Probabilities
  const dist = {
    Low: Math.exp(-0.08 * (finalScore - 26)),
    Medium: Math.exp(-0.003 * Math.pow(finalScore - 45, 2)),
    High: Math.exp(-0.003 * Math.pow(finalScore - 63, 2)),
    "Viral (Top 10%)": Math.exp(0.09 * (finalScore - 72)),
  };
  const sumDist = dist.Low + dist.Medium + dist.High + dist["Viral (Top 10%)"];
  const probabilities = {
    Low: Math.round((dist.Low / sumDist) * 100),
    Medium: Math.round((dist.Medium / sumDist) * 100),
    High: Math.round((dist.High / sumDist) * 100),
    "Viral (Top 10%)": Math.round((dist["Viral (Top 10%)"] / sumDist) * 100),
  };

  // --- 7. DUAL-CHANNEL VIEW PROJECTION (FOLLOWER BASE + ALGORITHMIC FYP) ---
  const followers = Math.max(0, inputs.follower_count || 0);

  // Follower base impression rate: 2.5% to 7.0% depending on score
  const followerRate = Math.min(0.12, Math.max(0.015, (finalScore / 100) * 0.08));
  const followerBaseViews = Math.round(followers * followerRate);

  // Algorithmic FYP Discovery: Independent of followers, driven by content quality & completion
  let fypMin = 500;
  let fypMax = 2500;

  if (tier === "Viral (Top 10%)") {
    fypMin = 250000;
    fypMax = 1800000;
  } else if (tier === "High") {
    fypMin = 45000;
    fypMax = 250000;
  } else if (tier === "Medium") {
    fypMin = 5000;
    fypMax = 40000;
  } else {
    fypMin = 400;
    fypMax = 3500;
  }

  // Account credibility modifier (large accounts get slightly faster initial explore seed pools)
  const credibilityBonus = followers > 10000 ? Math.log10(followers) * 0.15 : 0;
  const algorithmicFypViews = Math.round(((fypMin + fypMax) / 2) * (1 + credibilityBonus));

  const totalMin = Math.round(followerBaseViews * 0.8 + fypMin);
  const totalMax = Math.round(followerBaseViews * 1.2 + fypMax * (1 + credibilityBonus));

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${Math.round(num / 1000)}K`;
    return num.toLocaleString();
  };

  const totalViewsFormatted = `${formatNumber(totalMin)} – ${formatNumber(totalMax)} views`;
  const totalEstimatedViews = (totalMin + totalMax) / 2;
  const fypPercentage = totalEstimatedViews > 0 ? Math.min(99, Math.round((algorithmicFypViews / totalEstimatedViews) * 100)) : 95;

  // 3s Retention & Completion
  let threeSecRetention = 45;
  let completionRate = 22;
  let sharesToLikes = "1 : 45";

  if (tier === "Viral (Top 10%)") {
    threeSecRetention = Math.min(95, Math.round(80 + (finalScore - 72) * 0.6));
    completionRate = Math.min(82, Math.round(60 + (finalScore - 72) * 0.7));
    sharesToLikes = "1 : 8 (High viral coefficient)";
  } else if (tier === "High") {
    threeSecRetention = Math.round(66 + (finalScore - 54) * 0.6);
    completionRate = Math.round(42 + (finalScore - 54) * 0.8);
    sharesToLikes = "1 : 16";
  } else if (tier === "Medium") {
    threeSecRetention = Math.round(50 + (finalScore - 36) * 0.7);
    completionRate = Math.round(26 + (finalScore - 36) * 0.7);
    sharesToLikes = "1 : 38";
  } else {
    threeSecRetention = Math.max(18, Math.round(26 + finalScore * 0.5));
    completionRate = Math.max(8, Math.round(12 + finalScore * 0.4));
    sharesToLikes = "1 : 110";
  }

  // Parameters Summary for Executive Dashboard
  const scriptWords = inputs.script_text ? inputs.script_text.trim().split(/\s+/).length : 0;
  const parametersSummary = [
    { label: "Account Followers", value: `${formatNumber(followers)} (${followers.toLocaleString()})`, category: "Creator" as const },
    { label: "Target Platform", value: inputs.target_platform, category: "Creator" as const },
    { label: "Content Niche", value: inputs.content_niche, category: "Creator" as const },
    { label: "Video Duration", value: `${inputs.video_length} seconds`, category: "Production" as const },
    { label: "Opening Hook Style", value: inputs.hook_type, category: "Content" as const },
    { label: "Audio Selection", value: inputs.has_trending_audio === 1 ? `Trending (#${inputs.sound_popularity_index})` : "Original Audio", category: "Production" as const },
    { label: "Speech Cadence", value: `${inputs.speech_tempo_wpm} WPM`, category: "Production" as const },
    { label: "Visual Pacing", value: `${inputs.cut_frequency_per_min} cuts/min`, category: "Production" as const },
    { label: "Scheduled Upload", value: `${inputs.posting_hour}:00 on ${inputs.posting_day}`, category: "Schedule" as const },
    { label: "Script Length", value: scriptWords > 0 ? `${scriptWords} words (~${Math.round((scriptWords / 150) * 60)}s read)` : "No script text", category: "Content" as const },
  ];

  // Sort attributions by absolute impact magnitude
  attributions.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

  if (recommendations.length === 0) {
    recommendations.push("High alignment across all retention variables. Test two thumbnail variants to maximize initial click-through rate.");
  }

  return {
    score: finalScore,
    tier,
    confidence: probabilities[tier],
    probabilities,
    totalViewsFormatted,
    estimatedViews: totalViewsFormatted,
    followerBaseViews,
    algorithmicFypViews,
    fypPercentage,
    threeSecRetention,
    completionRate,
    sharesToLikesRatio: sharesToLikes,
    attributions,
    recommendations: recommendations.slice(0, 3),
    scriptAnalysis,
    parametersSummary,
  };
}
