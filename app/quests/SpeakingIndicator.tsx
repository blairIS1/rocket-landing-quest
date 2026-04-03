"use client";
import { useState, useEffect } from "react";
import { getIsSpeaking, onSpeakingChange } from "./speak";

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
