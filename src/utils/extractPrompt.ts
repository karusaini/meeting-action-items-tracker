export const buildPrompt = (transcript: string) => `
Extract action items from the following meeting transcript.

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
`;
