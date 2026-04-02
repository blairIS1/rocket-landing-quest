"use client";
import { speak } from "./speak";
import { sfxTap } from "./sfx";

export default function ReplayButton({ voiceKey, label = "🔊" }: { voiceKey: string; label?: string }) {
  return (
    <button
      className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-full transition-colors opacity-60 hover:opacity-100"
      onClick={(e) => {
        e.stopPropagation();
        sfxTap();
        speak(voiceKey);
      }}
      title="Replay audio"
    >
      {label}
    </button>
  );
}
