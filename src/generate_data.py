"""
Enterprise-Grade Synthetic Data Generation Pipeline (10,000+ Records).
Generates 17 multimodal features representing short-form video dynamics (TikTok, Reels, Shorts)
with non-linear algorithmic synergy, interaction terms, and probabilistic engagement tiers.
"""

import os
import argparse
import json
from typing import Dict, List, Tuple
import numpy as np
import pandas as pd


HOOK_TYPES = [
    "Visual Shock",
    "Bold Statement",
    "Question",
    "Storytelling",
    "Listicle",
    "Challenge/Dare",
    "Curiosity Gap",
]

PLATFORMS = ["TikTok", "Instagram Reels", "YouTube Shorts"]

CONTENT_NICHES = [
    "Tech & AI",
    "Fitness & Wellness",
    "Comedy & Skits",
    "Finance & Business",
    "Lifestyle & Vlog",
    "Education & How-To",
    "Beauty & Fashion",
]

DAYS_OF_WEEK = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]

FOLLOWER_TIERS = [
    "Nano (<10K)",
    "Micro (10K-100K)",
    "Mid (100K-500K)",
    "Macro (500K-2M)",
    "Mega (2M+)",
]

RESOLUTIONS = ["720p", "1080p", "4K"]

TIERS = ["Low", "Medium", "High", "Viral (Top 10%)"]


