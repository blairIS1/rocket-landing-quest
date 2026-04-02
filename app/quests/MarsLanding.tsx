"use client";
import { useState, useEffect } from "react";
import { TrainingData, getConfidence, CATEGORIES } from "./data";
import RocketBuddy from "./RocketBuddy";
import { sfxCorrect, sfxTap, sfxCelebrate } from "./sfx";
import { speak, stopSpeaking, VOICE } from "./speak";
import { useSpeaking } from "./SpeakingIndicator";
import Confetti from "./Confetti";

const MISSION_STEPS = [
  { label: "🔥 Launch!", desc: "Engines firing — liftoff!" },
  { label: "🌍 Leave atmosphere", desc: "Passing through the clouds..." },
  { label: "🛰️ Orbit achieved", desc: "We're in space!" },
  { label: "🪐 Course to Mars", desc: "Setting trajectory..." },
  { label: "🔴 Mars approach", desc: "Almost there!" },
  { label: "🪂 Entry & landing", desc: "Deploying parachutes and thrusters!" },
];

export default function MarsLanding({ training, onComplete }: { training: TrainingData; onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [auto, setAuto] = useState(false);
  const speaking = useSpeaking();

  useEffect(() => { speak(VOICE.q5Start); return () => { stopSpeaking(); }; }, []);

  // Auto-advance every 3s once started
  useEffect(() => {
    if (!auto || done) return;
    const t = setTimeout(() => {
      sfxCorrect();
      if (step + 1 >= MISSION_STEPS.length) { setDone(true); sfxCelebrate(); speak(VOICE.q5Done); }
      else setStep((s) => s + 1);
    }, 3000);
    return () => clearTimeout(t);
  }, [auto, step, done]);

  const avgConf = Math.round(CATEGORIES.reduce((sum, c) => sum + getConfidence(training, c), 0) / CATEGORIES.length);

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 fade-in">
        <Confetti active={true} />
        <RocketBuddy mood="celebrate" size={160} />
        <h2 className="text-3xl font-bold text-center">🎉 Mars Landing Successful!</h2>
        <p className="text-xl">AI Confidence: <b>{avgConf}%</b></p>
        <p className="text-lg opacity-80 text-center max-w-md">
          Your training data helped the rocket land on Mars! Real space AI learns from millions of simulations — just like you taught it!
        </p>
        <button className="btn btn-success mt-4" onClick={() => { stopSpeaking(); sfxTap(); speak(VOICE.q5Learned); onComplete(); }}>🏠 Mission Complete!</button>
      </div>
    );
  }

  const current = MISSION_STEPS[step];
  const pct = ((step + 1) / MISSION_STEPS.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-8 fade-in">
      <h2 className="text-3xl font-bold">🪐 Quest 5: Mission to Mars!</h2>
      <RocketBuddy mood={auto ? "happy" : "idle"} size={100} />
      <p className="opacity-70 text-center max-w-md text-sm">
        The rocket flies itself using everything you taught it. Watch from mission control!
      </p>

      <div className="text-sm opacity-60">AI Confidence: {avgConf}%</div>

      {/* Mission progress */}
      <div className="w-72">
        <div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
        <div className="text-center text-sm mt-1 opacity-70">Step {step + 1} / {MISSION_STEPS.length}</div>
      </div>

      <div className="text-4xl my-2">{current.label}</div>
      <div className="text-lg font-semibold">{current.desc}</div>

      {/* Mission log */}
      <div className="flex flex-col gap-1 w-72 max-h-32 overflow-y-auto text-sm opacity-60">
        {MISSION_STEPS.slice(0, step + 1).map((s, i) => (
          <div key={i}>✅ {s.label}</div>
        ))}
      </div>

      {!auto ? (
        <button className="btn btn-primary text-xl mt-4" onClick={() => { stopSpeaking(); sfxTap(); setAuto(true); speak(VOICE.q5Launch); }}>
          🚀 Launch!
        </button>
      ) : (
        <div className="text-sm opacity-50 mt-4">🤖 AI is flying autonomously...</div>
      )}
    </div>
  );
}
