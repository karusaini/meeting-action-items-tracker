import { useEffect, useState } from "react";
import type { TranscriptHistory } from "../types";

const STORAGE_KEY = "transcript_history";

export function useTranscriptHistory() {
  const [history, setHistory] = useState<TranscriptHistory[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const addTranscript = (item: TranscriptHistory) => {
    const updated = [item, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { history, addTranscript };
}
