"use client";
import { useState, useEffect } from "react";
import BuildRocket from "./quests/BuildRocket";
import TrainLanding from "./quests/TrainLanding";
import TrainingSummary from "./quests/TrainingSummary";
import TestLanding from "./quests/TestLanding";
import DodgeDebris from "./quests/DodgeDebris";
import MarsLanding from "./quests/MarsLanding";
import RocketBuddy from "./quests/RocketBuddy";
import Confetti from "./quests/Confetti";
import SessionTimer, { useSessionTimer } from "./quests/SessionTimer";
import { sfxTap, sfxCelebrate } from "./quests/sfx";
import { speak, VOICE } from "./quests/speak";
import { startMusic, stopMusic } from "./quests/music";
import { recordCompletion, getCompletions } from "./quests/scores";
import { TrainingData } from "./quests/data";

const PARTS = [
  { emoji: "🔧", label: "Rocket", voice: VOICE.partRocket },
  { emoji: "👁️", label: "Sensors", voice: VOICE.partSensors },
  { emoji: "🧠", label: "AI Brain", voice: VOICE.partBrain },
  { emoji: "🛡️", label: "Shields", voice: VOICE.partShields },
  { emoji: "🪐", label: "Mars!", voice: VOICE.partMars },
];
const QUESTS = [
  { name: "🔧 Build Rocket", voice: VOICE.questBuild },
  { name: "👁️ Train Landing AI", voice: VOICE.questTrain },
  { name: "🚀 Test Landing", voice: VOICE.questTest },
  { name: "🛰️ Dodge Space Junk", voice: VOICE.questDodge },
  { name: "🪐 Mission to Mars", voice: VOICE.questMars },
];

type Phase = "menu" | "q1" | "q2" | "summary" | "q3" | "q4" | "q5";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("menu");
  const [completed, setCompleted] = useState<boolean[]>([false, false, false, false, false]);
  const [training, setTraining] = useState<TrainingData>({});
  const [completions, setCompletions] = useState(0);
  const [welcomed, setWelcomed] = useState(false);
  const { expired, dismiss } = useSessionTimer();

  useEffect(() => { setCompletions(getCompletions()); }, []);

  const markDone = (i: number) => setCompleted((p) => { const n = [...p]; n[i] = true; return n; });

  const startQuest = (p: Phase) => {
    sfxTap();
    if (!welcomed) { setWelcomed(true); startMusic(); speak(VOICE.welcome).then(() => setPhase(p)); }
    else setPhase(p);
  };

  if (expired) { stopMusic(); return <SessionTimer onDismiss={dismiss} />; }

  if (phase === "menu") {
    const phases: Phase[] = ["q1", "q2", "q3", "q4", "q5"];
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 sm:p-8 fade-in">
        <Confetti active={completed.every(Boolean)} />
        <RocketBuddy mood={completed.every(Boolean) ? "celebrate" : "idle"} size={140} />
        <h1 className="text-3xl sm:text-4xl font-bold text-center" onClick={() => speak(VOICE.menuTitle)} style={{cursor: "pointer"}}>
          Rocket Landing Quest!
        </h1>
        <p className="text-base sm:text-lg text-center opacity-70 max-w-md px-4" onClick={() => speak(VOICE.menuSubtitle)} style={{cursor: "pointer"}}>
          Collect all parts and fly to Mars!
        </p>
        <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
          {PARTS.map((p, i) => (
            <div key={i} className="flex flex-col items-center gap-1" style={{ opacity: completed[i] ? 1 : 0.3 }}>
              <span className="text-2xl sm:text-3xl" style={{ filter: completed[i] ? "none" : "grayscale(1)" }}>{p.emoji}</span>
              <span className="text-xs" onClick={() => speak(p.voice)} style={{cursor: "pointer"}}>{p.label}</span>
            </div>
          ))}
        </div>
        <div className="text-sm opacity-60" onClick={() => speak(VOICE.menuParts)} style={{cursor: "pointer"}}>
          {completed.filter(Boolean).length}/5 parts
        </div>
        {completions > 0 && <p className="text-xs opacity-40" onClick={() => speak(VOICE.menuCompleted)} style={{cursor: "pointer"}}>
          🏆 Completed {completions}x
        </p>}
        <div className="flex flex-col gap-3 w-full max-w-sm px-4">
          {QUESTS.map((q, i) => (
            <button key={i} className="btn btn-primary flex justify-between items-center text-sm sm:text-base"
              style={{ opacity: i === 0 || completed[i - 1] ? 1 : 0.4 }}
              disabled={i > 0 && !completed[i - 1]}
              onClick={() => startQuest(phases[i])}
              onMouseEnter={() => speak(q.voice)}>
              <span>{q.name}</span>
              {completed[i] ? <span>✅</span> : <span className="opacity-40">{PARTS[i].emoji}</span>}
            </button>
          ))}
        </div>
        {completed.every(Boolean) && <div className="text-lg sm:text-xl font-bold text-center fade-in px-4" style={{ color: "var(--success)" }} onClick={() => speak(VOICE.menuMissionComplete)}>
          🎉 Mission complete! You landed on Mars!
        </div>}
      </div>
    );
  }

  return <>
    {phase === "q1" && <BuildRocket onComplete={() => { markDone(0); setPhase("q2"); }} />}
    {phase === "q2" && <TrainLanding onComplete={(data) => {
      setTraining((prev) => { const m = { ...prev }; for (const [k, v] of Object.entries(data)) m[k] = (m[k] || 0) + v; return m; });
      markDone(1); setPhase("summary");
    }} />}
    {phase === "summary" && <TrainingSummary training={training} onComplete={() => setPhase("q3")} />}
    {phase === "q3" && <TestLanding training={training} onComplete={(retrain) => { if (retrain) setPhase("q2"); else { markDone(2); setPhase("q4"); } }} />}
    {phase === "q4" && <DodgeDebris onComplete={() => { markDone(3); setPhase("q5"); }} />}
    {phase === "q5" && <MarsLanding training={training} onComplete={() => { markDone(4); setCompletions(recordCompletion()); sfxCelebrate(); setPhase("menu"); }} />}
  </>;
}
