import { VideoInputs } from "./types";

export interface PresetScenario {
  id: string;
  name: string;
  badge: string;
  description: string;
  inputs: VideoInputs;
}

export const PRESETS: PresetScenario[] = [
  {
    id: "growth-creator-viral",
    name: "Tech / AI Explainer (Breakout Viral)",
    badge: "High FYP Multiplier",
    description: "Curiosity gap opening, tight 24s runtime, fast speech tempo, and high audio velocity.",
    inputs: {
      follower_count: 5000,
      target_platform: "TikTok",
      content_niche: "Tech & AI",
      creator_avg_engagement_rate: 7.2,
      hook_type: "Curiosity Gap",
      video_length: 24,
      speech_tempo_wpm: 160,
      cut_frequency_per_min: 16,
      has_trending_audio: 1,
      sound_popularity_index: 88,
      face_presence: 1,
      video_resolution_quality: "1080p",
      posting_hour: 19,
      posting_day: "Friday",
      caption_length: 50,
      hashtag_count: 4,
      script_text:
        "The real reason big tech is hiding this new AI tool is not what you think. While everyone is still using ChatGPT for basic writing, researchers just released an open-source model that automates entire 8-hour coding projects in 30 seconds. I tested it yesterday on a full database schema and it didn't make a single error. Drop a comment below if you want the download link and let me know: is this replacing entry-level developers?",
    },
  },
  {
    id: "zero-follower-first-post",
    name: "Zero Follower Test Account (Viral Hook)",
    badge: "Fresh Account Test",
    description: "Simulates brand new 0-follower creator testing the algorithm's merit-based explore distribution.",
    inputs: {
      follower_count: 0,
      target_platform: "TikTok",
      content_niche: "Comedy & Skits",
      creator_avg_engagement_rate: 5.0,
      hook_type: "Visual Shock",
      video_length: 18,
      speech_tempo_wpm: 165,
      cut_frequency_per_min: 18,
      has_trending_audio: 1,
      sound_popularity_index: 94,
      face_presence: 2,
      video_resolution_quality: "1080p",
      posting_hour: 20,
      posting_day: "Saturday",
      caption_length: 35,
      hashtag_count: 4,
      script_text:
        "Never do this when ordering coffee unless you want everyone staring at you. My friend tried ordering an iced espresso with 6 pumps of caramel and the barista looked like their brain short-circuited. Have you ever seen someone order something this unhinged?",
    },
  },
  {
    id: "macro-creator-standard",
    name: "Established Creator (100K Followers)",
    badge: "High Follower Floor",
    description: "Established account with reliable follower floor but moderate algorithmic explore reach.",
    inputs: {
      follower_count: 100000,
      target_platform: "Instagram Reels",
      content_niche: "Finance & Business",
      creator_avg_engagement_rate: 4.8,
      hook_type: "Bold Statement",
      video_length: 32,
      speech_tempo_wpm: 150,
      cut_frequency_per_min: 12,
      has_trending_audio: 0,
      sound_popularity_index: 20,
      face_presence: 1,
      video_resolution_quality: "4K",
      posting_hour: 13,
      posting_day: "Wednesday",
      caption_length: 80,
      hashtag_count: 3,
      script_text:
        "Most people saving money in a traditional bank account are losing 4% of their purchasing power every year due to inflation. Here are 3 alternative cash-preservation accounts that pay 5% interest completely risk-free. Save this video so you can reference these accounts before your next paycheck.",
    },
  },
  {
    id: "weak-cliche-dropoff",
    name: "Low-Performing Upload (Cliché Opening)",
    badge: "Retention Drop Risk",
    description: "Demonstrates how slow conversational preamble and dragging duration suppress reach.",
    inputs: {
      follower_count: 2500,
      target_platform: "TikTok",
      content_niche: "Lifestyle & Vlog",
      creator_avg_engagement_rate: 2.1,
      hook_type: "Question",
      video_length: 88,
      speech_tempo_wpm: 110,
      cut_frequency_per_min: 4,
      has_trending_audio: 0,
      sound_popularity_index: 10,
      face_presence: 0,
      video_resolution_quality: "720p",
      posting_hour: 3,
      posting_day: "Tuesday",
      caption_length: 220,
      hashtag_count: 14,
      script_text:
        "Hey guys, welcome back to my channel! So basically today in this video I wanted to talk about a few things that have been on my mind lately regarding my morning routine. I know it's been a while since I posted so I wanted to catch up...",
    },
  },
];
