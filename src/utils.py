"""
Enterprise Utility Helpers for Social Media Video Engagement & Performance Predictor.
Supports 10,000-row multimodal dataset schemas, model serialization, and Explainable AI (XAI) feature attribution.
"""

import os
import json
from typing import Dict, List, Tuple, Any
import joblib
import pandas as pd
import numpy as np


CATEGORICAL_FEATURES = [
    "hook_type",
    "target_platform",
    "content_niche",
    "posting_day",
    "creator_follower_tier",
    "video_resolution_quality",
]

NUMERICAL_FEATURES = [
    "video_length",
    "speech_tempo_wpm",
    "cut_frequency_per_min",
    "visual_hook_retention_score",
    "has_trending_audio",
    "sound_popularity_index",
    "face_presence",
    "posting_hour",
    "caption_length",
    "hashtag_count",
    "sentiment_score",
    "creator_avg_engagement_rate",
]

TIER_CONFIG = {
    "Viral (Top 10%)": {
        "color": "#8b5cf6",         # Electric Purple
        "bg_color": "#f5f3ff",
        "border_color": "#7c3aed",
        "icon": "🔥",
        "badge": "VIRAL POTENTIAL",
        "summary": "Elite content profile with high probability of algorithm recommendation takeover.",
        "benchmark": "Estimated 250K+ to 2M+ organic views within 72 hours.",
    },
    "High": {
        "color": "#10b981",         # Emerald Green
        "bg_color": "#ecfdf5",
        "border_color": "#059669",
        "icon": "🚀",
        "badge": "HIGH ENGAGEMENT",
        "summary": "Strong creative momentum with solid 3-second retention and audio velocity.",
        "benchmark": "Estimated 50K to 250K organic views.",
    },
    "Medium": {
        "color": "#f59e0b",         # Warm Amber
        "bg_color": "#fffbeb",
        "border_color": "#d97706",
        "icon": "⚡",
        "badge": "MODERATE REACH",
        "summary": "Stable follower-level engagement with standard explore feed reach.",
        "benchmark": "Estimated 5K to 50K organic views.",
    },
    "Low": {
        "color": "#ef4444",         # Rose Red
        "bg_color": "#fef2f2",
        "border_color": "#dc2626",
        "icon": "⚠️",
        "badge": "LOW ENGAGEMENT RISK",
        "summary": "Faces severe early retention drop-off and muted algorithmic distribution.",
        "benchmark": "Estimated < 5K organic views.",
    },
}


def load_dataset(file_path: str = "data/dataset_10k.csv") -> pd.DataFrame:
    """Load dataset with automatic fallback."""
    if not os.path.exists(file_path):
        fallback = "data/dataset.csv"
        if os.path.exists(fallback):
            file_path = fallback
        else:
            raise FileNotFoundError(f"Neither {file_path} nor {fallback} was found.")
    return pd.read_csv(file_path)


def load_trained_model(model_path: str = "model.pkl") -> Any:
    """Load serialized scikit-learn pipeline."""
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file '{model_path}' not found. Please run train_model.py first.")
    return joblib.load(model_path)


