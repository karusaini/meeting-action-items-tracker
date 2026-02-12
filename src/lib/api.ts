import type { ActionItem } from "../types";

const API_URL = "http://localhost:5000/api/actions";

export async function extractTasksFromAPI(
  transcript: string,
): Promise<ActionItem[]> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ transcript }),
  });

  if (!response.ok) {
    throw new Error("Failed to process transcript");
  }

  const data = await response.json();
  return data.tasks;
}
