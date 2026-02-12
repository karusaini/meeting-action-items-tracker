// src/api/actions.ts
import type { Request, Response } from "express";
import { extractActionItems } from "../lib/ai";
import { supabase } from "../services/supabaseClient";

export async function actionsHandler(req: Request, res: Response) {
  if (req.method === "POST") {
    const { transcript } = req.body;
    if (!transcript)
      return res.status(400).json({ error: "Transcript is required" });

    try {
      const tasks = await extractActionItems(transcript);

      const { data, error } = await supabase
        .from("transcripts")
        .insert([{ transcript, tasks, created_at: new Date() }])
        .select();

      if (error) throw error;

      return res.status(200).json({ tasks, saved: data });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("transcripts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;

      return res.status(200).json({ history: data });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}

// import { Router } from "express";
// import { openai } from "../services/openai";
// import { supabase } from "../services/supabaseClient";

// const router = Router();

// // POST /api/actions
// router.post("/", async (req, res) => {
//   try {
//     const { transcript } = req.body;

//     if (!transcript) {
//       return res.status(400).json({ error: "Transcript required" });
//     }

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       temperature: 0.2,
//       messages: [
//         {
//           role: "user",
//           content: `
// Extract action items from this meeting transcript.

// Return ONLY valid JSON in this format:
// [
//   {
//     "task": "string",
//     "owner": "string or null",
//     "due": "string or null"
//   }
// ]

// Transcript:
// ${transcript}
// `,
//         },
//       ],
//     });

//     const content = completion.choices[0].message.content || "[]";

//     const parsed = JSON.parse(content);

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const tasks = parsed.map((t: any, index: number) => ({
//       id: Date.now() + "-" + index,
//       task: t.task,
//       owner: t.owner || undefined,
//       due: t.due || undefined,
//       done: false,
//     }));

//     // Save to Supabase
//     await supabase.from("transcripts").insert([
//       {
//         transcript,
//         tasks,
//       },
//     ]);

//     res.json({ tasks });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to process transcript" });
//   }
// });

// // GET /api/history
// router.get("/history", async (_, res) => {
//   const { data, error } = await supabase
//     .from("transcripts")
//     .select("*")
//     .order("created_at", { ascending: false })
//     .limit(5);

//   if (error) {
//     return res.status(500).json({ error: "Failed to fetch history" });
//   }

//   res.json({ history: data });
// });

// export default router;
