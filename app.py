"""
📱 ReachCraft AI | Enterprise Short-Form Video Engagement & Viral Predictor
Advanced Streamlit Web Application (10,000 Records, 17 Multimodal Features).
Provides real-time engagement tier classification, SHAP-style attribution, and optimization guidance.
"""

import os
import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from src.utils import (
    load_trained_model,
    load_model_metadata,
    calculate_feature_attributions,
    get_tier_info,
    TIER_CONFIG,
)

# Page configuration
st.set_page_config(
    page_title="ReachCraft AI | Social Video Engagement Predictor",
    page_icon="📱",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Custom modern CSS
st.markdown(
    """
    <style>
    .main-header {
        font-size: 2.2rem;
        font-weight: 800;
        color: #f8fafc;
        margin-bottom: 0.2rem;
    }
    .sub-header {
        font-size: 1.0rem;
        color: #94a3b8;
        margin-bottom: 1.5rem;
    }
    .tier-card {
        padding: 1.5rem;
        border-radius: 16px;
        border-width: 2px;
        border-style: solid;
        margin-bottom: 1.5rem;
    }
    .metric-badge {
        padding: 0.5rem 1rem;
        border-radius: 10px;
        background: #1e293b;
        border: 1px solid #334155;
    }
    </style>
    """,
    unsafe_allow_html=True,
)


@st.cache_resource(show_spinner="Loading Enterprise ML Model...")
def get_model(model_path: str = "model.pkl"):
    if not os.path.exists(model_path):
        return None
    return load_trained_model(model_path)


def render_sidebar():
    st.sidebar.title("⚙️ Creative Studio")
    st.sidebar.markdown("Configure video attributes across 17 multimodal dimensions:")
    st.sidebar.markdown("---")

    # Hook & Platform
    hook_type = st.sidebar.selectbox(
        "Hook Style (0-3s)",
        options=[
            "Visual Shock",
            "Curiosity Gap",
            "Bold Statement",
            "Challenge/Dare",
            "Storytelling",
            "Question",
            "Listicle",
        ],
        index=0,
    )

    target_platform = st.sidebar.selectbox(
        "Platform",
        options=["TikTok", "Instagram Reels", "YouTube Shorts"],
        index=0,
    )

    content_niche = st.sidebar.selectbox(
        "Content Niche",
        options=[
            "Tech & AI",
            "Fitness & Wellness",
            "Comedy & Skits",
            "Finance & Business",
            "Lifestyle & Vlog",
            "Education & How-To",
            "Beauty & Fashion",
        ],
        index=2,
    )

    st.sidebar.markdown("---")
    st.sidebar.subheader("🎬 Pacing & Sound")

    video_length = st.sidebar.slider("Duration (seconds)", 5, 120, 24)
    speech_tempo_wpm = st.sidebar.slider("Speech Tempo (WPM)", 100, 220, 160)
    cut_frequency_per_min = st.sidebar.slider("Visual Cuts (cuts/min)", 2, 30, 16)
    visual_hook_score = st.sidebar.slider("Visual Hook Score (0-1)", 0.15, 0.99, 0.88, 0.01)

    has_trending_audio = st.sidebar.radio("Trending Sound", ["Active (1)", "Original (0)"], index=0)
    audio_val = 1 if "Active" in has_trending_audio else 0
    sound_popularity = 85
    if audio_val == 1:
        sound_popularity = st.sidebar.slider("Sound Velocity Index", 20, 100, 85)

    face_presence = st.sidebar.selectbox(
        "Face Presence",
        options=[(1, "Solo Host Face"), (2, "Duo / Collab"), (0, "Faceless B-Roll")],
        format_func=lambda x: x[1],
        index=0,
    )[0]

    st.sidebar.markdown("---")
    st.sidebar.subheader("📅 Timing & Copy")

    posting_hour = st.sidebar.slider("Posting Hour (24h)", 0, 23, 19)
    posting_day = st.sidebar.selectbox(
        "Posting Day",
        ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        index=4,
    )
    caption_length = st.sidebar.slider("Caption Words", 10, 350, 50)
    hashtag_count = st.sidebar.slider("Hashtag Count", 0, 16, 4)
    sentiment_score = st.sidebar.slider("Caption Polarity (-1 to +1)", -0.8, 0.9, 0.5, 0.05)

    st.sidebar.markdown("---")
    st.sidebar.subheader("👤 Creator Profile")
    follower_tier = st.sidebar.selectbox(
        "Follower Tier",
        ["Nano (<10K)", "Micro (10K-100K)", "Mid (100K-500K)", "Macro (500K-2M)", "Mega (2M+)"],
        index=1,
    )
    creator_avg_eng = st.sidebar.slider("Historical Engagement Rate (%)", 1.0, 16.0, 7.5, 0.1)
    resolution = st.sidebar.selectbox("Resolution", ["720p", "1080p", "4K"], index=1)

    return {
        "hook_type": hook_type,
        "target_platform": target_platform,
        "content_niche": content_niche,
        "video_length": video_length,
        "speech_tempo_wpm": speech_tempo_wpm,
        "cut_frequency_per_min": cut_frequency_per_min,
        "visual_hook_retention_score": visual_hook_score,
        "has_trending_audio": audio_val,
        "sound_popularity_index": sound_popularity,
        "face_presence": face_presence,
        "video_resolution_quality": resolution,
        "posting_hour": posting_hour,
        "posting_day": posting_day,
        "caption_length": caption_length,
        "hashtag_count": hashtag_count,
        "sentiment_score": sentiment_score,
        "creator_follower_tier": follower_tier,
        "creator_avg_engagement_rate": creator_avg_eng,
    }


def main():
    st.markdown('<div class="main-header">📱 ReachCraft AI | Video Engagement Predictor</div>', unsafe_allow_html=True)
    st.markdown(
        '<div class="sub-header">Trained on 10,000 multimodal short-form records across TikTok, Reels, and Shorts. '
        'Forecast reach, retention, and viral probability before publishing.</div>',
        unsafe_allow_html=True,
    )

    user_inputs = render_sidebar()
    model = get_model("model.pkl")

    if model is None:
        st.error("Model artifact (model.pkl) not found. Please run 'python src/train_model.py' first.")
        return

    # User Input Summary Pills
    c1, c2, c3, c4, c5 = st.columns(5)
    c1.metric("Hook", user_inputs["hook_type"])
    c2.metric("Platform", user_inputs["target_platform"])
    c3.metric("Runtime", f"{user_inputs['video_length']}s")
    c4.metric("Trending Sound", f"#{user_inputs['sound_popularity_index']}" if user_inputs["has_trending_audio"] == 1 else "None")
    c5.metric("Posting Time", f"{user_inputs['posting_hour']}:00 ({user_inputs['posting_day'][:3]})")

    st.markdown("---")

    input_df = pd.DataFrame([user_inputs])

    # Model Inference
    prediction = model.predict(input_df)[0]
    probabilities = model.predict_proba(input_df)[0]
    classes = list(model.classes_)
    prob_dict = dict(zip(classes, probabilities))

    tier_info = get_tier_info(prediction)
    conf = prob_dict.get(prediction, 0.0) * 100

    # Prediction Hero Card
    st.markdown(
        f"""
        <div class="tier-card" style="background-color: {tier_info['bg_color']}; border-color: {tier_info['border_color']};">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;">
                <div>
                    <span style="font-size: 2rem; margin-right: 0.5rem;">{tier_info['icon']}</span>
                    <span style="font-size: 1.6rem; font-weight: 800; color: {tier_info['border_color']};">
                        {prediction.upper()}
                    </span>
                    <div style="font-size: 0.95rem; color: #334155; margin-top: 0.3rem;">
                        <strong>Model Confidence:</strong> {conf:.1f}% &nbsp;|&nbsp; <strong>Expected Reach:</strong> {tier_info['benchmark']}
                    </div>
                </div>
            </div>
            <div style="margin-top: 0.8rem; padding-top: 0.8rem; border-top: 1px dashed {tier_info['border_color']}; color: #1e293b; font-size: 0.95rem;">
                <strong>Algorithmic Context:</strong> {tier_info['summary']}
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    # 2-Column Visualizations: Probabilities & Explainable AI
    col_left, col_right = st.columns([1, 1])

    with col_left:
        st.subheader("📊 Calibrated Tier Probabilities")
        tier_palette = {
            "Viral (Top 10%)": "#8b5cf6",
            "High": "#10b981",
            "Medium": "#f59e0b",
            "Low": "#ef4444",
        }
        ordered = ["Low", "Medium", "High", "Viral (Top 10%)"]
        chart_df = pd.DataFrame({
            "Tier": ordered,
            "Probability (%)": [prob_dict.get(t, 0.0) * 100 for t in ordered],
        })

        fig_prob = px.bar(
            chart_df,
            x="Tier",
            y="Probability (%)",
            text="Probability (%)",
            color="Tier",
            color_discrete_map=tier_palette,
        )
        fig_prob.update_traces(texttemplate="%{text:.1f}%", textposition="outside")
        fig_prob.update_layout(yaxis=dict(range=[0, 105]), showlegend=False, height=350)
        st.plotly_chart(fig_prob, use_container_width=True)

    with col_right:
        st.subheader("🔍 Explainable AI (XAI) Feature Drivers")
        attributions = calculate_feature_attributions(user_inputs)
        top_attrs = attributions[:6]

        attr_df = pd.DataFrame(top_attrs)
        attr_df["color"] = attr_df["direction"].apply(lambda d: "#10b981" if d == "positive" else "#ef4444")

        fig_xai = px.bar(
            attr_df,
            x="impact",
            y="feature",
            orientation="h",
            color="direction",
            color_discrete_map={"positive": "#10b981", "negative": "#ef4444"},
            labels={"impact": "Score Impact (Points)", "feature": ""},
        )
        fig_xai.update_layout(showlegend=False, height=350, margin=dict(l=10, r=10, t=20, b=20))
        st.plotly_chart(fig_xai, use_container_width=True)


if __name__ == "__main__":
    main()
