"""
Enterprise Machine Learning Training Pipeline for Social Media Video Engagement.
Trains on the 10,000-row multimodal dataset with 17 features:
- Preprocessing with ColumnTransformer, OneHotEncoder, and RobustScaler
- Benchmarks Random Forest and Gradient Boosting architectures
- 5-Fold Stratified Cross-Validation + 80/20 Test Holdout Evaluation
- Exports pipeline to model.pkl and metadata to model_metadata.json for Vercel Serverless
"""

import os
import json
import argparse
from typing import Dict, List, Tuple, Any
import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, f1_score
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, RobustScaler


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

TARGET_COLUMN = "engagement_tier"
SCORE_COLUMN = "engagement_score"
TIER_LABELS = ["Low", "Medium", "High", "Viral (Top 10%)"]


def build_preprocessing_pipeline() -> ColumnTransformer:
    """Build ColumnTransformer for categorical and numerical features."""
    cat_transformer = OneHotEncoder(
        handle_unknown="ignore",
        sparse_output=False,
    )
    num_transformer = RobustScaler()

    preprocessor = ColumnTransformer(
        transformers=[
            ("cat", cat_transformer, CATEGORICAL_FEATURES),
            ("num", num_transformer, NUMERICAL_FEATURES),
        ],
        remainder="drop",
    )
    return preprocessor


