// Type-only import for ActionItem
import type { ActionItem } from "../types";

/**
 * This function simulates AI extracting action items from a meeting transcript.
 * Replace this with real AI API call (OpenAI, etc.) when ready.
 */
export async function extractActionItems(
  transcript: string,
): Promise<ActionItem[]> {
  // For now, we use a fake AI response
  const output = await fakeAI(transcript);

  if (!output) {
    return [];
  }

  // Parse JSON safely
  try {
    const parsed = JSON.parse(output) as ActionItem[];
    return parsed;
  } catch (err) {
    console.error("Failed to parse AI output:", err);
    return [];
  }
}

/**
 * Fake AI function for testing
 * `_` means parameter is unused (prevents TS warning)
 */
async function fakeAI(_: string): Promise<string | null> {
  // Example hardcoded action items
  return JSON.stringify([
    {
      id: "1",
      task: "Send updated proposal",
      owner: "Alice",
      due: "Tomorrow",
      done: false,
    },
    {
      id: "2",
      task: "Prepare dashboard metrics",
      owner: "Bob",
      due: "Friday",
      done: false,
    },
  ]);
}
