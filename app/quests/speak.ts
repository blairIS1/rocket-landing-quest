"use client";

const BASE = "/rocket-landing-quest/audio/";
let current: HTMLAudioElement | null = null;
let queue: Promise<void> = Promise.resolve();

export function speak(key: string): Promise<void> {
  queue = queue.then(() => new Promise<void>((resolve) => {
    if (typeof window === "undefined") { resolve(); return; }
    if (current) { current.pause(); current = null; }
    const a = new Audio(BASE + key);
    current = a;
    a.onended = () => { current = null; resolve(); };
    a.onerror = () => { current = null; resolve(); };
    a.play().catch(() => resolve());
  }));
  return queue;
}

export function stopSpeaking(): void {
  if (current) {
    current.pause();
    current = null;
  }
  queue = Promise.resolve();
}

export const VOICE = {
  // Main narration
  welcome: "welcome.mp3",
  q1Start: "q1_start.mp3",
  q1Done: "q1_done.mp3",
  q2Start: "q2_start.mp3",
  q2Done: "q2_done.mp3",
  correct: "correct.mp3",
  wrong: "wrong.mp3",
  summary: "summary.mp3",
  summaryBias: "summary_bias.mp3",
  q3Start: "q3_start.mp3",
  q3Done: "q3_done.mp3",
  q3Retrain: "q3_retrain.mp3",
  q4Start: "q4_start.mp3",
  q4Save: "q4_save.mp3",
  q4Crash: "q4_crash.mp3",
  q4AiRight: "q4_ai_right.mp3",
  q4FalseAlarm: "q4_false_alarm.mp3",
  q4Done: "q4_done.mp3",
  q4Learned: "q4_learned.mp3",
  q5Start: "q5_start.mp3",
  q5Launch: "q5_launch.mp3",
  q5Done: "q5_done.mp3",
  allDone: "all_done.mp3",
  q5Learned: "q5_learned.mp3",
  
  // UI Text Audio
  q1Title: "q1_title.mp3",
  q1Instruction: "q1_instruction.mp3",
  q1Engines: "q1_engines.mp3",
  q1Fins: "q1_fins.mp3",
  q1Fuel: "q1_fuel.mp3",
  q1Perfect: "q1_perfect.mp3",
  q1TooHeavy: "q1_too_heavy.mp3",
  q1Next: "q1_next.mp3",
  q1Learned: "q1_learned.mp3",
  
  menuTitle: "menu_title.mp3",
  menuSubtitle: "menu_subtitle.mp3",
  menuParts: "menu_parts.mp3",
  menuCompleted: "menu_completed.mp3",
  menuMissionComplete: "menu_mission_complete.mp3",
  
  questBuild: "quest_build.mp3",
  questTrain: "quest_train.mp3",
  questTest: "quest_test.mp3",
  questDodge: "quest_dodge.mp3",
  questMars: "quest_mars.mp3",
  
  partRocket: "part_rocket.mp3",
  partSensors: "part_sensors.mp3",
  partBrain: "part_brain.mp3",
  partShields: "part_shields.mp3",
  partMars: "part_mars.mp3",
  
  q2Title: "q2_title.mp3",
  q2Speed: "q2_speed.mp3",
  q2Obstacles: "q2_obstacles.mp3",
  q2Fuel: "q2_fuel.mp3",
  q2Tilt: "q2_tilt.mp3",
  q2Wind: "q2_wind.mp3",
  q2Safe: "q2_safe.mp3",
  q2Dangerous: "q2_dangerous.mp3",
  q2Labeled: "q2_labeled.mp3",
  q2Next: "q2_next.mp3",
  q2Learned: "q2_learned.mp3",
  
  summaryTitle: "summary_title.mp3",
  summaryConfidence: "summary_confidence.mp3",
  summaryLow: "summary_low.mp3",
  summaryMedium: "summary_medium.mp3",
  summaryHigh: "summary_high.mp3",
  summaryContinue: "summary_continue.mp3",
  summaryLearned: "summary_learned.mp3",
  
  q3Title: "q3_title.mp3",
  q3Watching: "q3_watching.mp3",
  q3Confidence: "q3_confidence.mp3",
  q3Decision: "q3_decision.mp3",
  q3SafeLand: "q3_safe_land.mp3",
  q3TooDangerous: "q3_too_dangerous.mp3",
  q3Mistakes: "q3_mistakes.mp3",
  q3Perfect: "q3_perfect.mp3",
  q3NotBad: "q3_not_bad.mp3",
  q3NeedTraining: "q3_need_training.mp3",
  q3Next: "q3_next.mp3",
  q3Learned: "q3_learned.mp3",
  
  q4Title: "q4_title.mp3",
  q4AiSays: "q4_ai_says.mp3",
  q4Override: "q4_override.mp3",
  q4Trust: "q4_trust.mp3",
  
  q5Title: "q5_title.mp3",
  q5Cruising: "q5_cruising.mp3",
  q5Approaching: "q5_approaching.mp3",
  q5Landing: "q5_landing.mp3",
  q5Touchdown: "q5_touchdown.mp3",
  q5Success: "q5_success.mp3",
  q5BackMenu: "q5_back_menu.mp3",
};
