import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { OpenAI } from "langchain/llms/openai";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import type { NextApiRequest, NextApiResponse } from "next";

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY, // Replace "YOUR-API-KEY" with your actual OpenAI API key
  temperature: 0.8, // Adjust the temperature value to control the randomness of the responses
});
const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: "Toronto,Ontario,Canada",
    hl: "en",
    gl: "ca",
  }),
  new Calculator(),
];

let executor: any;

async function getExecutor() {
  if (!executor) {
    executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: "zero-shot-react-description",
      verbose: true,
    });
  }

  return executor;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { input } = req.body;

    const executor = await getExecutor();
    const result = await executor.call({ input });

    res.status(200).json({ text: result });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
