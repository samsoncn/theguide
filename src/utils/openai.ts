// src/utils/openai.ts
import axios from "axios";
require("dotenv").config();

const openai = axios.create({
  baseURL: "https://api.openai.com/v1/chat/completions",
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const fetchGPT3Response = async (
  messages: { role: "system" | "user" | "assistant"; content: string }[]
) => {
  const response = await openai.post("/", {
    model: "gpt-3.5-turbo",
    messages,
  });

  return response.data.choices[0].message.content;
};
