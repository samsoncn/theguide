// load the environment variables from your .env file into process.env
require("dotenv").config();
import axios from "axios";

const openaiService = {
  getResponse: async (prompt: string) => {
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
    console.log(process.env.OPENAI_API_KEY);

    return response.data;
  },
};

export default openaiService;
