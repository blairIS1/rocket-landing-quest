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

export const VOICE = {
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
  q4Start: "q4_start.mp3",
  q4Save: "q4_save.mp3",
  q4Crash: "q4_crash.mp3",
  q4AiRight: "q4_ai_right.mp3",
  q4Done: "q4_done.mp3",
  q5Start: "q5_start.mp3",
  q5Launch: "q5_launch.mp3",
  q5Done: "q5_done.mp3",
  allDone: "all_done.mp3",
};
