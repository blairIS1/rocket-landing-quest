"use client";
import { useState, useEffect } from "react";
import { getIsSpeaking, onSpeakingChange } from "./speak";

export default function SpeakingIndicator() {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSpeaking(getIsSpeaking());
    const unsubscribe = onSpeakingChange(() => {
      setSpeaking(getIsSpeaking());
    });
    return unsubscribe;
  }, []);

  if (!speaking) return null;

  return (
    <div className="fixed top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full z-50">
      <div className="flex gap-1">
        <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
        <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
        <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
      </div>
      <span className="text-white text-sm">🔊 Speaking...</span>
    </div>
  );
}

export function useSpeaking(): boolean {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSpeaking(getIsSpeaking());
    const unsubscribe = onSpeakingChange(() => {
      setSpeaking(getIsSpeaking());
    });
    return unsubscribe;
  }, []);

  return speaking;
}
