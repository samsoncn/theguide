import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // extract the message from the request body.
    const { message } = req.body;

    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 100,
    };

    try {
      const response = await axios.post(url, data, { headers: headers });
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: (error as any).message });
    }
  } else {
    // when a non-POST request is received
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
