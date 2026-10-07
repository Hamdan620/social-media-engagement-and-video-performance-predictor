import { NextRequest, NextResponse } from "next/server";
import { predictEngagement } from "@/lib/modelEngine";
import { VideoInputs } from "@/lib/types";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const startTime = performance.now();
  try {
    const body = await req.json();

    const inputs: VideoInputs = {
      follower_count: Number(body.follower_count ?? 10000),
      target_platform: body.target_platform || "TikTok",
      content_niche: body.content_niche || "Tech & AI",
      creator_avg_engagement_rate: Number(body.creator_avg_engagement_rate ?? 5.5),
      hook_type: body.hook_type || "Curiosity Gap",
      video_length: Number(body.video_length ?? 24),
      speech_tempo_wpm: Number(body.speech_tempo_wpm ?? 155),
      cut_frequency_per_min: Number(body.cut_frequency_per_min ?? 16),
      has_trending_audio: Number(body.has_trending_audio ?? 1),
      sound_popularity_index: Number(body.sound_popularity_index ?? 85),
      face_presence: Number(body.face_presence ?? 1),
      video_resolution_quality: body.video_resolution_quality || "1080p",
      posting_hour: Number(body.posting_hour ?? 19),
      posting_day: body.posting_day || "Friday",
      caption_length: Number(body.caption_length ?? 45),
      hashtag_count: Number(body.hashtag_count ?? 4),
      script_text: body.script_text || "",
    };

    const prediction = predictEngagement(inputs);
    const latencyMs = Math.round((performance.now() - startTime) * 100) / 100;

    return NextResponse.json({
      success: true,
      meta: {
        latencyMs,
        engine: "Random Forest Multi-Variable Inference",
        datasetScale: "10,000 Vectors",
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
