"use client";
import { useState, useEffect } from "react";
import RocketBuddy from "./RocketBuddy";
import { sfxTap, sfxCorrect, sfxWrong } from "./sfx";
import { speak, VOICE } from "./speak";
import Confetti from "./Confetti";

export default function BuildRocket({ onComplete }: { onComplete: () => void }) {
  const [engine, setEngine] = useState(0);
  const [fins, setFins] = useState(0);
  const [fuel, setFuel] = useState(0);
  useEffect(() => { speak(VOICE.q1Start); }, []);

  const engineOk = engine === 3;
  const finsOk = fins === 4;
  const fuelOk = fuel === 2;
  const done = engineOk && finsOk && fuelOk;
  const mood = done ? "celebrate" as const : "idle" as const;

  const parts = [
    { label: "Engines", emoji: "🔥", value: engine, set: setEngine, ideal: 3, max: 5 },
    { label: "Fins", emoji: "🔺", value: fins, set: setFins, ideal: 4, max: 6 },
    { label: "Fuel Tanks", emoji: "⛽", value: fuel, set: setFuel, ideal: 2, max: 4 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-8 fade-in">
      <Confetti active={done} />
      <h2 className="text-3xl font-bold">🔧 Quest 1: Build the Rocket!</h2>
      <RocketBuddy mood={mood} size={120} />
      <p className="opacity-70 text-center max-w-md text-sm">
        Every rocket needs the right parts. Too few = can&apos;t fly. Too many = too heavy!
      </p>

      {parts.map((p) => {
        const ok = p.value === p.ideal;
        const over = p.value > p.ideal;
        return (
          <div key={p.label} className="flex items-center gap-3 w-72">
            <span className="text-2xl w-8">{p.emoji}</span>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>{p.label}</span>
                <span>{ok ? "✅ Perfect!" : over ? "⚠️ Too heavy!" : `${p.value}/${p.ideal}`}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{
                  width: `${Math.min((p.value / p.max) * 100, 100)}%`,
                  background: ok ? "var(--success)" : over ? "var(--warn)" : undefined,
                }} />
              </div>
            </div>
            <div className="flex gap-1">
              <button className="btn px-3 py-1 text-lg" onClick={() => { sfxTap(); const n = Math.min(p.value + 1, p.max); p.set(n); if (n === p.ideal) sfxCorrect(); }} >+</button>
              <button className="btn px-3 py-1 text-lg" style={{ background: "#475569" }} onClick={() => { sfxTap(); p.set(Math.max(p.value - 1, 0)); }}>−</button>
            </div>
          </div>
        );
      })}

      {done && <button className="btn btn-success mt-4 fade-in" onClick={() => { sfxTap(); speak(VOICE.q1Done).then(onComplete); }}>Next Quest →</button>}
    </div>
  );
}
