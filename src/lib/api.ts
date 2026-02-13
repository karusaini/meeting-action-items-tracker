import type { ActionItem } from "../types";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractActionItems(
  transcript: string,
): Promise<ActionItem[]> {
  if (!transcript.trim()) return [];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Extract action items from the meeting transcript. Include task, owner (if mentioned), and due date (if mentioned). Respond in JSON array of ActionItem.",
        },
        { role: "user", content: transcript },
      ],
      temperature: 0,
    });

    const output = response.choices?.[0]?.message?.content ?? "[]";
    try {
      const items = JSON.parse(output);
      return Array.isArray(items) ? items : [];
    } catch {
      return [];
    }
  } catch (err) {
    console.error("Error in extractActionItems:", err);
    return [];
  }
}
