"use client";
import { useState, useEffect } from "react";
import RocketBuddy from "./RocketBuddy";
import { sfxCelebrate } from "./sfx";

const SESSION_LIMIT = 10 * 60; // 10 minutes per SOP (farsighted kids fatigue faster)

export default function SessionTimer({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 fade-in">
      <RocketBuddy mood="happy" size={140} />
      <h2 className="text-3xl font-bold text-center">⏰ Great job today!</h2>
      <p className="text-lg opacity-80 text-center max-w-md">
        You&apos;ve been playing for 10 minutes — your eyes and brain need a break!
      </p>
      <p className="text-base opacity-60 text-center">Look out the window at something far away, then come back later! 👀🌳</p>
      <button className="btn btn-primary mt-4" onClick={onDismiss}>
        OK, see you later! 👋
      </button>
    </div>
  );
}

export function useSessionTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1;
        if (next >= SESSION_LIMIT) setExpired(true);
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return { elapsed, expired, dismiss: () => setExpired(false) };
}
