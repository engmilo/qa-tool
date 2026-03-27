// api/generate.js

import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userStory } = req.body;

    if (!userStory) {
      return res.status(400).json({ error: "Missing userStory" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Generate structured test cases in JSON format."
        },
        {
          role: "user",
          content: userStory
        }
      ]
    });

    const text = completion.choices[0].message.content;

    res.status(200).json({ testCases: JSON.parse(text) });
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Failed to generate test cases" });
  }
}