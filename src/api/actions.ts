/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from "express";
import { extractActionItems } from "../lib/ai.ts";
import { supabase } from "../services/supabaseClient.ts";

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

      console.log("Tasks inserted:", tasks);
      return res.status(200).json({ tasks, saved: data });
    } catch (err: any) {
      console.error("Error in actionsHandler:", err);
      return res.status(500).json({ error: "Failed to extract action items" });
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
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