def calculate_advanced_engagement(
    hook_type: str,
    target_platform: str,
    content_niche: str,
    video_length: int,
    speech_tempo_wpm: int,
    cut_frequency_per_min: int,
    visual_hook_retention_score: float,
    has_trending_audio: int,
    sound_popularity_index: int,
    face_presence: int,
    video_resolution_quality: str,
    posting_hour: int,
    posting_day: str,
    caption_length: int,
    hashtag_count: int,
    sentiment_score: float,
    creator_follower_tier: str,
    creator_avg_engagement_rate: float,
    rng: np.random.Generator,
) -> Tuple[float, str, Dict[str, float]]:
    """
    Compute non-linear engagement score (0-100) using empirical short-form video heuristics.
    Returns (engagement_score, engagement_tier, feature_contributions).
    """
    # Base score centered around 32 so average video lands ~50
    base_score = 30.0
    contributions = {}

    # 1. Hook Impact (Retention halting power)
    hook_weights = {
        "Visual Shock": 10.0,
        "Curiosity Gap": 8.5,
        "Bold Statement": 7.0,
        "Challenge/Dare": 6.0,
        "Storytelling": 4.5,
        "Question": 2.0,
        "Listicle": 0.5,
    }
    hook_val = hook_weights.get(hook_type, 3.0)
    contributions["hook_impact"] = hook_val
    base_score += hook_val

    # 2. Visual Hook Retention Score (0.0 to 1.0 motion/zoom metric)
    visual_hook_val = (visual_hook_retention_score - 0.5) * 14.0
    contributions["visual_hook"] = visual_hook_val
    base_score += visual_hook_val

    # 3. Video Duration & Platform Sweet Spot
    dur_val = 0.0
    if target_platform == "TikTok":
        if 15 <= video_length <= 34:
            dur_val = 8.5
        elif 35 <= video_length <= 60:
            dur_val = 3.0
        elif video_length < 15:
            dur_val = 1.0
        else:
            dur_val = -8.0
    elif target_platform == "Instagram Reels":
        if 12 <= video_length <= 28:
            dur_val = 8.0
        elif 29 <= video_length <= 50:
            dur_val = 2.5
        else:
            dur_val = -7.0
    else:  # YouTube Shorts
        if 25 <= video_length <= 58:
            dur_val = 8.5
        elif 10 <= video_length < 25:
            dur_val = 2.0
        else:
            dur_val = -6.5
    contributions["duration_affinity"] = dur_val
    base_score += dur_val

    # 4. Audio Velocity & Trending Score
    audio_val = 0.0
    if has_trending_audio == 1:
        audio_val += 4.5
        audio_val += (sound_popularity_index / 100.0) * 6.5
    else:
        audio_val -= 5.0
    contributions["audio_boost"] = audio_val
    base_score += audio_val

    # 5. Speech Tempo & Pacing (Words Per Minute & Visual Cuts)
    tempo_val = 0.0
    if 140 <= speech_tempo_wpm <= 180:
        tempo_val += 5.0  # Crisp, energetic delivery
    elif speech_tempo_wpm < 120:
        tempo_val -= 5.5  # Dragging, viewer drops
    elif speech_tempo_wpm > 200:
        tempo_val -= 3.5  # Too fast, hard to comprehend

    pacing_val = 0.0
    if 10 <= cut_frequency_per_min <= 22:
        pacing_val += 5.5  # Dynamic visual retention
    elif cut_frequency_per_min < 6:
        pacing_val -= 6.0  # Static visual fatigue
    elif cut_frequency_per_min > 25:
        pacing_val -= 2.5  # Overwhelming visual chaos

    contributions["speech_tempo"] = tempo_val
    contributions["visual_pacing"] = pacing_val
    base_score += (tempo_val + pacing_val)

    # 6. Face Presence & Trust Factor
    face_val = 0.0
    if face_presence == 1:
        face_val = 3.5  # Authentic creator face-to-camera
    elif face_presence == 2:
        face_val = 4.0  # Dynamic duo / collab / reaction
    else:
        face_val = -3.5  # Faceless B-roll
    contributions["face_presence"] = face_val
    base_score += face_val

    # 7. Posting Timing (Hour & Day)
    timing_val = 0.0
    if 18 <= posting_hour <= 21:
        timing_val += 5.5  # Evening prime leisure window
    elif 12 <= posting_hour <= 14:
        timing_val += 3.5  # Lunch break
    elif 7 <= posting_hour <= 9:
        timing_val += 2.0  # Morning commute
    elif 1 <= posting_hour <= 5:
        timing_val -= 9.0  # Dead zone

    if posting_day in ["Thursday", "Friday", "Saturday", "Sunday"]:
        timing_val += 2.5
    contributions["timing_optimization"] = timing_val
    base_score += timing_val

    # 8. Copywriting & Hashtags
    copy_val = 0.0
    if 30 <= caption_length <= 90:
        copy_val += 3.0
    elif caption_length > 250:
        copy_val -= 3.5

    if 3 <= hashtag_count <= 6:
        copy_val += 3.0  # Targeted algorithmic taxonomy
    elif hashtag_count > 12:
        copy_val -= 5.5  # Flagged as hashtag spam
    elif hashtag_count == 0:
        copy_val -= 2.5

    contributions["copywriting"] = copy_val
    base_score += copy_val

    # 9. Sentiment Polarity
    sentiment_val = 0.0
    if sentiment_score > 0.4:
        sentiment_val = 2.5
    elif sentiment_score < -0.4:
        sentiment_val = 1.5
    else:
        sentiment_val = 0.0
    contributions["sentiment"] = sentiment_val
    base_score += sentiment_val

    # 10. Creator Baseline Engagement Influence
    creator_val = (creator_avg_engagement_rate - 5.5) * 1.4
    contributions["creator_baseline"] = creator_val
    base_score += creator_val

    # 11. Multi-feature Non-linear Synergies
    synergy_val = 0.0
    if (
        hook_type in ["Visual Shock", "Curiosity Gap"]
        and visual_hook_retention_score >= 0.75
        and has_trending_audio == 1
        and cut_frequency_per_min >= 12
    ):
        synergy_val += 9.5

    if content_niche == "Comedy & Skits" and face_presence >= 1 and (12 <= video_length <= 35):
        synergy_val += 5.5

    if (
        content_niche in ["Tech & AI", "Education & How-To"]
        and 145 <= speech_tempo_wpm <= 175
        and (25 <= video_length <= 60)
    ):
        synergy_val += 5.0

    if face_presence == 0 and (1 <= posting_hour <= 5) and has_trending_audio == 0:
        synergy_val -= 11.0

    contributions["synergy_multiplier"] = synergy_val
    base_score += synergy_val

    # Add organic variance
    noise = rng.normal(0.0, 4.0)
    final_score = np.clip(base_score + noise, 2.0, 99.0)

    # Clean 4-tier calibration:
    # Viral: Top ~11% (>= 72.0)
    # High: ~32% (54.0 <= score < 72.0)
    # Medium: ~38% (36.0 <= score < 54.0)
    # Low: ~19% (< 36.0)
    if final_score >= 72.0:
        tier = "Viral (Top 10%)"
    elif final_score >= 54.0:
        tier = "High"
    elif final_score >= 36.0:
        tier = "Medium"
    else:
        tier = "Low"

    return float(final_score), tier, contributions