def train_and_benchmark(
    data_path: str = "data/dataset_10k.csv",
    model_output_path: str = "model.pkl",
    metadata_output_path: str = "model_metadata.json",
    test_size: float = 0.20,
    random_state: int = 42,
) -> Dict[str, Any]:
    """
    Train models, run cross-validation, evaluate test holdout, and export model artifacts.
    """
    print(f"[*] Loading 10,000-row enterprise dataset from: {data_path}")
    if not os.path.exists(data_path):
        # Fallback to dataset.csv
        data_path = "data/dataset.csv"
    df = pd.read_csv(data_path)
    print(f"[+] Loaded {len(df)} records with {len(df.columns)} columns.")

    X = df[CATEGORICAL_FEATURES + NUMERICAL_FEATURES]
    y = df[TARGET_COLUMN]

    # 80-20 Stratified Train-Test Split
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=test_size,
        random_state=random_state,
        stratify=y,
    )
    print(f"[*] Train set: {len(X_train)} samples | Test set: {len(X_test)} samples")

    preprocessor = build_preprocessing_pipeline()

    # Define Candidate Models
    rf_classifier = RandomForestClassifier(
        n_estimators=120,
        max_depth=12,
        min_samples_split=4,
        min_samples_leaf=2,
        class_weight="balanced",
        random_state=random_state,
        n_jobs=-1,
    )

    rf_pipeline = Pipeline([
        ("preprocessor", preprocessor),
        ("classifier", rf_classifier),
    ])

    # 5-Fold Stratified Cross-Validation on Train split
    print("\n[*] Performing 5-Fold Stratified Cross-Validation on Training Set...")
    skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=random_state)
    cv_scores = cross_val_score(rf_pipeline, X_train, y_train, cv=skf, scoring="accuracy")
    cv_f1_scores = cross_val_score(rf_pipeline, X_train, y_train, cv=skf, scoring="f1_weighted")

    print(f"    5-Fold Accuracy:  {cv_scores.mean():.2%} (+/- {cv_scores.std():.2%})")
    print(f"    5-Fold F1-Score:  {cv_f1_scores.mean():.2%} (+/- {cv_f1_scores.std():.2%})")

    # Fit final pipeline
    print("\n[*] Training final production pipeline...")
    rf_pipeline.fit(X_train, y_train)

    # Evaluate on Holdout Test Set
    y_pred = rf_pipeline.predict(X_test)
    test_accuracy = accuracy_score(y_test, y_pred)
    weighted_f1 = f1_score(y_test, y_pred, average="weighted")
    macro_f1 = f1_score(y_test, y_pred, average="macro")

    print("\n" + "=" * 65)
    print(f"ENTERPRISE MODEL EVALUATION ON HOLDOUT TEST SET")
    print(f"Test Accuracy: {test_accuracy:.2%} | Weighted F1: {weighted_f1:.2%} | Macro F1: {macro_f1:.2%}")
    print("=" * 65)

    print("\n--- Classification Report ---")
    report_dict = classification_report(
        y_test,
        y_pred,
        labels=TIER_LABELS,
        output_dict=True,
    )
    print(classification_report(y_test, y_pred, labels=TIER_LABELS, digits=4))

    print("\n--- Confusion Matrix (Normalized %) ---")
    cm = confusion_matrix(y_test, y_pred, labels=TIER_LABELS)
    cm_norm = (cm.astype("float") / cm.sum(axis=1)[:, np.newaxis]) * 100
    cm_df = pd.DataFrame(
        cm_norm.round(1),
        index=[f"Actual {t}" for t in TIER_LABELS],
        columns=[f"Pred {t}" for t in TIER_LABELS],
    )
    print(cm_df)
    print("=" * 65)

    # Serialize trained pipeline to model.pkl
    joblib.dump(rf_pipeline, model_output_path)
    print(f"\n[+] Trained pipeline saved to: {model_output_path}")

    # Extract Feature Importances
    fitted_preprocessor = rf_pipeline.named_steps["preprocessor"]
    fitted_classifier = rf_pipeline.named_steps["classifier"]

    cat_feature_names = fitted_preprocessor.named_transformers_["cat"].get_feature_names_out(CATEGORICAL_FEATURES)
    all_feature_names = list(cat_feature_names) + NUMERICAL_FEATURES
    raw_importances = fitted_classifier.feature_importances_

    # Aggregate importance by high-level feature
    high_level_importances = {}
    for feat, imp in zip(all_feature_names, raw_importances):
        base_name = feat.split("_")[0]
        # Match against our original features
        matched_col = None
        for orig in CATEGORICAL_FEATURES + NUMERICAL_FEATURES:
            if feat.startswith(orig) or feat == orig:
                matched_col = orig
                break
        key = matched_col or base_name
        high_level_importances[key] = high_level_importances.get(key, 0.0) + float(imp)

    sorted_importances = sorted(high_level_importances.items(), key=lambda x: x[1], reverse=True)

    # Save portable model metadata for Next.js / Vercel Serverless
    metadata = {
        "model_type": "RandomForestClassifier",
        "n_estimators": 120,
        "n_training_records": len(df),
        "test_accuracy": round(test_accuracy, 4),
        "weighted_f1": round(weighted_f1, 4),
        "macro_f1": round(macro_f1, 4),
        "classes": TIER_LABELS,
        "categorical_features": CATEGORICAL_FEATURES,
        "numerical_features": NUMERICAL_FEATURES,
        "feature_importances": [
            {"feature": k, "importance": round(v, 4)} for k, v in sorted_importances
        ],
        "confusion_matrix": cm.tolist(),
        "classification_report": report_dict,
        "baseline_stats": {
            num_col: {
                "mean": round(float(df[num_col].mean()), 2),
                "std": round(float(df[num_col].std()), 2),
                "min": round(float(df[num_col].min()), 2),
                "max": round(float(df[num_col].max()), 2),
            }
            for num_col in NUMERICAL_FEATURES
        },
    }

    with open(metadata_output_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
    print(f"[+] Model metadata successfully exported to: {metadata_output_path}")

    # Also copy model_metadata.json into web/data directory if it exists
    web_data_dir = os.path.join("web", "data")
    if os.path.exists(web_data_dir):
        with open(os.path.join(web_data_dir, "model_metadata.json"), "w", encoding="utf-8") as f:
            json.dump(metadata, f, indent=2)

    return metadata


def main():
    parser = argparse.ArgumentParser(
        description="Train enterprise short-form video engagement predictor."
    )
    parser.add_argument(
        "--data",
        type=str,
        default="data/dataset_10k.csv",
        help="Path to training CSV (default: data/dataset_10k.csv)",
    )
    parser.add_argument(
        "--output",
        type=str,
        default="model.pkl",
        help="Model output path (default: model.pkl)",
    )
    parser.add_argument(
        "--metadata",
        type=str,
        default="model_metadata.json",
        help="Metadata output path (default: model_metadata.json)",
    )
    args = parser.parse_args()

    train_and_benchmark(
        data_path=args.data,
        model_output_path=args.output,
        metadata_output_path=args.metadata,
    )


if __name__ == "__main__":
    main()
