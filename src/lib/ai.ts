import OpenAI from "openai";
import { ActionItem } from "../types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractActionItems(
  transcript: string,
): Promise<ActionItem[]> {
  const prompt = `Extract action items from this meeting transcript. Include task, owner, due date if available in JSON format. Transcript:\n\n${transcript}`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const output = response.choices[0].message.content;

  return JSON.parse(output) as ActionItem[];
}
