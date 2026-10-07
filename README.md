# VideoPerformance Predictor & Script Diagnostic Studio

> **Data Science Capstone & Research Platform**  
> An end-to-end Data Science & Full-Stack Web Platform predicting short-form video engagement tiers (**Viral**, **High**, **Medium**, **Low**) across TikTok, Instagram Reels, and YouTube Shorts.  
> Powered by **10,000 multimodal short-form records**, an integrated **Script & Hook Quality NLP Engine**, **Follower Baseline Scaling**, and a **production-ready Next.js 14+ full-stack platform deployed on Vercel**.

---

## 🌟 Key Capabilities & Upgrades

1. **Integrated Script Quality & Copywriting NLP Engine**:
   - **Opening Hook Diagnostic (0–5s)**: Evaluates cognitive tension and pattern interrupts (Curiosity Gap, Shock Value, Problem-First, Story Hook). Detects and flags cliché openers (*"Hey guys"*, *"In this video I'll show..."*) and generates 3 tailored high-retention alternative rewrites.
   - **Body & Narrative Pacing**: Real-time spoken duration calculation (~150 WPM), sentence variance analysis, and conversational fluff pruning recommendations.
   - **Call-to-Action (CTA) Audit**: Evaluates closing engagement triggers (Comment debates, Save/Utility bookmarks, DM share loops).
2. **Dual-Channel View Projections (Follower Base vs. Algorithmic FYP Discovery)**:
   - Dynamic scaling from **0 to 1,000,000+ followers**.
   - Mathematically isolates **Follower Base Views** (direct subscriber impressions) from **Algorithmic Explore / FYP Views** (content-merit distribution multiplier), accurately reflecting short-form platform algorithms.
3. **Executive Parameters Summary Dashboard**:
   - Automatically generates a clean, structured parameters ledger displaying all selected creator, creative, production, and scheduling variables for direct examination and auditing.
4. **Machine Learning Pipeline (N = 10,000 Records)**:
   - `ColumnTransformer` with `OneHotEncoder(handle_unknown='ignore')` + `RobustScaler()`.
   - 120-estimator `RandomForestClassifier` with balanced class weights.
   - **5-Fold Stratified Cross Validation**: 63.22% ± 1.41% accuracy.
   - **Holdout Test Accuracy**: 62.05% across 4 discrete tiers with zero cross-contamination between Low and Viral classes.
5. **Academic & Professional UX Design**:
   - Clean, minimalist enterprise zinc/slate palette designed specifically for academic scrutiny and professional analytics (zero AI clichés, no glowing neon effects, no distracting animations).

---

## 🗂️ Project Structure

```text
social_media_predictor/
├── data/
│   ├── dataset_10k.csv           # 10,000-row enterprise multimodal dataset
│   ├── dataset.csv               # Primary dataset copy
│   └── dataset_summary.json      # Distribution & statistical metadata
├── src/
│   ├── generate_data.py          # 10k data generation pipeline with non-linear synergies
│   ├── train_model.py            # 5-fold CV training, evaluation & metadata exporter
│   └── utils.py                  # Dataset loaders, feature attributions & styling
├── web/                          # Production Full-Stack Next.js App for Vercel
│   ├── app/
│   │   ├── page.tsx              # Interactive Studio & Executive Analysis Dashboard
│   │   ├── dataset/page.tsx      # 10K Dataset & Model Performance Explorer
│   │   ├── layout.tsx            # Global layout & clean navigation
│   │   ├── globals.css           # Clean typography & zinc styling
│   │   └── api/
│   │       ├── predict/route.ts  # Vercel Serverless Edge Prediction API
│   │       └── data-stats/route.ts # Dataset summary API
│   ├── components/
│   │   ├── Header.tsx            # Clean academic header
│   │   ├── AnalysisForm.tsx      # Multi-variable input form + Script editor
│   │   ├── ExecutiveSummary.tsx  # Executive parameters summary ledger
│   │   ├── PerformanceMetrics.tsx # Dual-channel view projections & retention rates
│   │   ├── ScriptAnalyzerCard.tsx# Hook, Body, and CTA diagnostics with rewrites
│   │   └── VariableImpactChart.tsx# SHAP-equivalent variable impact decomposition
│   ├── lib/
│   │   ├── types.ts              # Strict TypeScript definitions
│   │   ├── scriptAnalyzer.ts     # NLP script Hook, Body, CTA analyzer & rewrite generator
│   │   ├── presets.ts            # Industry creative test presets
│   │   └── modelEngine.ts        # Zero-latency Vercel Edge inference engine
│   ├── package.json              # Next.js 14, React 18, Tailwind, Lucide dependencies
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vercel.json               # Native Vercel deployment configuration
├── app.py                        # Local Streamlit application
├── model.pkl                     # Serialized scikit-learn pipeline (1.8 MB)
├── model_metadata.json           # Portable weights, thresholds & importances
├── requirements.txt              # Python dependencies
└── README.md                     # Comprehensive documentation & Vercel deployment guide
```

---

## 🚀 Running Locally

### Option A: Launch Full-Stack Next.js Web App (Recommended)
```bash
# 1. Navigate to the web folder
cd web

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Option B: Retrain ML Pipeline Locally
```bash
# 1. Install Python requirements
pip install -r requirements.txt

# 2. Generate 10,000 synthetic records
python src/generate_data.py --rows 10000

# 3. Train ML models & export artifacts
python src/train_model.py
```

---

## 🌐 Deploying to Vercel & GitHub

The repository is configured for zero-configuration deployment:
- **GitHub Repository**: [github.com/Hamdan620/social-media-engagement-and-video-performance-predictor](https://github.com/Hamdan620/social-media-engagement-and-video-performance-predictor)
- **Vercel Production Edge Deployment**: Automatically triggers on `git push origin main`.

---

## 📈 Model Performance & Evaluation Summary

```text
=================================================================
ENTERPRISE MODEL EVALUATION ON HOLDOUT TEST SET (N = 2,000)
Test Accuracy: 62.05% | Weighted F1: 62.12% | Macro F1: 60.87%
5-Fold Stratified Cross-Validation: 63.22% (+/- 1.41%)
=================================================================

--- Normalized Confusion Matrix (%) ---
                        Pred Low  Pred Medium  Pred High  Pred Viral (Top 10%)
Actual Low                  71.4         25.8        2.8                   0.0
Actual Medium               18.6         58.6       21.8                   1.0
Actual High                  0.9         24.6       58.6                  15.9
Actual Viral (Top 10%)       0.0          0.7       37.6                  61.7
```

---

## 📄 License
MIT License. Built for data science researchers and content strategists.
