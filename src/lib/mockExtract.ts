import type { ActionItem } from "../types";

export function extractTasks(transcript: string): ActionItem[] {
  if (!transcript.trim()) return [];

  const lines = transcript
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  return lines.map((line, index) => ({
    id: `${Date.now()}-${index}`,
    task: line,
    owner: line.includes("Alice") ? "Alice" : undefined,
    due: line.includes("tomorrow") ? "Tomorrow" : undefined,
    done: false,
  }));
}