def generate_enterprise_dataset(
    n_samples: int = 10000,
    random_seed: int = 42,
) -> pd.DataFrame:
    """
    Synthesize 10,000+ realistic video records across all 17 feature dimensions.
    """
    rng = np.random.default_rng(random_seed)

    hook_choices = rng.choice(
        HOOK_TYPES,
        size=n_samples,
        p=[0.20, 0.18, 0.16, 0.14, 0.12, 0.10, 0.10],
    )
    platforms = rng.choice(PLATFORMS, size=n_samples, p=[0.45, 0.35, 0.20])
    niches = rng.choice(
        CONTENT_NICHES,
        size=n_samples,
        p=[0.18, 0.16, 0.17, 0.14, 0.13, 0.12, 0.10],
    )
    video_lengths = rng.integers(5, 121, size=n_samples)
    speech_tempos = rng.integers(100, 221, size=n_samples)
    cut_frequencies = rng.integers(3, 31, size=n_samples)
    visual_hook_scores = np.round(rng.uniform(0.15, 0.98, size=n_samples), 2)
    trending_audio = rng.choice([0, 1], size=n_samples, p=[0.42, 0.58])
    sound_popularity = np.where(
        trending_audio == 1,
        rng.integers(45, 100, size=n_samples),
        rng.integers(5, 45, size=n_samples),
    )
    face_presence = rng.choice([0, 1, 2], size=n_samples, p=[0.25, 0.55, 0.20])
    resolutions = rng.choice(RESOLUTIONS, size=n_samples, p=[0.10, 0.65, 0.25])
    posting_hours = rng.integers(0, 24, size=n_samples)
    posting_days = rng.choice(DAYS_OF_WEEK, size=n_samples)
    caption_lengths = rng.integers(10, 381, size=n_samples)
    hashtag_counts = rng.integers(0, 18, size=n_samples)
    sentiment_scores = np.round(rng.uniform(-0.85, 0.95, size=n_samples), 2)
    follower_tiers = rng.choice(
        FOLLOWER_TIERS,
        size=n_samples,
        p=[0.38, 0.32, 0.18, 0.09, 0.03],
    )
    avg_engagements = np.round(rng.uniform(1.2, 16.5, size=n_samples), 2)

    final_scores = []
    engagement_tiers = []

    for i in range(n_samples):
        score, tier, _ = calculate_advanced_engagement(
            hook_type=hook_choices[i],
            target_platform=platforms[i],
            content_niche=niches[i],
            video_length=int(video_lengths[i]),
            speech_tempo_wpm=int(speech_tempos[i]),
            cut_frequency_per_min=int(cut_frequencies[i]),
            visual_hook_retention_score=float(visual_hook_scores[i]),
            has_trending_audio=int(trending_audio[i]),
            sound_popularity_index=int(sound_popularity[i]),
            face_presence=int(face_presence[i]),
            video_resolution_quality=resolutions[i],
            posting_hour=int(posting_hours[i]),
            posting_day=posting_days[i],
            caption_length=int(caption_lengths[i]),
            hashtag_count=int(hashtag_counts[i]),
            sentiment_score=float(sentiment_scores[i]),
            creator_follower_tier=follower_tiers[i],
            creator_avg_engagement_rate=float(avg_engagements[i]),
            rng=rng,
        )
        final_scores.append(round(score, 2))
        engagement_tiers.append(tier)

    df = pd.DataFrame({
        "hook_type": hook_choices,
        "target_platform": platforms,
        "content_niche": niches,
        "video_length": video_lengths,
        "speech_tempo_wpm": speech_tempos,
        "cut_frequency_per_min": cut_frequencies,
        "visual_hook_retention_score": visual_hook_scores,
        "has_trending_audio": trending_audio,
        "sound_popularity_index": sound_popularity,
        "face_presence": face_presence,
        "video_resolution_quality": resolutions,
        "posting_hour": posting_hours,
        "posting_day": posting_days,
        "caption_length": caption_lengths,
        "hashtag_count": hashtag_counts,
        "sentiment_score": sentiment_scores,
        "creator_follower_tier": follower_tiers,
        "creator_avg_engagement_rate": avg_engagements,
        "engagement_score": final_scores,
        "engagement_tier": engagement_tiers,
    })

    return df


def main():
    parser = argparse.ArgumentParser(
        description="Generate enterprise-grade 10,000+ short-form video dataset."
    )
    parser.add_argument(
        "--rows",
        type=int,
        default=10000,
        help="Number of records to generate (default: 10000)",
    )
    parser.add_argument(
        "--output",
        type=str,
        default="data/dataset_10k.csv",
        help="Target CSV path (default: data/dataset_10k.csv)",
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=42,
        help="Random seed (default: 42)",
    )
    args = parser.parse_args()

    os.makedirs(os.path.dirname(args.output) or ".", exist_ok=True)
    print(f"[*] Generating {args.rows} enterprise records across 17 features (seed={args.seed})...")

    df = generate_enterprise_dataset(n_samples=args.rows, random_seed=args.seed)
    df.to_csv(args.output, index=False)
    # Also save primary copy to data/dataset.csv for backward compatibility
    df.to_csv("data/dataset.csv", index=False)

    print(f"[+] Dataset saved to {args.output} and data/dataset.csv")
    print(f"Shape: {df.shape}")
    print("\nTarget Class Distribution:")
    print(df["engagement_tier"].value_counts(normalize=True).round(4) * 100)
    print("\nEngagement Score Statistics (0-100):")
    print(df["engagement_score"].describe().round(2))

    # Save summary metadata JSON for web dashboard
    summary_path = "data/dataset_summary.json"
    summary_data = {
        "total_records": len(df),
        "features_count": len(df.columns) - 2,
        "tier_distribution": df["engagement_tier"].value_counts().to_dict(),
        "niche_distribution": df["content_niche"].value_counts().to_dict(),
        "platform_distribution": df["target_platform"].value_counts().to_dict(),
        "hook_distribution": df["hook_type"].value_counts().to_dict(),
        "mean_engagement_score": round(float(df["engagement_score"].mean()), 2),
        "median_engagement_score": round(float(df["engagement_score"].median()), 2),
    }
    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump(summary_data, f, indent=2)
    print(f"[+] Dataset summary metadata written to: {summary_path}")


if __name__ == "__main__":
    main()
