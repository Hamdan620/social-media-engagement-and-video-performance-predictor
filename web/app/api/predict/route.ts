import { NextRequest, NextResponse } from "next/server";
import { predictEngagement } from "@/lib/modelEngine";
import { VideoInputs } from "@/lib/types";

export const runtime = "edge"; // Run on Vercel's global edge network for sub-10ms response times

export async function POST(req: NextRequest) {
  const startTime = performance.now();
  try {
    const body = await req.json();

    // Default fallback inputs if partial data provided
    const inputs: VideoInputs = {
      hook_type: body.hook_type || "Visual Shock",
      target_platform: body.target_platform || "TikTok",
      content_niche: body.content_niche || "Comedy & Skits",
      video_length: Number(body.video_length ?? 24),
      speech_tempo_wpm: Number(body.speech_tempo_wpm ?? 155),
      cut_frequency_per_min: Number(body.cut_frequency_per_min ?? 16),
      visual_hook_retention_score: Number(body.visual_hook_retention_score ?? 0.85),
      has_trending_audio: Number(body.has_trending_audio ?? 1),
      sound_popularity_index: Number(body.sound_popularity_index ?? 85),
      face_presence: Number(body.face_presence ?? 1),
      video_resolution_quality: body.video_resolution_quality || "1080p",
      posting_hour: Number(body.posting_hour ?? 19),
      posting_day: body.posting_day || "Friday",
      caption_length: Number(body.caption_length ?? 45),
      hashtag_count: Number(body.hashtag_count ?? 4),
      sentiment_score: Number(body.sentiment_score ?? 0.5),
      creator_follower_tier: body.creator_follower_tier || "Micro (10K-100K)",
      creator_avg_engagement_rate: Number(body.creator_avg_engagement_rate ?? 7.5),
    };

    const prediction = predictEngagement(inputs);
    const latencyMs = Math.round((performance.now() - startTime) * 100) / 100;

    return NextResponse.json({
      success: true,
      meta: {
        latencyMs,
        engine: "Vercel Serverless Edge Ensemble",
        trainedOnRecords: 10000,
        modelVersion: "2.0-enterprise",
      },
      data: prediction,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Invalid prediction payload",
      },
      { status: 400 }
    );
  }
}
