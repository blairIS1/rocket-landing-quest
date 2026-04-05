"use client";

const KEY = "rocket-landing-quest-scores";
const COLOR_KEY = "rocket-landing-quest-color";

export const ROCKET_COLORS = [
  { name: "Blue", color: "#38bdf8", unlockAt: 0 },
  { name: "Green", color: "#4ade80", unlockAt: 1 },
  { name: "Purple", color: "#a78bfa", unlockAt: 2 },
  { name: "Orange", color: "#fb923c", unlockAt: 3 },
  { name: "Gold", color: "#fbbf24", unlockAt: 5 },
  { name: "Pink", color: "#f472b6", unlockAt: 7 },
  { name: "Rainbow", color: "url(#rainbow)", unlockAt: 10 },
];

export function recordCompletion(): number {
  if (typeof window === "undefined") return 0;
  try {
    const n = (parseInt(localStorage.getItem(KEY) || "0") || 0) + 1;
    localStorage.setItem(KEY, String(n));
    return n;
  } catch { return 0; }
}

export function getCompletions(): number {
  if (typeof window === "undefined") return 0;
  try { return parseInt(localStorage.getItem(KEY) || "0") || 0; } catch { return 0; }
}

export function getSelectedColor(): string {
  if (typeof window === "undefined") return ROCKET_COLORS[0].color;
  return localStorage.getItem(COLOR_KEY) || ROCKET_COLORS[0].color;
}

export function setSelectedColor(color: string) {
  if (typeof window !== "undefined") localStorage.setItem(COLOR_KEY, color);
}
