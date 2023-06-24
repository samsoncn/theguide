// pages/api/openai.ts
import { NextApiRequest, NextApiResponse } from "next";
import { generateMeta } from "../../../controllers/openaiController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const description = await generateMeta(req, res);
      res.status(200).json(description);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else {
    res.status(405).end(); //Method not allowed
  }
}
