// import { initializeAgentExecutorWithOptions } from "langchain/agents";
// import { LLMChain } from "langchain/chains";
// import { OpenAI } from "langchain/llms/openai";
// import { SerpAPI } from "langchain/tools";
// import { Calculator } from "langchain/tools/calculator";
// import type { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

// const model = new OpenAI({
//   modelName: "gpt-3.5-turbo",
//   openAIApiKey: process.env.OPENAI_API_KEY, // Replace "YOUR-API-KEY" with your actual OpenAI API key
//   temperature: 0.8, // Adjust the temperature value to control the randomness of the responses
//   maxTokens: 100,
// });
// const tools = [
//   new SerpAPI(process.env.SERPAPI_API_KEY, {
//     location: "Toronto,Ontario,Canada",
//     hl: "en",
//     gl: "ca",
//   }),
//   new Calculator(),
// ];

// let executor: any;

// async function getExecutor() {
//   if (!executor) {
//     executor = await initializeAgentExecutorWithOptions(tools, model, {
//       agentType: "zero-shot-react-description",
//       verbose: true,
//     });
//   }

//   return executor;
// }
// // chain to combine LLMs and Prompts in Multi-Step Workflows
// // const chain = new LLMChain({ llm: model, prompt: prompt });

// // async function handler(req: NextApiRequest, res: NextApiResponse) {
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     console.log("1");

//     const { input } = req.body;

//     const executor = await getExecutor();
//     const result = await executor.call({ input });

//     try {
//       console.log("2");
//       const response = await axios.post(url, data, { headers: headers });
//       res.status(200).json(response.data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: (error as any).message });
//     }
//   } else {
//     // when a non-POST request is received
//     res.status(405).json({ error: "Method not allowed" });
//   }

//   //   res.status(200).json({ text: result });
//   // } else {
//   //   res.setHeader("Allow", ["POST"]);
//   //   res.status(405).end(`Method ${req.method} Not Allowed`);
//   // }
// };
// export default handler;
