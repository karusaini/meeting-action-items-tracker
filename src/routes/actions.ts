import { Router } from "express";
import { openai } from "../services/openai";
import { supabase } from "../services/supabase";

const router = Router();

// POST /api/actions
router.post("/", async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: "Transcript required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: `
Extract action items from this meeting transcript.

Return ONLY valid JSON in this format:
[
  {
    "task": "string",
    "owner": "string or null",
    "due": "string or null"
  }
]

Transcript:
${transcript}
`,
        },
      ],
    });

    const content = completion.choices[0].message.content || "[]";

    const parsed = JSON.parse(content);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tasks = parsed.map((t: any, index: number) => ({
      id: Date.now() + "-" + index,
      task: t.task,
      owner: t.owner || undefined,
      due: t.due || undefined,
      done: false,
    }));

    // Save to Supabase
    await supabase.from("transcripts").insert([
      {
        transcript,
        tasks,
      },
    ]);

    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process transcript" });
  }
});

// GET /api/history
router.get("/history", async (_, res) => {
  const { data, error } = await supabase
    .from("transcripts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    return res.status(500).json({ error: "Failed to fetch history" });
  }

  res.json({ history: data });
});

export default router;