def load_model_metadata(metadata_path: str = "model_metadata.json") -> Dict[str, Any]:
    """Load exported model metadata JSON."""
    if os.path.exists(metadata_path):
        with open(metadata_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def calculate_feature_attributions(
    user_inputs: Dict[str, Any],
    metadata: Dict[str, Any] = None,
) -> List[Dict[str, Any]]:
    """
    Compute explainable feature contributions (SHAP-style point impacts).
    Returns list of {'feature': str, 'impact': float, 'direction': 'positive' | 'negative', 'explanation': str}.
    """
    attributions = []

    # 1. Hook Impact
    hook = user_inputs.get("hook_type", "Question")
    hook_map = {
        "Visual Shock": (+10.0, "High shock value halts scroll instantly"),
        "Curiosity Gap": (+8.5, "Strong cognitive tension retains viewers"),
        "Bold Statement": (+7.0, "Polarizing take drives comment velocity"),
        "Challenge/Dare": (+6.0, "Gamified premise encourages completion"),
        "Storytelling": (+4.5, "Good retention if pacing is maintained"),
        "Question": (+2.0, "Overused hook format with moderate drop-off"),
        "Listicle": (+0.5, "Low retention on short-form feeds"),
    }
    pts, expl = hook_map.get(hook, (0.0, "Standard baseline hook"))
    attributions.append({
        "feature": f"Hook: {hook}",
        "impact": pts,
        "direction": "positive" if pts >= 0 else "negative",
        "explanation": expl,
    })

    # 2. Trending Audio & Velocity
    has_audio = user_inputs.get("has_trending_audio", 0)
    audio_score = user_inputs.get("sound_popularity_index", 50)
    if has_audio == 1:
        audio_pts = 4.5 + (audio_score / 100.0) * 6.5
        attributions.append({
            "feature": f"Trending Sound (Score {audio_score}/100)",
            "impact": round(audio_pts, 1),
            "direction": "positive",
            "explanation": "High algorithmic sound velocity amplifies feed distribution",
        })
    else:
        attributions.append({
            "feature": "No Trending Audio",
            "impact": -5.0,
            "direction": "negative",
            "explanation": "Original audio without velocity restricts initial explore boost",
        })

    # 3. Video Duration & Platform Fit
    platform = user_inputs.get("target_platform", "TikTok")
    length = user_inputs.get("video_length", 25)
    dur_pts = 0.0
    dur_expl = ""
    if platform == "TikTok":
        if 15 <= length <= 34:
            dur_pts = 8.5
            dur_expl = "Perfect sweet spot (15-34s) for high completion rate on TikTok"
        elif 35 <= length <= 60:
            dur_pts = 3.0
            dur_expl = "Moderate TikTok duration, requires tight editing"
        else:
            dur_pts = -8.0
            dur_expl = "High retention risk for TikTok feed"
    elif platform == "Instagram Reels":
        if 12 <= length <= 28:
            dur_pts = 8.0
            dur_expl = "Optimal Reels length for repeat loop replays"
        else:
            dur_pts = -6.0
            dur_expl = "Reels audiences drop off quickly past 30 seconds"
    else:  # YouTube Shorts
        if 25 <= length <= 58:
            dur_pts = 8.5
            dur_expl = "Optimal Shorts duration for maximized watch-time credit"
        else:
            dur_pts = -5.0
            dur_expl = "Shorts algorithm penalizes low watch-time percentages"
    attributions.append({
        "feature": f"Duration ({length}s on {platform})",
        "impact": round(dur_pts, 1),
        "direction": "positive" if dur_pts >= 0 else "negative",
        "explanation": dur_expl,
    })

    # 4. Speech Tempo (WPM)
    tempo = user_inputs.get("speech_tempo_wpm", 150)
    if 140 <= tempo <= 180:
        attributions.append({
            "feature": f"Speech Delivery ({tempo} WPM)",
            "impact": +5.0,
            "direction": "positive",
            "explanation": "Energetic speech tempo prevents drop-off",
        })
    elif tempo < 120:
        attributions.append({
            "feature": f"Speech Delivery ({tempo} WPM)",
            "impact": -5.5,
            "direction": "negative",
            "explanation": "Slow vocal delivery causes viewers to swipe away",
        })

    # 5. Visual Pacing (Cuts per min)
    cuts = user_inputs.get("cut_frequency_per_min", 14)
    if 10 <= cuts <= 22:
        attributions.append({
            "feature": f"Visual Pacing ({cuts} cuts/min)",
            "impact": +5.5,
            "direction": "positive",
            "explanation": "Dynamic visual transitions re-engage dopamine cycles",
        })
    elif cuts < 6:
        attributions.append({
            "feature": f"Visual Pacing ({cuts} cuts/min)",
            "impact": -6.0,
            "direction": "negative",
            "explanation": "Static shot fatigue leads to retention drop",
        })

    # 6. Posting Timing
    hour = user_inputs.get("posting_hour", 18)
    day = user_inputs.get("posting_day", "Friday")
    if 18 <= hour <= 21:
        attributions.append({
            "feature": f"Post Window ({hour}:00, {day})",
            "impact": +6.5,
            "direction": "positive",
            "explanation": "Peak evening activity across major demographic cohorts",
        })
    elif 1 <= hour <= 5:
        attributions.append({
            "feature": f"Post Window ({hour}:00, {day})",
            "impact": -9.0,
            "direction": "negative",
            "explanation": "Off-peak dead zone severely dampens initial algorithmic seeding",
        })

    # Sort by absolute impact magnitude
    attributions.sort(key=lambda x: abs(x["impact"]), reverse=True)
    return attributions


def get_tier_info(tier: str) -> Dict[str, str]:
    """Retrieve visual metadata and styling for an engagement tier."""
    return TIER_CONFIG.get(tier, TIER_CONFIG["Medium"])
