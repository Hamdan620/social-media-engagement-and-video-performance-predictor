export type HookType =
  | "Visual Shock"
  | "Bold Statement"
  | "Question"
  | "Storytelling"
  | "Listicle"
  | "Challenge/Dare"
  | "Curiosity Gap";

export type PlatformType = "TikTok" | "Instagram Reels" | "YouTube Shorts";

export type NicheType =
  | "Tech & AI"
  | "Fitness & Wellness"
  | "Comedy & Skits"
  | "Finance & Business"
  | "Lifestyle & Vlog"
  | "Education & How-To"
  | "Beauty & Fashion";

export type VideoResolution = "720p" | "1080p" | "4K";

export type EngagementTier = "Low" | "Medium" | "High" | "Viral (Top 10%)";

export interface ScriptAnalysis {
  hook: {
    text: string;
    score: number; // 0 - 100
    detectedStyle: string;
    critique: string;
    rewrites: string[];
    isCliche: boolean;
  };
  body: {
    wordCount: number;
    estimatedDurationSec: number;
    speakingWpm: number;
    score: number; // 0 - 100
    critique: string;
    pacingAdvice: string;
  };
  cta: {
    text: string;
    score: number; // 0 - 100
    ctaType: string;
    critique: string;
    suggestedCta: string[];
  };
  overallScriptScore: number; // 0 - 100
}

export interface VideoInputs {
  // Creator Profile
  follower_count: number; // 0 to 1,000,000+
  target_platform: PlatformType;
  content_niche: NicheType;
  creator_avg_engagement_rate: number;

  // Video Production & Creative
  hook_type: HookType;
  video_length: number; // seconds
  speech_tempo_wpm: number;
  cut_frequency_per_min: number;
  has_trending_audio: number;
  sound_popularity_index: number;
  face_presence: number; // 0 = Faceless, 1 = Solo, 2 = Collab
  video_resolution_quality: VideoResolution;

  // Timing & Metadata
  posting_hour: number; // 0 - 23
  posting_day: string;
  caption_length: number;
  hashtag_count: number;

  // Script text
  script_text: string;
}

export interface FeatureImpact {
  feature: string;
  impact: number;
  direction: "positive" | "negative";
  explanation: string;
}

export interface PredictionResult {
  score: number; // 0 - 100
  tier: EngagementTier;
  confidence: number;
  probabilities: Record<EngagementTier, number>;

  // Dual-channel view projections
  totalViewsFormatted: string;
  estimatedViews: string;
  followerBaseViews: number;
  algorithmicFypViews: number;
  fypPercentage: number;

  // Retention & engagement rates
  threeSecRetention: number; // %
  completionRate: number; // %
  sharesToLikesRatio: string;

  // Explainability & suggestions
  attributions: FeatureImpact[];
  recommendations: string[];

  // Script analysis (if provided)
  scriptAnalysis?: ScriptAnalysis;

  // Clean parameters summary for executive dashboard
  parametersSummary: {
    label: string;
    value: string;
    category: "Creator" | "Content" | "Production" | "Schedule";
  }[];
}
