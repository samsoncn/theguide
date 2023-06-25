// src/pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchGPT3Response } from "@/utils/openai";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const message = req.body.message;

    if (!message) {
      return res
        .status(400)
        .json({ error: "Message is missing from the request body." });
    }

    try {
      const gpt3Response = await fetchGPT3Response(message);
      res.status(200).json({ response: gpt3Response });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch response from GPT-3." });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
