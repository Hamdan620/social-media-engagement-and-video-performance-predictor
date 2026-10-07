import { ScriptAnalysis } from "./types";

/**
 * Intelligent Script Quality & Retention Analyzer for Short-Form Video.
 * Evaluates Hook, Body, and Call-to-Action (CTA) against viral video copywriting data.
 */
export function analyzeScript(rawScript: string): ScriptAnalysis {
  const text = (rawScript || "").trim();

  if (!text) {
    return {
      hook: {
        text: "No script provided.",
        score: 50,
        detectedStyle: "Undefined",
        critique: "Paste a script to receive detailed hook, narrative body, and CTA conversion analysis.",
        rewrites: [],
        isCliche: false,
      },
      body: {
        wordCount: 0,
        estimatedDurationSec: 0,
        speakingWpm: 150,
        score: 50,
        critique: "No body text detected.",
        pacingAdvice: "A 20-30 second short-form video typically uses 45-75 spoken words.",
      },
      cta: {
        text: "None detected.",
        score: 50,
        ctaType: "None",
        critique: "Include a closing call-to-action to spark algorithm engagement (comments, shares, or saves).",
        suggestedCta: [],
      },
      overallScriptScore: 50,
    };
  }

  // Split into sentences
  const sentences = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;
  const estimatedDurationSec = Math.max(3, Math.round((wordCount / 150) * 60));

  // --- 1. HOOK EXTRACTION & EVALUATION (Opening 1-2 sentences) ---
  const hookSentences = sentences.slice(0, Math.min(2, Math.max(1, Math.floor(sentences.length * 0.25))));
  const hookText = hookSentences.join(" ") || sentences[0] || text.slice(0, 80);

  const lowerHook = hookText.toLowerCase();

  // Cliché check
  const cliches = [
    "hey guys",
    "welcome back",
    "in this video",
    "today i'm going to",
    "today i want to",
    "so basically",
    "hi everyone",
    "hello guys",
    "what's up guys",
    "i'm going to show you",
  ];
  const isCliche = cliches.some((c) => lowerHook.includes(c));

  // Strong hook indicators
  const curiosityTriggers = ["secret", "nobody talks about", "stop doing", "the truth about", "mistake", "why you", "hidden", "actually"];
  const shockTriggers = ["insane", "never", "ruined", "destroyed", "waste", "lied to you", "warning", "banned"];
  const questionTriggers = ["did you know", "have you ever", "what if", "how come", "why does", "can you"];
  const storyTriggers = ["yesterday", "i tried", "30 days ago", "when i first", "this happened"];

  let hookScore = 65;
  let hookStyle = "Direct Opening";
  let hookCritique = "Standard opening. Provides baseline clarity but lacks an immediate cognitive pattern interrupt.";

  if (isCliche) {
    hookScore = 32;
    hookStyle = "Weak / Cliché Intro";
    hookCritique = "Slow, conversational preamble. Feed viewers swipe away within 1.2 seconds if not immediately gripped by tension or high novelty.";
  } else if (curiosityTriggers.some((t) => lowerHook.includes(t))) {
    hookScore = 88;
    hookStyle = "Curiosity Gap";
    hookCritique = "Strong psychological tension. Withholds resolution to compel viewers into watching past the initial 3-second drop-off zone.";
  } else if (shockTriggers.some((t) => lowerHook.includes(t))) {
    hookScore = 92;
    hookStyle = "Pattern Interrupt / Shock Value";
    hookCritique = "High scroll-stopping power. Subverts expectations and immediately resets audience attention.";
  } else if (storyTriggers.some((t) => lowerHook.includes(t))) {
    hookScore = 82;
    hookStyle = "Personal Narrative Hook";
    hookCritique = "Good relatability. Personal experience hooks generate strong empathy if visual pacing is fast.";
  } else if (questionTriggers.some((t) => lowerHook.includes(t)) || hookText.includes("?")) {
    hookScore = 74;
    hookStyle = "Question Hook";
    hookCritique = "Effective if the question targets a visceral viewer problem, but common in current short-form feeds.";
  }

  // Extract a subject noun/topic for tailored rewrites
  const cleanHookWords = hookText.replace(/[^\w\s]/g, "").split(/\s+/);
  const potentialTopic = cleanHookWords.slice(2, 6).join(" ") || "this topic";

  const hookRewrites = [
    `"Stop making this mistake if you care about ${potentialTopic}..."`,
    `"The real reason nobody talks about ${potentialTopic} (and what actually works):"`,
    `"I tested ${potentialTopic} so you don't have to — here's the brutal truth:"`,
  ];

  // --- 2. BODY & NARRATIVE EVALUATION ---
  const bodySentences = sentences.length > 2 ? sentences.slice(1, -1) : sentences;
  const bodyText = bodySentences.join(" ");

  // Filler / Fluff count
  const fillers = ["literally", "basically", "you know", "kind of", "sort of", "honestly", "obviously", "like i said"];
  const lowerBody = bodyText.toLowerCase();
  const fillerCount = fillers.filter((f) => lowerBody.includes(f)).length;

  let bodyScore = 75;
  let bodyCritique = "Clear pacing with adequate narrative momentum.";
  let pacingAdvice = "Keep visual scene cuts aligned with key value points every 2-4 seconds.";

  if (fillerCount >= 2) {
    bodyScore -= fillerCount * 6;
    bodyCritique = `Contains ${fillerCount} filler phrases ("basically", "you know", etc.) that dilute speech density and invite swipe-aways.`;
    pacingAdvice = "Prune conversational filler words to increase words-per-minute impact and tighten pacing.";
  }

  if (wordCount > 180) {
    bodyScore -= 12;
    bodyCritique = `Word count (${wordCount} words) is long for standard short-form retention. Requires exceptional visuals to maintain 40%+ completion.`;
    pacingAdvice = "Consider splitting this script into two focused clips or trimming 30% of explanatory fluff.";
  } else if (wordCount < 25) {
    bodyScore -= 8;
    bodyCritique = "Very brief. Ensure your visual payoff delivers adequate value before the clip loops.";
    pacingAdvice = "Add 1-2 contextual supporting details or a dynamic visual demonstration.";
  }

  bodyScore = Math.max(30, Math.min(95, bodyScore));

  // --- 3. CALL-TO-ACTION (CTA) EVALUATION (Closing 1-2 sentences) ---
  const ctaSentence = sentences.length > 1 ? sentences[sentences.length - 1] : "";
  const lowerCta = ctaSentence.toLowerCase();

  let ctaScore = 60;
  let ctaType = "Unspecified / Weak";
  let ctaCritique = "No strong closing engagement trigger detected. Ending abruptly limits comment and share velocity.";

  const suggestedCtas = [
    `"Drop your opinion below: Do you agree with this, or is it overrated?" (Drives high-weight comment algorithm signals)`,
    `"Save this video right now before you lose it in your feed." (Boosts algorithmic save-rate ranking)`,
    `"Send this to a friend who desperately needs to hear this." (Triggers direct message viral loop)`,
  ];

  if (lowerCta.includes("comment") || lowerCta.includes("think") || lowerCta.includes("agree") || lowerCta.includes("?")) {
    ctaScore = 90;
    ctaType = "Comment Engagement Trigger";
    ctaCritique = "High-performing CTA. Prompting viewer opinions triggers active comment discussions, which platforms heavily reward.";
  } else if (lowerCta.includes("save") || lowerCta.includes("bookmark")) {
    ctaScore = 92;
    ctaType = "Save / Utility Trigger";
    ctaCritique = "Excellent CTA. Saves signal high-utility evergreen value to TikTok and Instagram recommendation systems.";
  } else if (lowerCta.includes("send") || lowerCta.includes("share") || lowerCta.includes("friend")) {
    ctaScore = 88;
    ctaType = "Share / Viral Multiplier Trigger";
    ctaCritique = "Strong viral trigger. Encouraging direct shares amplifies external watch sessions.";
  } else if (lowerCta.includes("follow") || lowerCta.includes("subscribe") || lowerCta.includes("part 2")) {
    ctaScore = 72;
    ctaType = "Follow / Series Hook";
    ctaCritique = "Good for building follower retention, though slightly lower in exploratory algorithm weighting than comment debates.";
  }

  // --- 4. OVERALL AGGREGATE SCRIPT VIRALITY SCORE ---
  const overallScriptScore = Math.round(hookScore * 0.45 + bodyScore * 0.35 + ctaScore * 0.2);

  return {
    hook: {
      text: hookText,
      score: hookScore,
      detectedStyle: hookStyle,
      critique: hookCritique,
      rewrites: hookRewrites,
      isCliche,
    },
    body: {
      wordCount,
      estimatedDurationSec,
      speakingWpm: Math.round((wordCount / (estimatedDurationSec / 60)) || 150),
      score: bodyScore,
      critique: bodyCritique,
      pacingAdvice,
    },
    cta: {
      text: ctaSentence || "No explicit CTA detected.",
      score: ctaScore,
      ctaType,
      critique: ctaCritique,
      suggestedCta: suggestedCtas,
    },
    overallScriptScore,
  };
}
