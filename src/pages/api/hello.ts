import { Configuration } from "openai";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import openai from "@/utils/openai";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Can you generate an idea of how people study using chatgpt?",
      },
    ],
    max_tokens: 20,
    // prompt: "what is 1 + 1?",
  });
  const responseText = completion.data.choices[0].message.Configuration;
  res.status(200).json({ responseText });

  // receive some user data, ask chatgpt to generate sth, and return to the user
}
