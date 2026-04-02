"use client";

export const CATEGORIES = ["wind", "tilt", "fuel", "obstacles", "speed"] as const;
export type Category = typeof CATEGORIES[number];
export type TrainingData = Record<string, number>;

export function getConfidence(training: TrainingData, cat: string): number {
  const count = training[cat] || 0;
  return count === 0 ? 25 : count === 1 ? 55 : 90;
}

// Quest 2: Training items — label landing scenarios as safe/dangerous
export const TRAIN_ITEMS = [
  { emoji: "💨", label: "Strong crosswind", answer: "dangerous" as const, category: "wind", voiceCorrect: "t_wind_danger_y.mp3", voiceWrong: "t_wind_danger_n.mp3" },
  { emoji: "🌬️", label: "Light breeze", answer: "safe" as const, category: "wind", voiceCorrect: "t_wind_safe_y.mp3", voiceWrong: "t_wind_safe_n.mp3" },
  { emoji: "📐", label: "Rocket tilting 45°", answer: "dangerous" as const, category: "tilt", voiceCorrect: "t_tilt_danger_y.mp3", voiceWrong: "t_tilt_danger_n.mp3" },
  { emoji: "📏", label: "Rocket straight up", answer: "safe" as const, category: "tilt", voiceCorrect: "t_tilt_safe_y.mp3", voiceWrong: "t_tilt_safe_n.mp3" },
  { emoji: "⛽", label: "Fuel tank almost empty", answer: "dangerous" as const, category: "fuel", voiceCorrect: "t_fuel_danger_y.mp3", voiceWrong: "t_fuel_danger_n.mp3" },
  { emoji: "🛢️", label: "Plenty of fuel left", answer: "safe" as const, category: "fuel", voiceCorrect: "t_fuel_safe_y.mp3", voiceWrong: "t_fuel_safe_n.mp3" },
  { emoji: "🚢", label: "Drone ship rocking", answer: "dangerous" as const, category: "obstacles", voiceCorrect: "t_obs_danger_y.mp3", voiceWrong: "t_obs_danger_n.mp3" },
  { emoji: "🏗️", label: "Clear landing pad", answer: "safe" as const, category: "obstacles", voiceCorrect: "t_obs_safe_y.mp3", voiceWrong: "t_obs_safe_n.mp3" },
  { emoji: "⚡", label: "Coming in too fast", answer: "dangerous" as const, category: "speed", voiceCorrect: "t_speed_danger_y.mp3", voiceWrong: "t_speed_danger_n.mp3" },
  { emoji: "🪂", label: "Slow steady descent", answer: "safe" as const, category: "speed", voiceCorrect: "t_speed_safe_y.mp3", voiceWrong: "t_speed_safe_n.mp3" },
];

// AI features for reasoning display
export const AI_FEATURES: Record<string, string[]> = {
  wind: ["Wind sensor", "Direction check", "Speed reading"],
  tilt: ["Gyroscope", "Angle sensor", "Balance check"],
  fuel: ["Fuel gauge", "Burn rate calc", "Reserve check"],
  obstacles: ["Camera feed", "Radar scan", "Surface check"],
  speed: ["Altimeter", "Velocity calc", "Thrust level"],
};

// Confusion rules for wrong AI guesses
const CONFUSIONS: Record<string, string> = {
  wind: "Wind data unclear — guessed wrong!",
  tilt: "Angle sensor confused — bad reading!",
  fuel: "Fuel calculation off — miscounted!",
  obstacles: "Camera couldn't see clearly — missed it!",
  speed: "Speed sensor lagged — too late!",
};

export type LandingRound = {
  emoji: string; label: string; correct: "safe" | "dangerous"; category: string;
  aiChoice: "safe" | "dangerous"; confidence: number; features: string[];
  reason?: string;
};

export function generateLandingRounds(training: TrainingData): LandingRound[] {
  const scenarios = [
    { emoji: "💨", label: "Gusty wind!", correct: "dangerous" as const, category: "wind" },
    { emoji: "📏", label: "Perfectly vertical", correct: "safe" as const, category: "tilt" },
    { emoji: "⛽", label: "Low fuel warning!", correct: "dangerous" as const, category: "fuel" },
    { emoji: "🏗️", label: "Pad is clear", correct: "safe" as const, category: "obstacles" },
    { emoji: "⚡", label: "Descending too fast!", correct: "dangerous" as const, category: "speed" },
    { emoji: "🌬️", label: "Calm conditions", correct: "safe" as const, category: "wind" },
    { emoji: "📐", label: "Slight tilt detected", correct: "dangerous" as const, category: "tilt" },
    { emoji: "🛢️", label: "Fuel looks good", correct: "safe" as const, category: "fuel" },
  ].sort(() => Math.random() - 0.5);

  return scenarios.map((s) => {
    const conf = getConfidence(training, s.category);
    const correct = Math.random() < conf / 100;
    const aiChoice = correct ? s.correct : (s.correct === "safe" ? "dangerous" : "safe");
    return {
      ...s, aiChoice, confidence: conf,
      features: AI_FEATURES[s.category] || [],
      reason: correct ? undefined : CONFUSIONS[s.category],
    };
  });
}

// Quest 4: Space debris for collision avoidance
export const DEBRIS_EVENTS = [
  { emoji: "🛰️", label: "Old satellite ahead!", correct: "dodge", delay: 2000 },
  { emoji: "✨", label: "Clear space", correct: "fly", delay: 800 },
  { emoji: "🪨", label: "Space rock!", correct: "dodge", delay: 1800 },
  { emoji: "✨", label: "All clear", correct: "fly", delay: 600 },
  { emoji: "🔩", label: "Floating debris!", correct: "dodge", delay: 2200 },
  { emoji: "✨", label: "Path is safe", correct: "fly", delay: 500 },
  { emoji: "🛰️", label: "Broken satellite!", correct: "dodge", delay: 1600 },
  { emoji: "✨", label: "Smooth sailing", correct: "fly", delay: 700 },
];
