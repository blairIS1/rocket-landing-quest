"use client";
import { useState, useEffect } from "react";
import { TRAIN_ITEMS, TrainingData } from "./data";
import RocketBuddy from "./RocketBuddy";
import { sfxCorrect, sfxWrong, sfxTap } from "./sfx";
import { speak, stopSpeaking, VOICE } from "./speak";
import { useSpeaking } from "./SpeakingIndicator";
import Confetti from "./Confetti";

export function TrainVisual({ emoji, category, answer }: { emoji: string; category: string; answer: string }) {
  // Fuel: show a gauge with level
  if (category === "fuel") {
    const empty = answer === "dangerous";
    return (
      <svg width="120" height="120" viewBox="0 0 120 120">
        <rect x="30" y="15" width="60" height="90" rx="8" fill="none" stroke="#94a3b8" strokeWidth="3" />
        <rect x="34" y={empty ? 85 : 25} width="52" height={empty ? 16 : 76} rx="4" fill={empty ? "#ef4444" : "#4ade80"} />
        <text x="60" y="112" textAnchor="middle" fontSize="10" fill="#94a3b8">FUEL</text>
        {empty && <text x="60" y="75" textAnchor="middle" fontSize="14" fill="#ef4444">⚠️</text>}
      </svg>
    );
  }
  // Tilt: show a rocket at an angle
  if (category === "tilt") {
    const tilted = answer === "dangerous";
    return (
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Ground line */}
        <line x1="10" y1="105" x2="110" y2="105" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
        {/* Rocket — 🚀 emoji points ~45° upper-right, so rotate(45deg) makes it vertical */}
        <g style={{ transformOrigin: "60px 70px", transform: tilted ? "rotate(0deg)" : "rotate(45deg)" }}>
          <text x="60" y="70" textAnchor="middle" fontSize="48">🚀</text>
        </g>
        {/* Angle indicator */}
        {tilted && <>
          <path d="M60 90 L85 90" stroke="#ef4444" strokeWidth="2" />
          <path d="M60 90 L77 73" stroke="#ef4444" strokeWidth="2" />
          <text x="78" y="88" fontSize="12" fill="#ef4444">45°</text>
        </>}
      </svg>
    );
  }
  // Default: use emoji
  return <span className="text-8xl">{emoji}</span>;
}

export default function TrainLanding({ onComplete }: { onComplete: (data: TrainingData) => void }) {
  const [items] = useState(() => [...TRAIN_ITEMS].sort(() => Math.random() - 0.5));
  const [idx, setIdx] = useState(0);
  const [training, setTraining] = useState<TrainingData>({});
  const [feedback, setFeedback] = useState("");
  const [mood, setMood] = useState<"idle" | "happy" | "scared">("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const [done, setDone] = useState(false);
  const speaking = useSpeaking();

  useEffect(() => { speak(VOICE.q2Start); return () => { stopSpeaking(); }; }, []);

  const current = items[idx];

  const advance = () => {
    setFeedback(""); setMood("idle"); setShowConfetti(false);
    if (idx + 1 < items.length) setIdx(idx + 1); else setDone(true);
  };

  const answer = (choice: "safe" | "dangerous") => {
    const correct = choice === current.answer;
    if (correct) {
      sfxCorrect(); setMood("happy"); setShowConfetti(true);
      setTraining((t) => ({ ...t, [current.category]: (t[current.category] || 0) + 1 }));
      setFeedback("✅ Correct! The AI learned about " + current.label + "!");
      speak(current.voiceCorrect).then(advance);
    } else {
      sfxWrong(); setMood("scared");
      setFeedback("Oops! That's actually " + current.answer + " 😅");
      speak(current.voiceWrong).then(advance);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 fade-in">
        <Confetti active={true} />
        <RocketBuddy mood="celebrate" size={120} />
        <h2 className="text-3xl font-bold">🧠 Training Complete!</h2>
        <button className="btn btn-success mt-4" onClick={() => { stopSpeaking(); sfxTap(); speak(VOICE.q2Learned); onComplete(training); }}>
          See Results →
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-8 fade-in">
      <Confetti active={showConfetti} />
      <h2 className="text-3xl font-bold">👁️ Quest 2: Train the Landing AI!</h2>
      <RocketBuddy mood={mood} size={80} />
      <p className="opacity-70 text-center max-w-md text-sm">Is this landing condition safe or dangerous?</p>
      <div className="text-sm opacity-70">{idx + 1} / {items.length}</div>
      <div className="progress-track w-64"><div className="progress-fill" style={{ width: `${((idx + 1) / items.length) * 100}%` }} /></div>
      <div className="my-2"><TrainVisual emoji={current.emoji} category={current.category} answer={current.answer} /></div>
      <div className="text-xl font-semibold">{current.label}</div>
      <div className="text-xs opacity-50">Category: {current.category}</div>
      <div className="text-lg min-h-[2em] font-semibold">{feedback}</div>
      {!feedback && (
        <div className="flex gap-4 fade-in">
          <button className="btn text-2xl" style={{ background: "#ef4444" }} onClick={() => { stopSpeaking(); sfxTap(); answer("dangerous"); }}>⚠️ DANGEROUS</button>
          <button className="btn text-2xl" style={{ background: "var(--success)", color: "#0f172a" }} onClick={() => { stopSpeaking(); sfxTap(); answer("safe"); }}>✅ SAFE</button>
        </div>
      )}
    </div>
  );
}
