"use client";
import { useState, useEffect } from "react";
import RocketBuddy from "./RocketBuddy";
import SpeakingIndicator from "./SpeakingIndicator";
import ReplayButton from "./ReplayButton";
import { sfxTap, sfxCorrect } from "./sfx";
import { speak, stopSpeaking, VOICE } from "./speak";
import { useSpeaking } from "./SpeakingIndicator";
import Confetti from "./Confetti";

export default function BuildRocket({ onComplete }: { onComplete: () => void }) {
  const [engine, setEngine] = useState(0);
  const [fins, setFins] = useState(0);
  const [fuel, setFuel] = useState(0);
  const [navigating, setNavigating] = useState(false);
  
  useEffect(() => { 
    let cancelled = false;
    speak(VOICE.q1Start).then(() => !cancelled && speak(VOICE.q1Title)).then(() => !cancelled && speak(VOICE.q1Instruction)); 
    return () => { cancelled = true; stopSpeaking(); };
  }, []);

  const speaking = useSpeaking();

  const engineOk = engine === 3;
  const finsOk = fins === 4;
  const fuelOk = fuel === 2;
  const done = engineOk && finsOk && fuelOk;
  const mood = done ? "celebrate" as const : "idle" as const;

  const parts = [
    { label: "Engines", emoji: "🔥", value: engine, set: setEngine, ideal: 3, max: 5, voice: VOICE.q1Engines },
    { label: "Fins", emoji: "🔺", value: fins, set: setFins, ideal: 4, max: 6, voice: VOICE.q1Fins },
    { label: "Fuel Tanks", emoji: "⛽", value: fuel, set: setFuel, ideal: 2, max: 4, voice: VOICE.q1Fuel },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-4 sm:p-8 fade-in">
      <SpeakingIndicator />
      <Confetti active={done} />
      <h2 className="text-2xl sm:text-3xl font-bold text-center px-4 flex items-center gap-2 justify-center">
        🔧 Quest 1: Build the Rocket!
        <ReplayButton voiceKey={VOICE.q1Title} />
      </h2>
      <RocketBuddy mood={mood} size={120} />
      <div className="flex items-center gap-2 justify-center">
        <p className="opacity-70 text-center max-w-md text-sm px-4">
          Every rocket needs the right parts. Too few = can&apos;t fly. Too many = too heavy!
        </p>
        <ReplayButton voiceKey={VOICE.q1Instruction} />
      </div>

      {parts.map((p) => {
        const ok = p.value === p.ideal;
        const over = p.value > p.ideal;
        return (
          <div key={p.label} className="flex items-center gap-2 sm:gap-3 w-full max-w-sm px-4">
            <span className="text-xl sm:text-2xl w-6 sm:w-8">{p.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between text-xs sm:text-sm mb-1">
                <span onClick={() => speak(p.voice)} style={{cursor: "pointer"}}>{p.label}</span>
                <span onClick={() => speak(ok ? VOICE.q1Perfect : over ? VOICE.q1TooHeavy : p.voice)} style={{cursor: "pointer"}}>
                  {ok ? "✅ Perfect!" : over ? "⚠️ Too heavy!" : `${p.value}/${p.ideal}`}
                </span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{
                  width: `${Math.min((p.value / p.max) * 100, 100)}%`,
                  background: ok ? "var(--success)" : over ? "var(--warn)" : undefined,
                }} />
              </div>
            </div>
            <div className="flex gap-1">
              <button className="btn px-2 sm:px-3 py-1 text-base sm:text-lg" disabled={speaking} onClick={() => { 
                sfxTap(); 
                const n = Math.min(p.value + 1, p.max); 
                p.set(n); 
                if (n === p.ideal) { sfxCorrect(); speak(VOICE.q1Perfect); }
              }}>+</button>
              <button className="btn px-2 sm:px-3 py-1 text-base sm:text-lg" disabled={speaking} style={{ background: "#475569" }} onClick={() => { sfxTap(); p.set(Math.max(p.value - 1, 0)); }}>−</button>
            </div>
          </div>
        );
      })}

      {done && <button className="btn btn-success mt-4 fade-in" disabled={navigating} onClick={() => { setNavigating(true); stopSpeaking(); sfxTap(); speak(VOICE.q1Learned); onComplete(); }}>
        Next Quest →
      </button>}
    </div>
  );
}
