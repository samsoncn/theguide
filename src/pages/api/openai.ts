require("dotenv").config();
import axios from "axios";

export async function fetchResponse(prompt: string) {
  try {
    // const { Configuration, OpenAIApi } = require("openai");
    // const configuration = new Configuration({
    //   apiKey: process.env.OPENAI_API_KEY,
    // });
    // const openai = new OpenAIApi(configuration);
    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: "Say this is a test",
    //   max_tokens: 7,
    //   temperature: 0,
    // });
    console.log(process.env.OPENAI_API_KEY);
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt,
        max_tokens: 60,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    console.log("OpenAI response:", response.data); // add this line

    return response.data.choices[0].text.trim();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // If the error is an Axios error, you can access its properties
      const message = err.response?.data?.error?.message || "Unknown error";
      throw new Error(message);
    } else {
      // If the error is not an Axios error, just throw it as is
      throw err;
    }
  }
}
