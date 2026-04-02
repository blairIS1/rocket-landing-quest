"use client";
import { useState, useEffect } from "react";
import { TRAIN_ITEMS, TrainingData } from "./data";
import RocketBuddy from "./RocketBuddy";
import { sfxCorrect, sfxWrong, sfxTap } from "./sfx";
import { speak, stopSpeaking, VOICE } from "./speak";
import { useSpeaking } from "./SpeakingIndicator";
import Confetti from "./Confetti";

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
      <div className="progress-track w-64"><div className="progress-fill" style={{ width: `${(idx / items.length) * 100}%` }} /></div>
      <div className="text-8xl my-2">{current.emoji}</div>
      <div className="text-xl font-semibold">{current.label}</div>
      <div className="text-xs opacity-50">Category: {current.category}</div>
      <div className="text-lg min-h-[2em] font-semibold">{feedback}</div>
      {!feedback && (
        <div className="flex gap-4 fade-in">
          <button className="btn text-2xl" disabled={speaking} style={{ background: "#ef4444" }} onClick={() => { sfxTap(); answer("dangerous"); }}>⚠️ DANGEROUS</button>
          <button className="btn text-2xl" disabled={speaking} style={{ background: "var(--success)", color: "#0f172a" }} onClick={() => { sfxTap(); answer("safe"); }}>✅ SAFE</button>
        </div>
      )}
    </div>
  );
}
