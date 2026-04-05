"use client";
import { getSelectedColor } from "./scores";

type Mood = "idle" | "happy" | "thinking" | "scared" | "celebrate";

export default function RocketBuddy({ mood = "idle", size = 100, talking = false, color }: { mood?: Mood; size?: number; talking?: boolean; color?: string }) {
  const h = size;
  const w = size * 0.5;
  const bodyColor = mood === "celebrate" ? "#fbbf24" : (color || getSelectedColor());
  const flameH = mood === "happy" || mood === "celebrate" ? 18 : mood === "thinking" ? 10 : 12;
  const bodyAnim = mood === "celebrate" ? "bounce 0.5s ease-in-out infinite" : mood === "happy" ? "wiggle 0.6s ease-in-out" : "none";
  const eyeR = mood === "scared" ? 5 : mood === "happy" || mood === "celebrate" ? 2 : 3.5;

  return (
    <>
    <svg width={w} height={h} viewBox="0 0 50 100" fill="none">
      <defs>
        <linearGradient id="rainbow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f87171" /><stop offset="25%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#4ade80" /><stop offset="75%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <style>{`
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-3deg)}75%{transform:rotate(3deg)}}
        @keyframes flicker{0%,100%{opacity:0.8;transform:scaleY(1)}50%{opacity:1;transform:scaleY(1.15)}}
      `}</style>
      <g style={{ transformOrigin: "25px 50px", animation: bodyAnim }}>
        {/* Nose cone */}
        <path d="M25 5 L35 30 L15 30 Z" fill={bodyColor} />
        {/* Body */}
        <rect x="15" y="30" width="20" height="40" rx="3" fill={bodyColor} />
        {/* Window / face plate */}
        <circle cx="25" cy="42" r="10" fill="#0f172a" opacity="0.85" />
        {/* Eyes */}
        <ellipse cx="21" cy="41" rx="3" ry={eyeR} fill="#4ade80">
          {mood === "idle" && <animate attributeName="ry" values="3.5;1;3.5" dur="3s" repeatCount="indefinite" begin="2s" />}
        </ellipse>
        <ellipse cx="29" cy="41" rx="3" ry={eyeR} fill="#4ade80">
          {mood === "idle" && <animate attributeName="ry" values="3.5;1;3.5" dur="3s" repeatCount="indefinite" begin="2s" />}
        </ellipse>
        {mood === "celebrate" && <>
          <text x="17" y="44" fontSize="7" fill="#fbbf24">★</text>
          <text x="26" y="44" fontSize="7" fill="#fbbf24">★</text>
        </>}
        {mood === "scared" && <text x="32" y="38" fontSize="8" fill="#ef4444">!</text>}
        {/* Mouth */}
        {(mood === "happy" || mood === "celebrate") && <path d="M21 47 Q25 51 29 47" stroke="#4ade80" strokeWidth="1.5" fill="none" />}
        {mood === "scared" && <ellipse cx="25" cy="48" rx="3" ry="2" fill="#4ade80" opacity="0.5" />}
        {mood === "idle" && <path d="M22 47 Q25 49 28 47" stroke="#4ade80" strokeWidth="1.5" fill="none" />}
        {mood === "thinking" && <path d="M22 48 Q25 46 28 48" stroke="#4ade80" strokeWidth="1.5" fill="none" />}
        {/* Fins */}
        <path d="M15 60 L8 75 L15 70" fill="#ef4444" />
        <path d="M35 60 L42 75 L35 70" fill="#ef4444" />
        {/* Flame */}
        <g style={{ transformOrigin: "25px 72px", animation: "flicker 0.3s ease-in-out infinite" }}>
          <path d={`M19 70 Q25 ${70 + flameH} 31 70`} fill="#f97316" />
          <path d={`M22 70 Q25 ${70 + flameH - 4} 28 70`} fill="#fbbf24" />
        </g>
        {/* Thinking blinker */}
        {mood === "thinking" && <circle cx="25" cy="8" r="3" fill="#fbbf24">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
        </circle>}
        {/* Blush */}
        {(mood === "happy" || mood === "celebrate") && <>
          <circle cx="16" cy="45" r="2.5" fill="#f87171" opacity="0.3" />
          <circle cx="34" cy="45" r="2.5" fill="#f87171" opacity="0.3" />
        </>}
      </g>
      {mood === "celebrate" && <>
        <text x="0" y="12" fontSize="8">✨</text>
        <text x="40" y="10" fontSize="8">✨</text>
      </>}
    </svg>
      {talking && (
        <div className="flex gap-1 mt-1">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent)", animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent)", animationDelay: "200ms" }} />
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent)", animationDelay: "400ms" }} />
        </div>
      )}
    </>
  );
}
